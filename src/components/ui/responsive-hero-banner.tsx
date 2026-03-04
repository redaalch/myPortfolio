import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import profileImg from "../../assets/profile.avif";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface ResponsiveHeroBannerProps {
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  navLinks = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
  ctaButtonText = "View CV",
  ctaButtonHref = "/Reda_Alalach_Resume.pdf",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      {/* ── Background: hero image with heavy overlay to match section style ── */}
      <img
        src="/hero-2400w.avif"
        srcSet="/hero-1200w.avif 1200w, /hero-2400w.avif 2400w"
        sizes="100vw"
        alt=""
        width={2400}
        height={1344}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/80" />

      {/* ── Rising bubbles inside hero ── */}
      <div className="bg-bubbles" aria-hidden="true">
        <span
          style={{
            left: "8%",
            width: 48,
            height: 48,
            background: "rgba(139,92,246,0.14)",
            animationDuration: "10s",
          }}
        />
        <span
          style={{
            left: "25%",
            width: 28,
            height: 28,
            background: "rgba(167,139,250,0.11)",
            animationDuration: "13s",
            animationDelay: "1.5s",
          }}
        />
        <span
          style={{
            left: "45%",
            width: 60,
            height: 60,
            background: "rgba(99,102,241,0.08)",
            animationDuration: "16s",
            animationDelay: "3s",
          }}
        />
        <span
          style={{
            left: "65%",
            width: 36,
            height: 36,
            background: "rgba(168,85,247,0.12)",
            animationDuration: "11s",
            animationDelay: "5s",
          }}
        />
        <span
          style={{
            left: "80%",
            width: 44,
            height: 44,
            background: "rgba(192,132,252,0.10)",
            animationDuration: "14s",
            animationDelay: "2s",
          }}
        />
        <span
          style={{
            left: "92%",
            width: 20,
            height: 20,
            background: "rgba(129,140,248,0.13)",
            animationDuration: "9s",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* ── Decorative grid dots (asymmetric, top-right) ── */}
      <div className="absolute top-20 right-12 w-48 h-48 opacity-[0.12] dark:opacity-[0.06] pointer-events-none hidden lg:block">
        <svg width="100%" height="100%" viewBox="0 0 192 192" className="text-foreground">
          {Array.from({ length: 64 }, (_, i) => (
            <circle
              key={i}
              cx={(i % 8) * 24 + 12}
              cy={Math.floor(i / 8) * 24 + 12}
              r="1.5"
              fill="currentColor"
            />
          ))}
        </svg>
      </div>

      {/* ── Light-mode depth: soft pastel purple radial gradient ── */}
      <div
        className="absolute top-0 right-0 w-150 h-150 pointer-events-none dark:hidden"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0.02) 45%, transparent 70%)",
        }}
      />

      {/* ── Decorative line accent (bottom-left) ── */}
      <div className="absolute bottom-24 left-0 w-32 h-px bg-linear-to-r from-transparent via-violet-400/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-28 left-6 w-20 h-px bg-linear-to-r from-transparent via-violet-400/10 to-transparent hidden lg:block" />

      <header className="z-10 xl:top-4 relative">
        <div className="mx-6">
          <div className="flex items-center justify-between pt-4 relative">
            {/* Left — Logo */}
            <a href="#" className="inline-flex items-center text-foreground shrink-0">
              <Logo height={36} />
            </a>

            {/* Center — Floating glass pill (desktop) */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-4 z-10"
            >
              <div className="flex items-center gap-1 rounded-full backdrop-blur-md bg-foreground/4 px-1.5 py-1 ring-1 ring-gray-200 dark:ring-foreground/10 shadow-md dark:shadow-none">
                {navLinks.map((link, index) => {
                  const cls = `px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                    link.isActive
                      ? "bg-violet-500/15 text-foreground"
                      : "text-foreground/45 hover:text-foreground hover:bg-white/[0.08] dark:hover:bg-white/[0.08]"
                  }`;
                  return link.href.startsWith("/") ? (
                    <Link key={index} to={link.href} viewTransition className={cls}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={index} href={link.href} className={cls}>
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Right — Actions (desktop) */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <a
                href={ctaButtonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                {ctaButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* Mobile / tablet controls */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 ring-1 ring-foreground/15 backdrop-blur"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-foreground/90"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-foreground/90"
                  >
                    <path d="M4 5h16" />
                    <path d="M4 12h16" />
                    <path d="M4 19h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 rounded-2xl bg-white/90 dark:bg-[#030014]/80 ring-1 ring-gray-200 dark:ring-white/10 border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-2xl p-4 animate-fade-slide-in-1">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const cls =
                    "px-4 py-4 text-sm font-medium text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors";
                  return link.href.startsWith("/") ? (
                    <Link
                      key={index}
                      to={link.href}
                      viewTransition
                      onClick={() => setMobileMenuOpen(false)}
                      className={cls}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={index}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cls}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <a
                  href={ctaButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 dark:bg-white/10 border border-violet-600 dark:border-white/20 px-4 py-4 text-sm font-medium text-white dark:text-white hover:bg-violet-700 dark:hover:bg-white/15 active:scale-95 active:opacity-80 transition-all"
                >
                  {ctaButtonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Hero content: left-aligned text + right photo ── */}
      <div className="z-10 relative">
        <div className="sm:pt-28 md:pt-32 lg:pt-36 max-w-7xl mx-auto pt-24 px-6 pb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-10 lg:gap-10">
            {/* Left column — text */}
            <div className="max-w-2xl text-center lg:text-left">
              <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-slide-in-1">
                {t("hero.tagline")}
              </p>

              <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-4xl text-foreground tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
                {t("hero.greeting")}{" "}
                <span className="bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {t("hero.name")}
                </span>
                <br />
                <span className="bg-linear-to-r from-hero-from via-hero-via to-hero-to bg-clip-text text-transparent">
                  {t("hero.role")}
                </span>
              </h1>

              <p className="sm:text-lg animate-fade-slide-in-3 text-base text-foreground/70 max-w-xl mt-6 leading-relaxed">
                {t("hero.description")}
              </p>

              {/* Recruiter at-a-glance */}
              <div className="animate-fade-slide-in-3 mt-5 flex flex-col items-center sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-foreground/50">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-violet-600 dark:text-violet-400/70 shrink-0"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  {t("hero.roleShort")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-violet-600 dark:text-violet-400/70 shrink-0"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t("hero.location")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 animate-pulse" />
                  </span>
                  {t("hero.availability")}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center lg:items-start animate-fade-slide-in-4">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 active:opacity-80 transition-all duration-300"
                >
                  {t("hero.viewProjects")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-transparent dark:bg-foreground/5 ring-1 ring-gray-300 dark:ring-foreground/10 px-6 py-3 text-sm font-medium text-gray-700 dark:text-foreground/80 hover:bg-violet-50 hover:ring-violet-500 hover:text-violet-600 dark:hover:text-foreground dark:hover:bg-foreground/10 dark:hover:ring-foreground/20 hover:scale-105 active:scale-95 active:opacity-80 transition-all duration-300"
                >
                  {t("hero.contactMe")}
                </a>
              </div>
            </div>

            {/* Right column — photo */}
            <div className="relative shrink-0 animate-fade-slide-in-3">
              {/* Glow behind photo (dark) / Shadow lift (light) */}
              <div className="absolute -inset-6 rounded-3xl bg-violet-500/15 blur-3xl hidden dark:block" />
              <div className="relative">
                <img
                  src={profileImg}
                  alt="Reda Alalach"
                  width={480}
                  height={480}
                  loading="eager"
                  decoding="async"
                  className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl object-cover ring-1 ring-white/10 shadow-2xl shadow-purple-900/10 dark:shadow-[0_0_40px_rgba(139,92,246,0.25),0_0_80px_rgba(139,92,246,0.1)]"
                />
                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-br-2xl border-b-2 border-r-2 border-violet-400/30" />
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-tl-2xl border-t-2 border-l-2 border-foreground/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
