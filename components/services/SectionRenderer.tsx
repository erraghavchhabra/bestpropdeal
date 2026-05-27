import HeroSection from "./sections/HeroSection";
import FeaturesGrid from "./sections/FeaturesGrid";
import ServiceCards from "./sections/ServiceCards";
import StatsSection from "./sections/StatsSection";
import FAQSection from "./sections/FAQSection";


export default function SectionRenderer({
  section,
}: any) {

  switch (section.type) {

    case "hero":
      return <HeroSection data={section} />;

    case "features-grid":
      return <FeaturesGrid data={section} />;

    case "service-cards":
      return <ServiceCards data={section} />;

    case "stats":
      return <StatsSection data={section} />;

    case "faq":
      return <FAQSection data={section} />;

   

    default:
      return null;
  }
}