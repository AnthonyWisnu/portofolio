"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MOTION } from "@/config/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function RevealGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion) return;
    element.querySelectorAll<HTMLElement>(":scope > [data-reveal]").forEach((child, index) => {
      child.style.setProperty("--reveal-delay", `${Math.min(index, 3) * MOTION.stagger}s`);
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.revealed = "true";
      observer.disconnect();
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);
  return <div ref={root} className={`section-reveal ${className}`}>{children}</div>;
}
