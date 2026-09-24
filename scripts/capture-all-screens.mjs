import { chromium } from "playwright-core";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.APP_URL || "http://localhost:8080";
const OUT_DIR = join(process.cwd(), "screenshots", "_tmp");
const PDF_PATH = join(process.cwd(), "TXL-Med-All-Screens.pdf");

mkdirSync(OUT_DIR, { recursive: true });

const shots = [];
let n = 0;

async function shot(page, title) {
  n += 1;
  const id = String(n).padStart(2, "0");
  const file = join(OUT_DIR, `${id}.png`);
  await page.waitForTimeout(450);
  await page.screenshot({ path: file, fullPage: true, animations: "disabled" });
  shots.push({ title: `${id}. ${title}`, file });
  console.log(`captured ${id} ${title}`);
}

async function goto(page, path) {
  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(350);
}

async function openAuthed(page, path) {
  await page.evaluate(() => {
    try {
      localStorage.setItem("txlmed:session", "u1");
      localStorage.setItem("txlmed:onboarded", "1");
    } catch {
      /* ignore */
    }
  });
  await goto(page, path);
  if (page.url().includes("/login")) {
    await page.getByRole("button", { name: "Log In" }).click();
    await page.waitForTimeout(700);
    if (!page.url().includes(path.split("?")[0])) {
      await goto(page, path);
      if (page.url().includes("/login")) {
        await page.getByRole("button", { name: "Log In" }).click();
        await page.waitForTimeout(700);
      }
    }
  }
}

async function login(page) {
  await goto(page, "/login");
  await page.getByPlaceholder("you@email.com or (512) 555-0148").fill("jordan@txlmed.com");
  await page.locator('input[type="password"]').fill("Driver1");
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForURL("**/home", { timeout: 8000 });
}

async function main() {
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);

  // 1. Splash → onboarding
  await goto(page, "/");
  await shot(page, "Splash");
  await page.waitForURL("**/onboarding", { timeout: 5000 }).catch(() => goto(page, "/onboarding"));

  await shot(page, "Onboarding — slide 1");
  await page.getByRole("button", { name: "Next" }).click();
  await shot(page, "Onboarding — slide 2");
  await page.getByRole("button", { name: "Next" }).click();
  await shot(page, "Onboarding — slide 3");
  await page.getByRole("button", { name: "Get Started" }).click();
  await page.waitForURL("**/login", { timeout: 8000 });

  await shot(page, "Login");

  await page.getByRole("link", { name: "Forgot Password?" }).click();
  await shot(page, "Forgot password — request code");
  await page.getByRole("button", { name: "Send reset code" }).click();
  await shot(page, "Forgot password — new password");

  await goto(page, "/register");
  await shot(page, "Register");

  await goto(page, "/verify");
  await shot(page, "Verify email");

  await goto(page, "/terms");
  await shot(page, "Terms of Service");
  await goto(page, "/privacy");
  await shot(page, "Privacy Policy");

  await login(page);
  await openAuthed(page, "/home");
  await shot(page, "Home");

  await openAuthed(page, "/home/service/dot-physical");
  await shot(page, "Service — DOT Physical");
  await openAuthed(page, "/home/service/dot-renewal");
  await shot(page, "Service — DOT Recertification");
  await openAuthed(page, "/home/service/fleet-dot");
  await shot(page, "Service — Fleet / On-Site");

  await openAuthed(page, "/notifications");
  await shot(page, "Notifications");
  await openAuthed(page, "/notifications/n1");
  await shot(page, "Notification detail — Visit confirmed");
  await openAuthed(page, "/notifications/n2");
  await shot(page, "Notification detail — What to bring");
  await openAuthed(page, "/notifications/n3");
  await shot(page, "Notification detail — Certificate reminder");

  await openAuthed(page, "/chat");
  await shot(page, "Chat inbox");
  await openAuthed(page, "/chat/c1");
  await shot(page, "Chat — Scheduling");
  await openAuthed(page, "/chat/c2");
  await shot(page, "Chat — Examiner");
  await openAuthed(page, "/chat/c3");
  await shot(page, "Chat — Support");

  await openAuthed(page, "/book");
  await page.getByText("Choose the exam you need").waitFor({ timeout: 8000 });
  await shot(page, "Book — select service");
  await page.getByRole("heading", { name: "DOT Physical" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await shot(page, "Book — date & time");
  const future = new Date();
  future.setDate(future.getDate() + 6);
  const dayNum = String(future.getDate());
  const dayBtn = page
    .locator("button")
    .filter({ hasText: new RegExp(`^${dayNum}$`) })
    .filter({ hasNot: page.locator("[disabled], [aria-disabled='true']") })
    .last();
  if (await dayBtn.count()) {
    await dayBtn.click();
  } else {
    await page.locator("[data-day]:not([disabled])").nth(6).click();
  }
  await page.waitForTimeout(300);
  await page.getByRole("heading", { name: "Available times" }).waitFor();
  await page
    .locator("button.min-h-11.rounded-xl:not([disabled])")
    .filter({ hasNotText: /Back|Continue/ })
    .first()
    .click();
  await page.getByRole("button", { name: "Continue" }).click();
  await shot(page, "Book — location details");
  const fillByLabel = async (label, value) => {
    const input = page.getByLabel(label, { exact: true });
    if (await input.count()) {
      await input.fill(value);
      return;
    }
    await page.locator("label").filter({ hasText: label }).locator("input, textarea").first().fill(value);
  };
  await fillByLabel("On-site address", "1840 E Cesar Chavez St");
  await fillByLabel("City", "Austin");
  await fillByLabel("State", "TX");
  await fillByLabel("ZIP", "78702");
  await fillByLabel("Notes", "Yard gate code 4412.");
  await page.getByRole("button", { name: "Continue" }).click();
  await shot(page, "Book — review");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await page.waitForURL("**/book/confirmation**", { timeout: 10000 });
  await shot(page, "Book — confirmation");

  await openAuthed(page, "/appointments");
  await shot(page, "Appointments");
  await openAuthed(page, "/appointments/apt1");
  await shot(page, "Appointment detail — upcoming");
  await openAuthed(page, "/appointments/apt2");
  await shot(page, "Appointment detail — past");

  await openAuthed(page, "/profile");
  await shot(page, "Profile");
  await openAuthed(page, "/profile/edit");
  await shot(page, "Profile — edit");
  await openAuthed(page, "/profile/support");
  await shot(page, "Profile — support");

  await page.setViewportSize({ width: 1100, height: 800 });
  await goto(page, "/preview.html");
  await page.waitForTimeout(800);
  await shot(page, "Phone preview (/preview.html)");

  await browser.close();

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const body = await pdf.embedFont(StandardFonts.Helvetica);

  const cover = pdf.addPage([612, 792]);
  cover.drawRectangle({ x: 0, y: 0, width: 612, height: 792, color: rgb(0.106, 0.165, 0.267) });
  cover.drawText("TXL Med PLLC", { x: 56, y: 460, size: 28, font, color: rgb(1, 1, 1) });
  cover.drawText("Complete screen flow", { x: 56, y: 420, size: 18, font: body, color: rgb(0.75, 0.34, 0) });
  cover.drawText(`${shots.length} screens  ·  Mobile 390×844`, {
    x: 56,
    y: 390,
    size: 12,
    font: body,
    color: rgb(0.85, 0.87, 0.9),
  });
  cover.drawText(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), {
    x: 56,
    y: 368,
    size: 11,
    font: body,
    color: rgb(0.7, 0.73, 0.78),
  });

  for (const item of shots) {
    const bytes = readFileSync(item.file);
    const img = await pdf.embedPng(bytes);
    const maxW = 540;
    const maxH = 680;
    const scale = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const pagePdf = pdf.addPage([612, 792]);
    pagePdf.drawRectangle({ x: 0, y: 740, width: 612, height: 52, color: rgb(0.106, 0.165, 0.267) });
    pagePdf.drawText(item.title, { x: 28, y: 760, size: 12, font, color: rgb(1, 1, 1) });
    pagePdf.drawImage(img, { x: (612 - w) / 2, y: 40 + (680 - h) / 2, width: w, height: h });
  }

  writeFileSync(PDF_PATH, await pdf.save());
  rmSync(OUT_DIR, { recursive: true, force: true });
  console.log(`PDF written: ${PDF_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
