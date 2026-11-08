"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const PROGRESS_SECTIONS = ["hero", "about", "skills", "projects", "contact"];

export function ScrollProgressChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { progress, isLightSurface } = useScrollSpy(PROGRESS_SECTIONS);

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Indikator progres scroll tipis di puncak layar (tidak memblokir klik) */}
      {isHome && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none"
        >
          <m.div
            className="h-full origin-left"
            style={{
              scaleX: Math.max(0.015, progress),
              backgroundColor: isLightSurface ? "#2F54EB" : "#597EF7",
            }}
            transition={{ duration: 0.08, ease: "linear" }}
          />
        </div>
      )}
      {children}
    </LazyMotion>
  );
}
