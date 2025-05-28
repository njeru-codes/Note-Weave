import Image from "next/image";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import CtaSection from "@/components/ctaSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FooterSection from "@/components/FooterSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
   <div>
      <NavBar />
      <HeroSection />
      <FeaturesSection/>
      <ReviewsSection/>
      <CtaSection />
      <HowItWorksSection />
      <FooterSection/>
   </div>
  );
}
