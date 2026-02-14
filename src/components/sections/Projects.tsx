import { ArrowUpRight, Github } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  note?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "NotesBoard",
    subtitle: "MERN • Real-time Collaboration • Yjs",
    description:
      "Collaborative notes & analytics platform with a real-time editor (Yjs/Hocuspocus), shared dashboards, drag-and-drop, animations, offline cache, and notifications.",
    tags: ["React", "Express", "MongoDB", "JWT", "Yjs", "Socket.io"],
    repoUrl: "https://github.com/redaalch/notesBoard",
    gradient: "from-violet-500/20 to-blue-500/20",
  },
  {
    title: "Real-time Notifications Module",
    subtitle: "Socket.io + Express — Internship feature",
    description:
      "Event-driven notifications for task assignment and updates, with API-driven history and UI feedback via toast alerts. Focused on reliability, auth consistency, and clean UX.",
    tags: ["Socket.io", "Express", "JWT", "REST", "Testing"],
    note: "Code is part of an internship project and may not be publicly shareable.",
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Alarm Clock",
    subtitle: "Vanilla JS • PWA • Local Storage",
    description:
      "Lightweight alarm clock with add/edit/delete alarms, recurring schedules, local persistence, live 12/24-hour clock, desktop notifications, and offline support.",
    tags: ["JavaScript", "HTML", "CSS", "PWA"],
    liveUrl: "https://redaalch.github.io/alarm-clock/",
    gradient: "from-orange-500/20 to-rose-500/20",
  },
  {
    title: "Portfolio (This Site)",
    subtitle: "React • Tailwind • TypeScript • Vite",
    description:
      "Modern portfolio built with React, Tailwind CSS, and TypeScript. Includes smooth animations, responsive design, and deployed via GitHub Pages.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    gradient: "from-pink-500/20 to-violet-500/20",
  },
];

export default function ProjectsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)]" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Featured Projects
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            A selection of projects focused on backend fundamentals, real-time
            systems, and clean user experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <article
              key={i}
              className="group rounded-2xl bg-white/3 ring-1 ring-white/8 p-6 hover:bg-white/6 hover:ring-white/15 transition-all duration-300"
            >
              {/* Gradient header */}
              <div
                className={`h-2 w-16 rounded-full bg-linear-to-r ${project.gradient} mb-6`}
              />

              <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white/40 mt-1">{project.subtitle}</p>
              <p className="text-white/60 mt-4 leading-relaxed text-sm">
                {project.description}
              </p>

              {project.note && (
                <p className="text-xs text-white/30 mt-3 italic">
                  Note: {project.note}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50 ring-1 ring-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" /> Source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
