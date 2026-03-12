#!/usr/bin/env node

/**
 * Generates a LinkedIn project thumbnail (1200×627) for the portfolio project.
 * Output: linkedin-thumbnail.png in the project root.
 */

import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "linkedin-thumbnail.png");

const W = 1200;
const H = 627;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// ── Colors ────────────────────────────────────────────────────────────────
const BG = "#030014";
const ACCENT = "#8b5cf6";
const ACCENT_LIGHT = "#a78bfa";
const TEAL = "#2dd4bf";
const TAG_BG = "rgba(139, 92, 246, 0.15)";
const TAG_BORDER = "rgba(139, 92, 246, 0.3)";
const TAG_TEXT = "#c4b5fd";

// ── Helpers ───────────────────────────────────────────────────────────────
function drawRoundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── Background ────────────────────────────────────────────────────────────
ctx.fillStyle = BG;
ctx.fillRect(0, 0, W, H);

// Gradient overlay
const grad = ctx.createLinearGradient(0, 0, W, H);
grad.addColorStop(0, "rgba(139, 92, 246, 0.10)");
grad.addColorStop(0.5, "rgba(0, 0, 0, 0)");
grad.addColorStop(1, "rgba(45, 212, 191, 0.08)");
ctx.fillStyle = grad;
ctx.fillRect(0, 0, W, H);

// Decorative circles
ctx.globalAlpha = 0.05;
ctx.beginPath();
ctx.arc(W - 120, 100, 220, 0, Math.PI * 2);
ctx.fillStyle = ACCENT;
ctx.fill();

ctx.beginPath();
ctx.arc(80, H - 60, 180, 0, Math.PI * 2);
ctx.fillStyle = TEAL;
ctx.fill();

ctx.beginPath();
ctx.arc(W / 2, H / 2, 300, 0, Math.PI * 2);
ctx.fillStyle = ACCENT;
ctx.fill();
ctx.globalAlpha = 1;

// Top accent line
const topGrad = ctx.createLinearGradient(0, 0, W, 0);
topGrad.addColorStop(0, ACCENT);
topGrad.addColorStop(0.5, ACCENT_LIGHT);
topGrad.addColorStop(1, TEAL);
ctx.fillStyle = topGrad;
ctx.fillRect(0, 0, W, 4);

// Bottom accent line
const botGrad = ctx.createLinearGradient(0, 0, W, 0);
botGrad.addColorStop(0, TEAL);
botGrad.addColorStop(0.5, ACCENT_LIGHT);
botGrad.addColorStop(1, ACCENT);
ctx.fillStyle = botGrad;
ctx.fillRect(0, H - 4, W, 4);

const PAD_X = 80;
let y = 80;

// ── "REDA ALALACH" label ──────────────────────────────────────────────────
ctx.font = '600 14px "Arial", sans-serif';
ctx.letterSpacing = "4px";
ctx.fillStyle = ACCENT_LIGHT;
ctx.fillText("REDA ALALACH", PAD_X, y);
ctx.letterSpacing = "0px";
y += 22;

// Separator
ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
ctx.fillRect(PAD_X, y, W - PAD_X * 2, 1);
y += 55;

// ── Title ─────────────────────────────────────────────────────────────────
ctx.font = 'bold 56px "Arial", sans-serif';
ctx.fillStyle = "#ffffff";
ctx.fillText("My Portfolio", PAD_X, y);
y += 72;

// ── Subtitle ──────────────────────────────────────────────────────────────
ctx.font = '400 24px "Arial", sans-serif';
ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
ctx.fillText("Performance-focused personal portfolio — React 19, TypeScript,", PAD_X, y);
y += 34;
ctx.fillText("Tailwind CSS v4, Vite 7 · Lighthouse 95+ / 100 / 100 / 100", PAD_X, y);
y += 34;
ctx.fillText("Blog · Case Studies · i18n (EN/FR) · CI/CD · A11y", PAD_X, y);

// ── Tech tags ─────────────────────────────────────────────────────────────
const tags = [
  "React 19",
  "TypeScript",
  "Tailwind v4",
  "Vite 7",
  "Playwright",
  "GitHub Actions",
  "SEO",
  "A11y",
];

const tagY = H - 100;
let tagX = PAD_X;
ctx.font = '500 15px "Arial", sans-serif';

for (const tag of tags) {
  const tw = ctx.measureText(tag).width + 28;
  const th = 34;

  drawRoundedRect(tagX, tagY, tw, th, 7);
  ctx.fillStyle = TAG_BG;
  ctx.fill();

  drawRoundedRect(tagX, tagY, tw, th, 7);
  ctx.strokeStyle = TAG_BORDER;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = TAG_TEXT;
  ctx.fillText(tag, tagX + 14, tagY + 23);

  tagX += tw + 10;
  if (tagX > W - PAD_X - 80) break;
}

// ── Domain bottom-right ───────────────────────────────────────────────────
ctx.font = '400 16px "Arial", sans-serif';
ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
ctx.textAlign = "right";
ctx.fillText("remyportfolio.me", W - PAD_X, H - 40);
ctx.textAlign = "left";

// ── Save ──────────────────────────────────────────────────────────────────
writeFileSync(OUT, canvas.toBuffer("image/png"));
console.log(`\n✅  LinkedIn thumbnail saved to: linkedin-thumbnail.png (${W}×${H})\n`);
