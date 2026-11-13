"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import type { QuickFolder } from "@/types/projectFolder";

export function FolderCard({
  folder,
  onSelect,
}: {
  folder: QuickFolder;
  onSelect: (folder: QuickFolder) => void;
}) {
  const Icon = folder.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(folder)}
      data-cursor-label="Buka"
      className="group relative w-full text-left pt-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#708FFF] rounded-2xl"
    >
      {/* Telinga tab folder kiri atas */}
      <div
        aria-hidden="true"
        className="absolute top-1.5 left-4 w-28 h-5 rounded-t-xl bg-[#181D2B] border-t border-x border-white/14 transition-colors group-hover:border-[#708FFF]/50"
      />

      <div className="relative rounded-2xl border border-white/12 bg-[#121620] p-4 sm:p-5 overflow-hidden obsidian-card-glow group-hover:-translate-y-1">
        {/* Kisi lembaran pratinjau mengintip di dalam bibir folder */}
        <div className="relative h-24 sm:h-28 mb-4 flex items-end justify-center gap-2 px-1">
          {folder.sheets.map((sheet, idx) => (
            <div
              key={sheet.title}
              className={cn(
                "relative flex-1 h-20 sm:h-24 rounded-t-xl border border-white/15 bg-[#1B2132] overflow-hidden shadow-md transition-transform duration-300 ease-out",
                idx === 0 &&
                  "-rotate-3 translate-y-2 group-hover:-translate-y-1.5 group-hover:-rotate-6",
                idx === 1 && "z-10 translate-y-0.5 group-hover:-translate-y-3",
                idx === 2 &&
                  "rotate-3 translate-y-2 group-hover:-translate-y-1 group-hover:rotate-6",
              )}
            >
              {sheet.image ? (
                <Image
                  src={sheet.image}
                  alt={sheet.title}
                  fill
                  sizes="140px"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="h-full w-full p-2.5 flex flex-col justify-between bg-gradient-to-b from-[#1E263B] to-[#141926]">
                  <span className="w-5 h-1 rounded-full bg-[#708FFF]/60" />
                  <span className="font-mono text-[10px] leading-tight text-[#E2E8F0] line-clamp-2">
                    {sheet.title}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/65 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Saku depan folder */}
        <div className="relative z-20 flex items-center justify-between gap-3 pt-3 border-t border-white/12 bg-[#121620]/95">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-[#708FFF] shrink-0" />
              <span className="font-mono text-[11px] text-[#9FB4FF]">{folder.countLabel}</span>
            </div>
            <h4 className="font-display text-base font-bold text-white truncate">{folder.label}</h4>
          </div>

          <span className="w-8 h-8 rounded-full bg-[#181D2B] border border-white/10 group-hover:bg-[#2F54EB] group-hover:border-[#2F54EB] text-[#A1A8B8] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </button>
  );
}
