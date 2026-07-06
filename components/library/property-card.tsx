"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, MapPin, BedDouble, Ruler, TrendingUp, Check, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatAED, formatPct } from "@/lib/utils";
import { gradientFor } from "@/lib/gradient";
import { STATUS_CONFIG } from "@/lib/thread-config";
import { useCompareStore } from "@/lib/store/compare-store";
import { DeletePropertyDialog } from "@/components/library/delete-property-dialog";

export type PropertyCardData = {
  id: string;
  name: string;
  developer: string;
  area: string;
  status: string;
  bedrooms: string | null;
  sizeSqft: number | null;
  handoverQuarter: string | null;
  listPrice: number;
  pricePerSqft: number | null;
  netYieldPct: number;
};

export function PropertyCard({ property }: { property: PropertyCardData }) {
  const router = useRouter();
  const selectedIds = useCompareStore((s) => s.selectedIds);
  const toggle = useCompareStore((s) => s.toggle);
  const selected = selectedIds.includes(property.id);
  const status = STATUS_CONFIG[property.status] ?? STATUS_CONFIG.TRACKING;

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/property/${property.id}`} className="block">
        <div className={cn("relative flex h-28 items-end justify-between bg-gradient-to-br p-4", gradientFor(property.id))}>
          <div className="flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <MapPin className="size-3.5" />
            {property.area}
          </div>
          <Building2 className="absolute right-4 top-4 size-8 text-white/25" />
          <Badge variant={status.variant} className="border-white/40 bg-white/90">
            {status.label}
          </Badge>
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={`/property/${property.id}`}>
            <h3 className="text-sm font-semibold text-slate-900 hover:text-indigo-600">{property.name}</h3>
          </Link>
          <p className="text-xs text-slate-500">{property.developer}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <BedDouble className="size-3.5" /> {property.bedrooms ?? "—"}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="size-3.5" /> {property.sizeSqft ? `${property.sizeSqft.toLocaleString()} sqft` : "—"}
          </span>
          <span>Handover {property.handoverQuarter ?? "TBA"}</span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-base font-semibold text-slate-900">{formatAED(property.listPrice, { compact: true })}</p>
            <p className="text-[11px] text-slate-400">{property.pricePerSqft ? `AED ${property.pricePerSqft.toLocaleString()}/sqft` : ""}</p>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-sm font-semibold text-emerald-600">
              <TrendingUp className="size-3.5" />
              {formatPct(property.netYieldPct)}
            </p>
            <p className="text-[11px] text-slate-400">net yield</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggle(property.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              selected
                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            )}
          >
            <span className={cn("flex size-3.5 items-center justify-center rounded-full border", selected ? "border-indigo-600 bg-indigo-600" : "border-slate-300")}>
              {selected && <Check className="size-2.5 text-white" />}
            </span>
            {selected ? "Added to compare" : "Add to compare"}
          </button>

          <DeletePropertyDialog
            propertyId={property.id}
            propertyName={property.name}
            onDeleted={() => {
              if (selected) toggle(property.id);
              router.refresh();
            }}
            trigger={
              <button
                title="Remove from library"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="size-3.5" />
              </button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
