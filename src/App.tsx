import ResponsiveHeroBanner from "./components/ui/responsive-hero-banner";
import ProjectsSection from "./components/sections/Projects";
import ExperienceSection from "./components/sections/Experience";
import SkillsSection from "./components/sections/Skills";
import CertificationsSection from "./components/sections/Certifications";
import ContactSection from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ResponsiveHeroBanner />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
