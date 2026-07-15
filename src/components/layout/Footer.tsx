import { personal } from "@/data/personal";
import { navItems } from "@/data/navigation";
import { GradientText } from "@/components/ui/GradientText";

/* ================================================================
   FOOTER — Server Component
   Simple footer with logo, navigation, social links, copyright.
   ================================================================ */

/* Brand SVG icons for GitHub and LinkedIn */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SocialIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "GitHub": return <GitHubIcon className={className} />;
    case "LinkedIn": return <LinkedInIcon className={className} />;
    default: return null;
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & tagline */}
          <div>
            <a href="#hero" className="font-[family-name:var(--font-heading)] text-xl font-bold">
              <GradientText>{personal.name.split(" ")[0]}</GradientText>
              <span className="text-[var(--text-muted)]">.</span>
            </a>
            <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-xs">
              {personal.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navItems.slice(0, 8).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {personal.socials
                .filter((s) => s.name === "GitHub" || s.name === "LinkedIn")
                .map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              <a
                href={`mailto:${personal.email}`}
                aria-label="Send an email"
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="section-divider mt-8 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
          <p>© {currentYear} {personal.name}. All rights reserved.</p>
          <p>Built with Next.js, TypeScript & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
