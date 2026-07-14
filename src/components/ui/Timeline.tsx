import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import type { TimelineEntry, EducationEntry } from "@/types";

/* ================================================================
   TIMELINE — Server Component
   Reusable vertical timeline for Experience AND Education sections.
   Accepts either TimelineEntry[] or EducationEntry[] via generics.
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
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div
        className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-transparent"
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
            <div key={index} className="relative pl-12 md:pl-20">
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-2 md:left-6 top-1",
                  "w-4 h-4 rounded-full border-2",
                  "border-[var(--color-brand-primary)] bg-[var(--background)]",
                  "flex items-center justify-center"
                )}
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
              </div>

              {/* Content */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 md:p-6 hover:border-[var(--border-hover)] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className="p-2 rounded-lg bg-[var(--color-brand-primary)]/10">
                        <Icon
                          size={18}
                          className="text-[var(--color-brand-primary)]"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
