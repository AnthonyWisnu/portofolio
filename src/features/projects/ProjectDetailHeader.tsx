import Link from "next/link";
import { ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import type { Project } from "@/types/project";

export function ProjectDetailHeader({ project }: { project: Project }) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A1A8B8]"
      >
        <Link href="/" className="hover:text-white transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#A1A8B8]" />
        <Link href="/#projects-showcase" className="hover:text-white transition-colors">
          Proyek
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#A1A8B8]" />
        <span className="text-[#9FB4FF]">{project.shortTitle}</span>
      </nav>

      <header className="space-y-6 border-b border-white/10 pb-10">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-[#2F54EB]/20 border border-[#708FFF]/40 text-[#9FB4FF] font-semibold">
            {project.featured
              ? "Proyek Unggulan"
              : project.tier === "utama"
                ? "Proyek Utama"
                : "Riset & Pendukung"}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#181D2B] border border-white/10 text-[#D1D5DB]">
            {project.category}
          </span>
          <span className="text-[#A1A8B8] ml-1">{project.year}</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06]">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-[#D1D5DB] max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.repositoryVisibility !== "private" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2F54EB] hover:bg-[#2342C8] text-white text-xs font-mono font-semibold transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repositori GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F3F4F6] text-[#0B0D12] hover:bg-white text-xs font-mono font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka Demo Langsung</span>
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-[#121620] border border-white/10 font-mono text-xs text-[#D1D5DB]"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>
    </>
  );
}
