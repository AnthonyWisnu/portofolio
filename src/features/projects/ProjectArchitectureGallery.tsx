"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Cpu, Expand, GitBranch, Layers, Radio, ShieldCheck } from "lucide-react";
import type { Project } from "@/types/project";
import { VOID_SUPPORTED_PLATFORMS } from "@/data/voidProtocols";
import { cn } from "@/utils/cn";

interface ProjectArchitectureGalleryProps {
  project: Project;
  onOpenLightbox: (index: number) => void;
}

export function ProjectArchitectureGallery({
  project,
  onOpenLightbox,
}: ProjectArchitectureGalleryProps) {
  const [selectedVoidIndex, setSelectedVoidIndex] = useState(0);
  const activeVoidSpec = VOID_SUPPORTED_PLATFORMS[selectedVoidIndex] || VOID_SUPPORTED_PLATFORMS[0];

  return (
    <div className="space-y-8">
      {/* Matriks Arsitektur & Sorotan Teknis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-2xl bg-[#12151E] border border-white/10 p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#85A5FF]">
            <Layers className="w-4 h-4 text-[#597EF7]" />
            <span>Lapisan Arsitektur Sistem</span>
          </div>

          <div className="space-y-3">
            {project.architecture.map((node, idx) => (
              <div key={node.layer} className="p-4 rounded-xl bg-[#0B0D12] border border-white/10 flex items-start gap-3">
                <span className="font-mono text-xs text-[#597EF7] font-semibold mt-0.5 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-display text-sm font-semibold text-white">{node.layer}</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{node.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 rounded-2xl bg-[#12151E] border border-white/10 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#85A5FF]">
              <ShieldCheck className="w-4 h-4 text-[#597EF7]" />
              <span>Sorotan Implementasi Utama</span>
            </div>
            <ul className="space-y-3">
              {project.highlights.map((item) => (
                <li key={item.slice(0, 28)} className="flex items-start gap-3 text-sm text-[#D1D5DB] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-emerald-500/20 text-xs font-mono text-emerald-300/90 leading-relaxed">
            {project.verificationNote}
          </div>
        </div>
      </div>

      {project.screenshots.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-widest text-[#85A5FF]">Dokumentasi Antarmuka &amp; Evaluasi Model</div>
            <span className="font-mono text-[11px] text-[#64748B]">Klik gambar untuk memperbesar</span>
          </div>
          <div className={cn("grid gap-5", project.screenshots.length === 1 ? "grid-cols-1 max-w-3xl" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
            {project.screenshots.map((shot, idx) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => onOpenLightbox(idx)}
                data-cursor-label="Pratinjau"
                className="group text-left rounded-2xl bg-[#12151E] border border-white/10 hover:border-[#597EF7]/50 overflow-hidden transition-colors cursor-pointer"
              >
                <div className="relative aspect-[16/10] w-full bg-[#0B0D12] overflow-hidden">
                  <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0B0D12]/80 border border-white/15 flex items-center justify-center text-white opacity-80 group-hover:bg-[#2F54EB] transition-colors">
                    <Expand className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-xs font-mono text-white font-medium">{shot.alt}</div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{shot.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : project.consoleVariant === "void" ? (
        <div className="rounded-2xl bg-[#12151E] border border-white/10 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#85A5FF]">
              <Radio className="w-4 h-4 text-[#597EF7]" />
              <span>Eksplorer Profil Platform VOID Downloader</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-400">
              10 Platform Didukung · Normalisasi H.264 +faststart
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {VOID_SUPPORTED_PLATFORMS.map((spec, idx) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => setSelectedVoidIndex(idx)}
                className={cn(
                  "px-3 py-2.5 rounded-xl border text-left font-mono text-xs transition-colors cursor-pointer",
                  idx === selectedVoidIndex
                    ? "bg-[#2F54EB]/25 border-[#597EF7] text-white"
                    : "bg-[#0B0D12] border-white/10 text-[#9CA3AF] hover:text-white"
                )}
              >
                <div className="font-semibold truncate">{spec.name}</div>
                <div className="text-[10px] text-[#64748B] truncate mt-0.5">{spec.codec}</div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="font-mono text-xs text-[#597EF7]">{activeVoidSpec.badge}</div>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">{activeVoidSpec.description}</p>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-white shrink-0">
              {activeVoidSpec.codec}
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#12151E] border border-white/10 p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#85A5FF]">
            {project.consoleVariant === "scout" ? (
              <GitBranch className="w-4 h-4 text-[#597EF7]" />
            ) : (
              <Cpu className="w-4 h-4 text-[#597EF7]" />
            )}
            <span>Cetak Biru Eksekusi Sistem</span>
          </div>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            Layanan ini berjalan di lapisan backend dan orkestrasi proses sehingga tidak mengekspos antarmuka publik statis, namun seluruh alur state, antrean, dan validasinya terdokumentasi langsung pada lapisan arsitektur di atas.
          </p>
        </div>
      )}
    </div>
  );
}
