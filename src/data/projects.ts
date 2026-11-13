import type { Project } from "@/types/project";
import { PROJECT_GALLERIES } from "@/data/projectGalleries";

const PROJECT_DETAILS: Omit<Project, "screenshots" | "coverImage">[] = [
  {
    slug: "kemitraan-mebel",
    title: "Kemitraan Eksportir & Operasional UMKM Mebel",
    shortTitle: "Kemitraan Mebel",
    tier: "utama",
    category: "Sistem Bisnis",
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
        layer: "Antarmuka",
        detail: "Next.js, React, TypeScript, dan Tailwind CSS.",
      },
      {
        layer: "Akses dan pesanan",
        detail: "Hak akses eksportir dan UMKM, validasi Zod, serta pengaturan status pesanan.",
      },
      {
        layer: "Data dan biaya",
        detail: "PostgreSQL, Prisma, dan decimal.js untuk pencatatan serta perhitungan biaya.",
      },
      {
        layer: "Dokumen",
        detail: "PDFKit dan ExcelJS untuk dokumen dan laporan.",
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
    title: "Sora Wellness",
    shortTitle: "Sora Wellness",
    tier: "utama",
    category: "Sistem Bisnis",
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
        layer: "Antarmuka",
        detail: "React dan Vite, dengan dashboard member, pelatih, dan pengelola.",
      },
      {
        layer: "API dan data",
        detail: "NestJS, PostgreSQL, validasi, dan kontrol akses pengguna.",
      },
      {
        layer: "Pembayaran",
        detail: "Midtrans Snap, notifikasi pembayaran, dan catatan saldo dompet.",
      },
      {
        layer: "Operasional",
        detail: "Jadwal kelas, paket anggota, reservasi, dan presensi.",
      },
    ],
    techStack: [
      "TypeScript",
      "NestJS 11",
      "React 19",
      "Vite 6",
      "PostgreSQL",
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
    title: "Bali Smart Pricing",
    shortTitle: "Bali Smart Pricing",
    tier: "pendukung",
    category: "Machine Learning & Data",
    year: "2026",
    tagline: "Estimasi tarif penginapan Bali dengan CatBoost dan penjelasan SHAP.",
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
        layer: "Pengolahan data",
        detail: "Python dan Pandas untuk menyiapkan fitur lokasi, kapasitas, dan fasilitas.",
      },
      {
        layer: "Model regresi",
        detail: "Perbandingan CatBoost, XGBoost, dan Random Forest.",
      },
      {
        layer: "Penjelasan model",
        detail: "SHAP untuk melihat pengaruh fitur terhadap prediksi.",
      },
      {
        layer: "Antarmuka",
        detail: "Streamlit dan Plotly untuk simulasi harga serta evaluasi model.",
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
        layer: "Website publik",
        detail: "Next.js dan React untuk katalog dalam Bahasa Indonesia dan Inggris.",
      },
      {
        layer: "CMS",
        detail: "Pengelolaan aktivitas, media, galeri, FAQ, dan konten halaman.",
      },
      {
        layer: "Penyimpanan",
        detail: "PostgreSQL, Drizzle ORM, dan validasi Zod.",
      },
      {
        layer: "Media",
        detail: "Sharp untuk mengubah ukuran dan mengompresi gambar WebP.",
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
    tagline: "Unduh media dari tautan dan konversi video ke MP3.",
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
        layer: "Antarmuka",
        detail: "React dan Vite untuk masukan tautan serta berkas video.",
      },
      {
        layer: "API",
        detail: "Node.js, Express, Multer, dan antrean pemrosesan media.",
      },
      {
        layer: "Pemrosesan",
        detail: "yt-dlp, gallery-dl, FFmpeg, dan FFprobe.",
      },
      {
        layer: "Pembatasan proses",
        detail: "Validasi tujuan tautan, batas pekerjaan paralel, dan cache hasil.",
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
    category: "Bot WhatsApp",
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
        layer: "Pesan dan perintah",
        detail: "TypeScript, Node.js, dan Baileys untuk interaksi WhatsApp.",
      },
      {
        layer: "Data grup",
        detail: "PostgreSQL dan Prisma untuk sewa, poin, serta limit per grup.",
      },
      {
        layer: "Moderasi",
        detail: "Anti-link, anti-raid, dan peringatan anggota.",
      },
      {
        layer: "Media",
        detail: "FFmpeg dan Sharp untuk pemrosesan media serta stiker.",
      },
    ],
    techStack: [
      "TypeScript",
      "Node.js",
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
      "Sumber: kode MinjiBot. Visual merupakan ilustrasi penggunaan dengan nama dan percakapan contoh.",
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
