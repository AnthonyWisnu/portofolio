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

  // Ukur posisi akurat huruf "O" sebagai titik pusat zoom portal
  useEffect(() => {
    const measureGlyph = () => {
      if (!wordWrapRef.current || !targetGlyphRef.current) return;
      const wordRect = wordWrapRef.current.getBoundingClientRect();
      const letterRect = targetGlyphRef.current.getBoundingClientRect();
      if (!wordRect.width || !wordRect.height) return;

      const x = ((letterRect.left + letterRect.width / 2 - wordRect.left) / wordRect.width) * 100;
      const y = ((letterRect.top + letterRect.height / 2 - wordRect.top) / wordRect.height) * 100;
      setOriginPct({ x, y });
    };

    measureGlyph();
    window.addEventListener("resize", measureGlyph);
    return () => window.removeEventListener("resize", measureGlyph);
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

  // Zoom eksponensial mulus ke dalam huruf O lalu membuka panggung Warm Stone (#F5F4EF)
  const wordScale = useTransform(smoothProgress, [0.08, 0.78], [1, 24]);
  const wordRotate = useTransform(smoothProgress, [0.08, 0.78], [0, -3]);
  const wordOpacity = useTransform(smoothProgress, [0.68, 0.88], [1, 0]);
  const stoneFloodScale = useTransform(smoothProgress, [0.16, 0.76], [0.02, 2.8]);
  const stoneFloodOpacity = useTransform(smoothProgress, [0.14, 0.56], [0, 1]);
  const captionOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  if (reducedMotion) {
    return (
      <div
        id="projects"
        className="bg-gradient-to-b from-[#0B0D12] to-[#F5F4EF] py-16 px-4 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#597EF7]">
          03 / Transisi Karya
        </span>
      </div>
    );
  }

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative h-[165vh] bg-[#0B0D12] select-none"
      aria-label="Transisi menuju pameran proyek"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#0B0D12]">
        {/* Lapisan latar tipis sebelum portal terbuka */}
        <m.div
          style={{ opacity: captionOpacity }}
          className="absolute top-24 sm:top-28 inset-x-0 text-center px-4 z-10 pointer-events-none"
        >
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#85A5FF]">
            03 / Etalase Karya Terkurasi
          </span>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Terus gulir untuk memasuki ruang terang
          </p>
        </m.div>

        {/* Cakram Warm Stone yang memancar keluar dari dalam huruf O */}
        <m.div
          aria-hidden="true"
          style={{
            scale: stoneFloodScale,
            opacity: stoneFloodOpacity,
            left: `${originPct.x}%`,
            top: `${originPct.y}%`,
          }}
          className="absolute w-[120vmax] h-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5F4EF] pointer-events-none z-20 will-change-transform"
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
          <div className="font-display font-black tracking-tight text-[17vw] sm:text-[14vw] lg:text-[12vw] leading-none text-[#F5F4EF] flex items-center">
            {PORTAL_LETTERS.map((letter, idx) => {
              const isFocusGlyph = idx === 2;
              return (
                <span
                  key={`${letter}-${idx}`}
                  ref={isFocusGlyph ? targetGlyphRef : undefined}
                  className={cn(
                    "inline-block transition-colors duration-300",
                    isFocusGlyph ? "text-[#2F54EB]" : "text-[#F5F4EF]"
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
