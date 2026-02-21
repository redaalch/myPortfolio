import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowLeft, Download } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import DarkGradientBg from "../components/ui/DarkGradientBg";
import profileImg from "../assets/profile.avif";

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

const EXPERIENCE = [
  {
    period: "Oct 2025 — Present",
    title: "Full-Stack Developer Intern",
    company: "Technocolabs Softwares Inc.",
    location: "Remote",
    link: "https://technocolabs.com/",
    bullets: [
      "Built real-time notification system with Socket.io — <50 ms delivery across 3 channels (assignment, status, mention).",
      "Implemented JWT auth middleware securing 100% of API routes and WebSocket connections.",
      "Deployed across 4 platforms (Render, Vercel, Railway, Netlify) with standardized env config.",
      "Added /health endpoint enabling uptime monitoring — adopted for incident response within first week.",
    ],
  },
  {
    period: "Jul 2025 — Sep 2025",
    title: "Web Developer Intern",
    company: "ALCHDEV BUSINESS",
    location: "On-site",
    link: "https://alchdev.com/",
    bullets: [
      "Built 5+ pages and integrated 3 REST API endpoints, reducing feature delivery time by ~20%.",
      "Standardized UI with React Router, Redux, and shared components — cut cross-page inconsistencies ~40%.",
      "Refactored rendering and fixed cross-browser CSS issues, improving Lighthouse performance from ~70 to 85+.",
    ],
  },
];

const PROJECTS = [
  {
    year: "2025",
    title: "NotesBoard",
    description:
      "Collaborative notes & analytics platform with real-time editing (Yjs/Hocuspocus), shared dashboards, drag-and-drop, and offline cache.",
    link: "https://notesboard.xyz/",
    tags: ["React", "Express", "MongoDB", "Yjs", "Socket.io"],
  },
  {
    year: "2025",
    title: "Real-time Notifications Module",
    description:
      "Event-driven notifications for task updates with <50ms delivery, persisted history, and toast UI feedback. Built during Technocolabs internship.",
    tags: ["Socket.io", "Express", "JWT", "REST"],
  },
  {
    year: "2025",
    title: "Alarm Clock PWA",
    description:
      "Lightweight progressive web app with recurring alarms, local persistence, desktop notifications, and full offline support.",
    link: "https://redaalch.github.io/alarm-clock/",
    tags: ["JavaScript", "HTML", "CSS", "PWA"],
  },
  {
    year: "2025",
    title: "Portfolio (This Site)",
    description:
      "Modern portfolio with React 19, Tailwind v4, smooth animations, case studies, and Lighthouse 95+ scores.",
    link: "https://redaalalach.me/",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
];

const EDUCATION = [
  {
    period: "2021 — 2026",
    title: "B.Sc. Computer Science",
    institution: "FSDM, Sidi Mohamed Ben Abdellah University",
    location: "Fez, Morocco",
  },
  {
    period: "2021",
    title: "Baccalaureate — Mathematical Sciences",
    institution: "Al-Wahda High School (International Option)",
    location: "Taounate, Morocco",
  },
];

const CERTIFICATIONS = [
  {
    year: "Jan 2025",
    title: "Front-End Developer Professional Certificate",
    issuer: "Meta — Coursera",
    status: "completed" as const,
    link: "https://www.coursera.org/account/accomplishments/professional-cert/62TQTQSEFIFT",
  },
  {
    year: "In Progress",
    title: "Back-End JavaScript Developer Professional Certificate",
    issuer: "IBM — Coursera",
    status: "in-progress" as const,
    link: "https://www.coursera.org/professional-certificates/backend-javascript-developer",
  },
  {
    year: "In Progress",
    title: "LPIC-1: System Administrator",
    issuer: "Linux Professional Institute",
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

const SECTION_LABELS: Record<SectionId, string> = {
  about: "About",
  experience: "Work Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
  skills: "Skills",
  contact: "Contact",
};

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function CvPage() {
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

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 lg:px-12 dark:rounded-2xl dark:bg-background/60 dark:shadow-2xl dark:shadow-black/20 dark:ring-1 dark:ring-white/4 dark:backdrop-blur-2xl">
        {/* ── Breadcrumb ── */}
        <nav className="mb-12 flex items-center gap-3 text-sm text-foreground/70">
          <Link
            to="/"
            viewTransition
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground/80">CV</span>
        </nav>

        {/* ================================================================ */}
        {/*  Header                                                          */}
        {/* ================================================================ */}
        <header className="mb-20 flex flex-col items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent font-instrument-serif italic">
                Reda Alalach
              </span>
            </h1>
            <p className="text-lg text-foreground/70 sm:text-xl">Full-Stack Developer · Morocco</p>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Seeking: Backend Intern · Junior Backend · Junior Full-Stack
              <br />
              Morocco (GMT+1) · Remote-friendly · Available now
              <br />
              Stack: Node.js · Express · MongoDB · React · TypeScript · Docker
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
          </div>

          <div className="relative shrink-0">
            <div className="absolute -inset-3 rounded-full bg-violet-500/15 blur-xl" />
            <img
              src={profileImg}
              alt="Reda Alalach"
              width={140}
              height={140}
              className="relative size-28 rounded-full object-cover ring-2 ring-foreground/15 sm:size-32 lg:size-36"
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
                {SECTION_LABELS[id]}
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
              Download PDF
            </a>
          </nav>

          {/* ── Main content ── */}
          <div className="min-w-0 flex-1 space-y-20">
            {/* ── About ── */}
            <section id="about">
              <SectionHeading>About</SectionHeading>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-2xl">
                <p>
                  Born and raised in Taounate, Morocco, I grew up surrounded by technology — both of
                  my brothers are in tech, and one of them is a DevSecOps engineer. Watching them
                  work sparked my curiosity early on and set me on the path to becoming a developer.
                </p>
                <p>
                  I'm a full-stack developer building secure REST APIs with Node.js/Express and
                  database-backed business logic (MongoDB/Mongoose). I've delivered production-ready
                  features including JWT authentication, middleware pipelines, global error
                  handling, real-time events with Socket.io, and cloud deployments.
                </p>
                <p>
                  Graduating in 2026 with a B.Sc. in Computer Science from FSDM, Fez. Currently
                  learning Google Cloud Platform, Cloud Functions, and Firebase to build scalable
                  serverless backends. Open to internships and junior full-stack / backend roles.
                </p>
              </div>
            </section>

            {/* ── Work Experience ── */}
            <section id="experience">
              <SectionHeading>Work Experience</SectionHeading>
              <div className="space-y-10">
                {EXPERIENCE.map((xp, i) => (
                  <div key={i} className="group flex flex-col gap-3 sm:flex-row sm:gap-10">
                    <span className="shrink-0 text-sm tabular-nums text-foreground/70 sm:w-40 sm:pt-0.5">
                      {xp.period}
                    </span>
                    <div className="min-w-0 flex-1">
                      <a
                        href={xp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground hover:text-violet-400 transition-colors"
                      >
                        {xp.title} at {xp.company}
                      </a>
                      <p className="mt-0.5 text-sm text-foreground/70">{xp.location}</p>
                      <ul className="mt-3 space-y-1.5">
                        {xp.bullets.map((b, j) => (
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
              <SectionHeading>Projects</SectionHeading>
              <div className="space-y-8">
                {PROJECTS.map((p, i) => (
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
                        {p.description}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-0.5 text-[11px] font-medium text-foreground/70"
                          >
                            {t}
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
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-8">
                {EDUCATION.map((ed, i) => (
                  <div key={i} className="flex flex-col gap-2 sm:flex-row sm:gap-10">
                    <span className="shrink-0 text-sm tabular-nums text-foreground/70 sm:w-40 sm:pt-0.5">
                      {ed.period}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-base font-semibold text-foreground">{ed.title}</span>
                      <p className="mt-0.5 text-sm text-foreground/70">{ed.institution}</p>
                      <p className="text-sm text-foreground/70">{ed.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Certifications ── */}
            <section id="certifications">
              <SectionHeading>Certifications</SectionHeading>
              <div className="space-y-6">
                {CERTIFICATIONS.map((c, i) => (
                  <div key={i} className="flex flex-col gap-2 sm:flex-row sm:gap-10">
                    <span className="shrink-0 text-sm tabular-nums text-foreground/70 sm:w-40 sm:pt-0.5">
                      {c.year}
                    </span>
                    <div className="min-w-0 flex-1">
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground hover:text-violet-400 transition-colors"
                      >
                        {c.title}
                      </a>
                      <p className="mt-0.5 text-sm text-foreground/70">{c.issuer}</p>
                      {c.status === "in-progress" && (
                        <span className="mt-1.5 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Skills ── */}
            <section id="skills">
              <SectionHeading>Skills</SectionHeading>
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
              <SectionHeading>Contact</SectionHeading>
              <div className="space-y-4">
                {CONTACT.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.platform} className="flex items-center gap-10">
                      <span className="shrink-0 text-sm text-foreground/70 sm:w-40">
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
              Last updated February 2026 · Built with React + Tailwind CSS
            </div>
          </div>
        </div>
      </div>
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
