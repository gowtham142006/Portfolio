"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ================================================================
   BADGE — Client Component
   Displays a small tag/label with hover glow, scale, and gradient
   hover effect. Used for tech stack, skills, tags.
   ================================================================ */

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-[var(--card)] text-[var(--text-secondary)] border border-[var(--border)]",
  primary:
    "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20",
  secondary:
    "bg-[var(--color-brand-secondary)]/10 text-[var(--color-brand-secondary)] border border-[var(--color-brand-secondary)]/20",
  accent:
    "bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/20",
  outline:
    "bg-transparent text-[var(--text-secondary)] border border-[var(--border)]",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-all duration-300 cursor-default",
        "hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      whileHover={
        prefersReducedMotion
          ? {}
          : { scale: 1.05 }
      }
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.span>
  );
}
