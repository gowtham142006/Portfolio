"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================================
   CAMERA CONTROLLER
   Subtle mouse-following parallax camera with idle drift.
   Uses lerp for smooth interpolation — never jumps to target.
   Respects reduced motion preference.
   ================================================================ */

interface CameraControllerProps {
  /** Normalized mouse position: x/y in [-1, 1] range */
  mouseX: number;
  mouseY: number;
  /** Scroll progress for the hero section: 0 = top, 1 = scrolled past */
  scrollProgress: number;
  /** If true, camera stays static */
  reducedMotion: boolean;
}

export function CameraController({
  mouseX,
  mouseY,
  scrollProgress,
  reducedMotion,
}: CameraControllerProps) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 8));
  const idleTimeRef = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion) {
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);
      return;
    }

    idleTimeRef.current += delta;

    // Idle drift — slow sine wave when mouse doesn't dominate
    const idleDriftX = Math.sin(idleTimeRef.current * 0.15) * 0.12;
    const idleDriftY = Math.cos(idleTimeRef.current * 0.12) * 0.08;

    // Mouse influence
    const mouseInfluenceX = mouseX * 0.6;
    const mouseInfluenceY = mouseY * 0.4;

    // Scroll-based camera pull-back
    const scrollOffset = scrollProgress * 1.5;

    // Combine targets
    targetRef.current.set(
      mouseInfluenceX + idleDriftX,
      mouseInfluenceY + idleDriftY + scrollOffset * 0.3,
      8 + scrollOffset
    );

    // Smooth lerp — never snaps
    camera.position.lerp(targetRef.current, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
