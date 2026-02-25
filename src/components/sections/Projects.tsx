import { Github, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTheme } from "../../hooks/useTheme";
import { projects, type Project } from "../../data/projects";

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

  /* ── Image element (reused in both layouts) ── */
  const image = project.image ? (
    <img
      src={project.image}
      alt={project.title}
      width={700}
      height={438}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover rounded-xl"
    />
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
      {/* Featured label */}
      <span className={`text-xs tracking-wide ${isLight ? "text-foreground/50" : "text-white/50"}`}>
        Featured Project
      </span>

      {/* Title */}
      <h3
        className={`text-2xl sm:text-3xl font-bold mt-1 leading-tight ${
          isLight ? "text-teal-600" : "text-teal-400"
        }`}
      >
        {project.title}
      </h3>

      {/* Description + image container — bordered on mobile */}
      <div
        className={`relative mt-4 rounded-lg overflow-hidden lg:overflow-visible ${
          isLight ? "ring-1 ring-foreground/10 lg:ring-0" : "ring-1 ring-white/10 lg:ring-0"
        }`}
      >
        {/* Description box — overlaps the image on desktop */}
        <div
          className={`p-5 text-sm leading-relaxed ${
            isLight
              ? "bg-white/90 shadow-lg text-foreground/75 backdrop-blur lg:rounded-lg"
              : "bg-[#112240]/90 text-white/70 backdrop-blur lg:rounded-lg"
          } ${isEven ? "lg:-mr-14" : "lg:-ml-15 lg:text-left"}`}
        >
          {project.description}
        </div>

        {/* Mobile-only image: inside the bordered container */}
        <div className="lg:hidden">{image}</div>
      </div>

      {/* Tags — pipe-separated */}
      <div className={`mt-4 flex flex-wrap gap-x-1 text-xs ${isEven ? "" : "lg:justify-end"}`}>
        {project.tags.map((tag, i) => (
          <span key={tag}>
            <span className={isLight ? "text-teal-600" : "text-teal-400"}>{tag}</span>
            {i < project.tags.length - 1 && (
              <span className={isLight ? "text-foreground/30 mx-1" : "text-white/30 mx-1"}>|</span>
            )}
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

      {/* Actions row */}
      <div
        className={`flex items-center flex-wrap gap-x-3 gap-y-2 mt-5 ${isEven ? "" : "lg:justify-end"}`}
      >
        {/* View Details */}
        <Link
          to={`/projects/${project.slug}`}
          viewTransition
          className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors ${
            isLight
              ? "ring-1 ring-foreground/20 text-foreground hover:bg-foreground/5"
              : "ring-1 ring-white/20 text-white hover:bg-white/5"
          }`}
        >
          View Details
        </Link>

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
            Case Study
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
            Live
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
  const isLight = theme === "light";

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
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
            Projects
          </h2>
        </div>

        {/* ── Alternating project rows ── */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} isLight={isLight} />
          ))}
        </div>

        {/* ── View All Projects button ── */}
        <div className="flex justify-center mt-20">
          <Link
            to="/projects"
            viewTransition
            className="contact-cta inline-flex items-center text-sm font-semibold uppercase tracking-widest px-8 py-3.5 rounded-xl"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
