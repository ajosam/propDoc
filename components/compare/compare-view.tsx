"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatAED, formatPct } from "@/lib/utils";
import { gradientFor } from "@/lib/gradient";
import { STATUS_CONFIG } from "@/lib/thread-config";
import { useCompareStore } from "@/lib/store/compare-store";
import { PropertyPicker } from "@/components/compare/property-picker";
import { useVisibleProperties } from "@/lib/use-visible-properties";
import { computeYield } from "@/lib/finance";
import type { Property } from "@/lib/types";

export type CompareData = Property & ReturnType<typeof computeYield>;

type Row = {
  label: string;
  render: (d: CompareData) => React.ReactNode;
  highlight?: boolean;
};

const ROWS: Row[] = [
  { label: "List price", render: (d) => formatAED(d.listPrice) },
  { label: "All-in price (incl. 4% DLD)", render: (d) => formatAED(d.allInPrice) },
  { label: "Price / sqft", render: (d) => (d.pricePerSqft ? `AED ${d.pricePerSqft.toLocaleString()}` : "—") },
  { label: "Size", render: (d) => (d.sizeSqft ? `${d.sizeSqft.toLocaleString()} sqft` : "—") },
  { label: "Expected gross rent / yr", render: (d) => formatAED(d.grossRentAnnual) },
  { label: "Service charge / yr", render: (d) => formatAED(d.serviceChargeAnnual) },
  { label: "Net rent after service charge / yr", render: (d) => formatAED(d.netRentAnnual) },
  { label: "Gross yield", render: (d) => formatPct(d.grossYieldPct) },
  {
    label: "Net yield after service charges",
    render: (d) => <span className="font-semibold text-emerald-700">{formatPct(d.netYieldPct)}</span>,
    highlight: true,
  },
  { label: "Handover", render: (d) => d.handoverQuarter ?? "TBA" },
];

export function CompareView({ properties: staticProperties }: { properties: Property[] }) {
  const visible = useVisibleProperties(staticProperties);
  const properties: CompareData[] = visible.map((p) => ({ ...p, ...computeYield(p) }));
  const selectedIds = useCompareStore((s) => s.selectedIds);
  const selected = properties.filter((p) => selectedIds.includes(p.id));
  const maxYield = Math.max(1, ...selected.map((s) => s.netYieldPct));

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Select properties to compare</CardTitle>
          <CardDescription>Pick 2–4 properties from your library. Selection is shared with the Library page.</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyPicker properties={properties} />
        </CardContent>
      </Card>

      {selected.length < 2 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-20 text-center">
          <p className="text-sm font-medium text-slate-500">Select at least 2 properties above to compare.</p>
          <p className="text-xs text-slate-400">Net yield after service charges is the headline metric — everything else supports it.</p>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-4 text-emerald-600" /> Net yield after service charges
              </CardTitle>
              <CardDescription>Annual net rent (gross rent minus service charges) over all-in purchase price (list price + 4% DLD fee).</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {[...selected]
                .sort((a, b) => b.netYieldPct - a.netYieldPct)
                .map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-40 shrink-0 truncate text-sm text-slate-700">
                      {i === 0 && <span className="mr-1 text-amber-500">★</span>}
                      {p.name}
                    </div>
                    <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-slate-100">
                      <div
                        className={cn("h-full rounded-md bg-gradient-to-r", gradientFor(p.id))}
                        style={{ width: `${Math.max(4, (p.netYieldPct / maxYield) * 100)}%` }}
                      />
                    </div>
                    <div className="w-16 shrink-0 text-right text-sm font-semibold text-slate-900">{formatPct(p.netYieldPct)}</div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card className="overflow-x-auto">
            <CardHeader>
              <CardTitle>Side-by-side detail</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="w-56 px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Metric</th>
                    {selected.map((p) => {
                      const status = STATUS_CONFIG[p.status] ?? STATUS_CONFIG.TRACKING;
                      return (
                        <th key={p.id} className="min-w-[180px] px-5 py-3 text-left">
                          <div className="flex flex-col gap-1">
                            <Link href={`/property/${p.id}`} className="font-semibold text-slate-900 hover:text-indigo-600">
                              {p.name}
                            </Link>
                            <span className="text-xs text-slate-400">{p.developer} · {p.area}</span>
                            <Badge variant={status.variant} className="mt-0.5 w-fit">{status.label}</Badge>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label} className={cn("border-b border-slate-50", row.highlight && "bg-emerald-50/50")}>
                      <td className={cn("px-5 py-3 text-slate-500", row.highlight && "font-medium text-emerald-800")}>{row.label}</td>
                      {selected.map((p) => (
                        <td key={p.id} className="px-5 py-3 text-slate-700">
                          {row.render(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-5 py-3" />
                    {selected.map((p) => (
                      <td key={p.id} className="px-5 py-3">
                        <Button asChild size="sm" variant="outline" className="gap-1">
                          <Link href={`/property/${p.id}`}>
                            Open workspace <ArrowRight className="size-3.5" />
                          </Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
