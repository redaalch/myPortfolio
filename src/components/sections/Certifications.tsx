import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface Certification {
  title: string;
  issuer: string;
  issuerLogo: string;
  status: "completed" | "in-progress";
  issuedDate?: string;
  credentialId?: string;
  progressNote?: string;
  link: string;
}

const certifications: Certification[] = [
  {
    title: "Front-End Developer Professional Certificate",
    issuer: "Meta — Coursera",
    issuerLogo: "https://cdn.simpleicons.org/meta/0081FB",
    status: "completed",
    issuedDate: "Jan 2025",
    credentialId: "62TQTQSEFIFT",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/62TQTQSEFIFT",
  },
  {
    title: "Back-End JavaScript Developer Professional Certificate",
    issuer: "IBM — Coursera",
    issuerLogo: "https://cdn-icons-png.flaticon.com/512/5969/5969147.png",
    status: "in-progress",
    progressNote: "Next: Express & Databases module",
    link: "https://www.coursera.org/professional-certificates/backend-javascript-developer",
  },
  {
    title: "LPIC-1: System Administrator",
    issuer: "Linux Professional Institute",
    issuerLogo: "https://cdn.simpleicons.org/linux/FCC624",
    status: "in-progress",
    progressNote: "Target: Summer 2026",
    link: "https://www.lpi.org/our-certifications/lpic-1-overview/",
  },
];

/* ── Status pill component ── */
function StatusPill({ status }: { status: Certification["status"] }) {
  const isComplete = status === "completed";
  return (
    <span
      className={`cert-status-pill ${
        isComplete ? "cert-status-pill--completed" : "cert-status-pill--progress"
      }`}
    >
      <span
        className={`inline-block size-1.5 rounded-full ${
          isComplete ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
      {isComplete ? "Completed" : "In Progress"}
    </span>
  );
}

export default function CertificationsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="certifications" className="py-32 relative">
      <div className="section-glow section-glow--certs" aria-hidden="true">
        <span className="sg-blob sg-blob--1" />
        <span className="sg-blob sg-blob--2" />
      </div>
      <div
        ref={ref}
        className={`max-w-300 mx-auto px-6 relative ${visible ? "" : "reveal"} ${visible ? "reveal visible" : ""}`}
      >
        <div className="text-center mb-16">
          <span className="text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mt-3 font-instrument-serif italic">
            Licenses & Certifications
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-violet-400/40" />
        </div>

        <div className="cert-container rounded-3xl p-4 sm:p-6 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert, i) => (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col cert-card rounded-2xl p-5 h-full transition-all duration-300"
              >
                {/* Head: Logo box + external link */}
                <div className="flex items-start justify-between">
                  <div className="cert-logo-box">
                    <img
                      src={cert.issuerLogo}
                      alt={`${cert.issuer} logo`}
                      width={36}
                      height={36}
                      loading="lazy"
                      className="size-9 object-contain"
                    />
                  </div>
                  <span
                    className="cert-external-link"
                    aria-label="View credential"
                    title="View credential"
                  >
                    <ExternalLink className="size-4" strokeWidth={1.8} />
                  </span>
                </div>

                {/* Title + Platform */}
                <div className="flex-1 mt-5">
                  <h3 className="text-lg font-semibold leading-snug text-teal-600/90 dark:text-teal-400/85 group-hover:text-violet-400 dark:group-hover:text-violet-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium text-foreground/60">{cert.issuer}</p>
                </div>

                {/* Footer: status pill + metadata */}
                <div className="cert-card-footer">
                  <StatusPill status={cert.status} />
                  <p className="text-xs text-foreground/50">
                    {cert.status === "completed"
                      ? `Issued ${cert.issuedDate} · No Expiration`
                      : null}
                  </p>
                  {cert.progressNote && (
                    <p className="text-xs text-foreground/45 italic">{cert.progressNote}</p>
                  )}
                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-foreground/35 tracking-wide">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
