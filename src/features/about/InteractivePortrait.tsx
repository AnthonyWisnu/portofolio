"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { OWNER_PROFILE } from "@/data/owner";

export function InteractivePortrait() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 40, active: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y, active: true });
  };

  const handlePointerLeave = () => {
    setSpot((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => setSpot((prev) => ({ ...prev, active: !prev.active }))}
      data-cursor-label="Inspeksi"
      className="relative group rounded-3xl overflow-hidden border border-white/12 bg-[#12151E] p-3 shadow-2xl select-none cursor-crosshair"
    >
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#0B0D12]">
        <Image
          src="/images/anthony-portrait.webp"
          alt={`Potret resmi ${OWNER_PROFILE.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {/* Lapisan Spotlight Teknis saat Kursor Bergerak di Atas Potret */}
        {!reducedMotion && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: spot.active ? 1 : 0,
              backgroundImage:
                "linear-gradient(to right, rgba(89, 126, 247, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(89, 126, 247, 0.25) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage: `radial-gradient(circle 125px at ${spot.x}% ${spot.y}%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 125px at ${spot.x}% ${spot.y}%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
            }}
          />
        )}

        {/* Titik Sorot Lensa Kursor */}
        {!reducedMotion && spot.active && (
          <div
            aria-hidden="true"
            className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#597EF7]/50 pointer-events-none"
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              boxShadow: "0 0 36px rgba(47, 84, 235, 0.28)",
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/15 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
          <div className="min-w-0">
            <div className="text-[11px] font-mono uppercase text-[#85A5FF] tracking-wider">
              {`${OWNER_PROFILE.monogram} // ${OWNER_PROFILE.location}`}
            </div>
            <div className="text-base font-display font-bold truncate">{OWNER_PROFILE.name}</div>
            <div className="text-xs text-[#9CA3AF] font-mono truncate">
              Teknologi Informasi, {OWNER_PROFILE.institution}
            </div>
          </div>

          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono text-[#D1D5DB] border border-white/10 shrink-0">
            {spot.active ? "Grid Aktif" : "Sorot"}
          </span>
        </div>
      </div>
    </div>
  );
}
