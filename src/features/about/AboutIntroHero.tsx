import Image from "next/image";
import { ArrowUpRight, Code2, Mail } from "lucide-react";
import { OWNER_PROFILE } from "@/data/owner";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealGroup } from "@/components/motion/RevealGroup";

export function AboutIntroHero() {
  return (
    <div className="relative space-y-6">
      <div className="text-center">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white/90">
          Tentang Saya
        </h2>
      </div>

      {/* Komposisi 3 Kolom Simetris: Nama Kiri, Potret Cutout Tengah, Narasi Singkat Kanan */}
      <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-4">
        {/* Kolom Kiri */}
        <div data-reveal className="lg:col-span-4 space-y-5 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-1.5">
            <div className="font-display text-2xl sm:text-3xl font-bold text-[#708FFF]">
              Halo, Saya
            </div>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.06] text-white">
              {OWNER_PROFILE.name}
            </h3>
          </div>

          <div className="pt-1 flex justify-center lg:justify-start">
            <MagneticButton
              href="#projects-showcase"
              cursorLabel="Karya"
              className="px-5 py-3 rounded-xl bg-[#2F54EB] hover:bg-[#2342C8] text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-lg shadow-[#2F54EB]/25"
            >
              <Code2 className="w-4 h-4" />
              <span>Lihat Proyek</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>

        {/* Kolom Tengah: Potret Transparan Menyatu ke Latar Obsidian */}
        <div data-reveal className="lg:col-span-4 flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[4/5] flex items-end justify-center group">
            <div
              aria-hidden="true"
              className="absolute inset-x-4 bottom-4 top-8 rounded-full opacity-65 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 44%, rgba(47, 84, 235, 0.25), rgba(11, 13, 18, 0) 70%)",
                maskImage: "linear-gradient(to bottom, black 55%, transparent 96%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 96%)",
              }}
            />

            <Image
              src="/images/anthony-cutout.webp"
              alt={`Potret resmi ${OWNER_PROFILE.name}`}
              width={435}
              height={737}
              sizes="(max-width: 768px) 290px, 340px"
              className="relative z-10 w-[86%] h-auto object-contain select-none transition-transform duration-500 ease-out group-hover:-translate-y-1"
            />
          </div>
        </div>

        {/* Kolom Kanan: Satu Paragraf Natural & Tombol Kontak */}
        <div data-reveal className="lg:col-span-4 space-y-5 text-center lg:text-left order-3">
          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            {OWNER_PROFILE.extendedBio[0]}
          </p>

          <div className="pt-1 flex justify-center lg:justify-start">
            <MagneticButton
              href="#contact"
              cursorLabel="Kontak"
              className="px-5 py-3 rounded-xl bg-[#2F54EB] hover:bg-[#2342C8] text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-lg shadow-[#2F54EB]/25"
            >
              <Mail className="w-4 h-4" />
              <span>Hubungi Saya</span>
            </MagneticButton>
          </div>
        </div>
      </RevealGroup>
    </div>
  );
}
