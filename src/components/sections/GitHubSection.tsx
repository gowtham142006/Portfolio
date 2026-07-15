import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

/* ================================================================
   GITHUB SECTION — Server Component
   Displays GitHub contribution graph image and profile link.
   Uses the GitHub contribution chart API.
   ================================================================ */

export function GitHubSection() {
  const username = siteConfig.github.replace("https://github.com/", "");

  return (
    <SectionShell id="github">
      <SectionHeading
        title="GitHub Activity"
        subtitle="Open source contributions"
        id="github-heading"
      />

      <div className="max-w-4xl mx-auto">
        <Card variant="glass" padding="lg">
          {/* Contribution graph */}
          <div className="rounded-xl overflow-hidden bg-[var(--background)] p-4">
            <Image
              src={`https://ghchart.rshah.org/3B82F6/${username}`}
              alt={`${username}'s GitHub contribution chart`}
              width={800}
              height={120}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* GitHub profile link */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className="text-[var(--foreground)]">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <div>
                <p className="font-[family-name:var(--font-heading)] font-semibold">@{username}</p>
                <p className="text-sm text-[var(--text-muted)]">View full profile on GitHub</p>
              </div>
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] transition-colors"
            >
              Visit Profile →
            </a>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}
