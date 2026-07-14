"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   FLOATING ELEMENT — Client Component
   Gentle floating animation for decorative elements.
   ================================================================ */

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({
  children,
  duration = 6,
  distance = 10,
  delay = 0,
  className,
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
