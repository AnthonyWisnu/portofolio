import * as THREE from "three";

// Membentuk CanvasTexture resolusi 1200x1800 untuk kartu identitas 3D
// dengan palet Obsidian Charcoal (#0B0D12) dan aksen Slate Cobalt (#2F54EB).
export function buildDeveloperCardTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1800;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Latar belakang obsidian lembut
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1800);
  bgGrad.addColorStop(0, "#0b0d12");
  bgGrad.addColorStop(0.5, "#12151e");
  bgGrad.addColorStop(1, "#090b10");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 1800);

  // Kisi teknis halus cobalt
  ctx.strokeStyle = "rgba(47, 84, 235, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 1200; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1800);
    ctx.stroke();
  }
  for (let y = 0; y < 1800; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // Bingkai luar dan siku presisi
  ctx.strokeStyle = "rgba(89, 126, 247, 0.45)";
  ctx.lineWidth = 5;
  ctx.strokeRect(36, 36, 1128, 1728);

  ctx.strokeStyle = "#2f54eb";
  ctx.lineWidth = 12;
  const corners: [number, number, number, number, number, number][] = [
    [36, 120, 36, 36, 120, 36],
    [1164, 120, 1164, 36, 1080, 36],
    [36, 1680, 36, 1764, 120, 1764],
    [1164, 1680, 1164, 1764, 1080, 1764],
  ];
  for (const [x1, y1, x2, y2, x3, y3] of corners) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
  }

  // Header status teratas
  ctx.fillStyle = "#597ef7";
  ctx.font = "bold 26px monospace";
  ctx.fillText("AWJ // KARTU AKSES", 80, 100);

  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(1090, 92, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#9ca3af";
  ctx.font = "bold 22px monospace";
  ctx.fillText("TERVERIFIKASI", 860, 100);

  // Bingkai aperture foto potret
  ctx.strokeStyle = "rgba(89, 126, 247, 0.35)";
  ctx.lineWidth = 4;
  ctx.strokeRect(80, 140, 1040, 960);

  ctx.fillStyle = "#0d1017";
  ctx.fillRect(84, 144, 1032, 952);

  // Identitas pemilik
  ctx.fillStyle = "#f3f4f6";
  ctx.font = "900 66px sans-serif";
  ctx.fillText("ANTHONY WISNU JATI", 80, 1200);

  ctx.fillStyle = "#597ef7";
  ctx.font = "bold 30px monospace";
  ctx.fillText("FULLSTACK & SYSTEMS ENGINEER", 80, 1255);

  // Lencana latar belakang pendidikan
  const drawPill = (x: number, title: string, value: string) => {
    ctx.fillStyle = "#151924";
    ctx.fillRect(x, 1310, 500, 130);
    ctx.strokeStyle = "rgba(89, 126, 247, 0.28)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, 1310, 500, 130);

    ctx.fillStyle = "#597ef7";
    ctx.font = "bold 20px monospace";
    ctx.fillText(title, x + 30, 1355);

    ctx.fillStyle = "#f3f4f6";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(value, x + 30, 1405);
  };

  drawPill(80, "PERGURUAN TINGGI", "Universitas Udayana");
  drawPill(620, "ALUMNI", "SMAN 3 Klaten");

  // Barcode dekoratif teknis dan stempel domain
  ctx.fillStyle = "#e5e7eb";
  let bx = 80;
  const bars = [8, 3, 5, 10, 4, 6, 3, 8, 5, 4, 9, 3, 6, 10, 4, 3, 8, 5, 6, 10, 4, 3, 8, 9, 4, 5, 3, 10];
  for (const w of bars) {
    ctx.fillRect(bx, 1500, w, 76);
    bx += w + 7;
    if (bx > 640) break;
  }

  ctx.fillStyle = "#64748b";
  ctx.font = "bold 20px monospace";
  ctx.fillText("PROFIL SISTEM // IT-UNUD", 80, 1624);

  ctx.fillStyle = "#597ef7";
  ctx.font = "bold 36px monospace";
  ctx.fillText("anthonywj.my.id", 750, 1555);

  ctx.fillStyle = "#9ca3af";
  ctx.font = "20px monospace";
  ctx.fillText("PORTOFOLIO RESMI", 750, 1605);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
