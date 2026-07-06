"use client";

import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function CitationChip({
  documentTitle,
  page,
  onClick,
  active,
}: {
  documentTitle: string;
  page: number;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors",
        active
          ? "border-indigo-300 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
      )}
      title={documentTitle}
    >
      <FileText className="size-3" />
      <span className="max-w-32 truncate">{documentTitle}</span>
      <span className="text-slate-400">· p.{page}</span>
    </button>
  );
}
