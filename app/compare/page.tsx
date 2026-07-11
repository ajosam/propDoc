import { PROPERTIES } from "@/lib/data/properties";
import { CompareView } from "@/components/compare/compare-view";

export default function ComparePage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900">Compare properties</h1>
          <p className="text-sm text-slate-500">Net yield after service charges is the deciding metric for off-plan cash flow.</p>
        </div>
        <CompareView properties={PROPERTIES} />
      </div>
    </div>
  );
}
