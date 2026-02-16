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
      <div className="relative">
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
