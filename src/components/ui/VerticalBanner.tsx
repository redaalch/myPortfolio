import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import profileImg from "../../assets/profile.avif";

export default function VerticalBanner() {
  const [visible, setVisible] = useState(false);

  /* Show banner once user scrolls past the hero (100vh) */
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Left strip: social links + line ── */}
      <aside
        className={`vertical-banner hidden lg:flex fixed left-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-7">
          {/* GitHub with tooltip profile card + layer stack */}
          <div className="sc-tooltip-container">
            <div className="sc-tooltip">
              <div className="sc-profile">
                <div className="sc-user">
                  <img src={profileImg} alt="Reda Alalach" width={40} height={40} loading="lazy" className="sc-avatar" />
                  <div className="sc-details">
                    <div className="sc-name">Reda Alalach</div>
                    <div className="sc-username">@redaalch</div>
                  </div>
                </div>
                <div className="sc-about">Open Source & Full-Stack Dev</div>
              </div>
            </div>
            <a
              href="https://github.com/redaalch"
              target="_blank"
              rel="noopener noreferrer"
              className="sc-icon-link"
              aria-label="GitHub"
            >
              <div className="sc-layer">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span className="sc-layer-icon">
                  <Github className="w-6 h-6" />
                </span>
              </div>
            </a>
          </div>

          {/* LinkedIn with tooltip profile card + layer stack */}
          <div className="sc-tooltip-container">
            <div className="sc-tooltip">
              <div className="sc-profile">
                <div className="sc-user">
                  <img src={profileImg} alt="Reda Alalach" width={40} height={40} loading="lazy" className="sc-avatar" />
                  <div className="sc-details">
                    <div className="sc-name">Reda Alalach</div>
                    <div className="sc-username">@reda-alalach</div>
                  </div>
                </div>
                <div className="sc-about">Full-Stack Developer · 500+ Connections</div>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/reda-alalach/"
              target="_blank"
              rel="noopener noreferrer"
              className="sc-icon-link"
              aria-label="LinkedIn"
            >
              <div className="sc-layer">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span className="sc-layer-icon">
                  <Linkedin className="w-6 h-6" />
                </span>
              </div>
            </a>
          </div>

          {/* Email with tooltip card + layer stack */}
          <div className="sc-tooltip-container">
            <div className="sc-tooltip">
              <div className="sc-profile">
                <div className="sc-user">
                  <img src={profileImg} alt="Reda Alalach" width={40} height={40} loading="lazy" className="sc-avatar" />
                  <div className="sc-details">
                    <div className="sc-name">Reda Alalach</div>
                    <div className="sc-username">reda.alalach@gmail.com</div>
                  </div>
                </div>
                <div className="sc-about">Feel free to reach out!</div>
              </div>
            </div>
            <a href="mailto:reda.alalach@gmail.com" className="sc-icon-link" aria-label="Email">
              <div className="sc-layer">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span className="sc-layer-icon">
                  <Mail className="w-6 h-6" />
                </span>
              </div>
            </a>
          </div>
        </div>
        <div className="w-px h-24 bg-linear-to-b from-violet-400/30 to-transparent" />
      </aside>

      {/* ── Right strip: email ── */}
      <aside
        className={`vertical-banner hidden lg:flex fixed right-8 top-0 bottom-0 z-30 flex-col items-center justify-center gap-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <a
          href="mailto:reda.alalach@gmail.com"
          className="text-xs tracking-[0.18em] text-foreground/70 hover:text-violet-400 transition-colors duration-200"
          style={{ writingMode: "vertical-rl" }}
        >
          reda.alalach@gmail.com
        </a>
        <div className="w-px h-24 bg-linear-to-b from-foreground/15 to-transparent" />
      </aside>
    </>
  );
}
