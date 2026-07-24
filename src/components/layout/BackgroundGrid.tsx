"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ================================================================
   BACKGROUND — Client Component
   Layered animated background with aurora, blobs, noise, spotlight,
   and the original grid pattern. All GPU-accelerated.
   ================================================================ */

export function BackgroundGrid() {
  const { x, y } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className="fixed inset-0 z-[var(--z-base)] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Base grid pattern */}
      <div className="absolute inset-0 bg-grid" />

      {/* Layer 2: Aurora bands */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute -inset-[50%] opacity-[0.15]"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 40%, rgba(139,92,246,0.15) 60%, transparent 100%)",
              animation: "aurora-drift 20s ease-in-out infinite",
              willChange: "transform",
            }}
          />
          <div
            className="absolute -inset-[50%] opacity-[0.1]"
            style={{
              background:
                "linear-gradient(225deg, rgba(6,182,212,0.15) 0%, transparent 35%, rgba(59,130,246,0.1) 65%, transparent 100%)",
              animation: "aurora-drift 25s ease-in-out infinite reverse",
              willChange: "transform",
            }}
          />
        </div>
      )}

      {/* Layer 3: Floating glowing blobs */}
      {!prefersReducedMotion && (
        <>
          <div
            className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
            style={{
              background:
                "radial-gradient(circle, var(--color-brand-primary), transparent 70%)",
              animation: "blob-float-1 18s ease-in-out infinite",
              willChange: "transform",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] rounded-full opacity-[0.04]"
            style={{
              background:
                "radial-gradient(circle, var(--color-brand-secondary), transparent 70%)",
              animation: "blob-float-2 22s ease-in-out infinite",
              willChange: "transform",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute top-[50%] left-[50%] w-[300px] h-[300px] rounded-full opacity-[0.03]"
            style={{
              background:
                "radial-gradient(circle, var(--color-brand-accent), transparent 70%)",
              animation: "blob-float-3 15s ease-in-out infinite",
              willChange: "transform",
              filter: "blur(70px)",
            }}
          />
        </>
      )}

      {/* Layer 4: Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Layer 5: Cursor spotlight — desktop only */}
      {!prefersReducedMotion && !isMobile && x !== 0 && y !== 0 && (
        <div
          className="cursor-spotlight"
          style={{
            left: x,
            top: y,
            opacity: 1,
          }}
        />
      )}

      {/* Layer 6: Radial vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--background) 80%)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
