import notesBoardPreview from "../assets/notesboard-preview.avif";
import notificationsPreview from "../assets/notifications-preview.avif";
import alarmClockPreview from "../assets/alarm-clock-preview.avif";
import portfolioPreview from "../assets/portfolio-preview.avif";

export interface Project {
  slug: string;
  title: string;
  description: string;
  about: string[];
  tags: string[];
  year: string;
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
  color: string;
  hasCaseStudy?: boolean;
}

export const projects: Project[] = [
  {
    slug: "notesboard",
    title: "NotesBoard",
    description:
      "Collaborative notes & analytics platform with a real-time editor (Yjs/Hocuspocus), shared dashboards, drag-and-drop, animations, offline cache, and notifications.",
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
    color: "from-violet-600 to-indigo-700",
    hasCaseStudy: true,
  },
  {
    slug: "real-time-notifications",
    title: "Real-time Notifications",
    description:
      "Event-driven notifications for task assignment and updates, with API-driven history and UI feedback via toast alerts. Focused on reliability and clean UX.",
    about: [
      "This module adds instant task update notifications to improve communication and response time in project workflows.",
      "It uses Socket.io channels and secured API endpoints to ensure users receive consistent, authenticated updates.",
      "The implementation emphasizes reliability, clear feedback, and seamless integration with existing UI flows.",
    ],
    tags: ["Socket.io", "Express", "JWT", "REST"],
    year: "2025",
    image: notificationsPreview,
    color: "from-emerald-600 to-teal-700",
    hasCaseStudy: true,
  },
  {
    slug: "alarm-clock",
    title: "Alarm Clock",
    description:
      "Lightweight alarm clock with add/edit/delete alarms, recurring schedules, local persistence, live clock, desktop notifications, and offline support.",
    about: [
      "Alarm Clock is a progressive web app focused on speed and ease of use for daily reminders.",
      "It supports recurring alarms, local storage persistence, and browser notifications for practical day-to-day usage.",
      "The app is optimized for offline availability and responsive behavior across desktop and mobile browsers.",
    ],
    tags: ["JavaScript", "HTML", "CSS", "PWA"],
    year: "2025",
    liveUrl: "https://redaalch.github.io/alarm-clock/",
    image: alarmClockPreview,
    color: "from-orange-500 to-amber-700",
  },
  {
    slug: "portfolio-site",
    title: "Portfolio (This Site)",
    description:
      "Modern portfolio built with React, Tailwind CSS, and TypeScript. Includes smooth animations, responsive design, and deployed via GitHub Pages.",
    about: [
      "This portfolio showcases projects, experience, and certifications in a clean and modern format.",
      "The site uses reusable sections, smooth transitions, and responsive layouts to deliver a polished user experience.",
      "It is built with React and TypeScript for maintainability and scalable component architecture.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2025",
    image: portfolioPreview,
    color: "from-rose-500 to-pink-700",
    hasCaseStudy: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
