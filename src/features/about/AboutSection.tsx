import { OWNER_PROFILE } from "@/data/owner";
import { TopographyBackdrop } from "@/features/about/TopographyBackdrop";
import { AboutIntroHero } from "@/features/about/AboutIntroHero";
import { EducationTimeline } from "@/features/about/EducationTimeline";
import { FocusPillarsPanel } from "@/features/about/FocusPillarsPanel";
import { TechFolderDeck } from "@/features/about/TechFolderDeck";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0B0D12] text-[#F3F4F6] overflow-x-clip border-t border-white/10"
    >
      <TopographyBackdrop />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <AboutIntroHero />

        {/* Dua Kolom Seimbang: Rekam Pendidikan & Fokus Rekayasa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 pt-4 border-t border-white/10">
          <EducationTimeline entries={OWNER_PROFILE.education} />
          <FocusPillarsPanel items={OWNER_PROFILE.focusAreas} />
        </div>

        {/* Folder Shortcut Interaktif 2D dengan Pratinjau Proyek Nyata */}
        <div className="pt-2 border-t border-white/10">
          <TechFolderDeck />
        </div>
      </div>
    </section>
  );
}
