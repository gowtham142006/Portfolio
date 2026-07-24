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
   Sticky glass navbar with dynamic blur, scroll shrink, animated
   active indicator, magnetic navigation, and smooth transitions.
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
        "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-500",
        isScrolled
          ? "glass-premium shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-500",
          isScrolled ? "h-14" : "h-16"
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          className="font-[family-name:var(--font-heading)] text-xl font-bold group"
        >
          <GradientText>{personal.name.split(" ")[0]}</GradientText>
          <span className="text-[var(--text-muted)] group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">.</span>
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
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  isActive
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)]/50"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[var(--color-brand-primary)]"
                    initial={false}
                    animate={{ width: 20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{
                      boxShadow: "0 0 8px rgba(59,130,246,0.4)",
                    }}
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
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-300"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          )}

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Bottom border — fades in on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.normal, ease: EASE.smooth }}
            className="md:hidden glass-premium border-t border-[var(--border)]"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10"
                        : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
