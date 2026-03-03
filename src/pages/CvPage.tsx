import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowLeft, Download } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import BackToTop from "../components/ui/BackToTop";
import DarkGradientBg from "../components/ui/DarkGradientBg";
import profileImg from "../assets/profile.avif";

/* ================================================================== */
/*  Static data (non-translatable fields only)                         */
/* ================================================================== */

const EXPERIENCE_META = [
  {
    key: "technocolabs",
    company: "Technocolabs Softwares Inc.",
    link: "https://technocolabs.com/",
  },
  {
    key: "alchdev",
    company: "ALCHDEV BUSINESS",
    link: "https://alchdev.com/",
  },
];

const PROJECTS_META = [
  {
    key: "notesboard",
    year: "2025",
    title: "NotesBoard",
    link: "https://notesboard.xyz/",
    tags: ["React", "Express", "MongoDB", "Yjs", "Socket.io"],
  },
  {
    key: "real-time-notifications",
    year: "2025",
    title: "Real-time Notifications Module",
    tags: ["Socket.io", "Express", "JWT", "REST"],
  },
  {
    key: "alarm-clock",
    year: "2025",
    title: "Alarm Clock PWA",
    link: "https://redaalch.github.io/alarm-clock/",
    tags: ["JavaScript", "HTML", "CSS", "PWA"],
  },
  {
    key: "portfolio-site",
    year: "2025",
    title: "Portfolio (This Site)",
    link: "https://redaalalach.me/",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
];

const EDUCATION_META = [{ key: "bsc" }, { key: "bac" }];

const CERTIFICATIONS_META = [
  {
    key: "meta-frontend",
    status: "completed" as const,
    link: "https://www.coursera.org/account/accomplishments/professional-cert/62TQTQSEFIFT",
  },
  {
    key: "ibm-backend",
    status: "in-progress" as const,
    link: "https://www.coursera.org/professional-certificates/backend-javascript-developer",
  },
  {
    key: "lpic1",
    status: "in-progress" as const,
    link: "https://www.lpi.org/our-certifications/lpic-1-overview/",
  },
];

const SKILLS = [
  "JavaScript / TypeScript",
  "React",
  "Node.js / Express",
  "MongoDB / Mongoose",
  "Socket.io",
  "Tailwind CSS",
  "Git / GitHub",
  "Docker",
  "REST APIs",
  "JWT Auth",
  "Vite",
  "Linux / Bash",
  "CI/CD",
  "GCP (learning)",
];

const CONTACT = [
  {
    platform: "GitHub",
    handle: "redaalch",
    url: "https://github.com/redaalch",
    icon: Github,
  },
  {
    platform: "LinkedIn",
    handle: "reda-alalach",
    url: "https://www.linkedin.com/in/reda-alalach/",
    icon: Linkedin,
  },
  {
    platform: "Email",
    handle: "reda.alalach@gmail.com",
    url: "mailto:reda.alalach@gmail.com",
    icon: Mail,
  },
];

const SECTIONS = [
  "about",
  "experience",
  "projects",
  "education",
  "certifications",
  "skills",
  "contact",
] as const;

type SectionId = (typeof SECTIONS)[number];

const SECTION_KEYS: Record<SectionId, string> = {
  about: "about",
  experience: "experience",
  projects: "projects",
  education: "education",
  certifications: "certifications",
  skills: "skills",
  contact: "contact",
};

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function CvPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  /* ── Intersection Observer for sidebar highlight ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <DarkGradientBg />
      <Navbar />

      {/* ── Mobile section jump nav (hidden on lg+, where sidebar takes over) ── */}
      <nav
        aria-label="CV sections"
        className="lg:hidden sticky top-[65px] z-30 w-full bg-background border-b border-foreground/8 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex items-center gap-1.5 px-5 py-2 w-max">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                activeSection === id
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/55 hover:text-foreground/90"
              }`}
            >
              {t(`cv.sections.${SECTION_KEYS[id]}`)}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-4 sm:pt-10 lg:px-12 dark:rounded-2xl dark:bg-background/80 dark:shadow-2xl dark:shadow-black/20 dark:ring-1 dark:ring-white/4">
        {/* ── Breadcrumb ── */}
        <nav className="mb-12 flex items-center gap-3 text-sm text-foreground/70">
          <Link
            to="/"
            viewTransition
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            {t("nav.home")}
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground/80">{t("cv.breadcrumb")}</span>
        </nav>

        {/* ================================================================ */}
        {/*  Header                                                          */}
        {/* ================================================================ */}
        <header className="mb-8 sm:mb-20 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              <span className="bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent font-instrument-serif italic">
                Reda Alalach
              </span>
            </h1>
            <p className="text-lg text-foreground/70 sm:text-xl">{t("cv.subtitle")}</p>
            <p className="text-sm text-foreground/50 leading-relaxed">
              {t("cv.seeking")}
              <br />
              {t("cv.locationRemote")}
              <br />
              {t("cv.stackSummary")}
            </p>
            <div className="flex items-center gap-4 text-sm text-foreground/70">
              <a
                href="https://remyportfolio.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline decoration-foreground/30 underline-offset-4"
              >
                remyportfolio.me
              </a>
              <span className="size-1 rounded-full bg-foreground/30" />
              <a
                href="mailto:reda.alalach@gmail.com"
                className="hover:text-foreground transition-colors underline decoration-foreground/30 underline-offset-4"
              >
                reda.alalach@gmail.com
              </a>
            </div>

            {/* Download button — only shown on mobile; desktop gets it in the sidebar */}
            <a
              href="/Reda_Alalach_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
            >
              <Download className="size-4" />
              {t("cv.downloadPdf")}
            </a>
          </div>

          <div className="relative shrink-0">
            <div className="absolute -inset-3 rounded-full bg-violet-500/15 blur-xl" />
            <img
              src={profileImg}
              alt="Reda Alalach"
              width={140}
              height={140}
              className="relative size-24 rounded-full object-cover ring-2 ring-foreground/15 sm:size-32 lg:size-36"
            />
          </div>
        </header>

        {/* ================================================================ */}
        {/*  Two-column layout: sidebar + content                            */}
        {/* ================================================================ */}
        <div className="flex gap-16 lg:gap-20">
          {/* ── Sticky sidebar nav (desktop) ── */}
          <nav
            aria-label="CV sections"
            className="hidden lg:flex sticky top-28 h-fit w-44 shrink-0 flex-col gap-1"
          >
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === id
                    ? "bg-foreground/5 text-foreground"
                    : "text-foreground/70 hover:text-foreground/90"
                }`}
              >
                {t(`cv.sections.${SECTION_KEYS[id]}`)}
              </a>
            ))}

            <div className="mt-4 h-px bg-foreground/15" />
            <a
              href="/Reda_Alalach_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground/90 transition-colors"
            >
              <Download className="size-3.5" />
              {t("cv.downloadPdf")}
            </a>
          </nav>

          {/* ── Main content ── */}
          <div className="min-w-0 flex-1 space-y-12 sm:space-y-20">
            {/* ── About ── */}
            <section id="about">
              <SectionHeading>{t("cv.sections.about")}</SectionHeading>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-2xl">
                <p>{t("cv.about.p1")}</p>
                <p>{t("cv.about.p2")}</p>
                <p>{t("cv.about.p3")}</p>
              </div>
            </section>

            {/* ── Work Experience ── */}
            <section id="experience">
              <SectionHeading>{t("cv.sections.experience")}</SectionHeading>
              <div className="space-y-10">
                {EXPERIENCE_META.map((xp, i) => (
                  <div key={i} className="group flex flex-col gap-3 sm:flex-row sm:gap-10">
                    <span className="shrink-0 text-sm tabular-nums text-foreground/70 sm:w-40 sm:pt-0.5">
                      {t(`cv.experience.${xp.key}.period`)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <a
                        href={xp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground hover:text-violet-400 transition-colors"
                      >
                        {t(`cv.experience.${xp.key}.titleAtCompany`)}
                      </a>
                      <p className="mt-0.5 text-sm text-foreground/70">
                        {t(`cv.experience.${xp.key}.location`)}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {(
                          t(`cv.experience.${xp.key}.bullets`, { returnObjects: true }) as string[]
                        ).map((b, j) => (
                          <li
                            key={j}
                            className="relative pl-4 text-sm text-foreground/80 leading-relaxed before:absolute before:left-0 before:top-[0.55em] before:size-1 before:rounded-full before:bg-foreground/40"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Projects ── */}
            <section id="projects">
              <SectionHeading>{t("cv.sections.projects")}</SectionHeading>
              <div className="space-y-8">
                {PROJECTS_META.map((p, i) => (
                  <div key={i} className="flex flex-col gap-2 sm:flex-row sm:gap-10">
                    <span className="shrink-0 text-sm tabular-nums text-foreground/70 sm:w-40 sm:pt-0.5">
                      {p.year}
                    </span>
                    <div className="min-w-0 flex-1">
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-foreground hover:text-violet-400 transition-colors"
                        >
                          {p.title}
                        </a>
                      ) : (
                        <span className="text-base font-semibold text-foreground">{p.title}</span>
                      )}
                      <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                        {t(`cv.projects.${p.key}.description`)}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-0.5 text-[11px] font-medium text-foreground/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Education ── */}
            <section id="education">
              <SectionHeading>{t("cv.sections.education")}</SectionHeading>
              <div className="space-y-8">
                {EDUCATION_META.map((ed, i) => (
                  <div key={i} className="flex flex-col gap-2 sm:flex-row sm:gap-10">
                    <span className="shrink-0 text-sm tabular-nums text-foreground/70 sm:w-40 sm:pt-0.5">
                      {t(`cv.education.${ed.key}.period`)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-base font-semibold text-foreground">
                        {t(`cv.education.${ed.key}.title`)}
                      </span>
                      <p className="mt-0.5 text-sm text-foreground/70">
                        {t(`cv.education.${ed.key}.institution`)}
                      </p>
                      <p className="text-sm text-foreground/70">
                        {t(`cv.education.${ed.key}.location`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Certifications ── */}
            <section id="certifications">
              <SectionHeading>{t("cv.sections.certifications")}</SectionHeading>
              <div className="space-y-6">
                {CERTIFICATIONS_META.map((c, i) => (
                  <div key={i} className="flex flex-col gap-2 sm:flex-row sm:gap-10">
                    <span className="shrink-0 text-sm tabular-nums text-foreground/70 sm:w-40 sm:pt-0.5">
                      {c.status === "completed"
                        ? t(`certifications.items.${c.key}.issuedDate`)
                        : t("cv.inProgress")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground hover:text-violet-400 transition-colors"
                      >
                        {t(`certifications.items.${c.key}.title`)}
                      </a>
                      <p className="mt-0.5 text-sm text-foreground/70">
                        {t(`certifications.items.${c.key}.issuer`)}
                      </p>
                      {c.status === "in-progress" && (
                        <span className="mt-1.5 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
                          {t("cv.inProgress")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Skills ── */}
            <section id="skills">
              <SectionHeading>{t("cv.sections.skills")}</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-sm text-foreground/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* ── Contact ── */}
            <section id="contact">
              <SectionHeading>{t("cv.sections.contact")}</SectionHeading>
              <div className="space-y-4">
                {CONTACT.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.platform} className="flex items-center gap-4 sm:gap-10">
                      <span className="shrink-0 w-16 sm:w-40 text-sm text-foreground/70">
                        {c.platform}
                      </span>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-violet-400 transition-colors"
                      >
                        <Icon className="size-4 text-foreground/70" />
                        {c.handle}
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Footer ── */}
            <div className="border-t border-foreground/15 pt-8 text-center text-xs text-foreground/70">
              {t("cv.lastUpdated")}
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </main>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {children}
      </h2>
      <div className="h-px flex-1 bg-foreground/15" />
    </div>
  );
}
