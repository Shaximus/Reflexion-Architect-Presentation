import { chromium } from "playwright";
import fs from "node:fs";

const dir = "/workspace/screenshots";
fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });

async function enter(page) {
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const btn = page.getByRole("button", { name: /enter the substrate/i });
  if (await btn.count()) {
    await btn.click();
    await page.waitForFunction(() => typeof window.__setScene === "function");
    await page.waitForTimeout(600);
  }
}

async function shootAll(page, prefix, w, h) {
  await page.setViewportSize({ width: w, height: h });
  for (let i = 0; i < 25; i++) {
    await page.evaluate((n) => window.__setScene(n), i);
    await page.waitForTimeout(450);
    const title = await page.locator("h1").first().innerText();
    const file = `${dir}/${prefix}-${String(i).padStart(2, "0")}.png`;
    await page.screenshot({ path: file });
    console.log(prefix, i, title);
  }
}

const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desk.on("pageerror", (e) => console.log("PAGEERROR", e.message));
desk.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE", m.text());
});
await enter(desk);
await desk.screenshot({ path: `${dir}/rebuild-intro-skip.png` });
await shootAll(desk, "d1440", 1440, 900);

await desk.evaluate(() => window.__setScene(7));
await desk.waitForTimeout(400);
const node = desk.getByRole("button", { name: /BCC Engine/i }).first();
if (await node.count()) {
  await node.click();
  await desk.waitForTimeout(400);
}
await desk.screenshot({ path: `${dir}/interact-built.png` });
const dive = desk.getByRole("button", { name: /Deep Dive/i });
if (await dive.count()) {
  await dive.click();
  await desk.waitForTimeout(400);
  await desk.screenshot({ path: `${dir}/interact-detail.png` });
  await desk.keyboard.press("Escape");
}

await desk.evaluate(() => window.__setScene(22));
await desk.waitForTimeout(400);
const worthy = desk.getByText(/Worthy Emergence/i).first();
if (await worthy.count()) {
  await worthy.click();
  await desk.waitForTimeout(400);
}
await desk.screenshot({ path: `${dir}/interact-referee.png` });

await desk.setViewportSize({ width: 1920, height: 1080 });
for (const i of [0, 3, 7, 8, 11, 15, 22]) {
  await desk.evaluate((n) => window.__setScene(n), i);
  await desk.waitForTimeout(400);
  await desk.screenshot({ path: `${dir}/d1920-${String(i).padStart(2, "0")}.png` });
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (e) => console.log("MOBILE PAGEERROR", e.message));
await enter(mobile);
await shootAll(mobile, "m390", 390, 844);

await browser.close();
console.log("qa-rebuild done");
