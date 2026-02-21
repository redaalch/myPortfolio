#!/usr/bin/env node

/**
 * Post-build script: generates static index.html files for every known SPA route.
 *
 * Why?  GitHub Pages returns 404 for paths that don't map to a real file.
 * The existing 404.html JS redirect works for browsers, but bots/crawlers see
 * a 404 status → bad SEO, broken unfurl previews, and a "feels broken" moment.
 *
 * This script copies dist/index.html into each route directory (e.g.
 * dist/case-study/notesboard/index.html) so GitHub Pages serves a 200 with
 * the correct content.  Each copy gets route-specific <title> and OG meta tags
 * for proper link previews.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const BASE_URL = "https://remyportfolio.me";

// ── Route definitions with per-route metadata ──────────────────────────────
const routes = [
  // Static pages
  {
    path: "about",
    title: "About — Reda Alalach",
    description:
      "Learn more about Reda Alalach — full-stack developer specializing in Node.js, React, and real-time systems.",
    ogImage: "og/about.png",
  },
  {
    path: "cv",
    title: "CV — Reda Alalach",
    description:
      "Resume / CV of Reda Alalach — full-stack developer with experience in Node.js, Express, React, and MongoDB.",
    ogImage: "og/cv.png",
  },
  {
    path: "projects",
    title: "Projects — Reda Alalach",
    description:
      "Browse all projects by Reda Alalach — collaborative platforms, real-time systems, PWAs, and more.",
    ogImage: "og/projects.png",
  },

  // Project detail pages
  {
    path: "projects/notesboard",
    title: "NotesBoard — Reda Alalach",
    description:
      "Collaborative notes & analytics platform with real-time editing. 10+ concurrent editors, <80ms sync, built with React, Express, MongoDB, and Yjs.",
    ogImage: "og/projects-notesboard.png",
  },
  {
    path: "projects/real-time-notifications",
    title: "Real-time Notifications — Reda Alalach",
    description:
      "Event-driven real-time notification module with <50ms delivery, JWT-authenticated WebSocket channels, and persistent history.",
    ogImage: "og/projects-real-time-notifications.png",
  },
  {
    path: "projects/alarm-clock",
    title: "Alarm Clock — Reda Alalach",
    description:
      "Lightweight PWA for daily alarms with recurring schedules, desktop notifications, offline support, and zero dependencies.",
    ogImage: "og/projects-alarm-clock.png",
  },
  {
    path: "projects/portfolio-site",
    title: "Portfolio Site — Reda Alalach",
    description:
      "Performance-focused portfolio built with React 19, TypeScript, Tailwind CSS v4. Lighthouse 95+ perf, 100 a11y, 100 SEO.",
    ogImage: "og/projects-portfolio-site.png",
  },

  // Case study pages
  {
    path: "case-study/notesboard",
    title: "Case Study: NotesBoard — Reda Alalach",
    description:
      "Deep dive into building a collaborative notes platform with conflict-free real-time editing using Yjs, Hocuspocus, and Socket.io.",
    ogImage: "og/case-study-notesboard.png",
  },
  {
    path: "case-study/real-time-notifications",
    title: "Case Study: Real-Time Notifications — Reda Alalach",
    description:
      "Engineering an event-driven notification system with Socket.io, JWT auth, and zero breaking changes to the existing API.",
    ogImage: "og/case-study-real-time-notifications.png",
  },
  {
    path: "case-study/portfolio-site",
    title: "Case Study: Portfolio Site — Reda Alalach",
    description:
      "Engineering a high-performance personal portfolio with React 19, Tailwind CSS v4, view transitions, and GitHub Pages deployment.",
    ogImage: "og/case-study-portfolio-site.png",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Replace <title>, meta description, og:title, og:description, og:url,
 * twitter:title, twitter:description, and canonical link in the HTML template.
 */
function injectMeta(html, { title, description, path, ogImage }) {
  const url = `${BASE_URL}/${path}`;
  const imageUrl = ogImage ? `${BASE_URL}/${ogImage}` : `${BASE_URL}/og-image.png`;

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escAttr(description)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escAttr(title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escAttr(description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${escAttr(url)}" />`,
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${escAttr(imageUrl)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${escAttr(title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escAttr(description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${escAttr(imageUrl)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escAttr(url)}" />`,
    );
}

function escHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

// ── Main ────────────────────────────────────────────────────────────────────

const templatePath = join(DIST, "index.html");
if (!existsSync(templatePath)) {
  console.error("❌  dist/index.html not found — run `vite build` first.");
  process.exit(1);
}

const template = readFileSync(templatePath, "utf-8");
let generated = 0;

for (const route of routes) {
  const dir = join(DIST, route.path);
  const filePath = join(dir, "index.html");

  mkdirSync(dir, { recursive: true });

  const html = injectMeta(template, route);
  writeFileSync(filePath, html, "utf-8");
  generated++;
  console.log(`  ✔  /${route.path}`);
}

console.log(`\n✅  Generated ${generated} static page(s) in dist/\n`);
