"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number; // pixel coordinate X
  y: number; // pixel coordinate Y
  normalizedX: number; // -1 to 1 (left to right)
  normalizedY: number; // -1 to 1 (top to bottom)
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / innerWidth) * 2 - 1,
        normalizedY: (e.clientY / innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
