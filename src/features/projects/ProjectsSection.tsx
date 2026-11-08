"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { CURATED_PROJECTS } from "@/data/projects";
import type { Project } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { PortalModal } from "@/components/ui/PortalModal";
import { ProjectCard } from "@/features/projects/ProjectCard";
import {
  ProjectFilterControls,
  type FilterTier,
} from "@/features/projects/ProjectFilterControls";
import { cn } from "@/utils/cn";

export function ProjectsSection() {
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const [filter, setFilter] = useState<FilterTier>("all");
  const [modalState, setModalState] = useState<{ project: Project; index: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [maxTravel, setMaxTravel] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return CURATED_PROJECTS;
    return CURATED_PROJECTS.filter((item) => item.tier === filter);
  }, [filter]);

  const handleSelectFilter = useCallback(
    (nextFilter: FilterTier) => {
      setFilter(nextFilter);
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > sectionTop + 24) {
          scrollTo(sectionTop, { offset: 0, duration: 0.45 });
        }
      }
      if (viewportRef.current) {
        viewportRef.current.scrollTo({ left: 0, behavior: "auto" });
      }
    },
    [scrollTo]
  );

  // Dengarkan event lompat kategori dari TechFolderDeck di section About
  useEffect(() => {
    const handleFolderFilter = (e: Event) => {
      const custom = e as CustomEvent<{ tier?: FilterTier }>;
      if (custom.detail?.tier) setFilter(custom.detail.tier);
    };
    window.addEventListener("portfolio:select-tier", handleFolderFilter);
    return () => window.removeEventListener("portfolio:select-tier", handleFolderFilter);
  }, []);

  // Pantau lebar track agar jarak scroll horizontal selalu tepat di semua ukuran layar
  useEffect(() => {
    const measure = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (trackRef.current && viewportRef.current) {
        const travel = Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth + 48);
        setMaxTravel(travel);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [filteredProjects]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.35,
  });

  const xTransform = useTransform(smoothProgress, [0, 1], [0, -maxTravel]);

  const scrollStep = (direction: -1 | 1) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const stepSize = Math.max(380, window.innerWidth * 0.45);
    const maxBottom = sectionTop + sectionRef.current.offsetHeight - window.innerHeight;
    const targetY = Math.min(maxBottom, Math.max(sectionTop, window.scrollY + direction * stepSize));
    scrollTo(targetY, { duration: 0.75 });
  };

  const useStickyHorizontal = isDesktop && !reducedMotion && maxTravel > 40;

  return (
    <section
      id="projects-showcase"
      ref={sectionRef}
      style={useStickyHorizontal ? { height: `calc(100vh + ${Math.round(maxTravel * 1.05)}px)` } : undefined}
      className="relative bg-[#0F131C] text-[#F3F4F6] border-t border-white/10"
    >
      <div
        className={cn(
          "w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center",
          useStickyHorizontal && "sticky top-0 h-screen overflow-hidden"
        )}
      >
        <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">
          <ProjectFilterControls
            activeFilter={filter}
            onSelectFilter={handleSelectFilter}
            showStepControls={useStickyHorizontal}
            onStep={scrollStep}
          />

          <div
            ref={viewportRef}
            className={cn(
              "w-full",
              useStickyHorizontal ? "overflow-hidden py-2" : "overflow-x-auto pb-4 custom-scrollbar"
            )}
          >
            <m.div
              ref={trackRef}
              style={useStickyHorizontal ? { x: xTransform } : undefined}
              className="flex w-max gap-5 sm:gap-7 will-change-transform"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onOpenModal={(proj, index = 0) => setModalState({ project: proj, index })}
                />
              ))}
            </m.div>
          </div>
        </div>
      </div>

      {modalState && (
        <PortalModal
          title={modalState.project.title}
          screenshots={modalState.project.screenshots}
          initialIndex={modalState.index}
          onClose={() => setModalState(null)}
        />
      )}
    </section>
  );
}
