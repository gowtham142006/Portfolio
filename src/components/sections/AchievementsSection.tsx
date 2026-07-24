"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/data/achievements";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   ACHIEVEMENTS SECTION — Client Component
   Grid of achievement cards with staggered reveal, floating idle,
   icon pulse, and glow on hover.
   ================================================================ */

export function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell id="achievements">
      <SectionHeading
        title="Achievements"
        subtitle="Milestones reached"
        id="achievements-heading"
      />

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {achievements.map((achievement, i) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: DURATION.slow,
                ease: EASE.smooth,
                delay: i * 0.1,
              }}
            >
              <Card variant="gradient" padding="md">
                <div className="flex items-start gap-4">
                  {Icon && (
                    <motion.div
                      className="p-3 rounded-xl bg-[var(--color-brand-accent)]/10 shrink-0"
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : { scale: 1.15, rotate: 5 }
                      }
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Icon size={24} className="text-[var(--color-brand-accent)]" aria-hidden="true" />
                    </motion.div>
                  )}
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold mb-1">
                      {achievement.title}
                    </h3>
                    {achievement.metric && (
                      <p className="text-sm font-medium text-[var(--color-brand-primary)] mb-2">
                        {achievement.metric}
                      </p>
                    )}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
