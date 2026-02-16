import { useState, useEffect } from "react";
import { Github, ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projects } from "../../data/projects";

function useVisibleCount() {
  const getCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const update = () => setCount(getCount());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export default function ProjectsSection() {
  const { ref, visible } = useScrollReveal();
  const visibleCount = useVisibleCount();
  const [rawStartIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  // Clamp startIndex so it never overflows when visibleCount changes
  const startIndex = Math.min(
    rawStartIndex,
    Math.max(0, projects.length - visibleCount),
  );

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < projects.length;

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

  const visibleProjects = projects.slice(startIndex, startIndex + visibleCount);
  const slideClass =
    slideDirection === "next" ? "project-slide-next" : "project-slide-prev";

  return (
    <section id="projects" className="py-16 sm:py-24 relative overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-instrument-serif italic">
            Projects
          </h2>
        </div>

        {/* Cards — responsive carousel */}
        <div className="flex justify-center items-end gap-4 sm:gap-6 lg:gap-10">
          {visibleProjects.map((project, i) => {
            const rotations = ["-rotate-3", "rotate-0", "rotate-3"];
            // Only apply rotation on lg+ (3-card view)
            const rotation = visibleCount >= 3 ? rotations[i % 3] : "rotate-0";
            return (
              <article
                key={`${project.title}-${startIndex}`}
                className={`w-full sm:w-75 lg:w-87.5 min-h-105 sm:h-112.5 rounded-[20px] bg-linear-to-br ${project.color} p-4 sm:p-5 flex flex-col text-left box-border transition-all duration-500 ease-out transform-gpu hover:scale-[1.05] hover:rotate-0 project-card-hover ${rotation} ${slideClass}`}
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
                    <div className="w-full h-37.5 rounded-[5px] bg-white/10 flex items-center justify-center">
                      <span className="text-white/30 text-sm">Preview</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 mb-0 leading-7 sm:leading-8">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mt-1.5">
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
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
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
                        <Github className="w-5 h-5 sm:w-6.25 sm:h-6.25 text-white" />
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
          <span className="text-xs text-white/25">
            {startIndex + 1}–
            {Math.min(startIndex + visibleCount, projects.length)} of{" "}
            {projects.length}
          </span>
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
