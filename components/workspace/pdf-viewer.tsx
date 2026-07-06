"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export function PdfViewer({
  fileUrl,
  page,
  onPageChange,
  onDocumentLoad,
}: {
  fileUrl: string;
  page: number;
  onPageChange: (page: number) => void;
  onDocumentLoad?: (numPages: number) => void;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.1);
  const [width, setWidth] = useState(560);

  useEffect(() => {
    const el = document.getElementById("pdf-viewport");
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setWidth(Math.min(720, entry.contentRect.width - 32));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="min-w-20 text-center text-sm text-slate-600">
            Page {page} {numPages ? `of ${numPages}` : ""}
          </span>
          <Button
            size="icon"
            variant="ghost"
            disabled={!numPages || page >= numPages}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={() => setScale((s) => Math.max(0.6, s - 0.15))}>
            <ZoomOut className="size-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setScale((s) => Math.min(2, s + 0.15))}>
            <ZoomIn className="size-4" />
          </Button>
        </div>
      </div>

      <div id="pdf-viewport" className="flex-1 overflow-y-auto bg-slate-50 px-4 py-6">
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            onDocumentLoad?.(numPages);
          }}
          loading={
            <div className="flex h-64 items-center justify-center gap-2 text-slate-400">
              <Loader2 className="size-4 animate-spin" /> Loading document…
            </div>
          }
          error={<div className="p-6 text-center text-sm text-rose-500">Couldn&apos;t load this document.</div>}
        >
          <Page pageNumber={page} width={width * scale} />
        </Document>
      </div>
    </div>
  );
}
