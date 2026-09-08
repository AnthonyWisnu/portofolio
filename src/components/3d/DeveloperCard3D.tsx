"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

interface DeveloperCard3DProps {
  mouse: { normalizedX: number; normalizedY: number };
}

export function DeveloperCard3D({ mouse }: DeveloperCard3DProps) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const holographicMeshRef = useRef<THREE.Mesh>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);

  // Load high-quality bust portrait (head & shoulders with formal tie)
  const portraitTexture = useTexture("/Foto-portrait.png");
  portraitTexture.minFilter = THREE.LinearFilter;
  portraitTexture.magFilter = THREE.LinearFilter;

  // Ultra-crisp 1200x1800 Canvas texture for the Card Face
  const badgeTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Sleek Obsidian Matte Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1800);
    bgGrad.addColorStop(0, "#090a0f");
    bgGrad.addColorStop(0.5, "#10131c");
    bgGrad.addColorStop(1, "#08090d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1800);

    // Subtle technical grid
    ctx.strokeStyle = "rgba(239, 68, 68, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1800);
      ctx.stroke();
    }
    for (let y = 0; y < 1800; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // Outer border with subtle glow
    ctx.strokeStyle = "rgba(220, 38, 38, 0.6)";
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, 1128, 1728);

    // Precision corner brackets
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 14;
    // Top-Left
    ctx.beginPath();
    ctx.moveTo(36, 120);
    ctx.lineTo(36, 36);
    ctx.lineTo(120, 36);
    ctx.stroke();
    // Top-Right
    ctx.beginPath();
    ctx.moveTo(1164, 120);
    ctx.lineTo(1164, 36);
    ctx.lineTo(1080, 36);
    ctx.stroke();
    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(36, 1680);
    ctx.lineTo(36, 1764);
    ctx.lineTo(120, 1764);
    ctx.stroke();
    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(1164, 1680);
    ctx.lineTo(1164, 1764);
    ctx.lineTo(1080, 1764);
    ctx.stroke();

    // --- TOP STATUS HEADER ---
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 28px monospace";
    ctx.fillText("AWJ // ACCESS PASS", 80, 100);

    // Green Active Beacon
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(1090, 92, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "bold 22px monospace";
    ctx.fillText("VERIFIED DEV", 900, 100);

    // --- PHOTO FRAME APERTURE (Placeholder for 3D photo layer) ---
    ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 140, 1040, 960);

    // Inner bevel shadow for photo window
    ctx.fillStyle = "#0c0e14";
    ctx.fillRect(84, 144, 1032, 952);

    // --- IDENTITY SECTION ---
    // Full Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 68px sans-serif";
    ctx.fillText("ANTHONY WISNU JATI", 80, 1200);

    // Role & Specialization
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 32px monospace";
    ctx.fillText("FULLSTACK & SYSTEMS ENGINEER", 80, 1255);

    // --- EDUCATION PILLS (No NIM, Clean & High-Contrast) ---
    // Pill 1: Universitas Udayana
    ctx.fillStyle = "#11131a";
    ctx.fillRect(80, 1310, 500, 130);
    ctx.strokeStyle = "rgba(239, 68, 68, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 1310, 500, 130);

    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 20px monospace";
    ctx.fillText("HIGHER EDUCATION", 110, 1355);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("Universitas Udayana", 110, 1405);

    // Pill 2: SMAN 3 Klaten
    ctx.fillStyle = "#11131a";
    ctx.fillRect(620, 1310, 500, 130);
    ctx.strokeStyle = "rgba(239, 68, 68, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(620, 1310, 500, 130);

    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 20px monospace";
    ctx.fillText("HIGH SCHOOL ALUMNI", 650, 1355);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("SMAN 3 Klaten", 650, 1405);

    // --- BOTTOM TECHNICAL FOOTER ---
    // Barcode lines
    ctx.fillStyle = "#ffffff";
    let bx = 80;
    const barcodeWidths = [
      8, 3, 5, 10, 4, 6, 3, 8, 5, 4, 9, 3, 6, 10, 4, 3, 8, 5, 6, 10, 4, 3, 8,
      9, 4, 5, 3, 10, 5, 3, 8, 4, 6, 10, 3, 5, 8, 4, 6,
    ];
    for (const bw of barcodeWidths) {
      ctx.fillRect(bx, 1500, bw, 80);
      bx += bw + 6;
      if (bx > 640) break;
    }

    ctx.fillStyle = "#71717a";
    ctx.font = "bold 20px monospace";
    ctx.fillText("SECURITY CLEARANCE // LEVEL-04", 80, 1630);

    // Official Domain Stamp
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 38px monospace";
    ctx.fillText("anthonywj.my.id", 750, 1560);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "20px monospace";
    ctx.fillText("OFFICIAL PORTFOLIO", 750, 1610);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!cardGroupRef.current) return;

    // Fluid 3D tilt tracking with spring damping
    const targetRotY = mouse.normalizedX * 0.45;
    const targetRotX = -mouse.normalizedY * 0.35;
    const targetPosX = mouse.normalizedX * 0.2;
    const targetPosY = -mouse.normalizedY * 0.15;

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

    // Dynamic spotlight tracking for holographic sheen
    if (spotlightRef.current) {
      spotlightRef.current.position.x = THREE.MathUtils.damp(
        spotlightRef.current.position.x,
        mouse.normalizedX * 4,
        4,
        delta
      );
      spotlightRef.current.position.y = THREE.MathUtils.damp(
        spotlightRef.current.position.y,
        3 - mouse.normalizedY * 3,
        4,
        delta
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Lighting */}
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 6, 5]} intensity={1.9} />
      <directionalLight position={[-4, -2, -2]} intensity={0.7} color="#ef4444" />
      <spotLight
        ref={spotlightRef}
        position={[0, 2, 4]}
        intensity={3.0}
        angle={0.65}
        penumbra={0.9}
        color="#ffffff"
      />

      {/* Floating 3D Badge Rig */}
      <Float
        speed={1.8}
        rotationIntensity={0.08}
        floatIntensity={0.25}
        floatingRange={[-0.04, 0.04]}
      >
        <group ref={cardGroupRef}>
          {/* --- TOP LANYARD CLIP HOUSING --- */}
          <group position={[0, 1.84, 0]}>
            {/* Lanyard Strap Loop */}
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.35, 16]} />
              <meshStandardMaterial color="#dc2626" roughness={0.5} />
            </mesh>
            {/* Metallic Clasp Clip */}
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[0.32, 0.12, 0.1]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Slot hole in card */}
            <mesh position={[0, -0.05, 0]}>
              <boxGeometry args={[0.22, 0.04, 0.08]} />
              <meshBasicMaterial color="#09090b" />
            </mesh>
          </group>

          {/* --- MAIN CARD CHASSIS (Solid Obsidian Slab) --- */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.36, 3.54, 0.06]} />
            <meshStandardMaterial
              color="#090a0f"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Glowing Red Edge Bumper */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.4, 3.58, 0.05]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.35} />
          </mesh>

          {/* --- FRONT BADGE FACE (Ultra-Sharp Canvas Texture) --- */}
          {badgeTexture && (
            <mesh position={[0, 0, 0.032]}>
              <planeGeometry args={[2.3, 3.48]} />
              <meshStandardMaterial
                map={badgeTexture}
                roughness={0.25}
                metalness={0.25}
              />
            </mesh>
          )}

          {/* --- EMBEDDED CRISP BUST PORTRAIT --- */}
          {/* Sits right inside the designated photo aperture */}
          <mesh position={[0, 0.52, 0.038]}>
            <planeGeometry args={[1.96, 1.84]} />
            <meshStandardMaterial
              map={portraitTexture}
              roughness={0.35}
              metalness={0.05}
            />
          </mesh>

          {/* Photo frame inner highlight */}
          <mesh position={[0, 0.52, 0.04]}>
            <planeGeometry args={[1.98, 1.86]} />
            <meshBasicMaterial
              color="#ef4444"
              wireframe
              transparent
              opacity={0.45}
            />
          </mesh>

          {/* --- HOLOGRAPHIC FOIL OVERLAY (Specular Sheen Layer) --- */}
          <mesh ref={holographicMeshRef} position={[0, 0, 0.042]}>
            <planeGeometry args={[2.3, 3.48]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.12}
              roughness={0.1}
              metalness={0.1}
              transmission={0.4}
              clearcoat={1}
              clearcoatRoughness={0.1}
              reflectivity={0.9}
            />
          </mesh>

          {/* --- BACK CHASSIS --- */}
          <mesh position={[0, 0, -0.032]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.3, 3.48]} />
            <meshStandardMaterial
              color="#090a0f"
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
