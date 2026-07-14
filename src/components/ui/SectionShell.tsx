import { cn } from "@/lib/utils";

/* ================================================================
   SECTION SHELL — Server Component
   Wraps each portfolio section with consistent spacing, max-width,
   and an id attribute for anchor navigation + IntersectionObserver.
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
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy ?? `${id}-heading`}
      className={cn(
        "relative py-20 md:py-28 px-4 sm:px-6 lg:px-8",
        "max-w-7xl mx-auto w-full",
        className
      )}
    >
      {children}
    </section>
  );
}
