"use client";

import { useState } from "react";
import { CheckCircle2, Cpu, Layers, Server } from "lucide-react";
import type { FocusArea } from "@/types/owner";
import { cn } from "@/utils/cn";

const FOCUS_ICONS = [Layers, Server, Cpu, CheckCircle2];

interface FocusPillarsPanelProps {
  items: FocusArea[];
}

export function FocusPillarsPanel({ items }: FocusPillarsPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#708FFF] font-semibold">
          <Cpu className="w-4 h-4" />
          <span>Fokus Rekayasa</span>
        </div>
        <span className="font-mono text-[11px] text-[#A1A8B8]">
          Berbasis repositori nyata
        </span>
      </div>

      <div className="relative pl-6 space-y-3.5">
        <div
          aria-hidden="true"
          className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-[#708FFF]/60 via-white/15 to-transparent"
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
                "w-full text-left relative p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer",
                isActive
                  ? "bg-[#121620] border-[#708FFF]/55 shadow-[0_0_24px_rgba(47,84,235,0.16)] opacity-100"
                  : "bg-[#121620]/60 border-white/10 opacity-75 hover:opacity-100"
              )}
            >
              <span
                className={cn(
                  "absolute -left-6 top-5 w-6 h-6 -translate-x-1/2 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "bg-[#F3F4F6] text-[#0B0D12] ring-4 ring-[#708FFF]/30 scale-110 shadow-[0_0_16px_rgba(112,143,255,0.65)]"
                    : "bg-[#181D2B] text-[#A1A8B8] border border-white/15"
                )}
              >
                {idx + 1}
              </span>

              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#708FFF] shrink-0" />
                    <h4 className="font-display text-sm sm:text-base font-bold text-white truncate">
                      {area.title}
                    </h4>
                  </div>
                  <div className="font-mono text-[11px] text-[#9FB4FF]">{area.subtitle}</div>
                </div>
              </div>

              <p className="mt-2 text-xs text-[#A1A8B8] leading-relaxed">
                {area.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
