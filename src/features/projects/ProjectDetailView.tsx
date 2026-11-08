"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";
import { GithubIcon } from "@/components/ui/Icons";
import { PortalModal } from "@/components/ui/PortalModal";
import { ProjectArchitectureGallery } from "@/features/projects/ProjectArchitectureGallery";

interface ProjectDetailViewProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F3F4F6] pt-28 pb-16 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#9CA3AF]">
          <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#64748B]" />
          <Link href="/#projects-showcase" className="hover:text-white transition-colors">Proyek</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="text-[#85A5FF]">{project.shortTitle}</span>
        </nav>

        <header className="space-y-6 border-b border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[#2F54EB]/20 border border-[#597EF7]/40 text-[#85A5FF] font-semibold">
              {project.tier === "utama" ? "Proyek Utama" : "Riset & Pendukung"}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D1D5DB]">{project.category}</span>
            <span className="text-[#64748B] ml-1">{project.year}</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06]">{project.title}</h1>
            <p className="text-base sm:text-xl text-[#D1D5DB] max-w-3xl leading-relaxed">{project.tagline}</p>
            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-3xl leading-relaxed">{project.summary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2F54EB] hover:bg-[#2342C8] text-white text-xs font-mono font-semibold transition-colors">
              <GithubIcon className="w-4 h-4" />
              <span>Repositori GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B0D12] hover:bg-[#E5E7EB] text-xs font-mono font-semibold transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Buka Demo Langsung</span>
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#12151E] border border-white/10 font-mono text-xs text-[#D1D5DB]">{tech}</span>
            ))}
          </div>
        </header>

        {/* Narasi Masalah vs Solusi Rekayasa */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#12151E] border border-white/10 p-6 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#597EF7]">
              Konteks Masalah
            </div>
            <h2 className="font-display text-lg font-bold text-white">
              Tantangan Nyata di Lapangan
            </h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">{project.problem}</p>
          </div>

          <div className="rounded-2xl bg-[#12151E] border border-white/10 p-6 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#597EF7]">
              Pendekatan Solusi
            </div>
            <h2 className="font-display text-lg font-bold text-white">
              Keputusan Arsitektur &amp; Rekayasa
            </h2>
            <p className="text-sm text-[#D1D5DB] leading-relaxed">{project.solution}</p>
          </div>
        </section>

        {/* Arsitektur & Galeri Screenshot */}
        <ProjectArchitectureGallery
          project={project}
          onOpenLightbox={(index) => setLightboxIndex(index)}
        />

        {/* Navigasi Proyek Sebelumnya / Berikutnya */}
        <nav
          aria-label="Navigasi Antar Proyek"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10"
        >
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group p-5 rounded-2xl bg-[#12151E] border border-white/10 hover:border-[#2F54EB]/60 transition-colors flex items-center justify-between gap-4"
          >
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#64748B]">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Proyek Sebelumnya</span>
              </div>
              <div className="font-display text-base font-bold text-white truncate">
                {prevProject.shortTitle}
              </div>
            </div>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group p-5 rounded-2xl bg-[#12151E] border border-white/10 hover:border-[#2F54EB]/60 transition-colors flex items-center justify-between gap-4 sm:text-right"
          >
            <div className="space-y-1 min-w-0 ml-auto">
              <div className="inline-flex items-center justify-end gap-1.5 text-[11px] font-mono text-[#64748B]">
                <span>Proyek Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="font-display text-base font-bold text-white truncate">
                {nextProject.shortTitle}
              </div>
            </div>
          </Link>
        </nav>
      </div>

      {lightboxIndex !== null && project.screenshots.length > 0 && (
        <PortalModal
          title={project.title}
          screenshots={project.screenshots}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
