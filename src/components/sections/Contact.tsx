import type React from "react";
import { useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ArrowUpRight, FileText, Send, Loader2, CheckCircle2, Mail, CircleDot } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-foreground/20 bg-foreground/3 px-4 py-2.5 text-sm text-foreground placeholder-foreground/60 outline-none transition-colors focus:border-foreground/40 focus:bg-foreground/5";

const cellClass =
  "rounded-2xl border border-foreground/15 bg-foreground/2 backdrop-blur-sm relative overflow-hidden";

const skills = ["Frontend", "Backend", "Full Stack"];

export default function ContactSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [cvHovered, setCvHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const body = new FormData(e.currentTarget);
      body.append("access_key", (import.meta.env.VITE_WEB3FORMS_KEY ?? "").trim());

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await res.json();

      if (data.success) {
        setFormState("sent");
        setTimeout(() => {
          setFormState("idle");
          setFormData({ name: "", email: "", message: "" });
        }, 2500);
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
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="section-glow section-glow--contact" aria-hidden="true">
        <span className="sg-blob sg-blob--1" />
        <span className="sg-blob sg-blob--2" />
        <span className="sg-blob sg-blob--3" />
      </div>
      <div
        ref={ref}
        className={`mx-auto grid max-w-6xl grid-cols-1 gap-3 lg:grid-cols-[1fr_2fr] ${visible ? "reveal visible" : "reveal"}`}
      >
        {/* ── Cell 1: Heading ── */}
        <div className={`${cellClass} flex flex-col justify-between px-8 py-10 sm:py-12`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-6">
            <div>
              <span className="text-[10px] font-medium tracking-[0.28em] uppercase text-foreground/70">
                Get in touch
              </span>
              <h2 className="mt-3 text-5xl font-light leading-[0.93] tracking-tight sm:text-6xl lg:text-7xl font-instrument-serif italic bg-gradient-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent">
                Let's
                <br />
                work
                <br />
                <span className="text-foreground/70">together</span>
              </h2>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-foreground/70">
              Have a project in mind or an internship opportunity? I'd love to build something great
              together.
            </p>
          </div>
        </div>

        {/* ── Right column: nested grid ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* ── Contact Form (full width of right col) ── */}
          <div className={`${cellClass} px-6 py-8 sm:col-span-2 sm:px-8`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.04)_0%,transparent_50%)]" />
            <div className="relative z-10">
              {formState === "sent" ? (
                <div className="flex flex-col items-center gap-3 py-8 animate-fade-slide-in-1">
                  <CheckCircle2 className="size-9 text-emerald-400" strokeWidth={1.5} />
                  <p className="text-sm font-light text-foreground/70">
                    Message sent — I'll be in touch!
                  </p>
                </div>
              ) : formState === "error" ? (
                <div className="flex flex-col items-center gap-3 py-8 animate-fade-slide-in-1">
                  <div className="size-9 rounded-full bg-red-500/15 flex items-center justify-center">
                    <span className="text-red-400 text-lg font-semibold">!</span>
                  </div>
                  <p className="text-sm font-light text-foreground/70">
                    Something went wrong — please try again.
                  </p>
                  <p className="text-xs text-foreground/70">
                    Or email me directly at{" "}
                    <a
                      href="mailto:reda.alalach@gmail.com"
                      className="text-violet-400 hover:underline"
                    >
                      reda.alalach@gmail.com
                    </a>
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-foreground/5 ring-1 ring-foreground/10 px-4 py-2 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <span className="mb-1 text-[10px] font-medium tracking-[0.28em] uppercase text-foreground/70">
                    Send a message
                  </span>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      aria-label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className={inputClass}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      aria-label="Email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Your message..."
                    required
                    aria-label="Message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className={`resize-none ${inputClass}`}
                  />
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300 hover:bg-foreground/90 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" strokeWidth={1.8} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Availability (full width of right col) ── */}
          <div className={`${cellClass} flex flex-col gap-4 px-6 py-6 sm:col-span-2`}>
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-foreground/80">
                Available for internships & projects
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/8 bg-foreground/3 px-3.5 py-1.5 text-xs font-medium text-foreground/70"
                >
                  <CircleDot className="size-3 text-emerald-400/70" strokeWidth={2} />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ── View CV (50% of right col) ── */}
          <a
            href="/Reda_Alalach_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCvHovered(true)}
            onMouseLeave={() => setCvHovered(false)}
            className={`${cellClass} group flex items-center justify-between px-6 py-6 transition-all duration-400`}
            style={{
              backgroundColor: cvHovered
                ? "color-mix(in srgb, var(--color-foreground) 6%, transparent)"
                : undefined,
            }}
          >
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-foreground/70" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-foreground/80">View CV</p>
                <p className="text-[11px] text-foreground/70">Download resume</p>
              </div>
            </div>
            <ArrowUpRight
              className="size-5 text-foreground/70 transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>

          {/* ── Email (50% of right col) ── */}
          <a
            href="mailto:reda.alalach@gmail.com"
            className={`${cellClass} group flex items-center justify-between px-6 py-6 transition-all duration-400 hover:bg-foreground/4`}
          >
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-foreground/70" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-foreground/80">Email</p>
                <p className="text-[11px] text-foreground/70">reda.alalach@gmail.com</p>
              </div>
            </div>
            <ArrowUpRight
              className="size-5 text-foreground/70 transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
