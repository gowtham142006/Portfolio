import { certifications } from "@/data/certifications";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

/* ================================================================
   CERTIFICATIONS SECTION — Server Component
   Grid of certification cards with issuer, date, and links.
   ================================================================ */

export function CertificationsSection() {
  return (
    <SectionShell id="certifications">
      <SectionHeading
        title="Certifications"
        subtitle="Professional development"
        id="certifications-heading"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {certifications.map((cert) => {
          const Icon = cert.icon;
          return (
            <Card key={cert.title} variant="solid" padding="md">
              <div className="flex items-start gap-3 mb-3">
                {Icon && (
                  <div className="p-2 rounded-lg bg-[var(--color-brand-secondary)]/10 shrink-0">
                    <Icon size={20} className="text-[var(--color-brand-secondary)]" aria-hidden="true" />
                  </div>
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
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500 transition-all hover:scale-105 hover:bg-blue-500 hover:text-white"
                  >
                    View Certificate →
                    
                  </a>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </SectionShell>
  );
}
