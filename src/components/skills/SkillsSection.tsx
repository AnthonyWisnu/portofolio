"use client";

import { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/projects";
import { Sparkles, Terminal, Code2, ShieldAlert } from "lucide-react";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const cur = SKILL_CATEGORIES[activeCategory];

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-x-clip"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-red-600 dark:text-red-500 font-semibold">
            02 / Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mt-2">
            Interactive Skills Scanner.
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono break-words leading-relaxed">
          Derived purely from production codebases and repositories. Zero arbitrary percentage metrics.
        </p>
      </div>

      {/* Interactive Scanner Frame */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 p-4 sm:p-6 lg:p-10 shadow-xl overflow-hidden relative max-w-full">
        {/* Scanner Top Bar */}
        <div className="flex items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-neutral-200 dark:border-neutral-800 font-mono text-[11px] sm:text-xs text-neutral-500">
          <div className="flex items-center gap-2 min-w-0">
            <Terminal className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${cur.iconColor} shrink-0`} />
            <span className="truncate font-semibold">MODULE: TECH_STACK_INSPECTOR</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="hidden sm:inline">VERIFIED VIA GITHUB</span>
            <span className="sm:hidden">VERIFIED</span>
          </div>
        </div>

        {/* Category Selector Tabs: Clean Balanced Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-4 sm:pt-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(idx)}
                className={`w-full px-2.5 sm:px-3 py-2.5 rounded-xl text-[11px] sm:text-xs font-mono text-center flex items-center justify-center transition-all ${
                  isActive
                    ? `${cat.activeClass} font-semibold shadow-md ring-1 ring-white/20`
                    : "bg-white/80 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 border border-neutral-200/60 dark:border-neutral-700/60"
                }`}
              >
                <span className="truncate">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all relative overflow-hidden">
          {/* Subtle ambient light from active category */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ backgroundColor: cur.color }}
          />

          {/* Active Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800/70 relative z-10">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center border shrink-0"
                style={{
                  backgroundColor: `${cur.color}15`,
                  borderColor: `${cur.color}35`,
                }}
              >
                <Code2 className={`w-4 h-4 ${cur.iconColor}`} />
              </div>
              <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-neutral-900 dark:text-white truncate">
                {cur.name}
              </h3>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded border bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shrink-0"
                style={{ borderColor: `${cur.color}40` }}
              >
                {cur.tag}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-neutral-400 shrink-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cur.color }}
              />
              <span>{cur.skills.length} Stack Technologies Verified</span>
            </div>
          </div>

          {/* Engineered Technology Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 relative z-10">
            {cur.skills.map((skill, index) => (
              <div
                key={skill}
                className={`group relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/70 text-neutral-900 dark:text-neutral-100 font-mono text-xs ${cur.borderHover} transition-all hover:translate-y-[-1px] shadow-xs`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${cur.color}12`,
                      borderColor: `${cur.color}30`,
                    }}
                  >
                    <Sparkles className={`w-3 h-3 ${cur.sparkleColor} opacity-75 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <span
                    className="font-medium truncate text-xs text-neutral-800 dark:text-neutral-200"
                    title={skill}
                  >
                    {skill}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors shrink-0">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-Slop Transparency Note */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 text-xs font-mono">
          <ShieldAlert className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <span>
            Strict compliance note: Skill proficiencies are not represented as arbitrary percentages. All listed tools correspond to actual working code in the owner's public and tested repositories.
          </span>
        </div>
      </div>
    </section>
  );
}
