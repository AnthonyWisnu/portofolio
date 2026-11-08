import { ArrowDown, ArrowUpRight, Cpu, Layers, Terminal } from "lucide-react";
import { OWNER_PROFILE } from "@/data/owner";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroBackdrop } from "@/features/hero/HeroBackdrop";

const PILLARS = [
  { icon: Layers, label: "Fullstack", title: "Next.js & NestJS" },
  { icon: Terminal, label: "Otomasi", title: "Multi-Tenant Engine" },
  { icon: Cpu, label: "Kecerdasan Data", title: "GraphRAG & ML" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] bg-[#0B0D12] text-[#F3F4F6] pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-clip flex flex-col justify-between"
    >
      <HeroBackdrop />

      {/* Konten Utama Terpusat Bersih Gaya Editorial Atmosferik */}
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center space-y-7 relative z-10 py-8">
        <div className="hero-enter inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/12 bg-[#121620]/90 text-xs font-mono max-w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[#D1D5DB] truncate">{OWNER_PROFILE.availabilityText}</span>
        </div>

        <div className="space-y-4">
          <div className="hero-enter font-mono text-xs sm:text-sm uppercase tracking-[0.26em] text-[#708FFF] font-semibold">
            {OWNER_PROFILE.role}
          </div>

          <h1 className="hero-enter font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-tight leading-[1.01] text-white">
            ANTHONY WISNU <span className="text-[#A1A8B8]">JATI</span>
          </h1>

          <p className="hero-enter text-sm sm:text-base lg:text-lg text-[#A1A8B8] max-w-2xl mx-auto leading-relaxed">
            {OWNER_PROFILE.shortBio}
          </p>
        </div>

        {/* 3 Pilar Rekayasa Ringkas */}
        <div className="hero-enter flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121620]/90 border border-white/10 hover:border-[#708FFF]/45 transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-[#708FFF] shrink-0" />
                <span className="font-mono text-[11px] text-[#A1A8B8]">{item.label}:</span>
                <span className="text-xs font-semibold text-[#F3F4F6]">{item.title}</span>
              </div>
            );
          })}
        </div>

        {/* Tombol Aksi Utama */}
        <div className="hero-enter flex flex-wrap items-center justify-center gap-3 pt-1">
          <MagneticButton
            href="#projects-showcase"
            cursorLabel="Lihat"
            className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#2F54EB] hover:bg-[#2342C8] text-white font-semibold shadow-lg shadow-[#2F54EB]/25"
          >
            <span>Jelajahi Karya Terkurasi</span>
            <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href="#about"
            className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider border border-white/15 hover:border-[#708FFF]/60 bg-[#121620]/85 hover:bg-[#181D2B] text-[#F3F4F6]"
          >
            <span>Kenali Profil Saya</span>
          </MagneticButton>
        </div>
      </div>

      {/* Penanda Gulir Bawah */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A1A8B8] relative z-10">
        <span>00 // PENGANTAR</span>
        <a
          href="#about"
          className="inline-flex items-center gap-1.5 text-[#F3F4F6] hover:text-[#708FFF] transition-colors"
        >
          <span>Gulir ke bawah</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
