import DeveloperHighlights from "@/components/DeveloperHighlights";
import DeveloperCard from "@/components/DeveloperCard";
import FeaturedProjects from "@/components/FeaturedProjects";
import DeveloperFaq from "@/components/DeveloperFaq";

export default function DevelopersPage() {
  return (
    <>
      
      <DeveloperCard />
      <DeveloperHighlights />
      <FeaturedProjects />
      <DeveloperFaq />
    </>
  );
}