"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollPosition } from "@/hooks/useScrollPosition";

/* ================================================================
   HERO SCENE 3D
   Client-only wrapper that dynamically imports the PortfolioScene
   to avoid SSR issues with WebGL. Manages scroll-based fade,
   normalized mouse tracking, and passes all context to the scene.
   ================================================================ */

// Dynamic import — SSR disabled for WebGL
const PortfolioScene = dynamic(
  () =>
    import("./PortfolioScene").then((mod) => ({
      default: mod.PortfolioScene,
    })),
  { ssr: false }
);

export function HeroScene3D() {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { heroProgress } = useScrollPosition();

  // Normalized mouse position: [-1, 1] range
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseRef.current = { x: nx, y: ny };
  }, []);

  // Use rAF to batch mouse updates — avoids flooding React state
  useEffect(() => {
    if (isMobile) return;

    let rafId: number;

    function updateMouse() {
      setMouse({ ...mouseRef.current });
      rafId = requestAnimationFrame(updateMouse);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateMouse);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, handleMouseMove]);

  // Opacity: fully visible at top, fades out by ~35% scroll
  const opacity = Math.max(0, 1 - heroProgress * 2.8);

  // Don't render the scene at all when scrolled well past the hero
  if (heroProgress > 0.5) return null;

  const theme = resolvedTheme || "dark";

  return (
    <div
      className="scene-3d-wrapper"
      aria-hidden="true"
      style={{ opacity, transition: "opacity 0.15s ease-out" }}
    >
      <Suspense fallback={null}>
        <PortfolioScene
          mouseX={isMobile ? 0 : mouse.x}
          mouseY={isMobile ? 0 : mouse.y}
          scrollProgress={heroProgress}
          theme={theme}
          reducedMotion={prefersReducedMotion}
          isMobile={isMobile}
        />
      </Suspense>
    </div>
  );
}
