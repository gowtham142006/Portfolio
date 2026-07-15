"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";

/* ================================================================
   LOADING SCREEN — Client Component
   Premium loading animation shown on initial page load.
   Auto-dismisses after content is ready.
   ================================================================ */

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

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
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[var(--z-loading)] flex items-center justify-center bg-[var(--background)]"
        >
          <div className="text-center">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold">
                <GradientText>G</GradientText>
              </h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-6 w-32 h-0.5 rounded-full bg-[var(--border)] mx-auto overflow-hidden"
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
