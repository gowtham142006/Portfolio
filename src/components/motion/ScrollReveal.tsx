"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp } from "@/lib/animations";

/* ================================================================
   SCROLL REVEAL — Client Component
   Wraps children with scroll-triggered reveal animations.
   Falls back to static render when reduced motion is preferred.
   ================================================================ */

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  variants = fadeUp,
  delay = 0,
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
