"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OWNER_PROFILE } from "@/data/owner";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TopographyBackdrop } from "@/features/about/TopographyBackdrop";
import { AboutIntroHero } from "@/features/about/AboutIntroHero";
import { EducationTimeline } from "@/features/about/EducationTimeline";
import { FocusPillarsPanel } from "@/features/about/FocusPillarsPanel";
import { TechFolderDeck } from "@/features/about/TechFolderDeck";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
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

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <AboutIntroHero />

        {/* Dua Kolom Seimbang: Rekam Pendidikan & Fokus Rekayasa */}
        <div className="about-reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 pt-4 border-t border-white/10">
          <EducationTimeline entries={OWNER_PROFILE.education} />
          <FocusPillarsPanel items={OWNER_PROFILE.focusAreas} />
        </div>

        {/* Folder Shortcut Interaktif 2D dengan Pratinjau Proyek Nyata */}
        <div className="about-reveal pt-2 border-t border-white/10">
          <TechFolderDeck />
        </div>
      </div>
    </section>
  );
}
