"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Scale3D, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/library/property-card";
import { useCompareStore } from "@/lib/store/compare-store";
import { useVisibleProperties } from "@/lib/use-visible-properties";
import type { Property } from "@/lib/types";

export function PropertyGrid({ properties: staticProperties }: { properties: Property[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const properties = useVisibleProperties(staticProperties);
  const selectedIds = useCompareStore((s) => s.selectedIds);
  const clear = useCompareStore((s) => s.clear);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
    );
  }, [properties, query]);

  return (
    <div className="flex flex-1 flex-col">
      <p className="mb-3 text-sm text-slate-500">
        {properties.length} propert{properties.length === 1 ? "y" : "ies"} tracked
      </p>
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by project, developer, or area..."
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-24 text-sm text-slate-400">
          No properties match &ldquo;{query}&rdquo;.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-lg">
            <span className="text-sm text-slate-600">
              <strong className="text-slate-900">{selectedIds.length}</strong> selected for comparison
            </span>
            <Button size="sm" variant="ghost" onClick={clear} className="gap-1">
              <X className="size-3.5" /> Clear
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="gap-1.5"
              disabled={selectedIds.length < 2}
              onClick={() => router.push("/compare")}
            >
              <Scale3D className="size-3.5" /> Compare now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
