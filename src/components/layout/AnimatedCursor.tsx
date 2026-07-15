"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ================================================================
   ANIMATED CURSOR — Client Component
   Custom cursor glow that follows mouse. Desktop only.
   ================================================================ */

export function AnimatedCursor() {
  const { x, y } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(isClickable);
    }

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Don't render on mobile or when reduced motion is preferred
  if (prefersReducedMotion || isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[var(--z-cursor)] mix-blend-screen"
      animate={{
        x: x - (isPointer ? 24 : 16),
        y: y - (isPointer ? 24 : 16),
        width: isPointer ? 48 : 32,
        height: isPointer ? 48 : 32,
        opacity: x === 0 && y === 0 ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{
        background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
      }}
      aria-hidden="true"
    />
  );
}
