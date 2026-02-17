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
  Heart,
  BookOpen,
  Coffee,
  Gamepad2,
  Globe,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/ui/Navbar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import profileImg from "../assets/profile.jpeg";

/* ================================================================== */
/*  Data — replace with your real content                              */
/* ================================================================== */
const STATS = [
  { value: "3+", label: "Years Coding" },
  { value: "10+", label: "Projects Shipped" },
  { value: "5", label: "Certifications" },
  { value: "4", label: "Tech Stacks" },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Full-Stack Portfolio Shipped",
    description:
      "Built and deployed a production-grade portfolio with React 19, Tailwind v4, Docker, and CI/CD via GitHub Actions.",
    icon: Rocket,
    color: "#8b5cf6",
  },
  {
    year: "2023",
    title: "DevOps & Cloud Certifications",
    description:
      "Earned certifications in Docker, Kubernetes, and CI/CD pipelines. Started working with Jenkins and GitLab CI.",
    icon: GraduationCap,
    color: "#3b82f6",
  },
  {
    year: "2022",
    title: "First Full-Stack Projects",
    description:
      "Built real-time apps with Node.js, Express, MongoDB, and React. Learned Socket.io and JWT authentication.",
    icon: Briefcase,
    color: "#10b981",
  },
  {
    year: "2021",
    title: "Started Coding Journey",
    description:
      "Wrote my first lines of JavaScript and fell in love with building things for the web. Learned HTML, CSS, and React fundamentals.",
    icon: Code2,
    color: "#f97316",
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
    icon: Heart,
    label: "Passion",
    value: "Open source & dev tools",
  },
  {
    icon: Code2,
    label: "Favorite Stack",
    value: "React + Node + Docker",
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
    <div
      ref={ref}
      className={`${visible ? "reveal visible" : "reveal"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background text-white overflow-hidden">
      <Navbar />

      {/* ── Left social strip ── */}
      <aside className="hidden lg:flex fixed left-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-5">
          <a
            href="https://github.com/redaalch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400/70 hover:text-violet-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/reda-alalach/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400/70 hover:text-violet-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:reda.alalach@gmail.com"
            className="text-violet-400/70 hover:text-violet-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="w-px h-24 bg-white/15" />
      </aside>

      {/* ── Right email strip ── */}
      <aside className="hidden lg:flex fixed right-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <a
          href="mailto:reda.alalach@gmail.com"
          className="text-xs tracking-[0.18em] text-white/40 hover:text-violet-400 transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          reda.alalach@gmail.com
        </a>
        <div className="w-px h-24 bg-white/15" />
      </aside>

      <div className="max-w-[1000px] mx-auto px-5 lg:px-12 pt-36 pb-16">
        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-white/80 mb-10">
          <Link
            to="/"
            viewTransition
            className="hover:underline transition-colors"
          >
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
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover ring-2 ring-white/10"
              />
              {/* Status badge */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-500/25 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </span>
            </div>

            {/* Bio text */}
            <div className="text-center md:text-left">
              <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
                About Me
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold font-instrument-serif italic bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent mb-6">
                Reda Alalach
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/50 mb-6">
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
                  3+ years experience
                </span>
              </div>

              {/* Bio paragraphs — replace with your own */}
              <div className="space-y-4 text-white/70 leading-relaxed max-w-2xl">
                <p>
                  I'm a full-stack developer who thrives on turning ideas into
                  polished, production-ready applications. I work across the
                  entire stack — from crafting responsive React interfaces to
                  building robust Node.js backends and containerized deployments
                  with Docker and Kubernetes.
                </p>
                <p>
                  When I'm not coding, I'm exploring new tools, contributing to
                  open-source projects, or diving into DevOps best practices. I
                  believe great software is built at the intersection of clean
                  code, thoughtful design, and reliable infrastructure.
                </p>
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
                className="rounded-xl bg-white/[0.03] ring-1 ring-white/8 p-6 text-center"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </section>
        </RevealSection>

        {/* ================================================================ */}
        {/*  3. Philosophy                                                   */}
        {/* ================================================================ */}
        <RevealSection>
          <section className="mb-24">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
              How I work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent mb-10">
              My Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PHILOSOPHY.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white/[0.03] ring-1 ring-white/8 p-6 hover:ring-violet-500/30 transition-all duration-300"
                >
                  <h3 className="text-base font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
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
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
              My journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent mb-10">
              Timeline
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />

              <div className="space-y-10">
                {TIMELINE.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative flex gap-6">
                      {/* Dot */}
                      <div
                        className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ring-white/10 bg-background"
                        style={{
                          boxShadow: `0 0 20px ${item.color}33`,
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: item.color }}
                        />
                      </div>
                      {/* Content */}
                      <div className="pb-2">
                        <span className="text-xs font-medium text-white/40 tracking-widest uppercase">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-semibold text-white mt-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed mt-1 max-w-lg">
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
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Beyond the code
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent mb-10">
              Fun Facts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {FUN_FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="flex items-start gap-4 rounded-xl bg-white/[0.03] ring-1 ring-white/8 p-5 hover:ring-violet-500/30 transition-all duration-300"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
                        {fact.label}
                      </p>
                      <p className="text-sm text-white/80 mt-0.5">
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
        {/*  6. CTA                                                          */}
        {/* ================================================================ */}
        <RevealSection>
          <section className="text-center py-16 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-instrument-serif italic bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent mb-4">
              Let's Work Together
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of something great.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/#contact"
                viewTransition
                className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:bg-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/#projects"
                viewTransition
                className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 hover:ring-white/20 hover:scale-105 transition-all duration-300"
              >
                View My Work
              </Link>
            </div>
          </section>
        </RevealSection>
      </div>
    </main>
  );
}
