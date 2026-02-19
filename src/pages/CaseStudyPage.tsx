import { Github, Linkedin, Mail, ArrowLeft, ExternalLink } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCaseStudyBySlug } from "../data/case-studies";
import { getProjectBySlug } from "../data/projects";
import Navbar from "../components/ui/Navbar";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;
  const project = caseStudy ? getProjectBySlug(caseStudy.projectSlug) : undefined;

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Left social strip */}
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

      {/* Right email strip */}
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

      <div className="max-w-[900px] mx-auto px-5 lg:px-12 pt-36 pb-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/80 mb-10 flex flex-wrap items-center gap-y-1">
          <Link to="/" viewTransition className="hover:underline transition-colors">
            Home
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          <Link to="/#projects" viewTransition className="hover:underline transition-colors">
            Projects
          </Link>
          <span className="mx-2.5 opacity-60">/</span>
          {project && (
            <>
              <Link
                to={`/projects/${project.slug}`}
                viewTransition
                className="hover:underline transition-colors"
              >
                {project.title}
              </Link>
              <span className="mx-2.5 opacity-60">/</span>
            </>
          )}
          <span>Case Study</span>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <p className="uppercase tracking-[1px] text-[13px] text-foreground/70 mb-4 font-normal">
            Case Study
          </p>
          <h1
            className="font-bold text-violet-400 mb-4 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            {caseStudy.title}
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed max-w-[750px]">
            {caseStudy.subtitle}
          </p>
          {project?.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              View Source Code
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </header>

        {/* Context section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">Context</h2>
          <p className="text-base text-foreground/85 leading-[1.8]">{caseStudy.context}</p>
        </section>

        {/* Constraints section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">Constraints</h2>
          <ul className="space-y-3">
            {caseStudy.constraints.map((constraint, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-400 shrink-0" />
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">Architecture</h2>
          <div className="space-y-6">
            {caseStudy.architectureSections.map((section, i) => (
              <div
                key={i}
                className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/10 p-6"
              >
                <h3 className="text-lg font-semibold text-violet-400 mb-3">{section.heading}</h3>
                <p className="text-sm text-foreground/80 leading-[1.8]">{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sequence Diagram (if available) */}
        {caseStudy.sequenceDiagram && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-foreground mb-4">Notification Flow</h2>
            <div className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/10 p-6 overflow-x-auto">
              <pre className="text-sm text-foreground/70 leading-relaxed font-mono whitespace-pre">
                {caseStudy.sequenceDiagram}
              </pre>
            </div>
            <p className="text-xs text-foreground/70 mt-2">
              Mermaid sequence diagram — paste into{" "}
              <a
                href="https://mermaid.live"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground/60"
              >
                mermaid.live
              </a>{" "}
              to render interactively.
            </p>
          </section>
        )}

        {/* Key Decisions */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Decisions & Tradeoffs</h2>
          <div className="space-y-6">
            {caseStudy.keyDecisions.map((decision, i) => (
              <div key={i} className="border-l-2 border-violet-400/40 pl-5">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {decision.question}
                </h3>
                <p className="text-sm text-foreground/75 leading-[1.8]">{decision.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.outcomes.map((outcome, i) => (
              <div
                key={i}
                className="rounded-xl bg-foreground/[0.03] ring-1 ring-foreground/10 p-5 text-center"
              >
                <p className="text-2xl font-bold text-violet-400 mb-1">{outcome.value}</p>
                <p className="text-sm text-foreground/70">{outcome.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">What I'd Do Next</h2>
          <ul className="space-y-3">
            {caseStudy.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/85 leading-relaxed">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-foreground/30 shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer navigation */}
        <div className="pt-16 border-t border-foreground/12 mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 mb-16">
          <Link
            to={project ? `/projects/${project.slug}` : "/#projects"}
            viewTransition
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded text-sm font-medium text-foreground/90 ring-1 ring-foreground/90 hover:bg-foreground/90 hover:text-background transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Project
          </Link>

          <Link
            to="/#contact"
            viewTransition
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded text-sm font-medium text-foreground/90 ring-1 ring-foreground/90 hover:bg-foreground/90 hover:text-background transition-all duration-300 hover:-translate-y-0.5"
          >
            Start a Project &rsaquo;
          </Link>
        </div>
      </div>
    </main>
  );
}
