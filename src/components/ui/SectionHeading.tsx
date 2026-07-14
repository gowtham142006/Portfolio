import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";

/* ================================================================
   SECTION HEADING — Server Component
   Consistent heading with subtitle and decorative gradient line.
   Used at the top of every portfolio section.
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
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-brand-primary)] mb-3">
          {subtitle}
        </p>
      )}
      <h2
        id={id}
        className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
      >
        {gradient ? <GradientText>{title}</GradientText> : title}
      </h2>
      {/* Decorative line */}
      <div
        className={cn(
          "mt-4 h-1 w-16 rounded-full animated-gradient",
          align === "center" && "mx-auto"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
