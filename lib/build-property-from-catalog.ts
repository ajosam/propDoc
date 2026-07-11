import { buildWelcomeChatThreads } from "@/lib/build-welcome-threads";
import type { CatalogListing, Property } from "@/lib/types";

/** Adds a catalog listing to the library as a tracked Property — no documents until one is uploaded. */
export function buildPropertyFromCatalog(listing: CatalogListing): Property {
  return {
    ...listing,
    status: "TRACKING",
    documents: [],
    chatThreads: buildWelcomeChatThreads(listing.id),
    auditFindings: [],
    extractionFields: [],
  };
}
