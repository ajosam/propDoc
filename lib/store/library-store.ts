"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Property } from "@/lib/types";

type LibraryStore = {
  addedProperties: Property[];
  removedIds: string[];
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
  getAddedProperty: (id: string) => Property | undefined;
};

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      addedProperties: [],
      removedIds: [],
      addProperty: (property) =>
        set((state) => ({
          addedProperties: state.addedProperties.some((p) => p.id === property.id)
            ? state.addedProperties.map((p) => (p.id === property.id ? property : p))
            : [...state.addedProperties, property],
          removedIds: state.removedIds.filter((id) => id !== property.id),
        })),
      removeProperty: (id) =>
        set((state) => ({
          addedProperties: state.addedProperties.filter((p) => p.id !== id),
          removedIds: state.removedIds.includes(id) ? state.removedIds : [...state.removedIds, id],
        })),
      getAddedProperty: (id) => get().addedProperties.find((p) => p.id === id),
    }),
    {
      name: "propertydoc-library",
      merge: (persisted, current) => {
        const merged = { ...current, ...(persisted as Partial<LibraryStore>) };
        const seen = new Set<string>();
        merged.addedProperties = merged.addedProperties.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
        merged.removedIds = Array.from(new Set(merged.removedIds));
        return merged;
      },
    }
  )
);
