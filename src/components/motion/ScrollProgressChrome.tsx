"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation, m, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/config/motion";

function TopScrollBar() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent"
    >
      <m.div
        className="h-full origin-left bg-[#708FFF]"
        style={{
          scaleX: scrollYProgress,
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
      <MotionConfig reducedMotion="user" transition={{ duration: MOTION.panel, ease: MOTION.ease }}>
        {isHome && <TopScrollBar />}
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
