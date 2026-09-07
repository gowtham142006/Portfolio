"use client";

import { Canvas } from "@react-three/fiber";
import { CameraController } from "./CameraController";
import { SceneLighting } from "./SceneLighting";
import { SceneEnvironment } from "./SceneEnvironment";
import { FloatingObjects } from "./FloatingObjects";
import { ParticleField } from "./ParticleField";
import { ConnectingLines } from "./ConnectingLines";

/* ================================================================
   PORTFOLIO SCENE
   Top-level R3F Canvas containing all 3D sub-components.
   Receives normalized mouse, scroll, theme, and device props.
   ================================================================ */

interface PortfolioSceneProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  theme: string;
  reducedMotion: boolean;
  isMobile: boolean;
}

export function PortfolioScene({
  mouseX,
  mouseY,
  scrollProgress,
  theme,
  reducedMotion,
  isMobile,
}: PortfolioSceneProps) {
  return (
    <Canvas
      dpr={[1, isMobile ? 1 : 1.5]}
      camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 30 }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      {/* Environment & fog */}
      <SceneEnvironment theme={theme} />

      {/* Lighting setup */}
      <SceneLighting
        mouseX={mouseX}
        mouseY={mouseY}
        theme={theme}
        reducedMotion={reducedMotion}
      />

      {/* Camera with mouse parallax and scroll interaction */}
      <CameraController
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      {/* Floating geometric objects */}
      <FloatingObjects
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        theme={theme}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Particle system */}
      <ParticleField
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        theme={theme}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Connecting lines between objects */}
      <ConnectingLines
        scrollProgress={scrollProgress}
        theme={theme}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />
    </Canvas>
  );
}
