"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -120;
    let mouseY = -120;
    let ringX = -120;
    let ringY = -120;
    let isHovering = false;
    let isVisible = false;
    let rafId = 0;

    const updateVisibility = (visible: boolean) => {
      isVisible = visible;
      const opacity = visible ? "1" : "0";
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (dotRef.current) dotRef.current.style.opacity = opacity;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) updateVisibility(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const labeled = target?.closest("[data-cursor-label]") as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select, [role='button'], [data-cursor]");
      isHovering = Boolean(interactive || labeled);
      const nextLabel = labeled?.getAttribute("data-cursor-label") || "";
      setCursorLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onLeave = () => updateVisibility(false);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
          isPressed ? 0.88 : isHovering ? 1.35 : 1
        })`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, isPressed]);

  if (reducedMotion) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[9998] hidden md:flex items-center justify-center rounded-full pointer-events-none opacity-0 transition-[width,height,background-color,border-color,opacity] duration-200 will-change-transform ${
          cursorLabel
            ? "w-20 h-20 bg-[#2F54EB]/90 border border-[#597EF7] text-white shadow-lg"
            : "w-7 h-7 bg-transparent border border-[#597EF7]/55"
        }`}
      >
        {cursorLabel && (
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
            {cursorLabel}
          </span>
        )}
      </div>

      {!cursorLabel && (
        <div
          ref={dotRef}
          aria-hidden="true"
          className="fixed top-0 left-0 z-[9999] hidden md:block w-1.5 h-1.5 rounded-full bg-[#2F54EB] pointer-events-none opacity-0 transition-opacity duration-150 will-change-transform shadow-[0_0_8px_rgba(47,84,235,0.65)]"
        />
      )}
    </>
  );
}
