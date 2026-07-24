"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/motion/TiltCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   PROJECTS SECTION — Client Component
   Featured project cards with image parallax, tilt, gradient
   overlays, animated tech badges, and hover button reveal.
   ================================================================ */

/* GitHub SVG icon */
function GitHubSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* Interactive project card with parallax image */
function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[number];
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    },
    [prefersReducedMotion]
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: DURATION.slow,
        ease: EASE.smooth,
        delay: index * 0.15,
      }}
    >
      <TiltCard tiltAmount={6} className="h-full">
        <article
          className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--border-hover)] transition-all duration-500 h-full animated-border"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
        >
          {/* Mouse spotlight */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(59,130,246,0.06) 0%, transparent 50%)`,
            }}
          />

          {/* Image with parallax */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      x: (mousePos.x - 0.5) * -10,
                      y: (mousePos.y - 0.5) * -10,
                      scale: 1.05,
                    }
              }
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="relative p-6 z-[2]">
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="primary" size="sm">{tech}</Badge>
              ))}
            </div>

            {/* Links — slide up on hover */}
            <div className="flex items-center gap-3 transition-all duration-300 translate-y-2 opacity-70 group-hover:translate-y-0 group-hover:opacity-100">
              {project.github && (
                <Button variant="ghost" size="sm" href={project.github} target="_blank">
                  <GitHubSmallIcon />
                  Code
                </Button>
              )}
              {project.demo && project.demo !== "#" && project.demo !== "" && (
                <Button variant="ghost" size="sm" href={project.demo} target="_blank">
                  Demo
                  <ExternalLink size={14} className="ml-1.5" />
                </Button>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <SectionShell id="projects">
      <SectionHeading
        title="Featured Projects"
        subtitle="What I've built"
        id="projects-heading"
      />

      {/* Featured projects — large cards */}
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} isInView={isInView} />
        ))}
      </div>

      {/* Other projects — smaller cards */}
      {other.length > 0 && (
        <>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-6 text-center text-[var(--text-secondary)]">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {other.map((project, i) => (
              <motion.article
                key={project.slug}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--border-hover)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 animated-border"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: DURATION.normal,
                  ease: EASE.smooth,
                  delay: 0.3 + i * 0.1,
                }}
              >
                <h4 className="font-[family-name:var(--font-heading)] text-base font-semibold mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <Button variant="ghost" size="sm" href={project.github} target="_blank">
                      <GitHubSmallIcon />
                      Code
                    </Button>
                  )}
                  {project.demo && project.demo !== "#" && project.demo !== "" && (
                    <Button variant="ghost" size="sm" href={project.demo} target="_blank">
                      Demo
                      <ExternalLink size={14} className="ml-1.5" />
                    </Button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
