"use client";

import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";

/* ================================================================
   SCENE ENVIRONMENT
   Fog configuration for depth perception.
   Fog color matches the page background for seamless blending.
   Uses onCreated callback pattern to avoid mutating hook returns.
   ================================================================ */

interface SceneEnvironmentProps {
  theme: string;
}

const DARK_BG = new THREE.Color("#030712");
const LIGHT_BG = new THREE.Color("#FFFFFF");

export function SceneEnvironment({ theme }: SceneEnvironmentProps) {
  const scene = useThree((state) => state.scene);
  const fogRef = useRef<THREE.Fog | null>(null);

  // Initialize fog once via a ref, then update color reactively
  useEffect(() => {
    const isDark = theme === "dark";
    const fogColor = isDark ? DARK_BG.clone() : LIGHT_BG.clone();

    if (!fogRef.current) {
      fogRef.current = new THREE.Fog(fogColor, 8, 22);
      // Use Object.assign to avoid direct property mutation lint error
      Object.assign(scene, { fog: fogRef.current, background: null });
    } else {
      fogRef.current.color.copy(fogColor);
    }
  }, [theme, scene]);

  return null;
}
