import { Cpu, FolderKanban, Layers } from "lucide-react";
import { CURATED_PROJECTS } from "@/data/projects";
import { SKILL_CATEGORIES } from "@/data/skills";
import type { QuickFolder } from "@/types/projectFolder";

export const PROJECT_FOLDERS: QuickFolder[] = [
  {
    id: "utama",
    label: "Aplikasi Web",
    countLabel: `${String(CURATED_PROJECTS.filter((project) => project.tier === "utama").length).padStart(2, "0")} Proyek`,
    subtitle: "Sistem bisnis dan layanan berbasis web",
    sheets: [
      ...["sora-wellness", "kemitraan-mebel", "hotdog-watersport"].map((slug) => {
        const project = CURATED_PROJECTS.find((item) => item.slug === slug)!;
        return { title: project.shortTitle, image: project.coverImage };
      }),
    ],
    targetHash: "#projects-showcase",
    filterKey: "utama",
    icon: FolderKanban,
  },
  {
    id: "pendukung",
    label: "Data & Bot",
    countLabel: `${String(CURATED_PROJECTS.filter((project) => project.tier === "pendukung").length).padStart(2, "0")} Proyek`,
    subtitle: "Prediksi tarif dan bot WhatsApp",
    sheets: [
      { title: "Bali Smart Pricing", image: "/projects/bali-smart-pricing/calculator.webp" },
      { title: "MinjiBot", image: "/projects/minjibot/whatsapp-group-menu.webp" },
    ],
    targetHash: "#projects-showcase",
    filterKey: "pendukung",
    icon: Cpu,
  },
  {
    id: "skills",
    label: "Keahlian Teknis",
    countLabel: `${String(SKILL_CATEGORIES.length).padStart(2, "0")} Kategori`,
    subtitle: "Bahasa, framework, dan infrastruktur",
    sheets: [
      { title: "Next.js & React 19" },
      { title: "NestJS & PostgreSQL" },
      { title: "Python & CatBoost" },
    ],
    targetHash: "#skills",
    icon: Layers,
  },
];
