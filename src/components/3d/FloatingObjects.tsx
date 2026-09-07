"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================================
   FLOATING OBJECTS
   Procedurally generated geometric shapes distributed across
   the scene. Each object has slow idle animation (rotation + bob).
   Reacts to mouse and scroll for parallax depth.
   Uses deterministic seeded positions for consistency.
   ================================================================ */

interface FloatingObjectsProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  theme: string;
  reducedMotion: boolean;
  isMobile: boolean;
}

// Deterministic pseudo-random using a simple seed function
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

// Shape types for variety
type ShapeType = "icosahedron" | "octahedron" | "box" | "torus" | "sphere" | "tetrahedron";

interface ObjectConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  shape: ShapeType;
  wireframe: boolean;
  speed: number;
  bobAmount: number;
  bobOffset: number;
  depthLayer: number; // 0 = close, 1 = mid, 2 = far
}

function generateObjects(count: number): ObjectConfig[] {
  const shapes: ShapeType[] = ["icosahedron", "octahedron", "box", "torus", "sphere", "tetrahedron"];
  const objects: ObjectConfig[] = [];

  for (let i = 0; i < count; i++) {
    const seed = i * 7 + 3;
    const r = seededRandom;

    const depthLayer = i % 3;

    // Place ALL objects far from camera — z between 0 and -8
    // Camera is at z=8, so objects are 8-16 units away
    const z = -(r(seed + 5) * 8);

    // Generate position in a ring around center — never in center
    const angle = (i / count) * Math.PI * 2 + r(seed + 14) * 0.8;
    const minRadius = 6 + depthLayer * 1.5;
    const maxRadius = minRadius + 3;
    const radius = minRadius + r(seed + 10) * (maxRadius - minRadius);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.7; // Flatten vertically

    // Extremely small scales for testing
    const baseScale = 0.02 + r(seed + 3) * 0.03;

    objects.push({
      position: [x, y, z],
      rotation: [r(seed + 6) * Math.PI * 2, r(seed + 7) * Math.PI * 2, r(seed + 8) * Math.PI * 2],
      scale: baseScale,
      shape: shapes[Math.floor(r(seed + 2) * shapes.length)],
      wireframe: true, // All wireframe for subtlety
      speed: 0.1 + r(seed + 9) * 0.2,
      bobAmount: 0.1 + r(seed + 12) * 0.2,
      bobOffset: r(seed + 13) * Math.PI * 2,
      depthLayer,
    });
  }

  return objects;
}

// Brand colors for emissive glow
const EMISSIVE_COLORS_DARK = [
  new THREE.Color("#3B82F6").multiplyScalar(0.3),
  new THREE.Color("#8B5CF6").multiplyScalar(0.3),
  new THREE.Color("#06B6D4").multiplyScalar(0.25),
  new THREE.Color("#3B82F6").multiplyScalar(0.2),
  new THREE.Color("#8B5CF6").multiplyScalar(0.2),
];

const EMISSIVE_COLORS_LIGHT = [
  new THREE.Color("#3B82F6").multiplyScalar(0.15),
  new THREE.Color("#8B5CF6").multiplyScalar(0.15),
  new THREE.Color("#06B6D4").multiplyScalar(0.12),
  new THREE.Color("#3B82F6").multiplyScalar(0.1),
  new THREE.Color("#8B5CF6").multiplyScalar(0.1),
];

function FloatingMesh({
  config,
  index,
  mouseX,
  mouseY,
  scrollProgress,
  theme,
  reducedMotion,
}: {
  config: ObjectConfig;
  index: number;
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  theme: string;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isDark = theme === "dark";

  const emissiveColor = useMemo(() => {
    const colors = isDark ? EMISSIVE_COLORS_DARK : EMISSIVE_COLORS_LIGHT;
    return colors[index % colors.length];
  }, [isDark, index]);

  const baseColor = useMemo(() => {
    if (isDark) {
      return new THREE.Color().setHSL(0.6 + (index % 3) * 0.05, 0.3, 0.25);
    }
    return new THREE.Color().setHSL(0.6 + (index % 3) * 0.05, 0.25, 0.7);
  }, [isDark, index]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    if (!reducedMotion) {
      // Slow rotation
      meshRef.current.rotation.x += config.speed * 0.008;
      meshRef.current.rotation.y += config.speed * 0.012;


      // Subtle mouse reaction — objects closer to camera react more
      const mouseReactivity = config.depthLayer === 0 ? 0.08 : config.depthLayer === 1 ? 0.04 : 0.02;
      meshRef.current.position.x =
        config.position[0] + mouseX * mouseReactivity;
      meshRef.current.position.y =
        config.position[1] + Math.sin(time * config.speed + config.bobOffset) * config.bobAmount + mouseY * mouseReactivity * 0.6;

      // Scroll — push objects up and away
      const scrollPush = scrollProgress * (1 + config.depthLayer * 0.5);
      meshRef.current.position.z = config.position[2] + scrollPush * 2;
    }

    // Fade with scroll — multiply scroll fade with base opacity
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
      const BASE_OPACITY = 0.12;
      const scrollFade = Math.max(0, 1 - scrollProgress * 2.5);
      const targetOpacity = BASE_OPACITY * scrollFade;
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.05);
    }
  });

  const geometry = useMemo(() => {
    switch (config.shape) {
      case "icosahedron": return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron": return <octahedronGeometry args={[1, 0]} />;
      case "box": return <boxGeometry args={[1, 1, 1]} />;
      case "torus": return <torusGeometry args={[1, 0.3, 8, 16]} />;
      case "sphere": return <sphereGeometry args={[1, 12, 12]} />;
      case "tetrahedron": return <tetrahedronGeometry args={[1, 0]} />;
      default: return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [config.shape]);

  const s = config.scale;

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
      scale={[s, s, s]}
    >
      {geometry}
      <meshStandardMaterial
        color={baseColor}
        emissive={emissiveColor}
        emissiveIntensity={isDark ? 0.6 : 0.3}
        wireframe={config.wireframe}
        transparent
        opacity={0.12}
        roughness={0.4}
        metalness={0.3}
        depthWrite={false}
      />
    </mesh>
  );
}

export function FloatingObjects({
  mouseX,
  mouseY,
  scrollProgress,
  theme,
  reducedMotion,
  isMobile,
}: FloatingObjectsProps) {
  const objectCount = isMobile ? 10 : 20;

  const objects = useMemo(() => generateObjects(objectCount), [objectCount]);

  return (
    <group>
      {objects.map((config, i) => (
        <FloatingMesh
          key={i}
          config={config}
          index={i}
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
          theme={theme}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}
