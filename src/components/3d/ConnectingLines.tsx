"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================================
   CONNECTING LINES
   Thin lines connecting nearby floating objects to create a
   constellation/network aesthetic. Uses a single LineSegments
   geometry for performance.
   ================================================================ */

interface ConnectingLinesProps {
  scrollProgress: number;
  theme: string;
  reducedMotion: boolean;
  isMobile: boolean;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

export function ConnectingLines({
  scrollProgress,
  theme,
  reducedMotion,
  isMobile,
}: ConnectingLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const isDark = theme === "dark";

  // Generate line segment pairs connecting "nodes"
  const { positions } = useMemo(() => {
    const lineCount = isMobile ? 8 : 15;
    const nodeCount = isMobile ? 12 : 22;

    // Generate node positions (matching FloatingObjects seed logic)
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const seed = i * 7 + 3;
      const r = seededRandom;
      const depthLayer = i % 3;
      const spread = 5 + depthLayer * 3;
      const x = (r(seed) - 0.5) * spread * 2;
      const y = (r(seed + 1) - 0.5) * spread * 1.5;
      const zRange = depthLayer === 0 ? [-2, 0] : depthLayer === 1 ? [-5, -2] : [-9, -5];
      const z = zRange[0] + r(seed + 5) * (zRange[1] - zRange[0]);
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Find closest pairs and create line segments
    const pos: number[] = [];
    const connected = new Set<string>();
    let linesCreated = 0;

    for (let i = 0; i < nodes.length && linesCreated < lineCount; i++) {
      let closestIdx = -1;
      let closestDist = Infinity;

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
        if (connected.has(key)) continue;

        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < closestDist && dist < 5) {
          closestDist = dist;
          closestIdx = j;
        }
      }

      if (closestIdx >= 0) {
        const key = `${Math.min(i, closestIdx)}-${Math.max(i, closestIdx)}`;
        connected.add(key);
        pos.push(
          nodes[i].x, nodes[i].y, nodes[i].z,
          nodes[closestIdx].x, nodes[closestIdx].y, nodes[closestIdx].z
        );
        linesCreated++;
      }
    }

    return {
      positions: new Float32Array(pos),
    };
  }, [isMobile]);

  const lineColor = useMemo(() => {
    return isDark ? new THREE.Color("#3B82F6") : new THREE.Color("#93B5F6");
  }, [isDark]);

  useFrame((state) => {
    if (!linesRef.current) return;

    const material = linesRef.current.material as THREE.LineBasicMaterial;

    // Fade with scroll
    const targetOpacity = Math.max(0, (isDark ? 0.1 : 0.06) * (1 - scrollProgress * 2.5));
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.05);

    // Subtle pulsing
    if (!reducedMotion) {
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      material.opacity = Math.max(0, material.opacity + pulse);
    }
  });

  if (positions.length === 0) return null;

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={lineColor}
        transparent
        opacity={isDark ? 0.1 : 0.06}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
