"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform, type MotionStyle } from "framer-motion";

interface HeroArtworkProps {
  titleStyle?: MotionStyle;
  backgroundStyle?: MotionStyle;
  subjectStyle?: MotionStyle;
}

export function HeroArtwork({ titleStyle, backgroundStyle, subjectStyle }: HeroArtworkProps) {
  return (
    <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
      <m.div className="absolute inset-0" style={backgroundStyle}>
        <Image src="/images/hero-landscape.webp" alt="Anthony Wisnu Jati menghadap lanskap pegunungan berkabut"
          fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover object-center" />
      </m.div>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B0D12]/45 to-transparent z-10 pointer-events-none" />
      <m.div style={titleStyle} className="hero-title absolute inset-x-0 top-[24%] sm:top-[22%] lg:top-[21%] z-10 flex justify-center px-4 pointer-events-none">
        <h1 className="font-display text-[2.35rem] sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.25rem] font-extrabold uppercase tracking-tight leading-[0.98] text-center text-white/90">
          WELCOME TO MY<br />PORTFOLIO
        </h1>
      </m.div>
      <m.div className="absolute inset-0 z-20 pointer-events-none" style={subjectStyle}>
        <Image src="/images/hero-subject-cutout.webp" alt="" aria-hidden="true" fill
          loading="eager" sizes="100vw" className="object-cover object-center" />
      </m.div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/65 to-transparent z-30 pointer-events-none" />
    </div>
  );
}

export function HeroScene() {
  const scene = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.65, 0.92], [0, 0.25, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.22, 0.65, 0.95], [48, 0, -8, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.7], [0.96, 1, 1.02]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const subjectY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  return (
    <div ref={scene} className="relative h-full">
      <HeroArtwork titleStyle={{ opacity, y, scale }} backgroundStyle={{ y: backgroundY }} subjectStyle={{ y: subjectY }} />
    </div>
  );
}
