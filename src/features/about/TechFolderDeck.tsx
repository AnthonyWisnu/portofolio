"use client";

import { useState, useRef } from "react";
import { ArrowUpRight, Cpu, FolderKanban, Layers } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/utils/cn";

interface QuickFolder {
  id: string;
  label: string;
  countLabel: string;
  subtitle: string;
  previewTitles: string[];
  targetHash: string;
  filterKey?: "utama" | "pendukung";
  icon: typeof Layers;
}

const FOLDERS: QuickFolder[] = [
  {
    id: "utama",
    label: "Proyek Utama",
    countLabel: "05 Sistem",
    subtitle: "Aplikasi produksi dan arsitektur inti",
    previewTitles: ["Sora Wellness", "Kemitraan Mebel", "VOID Downloader", "MinjiBot V2"],
    targetHash: "#projects-showcase",
    filterKey: "utama",
    icon: FolderKanban,
  },
  {
    id: "pendukung",
    label: "Riset & AI",
    countLabel: "02 Sistem",
    subtitle: "Knowledge Graph RAG & Machine Learning",
    previewTitles: ["ScoutRAG KG-RAG", "Bali Smart Pricing", "Neo4j + SHAP"],
    targetHash: "#projects-showcase",
    filterKey: "pendukung",
    icon: Cpu,
  },
  {
    id: "skills",
    label: "Peta Keahlian",
    countLabel: "06 Modul",
    subtitle: "Teknologi terverifikasi dari repositori",
    previewTitles: ["Next.js & NestJS", "PostgreSQL & Prisma", "Docker & CI/CD"],
    targetHash: "#skills",
    icon: Layers,
  },
];

function FolderCard({
  folder,
  onSelect,
}: {
  folder: QuickFolder;
  onSelect: (folder: QuickFolder) => void;
}) {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });

  const Icon = folder.icon;

  const onMouseMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 10,
      ry: (px - 0.5) * 12,
      gx: px * 100,
      gy: py * 100,
      hovered: true,
    });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(folder)}
      onPointerMove={onMouseMove}
      onPointerLeave={() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false })}
      data-cursor-label="Buka"
      style={{
        transform: reducedMotion
          ? undefined
          : `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className="group relative w-full text-left rounded-2xl border border-white/12 bg-[#12151E] p-5 transition-all duration-300 hover:border-[#2F54EB]/60 cursor-pointer overflow-hidden"
    >
      {/* Sorotan Specular Mengikuti Pointer */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            tilt.hovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: `radial-gradient(220px circle at ${tilt.gx}% ${tilt.gy}%, rgba(89, 126, 247, 0.16), transparent 70%)`,
          }}
        />
      )}

      {/* Lembaran Kartu Preview Mengintip di Dalam Folder */}
      <div className="relative h-16 mb-4 flex items-end gap-1.5 overflow-hidden">
        {folder.previewTitles.slice(0, 3).map((title, idx) => (
          <div
            key={title}
            className={cn(
              "flex-1 rounded-t-lg border border-white/10 bg-[#1B2030] px-2 py-2 text-[10px] font-mono text-[#D1D5DB] truncate transition-transform duration-300",
              idx === 0 && "group-hover:-translate-y-2.5",
              idx === 1 && "group-hover:-translate-y-4 bg-[#22283C]",
              idx === 2 && "group-hover:-translate-y-1.5"
            )}
          >
            {title}
          </div>
        ))}
      </div>

      {/* Kantong Depan Folder */}
      <div className="relative z-10 flex items-start justify-between gap-3 pt-2 border-t border-white/10">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#597EF7] shrink-0" />
            <span className="font-mono text-[11px] text-[#85A5FF]">{folder.countLabel}</span>
          </div>
          <h4 className="font-display text-base font-bold text-white truncate">{folder.label}</h4>
          <p className="text-xs text-[#9CA3AF] truncate">{folder.subtitle}</p>
        </div>

        <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#2F54EB] text-[#9CA3AF] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </button>
  );
}

export function TechFolderDeck() {
  const { scrollTo } = useSmoothScroll();

  const handleSelect = (folder: QuickFolder) => {
    if (folder.filterKey && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio:select-tier", { detail: { tier: folder.filterKey } })
      );
    }
    scrollTo(folder.targetHash, { offset: -16, duration: 1.05 });
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
        <span className="uppercase tracking-widest text-[#85A5FF]">Pintasan Direktori</span>
        <span>Klik folder untuk lompat cepat</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FOLDERS.map((folder) => (
          <FolderCard key={folder.id} folder={folder} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
