import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";

/* ================================================================
   BLOG PLACEHOLDER PAGE — Server Component
   Premium placeholder page to showcase future blog capabilities.
   ================================================================ */

export const metadata = {
  title: "Blog — Coming Soon",
  description: "Insights, articles, and tutorials on software development, Flutter, and AI.",
};

export default function BlogPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <BackgroundGrid />

      <div className="relative z-10 space-y-6 max-w-md mx-auto">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20">
          Coming Soon
        </span>
        <h1 className="font-[family-name:var(--font-heading)] text-5xl font-extrabold tracking-tight">
          The <GradientText>Blog</GradientText>
        </h1>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed">
          I will be sharing my insights, tutorials, and experiences on Flutter development, React/Next.js frontend engineering, and artificial intelligence here. Stay tuned!
        </p>

        <div className="pt-4 flex justify-center">
          <Button variant="outline" size="md" href="/">
            <ArrowLeft size={16} className="mr-2" />
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
}
