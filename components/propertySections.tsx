"use client";

import Link from "next/link";

const propertySections = [
  {
    title: "Flats by Bedrooms in Mumbai",
    links: [
      "1 BHK apartments in Mumbai",
      "2 BHK apartments in Mumbai",
      "3 BHK apartments in Mumbai",
      "4 BHK apartments in Mumbai",
    ],
  },
  {
    title: "New & Upcoming projects by developers in Mumbai",
    links: [
      "Crystal Group projects in Mumbai",
      "Raymond Realty projects in Mumbai",
      "Puravankara Projects Ltd projects in Mumbai",
      "Mahindra Lifespaces projects in Mumbai",
    ],
  },
  {
    title: "Construction status in Mumbai",
    links: [
      "Under construction properties in Mumbai",
      "Ready To Move properties in Mumbai",
      "Pre-launch properties in Mumbai",
    ],
  },
  {
    title: "Best moving properties in Mumbai",
    links: [
      "Top Selling properties in Mumbai",
      "Blox Assured properties in Mumbai",
      "Fast Selling properties in Mumbai",
    ],
  },
];

export default function PropertiesForSale() {
  return (
    <section className="bg-[#0f0f0f] py-10 px-4 md:px-6 border-t border-t-white/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="mb-14">
         

          <h2 className="mt-4 text-3xl md:text-3xl text-white font-light leading-tight">
            Properties for sale in
            <span className="font-semibold"> Mumbai</span>
          </h2>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {propertySections.map((section, index) => (
            <div key={index}>
              {/* Section Title */}
              <h3 className="text-white text-l font-semibold leading-snug mb-4 min-h-[50px]">
                {section.title}
              </h3>

              {/* Links */}
              <div className="space-y-3">
                {section.links.map((link, i) => (
                  <Link
                    key={i}
                    href="/"
                    className="block text-sm text-white/65 text-lg leading-relaxed hover:text-[#ef4800] transition duration-300"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}