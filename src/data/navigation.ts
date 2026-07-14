import type { NavItem } from "@/types";

/* ================================================================
   NAVIGATION
   Defines the main navigation items.
   Used by Navbar and CommandPalette.
   ================================================================ */

export const navItems: readonly NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "GitHub", href: "#github" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;
