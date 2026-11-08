"use client";

import { useState } from "react";
import { GraduationCap, MapPin } from "lucide-react";
import type { EducationEntry } from "@/types/owner";
import { cn } from "@/utils/cn";

interface EducationTimelineProps {
  entries: EducationEntry[];
}

export function EducationTimeline({ entries }: EducationTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#85A5FF]">
          <GraduationCap className="w-4 h-4 text-[#597EF7]" />
          <span>Rekam Pendidikan</span>
        </div>
        <span className="font-mono text-[11px] text-[#64748B]">
          Pilih untuk menyorot
        </span>
      </div>

      <div className="relative pl-6 space-y-4">
        {/* Garis Vertikal Linimasa */}
        <div
          aria-hidden="true"
          className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-[#2F54EB]/70 via-white/15 to-transparent"
        />

        {entries.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              className={cn(
                "w-full text-left relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
                isActive
                  ? "bg-[#161A26] border-[#2F54EB]/60 shadow-[0_0_28px_rgba(47,84,235,0.16)] opacity-100"
                  : "bg-[#11141D] border-white/10 opacity-60 hover:opacity-90"
              )}
            >
              {/* Indikator Titik Bernomor */}
              <span
                className={cn(
                  "absolute -left-6 top-6 w-6 h-6 -translate-x-1/2 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "bg-[#2F54EB] text-white ring-4 ring-[#2F54EB]/25 scale-110 shadow-[0_0_16px_rgba(47,84,235,0.6)]"
                    : "bg-[#1A1E2B] text-[#9CA3AF] border border-white/15"
                )}
              >
                0{idx + 1}
              </span>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#2F54EB]/15 text-[#85A5FF] border border-[#2F54EB]/30">
                  {item.badge}
                </span>
                <span className="font-mono text-xs text-[#9CA3AF]">{item.period}</span>
              </div>

              <h3 className="text-base sm:text-lg font-display font-bold text-white">
                {item.institution}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#D1D5DB] mt-1">
                <span>{item.degree}</span>
                <span className="text-[#64748B] inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#597EF7]" />
                  {item.location}
                </span>
              </div>

              <ul className="mt-3 space-y-1.5 text-xs text-[#9CA3AF] leading-relaxed">
                {item.highlights.map((hl) => (
                  <li key={hl}>{hl}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
