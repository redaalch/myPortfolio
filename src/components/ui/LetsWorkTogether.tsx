import type React from "react";
import { useState } from "react";
import { ArrowUpRight, Send, Loader2, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-foreground/20 bg-foreground/3 px-4 py-2.5 text-sm text-foreground placeholder-foreground/60 outline-none transition-colors focus:border-foreground/40 focus:bg-foreground/5";

export default function LetsWorkTogether() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setShowForm(true), 500);
  };

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
        }, 3000);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section className="flex items-center justify-center px-6 py-16">
      <div className="relative flex flex-col items-center gap-12 w-full max-w-xl">
        {/* ── Contact form (revealed after click) ── */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-start gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: showForm ? 1 : 0,
            transform: showForm ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            pointerEvents: showForm ? "auto" : "none",
          }}
        >
          {/* Heading */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/60 transition-all duration-500"
              style={{
                transform: showForm ? "translateY(0)" : "translateY(10px)",
                opacity: showForm ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              Let's talk
            </span>
            <h3
              className="text-3xl font-bold font-instrument-serif italic bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent transition-all duration-500 sm:text-4xl"
              style={{
                transform: showForm ? "translateY(0)" : "translateY(10px)",
                opacity: showForm ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              Get in Touch
            </h3>
          </div>

          {/* Form */}
          <div
            className="w-full rounded-2xl border border-foreground/15 bg-foreground/2 backdrop-blur-sm p-6 sm:p-8 transition-all duration-500"
            style={{
              transform: showForm ? "translateY(0)" : "translateY(15px)",
              opacity: showForm ? 1 : 0,
              transitionDelay: "300ms",
            }}
          >
            {formState === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <CheckCircle2 className="size-9 text-emerald-400" strokeWidth={1.5} />
                <p className="text-sm font-light text-foreground/70">
                  Message sent — I'll be in touch!
                </p>
              </div>
            ) : formState === "error" ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="size-9 rounded-full bg-red-500/15 flex items-center justify-center">
                  <span className="text-red-400 text-lg font-semibold">!</span>
                </div>
                <p className="text-sm font-light text-foreground/70">
                  Something went wrong — please try again.
                </p>
                <p className="text-xs text-foreground/70">
                  Or email me at{" "}
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
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
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

          {/* Email hint */}
          <span
            className="text-xs tracking-widest uppercase text-foreground/60 transition-all duration-500"
            style={{
              transform: showForm ? "translateY(0)" : "translateY(10px)",
              opacity: showForm ? 1 : 0,
              transitionDelay: "450ms",
            }}
          >
            reda.alalach@gmail.com
          </span>
        </div>

        {/* ── Hero content (hidden after click) ── */}
        <div
          className="flex items-center gap-3 transition-all duration-500"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(-20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium tracking-widest uppercase text-foreground/60">
            Available for projects
          </span>
        </div>

        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          style={{ pointerEvents: isClicked ? "none" : "auto" }}
        >
          <div className="flex flex-col items-center gap-6">
            <h2
              className="relative text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] font-instrument-serif italic"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
              }}
            >
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-linear-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent"
                  style={{
                    transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                  }}
                >
                  Let's work
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                  style={{
                    transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                  }}
                >
                  <span className="text-foreground/60">together</span>
                </span>
              </span>
            </h2>

            {/* Circle arrow button */}
            <div className="relative mt-4 flex size-16 items-center justify-center sm:size-20">
              <div
                className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                style={{
                  borderColor: isClicked
                    ? "rgb(139 92 246)"
                    : isHovered
                      ? "rgb(139 92 246)"
                      : "var(--color-foreground, #fff)",
                  backgroundColor: isClicked
                    ? "transparent"
                    : isHovered
                      ? "rgb(139 92 246)"
                      : "transparent",
                  transform: isClicked ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                  opacity: isClicked ? 0 : 0.3,
                  transitionDuration: isClicked ? "700ms" : "500ms",
                }}
              />
              <ArrowUpRight
                className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                style={{
                  transform: isClicked
                    ? "translate(100px, -100px) scale(0.5)"
                    : isHovered
                      ? "translate(2px, -2px)"
                      : "translate(0, 0)",
                  opacity: isClicked ? 0 : 1,
                  color: isHovered && !isClicked ? "white" : "var(--color-foreground, #fff)",
                  transitionDuration: isClicked ? "600ms" : "500ms",
                }}
              />
            </div>
          </div>

          {/* Side lines */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
            <div
              className="h-px w-8 bg-foreground/20 transition-all duration-500 sm:w-12"
              style={{
                transform: isClicked
                  ? "scaleX(0) translateX(-20px)"
                  : isHovered
                    ? "scaleX(1.5)"
                    : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
              }}
            />
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
            <div
              className="h-px w-8 bg-foreground/20 transition-all duration-500 sm:w-12"
              style={{
                transform: isClicked
                  ? "scaleX(0) translateX(20px)"
                  : isHovered
                    ? "scaleX(1.5)"
                    : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
              }}
            />
          </div>
        </div>

        {/* Subtext */}
        <div
          className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <p className="max-w-md text-sm leading-relaxed text-foreground/60">
            Have a project in mind or an internship opportunity? I'd love to hear about it. Let's
            create something exceptional together.
          </p>
          <span className="text-xs tracking-widest uppercase text-foreground/60">
            reda.alalach@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
}
