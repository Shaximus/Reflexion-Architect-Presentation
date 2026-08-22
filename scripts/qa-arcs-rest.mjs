import { chromium } from "playwright";
import fs from "node:fs";

const dir = "/workspace/screenshots";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const errors = [];

async function enter(page) {
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const btn = page.getByRole("button", { name: /enter the substrate/i });
  if (await btn.count()) {
    await btn.click();
    await page.waitForFunction(() => typeof window.__setScene === "function");
    await page.waitForTimeout(800);
  }
}

async function vis3d(page) {
  const btn = page.getByRole("button", { name: /toggle 3d or 2d/i });
  if (!(await btn.count())) return;
  const t = (await btn.innerText()).trim().toLowerCase();
  if (t !== "3d") await btn.click();
}

const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
desk.on("pageerror", (e) => errors.push(e.message));
await enter(desk);
await desk.evaluate(() => window.__setScene(6));
await vis3d(desk);
await desk.waitForTimeout(1400);

await desk.getByRole("button", { name: /^VEGETA$/ }).first().click();
await desk.waitForTimeout(700);
await desk.getByRole("button", { name: /Deep Dive/i }).click();
await desk.waitForTimeout(700);
await desk.screenshot({ path: `${dir}/arcs-07-dive.png` });
await desk.keyboard.press("Escape");
await desk.waitForTimeout(300);
await desk.getByRole("button", { name: /^Clear$/ }).click();
await desk.waitForTimeout(300);

await desk.getByRole("button", { name: /SUNG JIN-WOO/i }).first().click();
await desk.waitForTimeout(1100);
await desk.screenshot({ path: `${dir}/arcs-07-jinwoo.png` });
await desk.getByRole("button", { name: /^Clear$/ }).click();

const mode = desk.getByRole("button", { name: /toggle present or explore/i });
if (await mode.count()) {
  const t = (await mode.innerText()).trim().toLowerCase();
  if (t !== "explore") await mode.click();
}
await desk.getByRole("button", { name: /Show 2D diagram|toggle 3d or 2d/i }).first().click();
await desk.waitForTimeout(800);
await desk.screenshot({ path: `${dir}/arcs-07-2d.png` });
await desk.screenshot({ path: `${dir}/arcs-07-explore-2d.png` });

await vis3d(desk);
await desk.setViewportSize({ width: 1920, height: 1080 });
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
console.log("mobile", await mobile.locator("h1").first().innerText(), "canvas", await mobile.locator("canvas").count());

await browser.close();
console.log("ERRORS", errors);
