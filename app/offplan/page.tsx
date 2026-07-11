import { OFFPLAN_CATALOG } from "@/lib/data/offplan-catalog";
import { CatalogGrid } from "@/components/offplan/catalog-grid";

export default function OffplanPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-2">
          <h1 className="text-xl font-semibold text-slate-900">Off-plan properties</h1>
          <p className="text-sm text-slate-500">Browse available off-plan listings and add the ones you want to track to your library.</p>
        </div>

        <div className="mt-6">
          <CatalogGrid listings={OFFPLAN_CATALOG} />
        </div>
      </div>
    </div>
  );
}
