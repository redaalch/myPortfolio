import { Github, Linkedin, Mail, BookOpen } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProjectBySlug } from "../data/projects";
import Navbar from "../components/ui/Navbar";
import BackToTop from "../components/ui/BackToTop";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Inject JSON-LD structured data for SEO
  useEffect(() => {
    if (!project) return;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      author: {
        "@type": "Person",
        name: "Reda Alalach",
        url: "https://remyportfolio.me",
      },
      ...(project.repoUrl && { codeRepository: project.repoUrl }),
      ...(project.liveUrl && { url: project.liveUrl }),
      datePublished: `${project.year}-01-01`,
      keywords: project.tags.join(", "),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "project-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById("project-jsonld")?.remove();
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      {/* ── Left social strip (hidden on mobile) ── */}
      <aside className="hidden lg:flex fixed left-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-5">
          <a
            href="https://github.com/redaalch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400/70 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/reda-alalach/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400/70 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:reda.alalach@gmail.com"
            className="text-violet-600 dark:text-violet-400/70 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="w-px h-24 bg-foreground/15" />
      </aside>

      {/* ── Right email strip (hidden on mobile) ── */}
      <aside className="hidden lg:flex fixed right-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <a
          href="mailto:reda.alalach@gmail.com"
          className="text-xs tracking-[0.18em] text-foreground/70 hover:text-violet-400 transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          reda.alalach@gmail.com
        </a>
        <div className="w-px h-24 bg-foreground/15" />
      </aside>

      {/* ── Main content ── */}
      <div className="max-w-300 mx-auto px-5 lg:px-12 pt-36 pb-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/80 mb-10">
          <Link to="/" viewTransition className="hover:underline transition-colors">
            Home
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <Link to="/#projects" viewTransition className="hover:underline transition-colors">
            Projects
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <span>{project.title}</span>
        </nav>

        {/* Hero section */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[1px] text-[13px] text-foreground/80 mb-4 font-normal">
            Featured Project
          </p>
          <h1
            className="font-bold text-teal-600 dark:text-teal-400 mb-6 leading-[1.2]"
            style={{ fontSize: "clamp(32px, 6vw, 48px)" }}
          >
            {project.title}
          </h1>
          <p className="max-w-175 mx-auto text-lg text-foreground/90 leading-[1.6]">
            {project.description}
          </p>

          <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mt-10 mb-4">
            Technologies Used:
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded text-xs font-medium bg-foreground/8 text-foreground/90 uppercase tracking-[0.5px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project preview image */}
        <div className="mb-20">
          <div
            className={`rounded-2xl bg-linear-to-br ${project.color} p-4 md:p-6 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] max-w-200 mx-auto`}
          >
            <div className="h-72 md:h-112 rounded-xl bg-white/10 overflow-hidden flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-white/60 px-8">
                  <p className="text-sm uppercase tracking-widest mb-3">Project Preview</p>
                  <p className="text-3xl md:text-5xl font-bold">{project.title}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About section */}
        <section className="mb-16">
          <h2 className="text-[32px] font-bold text-teal-600 dark:text-teal-400 mb-8">
            About This Project
          </h2>
          <div className="space-y-5">
            {project.about.map((paragraph, index) => (
              <p key={index} className="text-base text-foreground/90 leading-[1.8]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Case Study CTA */}
        {project.hasCaseStudy && (
          <section className="mb-16">
            <Link
              to={`/case-study/${project.slug}`}
              viewTransition
              className="flex items-center justify-between gap-4 rounded-xl bg-violet-500/10 ring-1 ring-violet-400/30 p-6 hover:bg-violet-500/15 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-violet-400 shrink-0" />
                <div>
                  <p className="text-base font-semibold text-foreground">Read the Case Study</p>
                  <p className="text-sm text-foreground/70">
                    Architecture decisions, tradeoffs, and outcomes
                  </p>
                </div>
              </div>
              <span className="text-violet-400 group-hover:translate-x-1 transition-transform">
                &rsaquo;
              </span>
            </Link>
          </section>
        )}

        {/* Decorative dot */}
        <div className="flex justify-center my-16">
          <div className="w-8 h-8 rounded-full ring-1 ring-foreground/20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/30" />
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-16 border-t border-foreground/12 mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 mb-16">
          <Link
            to="/#projects"
            viewTransition
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded text-sm font-medium text-foreground/90 ring-1 ring-foreground/90 hover:bg-foreground/90 hover:text-background transition-all duration-300 hover:-translate-y-0.5"
          >
            &lsaquo; Back to All Projects
          </Link>

          <Link
            to="/#contact"
            viewTransition
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded text-sm font-medium text-foreground/90 ring-1 ring-foreground/90 hover:bg-foreground/90 hover:text-background transition-all duration-300 hover:-translate-y-0.5"
          >
            Start a Project &rsaquo;
          </Link>
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
