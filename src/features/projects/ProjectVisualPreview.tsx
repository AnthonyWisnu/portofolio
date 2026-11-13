"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectVisualPreviewProps {
  project: Project;
  onOpenScreenshots?: (initialIndex: number) => void;
}

export function ProjectVisualPreview({ project, onOpenScreenshots }: ProjectVisualPreviewProps) {
  const cover = project.screenshots[0];
  if (!cover) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-white/12 bg-[#121620] px-6 text-center text-sm text-[#A1A8B8]">
        Dokumentasi belum tersedia
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onOpenScreenshots?.(0)}
      aria-label={`Lihat gambar ${project.shortTitle}`}
      data-cursor-label="Lihat"
      className="group/img relative block w-full aspect-[16/10] overflow-hidden rounded-xl border border-white/12 bg-[#0B0D12] cursor-pointer"
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes="(max-width: 768px) 90vw, 440px"
        className="object-contain transition-transform group-hover/img:scale-[1.02]"
      />
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0B0D12]/95 px-2.5 py-1 text-[11px] text-[#F3F4F6]">
        <Expand className="h-3 w-3" />
        <span>{cover.kind === "diagram" ? "Diagram" : `${project.screenshots.length} gambar`}</span>
      </span>
    </button>
  );
}
