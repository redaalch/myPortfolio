import { useState, useEffect, useRef, useCallback } from "react";
import { Github, ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTheme } from "../../hooks/useTheme";
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

/* ── Swipe / drag hook ── */
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const THRESHOLD = 40;

    const onStart = (x: number, y: number) => {
      startX.current = x;
      startY.current = y;
      dragging.current = true;
    };
    const onEnd = (x: number) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = x - startX.current;
      if (Math.abs(dx) < THRESHOLD) return;
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    };

    // Touch
    const ts = (e: TouchEvent) => onStart(e.touches[0].clientX, e.touches[0].clientY);
    const te = (e: TouchEvent) => onEnd(e.changedTouches[0].clientX);

    // Pointer (mouse drag)
    const ps = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // handled by touch events
      onStart(e.clientX, e.clientY);
    };
    const pe = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      onEnd(e.clientX);
    };

    el.addEventListener("touchstart", ts, { passive: true });
    el.addEventListener("touchend", te, { passive: true });
    el.addEventListener("pointerdown", ps);
    el.addEventListener("pointerup", pe);

    return () => {
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchend", te);
      el.removeEventListener("pointerdown", ps);
      el.removeEventListener("pointerup", pe);
    };
  }, [onSwipeLeft, onSwipeRight]);

  return ref;
}

export default function ProjectsSection() {
  const { ref, visible } = useScrollReveal();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const visibleCount = useVisibleCount();
  const [rawStartIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  // Clamp startIndex so it never overflows when visibleCount changes
  const startIndex = Math.min(rawStartIndex, Math.max(0, projects.length - visibleCount));

  const maxStart = Math.max(0, projects.length - visibleCount);
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < projects.length;

  const prev = useCallback(() => {
    if (startIndex > 0) {
      setSlideDirection("prev");
      setStartIndex((i) => i - 1);
    }
  }, [startIndex]);

  const next = useCallback(() => {
    if (startIndex < maxStart) {
      setSlideDirection("next");
      setStartIndex((i) => i + 1);
    }
  }, [startIndex, maxStart]);

  // Swipe / drag
  const swipeRef = useSwipe(next, prev);

  // Keyboard nav when carousel region is focused
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  // Dot indicators — one dot per "page position"
  const totalDots = maxStart + 1;

  const visibleProjects = projects.slice(startIndex, startIndex + visibleCount);
  const slideClass = slideDirection === "next" ? "project-slide-next" : "project-slide-prev";

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="section-glow section-glow--projects" aria-hidden="true">
        <span className="sg-blob sg-blob--1" />
        <span className="sg-blob sg-blob--2" />
      </div>
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent font-instrument-serif italic">
            Projects
          </h2>
        </div>

        {/* Cards — responsive carousel */}
        <div
          ref={swipeRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="flex justify-center items-end gap-4 sm:gap-6 lg:gap-10 touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:rounded-2xl"
        >
          {visibleProjects.map((project, i) => {
            const rotations = ["-rotate-3", "rotate-0", "rotate-3"];
            // Only apply rotation on lg+ (3-card view)
            const rotation = visibleCount >= 3 ? rotations[i % 3] : "rotate-0";
            return (
              <article
                key={`${project.title}-${startIndex}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${visibleCount}: ${project.title}`}
                className={`w-full sm:w-75 lg:w-87.5 min-h-105 sm:h-112.5 rounded-[20px] bg-linear-to-br ${isLight ? project.lightColor : project.color} ${isLight ? "ring-1 ring-foreground/8 shadow-md" : ""} p-4 sm:p-5 flex flex-col text-left box-border transition-all duration-500 ease-out transform-gpu hover:scale-[1.05] hover:rotate-0 project-card-hover ${rotation} ${slideClass}`}
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
                    <div
                      className={`w-full h-37.5 rounded-[5px] ${isLight ? "bg-foreground/5" : "bg-white/10"} flex items-center justify-center`}
                    >
                      <span
                        className={`${isLight ? "text-foreground/60" : "text-white/60"} text-sm`}
                      >
                        Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`text-xl sm:text-2xl font-bold ${isLight ? "text-foreground" : "text-white"} mt-1.5 mb-0 leading-7 sm:leading-8`}
                >
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mt-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-1.5 py-1 rounded-[5px] ${isLight ? "bg-foreground/8 text-foreground/65" : "bg-white/15 text-white/75"} transition-opacity hover:opacity-100`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p
                  className={`text-[13px] ${isLight ? "text-foreground/65" : "text-white/75"} leading-relaxed mt-1.5 mb-1`}
                >
                  {project.description}
                </p>

                {/* Impact / metrics */}
                {project.impact && (
                  <p
                    className={`text-[11px] ${isLight ? "text-violet-600/80" : "text-violet-300/70"} leading-relaxed mb-2.5 font-medium`}
                  >
                    {project.impact}
                  </p>
                )}

                {/* Repo note (e.g. "Private repo (internship)") */}
                {project.repoNote && !project.repoUrl && (
                  <span
                    className={`text-[10px] italic ${isLight ? "text-foreground/45" : "text-white/40"} mb-1`}
                  >
                    {project.repoNote}
                  </span>
                )}

                {/* Footer: Year + Links — pushed to bottom */}
                <div className="flex items-center justify-between w-full mt-auto">
                  <span
                    className={`text-sm font-bold ${isLight ? "text-foreground" : "text-white"}`}
                  >
                    {project.year}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
                    {project.hasCaseStudy && (
                      <Link
                        to={`/case-study/${project.slug}`}
                        viewTransition
                        className={`inline-flex items-center gap-1.5 text-xs ${isLight ? "text-violet-600 hover:text-violet-800" : "text-violet-300/90 hover:text-white"} transition-colors font-medium`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Case Study
                      </Link>
                    )}
                    <Link
                      to={`/projects/${project.slug}`}
                      viewTransition
                      className={`inline-flex items-center gap-1.5 text-xs ${isLight ? "text-foreground/65 hover:text-foreground" : "text-white/75 hover:text-white"} transition-colors`}
                    >
                      More details
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs ${isLight ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"} underline transition-colors`}
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
                        <Github
                          className={`w-5 h-5 sm:w-6.25 sm:h-6.25 ${isLight ? "text-foreground" : "text-white"}`}
                        />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation */}
        <div
          className="flex items-center justify-between mt-6 px-2"
          role="group"
          aria-label="Carousel controls"
        >
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous projects"
            className={`bg-transparent border-none outline-none cursor-pointer text-sm transition-all ${
              canPrev ? "text-foreground/70 hover:opacity-75" : "text-foreground/15 cursor-default"
            }`}
          >
            ← Prev
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Project page">
            {Array.from({ length: totalDots }, (_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === startIndex}
                aria-label={`Page ${i + 1} of ${totalDots}`}
                onClick={() => {
                  setSlideDirection(i > startIndex ? "next" : "prev");
                  setStartIndex(i);
                }}
                className={`rounded-full border-none outline-none transition-all duration-300 cursor-pointer ${
                  i === startIndex
                    ? "w-6 h-2 bg-violet-500"
                    : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next projects"
            className={`bg-transparent border-none outline-none cursor-pointer text-sm transition-all ${
              canNext ? "text-foreground/70 hover:opacity-75" : "text-foreground/15 cursor-default"
            }`}
          >
            Next →
          </button>
        </div>

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Showing projects {startIndex + 1} to{" "}
          {Math.min(startIndex + visibleCount, projects.length)} of {projects.length}
        </div>
      </div>
    </section>
  );
}
