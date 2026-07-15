"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   COMMAND PALETTE — Client Component
   Ctrl+K / Cmd+K command palette for quick navigation.
   ================================================================ */

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle with Ctrl+K / Cmd+K
  useKeyboardShortcut("k", () => {
    setIsOpen((prev) => {
      if (!prev) setQuery(""); // Clear query when opening
      return !prev;
    });
  }, { ctrlKey: true });

  // Close on Escape
  useKeyboardShortcut("Escape", () => setIsOpen(false));

  // Focus input when opened
  useEffect(() => {
    if (!isOpen) return;
    // Small delay to let animation start
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  function handleSelect(href: string) {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            className="fixed inset-0 z-[var(--z-modal)] bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: DURATION.normal, ease: EASE.smooth }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[var(--z-modal)] w-full max-w-lg mx-4"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-[var(--border)]">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search size={18} className="text-[var(--text-muted)]" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search sections..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none"
                  aria-label="Search sections"
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-[var(--text-muted)] bg-[var(--card)] rounded border border-[var(--border)]">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-64 overflow-y-auto py-2">
                {filteredItems.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-[var(--text-muted)] text-center">
                    No results found.
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-sm",
                        "text-[var(--text-secondary)] hover:text-[var(--foreground)]",
                        "hover:bg-[var(--card)] transition-colors"
                      )}
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={14} className="text-[var(--text-muted)]" />
                    </button>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-[var(--border)] flex items-center gap-4 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[var(--card)] rounded border border-[var(--border)]">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[var(--card)] rounded border border-[var(--border)]">↵</kbd>
                  Select
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
