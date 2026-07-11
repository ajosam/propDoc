export type PropertyStatus = "TRACKING" | "UNDER_REVIEW" | "OFFER_MADE" | "RESERVED" | "PASSED";
export type DocumentType = "BROCHURE" | "SPA" | "PAYMENT_PLAN" | "MARKET_REPORT" | "OTHER";
export type ChatThreadType = "GENERAL" | "FINANCIAL" | "LEGAL" | "LOCATION";
export type ChatRole = "USER" | "ASSISTANT";
export type AuditSeverity = "HIGH" | "MEDIUM" | "LOW";

export type Citation = {
  documentId: string;
  page: number;
  snippet: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  citations: Citation[];
};

export type ChatThread = {
  type: ChatThreadType;
  messages: ChatMessage[];
};

export type Document = {
  id: string;
  type: DocumentType;
  title: string;
  fileUrl: string;
  pageCount: number;
};

export type AuditFinding = {
  id: string;
  documentId: string;
  clauseRef: string;
  title: string;
  quote: string;
  page: number;
  severity: AuditSeverity;
  explanation: string;
  recommendation: string;
};

export type ExtractionField = {
  key: string;
  label: string;
  value: string;
  confidence: number;
  page: number | null;
};

/** The flat, listing-level fields shared by both a tracked Property and a catalog row. */
export type PropertyListingFields = {
  id: string;
  name: string;
  developer: string;
  area: string;
  bedrooms: string | null;
  sizeSqft: number | null;
  handoverQuarter: string | null;
  listPrice: number;
  pricePerSqft: number | null;
  downPaymentPct: number | null;
  serviceChargePerSqft: number | null;
  expectedRentAnnual: number | null;
  dldFeePct: number;
};

export type Property = PropertyListingFields & {
  status: PropertyStatus;
  documents: Document[];
  chatThreads: ChatThread[];
  auditFindings: AuditFinding[];
  extractionFields: ExtractionField[];
};

/** A row from the off-plan catalog (e.g. imported from an Excel sheet) — not yet in the user's library. */
export type CatalogListing = PropertyListingFields;
