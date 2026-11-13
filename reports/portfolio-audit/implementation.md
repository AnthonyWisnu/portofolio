# Perbaikan portofolio, 13 November 2026

Catatan versi: laporan ini mencatat implementasi awal. Revisi berikutnya menambah POV member dan eksportir, mengganti diagram MinjiBot, memperbaiki kategori, dan menambah dedaunan hero. Lihat `revision-review.md` untuk hasil terbaru.

ScoutRAG dibatalkan sesuai konfirmasi pengguna. Daftar akhir berisi tujuh proyek, dengan Kemitraan Mebel dan Sora Wellness sebagai unggulan. Pengambilan gambar hanya desktop. Website tetap responsif.

## Animasi

| Bagian | Perbaikan |
| --- | --- |
| Smooth scroll | Lenis aktif pada desktop dengan pointer presisi. Scroll native digunakan pada sentuh dan reduced motion. Breakpoint serta perubahan preferensi ditangani tanpa reload. |
| Hero | Scroll langsung mengendalikan transform dan opacity, tanpa lapisan spring tambahan. Tampilan statis tetap terlihat pada reduced motion. |
| Portal tipografi | Menghapus cakram besar dan bayangan berat. Posisi huruf diukur dengan ResizeObserver. |
| Proyek horizontal | Menghapus spring yang menunda respons scroll. Filter mengembalikan posisi ke awal track. |
| Cursor dan tombol | Ukuran cursor dianimasikan dengan scale. Loop berhenti ketika diam. Magnetic button menyimpan pengukuran batas elemen. |
| Reveal, panel, dan galeri | Durasi dan easing bersama. Konten tersedia sebelum reveal. Lightbox mengunci scroll, menjaga fokus, mendukung panah serta Escape. |
| Detail proyek | Transisi masuk singkat berbasis transform dan opacity. Galeri berupa gambar datar dengan lightbox, tanpa efek 3D. |

Token di `src/config/motion.ts`: feedback 120 ms, hover 180 ms, panel 280 ms, reveal 520 ms, stagger 60 ms, scroll 900 ms. Easing UI `cubic-bezier(0.22, 1, 0.36, 1)`. Jarak umum 8, 16, dan 24 px. Gerak scroll hero serta portal mengikuti progres section.

Tidak ada library animasi produksi baru. Lenis dan Framer Motion menggunakan dependency yang sudah ada. Playwright Core dan Sharp ditambahkan sebagai alat pengembangan untuk capture, optimasi aset, serta pemeriksaan.

## Galeri terpilih

Semua screenshot aplikasi berukuran 1440 x 900. Diagram MinjiBot 1600 x 1000. Total 25 WebP, 1.798.890 byte, sekitar 1,80 MB sebelum optimasi responsif Next Image. Urutan pertama adalah sampul. Alt, caption, dimensi, dan jenis gambar terdapat di `src/data/projectGalleries.ts`.

| Proyek | Sampul dan urutan galeri | Alasan |
| --- | --- | --- |
| Kemitraan Mebel | HPP, dashboard UMKM, produksi dan QC, stok bahan | Mengutamakan kemampuan sistem bisnis, pengendalian biaya, dan operasional. |
| Sora Wellness | Halaman studio, jadwal kelas, dashboard, pengelolaan sesi | Menghubungkan pengalaman publik dan pengelolaan studio. |
| Bali Smart Pricing | Kalkulator, hasil prediksi, perbandingan model, SHAP | Menjelaskan masukan, keluaran, evaluasi, dan interpretasi model. Footer identitas pada hasil disamarkan. |
| PINFAS | Katalog, detail fasilitas, form pengajuan, manajemen aset | Menunjukkan alur warga dan peran pengelola pada backend lokal yang aktif. Gambar fasilitas bawaan seed tetap ditampilkan apa adanya. |
| Hotdog Water Sport | Beranda, detail Jet Ski, pustaka media CMS | Menampilkan website lokal terbaru, produk, dan CMS dengan foto dokumentasi asli. Tabel produk tidak dipilih karena kurang mewakili kualitas visual. |
| VOID Downloader | Downloader, converter dengan video contoh, dokumentasi | Memperlihatkan dua fungsi utama dan petunjuk aplikasi. Media contoh sintetis, tanpa data pribadi. Hasil pekerjaan konversi tidak dijadikan bukti dalam galeri. |
| MinjiBot V2 | Alur pesan, siklus sewa grup, pipeline media | Diagram berdasarkan kode, diberi label penjelasan. Tidak ada screenshot antarmuka yang direkayasa. |

Screenshot disimpan di `public/projects/<slug>/`. Gambar pertama eager; gambar lain lazy. Width dan height wajib pada tipe gambar untuk menjaga ruang layout. Lightbox menjaga rasio gambar tanpa crop.

## Asal data dan lingkungan

- Mebel dan Hotdog: salinan runtime serta database lokal terpisah. Akun capture memakai identitas demonstrasi. Hotdog menggunakan sumber CMS lokal terbaru dan foto pada dokumentasi proyek.
- Sora: frontend lokal dan backend dengan database demo terpisah. Nama serta email akun pada salinan disamarkan. Dashboard dapat menampilkan angka nol karena periode data demo, tidak diubah menjadi metrik rekaan.
- PINFAS: clone sementara, migrasi Supabase dan seed auth resmi dari repositori. Tidak mengganti API dengan stub. Tombol demo publik dihapus dari portofolio karena katalog publiknya gagal memuat data saat audit.
- Pricing: aplikasi Streamlit lokal dan model yang tersedia di proyek.
- VOID: demo `https://voiddl.my.id` yang aktif.
- MinjiBot: diagram SVG deterministik, dirender menjadi WebP melalui `scripts/create-minji-diagrams.mjs`.

Tidak ada perubahan sumber pada proyek asli lain. Runtime capture dan instance Supabase milik tugas sudah dihentikan. Salinan sementara, sesi privat, dan database demo tetap berada di lingkungan lokal, di luar repositori portofolio. Container database lain milik pengguna tidak dihentikan.

## Bukti pemeriksaan

- `npm run build`: berhasil, termasuk tujuh route detail statis.
- `npm run lint`: berhasil tanpa error.
- `node scripts/verify-portfolio.mjs`: tujuh route HTTP 200, 25 gambar berhasil didekode, alt terisi, lightbox keyboard/focus/scroll lock lulus, reduced motion lulus, tidak ada overflow pada viewport sentuh 390 x 844, tidak ada page error.
- Filter 7 keseluruhan, 5 utama, dan 2 pendukung lulus. Kartu terakhir dapat dicapai pada track desktop dan mode scroll native.
- Route ScoutRAG yang dibatalkan mengembalikan 404.
- `impeccable detect` pada UI yang diperbaiki: nol temuan mekanis. Ini bukan klaim audit aksesibilitas menyeluruh.
- Dimensi seluruh 25 berkas diverifikasi dengan metadata Sharp, sesuai manifest.
- `git diff --check`: lulus. Git hanya memberi pemberitahuan normalisasi line ending Windows.

Hasil browser: `final/verification.json`, `final/mebel-gallery-desktop.png`, dan `final/mebel-lightbox-desktop.png`. Pemeriksaan ponsel memakai emulasi Chrome, belum perangkat fisik.

## Performa

Chrome 157.0.8103.52 headless, production build. Tiga percobaan tiap mode. Desktop 1440 x 900; emulasi sentuh 390 x 844 dengan CPU 4x. Protokol sama: 52 wheel event, masing-masing 180 px dengan sela 85 ms. Ukuran di bawah adalah median dari tiga percobaan.

| Ukuran | Sebelum | Sesudah |
| --- | ---: | ---: |
| Desktop, P95 interval rAF seluruh protokol | 20,7 ms | 7,1 ms |
| Desktop, jumlah long task | 0 | 0 |
| Desktop, P95 selama rentang scroll aktif | 20,8 ms | 7,1 ms |
| Mobile CPU 4x, P95 seluruh protokol | 62,5 ms | 7,1 ms |
| Mobile CPU 4x, jumlah long task | 30 | 0 |
| Mobile CPU 4x, P95 selama rentang scroll aktif | 90,1 ms | 13,9 ms |

Halaman mobile menjadi lebih pendek setelah animasi desktop disederhanakan. Karena protokol tetap berjalan setelah mencapai dasar halaman, angka seluruh protokol mencakup waktu diam. Perbandingan rentang scroll aktif disertakan agar batas ini terlihat. Rentang aktif dihitung dari perubahan scrollY pertama sampai terakhir, bukan dari jumlah frame compositor.

Angka rAF tidak sama dengan FPS layar fisik. Sistem operasi dan beban mesin juga dapat memengaruhi hasil. Satu interval desktop 201,5 ms muncul pada percobaan pertama, meskipun tidak ada long task JavaScript; maksimum dua percobaan berikutnya masing-masing 13,9 ms. Pengukuran ini tidak membuktikan semua perangkat bebas frame terlambat.

Angka mentah: `baseline-performance.json`, `stage1-performance.json`, `final-performance.json`, dan `performance-comparison.json`. Trace Chrome dan sampel mentah tersimpan pada folder sementara tugas; `scripts/measure-scroll.mjs` dapat menghasilkannya kembali untuk dibuka pada tab Performance DevTools.

## Batas pemeriksaan

`npm audit` sebelumnya menandai dependency lama, termasuk Next.js 16.3.4 dengan tingkat critical. Upgrade framework tidak dilakukan dalam pekerjaan animasi dan galeri ini. Build dan lint yang lulus tidak menghapus temuan dependency tersebut. Tidak ada deployment atau commit yang dibuat.
