import { chromium } from "playwright";
import fs from "node:fs";

const dir = "/workspace/screenshots";
fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const errors = [];

async function enter(page) {
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const btn = page.getByRole("button", { name: /enter the substrate/i });
  if (await btn.count()) {
    await btn.click();
    await page.waitForFunction(() => typeof window.__setScene === "function");
    await page.waitForTimeout(2800);
  }
}

function attach(page, tag) {
  page.on("pageerror", (e) => errors.push(`${tag} PAGEERROR ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${tag} CONSOLE ${m.text()}`);
  });
}

async function vis(page, mode) {
  await page.evaluate((m) => {
    const s = window.__ZSTORE;
  }, mode);
  const current = await page.evaluate(() => document.body.innerText.includes("\n3d\n") || document.body.innerText.match(/\b3d\b/i));
  const btn = page.getByRole("button", { name: /toggle 3d or 2d/i });
  if (await btn.count()) {
    const label = (await btn.innerText()).trim().toLowerCase();
    if (label !== mode) await btn.click();
  } else {
    const needed = mode === "3d" ? "v" : "v";
    const text = await page.locator("button").filter({ hasText: /^3d$|^2d$/i }).first();
    if (await text.count()) {
      const t = (await text.innerText()).trim().toLowerCase();
      if (t !== mode) await text.click();
    }
  }
  await page.waitForTimeout(mode === "3d" ? 1200 : 400);
}

const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
attach(desk, "desk");
await desk.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await desk.waitForTimeout(800);
await desk.screenshot({ path: `${dir}/dual-intro.png` });
await enter(desk);

const canvasAfterEnter = await desk.locator("canvas").count();
console.log("canvas after enter", canvasAfterEnter);

const key = [0, 3, 4, 7, 8, 11, 12, 14, 15, 22, 23];
for (const i of key) {
  await desk.evaluate((n) => window.__setScene(n), i);
  await vis(desk, "3d");
  await desk.waitForTimeout(700);
  const title = await desk.locator("h1").first().innerText();
  const canvases = await desk.locator("canvas").count();
  await desk.screenshot({ path: `${dir}/dual-${String(i).padStart(2, "0")}-3d.png` });
  console.log("3d", i, title, "canvas", canvases);
}

await desk.evaluate(() => window.__setScene(7));
await vis(desk, "3d");
await desk.waitForTimeout(600);
const compiler = desk.getByRole("button", { name: /Semantic Compiler/i }).first();
if (await compiler.count()) {
  await compiler.click();
  await desk.waitForTimeout(400);
}
await desk.screenshot({ path: `${dir}/dual-built-select.png` });
const dive = desk.getByRole("button", { name: /Deep Dive/i });
if (await dive.count()) {
  await dive.click();
  await desk.waitForTimeout(500);
  await desk.screenshot({ path: `${dir}/dual-dive-compiler.png` });
  await desk.keyboard.press("Escape");
}

await desk.evaluate(() => window.__setScene(15));
await vis(desk, "3d");
await desk.waitForTimeout(500);
const wisdom = desk.getByRole("button", { name: /Wisdom System/i }).first();
if (await wisdom.count()) {
  await wisdom.click();
  await desk.waitForTimeout(400);
}
const dive2 = desk.getByRole("button", { name: /Deep Dive/i });
if (await dive2.count()) {
  await dive2.click();
  await desk.waitForTimeout(500);
  await desk.screenshot({ path: `${dir}/dual-dive-wisdom.png` });
  await desk.keyboard.press("Escape");
}

await desk.evaluate(() => window.__setScene(3));
await vis(desk, "3d");
await desk.waitForTimeout(500);
const explode = desk.getByRole("button", { name: /Explode/i }).first();
if (await explode.count()) {
  await explode.click();
  await desk.waitForTimeout(700);
}
await desk.screenshot({ path: `${dir}/dual-nested-explode.png` });

await desk.evaluate(() => window.__setScene(11));
await vis(desk, "3d");
await desk.waitForTimeout(500);
const aBtn = desk.getByRole("button", { name: /^A$/ }).first();
if (await aBtn.count()) await aBtn.click();
await desk.waitForTimeout(500);
await desk.screenshot({ path: `${dir}/dual-fusion-a.png` });
const abBtn = desk.getByRole("button", { name: /^A\+B$/ }).first();
if (await abBtn.count()) await abBtn.click();
await desk.waitForTimeout(500);
await desk.screenshot({ path: `${dir}/dual-fusion-ab.png` });

await desk.evaluate(() => window.__setScene(22));
await vis(desk, "3d");
await desk.waitForTimeout(500);
const worthy = desk.getByRole("button", { name: /Worthy Emergence/i }).first();
if (await worthy.count()) await worthy.click();
await desk.waitForTimeout(700);
await desk.screenshot({ path: `${dir}/dual-referee-worthy.png` });

await vis(desk, "2d");
await desk.waitForTimeout(400);
const canvas2d = await desk.locator("canvas").count();
console.log("canvas after 2d toggle", canvas2d);
await desk.screenshot({ path: `${dir}/dual-22-2d.png` });

for (const i of [7, 15, 3]) {
  await desk.evaluate((n) => window.__setScene(n), i);
  await vis(desk, "2d");
  await desk.waitForTimeout(350);
  await desk.screenshot({ path: `${dir}/dual-${String(i).padStart(2, "0")}-2d.png` });
}

await desk.setViewportSize({ width: 1920, height: 1080 });
await vis(desk, "3d");
for (const i of [0, 3, 7, 11, 14, 15, 22]) {
  await desk.evaluate((n) => window.__setScene(n), i);
  await desk.waitForTimeout(600);
  await desk.screenshot({ path: `${dir}/dual-1920-${String(i).padStart(2, "0")}.png` });
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
attach(mobile, "mobile");
await enter(mobile);
const mCanvas = await mobile.locator("canvas").count();
console.log("mobile canvas", mCanvas);
await mobile.screenshot({ path: `${dir}/dual-mobile-entered.png` });
for (const i of [3, 7, 11, 22]) {
  await mobile.evaluate((n) => window.__setScene(n), i);
  await mobile.waitForTimeout(700);
  await mobile.screenshot({ path: `${dir}/dual-m-${String(i).padStart(2, "0")}.png` });
}

await browser.close();
console.log("ERRORS", errors);
console.log("qa-dual done");
