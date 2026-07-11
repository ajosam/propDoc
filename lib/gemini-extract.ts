import { GoogleGenAI, Type } from "@google/genai";
import type { DocumentType } from "@/lib/types";

export type GeminiExtractedField = { label: string; value: string; confidence: number };

export type GeminiExtractionResult = {
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
  docType: DocumentType;
  extraFields: GeminiExtractedField[];
};

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Project or building name" },
    developer: { type: Type.STRING },
    area: { type: Type.STRING, description: "Dubai neighbourhood/community" },
    bedrooms: { type: Type.STRING, description: "e.g. Studio, 1BR, 2BR" },
    sizeSqft: { type: Type.NUMBER },
    handoverQuarter: { type: Type.STRING, description: "e.g. Q3 2027" },
    listPrice: { type: Type.NUMBER, description: "Total list price in AED, plain number" },
    pricePerSqft: { type: Type.NUMBER, description: "AED per sqft, plain number" },
    downPaymentPct: { type: Type.NUMBER, description: "Down payment percentage, plain number e.g. 20" },
    serviceChargePerSqft: { type: Type.NUMBER, description: "AED per sqft per year" },
    expectedRentAnnual: { type: Type.NUMBER, description: "Estimated gross annual rent in AED, if mentioned or inferable; otherwise 0" },
    dldFeePct: { type: Type.NUMBER, description: "Dubai Land Department transfer fee percentage, usually 4" },
    docType: { type: Type.STRING, enum: ["BROCHURE", "SPA", "PAYMENT_PLAN", "MARKET_REPORT", "OTHER"] },
    extraFields: {
      type: Type.ARRAY,
      description: "Other notable fields found in the document not covered above (unit number, view, floor, plot number, etc.)",
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          value: { type: Type.STRING },
          confidence: { type: Type.NUMBER, description: "0 to 1" },
        },
        required: ["label", "value", "confidence"],
      },
    },
  },
  required: ["name", "developer", "area", "listPrice", "docType", "extraFields"],
};

const PROMPT = `You are extracting structured data from a Dubai off-plan real estate document (brochure, Sale & Purchase Agreement, payment plan, or market report) for an investor tracking tool.

Read the attached PDF and extract the fields defined in the response schema. Rules:
- All monetary and numeric fields must be plain numbers (no "AED", no commas, no "%").
- If a field genuinely isn't present in the document, use 0 for numbers or an empty string for text — do not guess wildly.
- "extraFields" should capture other useful details you found (unit number, view, floor, plot size, construction progress, etc.) with your confidence in each (0 to 1).
- "docType" should reflect what kind of document this actually is.`;

export async function extractPropertyFromPdf(base64Data: string, mimeType: string): Promise<GeminiExtractionResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to your environment to enable real document extraction.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: [
      {
        role: "user",
        parts: [{ inlineData: { data: base64Data, mimeType } }, { text: PROMPT }],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Gemini returned an empty response.");

  const parsed = JSON.parse(text) as Partial<GeminiExtractionResult>;

  return {
    name: parsed.name || "Untitled Property",
    developer: parsed.developer || "",
    area: parsed.area || "",
    bedrooms: parsed.bedrooms || "",
    sizeSqft: Number(parsed.sizeSqft) || 0,
    handoverQuarter: parsed.handoverQuarter || "",
    listPrice: Number(parsed.listPrice) || 0,
    pricePerSqft: Number(parsed.pricePerSqft) || 0,
    downPaymentPct: Number(parsed.downPaymentPct) || 0,
    serviceChargePerSqft: Number(parsed.serviceChargePerSqft) || 0,
    expectedRentAnnual: Number(parsed.expectedRentAnnual) || 0,
    dldFeePct: Number(parsed.dldFeePct) || 4,
    docType: (["BROCHURE", "SPA", "PAYMENT_PLAN", "MARKET_REPORT", "OTHER"] as const).includes(parsed.docType as DocumentType)
      ? (parsed.docType as DocumentType)
      : "OTHER",
    extraFields: Array.isArray(parsed.extraFields) ? parsed.extraFields : [],
  };
}
