"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CompareStore = {
  selectedIds: string[];
  toggle: (id: string) => void;
  clear: () => void;
  set: (ids: string[]) => void;
};

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      toggle: (id) => {
        const current = get().selectedIds;
        set({
          selectedIds: current.includes(id)
            ? current.filter((x) => x !== id)
            : current.length >= 4
              ? current
              : [...current, id],
        });
      },
      clear: () => set({ selectedIds: [] }),
      set: (ids) => set({ selectedIds: ids }),
    }),
    { name: "propertydoc-compare-selection" }
  )
);
