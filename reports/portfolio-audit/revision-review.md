# Revisi galeri, konten, dan hero

## Dasar pemeriksaan konten

Label, deskripsi, dan daftar teknologi diperiksa ulang pada sumber berikut. Nama library dicocokkan dengan package.json atau requirements.txt; fungsi aplikasi diperiksa melalui kode serta runtime.

| Proyek | Bukti sumber | Isi yang dipertahankan |
| --- | --- | --- |
| Kemitraan Mebel | package.json, prisma/schema.prisma, halaman /exporter dan /umkm | Pesanan eksportir, penawaran PO, proses produksi, QC, bahan, dan HPP UMKM. |
| Sora Wellness | frontend/package.json, backend/package.json, frontend/src/features/customer/Dashboard.tsx, backend/src/membership dan booking | Reservasi kelas, dashboard member, kuota paket, e-ticket, dan pengelolaan studio. |
| PINFAS | package.json, supabase/migrations, src/pages pada clone sumber | Katalog fasilitas, pengajuan peminjaman, persetujuan, dan dokumen izin. |
| Hotdog Water Sport | package.json dan src pada CMS lokal terbaru | Katalog dwibahasa, keranjang pilihan WhatsApp, produk, media, dan konten CMS. |
| VOID Downloader | frontend/package.json, backend/package.json, kode backend pada tools/media-downloader | React, Express, masukan tautan, unggah video, konversi media, serta pembatasan proses. |
| Bali Smart Pricing | requirements.txt, app.py, README.md | Python, CatBoost, XGBoost, Random Forest, Streamlit, Plotly, dan SHAP. |
| MinjiBot V2 | package.json, README.md, src/commands/media/sticker.command.ts, menu, daily, dan profile | Perintah WhatsApp, moderasi, data per grup, klaim harian, profil, dan stiker. |

Profil pemilik juga dicocokkan dengan README publik repositori AnthonyWisnu/AnthonyWisnu: nama, peran, Universitas Udayana, sekolah, dan tautan kontak sesuai sumber tersebut. Detail pendidikan yang sudah diberikan pada data portofolio dipertahankan; tidak ditambah riwayat baru.

## Perbaikan istilah

- "Riset & AI" diganti "Data & Bot". Isinya tepat dua proyek: Bali Smart Pricing dan MinjiBot. Pratinjau SHAP yang menggandakan proyek pricing dihapus dari folder.
- Folder "Aplikasi Web" memuat lima aplikasi: Mebel, Sora, PINFAS, Hotdog, dan VOID. Jumlah folder serta kategori keahlian dihitung dari data.
- Istilah GraphRAG, Knowledge Graph, Neo4j, ChromaDB, dan FastAPI dihapus dari rangkuman fokus serta metadata situs karena bukan bagian dari tujuh proyek yang ditampilkan. Pricing tetap disebut machine learning sesuai model yang digunakan.
- Klaim "SaaS", "aplikasi produksi", angka fitur, presisi, serta uraian arsitektur yang berlebihan diganti uraian singkat yang langsung sesuai isi proyek.
- Semua folder, filter, badge kartu, dan halaman detail memakai istilah yang konsisten. Tidak ada kategori "Riset & AI" yang tersisa pada kode situs.

## Galeri dan asal gambar

- Mebel, lima gambar: dashboard eksportir, HPP UMKM, form penawaran eksportir, dashboard UMKM, produksi dan QC UMKM. Form contoh tidak dikirim. Masing-masing caption menyebut perannya.
- Sora, lima gambar: halaman studio, dashboard member, jadwal, ringkasan pengelola, pengelolaan sesi. Akun member menggunakan salinan database demo. Masa paket disesuaikan dan booking dihubungkan ke sesi mendatang yang sudah tersedia pada salinan, agar data tidak kedaluwarsa.
- MinjiBot, tiga ilustrasi WhatsApp: menu grup, konversi foto menjadi stiker, klaim harian dan profil. Dibuat dengan tool image_gen bawaan. Percakapan dan nama adalah contoh. Perintah .menu, .s, .daily, dan .profile dicocokkan dengan kode bot. Tampilan bukan dokumentasi pengguna nyata.
- Total galeri: 27 gambar. Gambar lain tetap dari pengambilan sebelumnya. Alt, caption, ukuran, dan jenis berada dalam src/data/projectGalleries.ts.

Prompt final dan file aset generatif dicatat pada generated-visuals.json. Hasil PNG asli tetap disimpan oleh tool pada direktori generated_images; berkas WebP yang dipakai situs disalin ke public/projects/minjibot dan public/images.

## Hero alam

Dua aset dedaunan dengan alpha transparan digunakan ulang menjadi empat lapisan di pinggir foto. Lapisan dekat bergeser hingga 260 px dan berputar saat scroll, sementara kanopi bergerak lebih pelan, membentuk efek membuka pandangan dari balik pepohonan. Pergerakan kamera pada foto dan cutout disamakan untuk menjaga posisi sosok tetap selaras. Gerak mengikuti progres scroll melalui transform dan opacity, tanpa loop animasi mandiri, blur, atau animasi layout. Dedaunan tidak dimuat pada perangkat sentuh. Desktop reduced motion menampilkan dua lapisan statis. Ukuran kedua aset sekitar 240 KB sebelum optimasi responsif Next Image.

## Verifikasi

- `npm run build` dan `npm run lint` lulus setelah versi hero empat lapisan selesai.
- `node scripts/verify-portfolio.mjs`: tujuh halaman HTTP 200, 27 gambar didekode, caption peran eksportir dan UMKM terverifikasi, dashboard member Sora ditemukan, dan ketiga gambar MinjiBot berlabel ilustrasi.
- Lightbox keyboard, pemulihan fokus, penguncian scroll, filter 7/5/2, dan kartu proyek terakhir lulus. Tidak ada page error.
- Reduced motion lulus; hero tampil statis dan dedaunan tidak dirender pada viewport sentuh. Tidak ada overflow horizontal pada viewport 390 x 844.
- Pemeriksaan visual: `revision/hero-foliage-desktop.png`, `revision/minjibot-gallery-desktop.png`, serta kedua screenshot Mebel. File `revision/verification.json` menyimpan hasil terstruktur.
- Pemindaian sumber teks tidak menemukan sisa label Riset & AI, GraphRAG, Knowledge Graph, Neo4j, ChromaDB, FastAPI, atau SaaS pada kode situs. Detail audit sumber tetap pada tabel di atas.

Pengukuran headless dan emulasi tidak menggantikan pemeriksaan perangkat fisik.

## Pengukuran performa revisi

Protokol tetap tiga percobaan, 52 wheel event, dan Chrome 157 headless. Angka berikut adalah median. Hasil mentah pada revision-performance.json dan pembandingan baseline pada revision-comparison.json.

| Mode dan ukuran | Baseline awal | Rilis sebelumnya | Revisi ini |
| --- | ---: | ---: | ---: |
| Desktop, P95 seluruh protokol | 20,7 ms | 7,1 ms | 7,4 ms |
| Desktop, P95 rentang scroll aktif | 20,8 ms | 7,1 ms | 7,3 ms |
| Desktop, long task seluruh protokol | 0 | 0 | 0 |
| Mobile CPU 4x, P95 seluruh protokol | 62,5 ms | 7,1 ms | 21,0 ms |
| Mobile CPU 4x, P95 rentang scroll aktif | 90,1 ms | 13,9 ms | 27,8 ms |
| Mobile CPU 4x, long task seluruh protokol | 30 | 0 | 6 |

Hasil desktop tetap mendekati rilis sebelumnya. Hasil emulasi mobile lebih lambat daripada pengukuran rilis sebelumnya, meskipun dedaunan tidak dimuat pada sentuh; penyebab perbedaan ini belum dipastikan. Tidak ada klaim bahwa semua perangkat bebas jank. Satu interval desktop 319,5 ms muncul pada percobaan pertama; dua percobaan berikutnya masing-masing memiliki maksimum 20,9 dan 20,7 ms. Angka ini adalah interval rAF, bukan FPS layar fisik.
