import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Shared left + right social sidebars used on inner pages
 * (About, ProjectDetails, CaseStudy).
 *
 * The HomePage uses VerticalBanner instead — which has scroll-triggered
 * visibility + tooltip profile cards + layer-stack animations.
 */
export default function SocialSidebar() {
  const iconClass =
    "text-gray-500 dark:text-violet-400/70 hover:text-violet-600 dark:hover:text-violet-400 transition-colors";

  return (
    <>
      {/* ── Left strip: social links + line ── */}
      <aside className="hidden lg:flex fixed left-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-5">
          <a
            href="https://github.com/redaalch"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/reda-alalach/"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:reda.alalach@gmail.com" className={iconClass} aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="w-px h-24 bg-gray-200 dark:bg-foreground/15" />
      </aside>

      {/* ── Right strip: email ── */}
      <aside className="hidden lg:flex fixed right-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6">
        <a
          href="mailto:reda.alalach@gmail.com"
          className="text-xs tracking-[0.18em] text-gray-500 dark:text-foreground/70 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          reda.alalach@gmail.com
        </a>
        <div className="w-px h-24 bg-gray-200 dark:bg-foreground/15" />
      </aside>
    </>
  );
}
