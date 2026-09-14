"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return; // Disable on touch devices
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Detect interactive targets cleanly
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest("button, a, input, textarea, select, [role='button']");
      setIsHovered(!!clickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [reducedMotion]);

  if (reducedMotion || !isVisible) return null;

  return (
    <>
      {/* Outer Sleek Aura Follower Ring */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block rounded-full"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            isHovered ? 1.6 : 1
          })`,
          width: 28,
          height: 28,
          backgroundColor: isHovered ? "rgba(239, 68, 68, 0.12)" : "transparent",
          border: isHovered
            ? "1.5px solid rgba(239, 68, 68, 0.7)"
            : "1px solid rgba(239, 68, 68, 0.35)",
          boxShadow: isHovered ? "0 0 12px rgba(239, 68, 68, 0.25)" : "none",
        }}
      />

      {/* Precision Center Pin Dot */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block rounded-full"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? 4 : 4,
          height: isHovered ? 4 : 4,
          backgroundColor: "#ef4444",
          boxShadow: "0 0 6px rgba(239, 68, 68, 0.8)",
          transition: "transform 0.1s ease-out, background-color 0.15s ease",
        }}
      />
    </>
  );
}
