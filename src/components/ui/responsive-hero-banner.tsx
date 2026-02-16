"use client";

import React, { useState } from "react";
import Logo from "./Logo";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface ResponsiveHeroBannerProps {
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  techStack?: string[];
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  backgroundImageUrl = "/hero-2400w.avif",
  navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
  ctaButtonText = "View CV",
  ctaButtonHref = "assets/Reda_Alalach_Resume.pdf",
  badgeLabel = "Open to Work",
  badgeText = "Backend / Full-Stack / DevOps Internships",
  title = "Hi, I'm Reda Alalach",
  titleLine2 = "Full-Stack Developer",
  description = "I build reliable Node.js/Express backends, add real-time features with Socket.io, and ship modern UIs with React. Currently exploring Google Cloud & Firebase.",
  primaryButtonText = "View Projects",
  primaryButtonHref = "#projects",
  secondaryButtonText = "Contact Me",
  secondaryButtonHref = "#contact",
  partnersTitle = "Technologies I work with",
  techStack = [
    "Node.js",
    "Express",
    "MongoDB",
    "React",
    "TypeScript",
    "Socket.io",
    "Docker",
    "Firebase",
    "Tailwind CSS",
    "Linux",
  ],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img
        src={backgroundImageUrl}
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
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

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

      <div className="z-10 relative">
        <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-28 px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
              <span className="inline-flex items-center text-xs font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-2">
                {badgeLabel}
              </span>
              <span className="text-sm font-medium text-white/90">
                {badgeText}
              </span>
            </div>

            <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-4xl text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
              {title}
              <br className="hidden sm:block" />
              {titleLine2}
            </h1>

            <p className="sm:text-lg animate-fade-slide-in-3 text-base text-white/80 max-w-2xl mt-6 mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide-in-4">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-5 transition-colors"
              >
                {primaryButtonText}
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
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {secondaryButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-4xl">
            <p className="animate-fade-slide-in-1 text-sm text-white/70 text-center">
              {partnersTitle}
            </p>
            <div className="flex flex-wrap justify-center animate-fade-slide-in-2 mt-6 gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white/80 ring-1 ring-white/10 backdrop-blur hover:bg-white/15 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
