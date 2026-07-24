"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/data/certifications";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   CERTIFICATIONS SECTION — Client Component
   Grid of certification cards with staggered reveal, hover glow,
   icon rotation, and gradient border.
   ================================================================ */

export function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell id="certifications">
      <SectionHeading
        title="Certifications"
        subtitle="Professional development"
        id="certifications-heading"
      />

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {certifications.map((cert, i) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={cert.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: DURATION.slow,
                ease: EASE.smooth,
                delay: i * 0.1,
              }}
            >
              <Card variant="solid" padding="md" className="animated-border">
                <div className="flex items-start gap-3 mb-3">
                  {Icon && (
                    <motion.div
                      className="p-2 rounded-lg bg-[var(--color-brand-secondary)]/10 shrink-0"
                      whileHover={prefersReducedMotion ? {} : { rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Icon size={20} className="text-[var(--color-brand-secondary)]" aria-hidden="true" />
                    </motion.div>
                  )}
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{cert.issuer}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {cert.description}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs text-[var(--text-muted)]">{cert.date}</time>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500 transition-all hover:scale-105 hover:bg-blue-500 hover:text-white btn-shine"
                    >
                      View Certificate →
                      
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
