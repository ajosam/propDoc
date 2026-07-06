import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { computeYield } from "@/lib/finance";
import { Button } from "@/components/ui/button";
import { PropertyGrid } from "@/components/library/property-grid";
import type { PropertyCardData } from "@/components/library/property-card";

export default async function LibraryPage() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: "asc" } });

  const cards: PropertyCardData[] = properties.map((p) => ({
    id: p.id,
    name: p.name,
    developer: p.developer,
    area: p.area,
    status: p.status,
    bedrooms: p.bedrooms,
    sizeSqft: p.sizeSqft,
    handoverQuarter: p.handoverQuarter,
    listPrice: p.listPrice,
    pricePerSqft: p.pricePerSqft,
    netYieldPct: computeYield(p).netYieldPct,
  }));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-6xl flex-col px-8 py-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Your library</h1>
            <p className="text-sm text-slate-500">
              {cards.length} propert{cards.length === 1 ? "y" : "ies"} tracked · documents, chat, and audits in one workspace per property.
            </p>
          </div>
          <Button asChild variant="primary" className="gap-1.5">
            <Link href="/add">
              <PlusCircle className="size-4" /> Add property
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <PropertyGrid properties={cards} />
        </div>
      </div>
    </div>
  );
}
