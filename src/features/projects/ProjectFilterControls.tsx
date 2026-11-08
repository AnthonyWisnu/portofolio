"use client";

import { m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

export type FilterTier = "all" | "utama" | "pendukung";

const FILTER_TABS: { key: FilterTier; label: string }[] = [
  { key: "all", label: "Semua (7)" },
  { key: "utama", label: "Proyek Utama (5)" },
  { key: "pendukung", label: "Riset & Pendukung (2)" },
];

interface ProjectFilterControlsProps {
  activeFilter: FilterTier;
  onSelectFilter: (tier: FilterTier) => void;
  showStepControls: boolean;
  onStep: (direction: -1 | 1) => void;
}

export function ProjectFilterControls({
  activeFilter,
  onSelectFilter,
  showStepControls,
  onStep,
}: ProjectFilterControlsProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
      <div className="space-y-2.5">
        <span className="font-mono text-xs uppercase tracking-widest text-[#2F54EB] font-semibold">
          03 / Pameran Proyek
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#141519]">
          Karya Terkurasi &amp; Arsitektur Nyata.
        </h2>
        <p className="text-sm text-[#52555E] max-w-xl leading-relaxed">
          Tujuh proyek pilihan dari sistem SaaS produksi, mesin otomasi media, hingga riset GraphRAG dan pemodelan harga.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <div
          role="tablist"
          aria-label="Filter Tingkat Proyek"
          className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white border border-[#E4E1D8] soft-tabbar-shadow"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectFilter(tab.key)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer",
                  active ? "text-white" : "text-[#52555E] hover:text-[#141519]"
                )}
              >
                {active && (
                  <m.span
                    layoutId="project-filter-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#2F54EB]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {showStepControls && (
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Geser ke proyek sebelumnya"
              className="w-10 h-10 rounded-full bg-[#2F54EB] hover:bg-[#2342C8] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Geser ke proyek berikutnya"
              className="w-10 h-10 rounded-full bg-[#2F54EB] hover:bg-[#2342C8] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
