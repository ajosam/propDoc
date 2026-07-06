import { readFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { PROPERTIES } from "@/scripts/fixtures/data";

type Manifest = Record<
  string,
  Record<string, { fileUrl: string; pageCount: number; type: string; title: string; anchors: Record<string, number> }>
>;

function resolvePage(manifest: Manifest, propertyId: string, docId: string, anchorId: string): number {
  const page = manifest[propertyId]?.[docId]?.anchors?.[anchorId];
  if (!page) {
    throw new Error(`Could not resolve anchor "${anchorId}" for doc "${docId}" in property "${propertyId}"`);
  }
  return page;
}

async function main() {
  const manifestPath = path.join(process.cwd(), "scripts", "fixtures", "manifest.generated.json");
  const manifest: Manifest = JSON.parse(await readFile(manifestPath, "utf-8"));

  for (const property of PROPERTIES) {
    console.log(`Seeding ${property.name}...`);

    await prisma.property.create({
      data: {
        id: property.id,
        name: property.name,
        developer: property.developer,
        area: property.area,
        status: property.status,
        bedrooms: property.bedrooms,
        sizeSqft: property.sizeSqft,
        handoverQuarter: property.handoverQuarter,
        listPrice: property.listPrice,
        pricePerSqft: property.pricePerSqft,
        downPaymentPct: property.downPaymentPct,
        serviceChargePerSqft: property.serviceChargePerSqft,
        expectedRentAnnual: property.expectedRentAnnual,
        dldFeePct: property.dldFeePct,
      },
    });

    for (const doc of property.documents) {
      const meta = manifest[property.id][doc.id];
      await prisma.document.create({
        data: {
          id: doc.id,
          propertyId: property.id,
          type: doc.type,
          title: doc.title,
          fileUrl: meta.fileUrl,
          pageCount: meta.pageCount,
        },
      });
    }

    for (const thread of property.chatThreads) {
      const createdThread = await prisma.chatThread.create({
        data: { propertyId: property.id, type: thread.type },
      });

      for (const message of thread.messages) {
        const createdMessage = await prisma.chatMessage.create({
          data: {
            threadId: createdThread.id,
            role: message.role,
            content: message.content,
          },
        });

        for (const citation of message.citations ?? []) {
          await prisma.citation.create({
            data: {
              messageId: createdMessage.id,
              documentId: citation.docId,
              page: resolvePage(manifest, property.id, citation.docId, citation.anchorId),
              snippet: citation.snippet,
            },
          });
        }
      }
    }

    for (const finding of property.auditFindings) {
      await prisma.auditFinding.create({
        data: {
          propertyId: property.id,
          documentId: finding.docId,
          clauseRef: finding.clauseRef,
          title: finding.title,
          quote: finding.quote,
          page: resolvePage(manifest, property.id, finding.docId, finding.anchorId),
          severity: finding.severity,
          explanation: finding.explanation,
          recommendation: finding.recommendation,
        },
      });
    }

    for (const field of property.extractionFields) {
      await prisma.extractionField.create({
        data: {
          propertyId: property.id,
          key: field.key,
          label: field.label,
          value: field.value,
          confidence: field.confidence,
          page: field.docId && field.anchorId ? resolvePage(manifest, property.id, field.docId, field.anchorId) : null,
        },
      });
    }
  }

  console.log("\nSeed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
