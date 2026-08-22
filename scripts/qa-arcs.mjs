import { chromium } from "playwright";
import fs from "node:fs";

const dir = "/workspace/screenshots";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ args: ["--no-sandbox"] });

async function enter(page) {
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const btn = page.getByRole("button", { name: /enter the substrate/i });
  if (await btn.count()) {
    await btn.click();
    await page.waitForFunction(() => typeof window.__setScene === "function");
    await page.waitForTimeout(900);
  }
}

async function vis3d(page) {
  const btn = page.getByRole("button", { name: /toggle 3d or 2d/i });
  if (await btn.count()) {
    const t = (await btn.innerText()).trim().toLowerCase();
    if (t !== "3d") await btn.click();
  }
}

const errors = [];
const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desk.on("pageerror", (e) => errors.push(e.message));
desk.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await enter(desk);
await desk.evaluate(() => window.__setScene(6));
await vis3d(desk);
await desk.waitForTimeout(1800);
await desk.screenshot({ path: `${dir}/arcs-07-3d.png` });
console.log("3d default", await desk.locator("h1").first().innerText());

await desk.getByRole("button", { name: /^VEGETA$/ }).first().click();
await desk.waitForTimeout(1200);
await desk.screenshot({ path: `${dir}/arcs-07-vegeta.png` });

const isolated = desk.getByRole("button", { name: /^Isolated$/ });
if (await isolated.count()) {
  await isolated.click();
  await desk.waitForTimeout(900);
  await desk.screenshot({ path: `${dir}/arcs-07-vegeta-isolated.png` });
}

const dive = desk.getByRole("button", { name: /Deep Dive/i });
if (await dive.count()) {
  await dive.click();
  await desk.waitForTimeout(700);
  await desk.screenshot({ path: `${dir}/arcs-07-dive.png` });
  await desk.keyboard.press("Escape");
  await desk.waitForTimeout(400);
}

await desk.getByRole("button", { name: /Sung Jin-Woo|JIN-WOO/i }).first().click();
await desk.waitForTimeout(1200);
await desk.screenshot({ path: `${dir}/arcs-07-jinwoo.png` });

const mode = desk.getByRole("button", { name: /toggle present or explore/i });
if (await mode.count()) {
  const t = (await mode.innerText()).trim().toLowerCase();
  if (t !== "explore") await mode.click();
}
await desk.waitForTimeout(400);
await desk.screenshot({ path: `${dir}/arcs-07-explore-3d.png` });

const vis = desk.getByRole("button", { name: /toggle 3d or 2d/i });
if (await vis.count()) await vis.click();
await desk.waitForTimeout(800);
await desk.screenshot({ path: `${dir}/arcs-07-2d.png` });
await desk.screenshot({ path: `${dir}/arcs-07-explore-2d.png` });

await desk.setViewportSize({ width: 1920, height: 1080 });
await vis3d(desk);
await desk.evaluate(() => window.__setScene(6));
await desk.waitForTimeout(1400);
await desk.screenshot({ path: `${dir}/arcs-07-1920.png` });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (e) => errors.push("m:" + e.message));
await enter(mobile);
await mobile.evaluate(() => window.__setScene(6));
await vis3d(mobile);
await mobile.waitForTimeout(1600);
await mobile.screenshot({ path: `${dir}/arcs-07-mobile.png` });
console.log("mobile h1", await mobile.locator("h1").first().innerText());
console.log("canvas", await mobile.locator("canvas").count());

await browser.close();
console.log("ERRORS", errors);
console.log("qa-arcs done");
