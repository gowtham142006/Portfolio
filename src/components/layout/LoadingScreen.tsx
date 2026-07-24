"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   LOADING SCREEN — Client Component
   Premium loading animation with glowing logo, glowing loader bar,
   and smooth exit backdrop scale. Shown on initial page load.
   ================================================================ */

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Dismiss after a brief delay to show the animation
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.02, filter: "blur(10px)" }
          }
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[var(--z-loading)] flex items-center justify-center bg-[var(--background)]"
        >
          {/* Subtle background glow */}
          <div
            className="absolute w-96 h-96 rounded-full bg-[var(--color-brand-primary)]/10 blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 text-center">
            {/* Animated logo */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { scale: 0.7, opacity: 0, filter: "blur(10px)" }
              }
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl font-bold tracking-tight">
                <GradientText>G</GradientText>
              </h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-6 w-36 h-1 rounded-full bg-[var(--border)] mx-auto overflow-hidden p-[1px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div
                className="h-full animated-gradient rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
