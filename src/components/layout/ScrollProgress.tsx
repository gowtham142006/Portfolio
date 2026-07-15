"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   SCROLL PROGRESS — Client Component
   Thin gradient bar at the top of the page showing scroll progress.
   ================================================================ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[var(--z-toast)] origin-left animated-gradient"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
