"use client";

import { useMemo } from "react";
import type { Property } from "@/lib/types";
import { useLibraryStore } from "@/lib/store/library-store";

/** Merges the static, build-time property list with client-side additions/removals. */
export function useVisibleProperties(staticProperties: Property[]): Property[] {
  const addedProperties = useLibraryStore((s) => s.addedProperties);
  const removedIds = useLibraryStore((s) => s.removedIds);

  return useMemo(() => {
    const base = staticProperties.filter((p) => !removedIds.includes(p.id));
    return [...base, ...addedProperties];
  }, [staticProperties, addedProperties, removedIds]);
}
