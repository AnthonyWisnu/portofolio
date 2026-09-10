import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { WaveDivider } from "@/components/ui/WaveDivider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-clip">
      {/* Unified subtle ambient background lighting mesh */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 bg-red-600/[0.04] dark:bg-red-600/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 -right-48 w-96 h-96 bg-purple-600/[0.04] dark:bg-purple-600/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 -left-48 w-96 h-96 bg-emerald-600/[0.03] dark:bg-emerald-600/[0.05] rounded-full blur-3xl pointer-events-none" />

      <HeroSection />
      <WaveDivider variant="red-emerald" label="01 // NARRATIVE DECK" />
      <AboutSection />
      <WaveDivider variant="emerald-purple" label="02 // CAPABILITIES MATRIX" />
      <SkillsSection />
      <WaveDivider variant="purple-amber" label="03 // PRODUCTION WORK" />
      <ProjectsSection />
      <WaveDivider variant="amber-red" label="04 // DIRECT CHANNEL" />
      <ContactSection />
    </div>
  );
}
