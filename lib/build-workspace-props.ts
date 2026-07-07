import { THREAD_ORDER, DOC_TYPE_LABEL } from "@/lib/thread-config";
import { computeYield } from "@/lib/finance";
import type { Property } from "@/lib/types";
import type { ThreadInitial } from "@/components/workspace/chat-panel";
import type { CitationPoolEntry } from "@/lib/mock-chat";
import type { WorkspaceDocument } from "@/components/workspace/workspace-view";
import type { AuditFindingData } from "@/components/audit/audit-list";

export function buildWorkspaceProps(property: Property) {
  const documentTitleById = Object.fromEntries(property.documents.map((d) => [d.id, d.title]));
  const documentTypeById = Object.fromEntries(property.documents.map((d) => [d.id, d.type]));

  const threads: ThreadInitial[] = THREAD_ORDER.map((type) => {
    const thread = property.chatThreads.find((t) => t.type === type);
    return {
      type,
      messages: (thread?.messages ?? []).map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        citations: m.citations.map((c) => ({
          documentId: c.documentId,
          documentTitle: documentTitleById[c.documentId] ?? "Document",
          page: c.page,
          snippet: c.snippet,
        })),
      })),
    };
  });

  const citationPool: CitationPoolEntry[] = property.chatThreads
    .flatMap((t) => t.messages)
    .flatMap((m) => m.citations)
    .map((c) => ({
      documentId: c.documentId,
      documentTitle: documentTitleById[c.documentId] ?? "Document",
      docType: documentTypeById[c.documentId] ?? "OTHER",
      page: c.page,
      snippet: c.snippet,
    }));

  const seen = new Set<string>();
  const dedupedPool = citationPool.filter((c) => {
    const key = `${c.documentId}:${c.page}:${c.snippet}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const documents: WorkspaceDocument[] = property.documents.map((d) => ({
    id: d.id,
    type: d.type,
    title: d.title || DOC_TYPE_LABEL[d.type],
    fileUrl: d.fileUrl,
    pageCount: d.pageCount,
  }));

  const auditFindings: AuditFindingData[] = property.auditFindings.map((f) => ({
    id: f.id,
    clauseRef: f.clauseRef,
    title: f.title,
    quote: f.quote,
    page: f.page,
    severity: f.severity,
    explanation: f.explanation,
    recommendation: f.recommendation,
  }));

  return {
    property: {
      id: property.id,
      name: property.name,
      developer: property.developer,
      area: property.area,
      status: property.status,
      netYieldPct: computeYield(property).netYieldPct,
    },
    documents,
    threads,
    citationPool: dedupedPool,
    auditFindings,
  };
}
