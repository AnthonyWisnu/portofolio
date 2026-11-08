"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TopographyBackdrop() {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isVisible = true;
    let isTabActive = true;
    let rafId = 0;
    let phase = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawContours = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      pointerX += (targetX - pointerX) * 0.06;
      pointerY += (targetY - pointerY) * 0.06;

      const rows = 14;
      const stepX = 36;
      const influenceX = pointerX * width;
      const influenceY = pointerY * height;

      for (let i = 0; i < rows; i++) {
        const ratio = i / (rows - 1);
        const baseY = height * (0.08 + ratio * 0.84);
        ctx.beginPath();

        for (let x = 0; x <= width + stepX; x += stepX) {
          const waveA = Math.sin(x * 0.0045 + phase + i * 0.55) * 18;
          const waveB = Math.cos(x * 0.0022 - phase * 0.7 + i) * 12;
          const dx = x - influenceX;
          const dy = baseY - influenceY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = dist < 240 ? ((240 - dist) / 240) * 26 * (dy >= 0 ? 1 : -1) : 0;

          const y = baseY + waveA + waveB + pull;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle =
          i % 4 === 0
            ? "rgba(89, 126, 247, 0.16)"
            : "rgba(148, 163, 184, 0.075)";
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.85;
        ctx.stroke();
      }
    };

    const loop = () => {
      if (!isVisible || !isTabActive || reducedMotion) {
        rafId = 0;
        return;
      }
      phase += 0.008;
      drawContours();
      rafId = window.requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!rafId && !reducedMotion && isVisible && isTabActive) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
    };

    const onVisibility = () => {
      isTabActive = !document.hidden;
      if (isTabActive) startLoop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          drawContours();
          startLoop();
        }
      },
      { threshold: 0.02 }
    );

    resize();
    drawContours();
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    startLoop();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
    />
  );
}
