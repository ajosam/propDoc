import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAED(value: number | null | undefined, opts?: { compact?: boolean }) {
  if (value === null || value === undefined) return "—";
  if (opts?.compact) {
    if (Math.abs(value) >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(2)}M`;
    if (Math.abs(value) >= 1_000) return `AED ${(value / 1_000).toFixed(0)}K`;
  }
  return `AED ${value.toLocaleString("en-AE", { maximumFractionDigits: 0 })}`;
}

export function formatPct(value: number | null | undefined, digits = 1) {
  if (value === null || value === undefined) return "—";
  return `${value.toFixed(digits)}%`;
}

export function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" });
}
