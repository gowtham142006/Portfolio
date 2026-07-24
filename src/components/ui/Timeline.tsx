"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";
import type { TimelineEntry, EducationEntry } from "@/types";

/* ================================================================
   TIMELINE — Client Component
   Animated vertical timeline with line drawing, node pop-in,
   card slide-in with blur, and staggered entrance.
   ================================================================ */

interface TimelineProps {
  items: readonly (TimelineEntry | EducationEntry)[];
  className?: string;
}

function isTimelineEntry(
  item: TimelineEntry | EducationEntry
): item is TimelineEntry {
  return "subtitle" in item;
}

export function Timeline({ items, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Animated vertical line — draws from top to bottom */}
      <motion.div
        className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
        style={{
          background: "linear-gradient(to bottom, var(--color-brand-primary), var(--color-brand-secondary), transparent)",
          transformOrigin: "top",
        }}
        initial={prefersReducedMotion ? {} : { scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE.smooth, delay: 0.2 }}
        aria-hidden="true"
      />

      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => {
          const Icon = item.icon;
          const title = isTimelineEntry(item) ? item.title : item.institution;
          const subtitle = isTimelineEntry(item)
            ? item.subtitle
            : `${item.degree} — ${item.field}`;
          const date = item.date;
          const description = item.description;
          const tags = isTimelineEntry(item) ? item.tags : undefined;

          return (
            <motion.div
              key={index}
              className="relative pl-12 md:pl-20"
              initial={
                prefersReducedMotion
                  ? {}
                  : { opacity: 0, x: -30, filter: "blur(6px)" }
              }
              animate={
                isInView
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                duration: DURATION.slow,
                ease: EASE.smooth,
                delay: 0.3 + index * 0.15,
              }}
            >
              {/* Timeline dot — pops in */}
              <motion.div
                className={cn(
                  "absolute left-2 md:left-6 top-1",
                  "w-4 h-4 rounded-full border-2",
                  "border-[var(--color-brand-primary)] bg-[var(--background)]",
                  "flex items-center justify-center"
                )}
                initial={prefersReducedMotion ? {} : { scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  delay: 0.4 + index * 0.15,
                }}
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
              </motion.div>

              {/* Content card */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 md:p-6 hover:border-[var(--border-hover)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <motion.div
                        className="p-2 rounded-lg bg-[var(--color-brand-primary)]/10"
                        initial={prefersReducedMotion ? {} : { scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.5 + index * 0.15,
                        }}
                      >
                        <Icon
                          size={18}
                          className="text-[var(--color-brand-primary)]"
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                  <time className="text-sm text-[var(--text-muted)] whitespace-nowrap">
                    {date}
                  </time>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                  {description}
                </p>

                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="primary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
