import { chromium } from "playwright";
import fs from "node:fs";

const dir = "/workspace/screenshots";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.getByRole("button", { name: /enter the substrate/i }).click();
await page.waitForFunction(() => typeof window.__setScene === "function");
await page.waitForTimeout(2800);

for (const i of [14, 22, 7, 11, 3, 12, 8]) {
  await page.evaluate((n) => window.__setScene(n), i);
  await page.waitForTimeout(1600);
  const title = await page.locator("h1").first().innerText();
  await page.screenshot({ path: `${dir}/fix-${String(i).padStart(2, "0")}.png` });
  console.log("shot", i, title, "canvas", await page.locator("canvas").count());
}

await page.evaluate(() => window.__setScene(22));
await page.waitForTimeout(400);
const worthy = page.getByRole("button", { name: /Worthy Emergence/i }).first();
if (await worthy.count()) await worthy.click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${dir}/fix-referee-worthy.png` });

await page.evaluate(() => window.__setScene(3));
await page.waitForTimeout(400);
const exp = page.getByRole("button", { name: /Explode/i }).first();
if (await exp.count()) await exp.click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${dir}/fix-nested-explode.png` });

const visBtn = page.getByRole("button", { name: /toggle 3d or 2d/i });
await visBtn.click();
await page.waitForTimeout(500);
console.log("after 2d canvas", await page.locator("canvas").count());
await page.screenshot({ path: `${dir}/fix-03-2d.png` });
await visBtn.click();
await page.waitForTimeout(1200);

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(600);
await mobile.getByRole("button", { name: /enter the substrate/i }).click();
await mobile.waitForTimeout(2800);
await mobile.screenshot({ path: `${dir}/fix-mobile.png` });
console.log("mobile canvas", await mobile.locator("canvas").count());
await mobile.evaluate(() => window.__setScene(7));
await mobile.waitForTimeout(1200);
await mobile.screenshot({ path: `${dir}/fix-mobile-built.png` });

await browser.close();
console.log("ERRORS", errors);
