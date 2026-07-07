"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLibraryStore } from "@/lib/store/library-store";
import { buildWorkspaceProps } from "@/lib/build-workspace-props";
import { WorkspaceView } from "@/components/workspace/workspace-view";

export function ClientOnlyWorkspace({ propertyId }: { propertyId: string }) {
  const property = useLibraryStore((s) => s.getAddedProperty(propertyId));

  if (!property) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-medium text-slate-600">This property isn&apos;t in your library.</p>
        <p className="max-w-sm text-xs text-slate-400">
          It may have been removed, or added from a different browser — properties added via the wizard are stored locally in this browser only.
        </p>
        <Link href="/library" className="mt-1 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          <ArrowLeft className="size-3.5" /> Back to library
        </Link>
      </div>
    );
  }

  const props = buildWorkspaceProps(property);
  return <WorkspaceView {...props} />;
}
