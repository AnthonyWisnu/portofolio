import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const base = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4310";
const output = path.resolve(process.env.VERIFY_OUTPUT ?? "reports/portfolio-audit/final");
const slugs = ["kemitraan-mebel", "sora-wellness", "bali-smart-pricing", "pinfas", "hotdog-watersport", "void-downloader", "minjibot"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = { chrome: browser.version(), projects: [], errors: [] };
await fs.mkdir(output, { recursive: true });

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.on("pageerror", error => results.errors.push(error.message));
  for (const slug of slugs) {
    const response = await page.goto(`${base}/projects/${slug}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    const gallery = page.locator("figure button");
    const count = await gallery.count();
    assert.ok(count >= 3 && count <= 5, `${slug}: gallery count`);
    for (const image of await gallery.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
      const dimensions = await image.evaluate(img => ({ width: img.width, height: img.height, alt: img.alt, loading: img.loading }));
      assert.ok(dimensions.width > 0 && dimensions.height > 0 && dimensions.alt.length > 12);
    }
    const trigger = gallery.first();
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    assert.equal(await page.locator("html").evaluate(el => el.style.overflow), "hidden");
    await page.keyboard.press("ArrowRight");
    await dialog.getByText(`2 / ${count}`, { exact: true }).waitFor();
    await page.keyboard.press("ArrowLeft");
    await dialog.getByText(`1 / ${count}`, { exact: true }).waitFor();
    await page.keyboard.press("Shift+Tab");
    assert.ok(await dialog.locator("button").last().evaluate(el => el === document.activeElement));
    await page.keyboard.press("Tab");
    assert.ok(await dialog.locator("button").first().evaluate(el => el === document.activeElement));
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    assert.ok(await trigger.evaluate(el => el === document.activeElement));
    assert.notEqual(await page.locator("html").evaluate(el => el.style.overflow), "hidden");
    results.projects.push({ slug, status: response.status(), images: count, decoded: true, keyboardLightbox: true });
    if (slug === "kemitraan-mebel") {
      await page.screenshot({ path: path.join(output, "mebel-gallery-desktop.png") });
      await trigger.click();
      await dialog.waitFor();
      await dialog.locator("img").evaluate(img => img.decode());
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(output, "mebel-lightbox-desktop.png") });
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "detached" });
    }
  }
  const removed = await page.goto(`${base}/projects/scout-football`);
  assert.equal(removed.status(), 404);
  await page.goto(base, { waitUntil: "networkidle" });
  assert.ok(await page.locator("html").evaluate(el => el.classList.contains("lenis")));
  await page.screenshot({ path: path.join(output, "homepage-desktop.png") });
  const showcase = page.locator("#projects-showcase");
  await showcase.getByRole("tab", { name: "Riset & Pendukung (2)" }).click();
  assert.equal(await showcase.locator("article").count(), 2);
  await showcase.getByRole("tab", { name: "Proyek Utama (5)" }).click();
  assert.equal(await showcase.locator("article").count(), 5);
  await showcase.getByRole("tab", { name: "Semua (7)" }).click();
  assert.equal(await showcase.locator("article").count(), 7);
  await showcase.evaluate(el => window.scrollTo(0, el.offsetTop + el.offsetHeight - innerHeight));
  await page.waitForTimeout(400);
  const lastCard = await showcase.locator("article").last().boundingBox();
  assert.ok(lastCard.x >= 0 && lastCard.x + lastCard.width <= 1440, "Last desktop project reachable");
  results.projectFilters = true;
  results.lastDesktopProjectReachable = true;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(250);
  assert.ok(await page.locator("html").evaluate(el => !el.classList.contains("lenis")));
  const title = page.locator("#hero h1");
  assert.equal(await title.evaluate(el => getComputedStyle(el).opacity), "1");
  await showcase.locator("article").last().scrollIntoViewIfNeeded();
  assert.ok(await showcase.locator("article").last().isVisible());
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const mobilePage = await mobile.newPage();
  for (const route of ["/", "/projects/minjibot", "/projects/kemitraan-mebel"]) {
    await mobilePage.goto(`${base}${route}`, { waitUntil: "networkidle" });
    assert.ok(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow ${route}`);
  }
  await mobilePage.locator("figure button").first().click();
  const bounds = await mobilePage.getByRole("dialog").locator(":scope > div").boundingBox();
  assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= 844);
  await mobile.close();
  results.reducedMotion = true;
  results.mobileOverflow = false;
  assert.deepEqual(results.errors, []);
  await fs.writeFile(path.join(output, "verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results));
} finally {
  await browser.close();
}
