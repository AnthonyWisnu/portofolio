"use client";

import { useState } from "react";
import { Cpu, Layers, Server } from "lucide-react";
import type { FocusArea } from "@/types/owner";
import { cn } from "@/utils/cn";

const FOCUS_ICONS = [Layers, Server, Cpu];

interface FocusPillarsPanelProps {
  items: FocusArea[];
}

export function FocusPillarsPanel({ items }: FocusPillarsPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-5">
      <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
        Fokus Rekayasa
      </h3>

      <div className="relative pl-8 space-y-5">
        <div
          aria-hidden="true"
          className="absolute left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-white/35 via-white/15 to-transparent"
        />

        {items.map((area, idx) => {
          const Icon = FOCUS_ICONS[idx % FOCUS_ICONS.length];
          const isActive = activeIndex === idx;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              className={cn(
                "w-full text-left relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
                isActive
                  ? "bg-[#121620] border-[#708FFF]/50 shadow-[0_0_24px_rgba(47,84,235,0.14)] opacity-100"
                  : "bg-[#121620]/50 border-white/10 opacity-70 hover:opacity-100"
              )}
            >
              <span
                className={cn(
                  "absolute -left-8 top-5 w-7 h-7 -translate-x-1/2 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "bg-white text-[#0B0D12] shadow-[0_0_20px_rgba(255,255,255,0.65)] scale-105"
                    : "bg-[#181D2B] text-[#A1A8B8] border border-white/15"
                )}
              >
                {idx + 1}
              </span>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-[#181D2B] border border-white/12 flex items-center justify-center shrink-0 text-[#708FFF]">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="font-display text-sm sm:text-base font-semibold text-white truncate">
                    {area.title}
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#181D2B] text-[#A1A8B8] border border-white/10 shrink-0">
                  {area.badge}
                </span>
              </div>

              <div className="mt-2.5 font-mono text-xs sm:text-sm text-[#D1D5DB]">
                {area.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
