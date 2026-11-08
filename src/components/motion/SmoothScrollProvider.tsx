"use client";

import { createContext, useContext, useEffect, useRef, useCallback, type ReactNode } from "react";
import type Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    // Hanya muat Lenis pada desktop pointer presisi agar CPU mobile tetap 0% overhead
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) return;

    let cancelled = false;
    let rafId = 0;
    let instance: Lenis | null = null;

    const initDesktopLenis = async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;

      instance = new LenisCtor({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95,
        syncTouch: false,
      });

      lenisRef.current = instance;

      const raf = (time: number) => {
        if (cancelled) return;
        instance?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    };

    const handleHashClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;

      event.preventDefault();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el as HTMLElement, { offset: -20, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleHashClick);
    const idleTimer = window.setTimeout(initDesktopLenis, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(idleTimer);
      if (rafId) window.cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleHashClick);
      instance?.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
      const lenis = lenisRef.current;
      if (lenis && !reducedMotion) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? -20,
          duration: options?.duration ?? 1.0,
        });
        return;
      }

      const behavior = reducedMotion ? "auto" : "smooth";
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior });
      } else {
        target.scrollIntoView({ behavior });
      }
    },
    [reducedMotion]
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
