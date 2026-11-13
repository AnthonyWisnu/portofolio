import type { Project } from "@/types/project";
import { PROJECT_GALLERIES } from "@/data/projectGalleries";

const PROJECT_DETAILS: Omit<Project, "screenshots" | "coverImage">[] = [
  {
    slug: "kemitraan-mebel",
    title: "Kemitraan Eksportir & Operasional UMKM Mebel",
    shortTitle: "Kemitraan Mebel",
    tier: "utama",
    category: "Fullstack & SaaS",
    year: "2026",
    tagline: "Dari penawaran PO hingga produksi, persediaan, dan HPP UMKM mebel.",
    summary:
      "Sistem kemitraan yang menghubungkan alur pesanan eksportir dengan operasional bengkel UMKM.",
    problem:
      "Pesanan, bahan, upah, dan pembayaran perlu terhubung tanpa membuka informasi biaya internal kepada peran lain.",
    solution:
      "Alur kerja berbasis peran menghubungkan penawaran, DP, produksi, QC, pengiriman, dan perhitungan HPP.",
    highlights: [
      "Akses terpisah untuk pengelola platform, eksportir, pemilik, dan staf UMKM.",
      "Pencatatan stok bahan, upah, biaya tambahan, serta margin pesanan.",
      "Dokumen PDF dan laporan spreadsheet dari data operasional.",
    ],
    architecture: [
      {
        layer: "App Router & RSC",
        detail: "Next.js 16.4, React 19.3, Tailwind CSS 4, optimasi timezone WIB",
      },
      {
        layer: "Service & Guard Layer",
        detail: "Zod controller validation, isolasi tenantId, state-locking DP -> QC -> Selesai",
      },
      {
        layer: "Finance & Document Engine",
        detail: "decimal.js 40 digit, PDFKit (Noto Sans embedded), ExcelJS, Sharp storage",
      },
      {
        layer: "Database & QA",
        detail: "PostgreSQL 16/18, Prisma 7.10, pengujian Vitest, Playwright E2E",
      },
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma 7",
      "decimal.js",
      "PDFKit",
      "ExcelJS",
      "Vitest",
      "Playwright",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/kemitraan-mebel",
    verificationNote:
      "Sumber: repositori kemitraan-mebel dan dokumentasi UAT. Gambar menggunakan data demonstrasi.",
    featured: true,
  },
  {
    slug: "sora-wellness",
    title: "Sora Wellness Studio Platform",
    shortTitle: "Sora Wellness",
    tier: "utama",
    category: "Fullstack & SaaS",
    year: "2026",
    tagline: "Platform reservasi kelas, dompet saldo, dan operasional studio kebugaran.",
    summary:
      "Platform reservasi kelas Yoga dan Pilates dengan ruang kerja untuk member, pelatih, dan pengelola studio.",
    problem:
      "Jadwal, kapasitas kelas, pembayaran, dan presensi perlu dicatat dalam alur yang sama dengan hak akses berbeda.",
    solution:
      "React dan NestJS menghubungkan reservasi, batas waktu pembayaran, dompet saldo, serta presensi berbasis peran.",
    highlights: [
      "Reservasi kelas dengan penahanan kursi dan integrasi Midtrans.",
      "Ruang pelatih untuk jadwal dan roster peserta.",
      "Pengelolaan paket, acara komunitas, dan operasional studio.",
    ],
    architecture: [
      {
        layer: "Frontend SPA",
        detail: "React 19, Vite 6, sistem tipografi Japandi & QR generator",
      },
      {
        layer: "API & State Machine",
        detail: "NestJS 11, PostgreSQL 16, CSRF protection, Helmet, MCP Server",
      },
      {
        layer: "Pembayaran & Dompet",
        detail: "Midtrans Snap Webhook SHA-512, Server Key AES-256, Wallet Ledger",
      },
      {
        layer: "Infrastruktur",
        detail: "Docker Compose, Nginx, GitHub Actions self-hosted runner",
      },
    ],
    techStack: [
      "TypeScript",
      "NestJS 11",
      "React 19",
      "Vite 6",
      "PostgreSQL 16",
      "Docker Compose",
      "Midtrans Snap",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/sora-wellness",
    liveUrl: "https://wellness.anthonywj.my.id",
    verificationNote:
      "Sumber: kode sora-wellness. Dokumentasi antarmuka menggunakan lingkungan atau akun demonstrasi.",
    featured: true,
  },
  {
    slug: "bali-smart-pricing",
    title: "Bali Smart Villa & Homestay Pricing Engine",
    shortTitle: "Bali Smart Pricing",
    tier: "pendukung",
    category: "Machine Learning & Data",
    year: "2026",
    tagline: "Prediksi tarif sewa vila Bali dengan CatBoost dan SHAP Explainable AI.",
    summary:
      "Kalkulator tarif penginapan Bali dengan perbandingan model dan penjelasan kontribusi fitur.",
    problem:
      "Data tarif, lokasi, kapasitas, dan fasilitas penginapan perlu dibersihkan sebelum dipakai untuk estimasi harga.",
    solution:
      "Pipeline Python menyiapkan fitur geospasial, membandingkan model regresi, lalu menyajikan inferensi CatBoost dan analisis SHAP di Streamlit.",
    highlights: [
      "Kalkulator tarif berdasarkan lokasi, kapasitas, dan fasilitas.",
      "Perbandingan CatBoost, XGBoost, dan Random Forest.",
      "Grafik SHAP untuk menjelaskan pengaruh fitur terhadap prediksi.",
    ],
    architecture: [
      {
        layer: "Harvester & Canonicalizer",
        detail: "Skrip Python pengkoreksi 42 kecamatan Bali & dekonvolusi tarif",
      },
      {
        layer: "Geospatial Features",
        detail: "Kalkulasi jarak fisik Haversine ke 6 pusat wisata tanpa data leakage",
      },
      {
        layer: "ML Benchmark Engine",
        detail: "5-Fold CV komparasi CatBoost, XGBoost, dan Random Forest (38 fitur)",
      },
      {
        layer: "Explainable Web UI",
        detail: "SHAP TreeExplainer plots, Streamlit, Plotly, OpenStreetMap",
      },
    ],
    techStack: [
      "Python",
      "CatBoost",
      "XGBoost",
      "Scikit-Learn",
      "SHAP",
      "Pandas",
      "Streamlit",
      "Plotly",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/bali-smart-pricing",
    verificationNote:
      "Proyek akademik kolaboratif. Aplikasi Streamlit dan model lokal diperiksa langsung; gambar berisi simulasi properti.",
  },
  {
    slug: "pinfas",
    title: "PINFAS",
    shortTitle: "PINFAS",
    tier: "utama",
    category: "Sistem Informasi",
    year: "2026",
    tagline: "Peminjaman fasilitas desa dan kelurahan, dari katalog hingga verifikasi.",
    summary:
      "Aplikasi layanan publik untuk menjelajahi fasilitas, mengajukan peminjaman, dan mengelola persetujuan.",
    problem:
      "Informasi fasilitas, biaya, pengajuan, dan surat izin perlu tersedia dalam satu alur layanan yang mudah dilacak.",
    solution:
      "React dan Supabase menghubungkan katalog publik, pengajuan tanpa wajib login, verifikasi admin, serta dokumen izin PDF dengan QR.",
    highlights: [
      "Katalog fasilitas dan pengajuan warga tanpa wajib membuat akun.",
      "Hak akses admin desa, kelian banjar, dan lurah.",
      "Surat izin PDF, verifikasi QR, dan laporan publik.",
    ],
    architecture: [
      {
        layer: "Antarmuka publik",
        detail: "React, Vite, React Router, Tailwind CSS",
      },
      {
        layer: "Akses dan data",
        detail: "Supabase Auth, PostgreSQL, dan Storage",
      },
      {
        layer: "Dokumen dan laporan",
        detail: "React PDF, QR verifikasi, Recharts, dan spreadsheet",
      },
    ],
    techStack: ["React", "Vite", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts", "React PDF"],
    githubUrl: "https://github.com/AnthonyWisnu/PinFas",
    verificationNote:
      "Sumber: kode PINFAS dan backend Supabase lokal. Gambar menggunakan data contoh dari migrasi repositori.",
  },
  {
    slug: "hotdog-watersport",
    title: "PT Hotdog Water Sport",
    shortTitle: "Hotdog Water Sport",
    tier: "utama",
    category: "Web Komersial",
    year: "2026",
    tagline: "Katalog wahana wisata bahari dwibahasa dan CMS admin Tanjung Benoa.",
    summary:
      "Company profile dan katalog aktivitas wisata bahari dengan pengelolaan konten melalui CMS.",
    problem:
      "Katalog dwibahasa dan media wahana perlu mudah diperbarui, sementara pengunjung dapat menyusun pilihan reservasi.",
    solution:
      "Next.js dan PostgreSQL menghubungkan katalog publik, keranjang pilihan, penyusunan pesan WhatsApp, dan CMS terproteksi.",
    highlights: [
      "Katalog aktivitas dalam Bahasa Indonesia dan Inggris.",
      "Keranjang pilihan untuk menyiapkan pesan reservasi WhatsApp.",
      "CMS untuk produk, media, galeri, FAQ, dan konten beranda.",
    ],
    architecture: [
      {
        layer: "Public Routes [locale]",
        detail: "Next.js 16 App Router (en/id), katalis SEO, Next Image WebP optimization",
      },
      {
        layer: "Admin CMS Protected",
        detail: "Cookie httpOnly session, @node-rs/argon2, editor konten & MediaPickerModal",
      },
      {
        layer: "Database Layer",
        detail: "PostgreSQL, Drizzle ORM, drizzle-kit migrations, Zod schema validation",
      },
      {
        layer: "Media Processing",
        detail: "Sharp resize & kompresi WebP kualitas 82 otomatis pada upload",
      },
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle ORM",
      "Argon2id",
      "Sharp",
      "Zod",
    ],
    githubUrl: "https://github.com/watersportshotdog/hot-dog",
    verificationNote:
      "Sumber: CMS lokal terbaru dan foto dokumentasi asli Hotdog. Runtime serta database demonstrasi dipisahkan dari proyek asli.",
    repositoryVisibility: "private",
  },
  {
    slug: "void-downloader",
    title: "VOID Downloader",
    shortTitle: "VOID Downloader",
    tier: "utama",
    category: "Automation & Media",
    year: "2026",
    tagline: "Ekstraktor media 10 platform dan konverter video lokal ke MP3.",
    summary:
      "Aplikasi web untuk menganalisis tautan media, memilih hasil unduhan, dan mengonversi video lokal ke MP3.",
    problem:
      "Pengambilan media memerlukan pemilihan format, pemrosesan file, dan pembatasan pekerjaan agar server tetap terkendali.",
    solution:
      "React dan Express menghubungkan yt-dlp, gallery-dl, serta FFmpeg dengan antrean terbatas dan cache hasil.",
    highlights: [
      "Analisis tautan dari platform media yang didukung.",
      "Konversi video lokal menjadi audio MP3.",
      "Pembatasan konkurensi, cache hasil, dan validasi tujuan jaringan.",
    ],
    architecture: [
      {
        layer: "Frontend Interface",
        detail: "React 18, Vite 5, tema dinamis per platform, audio/video preview",
      },
      {
        layer: "Ingestion & Queue",
        detail: "Node.js 20, Express, ConcurrencyLimiter Semaphore, Multer streaming",
      },
      {
        layer: "Media Processing",
        detail: "yt-dlp, gallery-dl, FFmpeg, FFprobe (+faststart + libmp3lame)",
      },
      {
        layer: "Security & Cache",
        detail: "Anti-SSRF DNS lookup socket guard, SHA-256 cache dengan LRU eviction",
      },
    ],
    techStack: [
      "React 18",
      "Vite 5",
      "Node.js",
      "Express",
      "yt-dlp",
      "gallery-dl",
      "FFmpeg",
      "Multer",
      "Nginx",
      "PM2",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/void-downloader",
    liveUrl: "https://voiddl.my.id",
    verificationNote:
      "Sumber: kode dan demo online VOID. Berkas pada tampilan converter merupakan video contoh sintetis.",
  },
  {
    slug: "minjibot",
    title: "MinjiBot V2",
    shortTitle: "MinjiBot V2",
    tier: "pendukung",
    category: "Automation & Media",
    year: "2026",
    tagline: "Bot WhatsApp multi-tenant dengan manajemen sewa grup dan anti-raid.",
    summary: "Bot WhatsApp dengan pengelolaan grup, hak akses, moderasi, dan pemrosesan media.",
    problem:
      "Otomasi di banyak grup memerlukan pemisahan izin, saldo, serta pengendalian proses media dan moderasi.",
    solution:
      "TypeScript, Baileys, dan PostgreSQL mengatur konteks grup, siklus sewa, transaksi limit, serta pipeline media.",
    highlights: [
      "Pengelolaan sewa grup dan hak akses bertingkat.",
      "Moderasi grup melalui anti-raid, anti-link, dan peringatan.",
      "Pipeline media dengan FFmpeg dan pemrosesan gambar Sharp.",
    ],
    architecture: [
      {
        layer: "Messaging Core",
        detail: "Node.js 20+, TypeScript Strict, Baileys socket manager, interceptor pipeline",
      },
      {
        layer: "Tenant Ledger",
        detail: "PostgreSQL, Prisma ORM, transaksi saldo atomik Reserve -> Execute -> Consume",
      },
      {
        layer: "Media & Graphics",
        detail: "ffmpeg-static, yt-dlp/gallery-dl, Sharp CLAHE + LAB sharpening",
      },
      {
        layer: "Telemetry & Ops",
        detail: "Host telemetry monitor (WIB), PM2 reload, pengujian otomatis",
      },
    ],
    techStack: [
      "TypeScript",
      "Node.js 20",
      "PostgreSQL",
      "Prisma ORM",
      "Baileys",
      "Sharp",
      "FFmpeg",
      "PM2",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/MinjiBot",
    verificationNote:
      "Sumber: kode MinjiBot. Visual berupa diagram penjelasan yang dibuat dari arsitektur, bukan screenshot aplikasi.",
  },
];

export const CURATED_PROJECTS: Project[] = PROJECT_DETAILS.map((project) => ({
  ...project,
  screenshots: PROJECT_GALLERIES[project.slug],
  coverImage: PROJECT_GALLERIES[project.slug][0].src,
}));

export const FEATURED_PROJECTS = CURATED_PROJECTS.filter((project) => project.featured);
export const SUPPORTING_PROJECTS = CURATED_PROJECTS.filter(
  (project) => project.tier === "pendukung",
);
