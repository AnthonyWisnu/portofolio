"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Cpu, Layers, Terminal } from "lucide-react";
import { OWNER_PROFILE } from "@/data/owner";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvasLazy = dynamic(
  () => import("@/features/hero/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[520px] lg:h-[600px] rounded-3xl bg-[#12151E] border border-white/10" />
    ),
  }
);

const PILLARS = [
  { icon: Layers, label: "Fullstack", title: "Next.js & NestJS" },
  { icon: Terminal, label: "Otomasi", title: "Multi-Tenant Engine" },
  { icon: Cpu, label: "Kecerdasan Data", title: "GraphRAG & ML" },
];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      });

      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { scale: 0.96, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.15 }
        );
      }

      if (leftColRef.current && stageRef.current) {
        gsap.to(leftColRef.current, {
          yPercent: -8,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(stageRef.current, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0D12] text-[#F3F4F6] pt-24 sm:pt-28 pb-10 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-clip flex flex-col justify-between"
    >
      {/* Latar arsitektural kisi tipis */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto relative z-10">
        <div ref={leftColRef} className="lg:col-span-7 space-y-6 lg:space-y-8 min-w-0">
          <div className="hero-reveal inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono w-fit max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-[#D1D5DB] truncate">{OWNER_PROFILE.availabilityText}</span>
          </div>

          <div className="space-y-4">
            <div className="hero-reveal font-mono text-xs uppercase tracking-[0.22em] text-[#597EF7]">
              {OWNER_PROFILE.role}
            </div>
            <h1 className="hero-reveal font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-white">
              {OWNER_PROFILE.name.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="block text-[#9CA3AF]">
                {OWNER_PROFILE.name.split(" ").slice(2).join(" ")}
              </span>
            </h1>
            <p className="hero-reveal text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed">
              {OWNER_PROFILE.shortBio}
            </p>
          </div>

          {/* 3 Pilar Rekayasa Nyata */}
          <div className="hero-reveal grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-3.5 rounded-2xl bg-[#12151E] border border-white/10 hover:border-[#2F54EB]/45 transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#597EF7] mb-2" />
                  <div className="text-[11px] font-mono text-[#64748B]">{item.label}</div>
                  <div className="text-sm font-semibold text-[#F3F4F6]">{item.title}</div>
                </div>
              );
            })}
          </div>

          {/* Tombol Aksi Utama */}
          <div className="hero-reveal flex flex-wrap items-center gap-3 pt-1">
            <MagneticButton
              href="#projects"
              cursorLabel="Lihat"
              className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#2F54EB] hover:bg-[#2342C8] text-white font-semibold shadow-lg shadow-[#2F54EB]/25"
            >
              <span>Jelajahi Karya Terkurasi</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              href="#about"
              className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider border border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.07] text-[#E5E7EB]"
            >
              <span>Pelajari Pendekatan Saya</span>
            </MagneticButton>
          </div>
        </div>

        <div ref={stageRef} className="lg:col-span-5 w-full">
          <HeroCanvasLazy />
        </div>
      </div>

      {/* Penanda Gulir Bawah */}
      <div className="max-w-7xl mx-auto w-full pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#64748B] relative z-10">
        <span>00 // PENGANTAR</span>
        <a
          href="#about"
          className="inline-flex items-center gap-1.5 text-[#9CA3AF] hover:text-white transition-colors"
        >
          <span>Gulir ke bawah</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
