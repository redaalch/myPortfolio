import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent font-instrument-serif italic shrink-0">
            {t("experience.sectionTitle")}
          </h2>
          <div className="flex-1 h-px bg-foreground/15 hidden sm:block" />
        </div>

        {/* Tabbed layout — open/flat style */}
        <div className="flex flex-col md:flex-row gap-0">
          {/* Sidebar tabs with continuous left border */}
          <nav className="flex md:flex-col shrink-0 md:w-48 border-b md:border-b-0 md:border-l-2 md:border-l-foreground/10 overflow-x-auto md:overflow-x-visible">
            {experiences.map((xp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative text-left px-5 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap
                  ${
                    activeIndex === i
                      ? "text-violet-400"
                      : "text-foreground/70 hover:text-foreground/90"
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
          <div key={activeIndex} className="flex-1 md:pl-12 pt-6 md:pt-0 animate-fade-in">
            <div className="flex items-start gap-4">
              <img
                src={active.logo}
                alt={`${active.company} logo`}
                width={44}
                height={44}
                loading="lazy"
                className="shrink-0 w-11 h-11 rounded-xl object-cover ring-1 ring-foreground/10"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400 leading-snug">
                  {active.role} <span className="text-violet-400">@ {active.company}</span>
                </h3>
                <p className="text-sm text-foreground/70 mt-1">
                  {active.type} | {active.period}
                </p>
              </div>
            </div>

            <ul className="space-y-3 mt-6">
              {active.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className="text-sm text-foreground/70 leading-relaxed pl-5 relative before:content-['▸'] before:text-violet-400 before:absolute before:left-0"
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
