"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   PARALLAX WRAP — Client Component
   Parallax scrolling effect. Element moves at a different speed
   than the scroll, creating depth.
   ================================================================ */

interface ParallaxWrapProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxWrap({
  children,
  speed = 0.5,
  className,
}: ParallaxWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
