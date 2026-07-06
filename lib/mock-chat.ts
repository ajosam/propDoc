import type { ChatThreadType, DocumentType } from "@/lib/generated/prisma/client";

export type CitationPoolEntry = {
  documentId: string;
  documentTitle: string;
  docType: DocumentType;
  page: number;
  snippet: string;
};

export type MockReply = {
  content: string;
  citations: { documentId: string; page: number; snippet: string }[];
};

const PREFERRED_DOC_TYPES: Record<ChatThreadType, DocumentType[]> = {
  GENERAL: ["BROCHURE", "MARKET_REPORT"],
  FINANCIAL: ["PAYMENT_PLAN", "SPA", "BROCHURE"],
  LEGAL: ["SPA"],
  LOCATION: ["MARKET_REPORT", "BROCHURE"],
};

const OPENERS: Record<ChatThreadType, string[]> = {
  GENERAL: [
    "Here's what the documents say on that.",
    "Pulling from the project brochure and available materials:",
    "Good question — here's the relevant detail I found.",
  ],
  FINANCIAL: [
    "Running the numbers from the payment plan and unit data:",
    "Here's the financial picture based on the documents on file:",
    "From the payment schedule and service charge figures:",
  ],
  LEGAL: [
    "Looking at the SPA language on that point:",
    "Here's the relevant clause and what it means for you:",
    "I checked the SPA — here's what's actually written:",
  ],
  LOCATION: [
    "Based on the location and market context in the documents:",
    "Here's what the market report says about the area:",
    "On connectivity and comparables for this project:",
  ],
};

const CLOSERS: Record<ChatThreadType, string[]> = {
  GENERAL: ["Let me know if you'd like me to dig into a specific section.", "Happy to pull more detail from another document if useful."],
  FINANCIAL: ["Want me to compare this against another property you're tracking?", "I can break this down per installment if that helps."],
  LEGAL: ["Worth flagging to your conveyancer before signing.", "This is also covered in the SPA audit tab if you want the full risk read."],
  LOCATION: ["I can pull comparable rents in the area if useful.", "Let me know if you want a deeper look at any nearby project."],
};

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100003;
  return h;
}

export function generateMockReply(
  threadType: ChatThreadType,
  userMessage: string,
  pool: CitationPoolEntry[]
): MockReply {
  const seed = hashString(userMessage + threadType);
  const preferred = PREFERRED_DOC_TYPES[threadType];
  let candidates = pool.filter((c) => preferred.includes(c.docType));
  if (candidates.length === 0) candidates = pool;

  const citationCount = candidates.length === 0 ? 0 : 1 + (seed % Math.min(2, candidates.length));
  const chosen: CitationPoolEntry[] = [];
  for (let i = 0; i < citationCount && candidates.length > 0; i++) {
    const idx = (seed + i * 7) % candidates.length;
    const entry = candidates[idx];
    if (!chosen.includes(entry)) chosen.push(entry);
  }

  const opener = pick(OPENERS[threadType], seed);
  const closer = pick(CLOSERS[threadType], seed + 1);

  const body = chosen.length
    ? chosen
        .map((c) => `From *${c.documentTitle}* (p. ${c.page}): "${c.snippet}"`)
        .join(" ")
    : "I don't have a document on file that speaks to that directly yet — try uploading the relevant document, or ask about the unit's financials, SPA clauses, or location instead.";

  return {
    content: `${opener} ${body} ${chosen.length ? closer : ""}`.trim(),
    citations: chosen.map((c) => ({ documentId: c.documentId, page: c.page, snippet: c.snippet })),
  };
}

export const MOCK_THINKING_DELAY_MS = 900;
