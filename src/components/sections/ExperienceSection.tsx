import { experiences } from "@/data/experience";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";

/* ================================================================
   EXPERIENCE SECTION — Server Component
   Uses the reusable Timeline component.
   ================================================================ */

export function ExperienceSection() {
  return (
    <SectionShell id="experience">
      <SectionHeading
        title="Experience"
        subtitle="My journey so far"
        id="experience-heading"
      />
      <div className="max-w-3xl mx-auto">
        <Timeline items={experiences} />
      </div>
    </SectionShell>
  );
}
