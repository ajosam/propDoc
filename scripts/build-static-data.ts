import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { renderDocumentPdf } from "@/lib/pdf-gen";
import { PROPERTIES as FIXTURE_PROPERTIES } from "@/scripts/fixtures/data";
import { WIZARD_TEMPLATES } from "@/lib/wizard-templates";
import { DOC_TYPE_LABEL } from "@/lib/thread-config";
import type { Property, Document, ChatThread, AuditFinding, ExtractionField, DocumentType } from "@/lib/types";

function resolvePage(anchors: Record<string, number>, anchorId: string, context: string): number {
  const page = anchors[anchorId];
  if (!page) throw new Error(`Unresolved anchor "${anchorId}" (${context})`);
  return page;
}

async function buildFixtureProperties(): Promise<Property[]> {
  const publicDir = path.join(process.cwd(), "public", "documents");
  const properties: Property[] = [];

  for (const fixture of FIXTURE_PROPERTIES) {
    const propDir = path.join(publicDir, fixture.id);
    await mkdir(propDir, { recursive: true });

    const documents: Document[] = [];
    const anchorsByDoc: Record<string, Record<string, number>> = {};

    for (const doc of fixture.documents) {
      const anchors: Record<string, number> = {};
      doc.pages.forEach((p, i) => {
        anchors[p.anchorId] = i + 1;
      });
      anchorsByDoc[doc.id] = anchors;

      const pdfBytes = await renderDocumentPdf(
        doc.title,
        doc.pages.map((p) => ({ heading: p.heading, paragraphs: p.paragraphs }))
      );
      const fileName = `${doc.id}.pdf`;
      await writeFile(path.join(propDir, fileName), pdfBytes);

      documents.push({
        id: doc.id,
        type: doc.type,
        title: doc.title,
        fileUrl: `/documents/${fixture.id}/${fileName}`,
        pageCount: doc.pages.length,
      });
    }

    const chatThreads: ChatThread[] = fixture.chatThreads.map((thread) => ({
      type: thread.type,
      messages: thread.messages.map((m, msgIdx) => ({
        id: `${fixture.id}-${thread.type.toLowerCase()}-${msgIdx}`,
        role: m.role,
        content: m.content,
        citations: (m.citations ?? []).map((c) => ({
          documentId: c.docId,
          page: resolvePage(anchorsByDoc[c.docId], c.anchorId, `${fixture.id}/${c.docId} citation`),
          snippet: c.snippet,
        })),
      })),
    }));

    const auditFindings: AuditFinding[] = fixture.auditFindings.map((f, i) => ({
      id: `${fixture.id}-audit-${i}`,
      documentId: f.docId,
      clauseRef: f.clauseRef,
      title: f.title,
      quote: f.quote,
      page: resolvePage(anchorsByDoc[f.docId], f.anchorId, `${fixture.id}/${f.docId} audit finding`),
      severity: f.severity,
      explanation: f.explanation,
      recommendation: f.recommendation,
    }));

    const extractionFields: ExtractionField[] = fixture.extractionFields.map((f) => ({
      key: f.key,
      label: f.label,
      value: f.value,
      confidence: f.confidence,
      page: f.docId && f.anchorId ? resolvePage(anchorsByDoc[f.docId], f.anchorId, `${fixture.id} extraction field`) : null,
    }));

    properties.push({
      id: fixture.id,
      name: fixture.name,
      developer: fixture.developer,
      area: fixture.area,
      status: fixture.status,
      bedrooms: fixture.bedrooms,
      sizeSqft: fixture.sizeSqft,
      handoverQuarter: fixture.handoverQuarter,
      listPrice: fixture.listPrice,
      pricePerSqft: fixture.pricePerSqft,
      downPaymentPct: fixture.downPaymentPct,
      serviceChargePerSqft: fixture.serviceChargePerSqft,
      expectedRentAnnual: fixture.expectedRentAnnual,
      dldFeePct: fixture.dldFeePct,
      documents,
      chatThreads,
      auditFindings,
      extractionFields,
    });

    console.log(`Built ${fixture.name}: ${documents.length} docs, ${chatThreads.reduce((n, t) => n + t.messages.length, 0)} messages, ${auditFindings.length} audit findings`);
  }

  return properties;
}

type WizardTemplateDoc = { fileUrl: string; pageCount: number; title: string; type: DocumentType };

async function buildWizardTemplateDocs(): Promise<Record<string, WizardTemplateDoc>> {
  const dir = path.join(process.cwd(), "public", "documents", "wizard-templates");
  await mkdir(dir, { recursive: true });

  const result: Record<string, WizardTemplateDoc> = {};

  for (const template of WIZARD_TEMPLATES) {
    const p = template.property;
    const pages = [
      {
        heading: `${p.name} — ${DOC_TYPE_LABEL[template.docType]}`,
        paragraphs: [
          `${p.developer} · ${p.area}, Dubai`,
          `This page stands in for the original uploaded file (${template.documentName}) in the PropertyDoc onboarding demo.`,
        ],
      },
      {
        heading: "Unit & Project Details",
        paragraphs: [
          `Configuration: ${p.bedrooms} · Size: ${p.sizeSqft.toLocaleString()} sqft · Expected handover: ${p.handoverQuarter}`,
          ...template.extraFields.map((f) => `${f.label}: ${f.value}`),
        ],
      },
      {
        heading: "Pricing Summary",
        paragraphs: [
          `List price: AED ${p.listPrice.toLocaleString()} (AED ${p.pricePerSqft.toLocaleString()}/sqft)`,
          `Down payment: ${p.downPaymentPct}% on signing. DLD registration fee: ${p.dldFeePct}% of purchase price.`,
          `Estimated annual service charge: AED ${(p.serviceChargePerSqft * p.sizeSqft).toLocaleString()} (AED ${p.serviceChargePerSqft}/sqft/year).`,
          `Indicative gross annual rent based on comparable listings: AED ${p.expectedRentAnnual.toLocaleString()}.`,
        ],
      },
    ];

    const pdfBytes = await renderDocumentPdf(p.name, pages);
    const fileName = `${template.id}.pdf`;
    await writeFile(path.join(dir, fileName), pdfBytes);

    result[template.id] = {
      fileUrl: `/documents/wizard-templates/${fileName}`,
      pageCount: pages.length,
      title: template.documentName.replace(/\.pdf$/i, "").replace(/[-_]/g, " "),
      type: template.docType,
    };
    console.log(`Built wizard template doc for ${p.name}`);
  }

  return result;
}

function tsLiteral(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

async function main() {
  const properties = await buildFixtureProperties();
  const wizardDocs = await buildWizardTemplateDocs();

  const dataDir = path.join(process.cwd(), "lib", "data");
  await mkdir(dataDir, { recursive: true });

  await writeFile(
    path.join(dataDir, "properties.ts"),
    `// AUTO-GENERATED by scripts/build-static-data.ts — do not edit by hand.\nimport type { Property } from "@/lib/types";\n\nexport const PROPERTIES: Property[] = ${tsLiteral(properties)};\n`
  );

  await writeFile(
    path.join(dataDir, "wizard-docs.ts"),
    `// AUTO-GENERATED by scripts/build-static-data.ts — do not edit by hand.\nimport type { DocumentType } from "@/lib/types";\n\nexport type WizardTemplateDoc = { fileUrl: string; pageCount: number; title: string; type: DocumentType };\n\nexport const WIZARD_TEMPLATE_DOCS: Record<string, WizardTemplateDoc> = ${tsLiteral(wizardDocs)};\n`
  );

  console.log(`\nWrote ${properties.length} properties to lib/data/properties.ts`);
  console.log(`Wrote ${Object.keys(wizardDocs).length} wizard template docs to lib/data/wizard-docs.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
