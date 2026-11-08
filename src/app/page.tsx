import { HeroSection } from "@/features/hero/HeroSection";
import { AboutSection } from "@/features/about/AboutSection";
import { SkillsSection } from "@/features/skills/SkillsSection";
import { TypographyPortal } from "@/features/projects/TypographyPortal";
import { ProjectsSection } from "@/features/projects/ProjectsSection";
import { ContactSection } from "@/features/contact/ContactSection";
import { Footer } from "@/features/contact/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-clip bg-[#0B0D12]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TypographyPortal />
      <ProjectsSection />
      <ContactSection />
      <Footer variant="dark" />
    </div>
  );
}
