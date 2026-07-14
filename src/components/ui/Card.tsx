import { cn } from "@/lib/utils";

/* ================================================================
   CARD — Server Component
   Base card component with multiple visual variants.
   Used across Skills, Projects, Certs, Achievements, GitHub, About.
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
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-300",
        variantStyles[variant],
        paddingStyles[padding],
        hover && [
          "hover:border-[var(--border-hover)]",
          "hover:shadow-[var(--shadow-card-theme)]",
          "hover:-translate-y-1",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
