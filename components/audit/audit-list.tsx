"use client";

import { useState } from "react";
import { AlertTriangle, ShieldAlert, ShieldQuestion, FileSearch, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AuditFindingData = {
  id: string;
  clauseRef: string;
  title: string;
  quote: string;
  page: number;
  severity: "HIGH" | "MEDIUM" | "LOW";
  explanation: string;
  recommendation: string;
};

const SEVERITY_CONFIG = {
  HIGH: { label: "High risk", variant: "rose" as const, icon: ShieldAlert },
  MEDIUM: { label: "Medium risk", variant: "amber" as const, icon: AlertTriangle },
  LOW: { label: "Low risk", variant: "slate" as const, icon: ShieldQuestion },
};

export function AuditList({
  findings,
  documentTitle,
  onJumpToPage,
}: {
  findings: AuditFindingData[];
  documentTitle: string;
  onJumpToPage: (page: number) => void;
}) {
  const [filter, setFilter] = useState<"ALL" | "HIGH" | "MEDIUM" | "LOW">("ALL");
  const visible = filter === "ALL" ? findings : findings.filter((f) => f.severity === filter);
  const counts = {
    HIGH: findings.filter((f) => f.severity === "HIGH").length,
    MEDIUM: findings.filter((f) => f.severity === "MEDIUM").length,
    LOW: findings.filter((f) => f.severity === "LOW").length,
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <FileSearch className="size-4 text-indigo-600" />
          SPA audit — {documentTitle}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["ALL", "HIGH", "MEDIUM", "LOW"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                filter === key ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              )}
            >
              {key === "ALL" ? `All (${findings.length})` : `${SEVERITY_CONFIG[key].label} (${counts[key]})`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {visible.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">No findings at this severity.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {visible.map((f) => {
              const sev = SEVERITY_CONFIG[f.severity];
              const Icon = sev.icon;
              return (
                <div key={f.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <Badge variant={sev.variant} className="mb-1.5">
                        <Icon className="size-3" /> {sev.label}
                      </Badge>
                      <h4 className="text-sm font-semibold text-slate-900">{f.title}</h4>
                      <p className="text-xs text-slate-400">{f.clauseRef} · p.{f.page}</p>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 gap-1" onClick={() => onJumpToPage(f.page)}>
                      View clause <ArrowUpRight className="size-3.5" />
                    </Button>
                  </div>

                  <blockquote className="mb-2.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs italic text-slate-600">
                    &ldquo;{f.quote}&rdquo;
                  </blockquote>

                  <p className="mb-2 text-sm text-slate-600">{f.explanation}</p>

                  <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 px-3 py-2">
                    <p className="text-xs font-medium text-indigo-700">Negotiation recommendation</p>
                    <p className="text-sm text-indigo-900">{f.recommendation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
