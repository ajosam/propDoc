import { WIZARD_TEMPLATES } from "@/lib/wizard-templates";
import { WIZARD_TEMPLATE_DOCS } from "@/lib/data/wizard-docs";
import { buildWelcomeChatThreads } from "@/lib/build-welcome-threads";
import type { Property } from "@/lib/types";

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

/** Builds a full Property from wizard input, entirely client-side — no server round-trip. */
export function buildPropertyFromWizard(input: WizardPropertyInput): Property {
  const template = WIZARD_TEMPLATES.find((t) => t.id === input.templateId) ?? WIZARD_TEMPLATES[0];
  const doc = WIZARD_TEMPLATE_DOCS[template.id];
  const propertyId = `wizard-${template.id}-${Date.now()}`;
  const documentId = `${propertyId}-doc`;

  return {
    id: propertyId,
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
    documents: [
      {
        id: documentId,
        type: doc.type,
        title: doc.title,
        fileUrl: doc.fileUrl,
        pageCount: doc.pageCount,
      },
    ],
    chatThreads: buildWelcomeChatThreads(propertyId),
    auditFindings: [],
    extractionFields: template.extraFields.map((f) => ({
      key: f.label.toLowerCase().replace(/\s+/g, "_"),
      label: f.label,
      value: f.value,
      confidence: f.confidence,
      page: null,
    })),
  };
}
