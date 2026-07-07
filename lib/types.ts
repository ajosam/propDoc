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

export type Property = {
  id: string;
  name: string;
  developer: string;
  area: string;
  status: PropertyStatus;
  bedrooms: string | null;
  sizeSqft: number | null;
  handoverQuarter: string | null;
  listPrice: number;
  pricePerSqft: number | null;
  downPaymentPct: number | null;
  serviceChargePerSqft: number | null;
  expectedRentAnnual: number | null;
  dldFeePct: number;
  documents: Document[];
  chatThreads: ChatThread[];
  auditFindings: AuditFinding[];
  extractionFields: ExtractionField[];
};
