"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { personal } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { TextReveal } from "@/components/motion/TextReveal";
import { FloatingElement } from "@/components/motion/FloatingElement";
import { MagneticWrap } from "@/components/motion/MagneticWrap";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   HERO SECTION — Client Component
   Full-viewport hero with animated text, floating orbs, CTA buttons.
   ================================================================ */

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Introduction"
    >
      {/* Decorative floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <FloatingElement duration={8} distance={20} delay={0}>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[var(--color-brand-primary)]/5 blur-[100px]" />
        </FloatingElement>
        <FloatingElement duration={10} distance={15} delay={2}>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--color-brand-secondary)]/5 blur-[120px]" />
        </FloatingElement>
        <FloatingElement duration={12} distance={25} delay={4}>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[var(--color-brand-accent)]/5 blur-[80px]" />
        </FloatingElement>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE.smooth, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/50 text-sm text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-success)] animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE.smooth, delay: 0.4 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Hi, I&apos;m{" "}
          <GradientText>{personal.name}</GradientText>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.slow, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto"
        >
          <TextReveal text={personal.tagline} delay={0.8} />
        </motion.div>

        {/* Role badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {personal.roles.slice(0, 3).map((role) => (
            <span
              key={role}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-[var(--border)] bg-[var(--card)]/50 text-[var(--text-secondary)]"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticWrap>
            <Button
              variant="primary"
              size="lg"
              icon={ArrowDown}
              glow
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
            </Button>
          </MagneticWrap>
          <MagneticWrap>
            <Button
              variant="outline"
              size="lg"
              icon={Download}
              href={personal.resumeUrl}
              target="_blank"
            >
              Download Resume
            </Button>
          </MagneticWrap>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[var(--border)] flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
