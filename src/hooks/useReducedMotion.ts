"use client";

import { useSyncExternalStore } from "react";

/* ================================================================
   useReducedMotion
   Respects the user's prefers-reduced-motion system setting.
   All animation components check this before animating.
   Uses useSyncExternalStore for React 19 compatibility.
   ================================================================ */

const QUERY = "(prefers-reduced-motion: reduce)";

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(QUERY);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia(QUERY).matches,
    () => false // Server snapshot — assume motion is fine
  );
}
