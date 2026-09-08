"use client";

import { useState } from "react";
import { PRIMARY_PROJECTS, ARCHIVED_PROJECTS } from "@/data/projects";
import { ExternalLink, ArrowRight, ShieldCheck, ChevronRight, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function ProjectsSection() {
  const [selectedId, setSelectedId] = useState(PRIMARY_PROJECTS[0].id);
  const activeProject = PRIMARY_PROJECTS.find((p) => p.id === selectedId) || PRIMARY_PROJECTS[0];

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-red-600 dark:text-red-500 font-semibold">
            03 / Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mt-2">
            Featured Systems & Products.
          </h2>
        </div>
        <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400 font-mono">
          5 Core production & public systems engineered with structured architecture, automated testing, and live deployments.
        </p>
      </div>

      {/* Main Interactive Presentation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-2">
            Core Repositories ({PRIMARY_PROJECTS.length})
          </div>

          {PRIMARY_PROJECTS.map((project, idx) => {
            const isSelected = project.id === selectedId;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? "bg-white dark:bg-neutral-900 border-red-500/60 shadow-lg shadow-red-500/5 ring-1 ring-red-500/20"
                    : "bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200/70 dark:border-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-neutral-400">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {project.category}
                    </span>
                  </div>
                  <div className="text-base font-semibold text-neutral-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {project.title}
                  </div>
                  <div className="text-xs text-neutral-500 line-clamp-1 font-light">
                    {project.tagline}
                  </div>
                </div>

                <ChevronRight
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isSelected
                      ? "text-red-600 translate-x-1"
                      : "text-neutral-400 group-hover:translate-x-0.5"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Storytelling Detail Card */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Top Tag & Metric */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800/80">
              <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/50 font-semibold">
                {activeProject.category}
              </span>

              {activeProject.statsValue && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                  <span>
                    {activeProject.statsLabel}: <strong className="font-semibold text-neutral-950 dark:text-white">{activeProject.statsValue}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Project Header */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                What I Built
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
                {activeProject.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-light">
                {activeProject.tagline}
              </p>
            </div>

            {/* Problem & Solution Narrative */}
            <div className="space-y-4 font-normal text-sm sm:text-base leading-relaxed">
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60 space-y-1.5">
                <div className="font-mono text-xs uppercase text-neutral-400 font-semibold">
                  The Problem
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  {activeProject.problem}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60 space-y-1.5">
                <div className="font-mono text-xs uppercase text-red-600 dark:text-red-400 font-semibold">
                  Engineered Solution
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  {activeProject.solution}
                </p>
              </div>
            </div>

            {/* Key Architectural Highlights */}
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase text-neutral-400 font-semibold">
                Architecture & Rigor
              </div>
              <ul className="space-y-2">
                {activeProject.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                    <ArrowRight className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-xs uppercase text-neutral-400 font-semibold">
                Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono hover:opacity-90 transition-opacity font-medium"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </a>

              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono transition-colors text-neutral-900 dark:text-neutral-100"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Supporting & Academic Archives Grid */}
      <div className="mt-20 pt-12 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-red-600" />
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
              Specialized Systems & Extended Repositories
            </h3>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            {ARCHIVED_PROJECTS.length} Repositories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCHIVED_PROJECTS.map((archive) => (
            <div
              key={archive.id}
              className="p-5 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/40 flex flex-col justify-between space-y-4 hover:border-red-500/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{archive.category}</span>
                  <a
                    href={archive.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors"
                    aria-label={`View ${archive.title} GitHub repository`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
                <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                  {archive.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  {archive.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {archive.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
