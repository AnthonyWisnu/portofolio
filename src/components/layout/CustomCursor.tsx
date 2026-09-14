"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return; // Disable on touch devices
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isVisible = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      isHovered = !!target?.closest("button, a, input, textarea, select, [role='button'], [data-cursor]");
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    // Ultra-light 60-144fps animation loop with zero React re-renders
    const loop = () => {
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;

      if (ringRef.current) {
        const scale = isHovered ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.backgroundColor = isHovered ? "rgba(239, 68, 68, 0.12)" : "transparent";
        ringRef.current.style.borderColor = isHovered ? "rgba(239, 68, 68, 0.7)" : "rgba(239, 68, 68, 0.35)";
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Outer Sleek Aura Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full will-change-transform opacity-0 transition-opacity duration-200"
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(239, 68, 68, 0.35)",
        }}
      />

      {/* Precision Center Pin Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full will-change-transform opacity-0 transition-opacity duration-200"
        style={{
          width: 4,
          height: 4,
          backgroundColor: "#ef4444",
          boxShadow: "0 0 6px rgba(239, 68, 68, 0.8)",
        }}
      />
    </>
  );
}
