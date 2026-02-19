# remyportfolio.me

> Personal portfolio of **Reda Alalach** — full-stack developer.

[![Live Site](https://img.shields.io/badge/live-remyportfolio.me-8b5cf6?style=for-the-badge)](https://remyportfolio.me)
[![Deploy](https://github.com/redaalch/myPortfolio/actions/workflows/static.yml/badge.svg)](https://github.com/redaalch/myPortfolio/actions/workflows/static.yml)
[![CodeQL](https://github.com/redaalch/myPortfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/redaalch/myPortfolio/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

![Lighthouse Performance](https://img.shields.io/badge/Performance-95+-8b5cf6?logo=lighthouse&logoColor=white)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-100-8b5cf6?logo=lighthouse&logoColor=white)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-8b5cf6?logo=lighthouse&logoColor=white)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100-8b5cf6?logo=lighthouse&logoColor=white)

---

## Features

- **Dark / Light theme** with system preference detection and zero-FOUC inline script
- **View Transitions** via React Router v7 for smooth page-to-page crossfades
- **Code-split sections** — hero ships first; 6 below-fold sections lazy-loaded
- **AVIF hero images** at two breakpoints (5–15 KB) with `<link rel="preload">`
- **Scroll-reveal animations** via Intersection Observer hook
- **Responsive carousel** for project cards with swipe-friendly navigation
- **Case study pages** with architecture breakdowns and Mermaid sequence diagrams
- **About page** with timeline, stats, philosophy, and fun facts
- **Working contact form** via [Web3Forms](https://web3forms.com) — no backend required
- **WCAG AA contrast** across both themes (audited, 40+ fixes applied)
- **SEO**: canonical URL, Open Graph, Twitter Card, JSON-LD Person schema
- **Accessibility**: skip-to-content link, focus-visible rings, semantic landmarks

## Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Framework | React 19                     |
| Styling   | Tailwind CSS v4              |
| Bundler   | Vite 7                       |
| Language  | TypeScript 5.9               |
| Hosting   | GitHub Pages (custom domain) |

## Screenshot

![Portfolio Screenshot](/public/og-image.png)

## Local Development

```bash
# Install dependencies
npm ci

# Set up environment variables
cp .env.example .env
# Edit .env and add your Web3Forms access key

# Start dev server
npm run dev

# Lint
npm run lint

# Build for production
npm run build
```

### Environment Variables

| Variable             | Description                                                        | Required |
| -------------------- | ------------------------------------------------------------------ | -------- |
| `VITE_WEB3FORMS_KEY` | [Web3Forms](https://web3forms.com) access key for the contact form | Yes      |

For production (GitHub Pages), add `VITE_WEB3FORMS_KEY` as a **repository secret** in Settings → Secrets → Actions. The CI workflow injects it at build time.

### Docker (one-command run)

```bash
# Build and run with Docker Compose
docker compose up --build

# Site is served at http://localhost:3000
```

## CI / CD

| Check             | Trigger            | Tool                                   |
| ----------------- | ------------------ | -------------------------------------- |
| Lint + Typecheck  | Every push         | ESLint + `tsc --noEmit`                |
| Lighthouse CI     | Every push         | `@lhci/cli` (perf ≥ 0.9)               |
| CodeQL scanning   | Push / PR / weekly | GitHub CodeQL                          |
| Dependabot        | Weekly             | npm + GitHub Actions                   |
| PR preview deploy | Pull requests      | Netlify + Lighthouse                   |
| Production deploy | Push to `main`     | GitHub Pages (custom domain)           |
| Secrets injection | Build step         | `VITE_WEB3FORMS_KEY` from repo secrets |

## Performance

Run through [WebPageTest](https://www.webpagetest.org/?url=https://remyportfolio.me) to verify:

- **TTFB**: < 200 ms (GitHub Pages CDN)
- **LCP**: < 1.2 s (AVIF hero with `<link rel="preload">`)
- **CLS**: 0 (width/height on hero image, no layout shift)
- **Total weight**: ~110 KB (gzip, including fonts)

## Projects

| Project                     | Description                                                                                               | Links                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **NotesBoard**              | Collaborative MERN platform with real-time editing (Yjs/Hocuspocus), shared dashboards, and offline cache | [Repo](https://github.com/redaalch/notesBoard) · [Live](https://notesboard.xyz/)                      |
| **Real-time Notifications** | Event-driven Socket.io notifications with JWT auth, toast alerts, and REST history API                    | Private repo (internship) · [Case Study](https://remyportfolio.me/case-study/real-time-notifications) |
| **Alarm Clock**             | PWA alarm clock with recurring schedules, local persistence, and desktop notifications                    | [Repo](https://github.com/redaalch/alarm-clock) · [Live](https://redaalch.github.io/alarm-clock/)     |
| **Portfolio (This Site)**   | React 19 + Tailwind v4 + Vite 7 portfolio with dark/light theme, view transitions, and CI/CD              | You're here                                                                                           |

## Case Studies

In-depth architecture breakdowns are available on the live site for:

1. **[NotesBoard](https://remyportfolio.me/case-study/notesboard)** — CRDT-based real-time collaboration with Yjs, Hocuspocus, and offline-first sync
2. **[Real-time Notifications](https://remyportfolio.me/case-study/real-time-notifications)** — Event-driven Socket.io notification delivery with sequence diagrams
3. **[Portfolio Site](https://remyportfolio.me/case-study/portfolio-site)** — Performance engineering, image pipeline, code-splitting, and CI/CD decisions

Each case study covers context, constraints, architecture, key decisions (with rationale), measurable outcomes, and next steps.

## Project Structure

```
src/
├── components/
│   ├── sections/     # Page sections (Projects, Experience, Skills, …)
│   └── ui/           # Reusable UI (Navbar, Hero, ThemeToggle, …)
├── data/             # Static data (projects list, case studies)
├── hooks/            # Custom hooks (useScrollReveal, useTheme)
├── pages/            # Route pages (Home, About, ProjectDetails, CaseStudy)
└── assets/           # Images and logos
```

## License

[MIT](./LICENSE) © 2025–2026 Reda Alalach
