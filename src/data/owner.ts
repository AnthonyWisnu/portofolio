import type { NavItem } from "@/types/portfolio";
import type { OwnerProfile } from "@/types/owner";

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Beranda", shortLabel: "Beranda", href: "#hero" },
  { id: "about", label: "Tentang", shortLabel: "Tentang", href: "#about" },
  { id: "skills", label: "Keahlian", shortLabel: "Keahlian", href: "#skills" },
  { id: "projects", label: "Proyek", shortLabel: "Proyek", href: "#projects" },
  { id: "contact", label: "Kontak", shortLabel: "Kontak", href: "#contact" },
];

export const OWNER_PROFILE: OwnerProfile = {
  name: "Anthony Wisnu Jati",
  shortName: "Anthony Wisnu",
  monogram: "AW",
  role: "Fullstack & Systems Engineer",
  headlineIntro: "Membangun aplikasi web fullstack, otomasi sistem, dan eksplorasi data.",
  institution: "Universitas Udayana",
  location: "",
  origin: "",
  domain: "anthonywj.my.id",
  domainUrl: "https://anthonywj.my.id",
  email: "jatianthony@gmail.com",
  shortBio:
    "Mahasiswa Teknologi Informasi Universitas Udayana yang membangun aplikasi web fullstack, layanan otomasi, dan sistem berbasis data.",
  extendedBio: [
    "Saya mahasiswa Teknologi Informasi Universitas Udayana. Proyek saya mencakup sistem kemitraan mebel, reservasi studio, peminjaman fasilitas, dan katalog wisata. Saya juga membuat bot WhatsApp, pengolah media, serta model prediksi tarif penginapan.",
  ],
  focusAreas: [
    {
      id: "fullstack-architecture",
      title: "Pengembangan Web Fullstack",
      subtitle: "Next.js, NestJS, PostgreSQL",
      badge: "Sistem Bisnis",
    },
    {
      id: "systems-automation",
      title: "Otomasi & Pipeline Media",
      subtitle: "Node.js, TypeScript, FFmpeg",
      badge: "Bot & Ekstraksi Media",
    },
    {
      id: "data-machine-learning",
      title: "Data & Machine Learning",
      subtitle: "Python, CatBoost, Streamlit, SHAP",
      badge: "Prediksi Tarif Penginapan",
    },
  ],
  education: [
    {
      id: "unud",
      institution: "Universitas Udayana",
      degree: "S1 Teknologi Informasi",
      faculty: "Fakultas Teknik",
      period: "2023 - Sekarang",
      badge: "Sarjana",
      logo: "/images/logo-unud.webp",
    },
    {
      id: "smaga-klaten",
      institution: "SMAN 3 Klaten",
      degree: "Matematika dan Ilmu Pengetahuan Alam",
      faculty: "SMA Negeri",
      period: "Alumni",
      badge: "MIPA",
    },
  ],
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "AnthonyWisnu",
      url: "https://github.com/AnthonyWisnu",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@anthony.w.j",
      url: "https://www.instagram.com/anthony.w.j/",
    },
    {
      id: "threads",
      label: "Threads",
      handle: "@anthony.w.j",
      url: "https://www.threads.net/@anthony.w.j",
    },
    {
      id: "facebook",
      label: "Facebook",
      handle: "Anthony Wisnu",
      url: "https://www.facebook.com/anthony.275983/?locale=id_ID",
    },
  ],
};
