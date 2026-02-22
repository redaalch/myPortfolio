import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage.tsx"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const CvPage = lazy(() => import("./pages/CvPage.tsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.tsx"));

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      {/* Nav skeleton */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4">
        <div className="h-8 w-8 rounded-full bg-foreground/10" />
        <div className="hidden md:flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-16 rounded bg-foreground/10" />
          ))}
        </div>
      </div>
      {/* Hero skeleton */}
      <div className="mx-auto max-w-3xl px-6 pt-24 space-y-6">
        <div className="h-10 w-3/4 rounded bg-foreground/10" />
        <div className="h-5 w-full rounded bg-foreground/10" />
        <div className="h-5 w-2/3 rounded bg-foreground/10" />
        <div className="flex gap-3 pt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 w-20 rounded-full bg-foreground/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "about",
        element: (
          <SuspenseWrapper>
            <AboutPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "cv",
        element: (
          <SuspenseWrapper>
            <CvPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "projects",
        element: (
          <SuspenseWrapper>
            <ProjectsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "projects/:slug",
        element: (
          <SuspenseWrapper>
            <ProjectDetailsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "case-study/:slug",
        element: (
          <SuspenseWrapper>
            <CaseStudyPage />
          </SuspenseWrapper>
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
