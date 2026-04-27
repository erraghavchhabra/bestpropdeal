"use client";

interface DeveloperSectionProps {
  developerName: string;
  description?: string;
}

export default function DeveloperSection({
  developerName,
  description = "A trusted real estate developer known for delivering thoughtfully designed homes that blend modern architecture, quality construction, and lifestyle comfort. With a strong focus on timely delivery and customer satisfaction, the developer continues to create landmark residential projects in prime locations.",
}: DeveloperSectionProps) {
  return (
    <section className="mt-16 space-y-8">
 {/* Heading */}
        <div className="mb-8">
        

          <h2 className="mt-3 text-2xl md:text-4xl text-white font-light">
           About Developer
         
          </h2>
        </div>
      {/* DEVELOPER SECTION */}
      <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] backdrop-blur-md p-8">

      
        <h2 className="text-white text-3xl font-light mt-2">
          {developerName}
        </h2>

        <p className="text-white/60 text-sm mt-4 leading-7 max-w-3xl">
          {description}
        </p>

      </div>

    </section>
  );
}