"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation, m, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function TopScrollBar() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent"
    >
      <m.div
        className="h-full origin-left bg-[#708FFF]"
        style={{
          scaleX: reducedMotion ? scrollYProgress : smoothProgress,
        }}
      />
    </div>
  );
}

export function ScrollProgressChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <LazyMotion features={domAnimation} strict>
      {isHome && <TopScrollBar />}
      {children}
    </LazyMotion>
  );
}
