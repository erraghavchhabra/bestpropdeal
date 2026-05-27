import WhoWeAre from "@/components/AboutPage/WhoWeAre";
import VisionMission from "@/components/AboutPage/VisionMission";
import LogoSlider from "@/components/LogoSlider";
import WhatWeOffer from "@/components/AboutPage/WhatWeOffer";
import PropertySteps from "@/components/AboutPage/PropertySteps";
import FounderSection from "@/components/AboutPage/FounderSection";
import TeamSlider from "@/components/AboutPage/TeamMembers";
import Testimonials from "@/components/Testimonials";
export default function AboutPage() {
  return (
    <>
      <WhoWeAre />
      <VisionMission />
      <LogoSlider />
      <WhatWeOffer />
      <PropertySteps />
      <FounderSection />
      <TeamSlider />
      <Testimonials />
    </>
  );
}