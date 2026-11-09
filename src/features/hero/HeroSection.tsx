"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.2, 0.65, 0.92],
    [0, 0.25, 1, 1, 0]
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.22, 0.65, 0.95],
    [76, 0, -14, -56]
  );
  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.7],
    [0.94, 1, 1.02]
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[165vh] bg-[#0B0D12] text-[#F3F4F6] select-none"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Layer 1 (z-0): Latar Penuh Lanskap Pegunungan */}
        <Image
          src="/images/hero-landscape.webp"
          alt="Anthony Wisnu Jati menghadap lanskap pegunungan berkabut"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center z-0"
        />

        {/* Vignette Atas Halus untuk Keterbacaan Navbar */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B0D12]/45 via-[#0B0D12]/15 to-transparent z-10 pointer-events-none"
        />

        {/* Layer 2 (z-10): Teks WELCOME TO MY PORTFOLIO di Belakang Subjek */}
        <m.div
          style={
            reducedMotion
              ? undefined
              : {
                  opacity: titleOpacity,
                  y: titleY,
                  scale: titleScale,
                }
          }
          className="absolute inset-x-0 top-[24%] sm:top-[22%] lg:top-[21%] z-10 flex justify-center px-4 pointer-events-none"
        >
          <h1 className="font-display text-[2.35rem] sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.25rem] font-extrabold uppercase tracking-tight leading-[0.98] text-center text-white/90 drop-shadow-[0_8px_28px_rgba(11,13,18,0.32)]">
            WELCOME TO MY
            <br />
            PORTFOLIO
          </h1>
        </m.div>

        {/* Layer 3 (z-20): Cutout Subjek di Depan Teks */}
        <Image
          src="/images/hero-subject-cutout.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-20 pointer-events-none"
        />

        {/* Layer 4 (z-30): Gradasi Bawah Menyatu ke Bagian Tentang Saya (#0B0D12) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/65 to-transparent z-30 pointer-events-none"
        />
      </div>
    </section>
  );
}
