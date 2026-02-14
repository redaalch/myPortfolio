import { Award, Clock } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface Certification {
  title: string;
  issuer: string;
  status: "completed" | "in-progress";
  year?: string;
}

const certifications: Certification[] = [
  {
    title: "Front-End Developer Professional Certificate",
    issuer: "Meta — Coursera",
    status: "completed",
    year: "2025",
  },
  {
    title: "Back-End Developer Professional Certificate",
    issuer: "IBM",
    status: "in-progress",
  },
  {
    title: "LPIC-101",
    issuer: "Linux Professional Institute",
    status: "in-progress",
  },
];

export default function CertificationsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="certifications" className="py-24 relative">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Certifications
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Structured learning and professional credentials.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <article
              key={i}
              className="group rounded-2xl bg-white/3 ring-1 ring-white/8 p-6 hover:bg-white/6 hover:ring-white/15 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {cert.status === "completed" ? (
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center">
                    <Award className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20 flex items-center justify-center">
                    <Clock className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                )}
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    cert.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                  }`}
                >
                  {cert.status === "completed"
                    ? `Completed ${cert.year}`
                    : "In Progress"}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {cert.title}
              </h3>
              <p className="text-sm text-white/40 mt-1">{cert.issuer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
