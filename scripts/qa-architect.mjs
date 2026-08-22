import { chromium } from "playwright";
import fs from "node:fs";

const dir = "/workspace/screenshots";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ args: ["--no-sandbox"] });

const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE", m.text());
});
await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${dir}/intro.png` });
await page.getByRole("button", { name: /enter the substrate/i }).click();
await page.waitForFunction(() => typeof window.__setScene === "function");
await page.waitForTimeout(1800);
await page.screenshot({ path: `${dir}/scene-00.png` });
console.log("s0", await page.locator("h1").first().innerText());

for (const [n, file] of [
  [1, "scene-01.png"],
  [3, "scene-03.png"],
  [4, "scene-04.png"],
  [7, "scene-07.png"],
  [11, "scene-11.png"],
  [16, "scene-16.png"],
  [23, "scene-23.png"],
]) {
  await page.evaluate((i) => window.__setScene(i), n);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${dir}/${file}` });
  console.log(file, await page.locator("h1").first().innerText());
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (e) => console.log("MOBILE PAGEERROR", e.message));
await mobile.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(1600);
await mobile.screenshot({ path: `${dir}/intro-mobile.png` });
await mobile.getByRole("button", { name: /enter/i }).click();
await mobile.waitForTimeout(2200);
await mobile.screenshot({ path: `${dir}/entered-mobile.png` });

await browser.close();
console.log("done");
