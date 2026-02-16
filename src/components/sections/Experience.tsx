import { useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import technocolabsLogo from "../../assets/technocolabs_logo.jpeg";
import alchdevLogo from "../../assets/alchdev.jpeg";

interface Experience {
  company: string;
  shortName: string;
  logo: string;
  role: string;
  period: string;
  type: string;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    company: "Technocolabs Softwares Inc.",
    shortName: "Technocolabs",
    logo: technocolabsLogo,
    role: "Full-Stack Developer Intern (MERN)",
    period: "Oct 2025 – Present",
    type: "Remote",
    bullets: [
      "Built real-time notifications with Socket.io to instantly inform users on task assignment/updates.",
      "Implemented secure flows with JWT authentication and robust Express middleware (global error handling).",
      "Helped deploy and troubleshoot full-stack environments (Render/Vercel/Railway/Netlify) with proper env config.",
      "Added a /health status endpoint and improved UX feedback with toast notifications.",
    ],
  },
  {
    company: "ALCHDEV BUSINESS",
    shortName: "ALCHDEV",
    logo: alchdevLogo,
    role: "Web Developer Intern",
    period: "Jul 2025 – Sep 2025",
    type: "On-site",
    bullets: [
      "Contributed to a React.js codebase: built new pages, improved UI consistency, and integrated APIs.",
      "Worked with React Router, Redux, and UI component libraries to speed delivery.",
      "Improved performance and cross-browser compatibility through refactoring and UI polishing.",
    ],
  },
];

export default function ExperienceSection() {
  const { ref, visible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experiences[activeIndex];

  return (
    <section id="experience" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        {/* Title with horizontal line */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-violet-400 whitespace-nowrap font-instrument-serif italic">
            My Work Experiences
          </h2>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        {/* Tabbed layout — open/flat style */}
        <div className="flex flex-col md:flex-row gap-0">
          {/* Sidebar tabs with continuous left border */}
          <nav className="flex md:flex-col shrink-0 md:w-48 border-b md:border-b-0 md:border-l-2 md:border-l-white/10 overflow-x-auto md:overflow-x-visible">
            {experiences.map((xp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative text-left px-5 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap
                  ${
                    activeIndex === i
                      ? "text-violet-400"
                      : "text-white/30 hover:text-white/60"
                  }`}
              >
                {/* Active left indicator (overlaps the border) */}
                {activeIndex === i && (
                  <span className="hidden md:block absolute -left-0.5 top-0 bottom-0 w-0.5 bg-violet-400" />
                )}
                {activeIndex === i && (
                  <span className="block md:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400" />
                )}
                {xp.shortName}
              </button>
            ))}
          </nav>

          {/* Content panel */}
          <div
            key={activeIndex}
            className="flex-1 md:pl-12 pt-6 md:pt-0 animate-fade-in"
          >
            <div className="flex items-start gap-4">
              <img
                src={active.logo}
                alt={`${active.company} logo`}
                className="shrink-0 w-11 h-11 rounded-xl object-cover ring-1 ring-white/10"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {active.role}{" "}
                  <span className="text-violet-400">@ {active.company}</span>
                </h3>
                <p className="text-sm text-white/40 mt-1">
                  {active.type} | {active.period}
                </p>
              </div>
            </div>

            <ul className="space-y-3 mt-6">
              {active.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className="text-sm text-white/55 leading-relaxed pl-5 relative before:content-['▸'] before:text-violet-400 before:absolute before:left-0"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
