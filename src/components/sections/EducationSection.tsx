import { education } from "@/data/education";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";

/* ================================================================
   EDUCATION SECTION — Server Component
   Uses the reusable Timeline component.
   ================================================================ */

export function EducationSection() {
  return (
    <SectionShell id="education">
      <SectionHeading
        title="Education"
        subtitle="Academic background"
        id="education-heading"
      />
      <div className="max-w-3xl mx-auto">
        <Timeline items={education} />
      </div>
    </SectionShell>
  );
}
