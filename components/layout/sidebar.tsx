"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LibraryBig, Scale3D, PlusCircle, FileSearch2, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/library", label: "Library", icon: LibraryBig },
  { href: "/offplan", label: "Off-plan Properties", icon: LayoutGrid },
  { href: "/compare", label: "Compare", icon: Scale3D },
  { href: "/add", label: "Add Property", icon: PlusCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <FileSearch2 className="size-4.5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 leading-tight">PropDoc</p>
          <p className="text-[11px] text-slate-400 leading-tight">Dubai off-plan research</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href === "/library" && pathname === "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-4 text-[11px] text-slate-400">
        <p>Mock data — for demo purposes only.</p>
      </div>
    </aside>
  );
}
