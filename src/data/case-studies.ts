export interface CaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  subtitle: string;
  context: string;
  constraints: string[];
  architectureSections: {
    heading: string;
    content: string;
  }[];
  keyDecisions: {
    question: string;
    answer: string;
  }[];
  outcomes: {
    label: string;
    value: string;
  }[];
  nextSteps: string[];
  sequenceDiagram?: string; // Mermaid syntax for rendering or displaying as text
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "notesboard",
    projectSlug: "notesboard",
    title: "NotesBoard — Real-Time Collaborative Notes",
    subtitle:
      "A deep dive into building a collaborative notes platform with conflict-free real-time editing",
    context:
      "Built a collaborative notes platform for teams who need real-time editing without losing data integrity. The app supports multiple concurrent editors, shared dashboards, drag-and-drop organization, and offline-first caching — all synchronized through a WebSocket-based architecture.",
    constraints: [
      "Had to support concurrent editing without conflicts or data loss",
      "Required offline-first capability so edits persist even when disconnected",
      "Low-latency sync (<100ms) to feel truly real-time for all connected users",
      "Must handle authentication context across both REST and WebSocket connections",
      "Keep the bundle lean — no heavy collaborative editing frameworks",
    ],
    architectureSections: [
      {
        heading: "Frontend",
        content:
          "React with a Tiptap-based rich text editor, connected to the Yjs document model. Tiptap provides the editing UI while Yjs manages the CRDT state underneath. The HocuspocusProvider handles the WebSocket transport between the client's Yjs doc and the collaboration server.",
      },
      {
        heading: "Collaboration Server",
        content:
          "A Hocuspocus server instance manages real-time document synchronization. It receives Yjs updates from connected clients, merges them using CRDT logic, and broadcasts the result to all peers. Document state is persisted to MongoDB on configurable intervals and on disconnect.",
      },
      {
        heading: "Backend API",
        content:
          "Node.js/Express handles REST endpoints for auth (JWT), project CRUD, dashboard data, and notification delivery. Socket.io runs alongside for push notifications (task assignments, updates). MongoDB stores documents, user data, and notification history.",
      },
      {
        heading: "Data Flow",
        content:
          "User edits → Tiptap → Yjs CRDT → HocuspocusProvider → WebSocket → Hocuspocus Server → merge & broadcast → all connected clients. REST API handles everything else: auth, project management, notifications.",
      },
    ],
    keyDecisions: [
      {
        question: "Why Yjs over other CRDT alternatives (Automerge, Y-Sweet)?",
        answer:
          "Yjs has the smallest bundle size (~13KB gzipped), the most mature editor integrations (Tiptap, ProseMirror, CodeMirror), and excellent conflict resolution for rich text. Automerge is heavier and geared more toward JSON documents. Y-Sweet adds a managed server layer we didn't need since we control our own Hocuspocus instance.",
      },
      {
        question: "Why MongoDB over PostgreSQL?",
        answer:
          "Document-oriented storage maps naturally to Yjs binary snapshots (stored as Buffer). The schema-less nature suited rapid iteration on note structure. For this MVP, we didn't need relational joins — notes, projects, and users are mostly accessed by ID. If relational queries become critical (analytics, cross-project search), migrating to Postgres would be the right move.",
      },
      {
        question: "How did you handle auth in WebSocket connections?",
        answer:
          "JWT is sent as a query parameter during the WebSocket handshake. The Hocuspocus server validates it in the onAuthenticate hook before allowing connection. On the Socket.io side, middleware extracts and verifies the token from the auth header. Token refresh is handled on the REST side; WebSocket connections re-establish if the token expires.",
      },
      {
        question: "How does offline editing work?",
        answer:
          "Yjs persists the local document state to IndexedDB via y-indexeddb. When the user goes offline, edits continue against the local CRDT. On reconnect, HocuspocusProvider syncs the accumulated changes — Yjs's CRDT merge guarantees convergence without manual conflict resolution.",
      },
    ],
    outcomes: [
      { label: "Concurrent editors supported", value: "10+" },
      { label: "Sync latency (p95)", value: "<80ms" },
      { label: "Offline write success", value: "100%" },
      {
        label: "Document persistence",
        value: "Auto-save on interval + disconnect",
      },
      {
        label: "Initial bundle impact",
        value: "~13KB (Yjs) + ~4KB (Hocuspocus client)",
      },
    ],
    nextSteps: [
      "Add operational transform comparison benchmarks against CRDT approach",
      "Migrate to PostgreSQL for relational queries and cross-project search",
      "Add end-to-end tests with Playwright for real-time collaboration flows",
      "Implement cursor presence (show other users' cursors in real-time)",
      "Add version history with point-in-time document snapshots",
    ],
  },
  {
    slug: "real-time-notifications",
    projectSlug: "real-time-notifications",
    title: "Real-Time Notifications System",
    subtitle:
      "Event-driven notification architecture using Socket.io for instant task updates",
    context:
      "Built during my internship at Technocolabs, this module adds instant notification delivery to a task management platform. When a task is assigned or updated, the relevant user receives an immediate in-app notification via WebSocket, with a full REST API for notification history and read-state management.",
    constraints: [
      "Must integrate with an existing Express + MongoDB codebase without major refactoring",
      "Notifications must be delivered in real-time but also persisted for history",
      "Authentication must be consistent across REST and WebSocket layers",
      "Error handling middleware must catch and report failures gracefully",
    ],
    architectureSections: [
      {
        heading: "Event-Driven Architecture",
        content:
          "The system follows a publish-subscribe pattern. When a REST endpoint creates or updates a task, it emits an internal event. A notification service listens to these events, creates a notification record in MongoDB, and pushes it to the target user's Socket.io room in real-time.",
      },
      {
        heading: "Socket.io Integration",
        content:
          "Each authenticated user joins a private room (keyed by user ID) on WebSocket connection. The server emits targeted notifications to specific rooms, ensuring users only receive their own events. Connection auth uses JWT middleware on the Socket.io handshake.",
      },
      {
        heading: "Error Handling",
        content:
          "Global Express error-handling middleware catches all sync/async errors and returns structured JSON responses. Socket.io errors are caught in event handlers and logged. A /health endpoint was added for monitoring uptime and connectivity.",
      },
    ],
    keyDecisions: [
      {
        question: "Why Socket.io over SSE or raw WebSockets?",
        answer:
          "Socket.io provides automatic reconnection, room-based targeting, and fallback transports out of the box. SSE is unidirectional (server→client only) and raw WebSockets require building reconnection logic manually. For a notification system, Socket.io's room abstraction dramatically simplifies targeting specific users.",
      },
      {
        question: "How are notifications persisted?",
        answer:
          "Every notification is saved to MongoDB before being pushed via Socket.io. This ensures the history API always has a complete record, even if the user is offline when the event fires. On reconnect, the client fetches missed notifications via the REST endpoint.",
      },
    ],
    outcomes: [
      { label: "Delivery latency", value: "<50ms" },
      {
        label: "Architecture impact",
        value: "Zero breaking changes to existing API",
      },
      {
        label: "Notification types",
        value: "Task assignment, status update, mention",
      },
      {
        label: "Reliability",
        value: "Persisted + real-time (no message loss)",
      },
    ],
    nextSteps: [
      "Add notification preferences (mute, digest mode)",
      "Implement push notifications via Web Push API for background delivery",
      "Add rate limiting to prevent notification spam",
      "Build a notification analytics dashboard",
    ],
    sequenceDiagram: `sequenceDiagram
    participant Client A as Client A (Assignor)
    participant API as Express API
    participant DB as MongoDB
    participant NS as Notification Service
    participant SIO as Socket.io Server
    participant Client B as Client B (Assignee)

    Client A->>API: POST /tasks/:id/assign
    API->>DB: Update task, create notification
    API->>NS: Emit "task:assigned" event
    NS->>SIO: Push to user room
    SIO->>Client B: Real-time notification
    Client B->>API: GET /notifications (on reconnect)
    API->>DB: Fetch unread notifications
    API-->>Client B: Notification history`,
  },
  {
    slug: "portfolio-site",
    projectSlug: "portfolio-site",
    title: "Portfolio Site — Engineering a High-Performance Personal Portfolio",
    subtitle:
      "How I built a sub-2s LCP portfolio with React 19, Tailwind v4, and Vite 7 — and the architectural decisions behind it",
    context:
      "I needed a portfolio that loads fast, ranks well on Google, and clearly communicates my engineering depth — not just a list of projects. The site had to be fully responsive, accessible, SEO-optimized, and easy to maintain as I add new work. It also serves as a live demonstration of the frontend and DevOps skills I claim to have.",
    constraints: [
      "LCP must stay under 2.5 s on a 4G connection — recruiters won't wait",
      "Perfect Lighthouse accessibility score (skip-link, focus-visible, semantic HTML, ARIA labels)",
      "SEO: canonical URL, Open Graph, Twitter Card, JSON-LD Person schema — all server-rendered in the HTML shell",
      "Zero CMS dependency — content lives in TypeScript data files for type-safety and instant rebuilds",
      "CI must block broken deploys: lint, typecheck, and Lighthouse budgets run before every merge",
      "Bundle must stay lean — no heavy UI library; Tailwind v4 + Lucide icons only",
    ],
    architectureSections: [
      {
        heading: "Stack & Tooling",
        content:
          "React 19 with TypeScript 5.9 for the UI, Tailwind CSS v4 (native CSS-in-JS mode via @tailwindcss/vite) for styling, and Vite 7 for sub-second HMR and optimized production builds. React Router v7 handles client-side routing for project detail and case-study pages. Lucide React provides the icon set.",
      },
      {
        heading: "Image Pipeline",
        content:
          "The hero background was the single biggest LCP bottleneck — originally a 3840 w JPEG served from Supabase. I downloaded it, converted to AVIF at two breakpoints (1200 w / 5 KB, 2400 w / 15 KB), and serve via <img srcset> with loading=eager and fetchpriority=high. A <link rel=preload as=image> in the HTML <head> ensures the browser fetches it before React even hydrates. Result: ~90 % size reduction and sub-1 s LCP on cable.",
      },
      {
        heading: "Code-Splitting & Lazy Loading",
        content:
          "Only the hero banner ships in the initial bundle. Every below-fold section (Projects, Experience, Skills, Certifications, Contact, Footer) is wrapped in React.lazy() + Suspense, producing six separate chunks. Combined with the scroll-reveal hook the user never notices the deferred loads, but the initial JS payload drops significantly.",
      },
      {
        heading: "SEO & Structured Data",
        content:
          "The HTML shell includes rel=canonical, Open Graph tags, Twitter Card meta, and a JSON-LD Person schema (name, jobTitle, sameAs for GitHub/LinkedIn). This lets Google understand the site as a personal portfolio and enables rich link previews on social platforms — all without SSR.",
      },
      {
        heading: "Accessibility",
        content:
          "A visually-hidden skip-to-content link appears on Tab focus and jumps to <main id=main-content>. All navigation landmarks carry aria-label. Interactive elements show a visible :focus-visible ring (accent color, 2 px offset). Semantic HTML (header, nav, main, section, footer) throughout.",
      },
      {
        heading: "View Transitions & Page Navigation",
        content:
          "All internal links use React Router v7's viewTransition prop, paired with ::view-transition-old/new(root) CSS rules. Page switches play a smooth crossfade (300 ms ease) instead of a hard repaint. The CSS also includes a reduced-motion media query that disables the animation for users who prefer it.",
      },
      {
        heading: "About Page",
        content:
          "A dedicated /about route presents a personal timeline, stat highlights, tech stack breakdown, and interests. The page uses the shared scroll-reveal hook for entrance animations and links back to the home page with view transitions. A profile image and structured layout give recruiters a quick personality snapshot beyond the project list.",
      },
      {
        heading: "Ambient Background & Visual Polish",
        content:
          "The homepage layers an abstract textured background (abstract-bg.jpg) under a semi-transparent overlay, floating glow orbs (CSS radial-gradient + keyframe drift), and rising bubble spans with randomised sizes, positions, and durations. These purely decorative elements are marked aria-hidden and add depth without affecting performance or accessibility.",
      },
      {
        heading: "CI / CD Pipeline",
        content:
          "GitHub Actions workflow: npm ci → ESLint → tsc --noEmit → vite build → Lighthouse CI (performance ≥ 0.9, CLS < 0.1). Dependabot keeps npm and Actions dependencies fresh weekly. CodeQL scans JavaScript/TypeScript on every push for security vulnerabilities. Deployment is automatic to GitHub Pages with a custom domain (remyportfolio.me).",
      },
    ],
    keyDecisions: [
      {
        question: "Why Vite 7 over Next.js or Astro?",
        answer:
          "The site is a single-page app with no server-side data fetching — SSR adds complexity without benefit here. Vite gives near-instant HMR, tree-shaking, and native ESM in dev. Astro's island architecture is compelling for content-heavy sites but overkill for a small React SPA. Keeping the stack simple also means fewer things to debug in CI.",
      },
      {
        question: "Why Tailwind v4 over v3 or CSS Modules?",
        answer:
          "Tailwind v4 ships a native Vite plugin (@tailwindcss/vite) that eliminates the PostCSS step and enables CSS-layer-based theming with @theme. The result is faster builds and smaller output. CSS Modules would add file proliferation for the same utility-first patterns I'd end up writing anyway.",
      },
      {
        question: "Why store content in .ts files instead of a CMS or MDX?",
        answer:
          "TypeScript data files give me full type-safety (Project, CaseStudy interfaces), instant IDE autocomplete, and zero build plugins. Adding a new project is a single array entry — no CMS dashboard, no MDX compilation step, no runtime fetching. For a personal site with <20 content items, this is the simplest correct solution.",
      },
      {
        question: "Why AVIF over WebP for the hero image?",
        answer:
          "AVIF achieves 30-50 % smaller file sizes than WebP at equivalent quality, and browser support now covers ~93 % of users (Chrome, Firefox, Safari 16+). The 1200 w hero weighs just 5.3 KB in AVIF vs ~12 KB in WebP. For the small percentage on older browsers, the srcset falls back gracefully.",
      },
      {
        question:
          "Why lazy-load sections instead of using Intersection Observer alone?",
        answer:
          "The existing scroll-reveal hook only controls CSS opacity/transform — the JS and component tree still ship upfront. React.lazy() with Suspense actually defers parsing and evaluation of each section's code until React tries to render it. Combined, the user sees a smooth reveal animation while the browser does less work on first load.",
      },
    ],
    outcomes: [
      { label: "Lighthouse Performance", value: "95+" },
      { label: "LCP (desktop / cable)", value: "<1.2 s" },
      { label: "Initial JS payload", value: "~84 KB gzip" },
      { label: "Hero image size", value: "5–15 KB (AVIF)" },
      { label: "Accessibility score", value: "100" },
      { label: "Code-split chunks", value: "6 lazy sections" },
      {
        label: "Page transitions",
        value: "View Transition API (300 ms crossfade)",
      },
      {
        label: "Routes",
        value: "5 (Home, About, Project, Case Study, 404 redirect)",
      },
    ],
    nextSteps: [
      "Implement dark/light theme toggle with system preference detection",
      "Add a blog section using MDX for longer-form technical writing",
      "Set up Playwright E2E tests for critical user flows (navigation, case study links)",
      "Add analytics (Plausible or Umami) to track which projects get the most attention",
      "Generate per-project OG images dynamically with @vercel/og or a build-time script",
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudyByProjectSlug(projectSlug: string) {
  return caseStudies.find((cs) => cs.projectSlug === projectSlug);
}
