"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   COUNTER — Client Component
   Animated number counter that triggers when scrolled into view.
   Uses requestAnimationFrame callback (async) to update display.
   ================================================================ */

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // For reduced motion, use setTimeout (async) to set final value
    if (prefersReducedMotion) {
      const id = setTimeout(() => setDisplayValue(value), 0);
      return () => clearTimeout(id);
    }

    let startTime: number | null = null;
    let frameId: number;
    let cancelled = false;

    // requestAnimationFrame callbacks are async and don't trigger
    // cascading renders — they batch naturally with the browser paint cycle.
    function step(timestamp: number) {
      if (cancelled) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    }

    frameId = requestAnimationFrame(step);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [isInView, value, duration, prefersReducedMotion]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
