#!/usr/bin/env node

/**
 * Post-build script: generates RSS and Atom feeds from blog post MDX files.
 *
 * Reads frontmatter from all .mdx files in src/data/blog/posts/en/,
 * generates dist/rss.xml (RSS 2.0) and dist/atom.xml (Atom 1.0).
 *
 * English posts are used for the feed since RSS readers don't handle
 * multilingual feeds well. French readers can use the site directly.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Feed } from "feed";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const POSTS_DIR = join(ROOT, "src", "data", "blog", "posts", "en");
const BASE_URL = "https://remyportfolio.me";

/**
 * Extract YAML frontmatter from an MDX file.
 * Simple parser — handles the subset we use (string, string[], date).
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const yaml = match[1];
  const meta = {};

  for (const line of yaml.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Skip array continuation lines (e.g. "  - React")
    if (key.startsWith("-")) continue;

    // Strip quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Inline array: [tag1, tag2]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }

    meta[key] = value;
  }

  // Also collect array items (lines starting with "  - ")
  const tagLines = yaml.match(/tags:\s*\n((?:\s+-\s+.+\n?)+)/);
  if (tagLines) {
    meta.tags = tagLines[1]
      .split("\n")
      .map((l) => l.replace(/^\s*-\s*/, "").trim())
      .filter(Boolean)
      .map((s) => s.replace(/^["']|["']$/g, ""));
  }

  return meta;
}

// ── Main ───────────────────────────────────────────────────────────────────

if (!existsSync(DIST)) {
  console.log("⚠ dist/ not found — skipping RSS generation (run after vite build)");
  process.exit(0);
}

if (!existsSync(POSTS_DIR)) {
  console.log("⚠ No blog posts directory found — generating empty feed");
}

// Read all .mdx files
const mdxFiles = existsSync(POSTS_DIR)
  ? readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))
  : [];

const posts = mdxFiles
  .map((file) => {
    const content = readFileSync(join(POSTS_DIR, file), "utf-8");
    const fm = parseFrontmatter(content);
    if (!fm || !fm.title || !fm.slug) {
      console.warn(`⚠ Skipping ${file} — missing required frontmatter (title, slug)`);
      return null;
    }
    return {
      title: fm.title,
      slug: fm.slug,
      description: fm.description || "",
      date: new Date(fm.date || Date.now()),
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      author: fm.author || "Reda Alalach",
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.date.getTime() - a.date.getTime());

// Build the feed
const feed = new Feed({
  title: "Reda Alalach — Blog",
  description:
    "Thoughts on web development, architecture decisions, and lessons learned building real-world projects.",
  id: `${BASE_URL}/blog`,
  link: `${BASE_URL}/blog`,
  language: "en",
  image: `${BASE_URL}/og/home.png`,
  favicon: `${BASE_URL}/favicon.ico`,
  copyright: `© ${new Date().getFullYear()} Reda Alalach. All rights reserved.`,
  author: {
    name: "Reda Alalach",
    email: "reda.alalach@gmail.com",
    link: BASE_URL,
  },
  feedLinks: {
    rss2: `${BASE_URL}/rss.xml`,
    atom: `${BASE_URL}/atom.xml`,
  },
});

for (const post of posts) {
  feed.addItem({
    title: post.title,
    id: `${BASE_URL}/blog/${post.slug}`,
    link: `${BASE_URL}/blog/${post.slug}`,
    description: post.description,
    date: post.date,
    author: [{ name: post.author, link: BASE_URL }],
    category: post.tags.map((tag) => ({ name: tag })),
  });
}

// Write feeds
writeFileSync(join(DIST, "rss.xml"), feed.rss2());
writeFileSync(join(DIST, "atom.xml"), feed.atom1());

console.log(`✓ RSS feed generated — ${posts.length} post(s)`);
console.log(`  → dist/rss.xml`);
console.log(`  → dist/atom.xml`);
