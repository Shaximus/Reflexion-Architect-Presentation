import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push("PAGE " + e.message + "\n" + e.stack));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CON " + m.text());
});

await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.getByRole("button", { name: /enter the substrate/i }).click();
await page.waitForFunction(() => typeof window.__setScene === "function");
await page.waitForTimeout(2500);

for (const i of [14, 22, 7, 11, 3, 4, 8, 12, 15]) {
  errors.length = 0;
  await page.evaluate((n) => window.__setScene(n), i);
  await page.waitForTimeout(1500);
  const title = await page.locator("h1").first().innerText();
  const canvas = await page.locator("canvas").count();
  const vis = await page.getByRole("button", { name: /toggle 3d or 2d/i }).innerText();
  console.log("---", i, title, "canvas", canvas, "vis", vis.trim(), "errs", errors.length);
  if (errors.length) console.log(errors.join("\n\n"));
}

await browser.close();
