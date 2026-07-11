"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X, FileSearch2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLinks } from "@/components/layout/nav-links";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <FileSearch2 className="size-4" />
        </div>
        <p className="text-sm font-semibold text-slate-900">PropDoc</p>
      </div>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <button
            aria-label="Open navigation menu"
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Menu className="size-5" />
          </button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-900/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col border-r border-slate-200 bg-white shadow-xl",
              "data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left"
            )}
          >
            <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
            <div className="flex items-center justify-between gap-2 px-5 py-5">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <FileSearch2 className="size-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-tight">PropDoc</p>
                  <p className="text-[11px] text-slate-400 leading-tight">Dubai off-plan research</p>
                </div>
              </div>
              <DialogPrimitive.Close className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <X className="size-4" />
              </DialogPrimitive.Close>
            </div>

            <NavLinks className="px-3" onNavigate={() => setOpen(false)} />

            <div className="mt-auto px-4 py-4 text-[11px] text-slate-400">
              <p>Mock data — for demo purposes only.</p>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </header>
  );
}
