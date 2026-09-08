"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return; // Disable on touch devices
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Detect interactive targets
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest("button, a, [data-cursor]");
      if (clickable) {
        setIsHovered(true);
        const customLabel = clickable.getAttribute("data-cursor");
        setHoverLabel(customLabel);
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
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
      {/* Outer Follower Ring */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:flex items-center justify-center font-mono text-[9px] uppercase tracking-wider text-white font-bold"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            isHovered ? 2.4 : 1
          })`,
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: isHovered ? "rgba(220, 38, 38, 0.85)" : "transparent",
          border: isHovered
            ? "1px solid rgba(239, 68, 68, 0.9)"
            : "1.5px solid rgba(220, 38, 38, 0.6)",
          boxShadow: isHovered ? "0 0 16px rgba(220, 38, 38, 0.5)" : "none",
        }}
      >
        {hoverLabel && <span className="scale-[0.55] select-none">{hoverLabel}</span>}
      </div>

      {/* Center Dot */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? 0 : 5,
          height: isHovered ? 0 : 5,
          borderRadius: "50%",
          backgroundColor: "#ef4444",
          transition: "width 0.15s, height 0.15s",
        }}
      />
    </>
  );
}
