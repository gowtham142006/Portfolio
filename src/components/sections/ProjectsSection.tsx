import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/* ================================================================
   PROJECTS SECTION — Server Component
   Featured project cards with images, descriptions, and tech stacks.
   ================================================================ */

/* GitHub SVG icon */
function GitHubSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function ProjectsSection() {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {featured.map((project) => (
          <article
            key={project.slug}
            className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card-theme)] transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] to-transparent" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-2">
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

              {/* Links */}
              <div className="flex items-center gap-3">
                {project.github && (
                  <Button variant="ghost" size="sm" href={project.github} target="_blank">
                    <GitHubSmallIcon />
                    Code
                  </Button>
                )}
                {project.demo && project.demo !== "#" && (
                  <Button variant="ghost" size="sm" icon={ExternalLink} href={project.demo} target="_blank">
                    Demo
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Other projects — smaller cards */}
      {other.length > 0 && (
        <>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-6 text-center text-[var(--text-secondary)]">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {other.map((project) => (
              <article
                key={project.slug}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card-theme)] transition-all duration-300 hover:-translate-y-1"
              >
                <h4 className="font-[family-name:var(--font-heading)] text-base font-semibold mb-2">
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
                  {project.demo && project.demo !== "#" && (
                    <Button variant="ghost" size="sm" icon={ExternalLink} href={project.demo} target="_blank">
                      Demo
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
