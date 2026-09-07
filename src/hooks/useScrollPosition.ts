"use client";

import { useSyncExternalStore } from "react";

/* ================================================================
   useScrollPosition
   Returns raw scroll Y position and a hero-specific scroll ratio.
   Uses useSyncExternalStore for React 19 compatibility — avoids
   setState-in-effect lint errors. Throttled via rAF internally.
   ================================================================ */

interface ScrollPosition {
  scrollY: number;
  /** 0 = top of page, 1 = scrolled past one full viewport height */
  heroProgress: number;
}

let cachedPosition: ScrollPosition = { scrollY: 0, heroProgress: 0 };
let rafScheduled = false;
const listeners = new Set<() => void>();

function scheduleUpdate() {
  if (rafScheduled) return;
  rafScheduled = true;
  requestAnimationFrame(() => {
    rafScheduled = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const next: ScrollPosition = {
      scrollY: y,
      heroProgress: Math.min(y / vh, 1),
    };
    if (next.scrollY !== cachedPosition.scrollY) {
      cachedPosition = next;
      listeners.forEach((cb) => cb());
    }
  });
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);

  function onScroll() {
    scheduleUpdate();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  // Read initial position
  scheduleUpdate();

  return () => {
    listeners.delete(callback);
    window.removeEventListener("scroll", onScroll);
  };
}

function getSnapshot(): ScrollPosition {
  return cachedPosition;
}

const SERVER_SNAPSHOT: ScrollPosition = { scrollY: 0, heroProgress: 0 };

function getServerSnapshot(): ScrollPosition {
  return SERVER_SNAPSHOT;
}

export function useScrollPosition(): ScrollPosition {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
