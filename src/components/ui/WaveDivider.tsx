"use client";

import React from "react";

interface WaveDividerProps {
  accent?: string;
  secondaryAccent?: string;
  className?: string;
  variant?: "red-emerald" | "emerald-purple" | "purple-amber" | "amber-red";
  label?: string;
}

export function WaveDivider({
  accent = "#ef4444",
  secondaryAccent = "#10b981",
  className = "",
  variant,
  label,
}: WaveDividerProps) {
  // Preset palette variants
  let col1 = accent;
  let col2 = secondaryAccent;

  if (variant === "red-emerald") {
    col1 = "#ef4444";
    col2 = "#10b981";
  } else if (variant === "emerald-purple") {
    col1 = "#10b981";
    col2 = "#a855f7";
  } else if (variant === "purple-amber") {
    col1 = "#a855f7";
    col2 = "#f59e0b";
  } else if (variant === "amber-red") {
    col1 = "#f59e0b";
    col2 = "#ef4444";
  }

  const gradId = `waveGrad-${col1.replace("#", "")}-${col2.replace("#", "")}`;
  const glowId = `waveGlow-${col1.replace("#", "")}-${col2.replace("#", "")}`;

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none py-1 sm:py-3 ${className}`}
      aria-hidden="true"
    >
      {/* Ambient background glow mesh */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-3xl h-16 sm:h-20 rounded-full blur-3xl opacity-20 dark:opacity-25"
        style={{
          background: `radial-gradient(ellipse at center, ${col1} 0%, ${col2} 50%, transparent 80%)`,
        }}
      />

      {/* SVG Organic Flow Wave */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8">
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 lg:h-14"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={col1} stopOpacity="0.1" />
              <stop offset="30%" stopColor={col1} stopOpacity="0.8" />
              <stop offset="70%" stopColor={col2} stopOpacity="0.8" />
              <stop offset="100%" stopColor={col2} stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id={glowId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={col1} stopOpacity="0.0" />
              <stop offset="40%" stopColor={col1} stopOpacity="0.12" />
              <stop offset="60%" stopColor={col2} stopOpacity="0.12" />
              <stop offset="100%" stopColor={col2} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill under curve with soft illumination */}
          <path
            d="M0,36 C360,68 720,4 1080,42 C1260,58 1380,24 1440,36 L1440,72 L0,72 Z"
            fill={`url(#${glowId})`}
          />

          {/* Secondary Resonance Dotted Wave */}
          <path
            d="M0,50 C260,18 620,54 980,22 C1220,42 1360,14 1440,36"
            stroke={`url(#${gradId})`}
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeOpacity="0.4"
          />

          {/* Primary High-Precision Fluid Wave */}
          <path
            d="M0,36 C360,68 720,4 1080,42 C1260,58 1380,24 1440,36"
            stroke={`url(#${gradId})`}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>

        {/* Central Micro-Telemetry Pill Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-neutral-950/90 border border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-md shadow-xs">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: col1 }}
          />
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            {label || "SYSTEM CONTINUITY"}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: col2 }}
          />
        </div>
      </div>
    </div>
  );
}
