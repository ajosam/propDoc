import { prisma } from "@/lib/prisma";
import { computeYield } from "@/lib/finance";
import { CompareView, type CompareData } from "@/components/compare/compare-view";

export const dynamic = "force-dynamic";

export default async function ComparePage() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: "asc" } });

  const data: CompareData[] = properties.map((p) => {
    const y = computeYield(p);
    return {
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
      serviceChargePerSqft: p.serviceChargePerSqft,
      expectedRentAnnual: p.expectedRentAnnual,
      dldFeePct: p.dldFeePct,
      ...y,
    };
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-6xl flex-col px-8 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900">Compare properties</h1>
          <p className="text-sm text-slate-500">Net yield after service charges is the deciding metric for off-plan cash flow.</p>
        </div>
        <CompareView properties={data} />
      </div>
    </div>
  );
}
