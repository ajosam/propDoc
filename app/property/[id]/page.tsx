import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { computeYield } from "@/lib/finance";
import { THREAD_ORDER, DOC_TYPE_LABEL } from "@/lib/thread-config";
import { WorkspaceView } from "@/components/workspace/workspace-view";
import type { ThreadInitial } from "@/components/workspace/chat-panel";
import type { CitationPoolEntry } from "@/lib/mock-chat";

export default async function PropertyWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      documents: { orderBy: { uploadedAt: "asc" } },
      auditFindings: { include: { document: true } },
      chatThreads: {
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
            include: { citations: { include: { document: true } } },
          },
        },
      },
    },
  });

  if (!property) notFound();

  const documentTitleById = Object.fromEntries(property.documents.map((d) => [d.id, d.title]));

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
          documentTitle: documentTitleById[c.documentId] ?? c.document.title,
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
      docType: property.documents.find((d) => d.id === c.documentId)?.type ?? "OTHER",
      page: c.page,
      snippet: c.snippet,
    }));

  // dedupe
  const seen = new Set<string>();
  const dedupedPool = citationPool.filter((c) => {
    const key = `${c.documentId}:${c.page}:${c.snippet}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const yieldBreakdown = computeYield(property);

  return (
    <WorkspaceView
      property={{
        id: property.id,
        name: property.name,
        developer: property.developer,
        area: property.area,
        status: property.status,
        netYieldPct: yieldBreakdown.netYieldPct,
      }}
      documents={property.documents.map((d) => ({
        id: d.id,
        type: d.type,
        title: d.title || DOC_TYPE_LABEL[d.type],
        fileUrl: d.fileUrl,
        pageCount: d.pageCount,
      }))}
      threads={threads}
      citationPool={dedupedPool}
      auditFindings={property.auditFindings.map((f) => ({
        id: f.id,
        clauseRef: f.clauseRef,
        title: f.title,
        quote: f.quote,
        page: f.page,
        severity: f.severity,
        explanation: f.explanation,
        recommendation: f.recommendation,
      }))}
    />
  );
}
