import { skillCategories } from "@/data/skills";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/* ================================================================
   SKILLS SECTION — Server Component
   Categorized skill grid with icon badges.
   ================================================================ */

export function SkillsSection() {
  return (
    <SectionShell id="skills">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="What I work with"
        id="skills-heading"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.name} variant="gradient" padding="lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-[var(--color-brand-primary)]/10">
                  <Icon size={22} className="text-[var(--color-brand-primary)]" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill.name} variant="primary" size="md">
                    {skill.icon && <span className="mr-1">{skill.icon}</span>}
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </SectionShell>
  );
}
