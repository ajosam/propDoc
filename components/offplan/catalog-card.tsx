"use client";

import Link from "next/link";
import { Building2, MapPin, BedDouble, Ruler, PlusCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatAED } from "@/lib/utils";
import { gradientFor } from "@/lib/gradient";
import { useLibraryStore } from "@/lib/store/library-store";
import { buildPropertyFromCatalog } from "@/lib/build-property-from-catalog";
import type { CatalogListing } from "@/lib/types";

export function CatalogCard({ listing }: { listing: CatalogListing }) {
  const added = useLibraryStore((s) => s.addedProperties.some((p) => p.id === listing.id));
  const removedIds = useLibraryStore((s) => s.removedIds);
  const addProperty = useLibraryStore((s) => s.addProperty);
  const isRemoved = removedIds.includes(listing.id);
  const inLibrary = added && !isRemoved;

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className={cn("relative flex h-24 items-end justify-between bg-gradient-to-br p-4", gradientFor(listing.id))}>
        <div className="flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <MapPin className="size-3.5" />
          {listing.area}
        </div>
        <Building2 className="absolute right-4 top-4 size-8 text-white/25" />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{listing.name}</h3>
          <p className="text-xs text-slate-500">{listing.developer}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <BedDouble className="size-3.5" /> {listing.bedrooms ?? "—"}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="size-3.5" /> {listing.sizeSqft ? `${listing.sizeSqft.toLocaleString()} sqft` : "—"}
          </span>
          <span>Handover {listing.handoverQuarter ?? "TBA"}</span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-base font-semibold text-slate-900">{formatAED(listing.listPrice, { compact: true })}</p>
            <p className="text-[11px] text-slate-400">{listing.pricePerSqft ? `AED ${listing.pricePerSqft.toLocaleString()}/sqft` : ""}</p>
          </div>
        </div>

        {inLibrary ? (
          <Link
            href={`/property/${listing.id}`}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
          >
            Added · Open in library <ArrowRight className="size-3.5" />
          </Link>
        ) : (
          <button
            onClick={() => addProperty(buildPropertyFromCatalog(listing))}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <PlusCircle className="size-3.5" /> Add to library
          </button>
        )}
      </CardContent>
    </Card>
  );
}
