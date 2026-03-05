import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Calendar,
  Code2,
  Briefcase,
  GraduationCap,
  Rocket,
  BookOpen,
  Coffee,
  Gamepad2,
  Globe,
  Cloud,
  Server,
} from "lucide-react";
import Navbar from "../components/ui/Navbar";
import DarkGradientBg from "../components/ui/DarkGradientBg";
import LetsWorkTogether from "../components/ui/LetsWorkTogether";
import SocialSidebar from "../components/ui/SocialSidebar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import profileImg from "../assets/profile.avif";

/* ================================================================== */
/*  Data — replace with your real content                              */
/* ================================================================== */

const TIMELINE = [
  {
    year: "2025",
    title: "Backend Developer Intern — Technocolabs",
    description:
      "Built secure JWT-authenticated APIs, integrated real-time notifications with Socket.io, and orchestrated production deployments across Render, Vercel, and Railway.",
    icon: Server,
    color: "#8b5cf6",
  },
  {
    year: "2025",
    title: "Web Developer Intern — ALCHDEV",
    description:
      "Implemented pages in a React.js application, integrated REST APIs, and improved performance and cross-browser compatibility.",
    icon: Briefcase,
    color: "#3b82f6",
  },
  {
    year: "2025",
    title: "Front-End Professional Certificate — Meta",
    description:
      "Completed the Meta Front-End Developer Professional Certificate on Coursera, covering React, testing, and UX principles.",
    icon: GraduationCap,
    color: "#10b981",
  },
  {
    year: "2024",
    title: "Full-Stack Portfolio & NotesBoard",
    description:
      "Shipped a production-grade portfolio (React 19, Tailwind v4, Docker, CI/CD) and NotesBoard — a collaborative MERN platform with real-time editing.",
    icon: Rocket,
    color: "#f97316",
  },
  {
    year: "2021",
    title: "B.Sc. Computer Science — FSDM, Fez",
    description:
      "Started a Computer Science degree at the Faculty of Sciences Dhar El Mahraz, Sidi Mohamed Ben Abdellah University. Graduating in 2026.",
    icon: GraduationCap,
    color: "#06b6d4",
  },
  {
    year: "2021",
    title: "Baccalaureate — Mathematical Sciences",
    description:
      "Graduated with a Baccalaureate in Mathematical Sciences (International Option) from Al-Wahda High School, Taounate.",
    icon: Code2,
    color: "#ec4899",
  },
];

/* ================================================================== */
/*  Reusable reveal wrapper                                            */
/* ================================================================== */
function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`${visible ? "reveal visible" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function AboutPage() {
  const { t } = useTranslation();

  const STATS = [
    { value: "4+", label: t("about.stats.yearsCoding") },
    { value: "5+", label: t("about.stats.projectsShipped") },
    { value: "3", label: t("about.stats.certifications") },
    { value: "2", label: t("about.stats.internships") },
  ];

  const PHILOSOPHY = [
    {
      title: t("about.philosophy.cleanCode"),
      description: t("about.philosophy.cleanCodeDesc"),
    },
    {
      title: t("about.philosophy.shipEarly"),
      description: t("about.philosophy.shipEarlyDesc"),
    },
    {
      title: t("about.philosophy.automate"),
      description: t("about.philosophy.automateDesc"),
    },
  ];

  const FUN_FACTS = [
    { icon: Coffee, label: t("about.funFacts.fuel"), value: t("about.funFacts.fuelValue") },
    {
      icon: Gamepad2,
      label: t("about.funFacts.downtime"),
      value: t("about.funFacts.downtimeValue"),
    },
    {
      icon: Globe,
      label: t("about.funFacts.languages"),
      value: t("about.funFacts.languagesValue"),
    },
    { icon: BookOpen, label: t("about.funFacts.reading"), value: t("about.funFacts.readingValue") },
    { icon: Cloud, label: t("about.funFacts.learning"), value: t("about.funFacts.learningValue") },
    { icon: Code2, label: t("about.funFacts.favStack"), value: t("about.funFacts.favStackValue") },
  ];

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <DarkGradientBg />
      <Navbar />

      {/* ── Left social strip ── */}
      <SocialSidebar />

      <div className="max-w-250 mx-auto px-5 lg:px-12 pt-36 pb-16">
        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-foreground/80 mb-10">
          <Link to="/" viewTransition className="hover:underline transition-colors">
            {t("nav.home")}
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <span>{t("about.breadcrumb")}</span>
        </nav>

        {/* ================================================================ */}
        {/*  1. Hero: Photo + Bio                                            */}
        {/* ================================================================ */}
        <RevealSection>
          <section className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 mb-24">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="absolute -inset-4 rounded-full bg-violet-500/20 blur-2xl" />
              <img
                src={profileImg}
                alt="Reda Alalach"
                width={192}
                height={192}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover ring-2 ring-foreground/10"
              />
            </div>

            {/* Bio text */}
            <div className="text-center md:text-left">
              <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
                {t("about.label")}
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold font-instrument-serif italic bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-6">
                {t("about.title")}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-foreground/70 mb-6">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {t("about.locationLabel")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {t("about.roleLabel")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {t("about.educationLabel")}
                </span>
              </div>

              {/* Bio paragraphs */}
              <div className="space-y-4 text-foreground/70 leading-relaxed max-w-2xl">
                <p>{t("about.bio1")}</p>
                <p>{t("about.bio2")}</p>
                <p>{t("about.bio3")}</p>
              </div>

              {/* Quick recruiter facts */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  {
                    label: t("about.quickFacts.timezone"),
                    value: t("about.quickFacts.timezoneValue"),
                  },
                  {
                    label: t("about.quickFacts.graduating"),
                    value: t("about.quickFacts.graduatingValue"),
                  },
                  {
                    label: t("about.quickFacts.lookingFor"),
                    value: t("about.quickFacts.lookingForValue"),
                  },
                  {
                    label: t("about.quickFacts.workStyle"),
                    value: t("about.quickFacts.workStyleValue"),
                  },
                  { label: t("about.quickFacts.openTo"), value: t("about.quickFacts.openToValue") },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-foreground/8 bg-foreground/3 px-3.5 py-1.5 text-xs text-foreground/70"
                  >
                    <span className="font-medium text-foreground/90">{item.label}:</span>{" "}
                    {item.value}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ================================================================ */}
        {/*  2. Stats strip                                                  */}
        {/* ================================================================ */}
        <RevealSection>
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-24">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/5 border border-white/10 p-6 text-center"
              >
                <p className="text-3xl font-bold bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </section>
        </RevealSection>

        {/* ================================================================ */}
        {/*  3. Philosophy                                                   */}
        {/* ================================================================ */}
        <RevealSection>
          <section className="mb-24">
            <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
              {t("about.philosophyLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-10">
              {t("about.philosophyTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PHILOSOPHY.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/8 p-6 hover:ring-violet-500/30 transition-all duration-300"
                >
                  <h3 className="text-base font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* ================================================================ */}
        {/*  4. Timeline                                                     */}
        {/* ================================================================ */}
        <RevealSection>
          <section className="mb-24">
            <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
              {t("about.timelineLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-10">
              {t("about.timelineTitle")}
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-foreground/10" />

              <div className="space-y-10">
                {TIMELINE.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative flex gap-6">
                      {/* Dot */}
                      <div
                        className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ring-foreground/10 bg-background"
                        style={{
                          boxShadow: `0 0 20px ${item.color}33`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      {/* Content */}
                      <div className="pb-2">
                        <span className="text-xs font-medium text-foreground/70 tracking-widest uppercase">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mt-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed mt-1 max-w-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ================================================================ */}
        {/*  5. Fun facts / Interests                                        */}
        {/* ================================================================ */}
        <RevealSection>
          <section className="mb-24">
            <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
              {t("about.funFactsLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-10">
              {t("about.funFactsTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {FUN_FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="flex items-start gap-4 rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/8 p-5 hover:ring-violet-500/30 transition-all duration-300"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-foreground/70 uppercase tracking-wider">
                        {fact.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-foreground/80 mt-0.5">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </RevealSection>

        {/* ================================================================ */}
        {/*  6. CTA — Interactive contact                                    */}
        {/* ================================================================ */}
        <RevealSection>
          <LetsWorkTogether />
        </RevealSection>
      </div>
    </main>
  );
}
