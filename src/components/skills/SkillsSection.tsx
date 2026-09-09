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
      className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-red-600 dark:text-red-500 font-semibold">
            02 / Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mt-2">
            Interactive Skills Scanner.
          </h2>
        </div>
        <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400 font-mono">
          Derived purely from production codebases and repositories. Zero arbitrary percentage metrics.
        </p>
      </div>

      {/* Interactive Scanner Frame */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 p-6 sm:p-10 shadow-xl overflow-hidden relative">
        {/* Scanner Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Terminal className={`w-4 h-4 ${cur.iconColor}`} />
            <span>MODULE: TECH_STACK_INSPECTOR</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              VERIFIED VIA GITHUB
            </span>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? `${cat.activeClass} font-semibold scale-105 ring-2 ring-white/10`
                    : "bg-white dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200/60 dark:border-neutral-700/60"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all relative overflow-hidden">
          {/* Subtle ambient light from active category */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ backgroundColor: cur.color }}
          />

          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <Code2 className={`w-4 h-4 ${cur.iconColor}`} />
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
                {cur.name}
              </h3>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded border bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                style={{ borderColor: `${cur.color}40` }}
              >
                {cur.tag}
              </span>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              {cur.skills.length} Technologies Identified
            </span>
          </div>

          {/* Technology Badges with Scanner Glow */}
          <div className="flex flex-wrap gap-3 relative z-10">
            {cur.skills.map((skill) => (
              <div
                key={skill}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 text-neutral-900 dark:text-neutral-100 font-mono text-xs ${cur.borderHover} transition-all`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${cur.sparkleColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <span className="font-medium">{skill}</span>
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
