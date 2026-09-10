"use client";

import { HeroCanvas } from "@/components/3d/HeroCanvas";
import { OWNER_INFO } from "@/data/projects";
import { ArrowDown, Terminal, Layers, Cpu } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-6 sm:pb-12 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between overflow-x-clip"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
        {/* Left Column: Editorial Typography & Human Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 max-w-full min-w-0">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-xs font-mono max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-neutral-700 dark:text-neutral-300 truncate">
              <span className="sm:hidden">Available for Projects</span>
              <span className="hidden sm:inline">Available for Software Engineering & Projects</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.05]">
              ANTHONY <br />
              <span className="text-neutral-500 dark:text-neutral-400">WISNU JATI</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl font-normal leading-relaxed">
              Fullstack & Systems Engineer crafting resilient, scalable software architectures. Experienced in engineering distributed multi-tenant daemons, GraphRAG hybrid retrieval systems, and production-ready modern web applications.
            </p>
          </div>

          {/* Key Engineering Pillars */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 w-full max-w-full">
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 group hover:border-emerald-500/50 transition-colors min-w-0">
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mb-1.5" />
              <div className="text-[10px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">Automation</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">Multi-Tenant</div>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 group hover:border-purple-500/50 transition-colors min-w-0">
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 mb-1.5" />
              <div className="text-[10px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">Retrieval</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">GraphRAG</div>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 group hover:border-amber-500/50 transition-colors min-w-0">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mb-1.5" />
              <div className="text-[10px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">Fullstack</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">Production Web</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 w-full">
            <Link
              href="#projects"
              className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/20 transition-all hover:translate-y-[-1px] text-center justify-center"
            >
              Explore Featured Work
            </Link>
            <Link
              href="#about"
              className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 transition-colors text-center justify-center"
            >
              Read Narrative
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Interactive Canvas */}
        <div className="lg:col-span-5 h-[380px] sm:h-[480px] lg:h-[560px] w-full max-w-full overflow-hidden">
          <HeroCanvas />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="pt-8 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800/80 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600" />
          <span>SCROLL TO PROGRESS</span>
        </div>
        <Link
          href="#about"
          className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <span>PROCEED</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
