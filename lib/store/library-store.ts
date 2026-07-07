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
      addProperty: (property) => set((state) => ({ addedProperties: [...state.addedProperties, property] })),
      removeProperty: (id) =>
        set((state) => ({
          addedProperties: state.addedProperties.filter((p) => p.id !== id),
          removedIds: state.removedIds.includes(id) ? state.removedIds : [...state.removedIds, id],
        })),
      getAddedProperty: (id) => get().addedProperties.find((p) => p.id === id),
    }),
    { name: "propertydoc-library" }
  )
);
