#!/usr/bin/env node

/**
 * Post-build script: generates per-page OG images (1200×630) using @napi-rs/canvas.
 *
 * Each image shows:
 *   - Project/page title
 *   - Short description
 *   - "Reda Alalach" branding
 *   - Tag pills for project pages
 *
 * Output: dist/og/<route-slug>.png  (referenced by generate-static-pages.js)
 */

import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const OG_DIR = join(DIST, "og");

mkdirSync(OG_DIR, { recursive: true });

// ── Page definitions for OG images ────────────────────────────────────────
const pages = [
  // Homepage
  {
    slug: "home",
    title: "Reda Alalach",
    description: "Full-Stack Developer — Node.js, React, real-time systems",
    tags: [],
  },
  // Static pages
  {
    slug: "about",
    title: "About Me",
    description: "Full-stack developer specializing in Node.js, React, and real-time systems.",
    tags: [],
  },
  {
    slug: "cv",
    title: "Resume / CV",
    description: "Full-stack developer with experience in Node.js, Express, React, and MongoDB.",
    tags: [],
  },
  {
    slug: "projects",
    title: "All Projects",
    description: "Collaborative platforms, real-time systems, PWAs, and more.",
    tags: [],
  },
  // Project detail pages
  {
    slug: "projects-notesboard",
    title: "NotesBoard",
    description: "Collaborative notes & analytics platform with real-time editing.",
    tags: ["React", "Express", "MongoDB", "Yjs", "Socket.io"],
  },
  {
    slug: "projects-real-time-notifications",
    title: "Real-time Notifications",
    description: "Event-driven notification module with <50ms delivery.",
    tags: ["Socket.io", "Express", "JWT", "REST"],
  },
  {
    slug: "projects-alarm-clock",
    title: "Alarm Clock",
    description: "Lightweight PWA with recurring alarms and offline support.",
    tags: ["JavaScript", "HTML", "CSS", "PWA"],
  },
  {
    slug: "projects-portfolio-site",
    title: "Portfolio Site",
    description: "Performance-focused portfolio — Lighthouse 95+ / 100 / 100.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  // Case study pages
  {
    slug: "case-study-notesboard",
    title: "Case Study: NotesBoard",
    description: "Building conflict-free real-time editing with Yjs and Hocuspocus.",
    tags: ["React", "Yjs", "Hocuspocus", "MongoDB", "Socket.io"],
  },
  {
    slug: "case-study-real-time-notifications",
    title: "Case Study: Real-Time Notifications",
    description: "Engineering an event-driven notification system with zero breaking changes.",
    tags: ["Socket.io", "Express", "JWT", "MongoDB"],
  },
  {
    slug: "case-study-portfolio-site",
    title: "Case Study: Portfolio",
    description: "Engineering a high-performance portfolio with React 19 and Tailwind v4.",
    tags: ["React 19", "Tailwind v4", "Vite 7", "GitHub Actions"],
  },
];

// ── Colors ────────────────────────────────────────────────────────────────
const BG = "#030014";
const TEXT_PRIMARY = "#ffffff";
const TEXT_SECONDARY = "rgba(255, 255, 255, 0.65)";
const ACCENT = "#8b5cf6";
const ACCENT_LIGHT = "#a78bfa";
const TEAL = "#2dd4bf";
const TAG_BG = "rgba(139, 92, 246, 0.15)";
const TAG_BORDER = "rgba(139, 92, 246, 0.3)";
const TAG_TEXT = "#c4b5fd";

// ── Drawing helpers ───────────────────────────────────────────────────────
function drawRoundedRect(ctx, x, y, w, h, r) {
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

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function generateOGImage({ slug, title, description, tags }) {
  const W = 1200;
  const H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  // ── Background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // ── Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "rgba(139, 92, 246, 0.08)");
  grad.addColorStop(0.5, "rgba(0, 0, 0, 0)");
  grad.addColorStop(1, "rgba(45, 212, 191, 0.06)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // ── Decorative circles
  ctx.globalAlpha = 0.04;
  ctx.beginPath();
  ctx.arc(W - 150, 120, 200, 0, Math.PI * 2);
  ctx.fillStyle = ACCENT;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(100, H - 80, 150, 0, Math.PI * 2);
  ctx.fillStyle = TEAL;
  ctx.fill();
  ctx.globalAlpha = 1;

  // ── Top border accent line
  const topGrad = ctx.createLinearGradient(0, 0, W, 0);
  topGrad.addColorStop(0, ACCENT);
  topGrad.addColorStop(0.5, ACCENT_LIGHT);
  topGrad.addColorStop(1, TEAL);
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, 4);

  const PAD_X = 80;
  let y = 80;

  // ── "REDA ALALACH" label
  ctx.font = '600 13px "Arial", sans-serif';
  ctx.letterSpacing = "3px";
  ctx.fillStyle = ACCENT_LIGHT;
  ctx.fillText("REDA ALALACH", PAD_X, y);
  ctx.letterSpacing = "0px";
  y += 20;

  // ── Thin separator
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(PAD_X, y, W - PAD_X * 2, 1);
  y += 50;

  // ── Title
  ctx.font = 'bold 52px "Arial", sans-serif';
  ctx.fillStyle = TEXT_PRIMARY;
  const titleLines = wrapText(ctx, title, W - PAD_X * 2);
  for (const line of titleLines) {
    ctx.fillText(line, PAD_X, y);
    y += 64;
  }

  y += 12;

  // ── Description
  ctx.font = '400 22px "Arial", sans-serif';
  ctx.fillStyle = TEXT_SECONDARY;
  const descLines = wrapText(ctx, description, W - PAD_X * 2);
  for (const line of descLines.slice(0, 2)) {
    ctx.fillText(line, PAD_X, y);
    y += 32;
  }

  // ── Tags at bottom
  if (tags.length > 0) {
    const tagY = H - 90;
    let tagX = PAD_X;

    ctx.font = '500 14px "Arial", sans-serif';
    for (const tag of tags) {
      const tw = ctx.measureText(tag).width + 24;
      const th = 32;

      // Tag background
      drawRoundedRect(ctx, tagX, tagY, tw, th, 6);
      ctx.fillStyle = TAG_BG;
      ctx.fill();

      // Tag border
      drawRoundedRect(ctx, tagX, tagY, tw, th, 6);
      ctx.strokeStyle = TAG_BORDER;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tag text
      ctx.fillStyle = TAG_TEXT;
      ctx.fillText(tag, tagX + 12, tagY + 21);

      tagX += tw + 10;
      if (tagX > W - PAD_X - 100) break; // avoid overflow
    }
  }

  // ── Bottom right: domain
  ctx.font = '400 16px "Arial", sans-serif';
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.textAlign = "right";
  ctx.fillText("remyportfolio.me", W - PAD_X, H - 40);
  ctx.textAlign = "left";

  // ── Bottom border accent
  const botGrad = ctx.createLinearGradient(0, 0, W, 0);
  botGrad.addColorStop(0, TEAL);
  botGrad.addColorStop(0.5, ACCENT_LIGHT);
  botGrad.addColorStop(1, ACCENT);
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, H - 4, W, 4);

  // ── Save
  const buf = canvas.toBuffer("image/png");
  const outPath = join(OG_DIR, `${slug}.png`);
  writeFileSync(outPath, buf);
  return `  ✔  /og/${slug}.png`;
}

// ── Main ────────────────────────────────────────────────────────────────────
let count = 0;
for (const page of pages) {
  console.log(generateOGImage(page));
  count++;
}
console.log(`\n✅  Generated ${count} OG image(s) in dist/og/\n`);
