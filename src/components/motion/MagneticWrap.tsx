"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   MAGNETIC WRAP — Client Component
   Magnetic hover effect — element subtly follows the cursor.
   Great for buttons and interactive elements.
   ================================================================ */

interface MagneticWrapProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticWrap({
  children,
  className,
  strength = 0.3,
}: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
