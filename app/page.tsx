import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import ThemeShowcase from "@/components/ThemeShowcase";
import BentoFeatures from "@/components/BentoFeatures";
import InstallSection from "@/components/InstallSection";
import Testimonials from "@/components/Testimonials";
import DocsSection from "@/components/DocsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ImpactSection />
      <ThemeShowcase />
      <BentoFeatures />
      <InstallSection />
      <Testimonials />
      <DocsSection />
      <Footer />
    </>
  );
}
