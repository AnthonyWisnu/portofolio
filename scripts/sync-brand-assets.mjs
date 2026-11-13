import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const mark = JSON.parse(await fs.readFile("src/data/brandMark.json", "utf8"));
const paths = mark.paths.map((d) => `<path d="${d}"/>`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}" width="48" height="48"><rect width="48" height="48" rx="${mark.radius}" fill="${mark.background}"/><g fill="none" stroke="${mark.foreground}" stroke-width="${mark.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${paths}</g></svg>`;
await fs.mkdir("public/brand", { recursive: true });
await fs.writeFile("public/brand/anthony-wisnu-mark.svg", svg + "\n");
await fs.writeFile("src/app/icon.svg", svg + "\n");
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile("src/app/apple-icon.png");
await sharp(Buffer.from(svg)).resize(512, 512).png().toFile("public/brand/anthony-wisnu-mark.png");

// ICO directory with PNG entries for legacy browser and shortcut support.
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (let index = 0; index < sizes.length; index++) {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
}
await fs.writeFile(path.resolve("src/app/favicon.ico"), Buffer.concat([directory, ...images]));
console.log("Synced AW mark, SVG icon, Apple icon, PNG logo, and 16/32/48px ICO.");
