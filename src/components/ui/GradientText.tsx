import { cn } from "@/lib/utils";

/* ================================================================
   GRADIENT TEXT — Server Component (CSS-only animation)
   Renders text with an animated gradient effect.
   ================================================================ */

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "primary" | "accent";
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
}

export function GradientText({
  children,
  variant = "primary",
  as: Component = "span",
  className,
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        variant === "primary" ? "gradient-text" : "gradient-text-accent",
        className
      )}
    >
      {children}
    </Component>
  );
}
