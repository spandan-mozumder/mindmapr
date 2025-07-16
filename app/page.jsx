import CTASection from "@/components/cta";
import FAQSection from "@/components/faq";
import FeaturesSection from "@/components/features";
import HeroSection from "@/components/hero";
import HowItWorksSection from "@/components/howitworks";
import StatsSection from "@/components/stats";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
