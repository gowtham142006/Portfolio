"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   SECTION SHELL — Client Component
   Wraps each portfolio section with consistent spacing, max-width,
   scroll-triggered reveal animation, and an id for anchor navigation.
   ================================================================ */

interface SectionShellProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

export function SectionShell({
  id,
  className,
  children,
  "aria-labelledby": ariaLabelledBy,
}: SectionShellProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledBy ?? `${id}-heading`}
      className={cn(
        "relative py-20 md:py-28 px-4 sm:px-6 lg:px-8",
        "max-w-7xl mx-auto w-full",
        className
      )}
    >
      {prefersReducedMotion ? (
        children
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 40, filter: "blur(8px)" }
          }
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="section-reveal"
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
