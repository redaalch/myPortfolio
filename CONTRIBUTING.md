# Contributing

Thanks for your interest in contributing! This guide covers the basics.

## Quick Start

```bash
git clone https://github.com/redaalch/myPortfolio.git
cd myPortfolio
npm ci
cp .env.example .env        # add your Web3Forms key (or leave placeholder)
npm run dev                  # http://localhost:5173
```

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start Vite dev server            |
| `npm run build`        | Typecheck + production build     |
| `npm run lint`         | Run ESLint                       |
| `npm run lint:fix`     | Run ESLint with auto-fix         |
| `npm run format`       | Format code with Prettier        |
| `npm run format:check` | Check formatting (CI-friendly)   |
| `npm run test`         | Run Playwright smoke tests       |
| `npm run preview`      | Preview production build locally |

## How to Add a New Project

All project data lives in **`src/data/projects.ts`** as a typed array. No CMS, no database.

### 1. Add the project image

Drop a compressed `.avif` preview (~10-50 KB, 700×438) into `src/assets/`:

```
src/assets/my-project-preview.avif
```

### 2. Import it in `projects.ts`

```ts
import myProjectPreview from "../assets/my-project-preview.avif";
```

### 3. Add a new entry to the `projects` array

```ts
{
  slug: "my-project",                          // URL-safe, kebab-case
  title: "My Project",
  description: "One-line description of the project.",
  impact: "Key metric · Another metric · Third metric",
  about: [
    "Paragraph 1 — what the project does.",
    "Paragraph 2 — how it works.",
    "Paragraph 3 — what makes it interesting.",
  ],
  tags: ["React", "Node.js", "MongoDB"],       // tech stack chips
  year: "2026",
  repoUrl: "https://github.com/redaalch/my-project",  // optional
  liveUrl: "https://my-project.example.com",           // optional
  repoNote: "Private repo (internship)",               // optional, shown if no repoUrl
  image: myProjectPreview,
  color: "from-blue-900/80 via-indigo-800/70 to-violet-900/75",      // dark mode gradient
  lightColor: "from-blue-50/80 via-indigo-50/70 to-violet-50/60",    // light mode gradient
  hasCaseStudy: false,                         // set true if adding a case study too
}
```

The `Project` interface in the same file shows all available fields.

### 4. (Optional) Add a case study

Add an entry to **`src/data/case-studies.ts`** with matching `projectSlug`. The case study page at `/case-study/{slug}` will pick it up automatically.

### 5. Verify

```bash
npm run build          # typecheck catches missing fields
npm run test           # smoke tests verify pages render
npm run dev            # visual check
```

## How to Add a New Section to the Homepage

1. Create a component in `src/components/sections/YourSection.tsx`
2. Lazy-import it in `src/pages/HomePage.tsx`:
   ```tsx
   const YourSection = lazy(() => import("../components/sections/YourSection"));
   ```
3. Add it inside the `<Suspense>` block in the render
4. Optionally add a nav link in `src/components/ui/responsive-hero-banner.tsx`

## Code Style

- **TypeScript** — all source files use `.tsx`/`.ts`
- **Tailwind CSS v4** — utility classes, no CSS modules
- **ESLint + Prettier** — run `npm run lint:fix && npm run format` before committing
- **No `any`** — use proper types or `unknown`

## Testing

Smoke tests live in `tests/smoke.spec.ts` and use Playwright. They verify:

- Homepage renders with hero heading
- Projects section is visible
- About page loads
- Case study pages load
- Unknown routes redirect to home
- Navigation between pages works

```bash
# Install Playwright browsers (first time only)
npx playwright install --with-deps chromium

# Run tests
npm run test
```

## Pull Request Checklist

- [ ] `npm run build` passes (typecheck + build)
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run test` passes
- [ ] Tested in both dark and light themes
- [ ] Responsive layout checked (mobile + desktop)
