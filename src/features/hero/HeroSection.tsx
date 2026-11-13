"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroArtwork, HeroScene } from "./HeroScene";

export function HeroSection() {
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reducedMotion = useReducedMotion();
  return (
    <section id="hero" className="hero-scene relative bg-[#0B0D12] text-[#F3F4F6] select-none">
      {desktop && !reducedMotion ? <HeroScene /> : <HeroArtwork titleStyle={{ opacity: 1, y: 0, scale: 1 }} />}
    </section>
  );
}
