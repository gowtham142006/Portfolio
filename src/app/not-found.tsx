import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";

/* ================================================================
   NOT FOUND PAGE — Server Component
   Premium 404 page that matches the site's dark design system.
   ================================================================ */

export const metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <BackgroundGrid />

      <div className="relative z-10 space-y-6 max-w-md mx-auto">
        <h1 className="font-[family-name:var(--font-heading)] text-8xl font-extrabold tracking-wider">
          <GradientText>404</GradientText>
        </h1>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--foreground)]">
          Lost in Space
        </h2>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
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
