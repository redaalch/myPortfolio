import { Github, Linkedin, Mail } from "lucide-react";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo height={28} className="opacity-50" />
            <span className="text-sm text-white/50">
              &middot; Backend & Full-Stack Developer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/reda-alalach/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/redaalch"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:reda.alalach@gmail.com"
              className="w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 mt-8">
          &copy; {new Date().getFullYear()} Reda Alalach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
