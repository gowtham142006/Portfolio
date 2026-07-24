"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { personal } from "@/data/personal";
import { stats } from "@/data/stats";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { FloatingElement } from "@/components/motion/FloatingElement";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   ABOUT SECTION — Client Component
   Bio, floating profile image with gradient effects, staggered
   stats grid, and decorative background shapes.
   ================================================================ */

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell id="about">
      <SectionHeading
        title="About Me"
        subtitle="Get to know me"
        id="about-heading"
      />

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Profile Image with floating animation and gradient effects */}
        <motion.div
          className="flex justify-center lg:justify-start"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: DURATION.slow, ease: EASE.smooth }}
        >
          <div className="relative">
            {/* Floating decorative shapes behind image */}
            {!prefersReducedMotion && (
              <>
                <FloatingElement duration={8} distance={10} delay={0}>
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[var(--color-brand-primary)]/10 blur-xl" />
                </FloatingElement>
                <FloatingElement duration={10} distance={8} delay={2}>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[var(--color-brand-secondary)]/10 blur-xl" />
                </FloatingElement>
                <FloatingElement duration={12} distance={6} delay={4}>
                  <div className="absolute top-1/2 -right-8 w-12 h-12 rounded-full bg-[var(--color-brand-accent)]/10 blur-lg" />
                </FloatingElement>
              </>
            )}

            {/* Gradient border ring */}
            <div className="relative group">
              <div className="absolute -inset-[2px] rounded-2xl gradient-ring opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
              <div
                className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <FloatingElement duration={6} distance={4} delay={0}>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                  <Image
                    src={personal.avatar}
                    alt={`Photo of ${personal.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 256px, 320px"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/30 to-transparent" aria-hidden="true" />
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FloatingElement>
            </div>
          </div>
        </motion.div>

        {/* Bio & Stats */}
        <div>
          {/* Bio text with fade */}
          <motion.p
            className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.smooth, delay: 0.2 }}
          >
            {personal.bio}
          </motion.p>

          {/* Stats Grid — staggered */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: DURATION.normal,
                    ease: EASE.smooth,
                    delay: 0.3 + i * 0.1,
                  }}
                >
                  <Card variant="glass" padding="md" hover={true}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[var(--color-brand-primary)]/10">
                        <Icon size={20} className="text-[var(--color-brand-primary)]" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-heading)] text-2xl font-bold">
                          <Counter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
