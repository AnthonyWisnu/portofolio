import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";

// Keep authentication state and capture configuration outside the repository.
const configPath = process.argv[2];
if (!configPath) throw new Error("Usage: node scripts/capture-projects.mjs <capture-config.json>");
const config = JSON.parse(await fs.readFile(configPath, "utf8"));
const outputRoot = path.resolve(config.outputRoot ?? "public/projects");
const rawRoot = path.resolve(config.rawRoot);
await fs.mkdir(rawRoot, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const manifest = {};

async function act(page, action) {
  const target = action.selector ? page.locator(action.selector) : undefined;
  switch (action.type) {
    case "click":
      await target.click();
      break;
    case "fill":
      await target.fill(action.value);
      break;
    case "select":
      await target.selectOption(action.value);
      break;
    case "upload":
      await target.setInputFiles(action.file);
      break;
    case "scroll":
      await target.evaluate((el) => el.scrollIntoView({ block: "start" }));
      await page.evaluate((offset) => window.scrollBy(0, -offset), action.offset ?? 100);
      break;
    case "wait":
      await target.waitFor({ state: action.state ?? "visible" });
      break;
    default:
      throw new Error(`Unsupported capture action: ${action.type}`);
  }
}

try {
  for (const project of config.projects) {
    if (!/^[a-z0-9-]+$/.test(project.slug)) throw new Error("Invalid project slug");
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      storageState: project.storageState,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const destination = path.join(outputRoot, project.slug);
    await fs.mkdir(destination, { recursive: true });
    manifest[project.slug] = [];
    for (const shot of project.shots) {
      if (!/^[a-z0-9-]+$/.test(shot.name)) throw new Error("Invalid screenshot name");
      const raw = shot.fromFile ?? path.join(rawRoot, `${project.slug}-${shot.name}.png`);
      if (!shot.fromFile) {
        await page.goto(new URL(shot.path ?? "/", project.baseUrl).href, {
          waitUntil: "domcontentloaded",
        });
        for (const action of shot.actions ?? []) await act(page, action);
        if (shot.ready) await page.locator(shot.ready).waitFor();
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(800);
        await page.evaluate(async () => {
          await Promise.all(
            [...document.images]
              .filter((img) => {
                const r = img.getBoundingClientRect();
                return r.bottom > 0 && r.top < innerHeight;
              })
              .map((img) => img.decode().catch(() => {})),
          );
        });
        const broken = await page.evaluate(
          () =>
            [...document.images].filter((img) => {
              const r = img.getBoundingClientRect();
              return r.bottom > 0 && r.top < innerHeight && !img.naturalWidth;
            }).length,
        );
        if (broken)
          throw new Error(`${project.slug}/${shot.name}: ${broken} broken visible images`);
        await page.screenshot({ path: raw, mask: (shot.mask ?? []).map((s) => page.locator(s)) });
      }
      const filename = `${shot.name}.webp`;
      const info = await sharp(raw)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 86, effort: 6 })
        .toFile(path.join(destination, filename));
      manifest[project.slug].push({
        src: `/projects/${project.slug}/${filename}`,
        alt: shot.alt,
        caption: shot.caption,
        width: info.width,
        height: info.height,
        kind: shot.kind ?? "screenshot",
      });
      console.log(
        `Captured ${project.slug}/${shot.name}: ${info.width}x${info.height}, ${info.size} bytes`,
      );
    }
    await context.close();
  }
  await fs.writeFile(
    path.join(rawRoot, config.manifestName ?? "gallery-manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
} finally {
  await browser.close();
}
