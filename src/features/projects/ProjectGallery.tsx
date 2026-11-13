"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectGalleryProps {
  project: Project;
  onOpenLightbox: (index: number) => void;
}

export function ProjectGallery({ project, onOpenLightbox }: ProjectGalleryProps) {
  if (!project.screenshots.length) return null;
  const diagramsOnly = project.screenshots.every((image) => image.kind === "diagram");
  const illustrationsOnly = project.screenshots.every((image) => image.kind === "illustration");
  return (
    <section aria-label={`Galeri ${project.shortTitle}`} className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
          {illustrationsOnly
            ? "Ilustrasi penggunaan"
            : diagramsOnly
              ? "Arsitektur dan alur kerja"
              : "Tampilan aplikasi"}
        </h2>
        <span className="text-xs text-[#A1A8B8]">Pilih gambar untuk memperbesar</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.screenshots.map((image, index) => (
          <figure key={image.src} className={index === 0 ? "md:col-span-2 space-y-3" : "space-y-3"}>
            <button
              type="button"
              onClick={() => onOpenLightbox(index)}
              aria-label={`Perbesar: ${image.alt}`}
              aria-describedby={`${project.slug}-image-${index}`}
              data-cursor-label="Lihat"
              className="group relative block w-full overflow-hidden rounded-xl border border-white/12 bg-[#121620] cursor-zoom-in"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  index === 0
                    ? "(max-width: 1200px) 100vw, 1152px"
                    : "(max-width: 768px) 100vw, 560px"
                }
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full h-auto object-contain"
              />
              <span
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B0D12]/90 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                <Expand className="h-4 w-4" />
              </span>
              {image.kind === "diagram" && (
                <span className="absolute left-4 top-4 rounded-md bg-[#0B0D12]/90 px-3 py-1.5 text-xs text-[#C8D4F8]">
                  Diagram penjelasan
                </span>
              )}
            </button>
            <figcaption
              id={`${project.slug}-image-${index}`}
              className="text-sm leading-relaxed text-[#A1A8B8]"
            >
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
