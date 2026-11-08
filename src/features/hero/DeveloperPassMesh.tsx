"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";
import { buildDeveloperCardTexture } from "@/utils/cardTextureBuilder";

interface DeveloperPassMeshProps {
  reducedMotion?: boolean;
}

export function DeveloperPassMesh({ reducedMotion = false }: DeveloperPassMeshProps) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const sheenMeshRef = useRef<THREE.Mesh>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);

  const portraitTexture = useTexture("/images/anthony-pass.webp", (loaded) => {
    const tex = Array.isArray(loaded) ? loaded[0] : loaded;
    if (!tex) return;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  const badgeTexture = useMemo(() => buildDeveloperCardTexture(), []);

  useFrame((state, delta) => {
    if (!cardGroupRef.current) return;

    const px = reducedMotion ? 0 : state.pointer.x;
    const py = reducedMotion ? 0 : state.pointer.y;

    const targetRotY = px * 0.42;
    const targetRotX = -py * 0.32;
    const targetPosX = px * 0.16;
    const targetPosY = -py * 0.12;

    cardGroupRef.current.rotation.y = THREE.MathUtils.damp(
      cardGroupRef.current.rotation.y,
      targetRotY,
      5,
      delta
    );
    cardGroupRef.current.rotation.x = THREE.MathUtils.damp(
      cardGroupRef.current.rotation.x,
      targetRotX,
      5,
      delta
    );
    cardGroupRef.current.position.x = THREE.MathUtils.damp(
      cardGroupRef.current.position.x,
      targetPosX,
      5,
      delta
    );
    cardGroupRef.current.position.y = THREE.MathUtils.damp(
      cardGroupRef.current.position.y,
      targetPosY,
      5,
      delta
    );

    if (spotlightRef.current) {
      spotlightRef.current.position.x = THREE.MathUtils.damp(
        spotlightRef.current.position.x,
        px * 4,
        4,
        delta
      );
      spotlightRef.current.position.y = THREE.MathUtils.damp(
        spotlightRef.current.position.y,
        3 - py * 3,
        4,
        delta
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={1.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.85} />
      <directionalLight position={[-4, -2, -2]} intensity={0.65} color="#2f54eb" />
      <spotLight
        ref={spotlightRef}
        position={[0, 2, 4]}
        intensity={2.8}
        angle={0.65}
        penumbra={0.9}
        color="#f8fafc"
      />

      <Float
        speed={reducedMotion ? 0 : 1.6}
        rotationIntensity={reducedMotion ? 0 : 0.06}
        floatIntensity={reducedMotion ? 0 : 0.22}
        floatingRange={[-0.035, 0.035]}
      >
        <group ref={cardGroupRef}>
          {/* Gantungan Lanyard di Puncak Kartu */}
          <group position={[0, 1.84, 0]}>
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.065, 0.065, 0.34, 16]} />
              <meshStandardMaterial color="#2f54eb" roughness={0.45} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[0.32, 0.12, 0.1]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.22} />
            </mesh>
            <mesh position={[0, -0.05, 0]}>
              <boxGeometry args={[0.22, 0.04, 0.08]} />
              <meshBasicMaterial color="#0b0d12" />
            </mesh>
          </group>

          {/* Bodi Utama Kartu */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.36, 3.54, 0.06]} />
            <meshStandardMaterial color="#0b0d12" roughness={0.25} metalness={0.75} />
          </mesh>

          {/* Aksen Sisi Tipis Cobalt */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.39, 3.57, 0.05]} />
            <meshBasicMaterial color="#2f54eb" transparent opacity={0.32} />
          </mesh>

          {/* Wajah Depan Canvas Texture */}
          {badgeTexture && (
            <mesh position={[0, 0, 0.032]}>
              <planeGeometry args={[2.3, 3.48]} />
              <meshStandardMaterial map={badgeTexture} roughness={0.28} metalness={0.2} />
            </mesh>
          )}

          {/* Foto Potret Asli Pemilik */}
          <mesh position={[0, 0.52, 0.038]}>
            <planeGeometry args={[1.96, 1.84]} />
            <meshStandardMaterial map={portraitTexture} roughness={0.38} metalness={0.05} />
          </mesh>

          <mesh position={[0, 0.52, 0.04]}>
            <planeGeometry args={[1.98, 1.86]} />
            <meshBasicMaterial color="#597ef7" wireframe transparent opacity={0.35} />
          </mesh>

          {/* Lapisan Kilau Specular */}
          <mesh ref={sheenMeshRef} position={[0, 0, 0.042]}>
            <planeGeometry args={[2.3, 3.48]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.1}
              roughness={0.18}
              metalness={0.45}
            />
          </mesh>

          {/* Sisi Belakang */}
          <mesh position={[0, 0, -0.032]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.3, 3.48]} />
            <meshStandardMaterial color="#0b0d12" roughness={0.35} metalness={0.6} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
