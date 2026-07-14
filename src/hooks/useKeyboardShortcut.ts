"use client";

import { useEffect, useCallback } from "react";

/* ================================================================
   useKeyboardShortcut
   Listens for keyboard shortcuts (e.g., Ctrl+K for command palette).
   ================================================================ */

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    preventDefault?: boolean;
  } = {}
): void {
  const {
    ctrlKey = false,
    metaKey = false,
    shiftKey = false,
    preventDefault = true,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const matchesKey = event.key.toLowerCase() === key.toLowerCase();
      const matchesCtrl = ctrlKey ? event.ctrlKey || event.metaKey : true;
      const matchesMeta = metaKey ? event.metaKey : true;
      const matchesShift = shiftKey ? event.shiftKey : true;

      if (matchesKey && matchesCtrl && matchesMeta && matchesShift) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    },
    [key, callback, ctrlKey, metaKey, shiftKey, preventDefault]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
