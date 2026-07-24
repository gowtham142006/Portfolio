"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { LucideIcon } from "lucide-react";

/* ================================================================
   BUTTON — Client Component (event handlers)
   Unified button with multiple variants, sizes, micro-interactions,
   shine effects, and magnetic spring feedback.
   Renders as <a> when href is provided.
   ================================================================ */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  href?: string;
  target?: string;
  glow?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary)]/90 shadow-lg shadow-[var(--color-brand-primary)]/25",
  secondary:
    "bg-[var(--color-brand-secondary)] text-white hover:bg-[var(--color-brand-secondary)]/90 shadow-lg shadow-[var(--color-brand-secondary)]/25",
  ghost:
    "bg-transparent text-[var(--foreground)] hover:bg-[var(--card)]",
  outline:
    "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--card)]",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-base gap-2",
  lg: "px-8 py-3 text-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      href,
      target,
      glow = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const prefersReducedMotion = useReducedMotion();

    const classes = cn(
      "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 btn-shine cursor-pointer",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
      "disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      glow && "hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
      className
    );

    const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

    const content = (
      <>
        {Icon && iconPosition === "left" && (
          <Icon size={iconSize} aria-hidden="true" />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon size={iconSize} aria-hidden="true" />
        )}
      </>
    );

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.97 },
          transition: { type: "spring" as const, stiffness: 400, damping: 20 },
        };

    if (href) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={classes}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        {...(props as object)}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }
);
