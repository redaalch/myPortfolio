import { useState } from "react";
import { Github, ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projects } from "../../data/projects";

const VISIBLE = 3;

export default function ProjectsSection() {
  const { ref, visible } = useScrollReveal();
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  const canPrev = startIndex > 0;
  const canNext = startIndex + VISIBLE < projects.length;

  const prev = () => {
    if (canPrev) {
      setSlideDirection("prev");
      setStartIndex((i) => i - 1);
    }
  };
  const next = () => {
    if (canNext) {
      setSlideDirection("next");
      setStartIndex((i) => i + 1);
    }
  };

  const visibleProjects = projects.slice(startIndex, startIndex + VISIBLE);
  const slideClass =
    slideDirection === "next" ? "project-slide-next" : "project-slide-prev";

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-instrument-serif italic">
            Projects
          </h2>
        </div>

        {/* Cards — carousel showing 3 */}
        <div className="flex justify-center items-end gap-10">
          {visibleProjects.map((project, i) => {
            const rotations = ["-rotate-3", "rotate-0", "rotate-3"];
            const rotation = rotations[i % 3];
            return (
            <article
              key={`${project.title}-${startIndex}`}
              className={`w-[350px] h-[450px] rounded-[20px] bg-linear-to-br ${project.color} p-5 flex flex-col text-left box-border transition-all duration-500 ease-out transform-gpu hover:scale-[1.05] hover:rotate-0 project-card-hover ${rotation} ${slideClass}`}
            >
              {/* Thumbnail */}
              <div className="w-full">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    width={700}
                    height={438}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto rounded-[5px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[150px] rounded-[5px] bg-white/10 flex items-center justify-center">
                    <span className="text-white/30 text-sm">Preview</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mt-1.5 mb-0 leading-8">
                {project.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 mt-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-1 rounded-[5px] bg-white/15 text-white/75 transition-opacity hover:opacity-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-[13px] text-white/75 leading-relaxed mt-1.5 mb-2.5">
                {project.description}
              </p>

              {/* Footer: Year + Links — pushed to bottom */}
              <div className="flex items-center justify-between w-full mt-auto">
                <span className="text-sm font-bold text-white">
                  {project.year}
                </span>
                <div className="flex items-center gap-3">
                  {project.hasCaseStudy && (
                    <Link
                      to={`/case-study/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-violet-300/90 hover:text-white transition-colors font-medium"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Case Study
                    </Link>
                  )}
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-white/75 hover:text-white transition-colors"
                  >
                    More details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/70 hover:text-white underline transition-colors"
                    >
                      Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:opacity-75 transition-opacity"
                    >
                      <Github className="w-[25px] h-[25px] text-white" />
                    </a>
                  )}
                </div>
              </div>
            </article>
            );
          })}
        </div>

        {/* Navigation — text toggles */}
        <div className="flex items-center justify-between mt-6 px-2">
          <button
            onClick={prev}
            disabled={!canPrev}
            className={`bg-transparent border-none outline-none cursor-pointer text-sm transition-all ${
              canPrev
                ? "text-white/60 hover:opacity-75"
                : "text-white/15 cursor-default"
            }`}
          >
            ← Prev
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            className={`bg-transparent border-none outline-none cursor-pointer text-sm transition-all ${
              canNext
                ? "text-white/60 hover:opacity-75"
                : "text-white/15 cursor-default"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
