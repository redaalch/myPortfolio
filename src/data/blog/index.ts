import type { ComponentType } from "react";

/** Browser-safe reading-time estimate (words / 238 wpm, min 1 min). */
function estimateReadingTime(text: unknown): number {
  const str = typeof text === "string" ? text : "";
  const words = str.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 238));
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  description: string;
  coverImage?: string;
  author: string;
}

export interface BlogPost extends BlogFrontmatter {
  lang: "en" | "fr";
  readingTime: number; // minutes
  /** Lazy loader for the MDX component */
  load: () => Promise<{ default: ComponentType; frontmatter: BlogFrontmatter }>;
}

// ── MDX glob imports ───────────────────────────────────────────────────────────
// import.meta.glob is evaluated at build time — new .mdx files are auto-discovered.

type MDXModule = {
  default: ComponentType;
  frontmatter: BlogFrontmatter;
};

const enModules = import.meta.glob<MDXModule>("./posts/en/*.mdx");
const frModules = import.meta.glob<MDXModule>("./posts/fr/*.mdx");

// Raw text of each file for reading-time estimation (stripped at build time)
const enRaw = import.meta.glob("./posts/en/*.mdx", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;
const frRaw = import.meta.glob("./posts/fr/*.mdx", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

// ── Helpers ────────────────────────────────────────────────────────────────────

function slugFromPath(path: string): string {
  // "./posts/en/my-post.mdx" → "my-post"
  return path
    .split("/")
    .pop()!
    .replace(/\.mdx$/, "");
}

/**
 * Eagerly load frontmatter for every post so we can build the index page
 * without loading the full MDX content.
 *
 * We load the full module once just to read `frontmatter`, then discard it.
 * The component itself stays lazy via the `load` fn kept on each BlogPost.
 */
async function buildPostList(
  modules: Record<string, () => Promise<MDXModule>>,
  rawModules: Record<string, () => Promise<string>>,
  lang: "en" | "fr",
): Promise<BlogPost[]> {
  const entries = Object.entries(modules);

  const posts = await Promise.all(
    entries.map(async ([path, load]) => {
      const mod = await load();
      const rawLoad = rawModules[path];
      const raw = rawLoad ? await rawLoad() : "";

      return {
        ...mod.frontmatter,
        slug: mod.frontmatter.slug ?? slugFromPath(path),
        lang,
        readingTime: estimateReadingTime(raw),
        load,
      } satisfies BlogPost;
    }),
  );

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── Cached post lists ──────────────────────────────────────────────────────────

let enPostsCache: BlogPost[] | null = null;
let frPostsCache: BlogPost[] | null = null;

export async function getBlogPosts(lang: "en" | "fr" = "en"): Promise<BlogPost[]> {
  if (lang === "fr") {
    if (!frPostsCache) frPostsCache = await buildPostList(frModules, frRaw, "fr");
    return frPostsCache;
  }
  if (!enPostsCache) enPostsCache = await buildPostList(enModules, enRaw, "en");
  return enPostsCache;
}

export async function getBlogPostBySlug(
  slug: string,
  lang: "en" | "fr" = "en",
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts(lang);
  return posts.find((p) => p.slug === slug);
}

export async function getBlogPostsByTag(
  tag: string,
  lang: "en" | "fr" = "en",
): Promise<BlogPost[]> {
  const posts = await getBlogPosts(lang);
  return posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

export async function getAllTags(lang: "en" | "fr" = "en"): Promise<string[]> {
  const posts = await getBlogPosts(lang);
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return [...tagSet].sort();
}

/**
 * Return all unique slugs across both languages (useful for static page generation).
 */
export function getAllBlogSlugs(): string[] {
  const allPaths = [...Object.keys(enModules), ...Object.keys(frModules)];
  const slugs = new Set(allPaths.map(slugFromPath));
  return [...slugs];
}
