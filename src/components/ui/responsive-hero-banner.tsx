"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import profileImg from "../../assets/profile.jpeg";

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
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
  ctaButtonText = "View CV",
  ctaButtonHref = "assets/Reda_Alalach_Resume.pdf",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* ── Decorative grid dots (asymmetric, top-right) ── */}
      <div className="absolute top-20 right-12 w-48 h-48 opacity-[0.06] pointer-events-none hidden lg:block">
        <svg width="100%" height="100%" viewBox="0 0 192 192">
          {Array.from({ length: 64 }, (_, i) => (
            <circle
              key={i}
              cx={(i % 8) * 24 + 12}
              cy={Math.floor(i / 8) * 24 + 12}
              r="1.5"
              fill="white"
            />
          ))}
        </svg>
      </div>

      {/* ── Decorative line accent (bottom-left) ── */}
      <div className="absolute bottom-24 left-0 w-32 h-px bg-linear-to-r from-transparent via-violet-400/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-28 left-6 w-20 h-px bg-linear-to-r from-transparent via-violet-400/10 to-transparent hidden lg:block" />

      <header className="z-10 xl:top-4 relative">
        <div className="mx-6">
          <div className="flex items-center justify-between pt-4">
            <a href="#" className="inline-flex items-center text-white">
              <Logo height={36} />
            </a>

            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center gap-2"
            >
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium hover:text-white transition-colors ${
                      link.isActive ? "text-white/90" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={ctaButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
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
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
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
                  className="h-5 w-5 text-white/90"
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
                  className="h-5 w-5 text-white/90"
                >
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 rounded-2xl bg-black/60 ring-1 ring-white/10 backdrop-blur-xl p-4 animate-fade-slide-in-1">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={ctaButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
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
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-12 lg:gap-16">
            {/* Left column — text */}
            <div className="max-w-2xl text-center lg:text-left">
              <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-slide-in-1">
                Backend / Full-Stack / DevOps — Open to internships
              </p>

              <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-4xl text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
                Hi, I'm <span className="text-violet-400">Reda</span>
                <br />
                Full-Stack Developer
              </h1>

              <p className="sm:text-lg animate-fade-slide-in-3 text-base text-white/60 max-w-xl mt-6 leading-relaxed">
                I build reliable Node.js/Express backends, add real-time
                features with Socket.io, and ship modern UIs with React.
                Currently exploring Google Cloud &amp; Firebase.
              </p>

              <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center lg:items-start animate-fade-slide-in-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white hover:bg-violet-400 transition-colors"
                >
                  View Projects
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
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Right column — photo */}
            <div className="relative shrink-0 animate-fade-slide-in-3">
              {/* Glow behind photo */}
              <div className="absolute -inset-4 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="relative">
                <img
                  src={profileImg}
                  alt="Reda Alalach"
                  width={340}
                  height={340}
                  loading="eager"
                  decoding="async"
                  className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl object-cover ring-1 ring-white/10 shadow-2xl"
                />
                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-br-2xl border-b-2 border-r-2 border-violet-400/30" />
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-tl-2xl border-t-2 border-l-2 border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
