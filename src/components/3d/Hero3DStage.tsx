"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

interface Hero3DStageProps {
  mouse: { normalizedX: number; normalizedY: number };
}

// Orbiting Tech Tag Component in 3D space
function OrbitingBadge({
  text,
  angleOffset,
  radius,
  speed,
  yPos,
  color,
}: {
  text: string;
  angleOffset: number;
  radius: number;
  speed: number;
  yPos: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed + angleOffset;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * (radius * 0.45);
    meshRef.current.position.y = yPos + Math.sin(t * 1.5) * 0.08;
    // Always face camera
    meshRef.current.rotation.y = 0;
  });

  return (
    <group ref={meshRef}>
      {/* Badge Frame */}
      <mesh>
        <boxGeometry args={[0.55, 0.16, 0.04]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Glow dot indicator */}
      <mesh position={[-0.2, 0, 0.025]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export function Hero3DStage({ mouse }: Hero3DStageProps) {
  const characterRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pedestalRef = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);

  // Load transparent portrait texture
  const texture = useTexture("/Foto-transparent.png");

  // Keep texture sharp
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame((_, delta) => {
    // 1. Mouse tilt on character
    if (characterRef.current) {
      const targetRotY = mouse.normalizedX * 0.35;
      const targetRotX = -mouse.normalizedY * 0.18;
      const targetPosX = mouse.normalizedX * 0.15;

      characterRef.current.rotation.y = THREE.MathUtils.damp(
        characterRef.current.rotation.y,
        targetRotY,
        4.5,
        delta
      );
      characterRef.current.rotation.x = THREE.MathUtils.damp(
        characterRef.current.rotation.x,
        targetRotX,
        4.5,
        delta
      );
      characterRef.current.position.x = THREE.MathUtils.damp(
        characterRef.current.position.x,
        targetPosX,
        4.5,
        delta
      );
    }

    // 2. Slow rotation on tech rings
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
    }

    // 3. Subtle pedestal rotation
    if (pedestalRef.current) {
      pedestalRef.current.rotation.y += delta * 0.15;
    }

    // 4. Dynamic spotlight follows mouse
    if (spotlightRef.current) {
      spotlightRef.current.position.x = THREE.MathUtils.damp(
        spotlightRef.current.position.x,
        mouse.normalizedX * 3,
        3,
        delta
      );
      spotlightRef.current.position.y = THREE.MathUtils.damp(
        spotlightRef.current.position.y,
        2.5 - mouse.normalizedY * 2,
        3,
        delta
      );
    }
  });

  return (
    <group position={[0, -1.05, 0]}>
      {/* Dynamic Lighting */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#ef4444" />
      <spotLight
        ref={spotlightRef}
        position={[0, 3, 3]}
        intensity={2.2}
        angle={0.6}
        penumbra={0.8}
        color="#ffffff"
      />

      {/* --- 3D PEDESTAL / STAGE --- */}
      <group ref={pedestalRef} position={[0, 0, 0]}>
        {/* Top Disc */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[1.05, 1.1, 0.08, 48]} />
          <meshStandardMaterial
            color="#18181b"
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Glowing Red Edge Ring */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[1.06, 0.018, 16, 64]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Lower Base Disc */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[1.22, 1.25, 0.12, 48]} />
          <meshStandardMaterial
            color="#09090b"
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>

        {/* Outer Tech Grid Ring */}
        <mesh ref={ringRef} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.18, 1.28, 48]} />
          <meshBasicMaterial
            color="#dc2626"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>

      {/* --- FLOATING 3D TECH ORBITERS --- */}
      <OrbitingBadge
        text="TypeScript"
        angleOffset={0}
        radius={1.45}
        speed={0.7}
        yPos={1.5}
        color="#3b82f6"
      />
      <OrbitingBadge
        text="Next.js"
        angleOffset={Math.PI * 0.66}
        radius={1.55}
        speed={0.7}
        yPos={1.1}
        color="#ffffff"
      />
      <OrbitingBadge
        text="GraphRAG"
        angleOffset={Math.PI * 1.33}
        radius={1.4}
        speed={0.7}
        yPos={0.8}
        color="#ef4444"
      />

      {/* Orbiting Laser Ring Around Body */}
      <mesh
        ref={ring2Ref}
        position={[0, 1.15, 0]}
        rotation={[Math.PI / 3.5, 0, 0]}
      >
        <torusGeometry args={[1.2, 0.012, 16, 64]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.6} />
      </mesh>

      {/* --- CHARACTER PLANE (Full-Body High-Res Cutout) --- */}
      <Float
        speed={1.5}
        rotationIntensity={0.05}
        floatIntensity={0.12}
        floatingRange={[-0.03, 0.03]}
      >
        <group ref={characterRef} position={[0, 1.12, 0]}>
          {/* Main Full-Body Plane */}
          <mesh position={[0, 0, 0]}>
            {/* Aspect ratio of 1024x1536 is 2:3 */}
            <planeGeometry args={[1.5, 2.25]} />
            <meshStandardMaterial
              map={texture}
              transparent
              roughness={0.4}
              metalness={0.05}
              side={THREE.DoubleSide}
              alphaTest={0.01}
            />
          </mesh>

          {/* Holographic Backing Plane (Subtle glow depth) */}
          <mesh position={[0, 0, -0.04]}>
            <planeGeometry args={[1.52, 2.27]} />
            <meshBasicMaterial
              color="#ef4444"
              transparent
              opacity={0.08}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
