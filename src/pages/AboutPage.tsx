import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
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
import { useScrollReveal } from "../hooks/useScrollReveal";
import profileImg from "../assets/profile.avif";

/* ================================================================== */
/*  Data — replace with your real content                              */
/* ================================================================== */
const STATS = [
  { value: "4+", label: "Years Coding" },
  { value: "5+", label: "Projects Shipped" },
  { value: "3", label: "Certifications" },
  { value: "2", label: "Internships" },
];

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

const FUN_FACTS = [
  {
    icon: Coffee,
    label: "Fuel",
    value: "Coffee & green tea",
  },
  {
    icon: Gamepad2,
    label: "Downtime",
    value: "Gaming & side projects",
  },
  {
    icon: Globe,
    label: "Languages",
    value: "English, French, Arabic",
  },
  {
    icon: BookOpen,
    label: "Currently Reading",
    value: "Clean Code by Robert C. Martin",
  },
  {
    icon: Cloud,
    label: "Learning",
    value: "GCP, Cloud Functions & Firebase",
  },
  {
    icon: Code2,
    label: "Favorite Stack",
    value: "Node.js + Express + MongoDB",
  },
];

const PHILOSOPHY = [
  {
    title: "Clean code over clever code",
    description:
      "I write code that my future self (and teammates) can understand. Readability and maintainability always come first.",
  },
  {
    title: "Ship early, iterate fast",
    description:
      "I believe in getting things in front of users quickly and improving based on real feedback rather than perfecting in isolation.",
  },
  {
    title: "Automate everything",
    description:
      "From CI/CD pipelines to testing to deployments — if I'm doing it twice, I'm automating it the third time.",
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
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <DarkGradientBg />
      <Navbar />

      {/* ── Left social strip ── */}
      <aside className="hidden lg:flex fixed left-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-5">
          <a
            href="https://github.com/redaalch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400/70 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/reda-alalach/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400/70 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:reda.alalach@gmail.com"
            className="text-violet-600 dark:text-violet-400/70 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="w-px h-24 bg-foreground/15" />
      </aside>

      {/* ── Right email strip ── */}
      <aside className="hidden lg:flex fixed right-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <a
          href="mailto:reda.alalach@gmail.com"
          className="text-xs tracking-[0.18em] text-foreground/70 hover:text-violet-400 transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          reda.alalach@gmail.com
        </a>
        <div className="w-px h-24 bg-foreground/15" />
      </aside>

      <div className="max-w-[1000px] mx-auto px-5 lg:px-12 pt-36 pb-16">
        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-foreground/80 mb-10">
          <Link to="/" viewTransition className="hover:underline transition-colors">
            Home
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <span>About</span>
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
                About Me
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold font-instrument-serif italic bg-gradient-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-6">
                Reda Alalach
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-foreground/70 mb-6">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Morocco
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Full-Stack Developer
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  B.Sc. CS — Graduating 2026
                </span>
              </div>

              {/* Bio paragraphs */}
              <div className="space-y-4 text-foreground/70 leading-relaxed max-w-2xl">
                <p>
                  Born and raised in Taounate, Morocco, I grew up surrounded by technology — both of
                  my brothers are in tech, and one of them is a DevSecOps engineer. Watching them
                  work sparked my curiosity early on and set me on the path to becoming a developer
                  myself.
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
                  serverless backends.
                </p>
              </div>

              {/* Quick recruiter facts */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { label: "Timezone", value: "GMT+1 (Morocco)" },
                  { label: "Graduating", value: "2026" },
                  { label: "Looking for", value: "Full-Stack / Backend roles" },
                  { label: "Work style", value: "Remote-ready, strong async communication" },
                  { label: "Open to", value: "Internships & junior positions" },
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
                className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/8 p-6 text-center"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-foreground/70">{stat.label}</p>
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
              How I work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-gradient-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-10">
              My Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PHILOSOPHY.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/8 p-6 hover:ring-violet-500/30 transition-all duration-300"
                >
                  <h3 className="text-base font-semibold text-teal-600 dark:text-teal-400 mb-2">
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
              My journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-gradient-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-10">
              Timeline
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
                        <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mt-1">
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
              Beyond the code
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-gradient-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mb-10">
              Fun Facts
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
                      <p className="text-xs font-medium text-foreground/70 uppercase tracking-wider">
                        {fact.label}
                      </p>
                      <p className="text-sm text-foreground/80 mt-0.5">{fact.value}</p>
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
