"use client";

import { useSyncExternalStore } from "react";

/* ================================================================
   useMediaQuery
   Returns whether a CSS media query matches.
   Uses useSyncExternalStore for React 19 compatibility.
   ================================================================ */

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false // Server snapshot
  );
}
