"use client";

import { createContext, useContext, useEffect, useRef, useCallback, useMemo, type ReactNode } from "react";
import type Lenis from "lenis";
import { MOTION } from "@/config/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollTarget = string | number | HTMLElement;
type ScrollOptions = { offset?: number; duration?: number; immediate?: boolean };
interface SmoothScrollContextValue {
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
  lock: () => () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {}, lock: () => () => {},
});
export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const lenisRef = useRef<Lenis | null>(null);
  const lockCount = useRef(0);

  useEffect(() => {
    if (!desktop || reducedMotion) return;
    let cancelled = false;
    let instance: Lenis | null = null;
    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      instance = new LenisCtor({
        duration: MOTION.scroll, autoRaf: true, smoothWheel: true,
        syncTouch: false, wheelMultiplier: 1,
        prevent: (node) => node.hasAttribute("data-lenis-prevent"),
      });
      lenisRef.current = instance;
      if (lockCount.current) instance.stop();
    });
    return () => {
      cancelled = true;
      instance?.destroy();
      lenisRef.current = null;
    };
  }, [desktop, reducedMotion]);

  const scrollTo = useCallback((target: ScrollTarget, options: ScrollOptions = {}) => {
    if (lockCount.current) return;
    const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (element === null) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: options.offset ?? -88, duration: options.duration ?? MOTION.scroll,
        immediate: reducedMotion || options.immediate,
      });
      return;
    }
    const top = typeof element === "number" ? element : element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top + (options.offset ?? -88)),
      behavior: reducedMotion || options.immediate ? "instant" : "smooth" });
  }, [reducedMotion]);

  useEffect(() => {
    const handleHashClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      const href = link?.getAttribute("href");
      if (!href?.startsWith("#") || href === "#" || link?.hasAttribute("download")) return;
      const element = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!element) return;
      event.preventDefault();
      scrollTo(element);
      window.history.replaceState(null, "", href);
    };
    document.addEventListener("click", handleHashClick);
    return () => document.removeEventListener("click", handleHashClick);
  }, [scrollTo]);

  const lock = useCallback(() => {
    const previousOverflow = document.documentElement.style.overflow;
    lockCount.current += 1;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
    let released = false;
    return () => {
      if (released) return;
      released = true;
      lockCount.current -= 1;
      if (!lockCount.current) {
        document.documentElement.style.overflow = previousOverflow;
        lenisRef.current?.start();
      }
    };
  }, []);
  const value = useMemo(() => ({ scrollTo, lock }), [scrollTo, lock]);
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
