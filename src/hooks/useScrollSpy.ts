"use client";

import { useEffect, useState } from "react";

export interface ScrollSpyState {
  activeId: string;
  isLightSurface: boolean;
  progress: number;
}

export function useScrollSpy(sectionIds: string[], lightTriggerId = "projects-showcase"): ScrollSpyState {
  const [state, setState] = useState<ScrollSpyState>({
    activeId: sectionIds[0] || "hero",
    isLightSurface: false,
    progress: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const computeState = () => {
      rafId = 0;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      // Deteksi section aktif berdasarkan posisi viewport (sepertiga atas layar)
      const pivot = scrollY + window.innerHeight * 0.34;
      let currentActive = sectionIds[0] || "hero";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (pivot >= top) {
          currentActive = id;
        }
      }

      // Cek apakah navbar kini melayang di atas zona terang (#F5F4EF)
      const lightAnchor = document.getElementById(lightTriggerId);
      const portalAnchor = document.getElementById("projects");
      let isLightSurface = false;

      if (lightAnchor) {
        const rect = lightAnchor.getBoundingClientRect();
        if (rect.top <= 96) {
          isLightSurface = true;
        }
      } else if (portalAnchor) {
        const rect = portalAnchor.getBoundingClientRect();
        if (rect.top <= 96) {
          isLightSurface = true;
        }
      }

      setState((prev) => {
        if (
          prev.activeId === currentActive &&
          prev.isLightSurface === isLightSurface &&
          Math.abs(prev.progress - progress) < 0.002
        ) {
          return prev;
        }
        return { activeId: currentActive, isLightSurface, progress };
      });
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(computeState);
      }
    };

    computeState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sectionIds, lightTriggerId]);

  return state;
}
