"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Cpu, Layers, Server } from "lucide-react";
import { OWNER_PROFILE } from "@/data/owner";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TopographyBackdrop } from "@/features/about/TopographyBackdrop";
import { InteractivePortrait } from "@/features/about/InteractivePortrait";
import { EducationTimeline } from "@/features/about/EducationTimeline";
import { TechFolderDeck } from "@/features/about/TechFolderDeck";

gsap.registerPlugin(ScrollTrigger);

const FOCUS_ICONS = [Layers, Server, Cpu, CheckCircle2];

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0B0D12] text-[#F3F4F6] overflow-x-clip border-t border-white/10"
    >
      <TopographyBackdrop />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Header Narasi */}
        <div className="about-reveal flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#597EF7]">
              01 / Tentang Saya
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Rekayasa yang Terukur dari Arsitektur hingga Antarmuka.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#9CA3AF] font-mono leading-relaxed">
            {OWNER_PROFILE.headlineIntro}
          </p>
        </div>

        {/* Grid Asimetris: Potret Sticky + Biografi Ringkas + Pilar Rekayasa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="about-reveal lg:col-span-4 lg:sticky lg:top-24">
            <InteractivePortrait />
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="about-reveal space-y-4 text-base sm:text-lg text-[#D1D5DB] leading-relaxed">
              {OWNER_PROFILE.extendedBio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OWNER_PROFILE.focusAreas.map((area, idx) => {
                const Icon = FOCUS_ICONS[idx % FOCUS_ICONS.length];
                return (
                  <div
                    key={area.id}
                    className="p-5 rounded-2xl border border-white/10 bg-[#12151E]/90 hover:border-[#2F54EB]/45 transition-colors space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#2F54EB]/15 border border-[#2F54EB]/30 flex items-center justify-center text-[#597EF7]">
                          <Icon className="w-4 h-4" />
                        </span>
                        <h3 className="font-display font-semibold text-sm text-white">
                          {area.title}
                        </h3>
                      </div>
                    </div>
                    <div className="font-mono text-[11px] text-[#85A5FF]">{area.subtitle}</div>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">{area.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="about-reveal">
              <EducationTimeline entries={OWNER_PROFILE.education} />
            </div>
          </div>
        </div>

        {/* Folder Shortcut Interaktif */}
        <div className="about-reveal pt-4 border-t border-white/10">
          <TechFolderDeck />
        </div>
      </div>
    </section>
  );
}
