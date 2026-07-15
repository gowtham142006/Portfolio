import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { AnimatedCursor } from "@/components/layout/AnimatedCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";

// Import all sections
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

/* ================================================================
   HOME PAGE — Server Component
   Composes all layout elements and portfolio sections.
   ================================================================ */

export default function HomePage() {
  return (
    <>
      {/* Global layout utilities */}
      <BackgroundGrid />
      <ScrollProgress />
      <AnimatedCursor />
      <LoadingScreen />
      <CommandPalette />

      {/* Main navigation */}
      <Navbar />

      {/* Main page content */}
      <main id="main-content" className="relative z-10 flex flex-col min-h-screen">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <GitHubSection />
        <CertificationsSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top floating button */}
      <BackToTop />
    </>
  );
}
