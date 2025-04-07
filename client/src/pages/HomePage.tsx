import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatisticsSection from "@/components/StatisticsSection";
import CommandsSection from "@/components/CommandsSection";
import CTASection from "@/components/CTASection";
import SupportSection from "@/components/SupportSection";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [location] = useLocation();
  
  // Scroll to section if hash is present in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Add a slight delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatisticsSection />
      <CommandsSection />
      <CTASection />
      <SupportSection />
    </>
  );
}
