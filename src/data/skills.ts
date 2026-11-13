import type { SkillCategory } from "@/types/portfolio";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    name: "Bahasa Pemrograman",
    summary:
      "Bahasa utama yang digunakan sehari-hari pada layanan backend, frontend web, dan skrip data science.",
    skills: ["TypeScript", "JavaScript (ES2023+)", "Python 3", "SQL (PostgreSQL)", "HTML5 & CSS3"],
    verifiedIn: ["Sora Wellness", "Kemitraan Mebel", "MinjiBot V2", "Bali Smart Pricing"],
  },
  {
    id: "frontend",
    name: "Frontend & Visual",
    summary:
      "Membangun antarmuka editorial responsif, grafis vektor SVG presisi, serta animasi interaksi berbasis scroll.",
    skills: [
      "Next.js (App Router)",
      "React 18 & 19",
      "Tailwind CSS v4",
      "SVG & UI Interaktif",
      "Lenis Smooth Scroll",
      "Framer Motion",
      "Vite",
      "Recharts & Plotly",
    ],
    verifiedIn: [
      "Portofolio",
      "Kemitraan Mebel",
      "Sora Wellness",
      "PT Hotdog Water Sport",
      "VOID Downloader",
    ],
  },
  {
    id: "backend",
    name: "Backend & Database",
    summary:
      "Layanan API modular, kontrol transaksi atomik, isolasi multi-tenant, serta skema relasional ketat.",
    skills: [
      "NestJS",
      "Node.js & Express",
      "PostgreSQL",
      "Prisma ORM",
      "Drizzle ORM",
      "Zod Validation",
      "Midtrans Snap Webhook",
    ],
    verifiedIn: [
      "Sora Wellness",
      "Kemitraan Mebel",
      "PT Hotdog Water Sport",
      "MinjiBot V2",
      "PINFAS",
    ],
  },
  {
    id: "ai-data",
    name: "Data & Machine Learning",
    summary: "Rekayasa fitur geospasial, perbandingan model, dan penjelasan hasil prediksi.",
    skills: ["CatBoost & XGBoost", "Random Forest", "SHAP TreeExplainer", "Pandas & Scikit-Learn"],
    verifiedIn: ["Bali Smart Pricing"],
  },
  {
    id: "devops-security",
    name: "DevOps & Keamanan",
    summary:
      "Menjalankan aplikasi di VPS Linux secara stabil dengan otomatisasi pengujian, kontainerisasi, dan proteksi sesi.",
    skills: [
      "Docker & Compose",
      "GitHub Actions CI/CD",
      "Nginx Reverse Proxy",
      "PM2 Process Manager",
      "Ubuntu Linux VPS",
      "Vitest & Playwright E2E",
      "Argon2id & JOSE JWT",
      "SSRF Safe Socket Guard",
    ],
    verifiedIn: [
      "Sora Wellness",
      "Kemitraan Mebel",
      "PT Hotdog Water Sport",
      "VOID Downloader",
      "MinjiBot V2",
    ],
  },
  {
    id: "media-automation",
    name: "Media & Otomasi",
    summary:
      "Pemrosesan berkas media berkapasitas besar, konversi codec universal, dan mesin otomasi percakapan.",
    skills: [
      "FFmpeg & FFprobe",
      "yt-dlp & gallery-dl",
      "Sharp Image Pipeline",
      "PDFKit & ExcelJS",
      "Baileys WhatsApp Engine",
      "Multer Stream Upload",
    ],
    verifiedIn: ["VOID Downloader", "MinjiBot V2", "Kemitraan Mebel", "PT Hotdog Water Sport"],
  },
];
