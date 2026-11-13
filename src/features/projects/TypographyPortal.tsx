"use client";

import { useEffect, useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function PortalScene() {
  const container = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const glyph = useRef<HTMLSpanElement>(null);
  const [origin, setOrigin] = useState("42% 50%");
  useEffect(() => {
    if (!word.current || !glyph.current) return;
    const measure = () => {
      const wrap = word.current?.getBoundingClientRect();
      const letter = glyph.current?.getBoundingClientRect();
      if (!wrap?.width || !letter) return;
      setOrigin(`${((letter.left + letter.width / 2 - wrap.left) / wrap.width) * 100}% 50%`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(word.current);
    return () => observer.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0.08, 0.8], [1, 18]);
  const rotate = useTransform(scrollYProgress, [0.08, 0.8], [0, -2]);
  const opacity = useTransform(scrollYProgress, [0.68, 0.94], [1, 0]);
  return (
    <div ref={container} className="relative h-[150vh] bg-[#0D1119] select-none" aria-label="Transisi menuju pameran proyek">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center justify-center bg-[#0F131C]">
        <m.div ref={word} style={{ scale, rotate, opacity, transformOrigin: origin }} className="flex items-center justify-center px-4">
          <div className="font-display font-black tracking-tight text-[12vw] leading-none flex items-center" aria-label="Proyek">
            {Array.from("PROYEK").map((letter, index) => (
              <span key={index} ref={index === 2 ? glyph : undefined} aria-hidden="true" className={index === 2 ? "text-[#708FFF]" : "text-[#F3F4F6]"}>{letter}</span>
            ))}
          </div>
        </m.div>
      </div>
    </div>
  );
}

export function TypographyPortal() {
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reducedMotion = useReducedMotion();
  return (
    <div id="projects">
      {desktop && !reducedMotion ? <PortalScene /> : (
        <div className="bg-[#0F131C] py-12 px-4 text-center border-t border-white/10">
          <span className="font-display text-2xl font-bold text-white/90">PROYEK</span>
        </div>
      )}
    </div>
  );
}
