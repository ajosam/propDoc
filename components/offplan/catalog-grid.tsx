"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, MapPin, BedDouble, Wallet, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CatalogCard } from "@/components/offplan/catalog-card";
import { cn } from "@/lib/utils";
import type { CatalogListing } from "@/lib/types";

const ALL = "all";

function bedroomSortKey(bedrooms: string): number {
  if (/studio/i.test(bedrooms)) return 0;
  const match = bedrooms.match(/\d+/);
  return match ? parseInt(match[0], 10) : 99;
}

function formatCompactAED(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return String(value);
}

type Filters = {
  area: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  minSize: string;
  maxSize: string;
};

const EMPTY_FILTERS: Filters = { area: ALL, bedrooms: ALL, minPrice: "", maxPrice: "", minSize: "", maxSize: "" };

export function CatalogGrid({ listings }: { listings: CatalogListing[] }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const areas = useMemo(() => Array.from(new Set(listings.map((l) => l.area))).sort(), [listings]);
  const bedroomOptions = useMemo(
    () =>
      Array.from(new Set(listings.map((l) => l.bedrooms).filter((b): b is string => Boolean(b)))).sort(
        (a, b) => bedroomSortKey(a) - bedroomSortKey(b)
      ),
    [listings]
  );

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilter<K extends keyof Filters>(key: K) {
    updateFilter(key, EMPTY_FILTERS[key]);
  }

  const chips = useMemo(() => {
    const list: { key: string; label: string; onRemove: () => void }[] = [];
    if (filters.area !== ALL) list.push({ key: "area", label: filters.area, onRemove: () => clearFilter("area") });
    if (filters.bedrooms !== ALL) list.push({ key: "bedrooms", label: filters.bedrooms, onRemove: () => clearFilter("bedrooms") });
    if (filters.minPrice || filters.maxPrice) {
      const min = filters.minPrice ? formatCompactAED(Number(filters.minPrice)) : "0";
      const max = filters.maxPrice ? formatCompactAED(Number(filters.maxPrice)) : "∞";
      list.push({
        key: "price",
        label: `AED ${min} – ${max}`,
        onRemove: () => setFilters((prev) => ({ ...prev, minPrice: "", maxPrice: "" })),
      });
    }
    if (filters.minSize || filters.maxSize) {
      const min = filters.minSize || "0";
      const max = filters.maxSize || "∞";
      list.push({
        key: "size",
        label: `${min} – ${max} sqft`,
        onRemove: () => setFilters((prev) => ({ ...prev, minSize: "", maxSize: "" })),
      });
    }
    return list;
  }, [filters]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    const minSize = filters.minSize ? Number(filters.minSize) : null;
    const maxSize = filters.maxSize ? Number(filters.maxSize) : null;

    return listings.filter((l) => {
      if (q && !l.name.toLowerCase().includes(q) && !l.developer.toLowerCase().includes(q) && !l.area.toLowerCase().includes(q)) {
        return false;
      }
      if (filters.area !== ALL && l.area !== filters.area) return false;
      if (filters.bedrooms !== ALL && l.bedrooms !== filters.bedrooms) return false;
      if (minPrice !== null && l.listPrice < minPrice) return false;
      if (maxPrice !== null && l.listPrice > maxPrice) return false;
      if (minSize !== null && (l.sizeSqft ?? 0) < minSize) return false;
      if (maxSize !== null && (l.sizeSqft ?? Infinity) > maxSize) return false;
      return true;
    });
  }, [listings, query, filters]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <SlidersHorizontal className="size-4 text-slate-400" />
            Filters
          </div>
          <p className="text-xs text-slate-400">
            <span className="font-medium text-slate-600">{filtered.length}</span> of {listings.length} listings
          </p>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project, developer, or area..."
              className="pl-9"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FilterField icon={MapPin} label="Location">
              <Select value={filters.area} onValueChange={(v) => updateFilter("area", v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All areas</SelectItem>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField icon={BedDouble} label="Bedrooms">
              <Select value={filters.bedrooms} onValueChange={(v) => updateFilter("bedrooms", v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>Any</SelectItem>
                  {bedroomOptions.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField icon={Wallet} label="Price (AED)">
              <div className="flex items-center gap-1.5">
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                  className="min-w-0"
                />
                <span className="shrink-0 text-slate-300">–</span>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  className="min-w-0"
                />
              </div>
            </FilterField>

            <FilterField icon={Ruler} label="Size (sqft)">
              <div className="flex items-center gap-1.5">
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Min"
                  value={filters.minSize}
                  onChange={(e) => updateFilter("minSize", e.target.value)}
                  className="min-w-0"
                />
                <span className="shrink-0 text-slate-300">–</span>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Max"
                  value={filters.maxSize}
                  onChange={(e) => updateFilter("maxSize", e.target.value)}
                  className="min-w-0"
                />
              </div>
            </FilterField>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3">
            {chips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.onRemove}
                className="flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
              >
                {chip.label}
                <X className="size-3" />
              </button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setFilters(EMPTY_FILTERS)} className="h-6 gap-1 px-2 text-xs text-slate-500">
              Clear all
            </Button>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center text-sm text-slate-400">
          <SlidersHorizontal className="size-6" />
          No listings match your search or filters.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((listing) => (
            <CatalogCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterField({
  icon: Icon,
  label,
  children,
  className,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Icon className="size-3.5" />
        {label}
      </Label>
      {children}
    </div>
  );
}
