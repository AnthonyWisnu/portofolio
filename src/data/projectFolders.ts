import { Cpu, FolderKanban, Layers } from "lucide-react";
import { CURATED_PROJECTS } from "@/data/projects";
import type { QuickFolder } from "@/types/projectFolder";

export const PROJECT_FOLDERS: QuickFolder[] = [
  {
    id: "utama",
    label: "Proyek Utama",
    countLabel: `${String(CURATED_PROJECTS.filter((project) => project.tier === "utama").length).padStart(2, "0")} Sistem`,
    subtitle: "Aplikasi produksi dan arsitektur inti",
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
    label: "Riset & AI",
    countLabel: `${String(CURATED_PROJECTS.filter((project) => project.tier === "pendukung").length).padStart(2, "0")} Sistem`,
    subtitle: "Machine learning dan otomasi",
    sheets: [
      { title: "Penjelasan SHAP", image: "/projects/bali-smart-pricing/shap.webp" },
      { title: "Bali Smart Pricing", image: "/projects/bali-smart-pricing/calculator.webp" },
      { title: "MinjiBot", image: "/projects/minjibot/message-flow.webp" },
    ],
    targetHash: "#projects-showcase",
    filterKey: "pendukung",
    icon: Cpu,
  },
  {
    id: "skills",
    label: "Keahlian Teknis",
    countLabel: "06 Modul",
    subtitle: "Bahasa, framework, dan infrastruktur",
    sheets: [
      { title: "Next.js & React 19" },
      { title: "NestJS & PostgreSQL" },
      { title: "Docker & CI/CD" },
    ],
    targetHash: "#skills",
    icon: Layers,
  },
];
