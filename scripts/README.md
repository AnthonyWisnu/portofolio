# Pengambilan dan pemeriksaan gambar

Gunakan Chrome lokal. `playwright-core` dan `sharp` merupakan dependency pengembangan.

```powershell
node scripts/capture-projects.mjs C:/Temp/capture-config.json
node scripts/verify-portfolio.mjs
node scripts/measure-scroll.mjs
```

Salin `capture-projects.example.json` ke folder sementara sebelum menyesuaikan URL dan halaman. Semua capture otomatis memakai viewport desktop 1440 x 900, skala 1, font yang sudah dimuat, dan gambar yang sudah didekode. Gambar yang rusak di dalam viewport menggagalkan capture. Hasil WebP dan manifest ukuran disimpan ke lokasi pada konfigurasi.

Untuk halaman yang memerlukan login, tambahkan `storageState` pada entri proyek, berisi path berkas sesi Playwright di luar repositori. Lakukan login melalui akun demo pada database salinan. Jangan simpan password, token, sesi, atau konfigurasi privat di Git. `mask` menerima daftar selector informasi yang perlu disamarkan. `fromFile` dapat mengoptimasi screenshot asli yang sudah diambil dan diperiksa.

Action yang tersedia: `click`, `fill`, `select`, `upload`, `scroll`, dan `wait`. Gunakan selector antarmuka asli. Skrip tidak mengganti respons API atau membuat antarmuka palsu. Layar converter VOID memakai video sintetis milik sendiri, tanpa media pribadi.

Galeri MinjiBot memakai ilustrasi percakapan grup WhatsApp dari tool image_gen bawaan. Semua nama dan pesan merupakan contoh, dengan label "Ilustrasi penggunaan". Prompt dan path aset terpilih dicatat pada `reports/portfolio-audit/generated-visuals.json`. Diagram serta generator lama hanya menyimpan bukti versi audit awal dan tidak dipakai pada galeri.

Manifest akhir aplikasi terdapat di `src/data/projectGalleries.ts`. Urutan pertama menjadi sampul. Setiap gambar menyertakan alt, caption, width, height, dan jenis dokumentasi.

Pemeriksaan browser memakai `PORTFOLIO_URL` bila server berbeda dari `http://127.0.0.1:4310`. `VERIFY_OUTPUT` dan `AUDIT_OUTPUT` dapat menunjuk folder sementara untuk hasil pemeriksaan. Trace performa dapat dibuka melalui panel Performance Chrome DevTools. Pengukuran rAF pada Chrome headless bukan pengukuran FPS layar fisik.
