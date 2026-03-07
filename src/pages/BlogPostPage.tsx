import { useEffect, useState, type ComponentType, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/ui/Navbar";
import BackToTop from "../components/ui/BackToTop";
import SocialSidebar from "../components/ui/SocialSidebar";
import TableOfContents from "../components/ui/TableOfContents";
import { getBlogPosts, getBlogPostBySlug, type BlogPost } from "../data/blog";
import "../pages/blog-post.css";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === "fr" ? "fr" : "en") as "en" | "fr";

  const [post, setPost] = useState<BlogPost | null>(null);
  const [MdxContent, setMdxContent] = useState<ComponentType | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Load post data + adjacent posts
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    (async () => {
      const [foundPost, allPosts] = await Promise.all([
        getBlogPostBySlug(slug, lang),
        getBlogPosts(lang),
      ]);

      if (cancelled) return;

      if (!foundPost) {
        setNotFound(true);
        return;
      }

      setPost(foundPost);

      // Load the MDX component
      const mod = await foundPost.load();
      if (cancelled) return;
      setMdxContent(() => mod.default);

      // Find prev/next
      const idx = allPosts.findIndex((p) => p.slug === slug);
      setPrevPost(idx < allPosts.length - 1 ? allPosts[idx + 1] : null);
      setNextPost(idx > 0 ? allPosts[idx - 1] : null);
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, lang]);

  // Inject JSON-LD structured data
  useEffect(() => {
    if (!post) return;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
        url: "https://remyportfolio.me",
      },
      keywords: post.tags.join(", "),
      url: `https://remyportfolio.me/blog/${post.slug}`,
      inLanguage: lang,
      ...(post.coverImage && {
        image: post.coverImage,
      }),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "blog-post-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById("blog-post-jsonld")?.remove();
    };
  }, [post, lang]);

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  const formattedDate = post
    ? new Date(post.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <SocialSidebar />

      <div className="max-w-225 mx-auto px-5 lg:px-12 pt-36 pb-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/80 mb-10 flex flex-wrap items-center gap-y-1">
          <Link to="/" viewTransition className="hover:underline transition-colors">
            {t("nav.home")}
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <Link to="/blog" viewTransition className="hover:underline transition-colors">
            {t("nav.blog")}
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <span className="text-foreground/60 truncate max-w-50">{post?.title ?? "..."}</span>
        </nav>

        {/* Loading state */}
        {!post || !MdxContent ? (
          <div className="flex justify-center py-32">
            <div className="size-8 border-2 rounded-full animate-spin border-foreground/20 border-t-purple-500" />
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <header className="mb-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide px-2.5 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 hover:bg-purple-500/15 transition-colors"
                  >
                    <Tag className="size-3" />
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1
                className="font-bold text-foreground font-instrument-serif italic mb-4 leading-[1.2]"
                style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
              >
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-700 dark:text-foreground/80 leading-relaxed max-w-187.5 mb-6">
                {post.description}
              </p>

              {/* Meta: date + reading time + author */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {formattedDate}
                </span>
                <span className="opacity-30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {post.readingTime} {t("blog.minRead")}
                </span>
                <span className="opacity-30">·</span>
                <span>{post.author}</span>
              </div>
            </header>

            {/* ── Cover image ── */}
            {post.coverImage && (
              <div className="mb-12 rounded-2xl overflow-hidden ring-1 ring-foreground/8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            )}

            {/* ── Layout: TOC sidebar + article ── */}
            <div className="flex gap-12">
              {/* Sticky TOC (desktop only) */}
              <aside className="hidden xl:block w-56 shrink-0">
                <div className="sticky top-28">
                  <p className="text-[11px] font-semibold text-foreground/40 uppercase tracking-[0.15em] mb-3">
                    {t("blog.tableOfContents")}
                  </p>
                  <TableOfContents contentSelector=".blog-prose" levels="h2, h3" />
                </div>
              </aside>

              {/* Article content */}
              <article className="blog-prose min-w-0 flex-1">
                <Suspense
                  fallback={
                    <div className="flex justify-center py-12">
                      <div className="size-6 border-2 rounded-full animate-spin border-foreground/20 border-t-purple-500" />
                    </div>
                  }
                >
                  <MdxContent />
                </Suspense>
              </article>
            </div>

            {/* ── Prev / Next navigation ── */}
            <nav className="mt-16 pt-8 border-t border-foreground/8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  viewTransition
                  className="group flex items-center gap-3 p-4 rounded-xl ring-1 ring-foreground/8 hover:ring-foreground/15 transition-all"
                >
                  <ChevronLeft className="size-5 text-foreground/40 group-hover:text-purple-500 transition-colors shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-foreground/40 uppercase tracking-wide">
                      {t("blog.prevPost")}
                    </span>
                    <p className="text-sm font-medium text-foreground/80 truncate mt-0.5">
                      {prevPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  viewTransition
                  className="group flex items-center justify-end gap-3 p-4 rounded-xl ring-1 ring-foreground/8 hover:ring-foreground/15 transition-all text-right"
                >
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-foreground/40 uppercase tracking-wide">
                      {t("blog.nextPost")}
                    </span>
                    <p className="text-sm font-medium text-foreground/80 truncate mt-0.5">
                      {nextPost.title}
                    </p>
                  </div>
                  <ChevronRight className="size-5 text-foreground/40 group-hover:text-purple-500 transition-colors shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </nav>

            {/* ── Back to blog ── */}
            <div className="mt-10 text-center">
              <Link
                to="/blog"
                viewTransition
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4" />
                {t("blog.backToBlog")}
              </Link>
            </div>
          </>
        )}
      </div>

      <BackToTop />
    </main>
  );
}
