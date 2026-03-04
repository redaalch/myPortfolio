import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./certifications.css";

interface Certification {
  key: string;
  issuerLogo: string;
  status: "completed" | "in-progress";
  credentialId?: string;
  link: string;
}

const certifications: Certification[] = [
  {
    key: "meta-frontend",
    issuerLogo: "https://cdn.simpleicons.org/meta/0081FB",
    status: "completed",
    credentialId: "62TQTQSEFIFT",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/62TQTQSEFIFT",
  },
  {
    key: "ibm-backend",
    issuerLogo: "https://cdn-icons-png.flaticon.com/512/5969/5969147.png",
    status: "in-progress",
    link: "https://www.coursera.org/professional-certificates/backend-javascript-developer",
  },
  {
    key: "lpic1",
    issuerLogo: "https://cdn.simpleicons.org/linux/FCC624",
    status: "in-progress",
    link: "https://www.lpi.org/our-certifications/lpic-1-overview/",
  },
];

/* ── Status pill component ── */
function StatusPill({ status }: { status: Certification["status"] }) {
  const isComplete = status === "completed";
  const { t } = useTranslation();
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
      {isComplete ? t("certifications.completed") : t("certifications.inProgress")}
    </span>
  );
}

export default function CertificationsSection() {
  const { ref, visible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <section id="certifications" className="pt-32 pb-44 sm:py-32 relative">
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
            {t("certifications.sectionLabel")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mt-3 font-instrument-serif italic">
            {t("certifications.sectionTitle")}
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
                className="group flex flex-col cert-card rounded-2xl p-5 h-full active:scale-[0.98] transition-all duration-300"
              >
                {/* Head: Logo box + external link */}
                <div className="flex items-start justify-between">
                  <div className="cert-logo-box">
                    <img
                      src={cert.issuerLogo}
                      alt={`${t(`certifications.items.${cert.key}.issuer`)} logo`}
                      width={36}
                      height={36}
                      loading="lazy"
                      className="size-9 object-contain"
                    />
                  </div>
                  <span
                    className="cert-external-link"
                    aria-label={t("certifications.viewCredential")}
                    title={t("certifications.viewCredential")}
                  >
                    <ExternalLink className="size-4" strokeWidth={1.8} />
                  </span>
                </div>

                {/* Title + Platform */}
                <div className="flex-1 mt-5">
                  <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-violet-300 transition-colors line-clamp-2">
                    {t(`certifications.items.${cert.key}.title`)}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t(`certifications.items.${cert.key}.issuer`)}
                  </p>
                </div>

                {/* Footer: status pill + metadata */}
                <div className="cert-card-footer">
                  <StatusPill status={cert.status} />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cert.status === "completed"
                      ? t(`certifications.items.${cert.key}.issuedText`)
                      : null}
                  </p>
                  {cert.status === "in-progress" && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      {t(`certifications.items.${cert.key}.progressNote`)}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-gray-500 dark:text-gray-500 tracking-wide">
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
