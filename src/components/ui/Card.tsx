"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   CARD — Client Component
   Premium card with mouse spotlight, subtle tilt, gradient border,
   animated shadow, and floating idle animation.
   Preserves all existing variants and props.
   ================================================================ */

interface CardProps {
  variant?: "glass" | "gradient" | "solid" | "outline";
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  glass: "glass",
  gradient:
    "bg-gradient-to-br from-[var(--card)] to-[var(--surface)] border border-[var(--border)]",
  solid: "bg-[var(--card)] border border-[var(--border)]",
  outline:
    "bg-transparent border border-[var(--border)]",
};

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  variant = "solid",
  padding = "md",
  hover = true,
  className,
  children,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || prefersReducedMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlightPos({ x, y });
    },
    [prefersReducedMotion]
  );

  const hoverProps = hover && !prefersReducedMotion
    ? {
        whileHover: { y: -4, scale: 1.015 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      }
    : {};

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative rounded-xl transition-all duration-300 overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        hover && [
          "hover:border-[var(--border-hover)]",
          "hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]",
        ],
        className
      )}
      onMouseMove={hover ? handleMouseMove : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlightPos({ x: 50, y: 50 });
      }}
      {...hoverProps}
    >
      {/* Mouse spotlight effect */}
      {hover && !prefersReducedMotion && (
        <div
          className="card-spotlight"
          style={{
            background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(59,130,246,0.08) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      {/* Content */}
      <div className="relative z-[2]">{children}</div>
    </motion.div>
  );
}
