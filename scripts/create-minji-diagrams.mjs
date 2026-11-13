import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const output = path.resolve("public/projects/minjibot");
const source = path.resolve("reports/portfolio-audit/minji-diagrams");
const colors = {
  bg: "#0b0d12",
  panel: "#141a27",
  stroke: "#2b354b",
  text: "#f3f4f6",
  muted: "#a1a8b8",
  blue: "#8da7ff",
  green: "#92d9b4",
};
const text = (x, y, value, size = 24, color = colors.text, weight = 400) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}">${value}</text>`;
const line = (x1, y1, x2, y2) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${colors.blue}" stroke-width="3" marker-end="url(#arrow)"/>`;
const node = (x, y, width, title, detail, accent = colors.blue) =>
  `<rect x="${x}" y="${y}" width="${width}" height="170" rx="14" fill="${colors.panel}" stroke="${colors.stroke}"/>${text(x + 28, y + 58, title, 29, accent, 600)}${text(x + 28, y + 108, detail, 22, colors.muted)}`;
const frame = (title, subtitle, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000"><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M1 1 L8 5 L1 9" fill="none" stroke="${colors.blue}" stroke-width="1.5"/></marker></defs><rect width="1600" height="1000" fill="${colors.bg}"/><g font-family="Segoe UI, Arial, sans-serif">${text(80, 130, title, 54, colors.text, 650)}${text(80, 188, subtitle, 26, colors.muted)}<path d="M80 230 H1520" stroke="${colors.stroke}"/>${content}<path d="M80 884 H1520" stroke="${colors.stroke}"/>${text(80, 938, "MinjiBot / Diagram penjelasan berdasarkan arsitektur kode, bukan screenshot aplikasi.", 22, colors.muted)}</g></svg>`;

const diagrams = [
  {
    name: "message-flow",
    svg: frame(
      "Alur pesan MinjiBot",
      "Dari koneksi WhatsApp hingga eksekusi perintah.",
      node(80, 300, 420, "WhatsApp / Baileys", "Menerima pesan dan event grup") +
        line(510, 385, 570, 385) +
        node(590, 300, 420, "Router dan pemeriksaan izin", "Memilih handler yang sesuai") +
        line(1020, 385, 1080, 385) +
        node(1100, 300, 420, "Eksekusi perintah", "Moderasi, utilitas, dan media") +
        line(800, 482, 800, 570) +
        node(80, 590, 420, "Konteks grup", "Sewa, peran, dan batas pakai", colors.green) +
        node(
          590,
          590,
          420,
          "PostgreSQL / Prisma",
          "Penyimpanan state dan transaksi",
          colors.green,
        ) +
        node(1100, 590, 420, "Respons ke pengguna", "Pesan atau hasil pemrosesan", colors.green),
    ),
  },
  {
    name: "group-lifecycle",
    svg: frame(
      "Siklus sewa per grup",
      "Status eksplisit untuk pengelolaan akses bot.",
      node(80, 340, 320, "PENDING", "Belum aktif") +
        line(410, 425, 443, 425) +
        node(455, 340, 320, "ACTIVE", "Sewa aktif", colors.green) +
        line(785, 425, 818, 425) +
        node(830, 340, 320, "EXPIRED", "Masa sewa berakhir") +
        line(1160, 425, 1193, 425) +
        node(1205, 340, 315, "REMOVED", "Status dihapus") +
        text(80, 640, "Setiap grup memiliki konteks sendiri.", 36, colors.text, 600) +
        text(
          80,
          700,
          "Peran, saldo, batas pakai, dan pengaturan moderasi mengikuti konteks grup.",
          27,
          colors.muted,
        ) +
        text(80, 758, "Pemeriksaan izin dilakukan sebelum perintah dijalankan.", 27, colors.muted),
    ),
  },
  {
    name: "media-pipeline",
    svg: frame(
      "Pipeline pemrosesan media",
      "Pengambilan, pengolahan, lalu pengiriman hasil.",
      node(80, 310, 420, "URL atau berkas", "Masukan dari perintah pengguna") +
        line(510, 395, 570, 395) +
        node(590, 310, 420, "Pengambilan media", "yt-dlp / gallery-dl") +
        line(1020, 395, 1080, 395) +
        node(1100, 310, 420, "Pengolahan lokal", "FFmpeg / Sharp") +
        line(1310, 490, 1310, 570) +
        node(80, 590, 420, "Video", "Pengolahan format media", colors.green) +
        node(590, 590, 420, "Audio", "Ekstraksi dan konversi audio", colors.green) +
        node(1100, 590, 420, "Gambar", "Pemrosesan dan komposisi", colors.green),
    ),
  },
];

await fs.mkdir(output, { recursive: true });
await fs.mkdir(source, { recursive: true });
for (const diagram of diagrams) {
  await fs.writeFile(path.join(source, `${diagram.name}.svg`), diagram.svg);
  await sharp(Buffer.from(diagram.svg))
    .webp({ quality: 92 })
    .toFile(path.join(output, `${diagram.name}.webp`));
  console.log(`Created ${diagram.name}.webp`);
}
