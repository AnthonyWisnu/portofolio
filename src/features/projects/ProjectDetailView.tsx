"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Project } from "@/types/project";
import { PortalModal } from "@/components/ui/PortalModal";
import { ProjectArchitecture } from "@/features/projects/ProjectArchitecture";
import { ProjectDetailHeader } from "@/features/projects/ProjectDetailHeader";
import { ProjectNavigation } from "@/features/projects/ProjectNavigation";
import { ProjectGallery } from "@/features/projects/ProjectGallery";

interface ProjectDetailViewProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

export function ProjectDetailView({ project, prevProject, nextProject }: ProjectDetailViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F3F4F6] pt-28 pb-16 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <ProjectDetailHeader project={project} />

        <ProjectGallery project={project} onOpenLightbox={setLightboxIndex} />

        {/* Konteks dan solusi berdasarkan sumber proyek. */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#121620] border border-white/10 p-6 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#708FFF]">
              Konteks Masalah
            </div>
            <h2 className="font-display text-lg font-bold text-white">Masalah</h2>
            <p className="text-sm text-[#A1A8B8] leading-relaxed">{project.problem}</p>
          </div>

          <div className="rounded-2xl bg-[#121620] border border-white/10 p-6 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#708FFF]">
              Pendekatan Solusi
            </div>
            <h2 className="font-display text-lg font-bold text-white">Pendekatan</h2>
            <p className="text-sm text-[#D1D5DB] leading-relaxed">{project.solution}</p>
          </div>
        </section>

        {/* Arsitektur & Galeri Screenshot */}
        <ProjectArchitecture project={project} />

        <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && project.screenshots.length > 0 && (
          <PortalModal
            title={project.title}
            screenshots={project.screenshots}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
