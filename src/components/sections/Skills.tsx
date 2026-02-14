import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Server, Cloud, Layout, TestTube } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  note?: string;
  gradient: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    icon: <Server className="w-5 h-5" />,
    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "JWT Auth",
      "Socket.io",
      "MongoDB",
      "Mongoose",
    ],
    gradient: "from-violet-500 to-blue-500",
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5" />,
    skills: [
      "Docker",
      "Kubernetes (basics)",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
      "Linux",
    ],
    note: "Learning: GCP Cloud Functions + Firebase",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5" />,
    skills: [
      "React",
      "React Router",
      "Redux",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript",
    ],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Quality",
    icon: <TestTube className="w-5 h-5" />,
    skills: [
      "Testing Library",
      "Vitest",
      "API Error Handling",
      "Logging & Monitoring",
    ],
    gradient: "from-orange-500 to-rose-500",
  },
];

export default function SkillsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Skills & Technologies
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Tools I use daily, plus what I'm actively leveling up.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <article
              key={i}
              className="group rounded-2xl bg-white/3 ring-1 ring-white/8 p-6 hover:bg-white/6 hover:ring-white/15 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br ${cat.gradient} bg-opacity-10 mb-4`}
                style={{
                  background: `linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))`,
                }}
              >
                <span className="text-violet-400">{cat.icon}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4">{cat.title}</h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60 ring-1 ring-white/8 hover:bg-white/10 hover:text-white/80 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {cat.note && (
                <p className="text-xs text-violet-400/60 mt-4 italic">
                  {cat.note}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
