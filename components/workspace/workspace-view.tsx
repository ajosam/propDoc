"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessagesSquare, FileSearch, Trash2, Loader2, UploadCloud, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn, formatAED, formatPct } from "@/lib/utils";
import { STATUS_CONFIG, DOC_TYPE_LABEL } from "@/lib/thread-config";
import { ChatPanel, type ThreadInitial } from "@/components/workspace/chat-panel";
import { AuditList, type AuditFindingData } from "@/components/audit/audit-list";
import { DeletePropertyDialog } from "@/components/library/delete-property-dialog";
import type { CitationPoolEntry } from "@/lib/mock-chat";
import type { DocumentType } from "@/lib/types";

const PdfViewer = dynamic(() => import("@/components/workspace/pdf-viewer").then((m) => m.PdfViewer), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center text-slate-400">
      <Loader2 className="size-5 animate-spin" />
    </div>
  ),
});

export type WorkspaceDocument = {
  id: string;
  type: DocumentType;
  title: string;
  fileUrl: string;
  pageCount: number;
};

type MobilePane = "document" | "details";

export function WorkspaceView({
  property,
  documents,
  threads,
  citationPool,
  auditFindings,
}: {
  property: {
    id: string;
    name: string;
    developer: string;
    area: string;
    status: string;
    netYieldPct: number;
  };
  documents: WorkspaceDocument[];
  threads: ThreadInitial[];
  citationPool: CitationPoolEntry[];
  auditFindings: AuditFindingData[];
}) {
  const router = useRouter();
  const [activeDocId, setActiveDocId] = useState(documents[0]?.id ?? "");
  const [pageByDoc, setPageByDoc] = useState<Record<string, number>>(() =>
    Object.fromEntries(documents.map((d) => [d.id, 1]))
  );
  const [mainTab, setMainTab] = useState<"chat" | "audit">("chat");
  const [mobilePane, setMobilePane] = useState<MobilePane>("document");

  const activeDoc = documents.find((d) => d.id === activeDocId) ?? documents[0];
  const spaDoc = documents.find((d) => d.type === "SPA");
  const status = STATUS_CONFIG[property.status] ?? STATUS_CONFIG.TRACKING;

  function jumpTo(documentId: string, page: number) {
    setActiveDocId(documentId);
    setPageByDoc((prev) => ({ ...prev, [documentId]: page }));
    setMobilePane("document");
    if (spaDoc && documentId === spaDoc.id) setMainTab((t) => t);
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/library" className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-sm font-semibold text-slate-900">{property.name}</h1>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            <p className="truncate text-xs text-slate-500">{property.developer} · {property.area}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-emerald-600">{formatPct(property.netYieldPct)}</p>
            <p className="hidden text-[11px] text-slate-400 sm:block">net yield after service charges</p>
          </div>
          <DeletePropertyDialog
            propertyId={property.id}
            propertyName={property.name}
            onDeleted={() => router.push("/library")}
            trigger={
              <button
                title="Remove from library"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="size-4" />
              </button>
            }
          />
        </div>
      </header>

      <div className="border-b border-slate-200 bg-white p-2 md:hidden">
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setMobilePane("document")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors",
              mobilePane === "document" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            )}
          >
            <FileText className="size-3.5" /> Document
          </button>
          <button
            onClick={() => setMobilePane("details")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors",
              mobilePane === "details" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            )}
          >
            <MessagesSquare className="size-3.5" /> Chat & Audit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={cn(
            "min-w-0 flex-col border-slate-200 md:flex md:flex-1 md:border-r",
            mobilePane === "document" ? "flex flex-1" : "hidden"
          )}
        >
          {documents.length > 1 && (
            <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveDocId(doc.id)}
                  className={cn(
                    "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    doc.id === activeDocId ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          )}
          {activeDoc ? (
            <PdfViewer
              key={activeDoc.id}
              fileUrl={activeDoc.fileUrl}
              page={pageByDoc[activeDoc.id] ?? 1}
              onPageChange={(page) => setPageByDoc((prev) => ({ ...prev, [activeDoc.id]: page }))}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center text-slate-400">
              <UploadCloud className="size-8" />
              <p className="text-sm font-medium text-slate-500">No documents yet</p>
              <p className="max-w-xs text-xs">Upload a brochure, SPA, or payment plan through the onboarding wizard to start building this property&apos;s workspace.</p>
            </div>
          )}
        </div>

        <div
          className={cn(
            "w-full min-w-0 shrink-0 flex-col md:flex md:w-[440px]",
            mobilePane === "details" ? "flex flex-1" : "hidden"
          )}
        >
          <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as "chat" | "audit")} className="flex h-full flex-col">
            <div className="border-b border-slate-200 px-4 py-2.5">
              <TabsList className="w-full">
                <TabsTrigger value="chat" className="flex-1 gap-1.5">
                  <MessagesSquare className="size-3.5" /> Chat
                </TabsTrigger>
                <TabsTrigger value="audit" className="flex-1 gap-1.5">
                  <FileSearch className="size-3.5" /> SPA Audit
                  {auditFindings.length > 0 && (
                    <span className="ml-0.5 rounded-full bg-rose-100 px-1.5 text-[10px] font-semibold text-rose-600">
                      {auditFindings.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="chat" className="flex flex-1 flex-col overflow-hidden data-[state=inactive]:hidden">
              <ChatPanel threads={threads} citationPool={citationPool} onCitationClick={jumpTo} />
            </TabsContent>
            <TabsContent value="audit" className="flex flex-1 flex-col overflow-hidden data-[state=inactive]:hidden">
              {spaDoc ? (
                <AuditList
                  findings={auditFindings}
                  documentTitle={spaDoc.title}
                  onJumpToPage={(page) => jumpTo(spaDoc.id, page)}
                />
              ) : (
                <p className="p-4 text-sm text-slate-400">No SPA document uploaded for this property yet.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
