"use client";

import Image from "next/image";
import { CheckCircle2, GitBranch, Layers, Server, GraduationCap } from "lucide-react";
import { OWNER_INFO } from "@/data/projects";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-x-clip"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-red-600 dark:text-red-500 font-semibold">
            01 / Narrative
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mt-2">
            Engineering with Intent.
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono break-words leading-relaxed">
          Focusing on concrete software architecture: structured pipelines, data provenance, and performant user interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Visual Card with Authentic Portrait Reference */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="relative group rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-3 shadow-lg">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="/Foto.png"
                alt="Anthony Wisnu Jati"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-mono uppercase text-red-400 font-semibold tracking-wider">
                  Reference Portrait
                </div>
                <div className="text-base font-semibold">Anthony Wisnu Jati</div>
                <div className="text-xs text-neutral-300 font-mono">IT &bull; Universitas Udayana</div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
            <p>
              I am an Information Technology student at Universitas Udayana who approaches software engineering from the ground up: understanding system constraints, constructing reliable backend logic, and designing crisp, purposeful frontend interfaces.
            </p>
            <p>
              Rather than assembling surface-level templates, I focus on solving real technical bottlenecks: building resilient multi-tenant bot architectures with strict interceptor chains, implementing hybrid GraphRAG retrieval systems combining knowledge graphs and vector databases, and engineering public utility platforms that serve real village administrations.
            </p>
          </div>

          {/* Concrete Focus Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/50 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Server className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Systems & Automation
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Building multi-tenant daemons, interceptor pipelines, role-based security guards, and automated CI/CD deployment pipelines on Linux VPS.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/50 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                  GraphRAG & Retrieval
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Structuring complex domain data into Neo4j Knowledge Graphs and ChromaDB vector stores with rigorous RAGAS evaluation rubrics.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/50 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-5 h-5 text-cyan-500" />
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Fullstack Web Applications
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Developing end-to-end applications with React, Next.js, and Supabase featuring PostgreSQL RLS, storage buckets, and dynamic PDF generation.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/50 hover:border-amber-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Rigorous Verification
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Emphasizing automated testing, type safety in TypeScript, and performance optimization across all deliverables.
              </p>
            </div>
          </div>

          {/* Academic Background */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
              <GraduationCap className="w-4 h-4 text-red-600" />
              <span>Academic Trajectory</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OWNER_INFO.education?.map((edu) => (
                <div
                  key={edu.institution}
                  className={`p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-xs space-y-2 ${edu.accentBorder} transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${edu.badgeClass}`}>
                      {edu.badge}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">{edu.period}</span>
                  </div>
                  <h4 className="text-base font-semibold text-neutral-950 dark:text-white">
                    {edu.institution}
                  </h4>
                  <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
                    {edu.degree}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light pt-1">
                    {edu.highlights}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
