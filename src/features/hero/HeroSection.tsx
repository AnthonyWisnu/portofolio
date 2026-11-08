import { ArrowUpRight } from "lucide-react";
import { OWNER_PROFILE } from "@/data/owner";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroBackdrop } from "@/features/hero/HeroBackdrop";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] bg-[#0B0D12] text-[#F3F4F6] pt-24 sm:pt-28 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-clip flex flex-col justify-center"
    >
      <HeroBackdrop />

      {/* Konten Utama Terpusat */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center space-y-6 relative z-10 py-8">
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

        {/* Tombol Aksi Utama */}
        <div className="hero-enter flex flex-wrap items-center justify-center gap-3 pt-2">
          <MagneticButton
            href="#projects-showcase"
            cursorLabel="Lihat"
            className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#2F54EB] hover:bg-[#2342C8] text-white font-semibold shadow-lg shadow-[#2F54EB]/25"
          >
            <span>Lihat Proyek</span>
            <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href="#about"
            className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider border border-white/15 hover:border-[#708FFF]/60 bg-[#121620]/85 hover:bg-[#181D2B] text-[#F3F4F6]"
          >
            <span>Tentang Saya</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
