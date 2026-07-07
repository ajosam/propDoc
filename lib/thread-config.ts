import type { ChatThreadType } from "@/lib/types";
import { Scale, LandPlot, MessageSquare, Wallet } from "lucide-react";

export const THREAD_ORDER: ChatThreadType[] = ["GENERAL", "FINANCIAL", "LEGAL", "LOCATION"];

export const THREAD_CONFIG: Record<
  ChatThreadType,
  { label: string; icon: typeof MessageSquare; accent: string; accentSoft: string; accentText: string; placeholder: string }
> = {
  GENERAL: {
    label: "General",
    icon: MessageSquare,
    accent: "bg-slate-600",
    accentSoft: "bg-slate-100",
    accentText: "text-slate-700",
    placeholder: "Ask about the unit, project, or developer...",
  },
  FINANCIAL: {
    label: "Financial",
    icon: Wallet,
    accent: "bg-emerald-600",
    accentSoft: "bg-emerald-50",
    accentText: "text-emerald-700",
    placeholder: "Ask about payment plan, service charges, yield...",
  },
  LEGAL: {
    label: "Legal",
    icon: Scale,
    accent: "bg-amber-600",
    accentSoft: "bg-amber-50",
    accentText: "text-amber-700",
    placeholder: "Ask about SPA clauses, termination, penalties...",
  },
  LOCATION: {
    label: "Location",
    icon: LandPlot,
    accent: "bg-blue-600",
    accentSoft: "bg-blue-50",
    accentText: "text-blue-700",
    placeholder: "Ask about connectivity, amenities, comparables...",
  },
};

export const DOC_TYPE_LABEL: Record<string, string> = {
  BROCHURE: "Brochure",
  SPA: "Sale & Purchase Agreement",
  PAYMENT_PLAN: "Payment Plan",
  MARKET_REPORT: "Market Report",
  OTHER: "Document",
};

export const STATUS_CONFIG: Record<string, { label: string; variant: "indigo" | "amber" | "emerald" | "slate" | "rose" }> = {
  TRACKING: { label: "Tracking", variant: "slate" },
  UNDER_REVIEW: { label: "Under Review", variant: "amber" },
  OFFER_MADE: { label: "Offer Made", variant: "indigo" },
  RESERVED: { label: "Reserved", variant: "emerald" },
  PASSED: { label: "Passed", variant: "rose" },
};
