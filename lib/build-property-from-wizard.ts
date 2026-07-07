import { WIZARD_TEMPLATES } from "@/lib/wizard-templates";
import { WIZARD_TEMPLATE_DOCS } from "@/lib/data/wizard-docs";
import type { Property, ChatThreadType } from "@/lib/types";

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

const WELCOME_MESSAGE: Record<ChatThreadType, string> = {
  GENERAL: "This thread is ready. Ask me anything about the project, unit, or developer once you've explored the document.",
  FINANCIAL: "Ask me about the payment plan, service charges, or projected net yield for this unit.",
  LEGAL: "Ask me about specific SPA clauses once a Sale & Purchase Agreement is uploaded for this property.",
  LOCATION: "Ask me about the neighbourhood, connectivity, or comparable projects nearby.",
};

const THREAD_TYPES: ChatThreadType[] = ["GENERAL", "FINANCIAL", "LEGAL", "LOCATION"];

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
    chatThreads: THREAD_TYPES.map((type) => ({
      type,
      messages: [
        {
          id: `${propertyId}-${type.toLowerCase()}-0`,
          role: "ASSISTANT",
          content: WELCOME_MESSAGE[type],
          citations: [],
        },
      ],
    })),
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
