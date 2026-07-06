"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { renderDocumentPdf } from "@/lib/pdf-gen";
import { WIZARD_TEMPLATES } from "@/lib/wizard-templates";
import { DOC_TYPE_LABEL } from "@/lib/thread-config";

export type WizardPropertyInput = {
  templateId: string;
  name: string;
  developer: string;
  area: string;
  bedrooms: string;
  sizeSqft: number;
  handoverQuarter: string;
  listPrice: number;
  pricePerSqft: number;
  downPaymentPct: number;
  serviceChargePerSqft: number;
  expectedRentAnnual: number;
  dldFeePct: number;
};

const WELCOME_MESSAGE: Record<string, string> = {
  GENERAL: "This thread is ready. Ask me anything about the project, unit, or developer once you've explored the document.",
  FINANCIAL: "Ask me about the payment plan, service charges, or projected net yield for this unit.",
  LEGAL: "Ask me about specific SPA clauses once a Sale & Purchase Agreement is uploaded for this property.",
  LOCATION: "Ask me about the neighbourhood, connectivity, or comparable projects nearby.",
};

export async function createPropertyFromWizard(input: WizardPropertyInput) {
  const template = WIZARD_TEMPLATES.find((t) => t.id === input.templateId) ?? WIZARD_TEMPLATES[0];

  const property = await prisma.property.create({
    data: {
      name: input.name,
      developer: input.developer,
      area: input.area,
      status: "TRACKING",
      bedrooms: input.bedrooms,
      sizeSqft: input.sizeSqft,
      handoverQuarter: input.handoverQuarter,
      listPrice: input.listPrice,
      pricePerSqft: input.pricePerSqft,
      downPaymentPct: input.downPaymentPct,
      serviceChargePerSqft: input.serviceChargePerSqft,
      expectedRentAnnual: input.expectedRentAnnual,
      dldFeePct: input.dldFeePct,
    },
  });

  const pages = [
    {
      heading: `${input.name} — ${DOC_TYPE_LABEL[template.docType]}`,
      paragraphs: [
        `${input.developer} · ${input.area}, Dubai`,
        `This page was generated from a document uploaded through the PropertyDoc onboarding wizard on behalf of the investor tracking this unit. It stands in for the original file (${template.documentName}) for demo purposes.`,
      ],
    },
    {
      heading: "Unit & Project Details",
      paragraphs: [
        `Configuration: ${input.bedrooms} · Size: ${input.sizeSqft.toLocaleString()} sqft · Expected handover: ${input.handoverQuarter}`,
        ...template.extraFields.map((f) => `${f.label}: ${f.value}`),
      ],
    },
    {
      heading: "Pricing Summary",
      paragraphs: [
        `List price: AED ${input.listPrice.toLocaleString()} (AED ${input.pricePerSqft.toLocaleString()}/sqft)`,
        `Down payment: ${input.downPaymentPct}% on signing. DLD registration fee: ${input.dldFeePct}% of purchase price.`,
        `Estimated annual service charge: AED ${(input.serviceChargePerSqft * input.sizeSqft).toLocaleString()} (AED ${input.serviceChargePerSqft}/sqft/year).`,
        `Indicative gross annual rent based on comparable listings: AED ${input.expectedRentAnnual.toLocaleString()}.`,
      ],
    },
  ];

  const pdfBytes = await renderDocumentPdf(input.name, pages);
  const dir = path.join(process.cwd(), "public", "documents", property.id);
  await mkdir(dir, { recursive: true });
  const fileName = "onboarding-upload.pdf";
  await writeFile(path.join(dir, fileName), pdfBytes);

  const document = await prisma.document.create({
    data: {
      propertyId: property.id,
      type: template.docType,
      title: template.documentName.replace(/\.pdf$/i, "").replace(/[-_]/g, " "),
      fileUrl: `/documents/${property.id}/${fileName}`,
      pageCount: pages.length,
    },
  });

  await prisma.extractionField.createMany({
    data: template.extraFields.map((f) => ({
      propertyId: property.id,
      key: f.label.toLowerCase().replace(/\s+/g, "_"),
      label: f.label,
      value: f.value,
      confidence: f.confidence,
    })),
  });

  await prisma.chatThread.createMany({
    data: (["GENERAL", "FINANCIAL", "LEGAL", "LOCATION"] as const).map((type) => ({
      propertyId: property.id,
      type,
    })),
  });

  const threads = await prisma.chatThread.findMany({ where: { propertyId: property.id } });
  for (const thread of threads) {
    await prisma.chatMessage.create({
      data: {
        threadId: thread.id,
        role: "ASSISTANT",
        content: WELCOME_MESSAGE[thread.type],
      },
    });
  }

  void document;
  redirect(`/property/${property.id}`);
}
