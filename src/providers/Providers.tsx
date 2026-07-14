"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ActiveSectionProvider } from "./ActiveSectionProvider";

/* ================================================================
   PROVIDERS
   Composed root provider that wraps the entire application.
   Add new providers here to keep layout.tsx clean.
   ================================================================ */

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ActiveSectionProvider>{children}</ActiveSectionProvider>
    </ThemeProvider>
  );
}
