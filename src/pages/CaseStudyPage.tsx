import { Github, ArrowLeft, ExternalLink } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedCaseStudyBySlug } from "../data/case-studies";
import { getLocalizedProjectBySlug } from "../data/projects";
import Navbar from "../components/ui/Navbar";
import BackToTop from "../components/ui/BackToTop";
import SocialSidebar from "../components/ui/SocialSidebar";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const caseStudy = slug ? getLocalizedCaseStudyBySlug(slug, t) : undefined;
  const project = caseStudy ? getLocalizedProjectBySlug(caseStudy.projectSlug, t) : undefined;

  // Inject JSON-LD structured data for SEO
  useEffect(() => {
    if (!caseStudy || !project) return;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: caseStudy.title,
      description: caseStudy.subtitle,
      author: {
        "@type": "Person",
        name: "Reda Alalach",
        url: "https://remyportfolio.me",
      },
      about: {
        "@type": "SoftwareApplication",
        name: project.title,
        ...(project.liveUrl && { url: project.liveUrl }),
      },
      keywords: project.tags.join(", "),
      datePublished: `${project.year}-01-01`,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "casestudy-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById("casestudy-jsonld")?.remove();
    };
  }, [caseStudy, project]);

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

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
          <Link to="/#projects" viewTransition className="hover:underline transition-colors">
            {t("nav.projects")}
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          {project && (
            <>
              <Link
                to={`/projects/${project.slug}`}
                viewTransition
                className="hover:underline transition-colors"
              >
                {project.title}
              </Link>
              <span className="mx-2.5 opacity-60">/</span>
            </>
          )}
          <span>{t("caseStudy.breadcrumb")}</span>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <p className="uppercase tracking-[1px] text-[13px] text-foreground/70 mb-4 font-normal">
            {t("caseStudy.label")}
          </p>
          <h1
            className="font-bold text-foreground font-instrument-serif italic mb-4 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            {caseStudy.title}
          </h1>
          <p className="text-lg text-slate-700 dark:text-foreground/80 leading-relaxed max-w-187.5">
            {caseStudy.subtitle}
          </p>
          {project?.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              {t("caseStudy.viewSourceCode")}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </header>

        {/* At a Glance */}
        <section className="mb-14 rounded-2xl bg-foreground/[0.03] ring-1 ring-foreground/10 overflow-hidden">
          {/* Header bar */}
          <div className="px-6 sm:px-8 py-4 border-b border-foreground/8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            <h2 className="text-sm font-semibold text-foreground/90 uppercase tracking-[0.12em]">
              {t("caseStudy.atAGlance")}
            </h2>
          </div>

          <div className="px-6 sm:px-8 py-6 sm:py-8">
            {/* Key highlights */}
            <ul className="space-y-3 mb-8">
              {caseStudy.tldr.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-teal-500"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5 4.5L6.5 11.5L2.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            {/* Metadata grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-foreground/8">
              <div>
                <p className="text-[11px] font-medium text-foreground/40 uppercase tracking-[0.15em] mb-2">
                  {t("caseStudy.stack")}
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">{caseStudy.tldr.stack}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-foreground/40 uppercase tracking-[0.15em] mb-2">
                  {t("caseStudy.role")}
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">{caseStudy.tldr.role}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-foreground/40 uppercase tracking-[0.15em] mb-2">
                  {t("caseStudy.keyResults")}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {caseStudy.tldr.results.map((r, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Context section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t("caseStudy.context")}</h2>
          <p className="text-base text-slate-700 dark:text-foreground/85 leading-[1.8]">
            {caseStudy.context}
          </p>
        </section>

        {/* Constraints section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t("caseStudy.constraints")}</h2>
          <ul className="space-y-3">
            {caseStudy.constraints.map((constraint, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-700 dark:text-foreground/85 leading-relaxed"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-400 shrink-0" />
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t("caseStudy.architecture")}</h2>
          <div className="space-y-6">
            {caseStudy.architectureSections.map((section, i) => (
              <div
                key={i}
                className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/10 p-6"
              >
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">
                  {section.heading}
                </h3>
                <p className="text-sm text-slate-700 dark:text-foreground/80 leading-[1.8]">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sequence Diagram (if available) */}
        {caseStudy.sequenceDiagram && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("caseStudy.notificationFlow")}
            </h2>
            <div className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/10 p-6 overflow-x-auto">
              <pre className="text-sm text-foreground/70 leading-relaxed font-mono whitespace-pre">
                {caseStudy.sequenceDiagram}
              </pre>
            </div>
            <p className="text-xs text-foreground/70 mt-2">
              {t("caseStudy.mermaidHint")}{" "}
              <a
                href="https://mermaid.live"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground/60"
              >
                mermaid.live
              </a>{" "}
              {t("caseStudy.mermaidHintAction")}
            </p>
          </section>
        )}

        {/* Key Decisions */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t("caseStudy.keyDecisions")}</h2>
          <div className="space-y-6">
            {caseStudy.keyDecisions.map((decision, i) => (
              <div key={i} className="border-l-2 border-violet-400/40 pl-5">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {decision.question}
                </h3>
                <p className="text-sm text-slate-700 dark:text-foreground/75 leading-[1.8]">
                  {decision.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t("caseStudy.outcomes")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.outcomes.map((outcome, i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-50 dark:bg-foreground/3 ring-1 ring-foreground/10 p-5 text-center"
              >
                <p className="text-2xl font-bold text-violet-500 dark:text-violet-400 mb-1">
                  {outcome.value}
                </p>
                <p className="text-sm text-slate-600 dark:text-foreground/70">{outcome.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t("caseStudy.whatsNext")}</h2>
          <ul className="space-y-3">
            {caseStudy.nextSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-700 dark:text-foreground/85 leading-relaxed"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-foreground/30 shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer navigation */}
        <div className="pt-16 border-t border-foreground/12 mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 mb-16">
          <Link
            to={project ? `/projects/${project.slug}` : "/#projects"}
            viewTransition
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-transparent hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 dark:text-foreground/80 dark:bg-white/5 dark:border-white/10 dark:hover:border-purple-500 dark:hover:bg-purple-500/10 dark:hover:text-purple-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("caseStudy.backToProject")}
          </Link>

          <Link
            to="/#contact"
            viewTransition
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-transparent hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 dark:text-foreground/80 dark:bg-white/5 dark:border-white/10 dark:hover:border-purple-500 dark:hover:bg-purple-500/10 dark:hover:text-purple-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("caseStudy.startAProject")} &rsaquo;
          </Link>
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
