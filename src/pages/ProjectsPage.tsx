import { Link } from "react-router-dom";
import { ArrowLeft, Github, BookOpen, ExternalLink } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import DarkGradientBg from "../components/ui/DarkGradientBg";
import { useTheme } from "../hooks/useTheme";
import { projects, type Project } from "../data/projects";

/* ── Card designed for the all-projects grid page ── */
function ProjectGridCard({ project, isLight }: { project: Project; isLight: boolean }) {
  return (
    <div
      className={`group rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
        isLight
          ? "bg-white ring-1 ring-foreground/8 shadow-md hover:shadow-lg"
          : "bg-[#1a2535] ring-1 ring-white/6 hover:ring-white/12"
      }`}
      style={{ height: 520 }}
    >
      {/* ── Image banner ── */}
      <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            width={700}
            height={438}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full bg-linear-to-br ${isLight ? project.lightColor : project.color} flex items-center justify-center`}
          >
            <span
              className={`text-2xl font-bold ${isLight ? "text-foreground/40" : "text-white/40"}`}
            >
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 min-h-0">
        {/* Label */}
        <span
          className={`text-[10px] font-semibold uppercase tracking-[1.5px] ${
            isLight ? "text-foreground/45" : "text-white/40"
          }`}
        >
          Featured Project
        </span>

        {/* Title */}
        <h3
          className={`text-xl sm:text-[22px] font-bold mt-2 leading-tight ${
            isLight ? "text-teal-600" : "text-teal-400"
          }`}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={`text-[13px] leading-relaxed mt-3 line-clamp-3 ${
            isLight ? "text-foreground/65" : "text-white/55"
          }`}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
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

        {/* Spacer to push footer down */}
        <div className="flex-1 min-h-4" />

        {/* ── Footer actions ── */}
        <div
          className={`flex items-center flex-wrap gap-x-3 gap-y-2 mt-5 pt-4 border-t ${isLight ? "border-foreground/6" : "border-white/8"}`}
        >
          {/* View Details (primary) */}
          <Link
            to={`/projects/${project.slug}`}
            viewTransition
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-colors ${
              isLight
                ? "ring-1 ring-teal-600/40 text-teal-700 hover:bg-teal-50"
                : "ring-1 ring-white/20 text-white/90 hover:bg-white/5"
            }`}
          >
            View Details
          </Link>

          {/* Case Study */}
          {project.hasCaseStudy && (
            <Link
              to={`/case-study/${project.slug}`}
              viewTransition
              className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
                isLight
                  ? "text-violet-600 hover:text-violet-800"
                  : "text-violet-400/80 hover:text-violet-300"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Case Study
            </Link>
          )}

          {/* Right-aligned icons */}
          <div className="flex items-center gap-2.5 ml-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className={`transition-colors ${
                  isLight
                    ? "text-foreground/50 hover:text-foreground"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className={`transition-colors ${
                  isLight
                    ? "text-foreground/50 hover:text-foreground"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Repo note */}
        {project.repoNote && !project.repoUrl && (
          <span
            className={`text-[10px] italic mt-2 ${
              isLight ? "text-foreground/50" : "text-white/35"
            }`}
          >
            {project.repoNote}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

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
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground/80">Projects</span>
        </nav>

        {/* ── Heading ── */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent font-instrument-serif italic">
            All Projects
          </h1>
          <p className="mt-4 text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive collection of platforms, tools, and apps I&rsquo;ve built using modern
            technologies.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectGridCard key={project.slug} project={project} isLight={isLight} />
          ))}
        </div>
      </div>
    </main>
  );
}
