import type React from "react";

import { useState } from "react";
import { ArrowUpRight, Mail, FileText, X } from "lucide-react";

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setShowSuccess(true);
    }, 450);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setIsClicked(false);
    setIsButtonHovered(false);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[88vh] items-center justify-center px-6 py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_45%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center gap-10 text-white">
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: showSuccess ? 1 : 0,
            transform: showSuccess
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.95)",
            pointerEvents: showSuccess ? "auto" : "none",
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/12 hover:text-white"
            aria-label="Close and go back"
          >
            <X className="size-4" strokeWidth={1.8} />
          </button>

          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[11px] font-medium tracking-[0.26em] uppercase text-white/60 transition-all duration-500"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              Perfect
            </span>
            <h3
              className="text-3xl font-light tracking-tight text-white transition-all duration-500 sm:text-[2.45rem]"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              Let's connect
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a
              href="assets/Reda_Alalach_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium ring-1 transition-all duration-500"
              style={{
                borderColor: isButtonHovered
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.2)",
                backgroundColor: isButtonHovered
                  ? "rgba(255,255,255,0.92)"
                  : "rgba(255,255,255,0.04)",
                color: isButtonHovered ? "#0a0a0a" : "#ffffff",
                transform: showSuccess ? "translateY(0)" : "translateY(15px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "140ms",
              }}
            >
              <FileText className="size-4" strokeWidth={1.8} />
              View CV
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>

            <a
              href="mailto:reda.alalach@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-transparent px-6 py-3 text-sm font-medium text-white/85 ring-1 ring-white/15 hover:bg-white/8 hover:text-white transition-all duration-500"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(15px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "220ms",
              }}
            >
              <Mail className="size-4" strokeWidth={1.8} />
              Email Me
            </a>
          </div>

          <span
            className="text-[11px] tracking-[0.2em] uppercase text-white/45 transition-all duration-500"
            style={{
              transform: showSuccess ? "translateY(0)" : "translateY(10px)",
              opacity: showSuccess ? 1 : 0,
              transitionDelay: "420ms",
            }}
          >
            Ready for internships & freelance projects
          </span>
        </div>

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
          <span className="text-[13px] font-medium tracking-[0.2em] uppercase text-white/65">
            Available for projects
          </span>
        </div>

        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) =>
            handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>)
          }
          style={{
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <div className="flex flex-col items-center gap-7">
            <h2
              className="relative text-center text-6xl font-light leading-[0.93] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7.4rem] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked
                  ? "translateY(-40px) scale(0.95)"
                  : "translateY(0) scale(1)",
              }}
            >
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform:
                      isHovered && !isClicked
                        ? "translateY(-8%)"
                        : "translateY(0)",
                  }}
                >
                  Let's work
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                  style={{
                    transform:
                      isHovered && !isClicked
                        ? "translateY(-8%)"
                        : "translateY(0)",
                  }}
                >
                  <span className="text-white/35">together</span>
                </span>
              </span>
            </h2>

            <div className="relative mt-2 flex size-[4.25rem] items-center justify-center sm:size-[5rem]">
              <div
                className="pointer-events-none absolute inset-0 rounded-full ring-1 transition-all ease-out"
                style={{
                  borderColor: "transparent",
                  backgroundColor: isClicked
                    ? "transparent"
                    : isHovered
                      ? "rgba(255,255,255,0.92)"
                      : "transparent",
                  boxShadow: isHovered
                    ? "inset 0 0 0 1px rgba(255,255,255,0.9)"
                    : "inset 0 0 0 1px rgba(255,255,255,0.25)",
                  transform: isClicked
                    ? "scale(3)"
                    : isHovered
                      ? "scale(1.1)"
                      : "scale(1)",
                  opacity: isClicked ? 0 : 1,
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
                  color: isHovered && !isClicked ? "#111111" : "#ffffff",
                  transitionDuration: isClicked ? "600ms" : "500ms",
                }}
              />
            </div>
          </div>

          <div className="absolute -left-10 top-1/2 -translate-y-1/2 sm:-left-20">
            <div
              className="h-px w-10 bg-white/18 transition-all duration-500 sm:w-16"
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
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 sm:-right-20">
            <div
              className="h-px w-10 bg-white/18 transition-all duration-500 sm:w-16"
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

        <div
          className="mt-4 flex flex-col items-center gap-3 text-center transition-all duration-500 delay-100"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <p className="max-w-[35rem] text-[15px] leading-relaxed text-white/58">
            Have a project in mind or an internship opportunity? I'd love to
            hear about it and build something great together.
          </p>
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">
            reda.alalach@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
}
