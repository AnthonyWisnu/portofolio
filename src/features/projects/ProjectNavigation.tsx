import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectNavigation({
  prevProject,
  nextProject,
}: {
  prevProject: Project;
  nextProject: Project;
}) {
  return (
    <nav
      aria-label="Navigasi Antar Proyek"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10"
    >
      <Link
        href={`/projects/${prevProject.slug}`}
        className="group p-5 rounded-2xl bg-[#121620] border border-white/10 hover:border-[#708FFF]/60 transition-colors flex items-center justify-between gap-4"
      >
        <div className="space-y-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#A1A8B8]">
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
        className="group p-5 rounded-2xl bg-[#121620] border border-white/10 hover:border-[#708FFF]/60 transition-colors flex items-center justify-between gap-4 sm:text-right"
      >
        <div className="space-y-1 min-w-0 ml-auto">
          <div className="inline-flex items-center justify-end gap-1.5 text-[11px] font-mono text-[#A1A8B8]">
            <span>Proyek Berikutnya</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="font-display text-base font-bold text-white truncate">
            {nextProject.shortTitle}
          </div>
        </div>
      </Link>
    </nav>
  );
}
