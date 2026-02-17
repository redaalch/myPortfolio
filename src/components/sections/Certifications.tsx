import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface Certification {
  title: string;
  issuer: string;
  issuerLogo: string;
  status: "completed" | "in-progress";
  issuedDate?: string;
  link: string;
}

const certifications: Certification[] = [
  {
    title: "Front-End Developer Professional Certificate",
    issuer: "Meta — Coursera",
    issuerLogo: "https://cdn.simpleicons.org/meta/0081FB",
    status: "completed",
    issuedDate: "Jan 2025",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/62TQTQSEFIFT",
  },
  {
    title: "Back-End JavaScript Developer Professional Certificate",
    issuer: "IBM — Coursera",
    issuerLogo: "https://cdn-icons-png.flaticon.com/512/5969/5969147.png",
    status: "in-progress",
    link: "https://www.coursera.org/professional-certificates/backend-javascript-developer",
  },
  {
    title: "LPIC-1: System Administrator",
    issuer: "Linux Professional Institute",
    issuerLogo: "https://cdn.simpleicons.org/linux/FCC624",
    status: "in-progress",
    link: "https://www.lpi.org/our-certifications/lpic-1-overview/",
  },
];

export default function CertificationsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="certifications" className="py-32 relative">
      <div
        ref={ref}
        className={`max-w-[1000px] mx-auto px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent mt-3 font-instrument-serif italic">
            Licenses & Certifications
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-violet-400/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {certifications.map((cert, i) => (
            <a
              key={i}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white/[0.03] rounded-[4px] p-5 h-full transition-all duration-300"
            >
              {/* Head: Logo + external link */}
              <div className="flex items-start justify-between">
                <div
                  className="w-[50px] h-[50px] rounded-[4px] bg-center bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url(${cert.issuerLogo})` }}
                />
                <ExternalLink className="w-[22px] h-[22px] text-white/40 group-hover:text-violet-400 transition-colors" />
              </div>

              {/* Title + Platform */}
              <div className="flex-1">
                <h3 className="mt-7 text-[clamp(20px,5vw,24px)] font-bold leading-[1.2] text-white group-hover:text-violet-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="mt-4 text-[clamp(15px,3.7vw,18px)] font-semibold leading-[1.2] text-white/60">
                  {cert.issuer}
                </p>
              </div>

              {/* Date */}
              <p className="mt-7 text-[clamp(12px,2.5vw,14px)] font-semibold leading-[1.2] text-white/40">
                {cert.status === "completed"
                  ? `Issued ${cert.issuedDate} · No Expiration Date`
                  : "In Progress"}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
