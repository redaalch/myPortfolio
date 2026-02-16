# remyportfolio.me

> Personal portfolio of **Reda Alalach** — backend & full-stack developer.

[![Live Site](https://img.shields.io/badge/live-remyportfolio.me-8b5cf6?style=for-the-badge)](https://remyportfolio.me)
[![Deploy](https://github.com/redaalch/myPortfolio/actions/workflows/static.yml/badge.svg)](https://github.com/redaalch/myPortfolio/actions/workflows/static.yml)
[![CodeQL](https://github.com/redaalch/myPortfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/redaalch/myPortfolio/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

![Lighthouse Performance](https://img.shields.io/badge/Performance-95+-8b5cf6?logo=lighthouse&logoColor=white)
![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-100-8b5cf6?logo=lighthouse&logoColor=white)
![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100-8b5cf6?logo=lighthouse&logoColor=white)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100-8b5cf6?logo=lighthouse&logoColor=white)

---

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

# Start dev server
npm run dev

# Lint
npm run lint

# Build for production
npm run build
```

### Docker (one-command run)

```bash
# Build and run with Docker Compose
docker compose up --build

# Site is served at http://localhost:3000
```

## CI / CD

| Check             | Trigger            | Tool                         |
| ----------------- | ------------------ | ---------------------------- |
| Lint + Typecheck  | Every push         | ESLint + `tsc --noEmit`      |
| Lighthouse CI     | Every push         | `@lhci/cli` (perf ≥ 0.9)     |
| CodeQL scanning   | Push / PR / weekly | GitHub CodeQL                |
| Dependabot        | Weekly             | npm + GitHub Actions         |
| PR preview deploy | Pull requests      | Netlify + Lighthouse         |
| Production deploy | Push to `main`     | GitHub Pages (custom domain) |

## Performance

Run through [WebPageTest](https://www.webpagetest.org/?url=https://remyportfolio.me) to verify:

- **TTFB**: < 200 ms (GitHub Pages CDN)
- **LCP**: < 1.2 s (AVIF hero with `<link rel="preload">`)
- **CLS**: 0 (width/height on hero image, no layout shift)
- **Total weight**: ~110 KB (gzip, including fonts)

## Project Structure

```
src/
├── components/
│   ├── sections/     # Page sections (Projects, Experience, Skills, …)
│   └── ui/           # Reusable UI components (Navbar, Hero, …)
├── data/             # Static data (projects list, case studies)
├── hooks/            # Custom React hooks
├── pages/            # Route pages (Home, ProjectDetails, CaseStudy)
└── assets/           # Images and logos
```

## License

[MIT](./LICENSE) © 2025 Reda Alalach
