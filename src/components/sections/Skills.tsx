import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";

/* ================================================================== */
/*  Marquee logos — slug must match cdn.simpleicons.org                */
/* ================================================================== */
const MARQUEE_LOGOS = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Express", slug: "express", color: "1a1a2e", invertDark: true },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
  { name: "GitHub Actions", slug: "githubactions", color: "2088FF" },
  { name: "Vite", slug: "vite", color: "646CFF" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Redux", slug: "redux", color: "764ABC" },
  { name: "Linux", slug: "linux", color: "FCC624" },
  { name: "Jenkins", slug: "jenkins", color: "D24939" },
  { name: "GitLab CI", slug: "gitlab", color: "FC6D26" },
  { name: "Socket.io", slug: "socketdotio", color: "1a1a2e", invertDark: true },
  { name: "Vitest", slug: "vitest", color: "6E9F18" },
  { name: "Framer Motion", slug: "framer", color: "0055FF" },
];

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */
interface Category {
  title: string;
  color: string;
  skills: string[];
  note?: string;
}

const CATEGORIES: Category[] = [
  {
    title: "Backend",
    color: "#8b5cf6",
    skills: ["Node.js", "Express", "REST APIs", "JWT Auth", "Socket.io", "MongoDB", "Mongoose"],
  },
  {
    title: "Cloud & DevOps",
    color: "#3b82f6",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "GitLab CI", "Jenkins", "Linux"],
    note: "Learning: GCP + Firebase",
  },
  {
    title: "Frontend",
    color: "#10b981",
    skills: [
      "React",
      "React Router",
      "Redux",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript",
    ],
  },
  {
    title: "Quality",
    color: "#f97316",
    skills: ["Testing Library", "Vitest", "Error Handling", "Logging & Monitoring"],
  },
];

/* ================================================================== */
/*  Layout engine                                                      */
/* ================================================================== */
const W = 900;
const H = 560;

const HUB_POS = [
  { x: 215, y: 175 },
  { x: 685, y: 160 },
  { x: 205, y: 405 },
  { x: 675, y: 420 },
];

const ANGLE_OFFSETS = [0.55, -0.5, 0.95, -0.15];

interface Sat {
  x: number;
  y: number;
  ci: number;
  si: number;
  name: string;
}

function buildLayout() {
  const sats: Sat[] = [];

  CATEGORIES.forEach((cat, ci) => {
    const hub = HUB_POS[ci];
    const n = cat.skills.length;
    cat.skills.forEach((name, si) => {
      const angle = (si / n) * Math.PI * 2 + ANGLE_OFFSETS[ci];
      const r = si % 2 === 0 ? 82 : 110;
      sats.push({
        x: hub.x + r * Math.cos(angle),
        y: hub.y + r * Math.sin(angle),
        ci,
        si,
        name,
      });
    });
  });

  const pairs: { a: Sat; b: Sat; d: number }[] = [];
  for (let i = 0; i < sats.length; i++) {
    for (let j = i + 1; j < sats.length; j++) {
      if (sats[i].ci === sats[j].ci) continue;
      const d = Math.hypot(sats[i].x - sats[j].x, sats[i].y - sats[j].y);
      if (d < 190) pairs.push({ a: sats[i], b: sats[j], d });
    }
  }
  pairs.sort((a, b) => a.d - b.d);
  const crossLinks = pairs.slice(0, 5).map((p) => [p.a, p.b] as [Sat, Sat]);

  const stars = Array.from({ length: 55 }, (_, i) => ({
    x: (i * 131 + 67) % W,
    y: (i * 197 + 41) % H,
    r: 0.3 + ((i * 43) % 10) / 12,
    o: 0.025 + ((i * 59) % 10) / 200,
  }));

  return { sats, crossLinks, stars };
}

function labelPos(sx: number, sy: number, hx: number, hy: number) {
  const a = Math.atan2(sy - hy, sx - hx);
  const cos = Math.cos(a);
  const d = 15;
  return {
    x: sx + d * cos,
    y: sy + d * Math.sin(a),
    anchor: (cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle") as "start" | "end" | "middle",
  };
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function SkillsSection() {
  const { ref, visible } = useScrollReveal();
  const [active, setActive] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { sats, crossLinks, stars } = useMemo(() => buildLayout(), []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const enter = useCallback((ci: number) => {
    clearTimeout(timer.current);
    setActive(ci);
  }, []);

  const leave = useCallback(() => {
    timer.current = setTimeout(() => setActive(null), 120);
  }, []);

  const op = (ci: number) => (active == null ? 1 : active === ci ? 1 : 0.1);

  const lop = (ci: number) => (active == null ? 0.18 : active === ci ? 0.5 : 0.03);

  return (
    <section id="skills" className="py-32 relative">
      {/* Light-mode decorative glow blobs */}
      <div className="skills-glow" aria-hidden="true">
        <span className="skills-blob skills-blob--1" />
        <span className="skills-blob skills-blob--2" />
        <span className="skills-blob skills-blob--3" />
      </div>
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 relative ${visible ? "reveal visible" : "reveal"}`}
      >
        <div className="text-center mb-12">
          <span className="text-violet-600 dark:text-violet-400 text-sm font-semibold uppercase tracking-widest">
            Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-heading-from via-heading-via to-heading-to bg-clip-text text-transparent mt-3 font-instrument-serif italic">
            Skills & Technologies
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
            Tools I use daily, plus what I'm actively leveling up.
          </p>
        </div>

        {/* ── Mobile fallback: card grid ── */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {CATEGORIES.map((cat, ci) => (
            <div key={ci} className="rounded-xl border border-foreground/8 bg-foreground/3 p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <h3 className="text-sm font-semibold text-foreground tracking-wide">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1.5 rounded-full border text-foreground/70"
                    style={{
                      borderColor: `${cat.color}30`,
                      backgroundColor: `${cat.color}08`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {cat.note && (
                <p className="text-[11px] mt-3 italic" style={{ color: cat.color }}>
                  {cat.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── Desktop: constellation SVG ── */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full select-none hidden md:block"
          role="img"
          aria-label="Constellation map of skills and technologies"
          onPointerLeave={leave}
        >
          <defs>
            {CATEGORIES.map((cat, i) => (
              <filter key={i} id={`cg${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feFlood floodColor={cat.color} floodOpacity="0.5" result="c" />
                <feComposite in="c" in2="b" operator="in" result="g" />
                <feMerge>
                  <feMergeNode in="g" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {stars.map((s, i) => (
            <circle
              key={`s${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="currentColor"
              className="text-foreground"
              style={{
                opacity: visible ? s.o : 0,
                transition: `opacity 1.2s ease ${0.2 + i * 0.02}s`,
              }}
            />
          ))}

          {crossLinks.map(([a, b], i) => (
            <line
              key={`cl${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="currentColor"
              className="text-foreground"
              strokeWidth="0.5"
              strokeDasharray="3 5"
              style={{
                opacity: visible ? (active == null ? 0.04 : 0.008) : 0,
                transition: "opacity 0.5s ease 0.9s",
              }}
            />
          ))}

          {CATEGORIES.map((cat, ci) => {
            const hub = HUB_POS[ci];
            const clusterSats = sats.filter((s) => s.ci === ci);
            const isHot = active === ci;

            return (
              <g key={ci}>
                {clusterSats.map((s, si) => (
                  <line
                    key={`l${si}`}
                    x1={hub.x}
                    y1={hub.y}
                    x2={s.x}
                    y2={s.y}
                    stroke={cat.color}
                    strokeWidth={isHot ? "1" : "0.6"}
                    style={{
                      opacity: visible ? lop(ci) : 0,
                      transition: `opacity 0.4s ease ${0.35 + si * 0.06}s, stroke-width 0.25s`,
                    }}
                  />
                ))}

                {clusterSats.map((s, si) => {
                  const lp = labelPos(s.x, s.y, hub.x, hub.y);
                  const d = 0.45 + si * 0.07;
                  return (
                    <g
                      key={`n${si}`}
                      onPointerEnter={() => enter(ci)}
                      onPointerLeave={leave}
                      className="cursor-pointer"
                    >
                      <circle cx={s.x} cy={s.y} r="16" fill="transparent" />
                      <circle
                        cx={s.x}
                        cy={s.y}
                        r="6"
                        fill={`${cat.color}15`}
                        style={{
                          opacity: visible ? op(ci) : 0,
                          transformOrigin: `${s.x}px ${s.y}px`,
                          transform: isHot ? "scale(1.8)" : "scale(1)",
                          transition: `opacity 0.4s ease ${d}s, transform 0.3s ease`,
                        }}
                      />
                      <circle
                        cx={s.x}
                        cy={s.y}
                        r="2.5"
                        fill={cat.color}
                        style={{
                          opacity: visible ? op(ci) : 0,
                          transformOrigin: `${s.x}px ${s.y}px`,
                          transform: isHot ? "scale(1.4)" : "scale(1)",
                          transition: `opacity 0.4s ease ${d}s, transform 0.25s ease`,
                        }}
                      />
                      <text
                        x={lp.x}
                        y={lp.y}
                        textAnchor={lp.anchor}
                        dominantBaseline="middle"
                        fill={
                          isHot
                            ? cat.color
                            : "color-mix(in srgb, var(--color-foreground) 65%, transparent)"
                        }
                        style={{
                          fontSize: isHot ? "10px" : "8.5px",
                          fontWeight: isHot ? 600 : 400,
                          opacity: visible ? op(ci) : 0,
                          transition: `all 0.3s ease ${d + 0.08}s`,
                          pointerEvents: "none",
                        }}
                      >
                        {s.name}
                      </text>
                    </g>
                  );
                })}

                <g
                  onPointerEnter={() => enter(ci)}
                  onPointerLeave={leave}
                  className="cursor-pointer"
                >
                  <circle cx={hub.x} cy={hub.y} r="28" fill="transparent" />
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="10"
                    fill={`${cat.color}10`}
                    style={{
                      opacity: visible ? op(ci) : 0,
                      transformOrigin: `${hub.x}px ${hub.y}px`,
                      transform: isHot ? "scale(2)" : "scale(1)",
                      transition: "opacity 0.5s ease 0.2s, transform 0.35s ease",
                    }}
                  />
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="5"
                    fill={cat.color}
                    filter={isHot ? `url(#cg${ci})` : undefined}
                    style={{
                      opacity: visible ? op(ci) : 0,
                      transformOrigin: `${hub.x}px ${hub.y}px`,
                      transform: isHot ? "scale(1.3)" : "scale(1)",
                      transition: "opacity 0.5s ease 0.2s, transform 0.3s ease",
                    }}
                  />
                  <text
                    x={hub.x}
                    y={hub.y - 22}
                    textAnchor="middle"
                    fill={
                      isHot
                        ? "var(--color-foreground)"
                        : "color-mix(in srgb, var(--color-foreground) 65%, transparent)"
                    }
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      opacity: visible ? op(ci) : 0,
                      transition: "all 0.3s ease 0.25s",
                      pointerEvents: "none",
                    }}
                  >
                    {cat.title}
                  </text>
                </g>

                {cat.note && (
                  <text
                    x={hub.x}
                    y={hub.y + 32}
                    textAnchor="middle"
                    fill={cat.color}
                    style={{
                      fontSize: "7.5px",
                      fontStyle: "italic",
                      opacity: visible ? (isHot ? 0.8 : 0.5) : 0,
                      transition: "opacity 0.4s ease 0.6s",
                      pointerEvents: "none",
                    }}
                  >
                    {cat.note}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="hidden md:flex flex-wrap justify-center gap-6 mt-6">
          {CATEGORIES.map((cat, ci) => (
            <div
              key={ci}
              className="flex items-center gap-2 cursor-pointer"
              onPointerEnter={() => enter(ci)}
              onPointerLeave={leave}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: cat.color,
                  opacity: op(ci),
                  transition: "opacity 0.3s",
                }}
              />
              <span
                className="text-xs text-foreground/70"
                style={{ opacity: op(ci), transition: "opacity 0.3s" }}
              >
                {cat.title}
              </span>
            </div>
          ))}
        </div>

        {/* ── Tech logo marquee ── */}
        <div
          className="mt-16 relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6rem, black calc(100% - 6rem), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6rem, black calc(100% - 6rem), transparent)",
          }}
        >
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex items-center shrink-0"
                style={{ gap: "3rem" }}
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {MARQUEE_LOGOS.map((logo) => (
                  <div
                    key={`${copy}-${logo.name}`}
                    className="flex flex-col items-center gap-2 group"
                    style={{ marginRight: 0 }}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`}
                      alt={logo.name}
                      width={28}
                      height={28}
                      loading="lazy"
                      className={`opacity-40 group-hover:opacity-90 transition-opacity duration-300${"invertDark" in logo && logo.invertDark ? " dark:invert" : ""}`}
                    />
                    <span className="sr-only">{logo.name}</span>
                  </div>
                ))}
                {/* spacer to match gap at the seam */}
                <div className="shrink-0 w-12" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
