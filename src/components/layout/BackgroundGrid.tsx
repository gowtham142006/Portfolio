/* ================================================================
   BACKGROUND GRID — Server Component (CSS-only)
   Subtle dot grid background that adds depth to the page.
   No JavaScript needed — pure CSS via the .bg-grid utility.
   ================================================================ */

export function BackgroundGrid() {
  return (
    <div
      className="fixed inset-0 bg-grid pointer-events-none z-[var(--z-base)]"
      aria-hidden="true"
    />
  );
}
