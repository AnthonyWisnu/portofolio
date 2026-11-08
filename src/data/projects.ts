import type { Project } from "@/types/project";

export const CURATED_PROJECTS: Project[] = [
  {
    slug: "sora-wellness",
    title: "Sora Wellness Studio Platform",
    shortTitle: "Sora Wellness",
    tier: "utama",
    category: "Fullstack & SaaS",
    year: "2026",
    tagline: "Platform manajemen, reservasi kelas, dompet saldo, dan event studio kebugaran berbasis API-first.",
    summary:
      "Ekosistem operasional lengkap untuk studio Yoga dan Pilates yang memisahkan aturan bisnis backend dari antarmuka klien, lengkap dengan Midtrans Snap dan runner CI/CD produksi.",
    problem:
      "Operasional studio wellness konvensional kerap mengalami benturan jadwal, penahanan kursi tidak konsisten saat pembayaran tertunda, serta minimnya pemisahan privasi antara resepsionis lobi, pelatih di kelas, dan catatan kesehatan member.",
    solution:
      "Membangun backend state-machine berbasis NestJS 11 dan PostgreSQL 16 dengan hold kursi otomatis 15 menit, pembayaran Midtrans Snap tervalidasi SHA-512, dompet double-entry ledger, presensi pelatih 2-tier berizin khusus, serta sistem 9 hak akses RBAC granular.",
    highlights: [
      "Pembayaran Midtrans Snap berbatas waktu 15 menit dengan dukungan Resume Checkout tanpa membuat tagihan ganda.",
      "Presensi terpisah: front desk memindai e-ticket QR & mendeteksi loker fisik otomatis, sementara pelatih fokus pada absensi matras & catatan kesehatan berizin.",
      "Modul Event Komunitas lengkap dengan brosur QR digital, tautan pin Google Maps presisi, dan terminal check-in acara.",
      "Aktif di produksi pada domain publik dengan Docker Compose dan runner GitHub Actions di VPS Linux.",
    ],
    architecture: [
      { layer: "Frontend SPA", detail: "React 19, Vite 6, sistem tipografi Japandi & QR generator" },
      { layer: "API & State Machine", detail: "NestJS 11, PostgreSQL 16, CSRF protection, Helmet, MCP Server" },
      { layer: "Pembayaran & Dompet", detail: "Midtrans Snap Webhook SHA-512, Server Key AES-256, Wallet Ledger" },
      { layer: "Infrastruktur", detail: "Docker Compose, Nginx, GitHub Actions self-hosted runner" },
    ],
    techStack: ["TypeScript", "NestJS 11", "React 19", "Vite 6", "PostgreSQL 16", "Docker Compose", "Midtrans Snap", "GitHub Actions"],
    githubUrl: "https://github.com/AnthonyWisnu/sora-wellness",
    liveUrl: "https://wellness.anthonywj.my.id",
    coverImage: "/projects/sora-admin.webp",
    screenshots: [
      {
        src: "/projects/sora-admin.webp",
        alt: "Dasbor Admin Sora Wellness Studio",
        caption: "Dasbor admin studio untuk memantau sesi terdekat, metrik kelas, dan kontrol operasional.",
      },
      {
        src: "/projects/sora-coach.webp",
        alt: "Ruang Pelatih Sora Wellness Studio",
        caption: "Antarmuka khusus pelatih untuk melihat sesi ditugaskan serta roster peserta.",
      },
      {
        src: "/projects/sora-checkout.webp",
        alt: "Alur Checkout Kelas Sora Wellness",
        caption: "Ringkasan reservasi kelas dengan penahanan kursi sementara dan integrasi pembayaran.",
      },
    ],
    verificationNote: "Terverifikasi langsung dari repositori sora-wellness dan deployment aktif wellness.anthonywj.my.id.",
  },
  {
    slug: "kemitraan-mebel",
    title: "Kemitraan Eksportir & Operasional UMKM Mebel",
    shortTitle: "Kemitraan Mebel",
    tier: "utama",
    category: "Fullstack & SaaS",
    year: "2026",
    tagline: "Sistem informasi multi-tenant Make-to-Order dengan akuntansi presisi desimal, state-locking produksi, dan ekspor PDF/XLSX.",
    summary:
      "Menghubungkan pengelolaan Purchase Order eksportir mebel (PT Amalia Surya Cemerlang, Klaten) dengan operasional bengkel UMKM mitra dari bahan baku hingga perhitungan HPP aktual.",
    problem:
      "Kolaborasi subkontrak mebel tradisional sering bermasalah akibat data harga beli bahan & margin UMKM bocor ke pihak lain, galat pembulatan kalkulasi upah/HPP, serta proses produksi berjalan tanpa verifikasi DP yang jelas.",
    solution:
      "Merancang Modular Monolith Next.js 16 dan PostgreSQL dengan isolasi RBAC 4 peran asimetris, kalkulasi decimal.js berpresisi 40 digit, metode Moving Weighted Average (MWA) gudang, dan alur state-locking 6 tahap produksi hingga Quality Control.",
    highlights: [
      "Presisi keuangan 40 digit via decimal.js untuk MWA stok kayu, hari kerja desimal (misal 4,50 hari), piutang, HPP, dan margin laba bersih.",
      "Penyimpanan berkas privat di luar public/ dengan validasi magic bytes, penghapusan EXIF, dan konversi WebP otomatis melalui Sharp.",
      "Ekspor 5 templat PDF A4 melalui PDFKit dan 9 laporan spreadsheet terproteksi formula via ExcelJS.",
      "Teruji secara sistematis melalui 374 unit/integration test Vitest dan verifikasi alur Playwright E2E.",
    ],
    architecture: [
      { layer: "App Router & RSC", detail: "Next.js 16.4, React 19.3, Tailwind CSS 4, optimasi timezone WIB" },
      { layer: "Service & Guard Layer", detail: "Zod controller validation, isolasi tenantId, state-locking DP -> QC -> Selesai" },
      { layer: "Finance & Document Engine", detail: "decimal.js 40 digit, PDFKit (Noto Sans embedded), ExcelJS, Sharp storage" },
      { layer: "Database & QA", detail: "PostgreSQL 16/18, Prisma 7.10, 374 Vitest tests, Playwright E2E" },
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma 7", "decimal.js", "PDFKit", "ExcelJS", "Vitest", "Playwright"],
    githubUrl: "https://github.com/AnthonyWisnu/kemitraan-mebel",
    coverImage: "/projects/mebel-exporter.webp",
    screenshots: [
      {
        src: "/projects/mebel-exporter.webp",
        alt: "Beranda Eksportir Kemitraan Mebel",
        caption: "Dasbor eksportir untuk memantau progres PO dan ketepatan pengiriman tiap mitra UMKM.",
      },
      {
        src: "/projects/mebel-hpp.webp",
        alt: "Evaluasi Biaya Produksi dan HPP UMKM",
        caption: "Kalkulasi HPP aktual, margin bersih, dan rekap upah tukang mingguan berbasis presisi desimal.",
      },
      {
        src: "/projects/mebel-wizard.webp",
        alt: "Wizard Penawaran PO 3 Langkah",
        caption: "Formulir pembuatan penawaran PO 3 tahap lengkap dengan ringkasan nilai kontrak langsung.",
      },
    ],
    verificationNote: "Terverifikasi dari repositori kemitraan-mebel termasuk dokumentasi UAT dan suite Vitest.",
  },
  {
    slug: "void-downloader",
    title: "VOID Downloader",
    shortTitle: "VOID Downloader",
    tier: "utama",
    category: "Automation & Media",
    year: "2026",
    tagline: "Mesin ekstraksi dan normalisasi media 10 platform plus konverter video lokal ke MP3 siap produksi.",
    summary:
      "Aplikasi web cepat untuk mengekstrak video, foto carousel HD, dan audio dari 10 platform populer sekaligus menyediakan konverter file video lokal hingga 400 MB dengan proteksi VPS hemat memori.",
    problem:
      "Layanan pengunduh media publik umumnya lambat, dipenuhi iklan, gagal memutar hasil unduhan di iOS/Safari akibat codec AV1/VP9, serta rentan crash (OOM) saat beberapa proses FFmpeg berjalan bersamaan di VPS 2 GB RAM.",
    solution:
      "Mengembangkan backend Express + yt-dlp + gallery-dl dengan Concurrency Semaphore (maksimal 2 tugas berat paralel), normalisasi H.264 +faststart, cache SHA-256 LRU otomatis, serta Safe Socket Agent anti-SSRF DNS rebinding.",
    highlights: [
      "Matriks 10 platform (YouTube, TikTok, Instagram, X, Pinterest, Facebook, SoundCloud, Reddit, Dailymotion, Vimeo) plus Local Video-to-MP3 Converter.",
      "Normalisasi video otomatis ke AVC1 YUV420p + MOOV atom faststart untuk streaming instan di iOS dan peramban modern.",
      "Dukungan HTTP 206 Byte-Range streaming dan pembersihan kuota cache LRU otomatis saat melampaui batas 5 GB.",
      "Antarmuka reaktif VOID Brutalist yang menyesuaikan aksen tema otomatis sesuai platform yang sedang diproses.",
    ],
    architecture: [
      { layer: "Frontend Interface", detail: "React 18, Vite 5, tema dinamis per platform, audio/video preview" },
      { layer: "Ingestion & Queue", detail: "Node.js 20, Express, ConcurrencyLimiter Semaphore, Multer streaming" },
      { layer: "Media Processing", detail: "yt-dlp, gallery-dl, FFmpeg, FFprobe (+faststart + libmp3lame)" },
      { layer: "Security & Cache", detail: "Anti-SSRF DNS lookup socket guard, SHA-256 cache dengan LRU eviction" },
    ],
    techStack: ["React 18", "Vite 5", "Node.js", "Express", "yt-dlp", "gallery-dl", "FFmpeg", "Multer", "Nginx", "PM2"],
    githubUrl: "https://github.com/AnthonyWisnu/void-downloader",
    liveUrl: "https://voiddl.my.id",
    screenshots: [],
    consoleVariant: "void",
    verificationNote: "Terverifikasi langsung dari repositori void-downloader dan layanan aktif voiddl.my.id.",
  },
  {
    slug: "minjibot",
    title: "MinjiBot V2",
    shortTitle: "MinjiBot V2",
    tier: "utama",
    category: "Automation & Media",
    year: "2026",
    tagline: "Platform bot WhatsApp multi-tenant berarsitektur sewa grup, ekonomi persisten, dan proteksi anti-raid.",
    summary:
      "Mesin otomasi WhatsApp berskala produksi di atas Baileys dan TypeScript ketat yang mengisolasi hak akses, saldo, serta moderasi per penyewaan grup dengan dukungan deployment CI/CD otomatis.",
    problem:
      "Mengelola puluhan grup komunitas WhatsApp secara bersamaan rentan mengalami kebocoran state antar grup, serangan raid anggota spam, penghapusan pesan sepihak, serta kegagalan pengiriman video besar melebihi batas 100 MB.",
    solution:
      "Mengkonstruksi arsitektur multi-tenant dengan siklus sewa formal, operasi limit atomik PostgreSQL via Prisma ORM, routing video HD hingga 400 MB sebagai document stream, serta mesin grafis Sharp lokal tanpa beban headless browser.",
    highlights: [
      "Isolasi sewa per grup (PENDING -> ACTIVE -> EXPIRED -> REMOVED) dan hierarki izin 4 tingkat dari Super Owner hingga Member.",
      "Pertahanan grup real-time: Anti-Raid sliding window detector, Anti-Delete LRU cache (500 pesan), Anti-Link, dan warning bertingkat.",
      "Pipeline media hingga 400 MB plus pemrosesan gambar lokal menggunakan Sharp (Super-Clarity .hd dan kartu profil 800x450).",
      "Keandalan kode tervalidasi melalui 398 automated test yang lulus penuh dan deployment PM2 via GitHub Actions.",
    ],
    architecture: [
      { layer: "Messaging Core", detail: "Node.js 20+, TypeScript Strict, Baileys socket manager, interceptor pipeline" },
      { layer: "Tenant Ledger", detail: "PostgreSQL, Prisma ORM, transaksi saldo atomik Reserve -> Execute -> Consume" },
      { layer: "Media & Graphics", detail: "ffmpeg-static, yt-dlp/gallery-dl, Sharp CLAHE + LAB sharpening" },
      { layer: "Telemetry & Ops", detail: "Host telemetry monitor (WIB), PM2 reload, 398 passing tests" },
    ],
    techStack: ["TypeScript", "Node.js 20", "PostgreSQL", "Prisma ORM", "Baileys", "Sharp", "FFmpeg", "PM2", "GitHub Actions"],
    githubUrl: "https://github.com/AnthonyWisnu/MinjiBot",
    screenshots: [],
    consoleVariant: "minji",
    verificationNote: "Terverifikasi langsung dari repositori MinjiBot dan status suite pengujian.",
  },
  {
    slug: "hotdog-watersport",
    title: "PT Hotdog Water Sport",
    shortTitle: "Hotdog Water Sport",
    tier: "utama",
    category: "Web Komersial",
    year: "2026",
    tagline: "Platform company profile, katalog wahana wisata bahari dwibahasa, dan CMS admin untuk operator Tanjung Benoa.",
    summary:
      "Website resmi untuk operator wisata bahari di Bali dengan dukungan penuh dua bahasa (/en dan /id), keranjang pemesanan WhatsApp tanpa login, serta panel CMS berkeamanan tinggi.",
    problem:
      "Bisnis wisata bahari membutuhkan situs yang cepat dibuka wisatawan internasional di ponsel, mudah mengubah jadwal/foto wahana sendiri lewat admin panel, sekaligus mengonversi minat menjadi pesanan WhatsApp yang rapi.",
    solution:
      "Membangun platform Next.js 16 App Router dengan Drizzle ORM dan PostgreSQL yang menyatukan etalase publik dwibahasa, pustaka media terkompresi WebP otomatis via Sharp, dan autentikasi admin terproteksi cookie httpOnly + argon2id.",
    highlights: [
      "Routing publik dwibahasa terstruktur (/en dan /id) lengkap dengan katalog kategori Adrenalin, Scuba Diving, dan wahana keluarga.",
      "Keranjang pilihan lokal di browser wisatawan yang otomatis menyusun format pesan reservasi terstruktur ke WhatsApp operator.",
      "Panel admin terpusat untuk mengatur Hero slide, Bento Grid keunggulan, FAQ, galeri, serta pemilih media teroptimasi Sharp WebP.",
      "Skema validasi sinkron klien-server dengan Zod dan hashing password @node-rs/argon2 di VPS Linux + Nginx.",
    ],
    architecture: [
      { layer: "Public Routes [locale]", detail: "Next.js 16 App Router (en/id), katalis SEO, Next Image WebP optimization" },
      { layer: "Admin CMS Protected", detail: "Cookie httpOnly session, @node-rs/argon2, editor konten & MediaPickerModal" },
      { layer: "Database Layer", detail: "PostgreSQL, Drizzle ORM, drizzle-kit migrations, Zod schema validation" },
      { layer: "Media Processing", detail: "Sharp resize & kompresi WebP kualitas 82 otomatis pada upload" },
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Argon2id", "Sharp", "Zod"],
    githubUrl: "https://github.com/watersportshotdog/hot-dog",
    coverImage: "/projects/hotdog-diving.webp",
    screenshots: [
      {
        src: "/projects/hotdog-diving.webp",
        alt: "Dokumentasi aktivitas selam PT Hotdog Water Sport di Tanjung Benoa",
        caption: "Salah satu aset dokumentasi maritim asli yang dikelola ke dalam pustaka media dan katalog wahana.",
      },
    ],
    verificationNote: "Terverifikasi langsung dari repositori resmi watersportshotdog/hot-dog.",
  },
  {
    slug: "scout-rag",
    title: "ScoutRAG: STKI Football KG-RAG",
    shortTitle: "ScoutRAG (KG-RAG)",
    tier: "pendukung",
    category: "AI & Knowledge Graph",
    year: "2026",
    tagline: "Sistem tanya-jawab dan estimasi rentang valuasi pemain sepak bola berbasis Knowledge Graph Neo4j dan ChromaDB.",
    summary:
      "Proyek riset Sistem Temu Kembali Informasi (STKI) untuk 5 liga top Eropa yang memadukan kueri Cypher terstruktur dan semantic search vektor guna menjaga jawaban tetap berdasar kutipan data.",
    problem:
      "LLM murni sering mengarang angka statistik pemain, sementara pencarian teks tradisional tidak mampu menjawab kueri relasional seperti perbandingan kontribusi atau kemiripan profil antar klub dan musim.",
    solution:
      "Merancang arsitektur hibrida FastAPI + Neo4j 5.27 + ChromaDB 0.5 dengan Agentic Router yang memilih otomatis strategi kg_only, vector_only, hybrid, atau valuation_reasoning disertai deteksi bahasa ID/EN dan scope guard.",
    highlights: [
      "Pipeline ETL dari dataset FBref (via soccerdata) dan Transfermarkt dengan pelestarian nilai null agar tidak memalsukan data kosong menjadi nol.",
      "Embedding dokumen menggunakan model multilingual-e5-base di ChromaDB dipadukan graf relasi Pemain-Klub-Liga-Musim di Neo4j.",
      "Antarmuka analitik dark editorial di Next.js 14 dengan visualisasi radar/perbandingan statistik Recharts dan kutipan sumber eksplisit.",
    ],
    architecture: [
      { layer: "Analytics Frontend", detail: "Next.js 14, TypeScript, Tailwind CSS, Recharts, Framer Motion" },
      { layer: "Agentic Router API", detail: "FastAPI, Scope Guard (Big 5 Europe), deteksi bahasa ID/EN" },
      { layer: "Hybrid Storage", detail: "Neo4j 5.27 (Cypher KG) + ChromaDB 0.5 (multilingual-e5-base vectors)" },
      { layer: "Reasoning & ETL", detail: "OpenAI GPT-4o-mini synthesis, Pandas/Parquet ETL snapshot" },
    ],
    techStack: ["Next.js 14", "FastAPI", "Python 3.11", "Neo4j 5.27", "ChromaDB", "OpenAI API", "SentenceTransformers", "Recharts"],
    githubUrl: "https://github.com/AnthonyWisnu/RAG-STKI",
    screenshots: [],
    consoleVariant: "scout",
    verificationNote: "Terverifikasi langsung dari repositori RAG-STKI beserta arsitektur ETL dan router kueri.",
  },
  {
    slug: "bali-smart-pricing",
    title: "Bali Smart Villa & Homestay Pricing Engine",
    shortTitle: "Bali Smart Pricing",
    tier: "pendukung",
    category: "Machine Learning & Data",
    year: "2026",
    tagline: "Mesin estimasi tarif sewa harian properti Bali menggunakan CatBoost, jarak geospasial Haversine, dan SHAP Explainable AI.",
    summary:
      "Pipeline data science 6 tahap yang membersihkan distorsi data mentah akomodasi Bali, membandingkan 3 algoritma Gradient Boosting & Random Forest, dan menyajikan kalkulator harga interaktif transparan.",
    problem:
      "Data pencarian penginapan mentah di Bali mengandung distorsi akumulasi harga 5 malam, salah label 32% wilayah kabupaten akibat radius pencarian, serta ketidakcocokan kapasitas kamar pada vila multi-kamar.",
    solution:
      "Menyusun pipeline pembersihan dan kanonisasi 42 kecamatan baku Bali, rekayasa fitur jarak Haversine ke 6 sentra wisata utama, benchmarking 5-Fold Cross Validation (CatBoost unggul dengan skor uji R2 71,68%), dan penjelasan kontribusi fitur via SHAP TreeExplainer.",
    highlights: [
      "Koreksi 402 baris kesalahan label kabupaten silang serta dekonvolusi akurat dari tarif akumulasi 5 malam ke tarif 1 malam murni.",
      "Performa model CatBoost Regressor (R2 uji 71,68%, akurasi relatif 72,48% pada segmen Villa Reguler dengan MedAE Rp 365.058).",
      "Visualisasi SHAP TreeExplainer 300 DPI berbahasa Indonesia (Feature Importance, Beeswarm Summary, dan Waterfall per properti).",
      "Aplikasi Streamlit interaktif dilengkapi peta OpenStreetMap dan kalkulator kewajaran tarif berdasarkan fasilitas fisik.",
    ],
    architecture: [
      { layer: "Harvester & Canonicalizer", detail: "Skrip Python pengkoreksi 42 kecamatan Bali & dekonvolusi tarif" },
      { layer: "Geospatial Features", detail: "Kalkulasi jarak fisik Haversine ke 6 pusat wisata tanpa data leakage" },
      { layer: "ML Benchmark Engine", detail: "5-Fold CV komparasi CatBoost, XGBoost, dan Random Forest (38 fitur)" },
      { layer: "Explainable Web UI", detail: "SHAP TreeExplainer plots, Streamlit, Plotly, OpenStreetMap" },
    ],
    techStack: ["Python", "CatBoost", "XGBoost", "Scikit-Learn", "SHAP", "Pandas", "Streamlit", "Plotly"],
    githubUrl: "https://github.com/AnthonyWisnu/bali-smart-pricing",
    coverImage: "/projects/pricing-shap-importance.webp",
    screenshots: [
      {
        src: "/projects/pricing-shap-importance.webp",
        alt: "Grafik SHAP Feature Importance Harga Villa Bali",
        caption: "Peringkat faktor dominan pembentuk estimasi tarif harian properti di Bali berdasarkan nilai SHAP.",
      },
      {
        src: "/projects/pricing-shap-beeswarm.webp",
        alt: "SHAP Beeswarm Summary Plot",
        caption: "Sebaran arah pengaruh setiap fitur seperti kolam renang pribadi, jumlah kamar, dan kawasan wisata.",
      },
      {
        src: "/projects/pricing-shap-waterfall.webp",
        alt: "SHAP Waterfall Individual Prediction",
        caption: "Penelusuran langkah demi langkah kontribusi fitur dari harga dasar pulau Bali ke estimasi satu unit vila.",
      },
    ],
    verificationNote: "Terverifikasi langsung dari repositori bali-smart-pricing dan laporan benchmark model.",
  },
];

export const FEATURED_PROJECTS = CURATED_PROJECTS.filter((p) => p.tier === "utama");
export const SUPPORTING_PROJECTS = CURATED_PROJECTS.filter((p) => p.tier === "pendukung");
