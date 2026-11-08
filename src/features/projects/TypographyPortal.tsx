"use client";

import { useEffect, useRef, useState } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

const PORTAL_LETTERS = ["P", "R", "O", "Y", "E", "K"];

export function TypographyPortal() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const wordWrapRef = useRef<HTMLDivElement>(null);
  const targetGlyphRef = useRef<HTMLSpanElement>(null);
  const [originPct, setOriginPct] = useState({ x: 42, y: 50 });

  // Ukur posisi huruf "O" hanya saat mendekati viewport agar tidak memicu layout reflow saat load awal
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    let isNearViewport = false;
    const measureGlyph = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        if (!wordWrapRef.current || !targetGlyphRef.current) return;
        const wordRect = wordWrapRef.current.getBoundingClientRect();
        const letterRect = targetGlyphRef.current.getBoundingClientRect();
        if (!wordRect.width || !wordRect.height) return;

        const x = ((letterRect.left + letterRect.width / 2 - wordRect.left) / wordRect.width) * 100;
        const y = ((letterRect.top + letterRect.height / 2 - wordRect.top) / wordRect.height) * 100;
        setOriginPct({ x, y });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = Boolean(entry?.isIntersecting);
        if (isNearViewport) measureGlyph();
      },
      { rootMargin: "200px 0px" }
    );
    const handleResize = () => {
      if (isNearViewport) measureGlyph();
    };
    observer.observe(container);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.35,
  });

  // Zoom tipografi 2D senada palet Obsidian (#0D1119 -> #0F131C, tanpa kilatan putih)
  const wordScale = useTransform(smoothProgress, [0.08, 0.78], [1, 22]);
  const wordRotate = useTransform(smoothProgress, [0.08, 0.78], [0, -2.5]);
  const wordOpacity = useTransform(smoothProgress, [0.65, 0.88], [1, 0]);
  const stageFloodScale = useTransform(smoothProgress, [0.16, 0.76], [0.02, 2.8]);
  const stageFloodOpacity = useTransform(smoothProgress, [0.14, 0.56], [0, 1]);

  if (reducedMotion) {
    return (
      <div
        id="projects"
        className="bg-gradient-to-b from-[#0D1119] to-[#0F131C] py-12 px-4 text-center border-t border-white/10"
      >
        <span className="font-display text-2xl font-bold tracking-tight text-white/90">
          PROYEK
        </span>
      </div>
    );
  }

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative h-[150vh] bg-[#0D1119] select-none"
      aria-label="Transisi menuju pameran proyek"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#0D1119]">

        {/* Cakram Obsidian sekunder (#0F131C) berpinggir halo cobalt lembut */}
        <m.div
          aria-hidden="true"
          style={{
            scale: stageFloodScale,
            opacity: stageFloodOpacity,
            left: `${originPct.x}%`,
            top: `${originPct.y}%`,
          }}
          className="absolute w-[120vmax] h-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F131C] ring-1 ring-[#708FFF]/35 shadow-[0_0_90px_rgba(47,84,235,0.22)] pointer-events-none z-20 will-change-transform"
        />

        {/* Tipografi Display PROYEK */}
        <m.div
          ref={wordWrapRef}
          style={{
            scale: wordScale,
            rotate: wordRotate,
            opacity: wordOpacity,
            transformOrigin: `${originPct.x}% ${originPct.y}%`,
          }}
          className="relative z-10 flex items-center justify-center px-4 will-change-transform"
        >
          <div className="font-display font-black tracking-tight text-[17vw] sm:text-[14vw] lg:text-[12vw] leading-none text-[#F3F4F6] flex items-center">
            {PORTAL_LETTERS.map((letter, idx) => {
              const isFocusGlyph = idx === 2;
              return (
                <span
                  key={`${letter}-${idx}`}
                  ref={isFocusGlyph ? targetGlyphRef : undefined}
                  className={cn(
                    "inline-block transition-colors duration-300",
                    isFocusGlyph ? "text-[#708FFF]" : "text-[#F3F4F6]"
                  )}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </m.div>
      </div>
    </div>
  );
}
