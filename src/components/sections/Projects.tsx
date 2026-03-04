import { Github, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTheme } from "../../hooks/useTheme";
import { getLocalizedProjects, type Project } from "../../data/projects";

/* ================================================================== */
/*  Alternating project row — reference: muhammadaamirmalik.com       */
/* ================================================================== */
function ProjectRow({
  project,
  index,
  isLight,
}: {
  project: Project;
  index: number;
  isLight: boolean;
}) {
  const isEven = index % 2 === 0; // even → text left / image right
  const { t } = useTranslation();

  /* ── Image element (reused in both layouts) ── */
  const image = project.image ? (
    <div className="group/img relative overflow-hidden rounded-xl">
      <img
        src={project.image}
        alt={project.title}
        width={700}
        height={438}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
      />
      <div className="absolute inset-0 bg-black/15 group-hover/img:bg-transparent transition-colors duration-500 rounded-xl" />
    </div>
  ) : (
    <div
      className={`w-full aspect-video rounded-xl bg-linear-to-br ${isLight ? project.lightColor : project.color} flex items-center justify-center`}
    >
      <span className={`text-2xl font-bold ${isLight ? "text-foreground/40" : "text-white/40"}`}>
        {project.title}
      </span>
    </div>
  );

  /* ── Desktop: two-column alternating layout ── */
  const imageBlock = (
    <div className="relative w-full lg:w-1/2 shrink-0 hidden lg:block">{image}</div>
  );

  const textBlock = (
    <div
      className={`relative w-full lg:w-1/2 flex flex-col justify-start z-10 ${isEven ? "lg:text-left" : "lg:text-right"}`}
    >
      {/* Mobile-only image banner */}
      <div className="lg:hidden rounded-xl overflow-hidden mb-4">{image}</div>

      {/* Featured label */}
      <span className={`text-xs tracking-wide ${isLight ? "text-purple-600" : "text-white/50"}`}>
        {t("projects.featuredProject")}
      </span>

      {/* Title */}
      <h3
        className={`text-2xl sm:text-3xl font-bold mt-1 leading-tight ${
          isLight ? "text-gray-900" : "text-white"
        }`}
      >
        {project.title}
      </h3>

      {/* Description — plain on mobile, frosted glass overlay on desktop */}
      <div className="relative mt-4 lg:rounded-lg lg:overflow-visible">
        <div
          className={`text-sm leading-relaxed ${
            isLight
              ? "text-slate-600 lg:p-5 lg:bg-white/80 lg:shadow-xl lg:shadow-purple-900/5 lg:border lg:border-purple-100/50 lg:backdrop-blur-md lg:rounded-lg"
              : "text-gray-300 lg:p-5 lg:bg-background/40 lg:backdrop-blur-md lg:border lg:border-white/10 lg:rounded-lg"
          } ${isEven ? "lg:-mr-14" : "lg:-ml-15 lg:text-left"}`}
        >
          {project.description}
        </div>
      </div>

      {/* Tags — pills */}
      <div className={`mt-4 flex flex-wrap gap-2 text-xs ${isEven ? "" : "lg:justify-end"}`}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 rounded-full font-medium ${
              isLight ? "bg-violet-100 text-violet-700" : "bg-purple-500/10 text-purple-300"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Repo note */}
      {project.repoNote && !project.repoUrl && (
        <span
          className={`text-[11px] italic mt-1.5 ${isLight ? "text-foreground/50" : "text-white/40"}`}
        >
          {project.repoNote}
        </span>
      )}

      {/* Actions */}
      <div
        className={`mt-8 flex flex-col lg:flex-row lg:items-center lg:flex-wrap gap-y-3 lg:gap-x-3 lg:gap-y-2 ${isEven ? "" : "lg:justify-end"}`}
      >
        {/* View Details — full-width tap target on mobile */}
        <Link
          to={`/projects/${project.slug}`}
          viewTransition
          className={`inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider w-full lg:w-auto px-5 py-3 lg:py-2.5 rounded active:scale-95 active:opacity-80 transition-all duration-200 ${
            isLight
              ? "ring-1 ring-gray-300 text-gray-700 hover:ring-purple-500 hover:text-purple-600 hover:bg-purple-50"
              : "ring-1 ring-white/20 text-white hover:bg-white/10 hover:ring-white/30"
          }`}
        >
          {t("projects.viewDetails")}
        </Link>

        {/* Secondary links — centered on mobile */}
        <div
          className={`flex flex-wrap justify-center gap-4 ${isEven ? "lg:justify-start" : "lg:justify-end"}`}
        >
          {/* Case Study */}
          {project.hasCaseStudy && (
            <Link
              to={`/case-study/${project.slug}`}
              viewTransition
              className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                isLight
                  ? "text-violet-600 hover:text-violet-800"
                  : "text-violet-400/80 hover:text-violet-300"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {t("projects.caseStudy")}
            </Link>
          )}

          {/* Live */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className={`inline-flex items-center gap-1 text-xs transition-colors ${
                isLight
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t("projects.live")}
            </a>
          )}

          {/* GitHub */}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className={`transition-colors ${
                isLight
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <article className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
      {isEven ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </article>
  );
}

export default function ProjectsSection() {
  const { ref, visible } = useScrollReveal();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isLight = theme === "light";

  return (
    <section id="projects" className="pt-24 pb-44 sm:py-32 relative overflow-hidden">
      <div className="section-glow section-glow--projects" aria-hidden="true">
        <span className="sg-blob sg-blob--1" />
        <span className="sg-blob sg-blob--2" />
      </div>
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-4 sm:px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent font-instrument-serif italic">
            {t("projects.sectionTitle")}
          </h2>
        </div>

        {/* ── Alternating project rows ── */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {getLocalizedProjects(t).map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} isLight={isLight} />
          ))}
        </div>

        {/* ── View All Projects button ── */}
        <div className="flex justify-center mt-20">
          <Link
            to="/projects"
            viewTransition
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 active:opacity-80 transition-all duration-300"
          >
            {t("projects.viewAllProjects")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
