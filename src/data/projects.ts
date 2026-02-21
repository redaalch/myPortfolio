import notesBoardPreview from "../assets/notesboard-preview.avif";
import notificationsPreview from "../assets/notifications-preview.avif";
import alarmClockPreview from "../assets/alarm-clock-preview.avif";
import portfolioPreview from "../assets/portfolio-preview.avif";

export interface Project {
  slug: string;
  title: string;
  description: string;
  impact: string;
  about: string[];
  tags: string[];
  year: string;
  repoUrl?: string;
  liveUrl?: string;
  repoNote?: string;
  image?: string;
  color: string;
  lightColor: string;
  hasCaseStudy?: boolean;
}

export const projects: Project[] = [
  {
    slug: "notesboard",
    title: "NotesBoard",
    description:
      "Collaborative notes & analytics platform featuring a real-time rich-text editor powered by Yjs and Hocuspocus for conflict-free, multi-user editing. Includes shared dashboards with drag-and-drop widgets, smooth Framer Motion animations, full offline cache via service workers, and a notification system for instant team updates. Users can organize notes into folders, tag and search content, and view analytics on editing activity — all synced across devices in under 80ms.",
    impact:
      "10+ concurrent editors · <80ms sync latency · 100% offline write success · ~17KB collab bundle",
    about: [
      "NotesBoard is built to help teams collaborate in real-time on shared notes and dashboards without losing editing consistency.",
      "The project combines a React frontend with a Node/Express backend and synchronization using Yjs for conflict-free collaboration.",
      "Core features include live editing, notifications, and a clean UI focused on productivity and fast interactions.",
    ],
    tags: ["React", "Express", "MongoDB", "Yjs", "Socket.io"],
    year: "2025",
    repoUrl: "https://github.com/redaalch/notesBoard",
    liveUrl: "https://notesboard.xyz/",
    image: notesBoardPreview,
    color: "from-emerald-900/85 via-teal-800/75 to-cyan-900/80",
    lightColor: "from-emerald-50/80 via-teal-50/70 to-cyan-50/60",
    hasCaseStudy: true,
  },
  {
    slug: "real-time-notifications",
    title: "Real-time Notifications",
    description:
      "Event-driven real-time notification module built during my Technocolabs internship. The system delivers instant alerts for task assignments, status changes, and team updates through Socket.io channels with JWT-authenticated connections. Features include a persistent notification history accessible via REST API, read/unread state management, toast-style UI alerts with auto-dismiss, and graceful reconnection handling. Designed to integrate seamlessly into the existing project management platform without breaking changes.",
    impact:
      "<50ms delivery latency · Zero breaking changes to existing API · Persisted + real-time (no message loss)",
    about: [
      "This module adds instant task update notifications to improve communication and response time in project workflows.",
      "It uses Socket.io channels and secured API endpoints to ensure users receive consistent, authenticated updates.",
      "The implementation emphasizes reliability, clear feedback, and seamless integration with existing UI flows.",
    ],
    tags: ["Socket.io", "Express", "JWT", "REST"],
    year: "2025",
    repoNote: "Private repo (internship)",
    image: notificationsPreview,
    color: "from-indigo-900/80 via-violet-800/75 to-purple-900/85",
    lightColor: "from-indigo-50/80 via-violet-50/70 to-purple-50/60",
    hasCaseStudy: true,
  },
  {
    slug: "alarm-clock",
    title: "Alarm Clock",
    description:
      "A lightweight progressive web app for managing daily alarms with zero external dependencies. Users can create, edit, and delete alarms, set recurring schedules by day of the week, and receive browser desktop notifications even when the tab is in the background. The app features a live animated clock, local storage persistence so alarms survive page reloads, and full offline support through a custom service worker. Responsive across desktop and mobile with a clean, distraction-free interface.",
    impact: "PWA with full offline support · <1s load time · Zero dependencies",
    about: [
      "Alarm Clock is a progressive web app focused on speed and ease of use for daily reminders.",
      "It supports recurring alarms, local storage persistence, and browser notifications for practical day-to-day usage.",
      "The app is optimized for offline availability and responsive behavior across desktop and mobile browsers.",
    ],
    tags: ["JavaScript", "HTML", "CSS", "PWA"],
    year: "2025",
    repoUrl: "https://github.com/redaalch/alarm-clock",
    liveUrl: "https://redaalch.github.io/alarm-clock/",
    image: alarmClockPreview,
    color: "from-orange-900/80 via-amber-800/70 to-yellow-900/75",
    lightColor: "from-orange-50/80 via-amber-50/70 to-yellow-50/60",
  },
  {
    slug: "portfolio-site",
    title: "Portfolio (This Site)",
    description:
      "A modern, performance-focused portfolio built with React 19, TypeScript, and Tailwind CSS v4. Features include scroll-reveal animations, view transitions between pages, a dark/light theme toggle with system preference detection, and lazy-loaded route chunks for fast initial loads. The site scores 95+ on Lighthouse performance, 100 on accessibility, and 100 on SEO. Deployed via GitHub Pages with a custom domain, automated CI through GitHub Actions, and end-to-end smoke tests using Playwright.",
    impact: "Lighthouse 95+ perf / 100 a11y / 100 SEO · Sub-2s LCP · 6 lazy-loaded chunks",
    about: [
      "This portfolio showcases projects, experience, and certifications in a clean and modern format.",
      "The site uses reusable sections, smooth transitions, and responsive layouts to deliver a polished user experience.",
      "It is built with React and TypeScript for maintainability and scalable component architecture.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2025",
    image: portfolioPreview,
    color: "from-zinc-800/80 via-slate-700/70 to-stone-800/75",
    lightColor: "from-zinc-50/80 via-slate-50/70 to-stone-50/60",
    hasCaseStudy: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
