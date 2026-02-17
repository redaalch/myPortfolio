import { lazy, Suspense } from "react";
import ResponsiveHeroBanner from "../components/ui/responsive-hero-banner";
import VerticalBanner from "../components/ui/VerticalBanner";

const ProjectsSection = lazy(() => import("../components/sections/Projects"));
const ExperienceSection = lazy(
  () => import("../components/sections/Experience"),
);
const SkillsSection = lazy(() => import("../components/sections/Skills"));
const CertificationsSection = lazy(
  () => import("../components/sections/Certifications"),
);
const ContactSection = lazy(() => import("../components/sections/Contact"));
const Footer = lazy(() => import("../components/sections/Footer"));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/abstract-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/87" />

      {/* Ambient floating glow orbs */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Ambient rising bubbles */}
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
            left: "20%",
            width: 32,
            height: 32,
            background: "rgba(139,92,246,0.10)",
            animationDuration: "24s",
            animationDelay: "6s",
          }}
        />
        <span
          style={{
            left: "60%",
            width: 24,
            height: 24,
            background: "rgba(129,140,248,0.10)",
            animationDuration: "12s",
            animationDelay: "1.5s",
          }}
        />
        <span
          style={{
            left: "42%",
            width: 44,
            height: 44,
            background: "rgba(192,132,252,0.11)",
            animationDuration: "17s",
            animationDelay: "7s",
          }}
        />
        <span
          style={{
            left: "5%",
            width: 36,
            height: 36,
            background: "rgba(167,139,250,0.13)",
            animationDuration: "19s",
            animationDelay: "8s",
          }}
        />
        <span
          style={{
            left: "75%",
            width: 28,
            height: 28,
            background: "rgba(139,92,246,0.11)",
            animationDuration: "15s",
            animationDelay: "5s",
          }}
        />
        <span
          style={{
            left: "92%",
            width: 52,
            height: 52,
            background: "rgba(99,102,241,0.09)",
            animationDuration: "21s",
            animationDelay: "9s",
          }}
        />
        <span
          style={{
            left: "38%",
            width: 20,
            height: 20,
            background: "rgba(168,85,247,0.14)",
            animationDuration: "13s",
            animationDelay: "3.5s",
          }}
        />
        <span
          style={{
            left: "55%",
            width: 72,
            height: 72,
            background: "rgba(196,181,253,0.07)",
            animationDuration: "26s",
            animationDelay: "10s",
          }}
        />
      </div>

      <div className="relative z-2">
        <ResponsiveHeroBanner />
        <VerticalBanner />
        <main id="main-content">
          <Suspense fallback={null}>
            <ProjectsSection />
            <ExperienceSection />
            <SkillsSection />
            <CertificationsSection />
            <ContactSection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
