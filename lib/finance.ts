import type { Property } from "@/lib/types";

export type YieldBreakdown = {
  grossRentAnnual: number;
  serviceChargeAnnual: number;
  netRentAnnual: number;
  grossYieldPct: number;
  netYieldPct: number;
  allInPrice: number;
  dldFee: number;
};

/** Net yield after service charges, on an all-in price basis (price + DLD fee). */
export function computeYield(property: Pick<Property, "listPrice" | "sizeSqft" | "serviceChargePerSqft" | "expectedRentAnnual" | "dldFeePct">): YieldBreakdown {
  const dldFee = property.listPrice * ((property.dldFeePct ?? 4) / 100);
  const allInPrice = property.listPrice + dldFee;
  const serviceChargeAnnual = (property.serviceChargePerSqft ?? 0) * (property.sizeSqft ?? 0);
  const grossRentAnnual = property.expectedRentAnnual ?? 0;
  const netRentAnnual = grossRentAnnual - serviceChargeAnnual;

  const grossYieldPct = property.listPrice > 0 ? (grossRentAnnual / property.listPrice) * 100 : 0;
  const netYieldPct = allInPrice > 0 ? (netRentAnnual / allInPrice) * 100 : 0;

  return { grossRentAnnual, serviceChargeAnnual, netRentAnnual, grossYieldPct, netYieldPct, allInPrice, dldFee };
}
