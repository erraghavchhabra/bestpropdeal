"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface DeveloperSectionProps {
  developerName: string;
  /** Slug used to build the /developers/[slug] link */
  developerSlug?: string;
  developerLogo?: string;
  experience?: string;
  description?: string;
}

export default function DeveloperSection({
  developerName,
  developerSlug,
  developerLogo,
  experience,
  description = "A trusted real estate developer known for delivering thoughtfully designed homes that blend modern architecture, quality construction, and lifestyle comfort. With a strong focus on timely delivery and customer satisfaction, the developer continues to create landmark residential projects in prime locations.",
}: DeveloperSectionProps) {
  const href = `/developers/${developerSlug}`;

  const CardContent = (
    <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 transition hover:border-[#ef4800]/40 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-5">
          {developerLogo && (
            <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src={developerLogo}
                alt={developerName}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
          )}

          <div>
            <h2 className="text-white text-3xl font-light">
              {developerName}
            </h2>
            {experience && (
              <p className="text-[#ef4800] text-sm mt-1">{experience}</p>
            )}
          </div>
        </div>

        {developerSlug && (
          <span className="flex items-center gap-1.5 text-sm text-white/60 group-hover:text-[#ef4800] transition mt-2">
            View Developer
            <ArrowUpRight size={16} />
          </span>
        )}
      </div>

      <p className="mt-6 text-white/65 text-sm md:text-base leading-7">
        {description}
      </p>
    </div>
  );

  return (
    <section className="mt-16 space-y-8">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="mt-3 text-2xl md:text-4xl text-white font-light">
          About Developer
        </h2>
      </div>

      {/* DEVELOPER SECTION */}
      <Link href={href} className="group block">
        {CardContent}
      </Link>
    </section>
  );
}