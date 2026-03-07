import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/ui/Navbar";
import DarkGradientBg from "../components/ui/DarkGradientBg";
import { useTheme } from "../hooks/useTheme";
import { getBlogPosts, getAllTags, type BlogPost } from "../data/blog";

/* ── Blog post card ─────────────────────────────────────────────────────────── */

function BlogPostCard({ post, isLight }: { post: BlogPost; isLight: boolean }) {
  const { t, i18n } = useTranslation();

  const formattedDate = new Date(post.date).toLocaleDateString(
    i18n.language === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <Link
      to={`/blog/${post.slug}`}
      viewTransition
      className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isLight
          ? "bg-white ring-1 ring-foreground/8 shadow-md hover:shadow-lg"
          : "bg-[#1a2535] ring-1 ring-white/6 hover:ring-white/12"
      }`}
    >
      {/* ── Cover image ── */}
      {post.coverImage ? (
        <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
          <img
            src={post.coverImage}
            alt={post.title}
            width={700}
            height={400}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div
          className={`h-2 w-full ${
            isLight
              ? "bg-linear-to-r from-purple-400 via-violet-400 to-indigo-400"
              : "bg-linear-to-r from-purple-500/60 via-violet-500/60 to-indigo-500/60"
          }`}
        />
      )}

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Meta row: date + reading time */}
        <div
          className={`flex items-center gap-3 text-[11px] font-medium ${
            isLight ? "text-foreground/45" : "text-white/40"
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3" />
            {formattedDate}
          </span>
          <span className="opacity-40">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {post.readingTime} {t("blog.minRead")}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-lg sm:text-xl font-bold mt-3 leading-snug transition-colors ${
            isLight
              ? "text-foreground group-hover:text-purple-600"
              : "text-white/90 group-hover:text-purple-400"
          }`}
        >
          {post.title}
        </h3>

        {/* Description */}
        <p
          className={`text-[13px] leading-relaxed mt-2 line-clamp-3 ${
            isLight ? "text-foreground/60" : "text-white/50"
          }`}
        >
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-medium uppercase tracking-wide px-2.5 py-1 rounded ${
                isLight ? "bg-foreground/6 text-foreground/70" : "bg-white/8 text-white/70"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <span
          className={`mt-auto pt-4 text-xs font-medium inline-flex items-center gap-1 transition-colors ${
            isLight
              ? "text-purple-600 group-hover:text-purple-700"
              : "text-purple-400/80 group-hover:text-purple-300"
          }`}
        >
          {t("blog.readMore")} →
        </span>
      </div>
    </Link>
  );
}

/* ── Tag filter bar ─────────────────────────────────────────────────────────── */

function TagFilter({
  tags,
  activeTag,
  onTagClick,
  isLight,
}: {
  tags: string[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
  isLight: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* "All" chip */}
      <button
        onClick={() => onTagClick(null)}
        className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
          activeTag === null
            ? isLight
              ? "bg-purple-600 text-white"
              : "bg-purple-500 text-white"
            : isLight
              ? "bg-foreground/6 text-foreground/70 hover:bg-foreground/10"
              : "bg-white/8 text-white/70 hover:bg-white/12"
        }`}
      >
        {t("blog.allPosts")}
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(activeTag === tag ? null : tag)}
          className={`inline-flex items-center gap-1 text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
            activeTag === tag
              ? isLight
                ? "bg-purple-600 text-white"
                : "bg-purple-500 text-white"
              : isLight
                ? "bg-foreground/6 text-foreground/70 hover:bg-foreground/10"
                : "bg-white/8 text-white/70 hover:bg-white/12"
          }`}
        >
          <Tag className="size-3" />
          {tag}
        </button>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────────── */

export default function BlogListPage() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isLight = theme === "light";
  const lang = (i18n.language === "fr" ? "fr" : "en") as "en" | "fr";

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getBlogPosts(lang), getAllTags(lang)]).then(([fetchedPosts, fetchedTags]) => {
      if (cancelled) return;
      setPosts(fetchedPosts);
      setTags(fetchedTags);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [lang]);

  const filteredPosts = activeTag
    ? posts.filter((p) => p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()))
    : posts;

  // Inject JSON-LD structured data
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Blog — Reda Alalach",
      description: t("blog.description"),
      url: "https://remyportfolio.me/blog",
      author: {
        "@type": "Person",
        name: "Reda Alalach",
        url: "https://remyportfolio.me",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "blog-list-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById("blog-list-jsonld")?.remove();
    };
  }, [t]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <DarkGradientBg />
      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-12 lg:px-12">
        {/* ── Breadcrumb ── */}
        <nav className="mb-10 flex items-center gap-3 text-sm text-foreground/70">
          <Link
            to="/"
            viewTransition
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            {t("nav.home")}
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground/80">{t("nav.blog")}</span>
        </nav>

        {/* ── Heading ── */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent font-instrument-serif italic">
            {t("blog.title")}
          </h1>
          <p className="mt-4 text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("blog.description")}
          </p>
        </div>

        {/* ── Tag filter ── */}
        {tags.length > 0 && (
          <div className="mb-10">
            <TagFilter
              tags={tags}
              activeTag={activeTag}
              onTagClick={setActiveTag}
              isLight={isLight}
            />
          </div>
        )}

        {/* ── Post grid ── */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div
              className={`size-8 border-2 rounded-full animate-spin ${
                isLight
                  ? "border-foreground/20 border-t-purple-600"
                  : "border-white/20 border-t-purple-400"
              }`}
            />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-foreground/50 text-lg">
              {activeTag ? t("blog.noPostsForTag") : t("blog.noPosts")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} isLight={isLight} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
