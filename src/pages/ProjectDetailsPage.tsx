import { BookOpen, ExternalLink, Github } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedProjectBySlug } from "../data/projects";
import Navbar from "../components/ui/Navbar";
import BackToTop from "../components/ui/BackToTop";
import SocialSidebar from "../components/ui/SocialSidebar";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = slug ? getLocalizedProjectBySlug(slug, t) : undefined;

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
      <SocialSidebar />

      {/* ── Main content ── */}
      <div className="max-w-300 mx-auto px-5 lg:px-12 pt-36 pb-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/80 mb-10">
          <Link to="/" viewTransition className="hover:underline transition-colors">
            {t("nav.home")}
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <Link to="/#projects" viewTransition className="hover:underline transition-colors">
            {t("nav.projects")}
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <span>{project.title}</span>
        </nav>

        {/* Hero section */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[1px] text-[13px] text-foreground/80 mb-4 font-normal">
            {t("projects.featuredProjectLabel")}
          </p>
          <h1
            className="font-bold text-foreground font-instrument-serif italic mb-6 leading-[1.2]"
            style={{ fontSize: "clamp(32px, 6vw, 48px)" }}
          >
            {project.title}
          </h1>
          <p className="max-w-175 mx-auto text-lg text-foreground/90 leading-[1.6]">
            {project.description}
          </p>

          <h3 className="text-lg font-semibold text-purple-400 mt-10 mb-4">
            {t("projects.technologiesUsed")}
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

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-purple-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:bg-purple-500 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("projects.viewLiveApp")}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white/5 text-foreground/90 text-sm font-semibold border border-white/10 backdrop-blur-sm hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                {t("projects.viewSourceCode")}
              </a>
            )}
            {project.repoNote && !project.repoUrl && (
              <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white/5 text-foreground/50 text-sm font-medium border border-white/10">
                <Github className="w-4 h-4" />
                {project.repoNote}
              </span>
            )}
          </div>
        </div>

        {/* Project preview image */}
        <div className="mb-20">
          <div className="rounded-2xl bg-white/5 p-2 border border-white/10 max-w-200 mx-auto">
            <div className="h-72 md:h-112 rounded-xl overflow-hidden flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-white/60 px-8">
                  <p className="text-sm uppercase tracking-widest mb-3">
                    {t("projects.projectPreview")}
                  </p>
                  <p className="text-3xl md:text-5xl font-bold">{project.title}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About section */}
        <section className="mb-16">
          <h2 className="text-[32px] font-bold text-purple-400 mb-8">
            {t("projects.aboutThisProject")}
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
                  <p className="text-base font-semibold text-foreground">
                    {t("projects.readCaseStudy")}
                  </p>
                  <p className="text-sm text-foreground/70">{t("projects.caseStudySubtext")}</p>
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
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded-lg text-sm font-medium text-foreground/80 bg-white/5 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            &lsaquo; {t("projects.backToAllProjects")}
          </Link>

          <Link
            to="/#contact"
            viewTransition
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded-lg text-sm font-medium text-foreground/80 bg-white/5 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("projects.startAProject")} &rsaquo;
          </Link>
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
