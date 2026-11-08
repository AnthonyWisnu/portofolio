"use client";

import { Suspense, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { DeveloperPassMesh } from "@/features/hero/DeveloperPassMesh";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const emptySubscribe = () => () => {};

export function HeroCanvas() {
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const webglSupported = useMemo(() => {
    if (!mounted || typeof document === "undefined") return true;
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      return Boolean(gl);
    } catch {
      return false;
    }
  }, [mounted]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-[460px] sm:h-[520px] lg:h-[600px] rounded-3xl bg-[#12151E] border border-white/10" />
    );
  }

  // Fallback statis elegan ketika WebGL tidak tersedia
  if (!webglSupported) {
    return (
      <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[600px] flex items-center justify-center rounded-3xl overflow-hidden border border-white/10 bg-[#12151E] p-6">
        <div className="relative w-72 h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-[#2F54EB]/40 bg-[#0B0D12] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#597EF7] pb-2 border-b border-white/10">
            <span>AWJ // KARTU AKSES</span>
            <span className="text-emerald-400">TERVERIFIKASI</span>
          </div>
          <div className="relative w-full h-56 rounded-xl overflow-hidden my-2 border border-white/10">
            <Image
              src="/images/anthony-portrait.webp"
              alt="Potret resmi Anthony Wisnu Jati"
              fill
              sizes="288px"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-display font-bold text-white">ANTHONY WISNU JATI</div>
            <div className="text-xs text-[#9CA3AF] font-mono">Universitas Udayana</div>
            <div className="text-[11px] text-[#597EF7] font-mono">anthonywj.my.id</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-cursor-label="Geser"
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#12151E] via-[#0F121A] to-[#0B0D12] shadow-2xl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(47, 84, 235, 0.24), transparent 64%)",
        }}
      />

      <Canvas
        style={{ width: "100%", height: "100%", display: "block" }}
        camera={{ position: [0, 0.08, 4.9], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={isInView ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <DeveloperPassMesh reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#9CA3AF] pointer-events-none">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2F54EB]" />
          <span className="text-[#F3F4F6] text-[11px] sm:text-xs font-medium">
            Kartu Akses 3D Interaktif
          </span>
        </span>
        <span className="text-[10px] sm:text-[11px] text-[#64748B]">Arahkan kursor</span>
      </div>
    </div>
  );
}
