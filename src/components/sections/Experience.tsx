import { Briefcase } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface Experience {
  company: string;
  role: string;
  period: string;
  type: string;
  bullets: string[];
  tags: string[];
}

const experiences: Experience[] = [
  {
    company: "Technocolabs Softwares Inc.",
    role: "Full-Stack Developer Intern (MERN)",
    period: "Oct 2025 – Present",
    type: "Remote",
    bullets: [
      "Built real-time notifications with Socket.io to instantly inform users on task assignment/updates.",
      "Implemented secure flows with JWT authentication and robust Express middleware (global error handling).",
      "Helped deploy and troubleshoot full-stack environments (Render/Vercel/Railway/Netlify) with proper env config.",
      "Added a /health status endpoint and improved UX feedback with toast notifications.",
    ],
    tags: ["Node.js", "Express", "JWT", "Socket.io", "Deployment"],
  },
  {
    company: "ALCHDEV BUSINESS",
    role: "Web Developer Intern",
    period: "Jul 2025 – Sep 2025",
    type: "On-site",
    bullets: [
      "Contributed to a React.js codebase: built new pages, improved UI consistency, and integrated APIs.",
      "Worked with React Router, Redux, and UI component libraries to speed delivery.",
      "Improved performance and cross-browser compatibility through refactoring and UI polishing.",
    ],
    tags: ["React", "Redux", "React Router", "REST APIs", "CSS"],
  },
];

export default function ExperienceSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Career
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Experience
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Production-style feature work: authentication, API integration,
            real-time updates, deployment, and reliability.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((xp, i) => (
            <article
              key={i}
              className="group rounded-2xl bg-white/3 ring-1 ring-white/8 p-6 md:p-8 hover:bg-white/6 hover:ring-white/15 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 ring-1 ring-violet-500/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{xp.company}</h3>
                  <p className="text-sm text-white/50">
                    {xp.role} &middot; {xp.type} &middot; {xp.period}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 ml-14">
                {xp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-sm text-white/60 leading-relaxed before:content-['▸'] before:text-violet-400 before:mr-2"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-5 ml-14">
                {xp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50 ring-1 ring-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
