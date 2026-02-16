import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function VerticalBanner() {
  const [visible, setVisible] = useState(false);

  /* Show banner once user scrolls past the hero (100vh) */
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Left strip: social links + line ── */}
      <aside
        className={`vertical-banner hidden lg:flex fixed left-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6 transition-all duration-500 ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-5">
          <a
            href="https://github.com/redaalch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400/70 hover:text-violet-400 hover:scale-110 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/reda-alalach/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400/70 hover:text-violet-400 hover:scale-110 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:reda.alalach@gmail.com"
            className="text-violet-400/70 hover:text-violet-400 hover:scale-110 transition-all duration-200"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="w-px h-24 bg-linear-to-b from-violet-400/30 to-transparent" />
      </aside>

      {/* ── Right strip: email ── */}
      <aside
        className={`vertical-banner hidden lg:flex fixed right-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6 transition-all duration-500 ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <a
          href="mailto:reda.alalach@gmail.com"
          className="text-xs tracking-[0.18em] text-white/40 hover:text-violet-400 transition-colors duration-200"
          style={{ writingMode: "vertical-rl" }}
        >
          reda.alalach@gmail.com
        </a>
        <div className="w-px h-24 bg-linear-to-b from-white/15 to-transparent" />
      </aside>
    </>
  );
}
