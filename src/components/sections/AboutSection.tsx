import Image from "next/image";
import { personal } from "@/data/personal";
import { stats } from "@/data/stats";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";

/* ================================================================
   ABOUT SECTION — Server Component (Counter is client-side)
   Bio, profile image, and stats grid.
   ================================================================ */

export function AboutSection() {
  return (
    <SectionShell id="about">
      <SectionHeading
        title="About Me"
        subtitle="Get to know me"
        id="about-heading"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-[var(--border)] shadow-2xl">
            <Image
              src={personal.avatar}
              alt={`Photo of ${personal.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 256px, 320px"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/30 to-transparent" aria-hidden="true" />
          </div>
        </div>

        {/* Bio & Stats */}
        <div>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-8">
            {personal.bio}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} variant="glass" padding="md" hover={false}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--color-brand-primary)]/10">
                      <Icon size={20} className="text-[var(--color-brand-primary)]" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-heading)] text-2xl font-bold">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
