import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { PROPERTIES } from "@/lib/data/properties";
import { Button } from "@/components/ui/button";
import { PropertyGrid } from "@/components/library/property-grid";

export default function LibraryPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Your library</h1>
            <p className="text-sm text-slate-500">Documents, chat, and audits in one workspace per property.</p>
          </div>
          <Button asChild variant="primary" className="gap-1.5">
            <Link href="/add">
              <PlusCircle className="size-4" /> Add property
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <PropertyGrid properties={PROPERTIES} />
        </div>
      </div>
    </div>
  );
}
