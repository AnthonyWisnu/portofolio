# Anthony Wisnu - 3D Interactive Cyberpunk Developer Portfolio

Portofolio web interaktif 3D bergaya cyberpunk dengan visual mutakhir, simulasi terminal teknis, dan kartu proyek kurasi penuh. Dibangun untuk menyajikan profil rekayasa perangkat lunak, sistem produksi aktif, dan keahlian teknis secara imersif dan responsif.

Sistem produksi aktif dan berjalan di: `https://anthonywj.my.id`

---

## Fitur Utama

### 1. 3D Interactive Cyber Deck & Canvas R3F
- Model 3D interaktif yang dirender langsung di browser menggunakan Three.js, React Three Fiber (@react-three/fiber), dan @react-three/drei.
- Kontrol rotasi dan orbit kamera yang halus (OrbitControls) dengan fallback performa otomatis untuk perangkat berspesifikasi rendah.
- Efek pencahayaan dinamis, floating particles, dan ambient glow bertema terminal masa depan.

### 2. Multi-Color Cyber Palette & Tech Stack Inspector
- Palet warna bertema cyberpunk terkoordinasi (Cyber Cyan, Neon Amber, Electric Purple, Matrix Green, Coral Red).
- **Tech Stack Inspector**: Modul interaktif dengan grid kartu bertema per teknologi (React, Next.js App Router, Three.js / R3F, Tailwind CSS, GSAP / ScrollTrigger, Vite) lengkap dengan badge kategori, status level, dan animasi mikro responsif.

### 3. Responsive Cross-Device UI & Organic Wave Dividers
- Optimal di seluruh ukuran layar: Desktop ultra-wide, laptop, iPad / tablet, hingga smartphone layar sempit.
- Struktur kontainer anti-overflow: Mencegah pergeseran horizontal pada tampilan mobile dengan penggunaan padding adaptif, `max-w-full`, dan layout grid responsif.
- Pembatas visual gelombang organik (wave dividers) berbasis SVG dinamis untuk menyatukan transisi antar-bagian secara elegan dan menghilangkan celah kosong visual.

### 4. Kurasi Proyek Produksi Terverifikasi
- **VOID Downloader (`voiddl.my.id`)**: Media downloader modern 4-in-1 (YouTube, TikTok, Instagram, X) dengan normalisasi video H.264 FastStart, concurrency limiter semaphore, dan proteksi SSRF.
- **MinjiBot V2**: Platform bot WhatsApp multi-tenant berskala enterprise dengan arsitektur group-rental, ekonomi anggota persisten, dan pipeline media adaptif.
- **KasPilot**: Sistem Point of Sale (POS) dan manajemen keuangan multi-outlet dengan pelaporan analitik laba rugi real-time.
- **PinFAS**: Aplikasi presensi mobile terintegrasi dengan verifikasi wajah berbasis kecerdasan buatan dan geolokasi akurat.

### 5. Interactive Contact Terminal & API Gateway
- Formulir kontak interaktif dengan feedback visual instan.
- Backend API route Next.js terintegrasi dengan Nodemailer dan proteksi rate limiting untuk pengiriman pesan langsung ke email resmi.

### 6. Automated CI/CD & Self-Hosted Deployment
- Pipeline deployment otomatis menggunakan GitHub Actions yang berjalan pada runner self-hosted di VPS Ubuntu.
- Build Next.js otomatis dengan sinkronisasi zero-downtime via PM2.

---

## Tech Stack

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS
- **Animation**: GSAP (GreenSock), ScrollTrigger, Framer Motion
- **Icons**: Lucide React
- **Email Dispatcher**: Nodemailer

### Production Infrastructure
- **Server**: Ubuntu 24.04 LTS VPS
- **Process Manager**: PM2
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt Certbot
- **CI/CD**: GitHub Actions (Self-Hosted Runner)
- **Domain**: `https://anthonywj.my.id`

---

## Struktur Direktori

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml            # Workflow CI/CD otomatis self-hosted runner
├── public/                       # Aset statis, font, dan favicon
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/          # Endpoint pengiriman email kontak
│   │   ├── favicon.ico
│   │   ├── globals.css           # Styling global dan Tailwind utilities
│   │   ├── layout.tsx            # Root layout dengan konfigurasi metadata SEO
│   │   └── page.tsx              # Halaman utama portofolio
│   ├── components/
│   │   ├── 3d/
│   │   │   └── CyberDeck.tsx     # Komponen Three.js Canvas dan render 3D
│   │   ├── AboutSection.tsx      # Bagian profil dan narasi pengalaman
│   │   ├── ContactSection.tsx    # Bagian kontak interaktif
│   │   ├── HeroSection.tsx       # Hero cyberpunk dengan visual utama
│   │   ├── Navbar.tsx            # Navigasi sticky responsif
│   │   ├── ProjectCard.tsx       # Kartu detail proyek terkurasi
│   │   ├── ProjectsSection.tsx   # Grid proyek unggulan
│   │   ├── TechStackInspector.tsx# Inspector tumpukan teknologi interaktif
│   │   └── WaveDivider.tsx       # Komponen pembatas gelombang transisi
│   ├── data/
│   │   └── projects.ts           # Data sumber proyek dan teknologi
│   └── lib/
│       └── utils.ts              # Helper utilitas classnames dan formatting
├── .env.example                  # Contoh variabel konfigurasi environment
├── next.config.ts                # Konfigurasi Next.js
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Panduan Instalasi Lokal

### Prasyarat
- Node.js versi 20 LTS atau lebih baru
- npm, pnpm, atau yarn

### 1. Kloning Repository & Instal Dependensi
```bash
git clone https://github.com/AnthonyWisnu/portofolio.git
cd portofolio
npm install
```

### 2. Konfigurasi Environment
Salin berkas `.env.example` ke `.env.local`:
```bash
cp .env.example .env.local
```

Isi konfigurasi SMTP jika ingin mengaktifkan pengiriman pesan formulir kontak:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_RECEIVER=your-receiver@email.com
```

### 3. Menjalankan Server Development
```bash
npm run dev
```

Buka `http://localhost:3000` pada browser Anda.

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## Lisensi & Hak Cipta
Hak Cipta (c) Anthony Wisnu. Seluruh hak cipta dilindungi undang-undang. Desain dan konten dibuat khusus untuk portofolio profesional pribadi.
