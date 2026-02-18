import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
];

const cvHref = "/Reda_Alalach_Resume.pdf";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/70">
      <div className="mx-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          viewTransition
          className="inline-flex items-center text-foreground"
        >
          <Logo height={36} />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-2"
        >
          <div className="flex items-center gap-1 rounded-full bg-foreground/5 px-1 py-1 ring-1 ring-foreground/10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                viewTransition
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              View CV
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
          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 ring-1 ring-foreground/15"
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
        <div className="md:hidden mx-6 mb-4 rounded-2xl bg-background/60 ring-1 ring-foreground/10 backdrop-blur-xl p-4 animate-fade-slide-in-1">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                viewTransition
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              View CV
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
    </header>
  );
}
