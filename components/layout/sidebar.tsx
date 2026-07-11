import { FileSearch2 } from "lucide-react";
import { NavLinks } from "@/components/layout/nav-links";

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <FileSearch2 className="size-4.5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 leading-tight">PropDoc</p>
          <p className="text-[11px] text-slate-400 leading-tight">Dubai off-plan research</p>
        </div>
      </div>

      <NavLinks className="px-3" />

      <div className="mt-auto px-4 py-4 text-[11px] text-slate-400">
        <p>Mock data — for demo purposes only.</p>
      </div>
    </aside>
  );
}
