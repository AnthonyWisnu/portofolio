"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";
import { GithubIcon } from "@/components/ui/Icons";
import { ProjectVisualPreview } from "@/features/projects/ProjectVisualPreview";

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project, index?: number) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <article className="w-[310px] sm:w-[390px] lg:w-[440px] shrink-0 rounded-2xl bg-white border border-[#E4E1D8] p-4 sm:p-5 soft-card-shadow flex flex-col justify-between gap-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        <ProjectVisualPreview
          project={project}
          onOpenScreenshots={(idx) => onOpenModal?.(project, idx)}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-[#2F54EB]/10 text-[#2F54EB] font-semibold border border-[#2F54EB]/20">
            {project.tier === "utama" ? "Proyek Utama" : "Proyek Pendukung"}
          </span>
          <span className="text-[#71717A]">
            {project.category} · {project.year}
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#141519] leading-snug">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#52555E] leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-[#F5F4EF] border border-[#E4E1D8] font-mono text-[11px] text-[#374151]"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg bg-[#F5F4EF] font-mono text-[11px] text-[#71717A]">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#ECEAE3]">
        <Link
          href={`/projects/${project.slug}`}
          data-cursor-label="Detail"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2F54EB] hover:bg-[#2342C8] text-white text-xs font-medium transition-colors"
        >
          <span>Studi Kasus</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#D4D1C7] hover:border-[#2F54EB]/50 text-xs font-medium text-[#141519] hover:text-[#2F54EB] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Demo Langsung</span>
          </a>
        )}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Repositori GitHub ${project.title}`}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F5F4EF] hover:bg-[#EAE7DF] text-xs font-mono text-[#141519] transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>Repo</span>
        </a>
      </div>
    </article>
  );
}
