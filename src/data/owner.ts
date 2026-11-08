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
  monogram: "AWJ",
  role: "Fullstack & Systems Engineer",
  headlineIntro: "Membangun sistem perangkat lunak yang terstruktur, cepat, dan siap produksi.",
  institution: "Universitas Udayana",
  location: "Jimbaran, Bali",
  origin: "Klaten, Jawa Tengah",
  domain: "anthonywj.my.id",
  domainUrl: "https://anthonywj.my.id",
  email: "jatianthony@gmail.com",
  availabilityText: "Terbuka untuk kolaborasi rekayasa sistem dan pengembangan aplikasi web",
  shortBio:
    "Mahasiswa Teknologi Informasi Universitas Udayana yang merancang aplikasi web fullstack, mesin otomasi multi-tenant, dan sistem temu kembali data.",
  extendedBio: [
    "Saya menaruh perhatian besar pada arsitektur sistem dari hulu ke hilir: mulai dari perancangan skema database yang ketat, validasi API yang tahan galat, pipeline deployment di server Linux, hingga antarmuka pengguna yang ringan dan komunikatif.",
    "Setiap karya yang saya tampilkan lahir dari kebutuhan nyata: sistem kemitraan pabrik mebel dan eksportir berbasis presisi akuntansi desimal, platform reservasi studio kebugaran dengan gateway pembayaran Midtrans, mesin ingest media multi-platform, hingga riset GraphRAG serta pemodelan harga properti berbasis Explainable AI.",
  ],
  focusAreas: [
    {
      id: "fullstack-architecture",
      title: "Arsitektur Fullstack & SaaS",
      subtitle: "Next.js, NestJS, PostgreSQL",
      description:
        "Merancang aplikasi web produksi dengan isolasi peran (RBAC), state-machine transaksi aman, integrasi Midtrans, serta pelaporan PDF dan spreadsheet.",
    },
    {
      id: "systems-automation",
      title: "Otomasi & Pipeline Media",
      subtitle: "Node.js, TypeScript, FFmpeg",
      description:
        "Mengembangkan layanan background multi-tenant, interceptor anti-raid, pembatas antrean proses (semaphore), dan proteksi keamanan jaringan.",
    },
    {
      id: "ai-data-retrieval",
      title: "AI, Knowledge Graph & ML",
      subtitle: "FastAPI, Neo4j, ChromaDB, CatBoost",
      description:
        "Mengintegrasikan pengambilan data graf relasional dan vektor untuk mengurangi halusinasi LLM, serta memodelkan prediksi tarif dengan interpretasi SHAP.",
    },
    {
      id: "engineering-rigor",
      title: "Pengujian & Infrastruktur VPS",
      subtitle: "Vitest, Playwright, Docker, Nginx",
      description:
        "Menjaga keandalan kode lewat ratusan unit dan E2E test, proses latar belakang PM2, serta alur CI/CD otomatis via GitHub Actions.",
    },
  ],
  education: [
    {
      id: "unud",
      institution: "Universitas Udayana",
      degree: "S1 Teknologi Informasi, Fakultas Teknik",
      period: "2023 - Sekarang",
      location: "Jimbaran, Bali",
      badge: "Perguruan Tinggi",
      highlights: [
        "Fokus utama pada Rekayasa Perangkat Lunak, Arsitektur Sistem Terdistribusi, Machine Learning, dan Sistem Temu Kembali Informasi.",
        "Mengembangkan berbagai proyek produksi dan riset terapan mulai dari sistem kemitraan industri mebel hingga GraphRAG sepak bola.",
      ],
    },
    {
      id: "smaga-klaten",
      institution: "SMAN 3 Klaten",
      degree: "Matematika dan Ilmu Pengetahuan Alam (MIPA)",
      period: "Alumni",
      location: "Klaten, Jawa Tengah",
      badge: "Pendidikan Menengah",
      highlights: [
        "Memperkuat fondasi logika matematika, pemecahan masalah algoritmik, dan analisis kuantitatif sebelum mendalami teknik informatika.",
      ],
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
