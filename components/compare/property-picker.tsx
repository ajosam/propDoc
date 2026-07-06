"use client";

import { Check } from "lucide-react";
import { cn, formatAED } from "@/lib/utils";
import { useCompareStore } from "@/lib/store/compare-store";
import type { CompareData } from "@/components/compare/compare-view";

export function PropertyPicker({ properties }: { properties: CompareData[] }) {
  const selectedIds = useCompareStore((s) => s.selectedIds);
  const toggle = useCompareStore((s) => s.toggle);

  return (
    <div className="flex flex-wrap gap-2">
      {properties.map((p) => {
        const selected = selectedIds.includes(p.id);
        return (
          <button
            key={p.id}
            onClick={() => toggle(p.id)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              selected
                ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            <span className={cn("flex size-3.5 items-center justify-center rounded-full border", selected ? "border-indigo-600 bg-indigo-600" : "border-slate-300")}>
              {selected && <Check className="size-2.5 text-white" />}
            </span>
            {p.name}
            <span className="text-slate-400">· {formatAED(p.listPrice, { compact: true })}</span>
          </button>
        );
      })}
    </div>
  );
}
