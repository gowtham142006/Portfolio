"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/* ================================================================
   THEME PROVIDER
   Wraps next-themes for dark/light mode support.
   Persists preference in localStorage.
   ================================================================ */

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
