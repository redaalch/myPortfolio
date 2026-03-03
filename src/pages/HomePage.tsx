import { lazy, Suspense } from "react";
import DarkGradientBg from "../components/ui/DarkGradientBg";
import ResponsiveHeroBanner from "../components/ui/responsive-hero-banner";
import VerticalBanner from "../components/ui/VerticalBanner";
import BackToTop from "../components/ui/BackToTop";
import ErrorBoundary from "../components/ui/ErrorBoundary";

const ProjectsSection = lazy(() => import("../components/sections/Projects"));
const ExperienceSection = lazy(() => import("../components/sections/Experience"));
const SkillsSection = lazy(() => import("../components/sections/Skills"));
const CertificationsSection = lazy(() => import("../components/sections/Certifications"));
const ContactSection = lazy(() => import("../components/sections/Contact"));
const Footer = lazy(() => import("../components/sections/Footer"));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <DarkGradientBg />
      <div className="absolute inset-0 bg-background dark:bg-transparent" />

      {/* Ambient rising bubbles — kept to 6 to balance visual effect vs CPU cost */}
      <div className="bg-bubbles" aria-hidden="true">
        <span
          style={{
            left: "10%",
            width: 64,
            height: 64,
            background: "rgba(139,92,246,0.15)",
            animationDuration: "14s",
          }}
        />
        <span
          style={{
            left: "30%",
            width: 40,
            height: 40,
            background: "rgba(167,139,250,0.12)",
            animationDuration: "18s",
            animationDelay: "2s",
          }}
        />
        <span
          style={{
            left: "50%",
            width: 80,
            height: 80,
            background: "rgba(99,102,241,0.08)",
            animationDuration: "22s",
            animationDelay: "4s",
          }}
        />
        <span
          style={{
            left: "70%",
            width: 48,
            height: 48,
            background: "rgba(196,181,253,0.10)",
            animationDuration: "16s",
            animationDelay: "1s",
          }}
        />
        <span
          style={{
            left: "85%",
            width: 56,
            height: 56,
            background: "rgba(168,85,247,0.12)",
            animationDuration: "20s",
            animationDelay: "3s",
          }}
        />
        <span
          style={{
            left: "22%",
            width: 36,
            height: 36,
            background: "rgba(139,92,246,0.10)",
            animationDuration: "24s",
            animationDelay: "7s",
          }}
        />
      </div>

      <div className="relative z-2">
        <ResponsiveHeroBanner />
        <VerticalBanner />
        <main id="main-content">
          <ErrorBoundary section="Projects">
            <Suspense fallback={null}>
              <ProjectsSection />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary section="Experience">
            <Suspense fallback={null}>
              <ExperienceSection />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary section="Skills">
            <Suspense fallback={null}>
              <SkillsSection />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary section="Certifications">
            <Suspense fallback={null}>
              <CertificationsSection />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary section="Contact">
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <BackToTop />
      </div>
    </div>
  );
}
