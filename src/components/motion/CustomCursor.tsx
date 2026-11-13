"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pressedRef = useRef(false);
  const [cursorLabel, setCursorLabel] = useState<string>("");

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
    let hasLabel = false;
    let ringScale = 0.5;
    const targetScale = () => (hasLabel ? 1 : isHovering ? 0.66 : 0.5) * (pressedRef.current ? 0.9 : 1);

    const applyDotTransform = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const applyRingTransform = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
      }
    };

    const updateVisibility = (visible: boolean) => {
      isVisible = visible;
      const opacity = visible ? "1" : "0";
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (dotRef.current) dotRef.current.style.opacity = opacity;
    };

    const animate = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.24;
      ringY += dy * 0.24;
      const ds = targetScale() - ringScale;
      ringScale += ds * 0.24;

      applyRingTransform();

      // Tidurkan loop RAF otomatis ketika cincin kursor sudah menyusul posisi pointer
      if (Math.abs(dx) < 0.18 && Math.abs(dy) < 0.18 && Math.abs(ds) < 0.001) {
        ringX = mouseX;
        ringY = mouseY;
        applyRingTransform();
        rafId = 0;
        return;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    const wakeLoop = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        ringX = mouseX;
        ringY = mouseY;
        updateVisibility(true);
      }
      applyDotTransform();
      wakeLoop();
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const labeled = target?.closest("[data-cursor-label]") as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select, [role='button']");
      isHovering = Boolean(interactive || labeled);
      const nextLabel = labeled?.getAttribute("data-cursor-label") || "";
      hasLabel = Boolean(nextLabel);
      setCursorLabel((prev) => (prev === nextLabel ? prev : nextLabel));
      wakeLoop();
    };

    const onMouseDown = () => {
      pressedRef.current = true;
      wakeLoop();
    };

    const onMouseUp = () => {
      pressedRef.current = false;
      wakeLoop();
    };

    const onLeave = () => {
      updateVisibility(false);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[9998] hidden md:flex w-14 h-14 items-center justify-center rounded-full pointer-events-none opacity-0 transition-opacity ${
          cursorLabel
            ? "bg-[#2F54EB]/90 border border-[#708FFF] text-white"
            : "bg-transparent border border-[#708FFF]/60"
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
          className="fixed top-0 left-0 z-[9999] hidden md:block w-1.5 h-1.5 rounded-full bg-[#708FFF] pointer-events-none opacity-0 transition-opacity duration-150 will-change-transform shadow-[0_0_8px_rgba(112,143,255,0.7)]"
        />
      )}
    </>
  );
}
