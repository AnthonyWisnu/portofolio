"use client";

import { useState } from "react";
import Image from "next/image";
import { Cpu, Expand, GitBranch, Radio, ShieldCheck } from "lucide-react";
import type { Project } from "@/types/project";
import { VOID_SUPPORTED_PLATFORMS } from "@/data/voidProtocols";

interface ProjectVisualPreviewProps {
  project: Project;
  onOpenScreenshots?: (initialIndex: number) => void;
}

export function ProjectVisualPreview({
  project,
  onOpenScreenshots,
}: ProjectVisualPreviewProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(0);

  if (project.coverImage) {
    return (
      <div
        data-cursor-label="Pratinjau"
        onClick={() => onOpenScreenshots?.(0)}
        className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#EBE9E1] border border-[#E4E1D8] group/img cursor-pointer"
      >
        <Image
          src={project.coverImage}
          alt={project.screenshots[0]?.alt || project.title}
          fill
          sizes="(max-width: 768px) 90vw, 480px"
          className="object-cover transition-transform duration-700 group-hover/img:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141519]/45 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
        {project.screenshots.length > 0 && (
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141519]/85 text-white text-[11px] font-mono backdrop-blur-sm">
            <Expand className="w-3 h-3" />
            <span>{project.screenshots.length} Tangkapan Layar</span>
          </span>
        )}
      </div>
    );
  }

  // Pratinjau Konsol Interaktif Faktual untuk VOID Downloader
  if (project.consoleVariant === "void") {
    const activePlatform = VOID_SUPPORTED_PLATFORMS[selectedPlatform];
    return (
      <div className="w-full aspect-[16/9] rounded-xl bg-[#0B0D12] text-[#F3F4F6] border border-[#232838] p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9CA3AF] border-b border-white/10 pb-2">
          <span className="flex items-center gap-1.5 text-[#85A5FF]">
            <Radio className="w-3 h-3" />
            <span>VOID ENGINE // 10 PLATFORM</span>
          </span>
          <span className="text-emerald-400">H.264 FASTSTART</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 my-2">
          {VOID_SUPPORTED_PLATFORMS.map((plat, idx) => (
            <button
              key={plat.id}
              type="button"
              onClick={() => setSelectedPlatform(idx)}
              className={`px-2 py-1.5 rounded-lg text-[10px] font-mono text-left truncate border transition-colors cursor-pointer ${
                idx === selectedPlatform
                  ? "bg-[#2F54EB]/25 border-[#597EF7] text-white"
                  : "bg-white/5 border-white/10 text-[#9CA3AF] hover:text-white"
              }`}
            >
              {plat.name}
            </button>
          ))}
        </div>

        <div className="rounded-lg bg-[#12151E] border border-white/10 px-2.5 py-2 flex items-center justify-between gap-2 text-[10px] font-mono">
          <span className="text-[#E5E7EB] truncate">{activePlatform.badge}</span>
          <span className="text-[#597EF7] shrink-0">{activePlatform.codec}</span>
        </div>
      </div>
    );
  }

  // Pratinjau Arsitektur Pipeline Faktual untuk MinjiBot atau ScoutRAG
  const isScout = project.consoleVariant === "scout";
  return (
    <div className="w-full aspect-[16/9] rounded-xl bg-[#0B0D12] text-[#F3F4F6] border border-[#232838] p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between text-[10px] font-mono text-[#9CA3AF] border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-[#85A5FF]">
          {isScout ? <GitBranch className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
          <span>{isScout ? "HYBRID KG + VECTOR ROUTER" : "MULTI-TENANT BOT PIPELINE"}</span>
        </span>
        <span className="text-[#9CA3AF]">{isScout ? "4 STRATEGI" : "398 TESTS PASS"}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 my-auto py-1">
        {project.architecture.slice(0, 4).map((node) => (
          <div
            key={node.layer}
            className="rounded-lg bg-[#12151E] border border-white/10 p-2 min-w-0"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#597EF7] truncate">
              <Cpu className="w-3 h-3 shrink-0" />
              <span className="truncate">{node.layer}</span>
            </div>
            <div className="text-[10px] text-[#9CA3AF] truncate mt-0.5">{node.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
