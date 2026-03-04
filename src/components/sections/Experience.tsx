import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTheme } from "../../hooks/useTheme";
import technocolabsLogo from "../../assets/technocolabs_logo.avif";
import alchdevLogo from "../../assets/alchdev.avif";

interface Experience {
  company: string;
  shortName: string;
  logo: string;
  role: string;
  period: string;
  type: string;
  bullets: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getExperiences(t: (key: string, opts?: any) => any): Experience[] {
  return [
    {
      company: "Technocolabs Softwares Inc.",
      shortName: "Technocolabs",
      logo: technocolabsLogo,
      role: t("experience.items.technocolabs.role") as string,
      period: t("experience.items.technocolabs.period") as string,
      type: t("experience.items.technocolabs.type") as string,
      bullets: t("experience.items.technocolabs.bullets", { returnObjects: true }) as string[],
    },
    {
      company: "ALCHDEV BUSINESS",
      shortName: "ALCHDEV",
      logo: alchdevLogo,
      role: t("experience.items.alchdev.role") as string,
      period: t("experience.items.alchdev.period") as string,
      type: t("experience.items.alchdev.type") as string,
      bullets: t("experience.items.alchdev.bullets", { returnObjects: true }) as string[],
    },
  ];
}

export default function ExperienceSection() {
  const { ref, visible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const experiences = getExperiences(t);
  const active = experiences[activeIndex];

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="section-glow section-glow--experience" aria-hidden="true">
        <span className="sg-blob sg-blob--1" />
        <span className="sg-blob sg-blob--2" />
      </div>
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-4 sm:px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        {/* Title with horizontal line */}
        <div className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-instrument-serif italic shrink-0 ${
              isLight
                ? "text-gray-900"
                : "bg-linear-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent"
            }`}
          >
            {t("experience.sectionTitle")}
          </h2>
          <div
            className={`flex-1 h-px hidden sm:block ${isLight ? "bg-gray-200" : "bg-foreground/15"}`}
          />
        </div>

        {/* Tabbed layout — open/flat style */}
        <div className="flex flex-col md:flex-row gap-0">
          {/* Sidebar tabs with continuous left border */}
          <nav
            className={`flex md:flex-col shrink-0 md:w-48 border-b md:border-b-0 md:border-l-2 overflow-x-auto snap-x scrollbar-hide md:overflow-x-visible ${
              isLight ? "md:border-l-gray-200" : "md:border-l-foreground/10"
            }`}
          >
            {experiences.map((xp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative text-left px-5 py-4 md:py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap snap-start
                  ${
                    activeIndex === i
                      ? isLight
                        ? "text-purple-700 bg-purple-50 rounded-r-md"
                        : "text-white bg-white/10 rounded-r-md"
                      : isLight
                        ? "text-gray-500 hover:text-purple-600 hover:bg-gray-50"
                        : "text-gray-400 hover:text-white"
                  }`}
              >
                {/* Active left indicator (overlaps the border) */}
                {activeIndex === i && (
                  <span
                    className={`hidden md:block absolute -left-0.5 top-0 bottom-0 w-0.5 ${
                      isLight ? "bg-purple-600" : "bg-violet-400"
                    }`}
                  />
                )}
                {activeIndex === i && (
                  <span
                    className={`block md:hidden absolute bottom-0 left-0 right-0 h-0.5 ${
                      isLight ? "bg-purple-600" : "bg-violet-400"
                    }`}
                  />
                )}
                {xp.shortName}
              </button>
            ))}
          </nav>

          {/* Content panel */}
          <div key={activeIndex} className="flex-1 md:pl-12 pt-6 md:pt-0 animate-fade-in">
            <div className="flex items-start gap-4">
              <img
                src={active.logo}
                alt={`${active.company} logo`}
                width={44}
                height={44}
                loading="lazy"
                className="shrink-0 w-11 h-11 mt-0.5 rounded-xl object-cover ring-1 ring-foreground/10"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                  <span className={isLight ? "text-gray-900" : "text-white"}>{active.role}</span>{" "}
                  <span className={isLight ? "text-purple-700" : "text-purple-400"}>
                    @ {active.company}
                  </span>
                </h3>
                <p className={`text-sm mt-1 ${isLight ? "text-gray-500" : "text-foreground/70"}`}>
                  {active.type} | {active.period}
                </p>
              </div>
            </div>

            <ul className="space-y-3 mt-6">
              {active.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className={`text-sm leading-loose pl-6 relative ${
                    isLight ? "text-gray-600" : "text-foreground/70"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute left-0 top-1 w-3.5 h-3.5 ${
                      isLight ? "text-purple-500" : "text-purple-400"
                    }`}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
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
