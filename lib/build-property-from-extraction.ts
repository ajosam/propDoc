import { buildWelcomeChatThreads } from "@/lib/build-welcome-threads";
import type { Property, DocumentType, ExtractionField } from "@/lib/types";

export type PropertyFormFields = {
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

export type UploadedDocInfo = {
  fileUrl: string;
  fileName: string;
  docType: DocumentType;
  extraFields: { label: string; value: string; confidence: number }[];
};

/** Builds a full Property from a real Gemini-extracted upload — PDF stays client-side as a blob URL. */
export function buildPropertyFromExtraction(form: PropertyFormFields, upload: UploadedDocInfo): Property {
  const propertyId = `upload-${Date.now()}`;
  const documentId = `${propertyId}-doc`;

  const extractionFields: ExtractionField[] = upload.extraFields.map((f) => ({
    key: f.label.toLowerCase().replace(/\s+/g, "_"),
    label: f.label,
    value: f.value,
    confidence: f.confidence,
    page: null,
  }));

  return {
    id: propertyId,
    ...form,
    status: "TRACKING",
    documents: [
      {
        id: documentId,
        type: upload.docType,
        title: upload.fileName.replace(/\.pdf$/i, "").replace(/[-_]/g, " "),
        fileUrl: upload.fileUrl,
        pageCount: 1,
      },
    ],
    chatThreads: buildWelcomeChatThreads(propertyId),
    auditFindings: [],
    extractionFields,
  };
}
