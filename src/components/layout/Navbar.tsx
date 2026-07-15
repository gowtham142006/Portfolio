"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useActiveSectionContext } from "@/providers/ActiveSectionProvider";
import { navItems } from "@/data/navigation";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import { DURATION, EASE } from "@/lib/animations";
import { GradientText } from "@/components/ui/GradientText";

/* ================================================================
   NAVBAR — Client Component
   Sticky transparent navbar with blur, active section indicator,
   mobile hamburger menu, and theme toggle.
   ================================================================ */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { activeSection } = useActiveSectionContext();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  function handleNavClick(href: string) {
    setIsMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATION.slow, ease: EASE.smooth }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300",
        isScrolled
          ? "glass shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          className="font-[family-name:var(--font-heading)] text-xl font-bold"
        >
          <GradientText>{personal.name.split(" ")[0]}</GradientText>
          <span className="text-[var(--text-muted)]">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[var(--color-brand-primary)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right side: theme toggle + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.normal, ease: EASE.smooth }}
            className="md:hidden glass border-t border-[var(--border)]"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10"
                        : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
