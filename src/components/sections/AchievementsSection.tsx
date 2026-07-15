import { achievements } from "@/data/achievements";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

/* ================================================================
   ACHIEVEMENTS SECTION — Server Component
   Grid of achievement cards with metrics and icons.
   ================================================================ */

export function AchievementsSection() {
  return (
    <SectionShell id="achievements">
      <SectionHeading
        title="Achievements"
        subtitle="Milestones reached"
        id="achievements-heading"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <Card key={achievement.title} variant="gradient" padding="md">
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="p-3 rounded-xl bg-[var(--color-brand-accent)]/10 shrink-0">
                    <Icon size={24} className="text-[var(--color-brand-accent)]" aria-hidden="true" />
                  </div>
                )}
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold mb-1">
                    {achievement.title}
                  </h3>
                  {achievement.metric && (
                    <p className="text-sm font-medium text-[var(--color-brand-primary)] mb-2">
                      {achievement.metric}
                    </p>
                  )}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </SectionShell>
  );
}
