"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   SECTION HEADING — Client Component
   Consistent heading with subtitle, animated entrance, and
   decorative gradient line that grows from center.
   ================================================================ */

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
  gradient?: boolean;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  id,
  gradient = true,
  align = "center",
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <motion.p
          className="text-sm font-medium tracking-widest uppercase text-[var(--color-brand-primary)] mb-3"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          animate={
            prefersReducedMotion || !isInView
              ? undefined
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: DURATION.normal, ease: EASE.smooth }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        id={id}
        className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
        initial={
          prefersReducedMotion
            ? undefined
            : { opacity: 0, y: 20, filter: "blur(6px)" }
        }
        animate={
          prefersReducedMotion || !isInView
            ? undefined
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{
          duration: DURATION.slow,
          ease: EASE.smooth,
          delay: 0.1,
        }}
      >
        {gradient ? <GradientText>{title}</GradientText> : title}
      </motion.h2>
      {/* Decorative line — grows from center */}
      <motion.div
        className={cn(
          "mt-4 h-1 rounded-full animated-gradient",
          align === "center" && "mx-auto"
        )}
        initial={prefersReducedMotion ? { width: 64 } : { width: 0 }}
        animate={
          prefersReducedMotion || !isInView ? undefined : { width: 64 }
        }
        transition={{
          duration: DURATION.reveal,
          ease: EASE.smooth,
          delay: 0.3,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
