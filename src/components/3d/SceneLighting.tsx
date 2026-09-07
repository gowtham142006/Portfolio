"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================================
   SCENE LIGHTING
   Sophisticated multi-light setup with brand-colored accents.
   Lights subtly follow mouse position for dynamic depth.
   Adapts to dark/light theme.
   ================================================================ */

interface SceneLightingProps {
  mouseX: number;
  mouseY: number;
  theme: string;
  reducedMotion: boolean;
}

// Brand colors
const BRAND_BLUE = new THREE.Color("#3B82F6");
const BRAND_PURPLE = new THREE.Color("#8B5CF6");
const BRAND_CYAN = new THREE.Color("#06B6D4");

export function SceneLighting({
  mouseX,
  mouseY,
  theme,
  reducedMotion,
}: SceneLightingProps) {
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);
  const pointLight3Ref = useRef<THREE.PointLight>(null);

  const isDark = theme === "dark";

  useFrame((_, delta) => {
    if (reducedMotion) return;

    // Subtle light movement following mouse
    const lerpSpeed = delta * 1.5;

    if (pointLight1Ref.current) {
      pointLight1Ref.current.position.x = THREE.MathUtils.lerp(
        pointLight1Ref.current.position.x,
        3 + mouseX * 1.5,
        lerpSpeed
      );
      pointLight1Ref.current.position.y = THREE.MathUtils.lerp(
        pointLight1Ref.current.position.y,
        2 + mouseY * 1,
        lerpSpeed
      );
    }

    if (pointLight2Ref.current) {
      pointLight2Ref.current.position.x = THREE.MathUtils.lerp(
        pointLight2Ref.current.position.x,
        -3 - mouseX * 1,
        lerpSpeed
      );
    }

    if (pointLight3Ref.current) {
      pointLight3Ref.current.position.y = THREE.MathUtils.lerp(
        pointLight3Ref.current.position.y,
        -2 + mouseY * 0.8,
        lerpSpeed
      );
    }
  });

  return (
    <>
      {/* Baseline ambient — lower in dark mode for more dramatic depth */}
      <ambientLight intensity={isDark ? 0.15 : 0.4} />

      {/* Primary directional from upper-left */}
      <directionalLight
        position={[-3, 4, 5]}
        intensity={isDark ? 0.3 : 0.5}
        color="#ffffff"
      />

      {/* Accent point lights with brand colors */}
      <pointLight
        ref={pointLight1Ref}
        position={[3, 2, 3]}
        intensity={isDark ? 0.8 : 0.4}
        color={BRAND_BLUE}
        distance={12}
        decay={2}
      />
      <pointLight
        ref={pointLight2Ref}
        position={[-3, 1, 2]}
        intensity={isDark ? 0.6 : 0.3}
        color={BRAND_PURPLE}
        distance={10}
        decay={2}
      />
      <pointLight
        ref={pointLight3Ref}
        position={[0, -2, 4]}
        intensity={isDark ? 0.4 : 0.2}
        color={BRAND_CYAN}
        distance={8}
        decay={2}
      />
    </>
  );
}
