"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { DeveloperCard3D } from "./DeveloperCard3D";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";

export function HeroCanvas() {
  const mouse = useMousePosition();
  const reducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[460px] sm:min-h-[560px] flex items-center justify-center animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-3xl" />
    );
  }

  // Graceful degradation fallback if WebGL is unavailable or user chooses reduced motion
  if (!webglSupported) {
    return (
      <div className="relative w-full h-full min-h-[460px] sm:min-h-[560px] flex items-center justify-center rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 shadow-xl p-6">
        <div className="relative w-72 h-[420px] rounded-2xl overflow-hidden shadow-2xl border-2 border-red-600/40 bg-neutral-950 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-red-500 pb-2 border-b border-neutral-800">
            <span>DEV ACCESS PASS</span>
            <span className="text-emerald-500">&bull; ACTIVE</span>
          </div>
          <div className="relative w-full h-56 rounded-xl overflow-hidden my-2">
            <Image
              src="/Foto.png"
              alt="Anthony Wisnu Jati"
              fill
              sizes="288px"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">ANTHONY WISNU JATI</div>
            <div className="text-xs text-neutral-400 font-mono">Universitas Udayana</div>
            <div className="text-[10px] text-red-400 font-mono">anthonywj.my.id</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[560px] rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-gradient-to-b from-neutral-50 via-neutral-100/50 to-neutral-200/30 dark:from-neutral-950 dark:via-neutral-900/70 dark:to-neutral-950 shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <DeveloperCard3D
            mouse={
              reducedMotion
                ? { normalizedX: 0, normalizedY: 0 }
                : { normalizedX: mouse.normalizedX, normalizedY: mouse.normalizedY }
            }
          />
        </Suspense>
      </Canvas>

      {/* Floating status tag */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-mono text-neutral-600 dark:text-neutral-400 pointer-events-none">
        <span className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-medium text-neutral-900 dark:text-neutral-100 text-[11px] sm:text-xs whitespace-nowrap">Interactive 3D Pass</span>
        </span>
        <span className="text-[10px] sm:text-[11px] text-neutral-400 shrink-0">Tilt & shine</span>
      </div>
    </div>
  );
}
