# Identitas Anthony Wisnu

Logo memakai inisial AW, sesuai nama Anthony Wisnu. Bentuk A dan W digambar terpisah agar terbaca pada ukuran kecil. Warna mengikuti aksen portofolio, #2F54EB, dengan huruf putih.

- anthony-wisnu-mark.svg: sumber vektor untuk penggunaan umum.
- anthony-wisnu-mark.png: versi PNG 512 x 512 dengan latar luar transparan.

Data bentuk bersama berada di src/data/brandMark.json. Navbar dan footer merender data yang sama. Jalankan `npm run assets:brand` setelah mengubah data untuk menyinkronkan SVG, PNG, favicon ICO 16/32/48 px, dan Apple icon 180 px.

Ikon memakai konvensi file metadata Next.js pada src/app/icon.svg, src/app/favicon.ico, serta src/app/apple-icon.png. URL metadata memiliki hash otomatis, sehingga ikon baru memiliki alamat berbeda dari ikon bawaan sebelumnya.

Verifikasi pada reports/portfolio-audit/brand/verification.json: semua ikon HTTP 200 dan berhasil didekode Chrome, navbar serta footer konsisten, keyboard focus dan viewport 390 px lulus, halaman detail mewarisi ikon baru, tidak ada page error. Build dan lint lulus.
