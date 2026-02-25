import type React from "react";
import { useState, useCallback } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  ArrowUpRight,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  Mail,
  Copy,
  Check,
  Lock,
} from "lucide-react";

/* ── Field wrapper with label + helper + error ── */
function Field({
  label,
  name,
  error,
  helper,
  children,
}: {
  label: string;
  name: string;
  error: string | null;
  helper?: string;
  children: React.ReactNode;
}) {
  const errorId = `contact-${name}-error`;
  const helperId = `contact-${name}-helper`;
  const describedBy =
    [error ? errorId : null, helper ? helperId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col" data-describedby={describedBy}>
      <label htmlFor={`contact-${name}`} className="contact-label">
        {label}
      </label>
      {children}
      <div className="contact-field-error" id={errorId} role="alert">
        {error ?? "\u00A0"}
      </div>
      {helper && !error && (
        <span className="contact-helper" id={helperId}>
          {helper}
        </span>
      )}
    </div>
  );
}

/* ── Project-type options for the toggle group ── */
const projectTypes = ["Frontend", "Backend", "Full Stack", "Internship"] as const;
type ProjectType = (typeof projectTypes)[number];

/* ── Inline validation helpers ── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: string, value: string): string | null {
  if (!value.trim()) {
    if (name === "name") return "Please enter your name";
    if (name === "email") return "Please enter your email";
    if (name === "message") return "Please enter a message";
  }
  if (name === "email" && value.trim() && !emailRegex.test(value.trim())) {
    return "Please enter a valid email";
  }
  return null;
}

export default function ContactSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [selectedTypes, setSelectedTypes] = useState<Set<ProjectType>>(new Set());
  const [emailCopied, setEmailCopied] = useState(false);

  /* ── Derive field errors (only shown after blur) ── */
  const getError = useCallback(
    (field: string) =>
      touched[field] ? validateField(field, formData[field as keyof typeof formData]) : null,
    [formData, touched],
  );

  const handleBlur = (field: string) => setTouched((t) => ({ ...t, [field]: true }));

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  const toggleType = (type: ProjectType) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const copyEmail = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText("reda.alalach@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1500);
    } catch {
      /* fallback: do nothing */
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Mark all fields as touched to show any remaining errors */
    setTouched({ name: true, email: true, message: true });
    if (
      validateField("name", formData.name) ||
      validateField("email", formData.email) ||
      validateField("message", formData.message)
    ) {
      /* Scroll to first invalid field */
      const firstInvalid = ["name", "email", "message"].find((f) =>
        validateField(f, formData[f as keyof typeof formData]),
      );
      if (firstInvalid) {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document
          .getElementById(`contact-${firstInvalid}`)
          ?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
      }
      return;
    }

    setFormState("sending");

    try {
      const body = new FormData(e.currentTarget);
      body.append("access_key", (import.meta.env.VITE_WEB3FORMS_KEY ?? "").trim());
      if (selectedTypes.size > 0) {
        body.append("project_type", [...selectedTypes].join(", "));
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await res.json();

      if (data.success) {
        setFormState("sent");
        setTouched({});
        setTimeout(() => {
          setFormState("idle");
          setFormData({ name: "", email: "", message: "" });
          setSelectedTypes(new Set());
        }, 3000);
      } else {
        console.error("Web3Forms error:", data);
        setFormState("error");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      style={{ paddingBottom: "max(5rem, calc(4rem + env(safe-area-inset-bottom)))" }}
    >
      {/* ── Background glow (light-mode only — see CSS) ── */}
      <div className="section-glow section-glow--contact" aria-hidden="true">
        <span className="sg-blob sg-blob--1" />
        <span className="sg-blob sg-blob--2" />
        <span className="sg-blob sg-blob--3" />
      </div>

      <div
        ref={ref}
        className={`mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[1fr_2fr] ${
          visible ? "reveal visible" : "reveal"
        }`}
      >
        {/* ════════════════════════════════════════════════
            LEFT COLUMN — Headline card
           ════════════════════════════════════════════════ */}
        <div className="contact-card flex flex-col justify-between p-5 sm:p-8 md:p-10 lg:py-12">
          {/* subtle inner glow — top-left only for consistent light source */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 20% 10%, rgba(139,92,246,0.08) 0%, transparent 55%)",
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div>
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-foreground/60">
                Get in touch
              </span>
              <h2 className="mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[0.93] tracking-tight font-instrument-serif italic bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent">
                Let's
                <br />
                work
                <br />
                <span className="text-foreground/60">together</span>
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-foreground/65">
              Have a project in mind or an internship opportunity? I'd love to build something great
              together.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            RIGHT COLUMN — Form & secondary modules
           ════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
          {/* ── Contact Form (spans full right-column width) ── */}
          <div className="contact-card p-5 sm:col-span-2 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.04) 0%, transparent 45%)",
              }}
            />

            <div className="relative z-10">
              {/* ── Success state ── */}
              {formState === "sent" ? (
                <div className="flex flex-col items-center gap-4 py-10 animate-fade-slide-in-1">
                  <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/12 ring-1 ring-emerald-400/25">
                    <CheckCircle2 className="size-6 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground/90">Message sent!</p>
                    <p className="mt-1 text-xs text-foreground/60">
                      I typically respond within 24–48 hours.
                    </p>
                  </div>
                </div>
              ) : formState === "error" ? (
                /* ── Error state ── */
                <div className="flex flex-col items-center gap-4 py-10 animate-fade-slide-in-1">
                  <div className="flex size-12 items-center justify-center rounded-full bg-red-500/12 ring-1 ring-red-400/25">
                    <span className="text-red-400 text-lg font-semibold">!</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground/90">Something went wrong</p>
                    <p className="mt-1 text-xs text-foreground/60">
                      Or email me directly at{" "}
                      <a
                        href="mailto:reda.alalach@gmail.com"
                        className="text-accent-light hover:underline"
                      >
                        reda.alalach@gmail.com
                      </a>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="mt-1 contact-cta"
                    style={{ width: "auto", padding: "0 24px", height: 40 }}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                /* ── Form (idle / sending) ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-1" noValidate>
                  <span className="mb-3 text-[11px] font-medium tracking-[0.25em] uppercase text-foreground/60">
                    Send a message
                  </span>

                  {/* ── What are you looking for? — chip toggle group ── */}
                  <div className="mb-2 flex flex-col gap-2">
                    <span className="text-xs font-medium text-foreground/50">
                      What are you looking for?
                    </span>
                    <div
                      className="flex flex-wrap gap-2 contact-chip-scroll"
                      role="group"
                      aria-label="Project type"
                    >
                      {projectTypes.map((type) => {
                        const selected = selectedTypes.has(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleType(type)}
                            className={`contact-chip ${selected ? "contact-chip--selected" : ""}`}
                          >
                            {selected && <span className="contact-chip-dot" />}
                            {type}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[11px] text-foreground/50">
                      Helps me route your message
                    </span>
                  </div>

                  {/* ── Name & Email ── */}
                  <div className="grid grid-cols-1 gap-x-4 gap-y-0 sm:grid-cols-2">
                    <Field label="Name" name="name" error={getError("name")}>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        aria-describedby={getError("name") ? "contact-name-error" : undefined}
                        className={`contact-input ${getError("name") ? "has-error" : ""}`}
                      />
                    </Field>
                    <Field label="Email" name="email" error={getError("email")}>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        aria-describedby={getError("email") ? "contact-email-error" : undefined}
                        className={`contact-input ${getError("email") ? "has-error" : ""}`}
                      />
                    </Field>
                  </div>

                  {/* ── Message ── */}
                  <Field label="Message" name="message" error={getError("message")}>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      autoComplete="off"
                      placeholder="Tell me about your project or opportunity…"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      aria-describedby={getError("message") ? "contact-message-error" : undefined}
                      className={`contact-input contact-textarea ${getError("message") ? "has-error" : ""}`}
                    />
                  </Field>

                  {/* ── CTA Button with states ── */}
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="contact-cta mt-1"
                  >
                    {formState === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4" strokeWidth={1.8} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* ── Form footer bar ── */}
                  <div className="contact-form-footer">
                    <span>I typically reply within 1–24h</span>
                    <span className="inline-flex items-center gap-1">
                      <Lock className="size-3" strokeWidth={1.5} />
                      Your email stays private
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── Availability — secondary module (lighter weight) ── */}
          <div
            className="contact-card flex flex-col gap-2 p-4 sm:p-6 sm:col-span-2"
            style={{ opacity: 0.85 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[13px] font-medium text-foreground/70">
                Available for internships &amp; projects
              </span>
            </div>
          </div>

          {/* ── View CV — action card ── */}
          <a
            href="/Reda_Alalach_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-action-card group p-4 sm:p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-foreground/5">
                <FileText className="size-5 text-foreground/60" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/85">View CV</p>
                <p className="text-[11px] text-foreground/55">Download resume</p>
              </div>
            </div>
            <ArrowUpRight
              className="size-5 text-foreground/50 transition-all duration-300 group-hover:text-foreground/80 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>

          {/* ── Email — action card with copy affordance ── */}
          <div
            className="contact-card contact-action-card group p-4 sm:p-5 cursor-pointer"
            role="group"
          >
            <a
              href="mailto:reda.alalach@gmail.com"
              className="flex items-center gap-3 min-w-0 flex-1 no-underline"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-foreground/5">
                <Mail className="size-5 text-foreground/60" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground/85">Email</p>
                <p className="truncate text-[11px] text-foreground/55">reda.alalach@gmail.com</p>
              </div>
            </a>

            {/* Copy button */}
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="relative ml-2 flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground/40 transition-colors hover:bg-foreground/10 hover:text-foreground/70"
            >
              {emailCopied ? (
                <Check className="size-3.5 text-emerald-400" strokeWidth={2} />
              ) : (
                <Copy className="size-3.5" strokeWidth={1.8} />
              )}

              {/* Toast — positioned inside card bounds, RTL-safe */}
              {emailCopied && (
                <span
                  className="contact-toast absolute -top-8 whitespace-nowrap rounded-md bg-foreground/90 px-2 py-1 text-[10px] font-medium text-background"
                  style={{ insetInlineEnd: 0 }}
                >
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
