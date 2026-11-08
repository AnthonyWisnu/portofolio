"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Code2 } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

export function SkillsSection() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const current = SKILL_CATEGORIES[activeIndex] || SKILL_CATEGORIES[0];

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-[#0B0D12] to-[#0D1119] text-[#F3F4F6] border-t border-white/10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Keahlian Teknis
          </h2>
        </div>

        {/* Rangka Utama Pilihan Teknologi */}
        <div className="rounded-3xl border border-white/10 bg-[#121620] p-4 sm:p-7 lg:p-10 obsidian-card-shadow space-y-6">
          {/* Tab Kategori dengan Indikator Framer layoutId */}
          <div
            role="tablist"
            aria-label="Kategori Keahlian Teknis"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
          >
            {SKILL_CATEGORIES.map((category, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "relative px-3 py-3 rounded-xl text-xs font-mono text-center transition-colors min-h-[44px] cursor-pointer overflow-hidden border",
                    isSelected
                      ? "text-white border-[#2F54EB]"
                      : "text-[#A1A8B8] border-white/10 bg-[#0B0D12]/70 hover:text-white hover:border-[#708FFF]/45"
                  )}
                >
                  {isSelected && (
                    <m.span
                      layoutId="skills-active-pill"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      className="absolute inset-0 bg-[#2F54EB] -z-0"
                    />
                  )}
                  <span className="relative z-10 block truncate font-medium">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail Kategori Terpilih */}
          <AnimatePresence mode="wait">
            <m.div
              key={current.id}
              initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-[#0B0D12]/85 p-5 sm:p-7 space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#2F54EB]/20 border border-[#708FFF]/35 flex items-center justify-center text-[#708FFF]">
                      <Code2 className="w-4 h-4" />
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                      {current.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A8B8] leading-relaxed">
                    {current.summary}
                  </p>
                </div>

                {/* Proyek Terkait */}
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-mono text-[#A1A8B8] mr-1">Dipakai di:</span>
                  {current.verifiedIn.map((proj) => (
                    <span
                      key={proj}
                      className="px-2.5 py-1 rounded-md bg-[#181D2B] border border-white/10 text-[11px] font-mono text-[#D1D5DB]"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid Item Teknologi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {current.skills.map((skill, idx) => (
                  <div
                    key={skill}
                    className="group flex items-center justify-between gap-2 p-3.5 rounded-xl border border-white/10 bg-[#121620] hover:border-[#708FFF]/55 hover:bg-[#181D2B] transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-[#708FFF] shrink-0" />
                      <span className="font-mono text-xs text-[#F3F4F6] truncate" title={skill}>
                        {skill}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#A1A8B8] group-hover:text-[#9FB4FF] transition-colors shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
