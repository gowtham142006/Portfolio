"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Code } from "lucide-react";
import { personal } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticWrap } from "@/components/motion/MagneticWrap";
import { HeroScene3D } from "@/components/3d/HeroScene3D";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   HERO SECTION — Client Component
   Full-viewport hero with 3D WebGL environment, floating profile
   image with 3D tilt, role rotation, glassmorphism badge, and
   interactive depth effects.
   ================================================================ */

/* Role rotation hook */
function useRoleRotation(roles: readonly string[], interval = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, interval);
    return () => clearInterval(timer);
  }, [roles.length, interval]);
  return roles[index];
}

/* Social icon resolver */
function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "LeetCode":
      return <Code size={18} />;
    default:
      return null;
  }
}

export function HeroSection() {
  const currentRole = useRoleRotation(personal.roles);
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = useMousePosition();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Mouse-reactive spotlight offset (subtle parallax)
  // Only compute when mouse has actually moved (x/y !== 0) to avoid hydration mismatch
  const hasMouseMoved = x !== 0 || y !== 0;
  const spotlightX = isMobile || !hasMouseMoved ? 0 : (x - window.innerWidth / 2) * 0.02;
  const spotlightY = isMobile || !hasMouseMoved ? 0 : (y - window.innerHeight / 2) * 0.02;

  // Profile tilt transform — only applied after mouse interaction to avoid SSR mismatch
  const profileTilt =
    isMobile || prefersReducedMotion || !hasMouseMoved
      ? undefined
      : `rotateY(${spotlightX * 0.3}deg) rotateX(${-spotlightY * 0.3}deg)`;

  const stagger = useCallback(
    (i: number) => ({
      initial: prefersReducedMotion ? {} : { opacity: 0, y: 30, filter: "blur(6px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: DURATION.slow, ease: EASE.smooth, delay: 0.2 + i * 0.15 },
    }),
    [prefersReducedMotion]
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Introduction"
    >
      {/* ---- 3D WEBGL ENVIRONMENT ---- */}
      <HeroScene3D />

      {/* Gradient atmosphere overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, var(--background) 80%)",
        }}
      />

      {/* ---- MAIN CONTENT ---- */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Profile image with 3D tilt and gradient ring */}
        <motion.div {...stagger(0)} className="mb-8 flex justify-center">
          <MagneticWrap strength={0.15}>
            <div
              className="relative group profile-3d-tilt"
              style={{
                transform: profileTilt,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* Animated gradient ring */}
              <div className="absolute -inset-[3px] rounded-full gradient-ring opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Ambient glow — always subtly visible */}
              <div
                className="absolute -inset-5 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.2), rgba(139,92,246,0.1) 50%, transparent 70%)",
                  filter: "blur(18px)",
                }}
              />
              {/* Depth shadow */}
              <div
                className="absolute -inset-1 rounded-full opacity-20"
                style={{
                  boxShadow: "0 12px 40px rgba(59,130,246,0.3), 0 4px 16px rgba(139,92,246,0.2)",
                }}
              />
              {/* Glass backing */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src={personal.avatar}
                  alt={`Photo of ${personal.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="128px"
                  priority
                />
                {/* Light reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Subtle reflection below */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(ellipse, var(--color-brand-primary), transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
            </div>
          </MagneticWrap>
        </motion.div>

        {/* Glassmorphism status badge */}
        <motion.div {...stagger(1)} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-sm text-[var(--text-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-success)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-success)]" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...stagger(2)}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Hi, I&apos;m{" "}
          <GradientText>{personal.name}</GradientText>
        </motion.h1>

        {/* Tagline with text reveal */}
        <motion.div
          {...stagger(3)}
          className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] mb-4 max-w-2xl mx-auto"
        >
          <TextReveal text={personal.tagline} delay={0.8} />
        </motion.div>

        {/* Animated role rotation */}
        <motion.div {...stagger(4)} className="mb-10 h-8 flex items-center justify-center">
          <motion.span
            key={currentRole}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: EASE.smooth }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-sm font-medium border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)]"
          >
            {currentRole}
          </motion.span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...stagger(5)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <MagneticWrap>
            <Button
              variant="primary"
              size="lg"
              icon={ArrowDown}
              glow
              className="btn-shine"
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
              className="btn-shine"
              href={personal.resumeUrl}
              target="_blank"
            >
              Download Resume
            </Button>
          </MagneticWrap>
        </motion.div>

        {/* Floating social icons */}
        <motion.div
          {...stagger(6)}
          className="flex items-center justify-center gap-3"
        >
          {personal.socials
            .filter((s) => ["GitHub", "LinkedIn", "LeetCode"].includes(s.name))
            .map((social, i) => (
              <MagneticWrap key={social.name} strength={0.4}>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-full glass-premium text-[var(--text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors duration-300"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
                >
                  <SocialIcon name={social.name} />
                </motion.a>
              </MagneticWrap>
            ))}
        </motion.div>
      </div>

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
        <div className="relative w-6 h-10 rounded-full border-2 border-[var(--border)] flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          {/* Subtle glow behind indicator */}
          <div className="absolute -inset-2 rounded-full bg-[var(--color-brand-primary)]/5 blur-md" />
        </div>
      </motion.div>
    </section>
  );
}
