import { CheckCircle2, Layers } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Rincian implementasi">
      <div className="rounded-xl bg-[#121620] border border-white/10 p-6 space-y-5">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <Layers className="w-4 h-4 text-[#708FFF]" />
          Susunan sistem
        </h2>
        <ol className="space-y-4">
          {project.architecture.map((node) => (
            <li key={node.layer} className="space-y-1">
              <h3 className="font-medium text-sm text-[#F3F4F6]">{node.layer}</h3>
              <p className="text-sm leading-relaxed text-[#A1A8B8]">{node.detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-xl bg-[#121620] border border-white/10 p-6 space-y-5">
        <h2 className="font-display text-lg font-semibold text-white">Bagian penting</h2>
        <ul className="space-y-4">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-relaxed text-[#D1D5DB]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#708FFF] shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-white/10 pt-4 text-xs leading-relaxed text-[#A1A8B8]">
          {project.verificationNote}
        </p>
      </div>
    </section>
  );
}
