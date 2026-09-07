"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================================
   PARTICLE FIELD
   Performant particle system using a single Points with
   BufferGeometry. All animation happens by mutating the
   position attribute directly — zero React rerenders.
   ================================================================ */

interface ParticleFieldProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  theme: string;
  reducedMotion: boolean;
  isMobile: boolean;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

export function ParticleField({
  mouseX,
  mouseY,
  scrollProgress,
  theme,
  reducedMotion,
  isMobile,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = isMobile ? 120 : 300;
  const isDark = theme === "dark";

  // Generate initial particle positions and velocities
  const { positions, basePositions, sizes, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = i * 13 + 7;
      const r = seededRandom;

      // Spread particles in a wide volume
      const x = (r(seed) - 0.5) * 16;
      const y = (r(seed + 1) - 0.5) * 12;
      const z = (r(seed + 2) - 0.5) * 14;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;

      // Variable sizes for depth illusion
      sz[i] = 1.5 + r(seed + 3) * 3;

      // Slow drift velocities
      vel[i3] = (r(seed + 4) - 0.5) * 0.02;
      vel[i3 + 1] = (r(seed + 5) - 0.5) * 0.015;
      vel[i3 + 2] = (r(seed + 6) - 0.5) * 0.01;
    }

    return { positions: pos, basePositions: base, sizes: sz, velocities: vel };
  }, [count]);

  // Particle color adapts to theme
  const particleColor = useMemo(() => {
    if (isDark) {
      return new THREE.Color("#6B9FF6"); // Soft blue glow in dark mode
    }
    return new THREE.Color("#93B5F6"); // Lighter blue in light mode
  }, [isDark]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;

    if (!reducedMotion) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Base floating movement
        const driftX = Math.sin(time * velocities[i3] * 10 + i) * 0.3;
        const driftY = Math.cos(time * velocities[i3 + 1] * 10 + i * 0.7) * 0.25;
        const driftZ = Math.sin(time * velocities[i3 + 2] * 8 + i * 1.3) * 0.15;

        // Subtle mouse interaction — nearby particles move more
        const px = basePositions[i3];
        const py = basePositions[i3 + 1];
        const mouseDistSq = (px - mouseX * 3) ** 2 + (py - mouseY * 3) ** 2;
        const mouseInfluence = Math.max(0, 1 - mouseDistSq / 25) * 0.3;

        posAttr.setXYZ(
          i,
          basePositions[i3] + driftX + mouseX * mouseInfluence,
          basePositions[i3 + 1] + driftY + mouseY * mouseInfluence,
          basePositions[i3 + 2] + driftZ
        );
      }

      posAttr.needsUpdate = true;
    }

    // Fade out with scroll — preserve base opacity
    const material = pointsRef.current.material as THREE.PointsMaterial;
    const baseOpacity = isDark ? 0.5 : 0.3;
    const scrollFade = Math.max(0, 1 - scrollProgress * 2.5);
    const targetOpacity = baseOpacity * scrollFade;
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={particleColor}
        size={isDark ? 2.5 : 2}
        sizeAttenuation
        transparent
        opacity={isDark ? 0.5 : 0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
