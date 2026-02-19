import { Github, Linkedin, Mail, CheckCircle2, Gauge } from "lucide-react";
import Logo from "../ui/Logo";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const lighthouseScores = [
  { label: "Performance", score: "95+" },
  { label: "Accessibility", score: "100" },
  { label: "Best Practices", score: "100" },
  { label: "SEO", score: "100" },
];

export default function Footer() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <footer className="py-16 relative">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 ${visible ? "reveal visible" : "reveal"}`}>
        {/* Lighthouse scores */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Gauge className="w-4 h-4 text-foreground/70" />
          {lighthouseScores.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3 py-1.5 text-xs font-medium text-foreground/70 ring-1 ring-foreground/8"
            >
              {item.label}
              <span className="text-violet-400 font-semibold">{item.score}</span>
            </span>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo height={28} className="opacity-50" />
            <span className="text-sm text-foreground/70">&middot; Full-Stack Developer</span>
          </div>

          <div className="flex items-center gap-4">
            {/* CI status */}
            <a
              href="https://github.com/redaalch/myPortfolio/actions/workflows/static.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-500/20 hover:bg-emerald-500/15 transition-colors"
              aria-label="CI status"
            >
              <CheckCircle2 className="w-3 h-3" />
              CI passing
            </a>

            <a
              href="https://www.linkedin.com/in/reda-alalach/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-foreground/5 ring-1 ring-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/redaalch"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-foreground/5 ring-1 ring-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:reda.alalach@gmail.com"
              className="w-9 h-9 rounded-full bg-foreground/5 ring-1 ring-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-foreground/70 mt-8">
          &copy; {new Date().getFullYear()} Reda Alalach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
