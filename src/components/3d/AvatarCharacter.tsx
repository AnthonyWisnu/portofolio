"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarCharacterProps {
  mouse: { normalizedX: number; normalizedY: number };
}

export function AvatarCharacter({ mouse }: AvatarCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  // Smooth mouse tracking via dampening in useFrame
  useFrame((_, delta) => {
    if (!groupRef.current || !headRef.current) return;

    const targetX = mouse.normalizedX * 0.4;
    const targetY = -mouse.normalizedY * 0.3;

    // Smooth head look-at
    headRef.current.rotation.y = THREE.MathUtils.damp(
      headRef.current.rotation.y,
      targetX,
      4,
      delta
    );
    headRef.current.rotation.x = THREE.MathUtils.damp(
      headRef.current.rotation.x,
      targetY,
      4,
      delta
    );

    // Subtle gentle breathing/floating motion for torso
    groupRef.current.position.y = Math.sin(Date.now() * 0.0015) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* --- HEAD GROUP --- */}
      <group ref={headRef} position={[0, 0.95, 0]}>
        {/* Head Mesh (Stylized warm skin tone) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.72, 0.85, 0.7]} />
          <meshStandardMaterial color="#f6c8a4" roughness={0.6} />
        </mesh>

        {/* Hair - Short dark hair styled to side */}
        <mesh position={[0, 0.38, -0.02]}>
          <boxGeometry args={[0.78, 0.28, 0.76]} />
          <meshStandardMaterial color="#1a1818" roughness={0.8} />
        </mesh>
        {/* Side/Fringe Hair Accent */}
        <mesh position={[0.15, 0.32, 0.33]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.35, 0.18, 0.15]} />
          <meshStandardMaterial color="#1a1818" roughness={0.8} />
        </mesh>

        {/* Eyes (Stylized dark pupils) */}
        <mesh ref={leftEyeRef} position={[-0.18, 0.04, 0.36]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.2} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.18, 0.04, 0.36]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.2} />
        </mesh>

        {/* Eyebrows */}
        <mesh position={[-0.18, 0.14, 0.36]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.12, 0.025, 0.02]} />
          <meshStandardMaterial color="#1a1818" />
        </mesh>
        <mesh position={[0.18, 0.14, 0.36]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.12, 0.025, 0.02]} />
          <meshStandardMaterial color="#1a1818" />
        </mesh>

        {/* Subtle nose & lips accent */}
        <mesh position={[0, -0.08, 0.37]}>
          <boxGeometry args={[0.08, 0.1, 0.04]} />
          <meshStandardMaterial color="#eab38c" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.22, 0.36]}>
          <boxGeometry args={[0.16, 0.035, 0.02]} />
          <meshStandardMaterial color="#cf8d75" roughness={0.7} />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.08, 0.22, 0.14]} />
          <meshStandardMaterial color="#f0bd98" />
        </mesh>
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.08, 0.22, 0.14]} />
          <meshStandardMaterial color="#f0bd98" />
        </mesh>
      </group>

      {/* --- NECK --- */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.2, 16]} />
        <meshStandardMaterial color="#eab38c" roughness={0.6} />
      </mesh>

      {/* --- TORSO (White Formal Shirt) --- */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 0.75, 0.55]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>

      {/* Shirt Collar Left & Right */}
      <mesh position={[-0.14, 0.34, 0.29]} rotation={[0.2, 0, -0.4]}>
        <boxGeometry args={[0.2, 0.12, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0.14, 0.34, 0.29]} rotation={[0.2, 0, 0.4]}>
        <boxGeometry args={[0.2, 0.12, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* --- BLACK TIE --- */}
      {/* Tie Knot */}
      <mesh position={[0, 0.29, 0.3]}>
        <boxGeometry args={[0.09, 0.09, 0.04]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>
      {/* Tie Body */}
      <mesh position={[0, 0.05, 0.29]}>
        <boxGeometry args={[0.085, 0.42, 0.03]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>
      {/* Tie Tip */}
      <mesh position={[0, -0.18, 0.29]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.06, 0.06, 0.03]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>

      {/* --- PEDESTAL / BASE ACCENT (Red Accent Ring - inspired by red photo background) --- */}
      <mesh position={[0, -0.48, 0]}>
        <cylinderGeometry args={[0.8, 0.85, 0.08, 32]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.54, 0]}>
        <cylinderGeometry args={[0.92, 0.95, 0.06, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
    </group>
  );
}
