export type WizardExtraField = {
  label: string;
  value: string;
  confidence: number;
};

export type WizardTemplate = {
  id: string;
  documentName: string;
  docType: "BROCHURE" | "SPA" | "PAYMENT_PLAN";
  extraFields: WizardExtraField[];
  property: {
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
};

export const WIZARD_TEMPLATES: WizardTemplate[] = [
  {
    id: "sapphire-bay",
    documentName: "Sapphire-Bay-Residences-Brochure.pdf",
    docType: "BROCHURE",
    extraFields: [
      { label: "Unit number", value: "1204", confidence: 0.94 },
      { label: "View", value: "Full Marina & Sea View", confidence: 0.88 },
      { label: "Floor", value: "12 of 38", confidence: 0.91 },
      { label: "Furnishing", value: "Unfurnished, fitted kitchen", confidence: 0.72 },
      { label: "Parking", value: "1 allocated bay", confidence: 0.85 },
    ],
    property: {
      name: "Sapphire Bay Residences",
      developer: "Seven Tides International",
      area: "Jumeirah Beach Residence",
      bedrooms: "1BR",
      sizeSqft: 790,
      handoverQuarter: "Q1 2028",
      listPrice: 1980000,
      pricePerSqft: 2506,
      downPaymentPct: 20,
      serviceChargePerSqft: 18.5,
      expectedRentAnnual: 128000,
      dldFeePct: 4,
    },
  },
  {
    id: "meydan-horizon",
    documentName: "Meydan-Horizon-Villas-Payment-Plan.pdf",
    docType: "PAYMENT_PLAN",
    extraFields: [
      { label: "Plot number", value: "MH-A-217", confidence: 0.9 },
      { label: "Layout", value: "3BR + Maid's, corner plot", confidence: 0.81 },
      { label: "Landscaping", value: "Private garden, 620 sqft", confidence: 0.68 },
      { label: "Community", value: "Meydan Horizon, gated", confidence: 0.93 },
    ],
    property: {
      name: "Meydan Horizon Villas",
      developer: "Meydan Sobha",
      area: "Meydan",
      bedrooms: "3BR",
      sizeSqft: 2450,
      handoverQuarter: "Q4 2027",
      listPrice: 4350000,
      pricePerSqft: 1776,
      downPaymentPct: 15,
      serviceChargePerSqft: 8.5,
      expectedRentAnnual: 245000,
      dldFeePct: 4,
    },
  },
];
