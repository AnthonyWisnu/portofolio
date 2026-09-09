"use client";

import { HeroCanvas } from "@/components/3d/HeroCanvas";
import { OWNER_INFO } from "@/data/projects";
import { ArrowDown, Terminal, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
        {/* Left Column: Editorial Typography & Human Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-xs font-mono w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-700 dark:text-neutral-300">
              Available for Software Engineering & Projects
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
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 group hover:border-emerald-500/50 transition-colors">
              <Terminal className="w-4 h-4 text-emerald-500 mb-1.5" />
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Automation</div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Multi-Tenant</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 group hover:border-purple-500/50 transition-colors">
              <Cpu className="w-4 h-4 text-purple-500 mb-1.5" />
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Retrieval</div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">GraphRAG</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 group hover:border-amber-500/50 transition-colors">
              <ShieldCheck className="w-4 h-4 text-amber-500 mb-1.5" />
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Testing</div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">314 Tests Pass</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#projects"
              className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/20 transition-all hover:translate-y-[-1px]"
            >
              Explore Featured Work
            </Link>
            <Link
              href="#about"
              className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              Read Narrative
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Interactive Canvas */}
        <div className="lg:col-span-5 h-[420px] sm:h-[500px] lg:h-[560px] w-full">
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
