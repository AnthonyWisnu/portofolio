# Implementation Plan: Comprehensive UI/UX Revamp & Widescreen Optimization

## 1. Executive Summary & Problem Diagnosis

Berdasarkan analisis arsitektur kode di `C:\laragon\www\portofolio`, inspeksi screenshot pengguna (`Screenshot 2026-09-14 212339.png`), serta prinsip desain di `AGENTS.md`, portofolio Anthony Wisnu Jati membutuhkan perbaikan UI/UX komprehensif pada 6 pilar utama:

1. **Masalah Ruang Kosong Samping (Horizontal Void on Widescreen):**
   - **Penyebab:** Seluruh container utama dibatasi oleh `max-w-7xl` (1280px / 80rem). Pada monitor modern (1080p 1920px, 2K 1440p, atau ultrawide), terdapat kekosongan hitam ekstrem (~320px di kiri dan ~320px di kanan). Konten tampak terjepit di tengah (*narrow boxed feeling*).
   - **Solusi:** Memperluas container menjadi `max-w-[1536px]` (2XL) / `max-w-[1600px]` dengan padding responsif yang bernapas (`px-6 sm:px-10 lg:px-16 xl:px-20`). Mengembangkan grid Hero sehingga kanvas 3D memiliki panggung visual yang lebih megah dan seimbang dengan kolom editorial di kiri.

2. **Inkonsistensi Bahasa (Language Disconnect in Contact Section):**
   - **Penyebab:** Hero, About, Skills, dan Projects sudah menggunakan *Professional Technical English*, namun `ContactSection.tsx` dan `src/app/api/contact/route.ts` masih 100% menggunakan Bahasa Indonesia.
   - **Solusi:** Standardisasi seluruh copywriter form, labels, options, placeholder, response toast, dan footer menjadi *High-Impact Professional English*.

3. **Font Cascade Override di `globals.css`:**
   - **Penyebab:** `body { font-family: Arial, Helvetica, sans-serif; }` di `src/app/globals.css` menimpa font modern `Geist Sans` & `Geist Mono` yang sudah di-load di `layout.tsx`.
   - **Solusi:** Hapus override `Arial` dan aktifkan token `var(--font-geist-sans)` dan `var(--font-geist-mono)` secara bersih.

4. **Inkonsistensi Tema & Estetika Visual (Cyber Dark-First):**
   - **Penyebab:** Sebagian komponen mendukung light mode dengan kartu putih, sementara `VoidShowcaseDeck` dan `ContactSection` di-hardcode hitam pekat, menimbulkan efek kedip (*jarring visual transition*).
   - **Solusi:** Satukan seluruh portofolio ke dalam estetika *Cyber-Editorial Dark First* yang berwibawa (fondasi obsidian, aksen cyber red, typography kontras tinggi).

5. **Glitch Kursor Kustom (Double Cursor & Illegible Text):**
   - **Penyebab:** `CustomCursor.tsx` tidak menyembunyikan pointer asli sistem operasi dan teks hover berukuran terlalu kecil (~5px efektif).
   - **Solusi:** Atur styling kursor menjadi dot-follower minimalis berpresisi tinggi tanpa lag dan tanpa mengaburkan tombol target.

6. **Ergonomi Sentuh & Aksesibilitas (Mobile & A11y):**
   - **Penyebab:** Tombol tab di Skills scanner terlalu rapat di mobile; input form belum memiliki focus-visible ring standar a11y.
   - **Solusi:** Optimasi touch target minimal 44px dan focus indicator yang jelas.

---

## 2. Detailed Action Plan & Technical Architecture

### Phase 1: Widescreen Fluid Layout & Ruang Kosong (Eliminasi Narrow Gutter)

#### Files Affected:
- `src/components/navigation/Navbar.tsx`
- `src/components/hero/HeroSection.tsx`
- `src/components/about/AboutSection.tsx`
- `src/components/skills/SkillsSection.tsx`
- `src/components/projects/ProjectsSection.tsx`
- `src/components/contact/ContactSection.tsx`
- `src/components/ui/WaveDivider.tsx`

#### Action Items:
1. **Container Expansion:**
   - Ganti pembatas statis `max-w-7xl mx-auto` (1280px) menjadi container dinamis `max-w-[1536px] mx-auto` atau `max-w-[1600px] mx-auto`.
   - Perbarui padding horizontal menjadi `px-6 sm:px-10 lg:px-16 xl:px-20` agar konten mengisi layar desktop dengan seimbang dan bernapas alami di monitor 1080p maupun 2K/4K.
2. **Hero Grid Scaling:**
   - Perbesar porsi kolom visual kanvas 3D di desktop: dari tinggi terbatas `h-[380px] lg:h-[560px]` menjadi `h-[440px] sm:h-[540px] lg:h-[640px] xl:h-[700px]`.
   - Skalakan ukuran typography headline editorial: `text-4xl sm:text-6xl lg:text-7xl xl:text-8xl` agar mengisi proporsi ruang kiri secara proporsional.
3. **Navbar Widening:**
   - Sesuaikan container navbar agar melebar harmonis mengikuti garis panduan layout utama.

---

### Phase 2: Tipografi & Global Font Stack (`src/app/globals.css`)

#### Files Affected:
- `src/app/globals.css`
- `src/app/layout.tsx`

#### Action Items:
1. Hapus aturan override lama:
   ```css
   /* Hapus ini di globals.css */
   body {
     background: var(--background);
     color: var(--foreground);
     font-family: Arial, Helvetica, sans-serif;
   }
   ```
2. Pastikan font stack `Geist Sans` dan `Geist Mono` terhubung ke token theme Tailwind v4:
   ```css
   @theme inline {
     --color-background: var(--background);
     --color-foreground: var(--foreground);
     --font-sans: var(--font-geist-sans), system-ui, sans-serif;
     --font-mono: var(--font-geist-mono), monospace;
   }
   ```

---

### Phase 3: Lokalisasi Penuh ke Professional Technical English

#### Files Affected:
- `src/components/contact/ContactSection.tsx`
- `src/app/api/contact/route.ts`
- `src/data/projects.ts` (jika ada string tersisa)

#### Action Items:
1. **Contact Section Copywriting:**
   - Judul: *"Mari Berdiskusi & Berkolaborasi."* $\rightarrow$ *"Let's Connect & Build Systems."*
   - Subjudul: *"Have a system to build, an architectural challenge to solve, or an engineering opportunity? Drop a direct inquiry below or reach out via official channels."*
   - Form Fields:
     - *"Nama Lengkap / Dari Siapa"* $\rightarrow$ *"Full Name / Organization"* (placeholder: `e.g. Alex Mercer / Tech Corp`)
     - *"Alamat Email Anda"* $\rightarrow$ *"Email Address"* (placeholder: `alex@domain.com`)
     - *"Topik / Kebutuhan Proyek"* $\rightarrow$ *"Project Scope / Inquiry Topic"*
     - Select Options:
       - `Fullstack & Distributed Systems Engineering`
       - `Multi-Tenant Automation & Bot Infrastructure`
       - `GraphRAG & Knowledge Retrieval Architectures`
       - `Engineering Role / Internship Opportunities`
       - `General Technical Consultation`
     - *"Pesan Anda"* $\rightarrow$ *"Message"* (placeholder: `Describe your system constraints, project scope, or collaboration goals...`)
     - Button: *"Send Message"* (Loading: *"Transmitting..."*)
     - Status Feedback: *"Your message has been delivered directly. Anthony will respond within 24 hours."*
     - Badges: *"Fast turnaround within 24h"*, *"Direct encrypted delivery"*.
2. **Backend API Route (`src/app/api/contact/route.ts`):**
   - Standarisasi pesan JSON respon error & success ke dalam bahasa Inggris yang presisi.

---

### Phase 4: Penyempurnaan Tema & Visual Coherence (Dark Cyber-Editorial First)

#### Files Affected:
- `src/components/projects/ProjectsSection.tsx`
- `src/components/projects/VoidShowcaseDeck.tsx`
- `src/components/contact/ContactSection.tsx`
- `src/app/page.tsx`

#### Action Items:
1. Pastikan seluruh kartu proyek (baik VOID Downloader, MinjiBot, PinFas, scout-football, maupun Hot Dog) tampil menyatu dalam balutan dark canvas berkualitas tinggi, tidak ada kontras putih-hitam yang saling bertabrakan saat berpindah antar proyek.
2. Selaraskan `WaveDivider.tsx` dengan aksen merah cyber dan ambient lighting yang terkontrol agar tidak terjadi *color noise* yang berlebihan.

---

### Phase 5: Penyempurnaan Kursor Kustom & Interaktivitas

#### Files Affected:
- `src/components/layout/CustomCursor.tsx`
- `src/app/globals.css`

#### Action Items:
1. Selesaikan isu *double cursor*: Sembunyikan default cursor secara terkontrol pada layar desktop saat custom cursor aktif, atau buat cursor dot minimalis elegan yang tidak menghalangi kursor sistem operasi.
2. Hapus micro-label 5px yang tidak terbaca; gantikan dengan efek magnetic subtle atau ring glow merah aksen yang halus (`#ef4444`).

---

### Phase 6: Verifikasi, Type Safety & Performance Testing

#### Action Items:
1. Jalankan `npx tsc --noEmit` untuk memastikan 0 error TypeScript.
2. Jalankan `npm run build` untuk memverifikasi Next.js App Router static/dynamic route generation berhasil 100%.
3. Lakukan verifikasi visual pada resolusi widescreen (1920x1080 dan lebih tinggi) untuk memastikan tidak ada lagi ruang kosong berlebihan di sisi kiri dan kanan.

---

## 3. Checklist & Execution Order

- [x] Simpan `PLAN.md` sebagai acuan utama eksekusi.
- [x] **Fase 1:** Terapkan `max-w-[1536px]` dan padding widescreen pada seluruh section (`Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Contact`, `WaveDivider`).
- [x] **Fase 2:** Perbaiki font stack di `src/app/globals.css` (hapus Arial override, aktifkan Geist Sans & Mono).
- [x] **Fase 3:** Terjemahkan `src/components/contact/ContactSection.tsx` dan `src/app/api/contact/route.ts` ke Bahasa Inggris profesional.
- [x] **Fase 4:** Harmonisasi kartu proyek di `ProjectsSection.tsx` agar visual serasi dengan `VoidShowcaseDeck.tsx`.
- [x] **Fase 5:** Poles `CustomCursor.tsx` untuk menghilangkan glitch cursor ganda.
- [x] **Fase 6:** Uji `npx tsc --noEmit` dan `npm run build`.
