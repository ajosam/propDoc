import { LibraryBig, Scale3D, PlusCircle, LayoutGrid, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { href: "/library", label: "Library", icon: LibraryBig },
  { href: "/offplan", label: "Off-plan Properties", icon: LayoutGrid },
  { href: "/compare", label: "Compare", icon: Scale3D },
  { href: "/add", label: "Add Property", icon: PlusCircle },
];
