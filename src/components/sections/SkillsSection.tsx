"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   SKILLS SECTION — Client Component
   Categorized skill grid with animated badge entrance, hover
   effects, and staggered card reveal.
   ================================================================ */

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell id="skills">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="What I work with"
        id="skills-heading"
      />

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, cardIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: DURATION.slow,
                ease: EASE.smooth,
                delay: cardIndex * 0.1,
              }}
            >
              <Card variant="gradient" padding="lg">
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
                    className="p-2.5 rounded-xl bg-[var(--color-brand-primary)]/10"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon size={22} className="text-[var(--color-brand-primary)]" aria-hidden="true" />
                  </motion.div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill.name}
                      className="inline-flex items-center rounded-full font-medium px-3 py-1 text-sm bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20 transition-all duration-300 hover:bg-[var(--color-brand-primary)]/20 hover:scale-105 cursor-default"
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        ease: EASE.smooth,
                        delay: cardIndex * 0.1 + 0.3 + i * 0.04,
                      }}
                    >
                      {skill.icon && <span className="mr-1">{skill.icon}</span>}
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
