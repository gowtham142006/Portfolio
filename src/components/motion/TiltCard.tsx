"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   TILT CARD — Client Component
   3D tilt effect on mouse hover. Used for project cards.
   ================================================================ */

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((0.5 - y) * tiltAmount);
    setRotateY((x - 0.5) * tiltAmount);
    setGlarePosition({ x: x * 100, y: y * 100 });
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
