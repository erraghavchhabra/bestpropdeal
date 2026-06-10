import Image from "next/image";
import { Building2, IndianRupee, Star } from "lucide-react";

export default function DeveloperHighlights() {
  const points = [
  "RERA-Approved & Trusted – Every developer we work with follows legal and transparent practices.",

  "On-Time Delivery – Proven track record of completing projects as promised.",

  "Quality Construction – Use of modern technology, strong materials, and sustainable designs.",

  "Diverse Portfolio – Affordable homes, luxury apartments, townships, and plotted developments.",

  "Strong Market Presence – Developers with years of experience and landmark projects across India.",
];

  return (
    <section className="bg-[#161515] py-16 md:py-20 px-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <div>
            {/* Main Image */}
            <div className="relative h-[260px] sm:h-[340px] md:h-[550px] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10">
              <Image
                src="/assets/img/developer-banner.avif"
                alt="Developer Banner"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-4xl md:text-6xl font-light text-white">
                    40+
                  </h3>

                  <Building2 className="text-[#ef4800]" size={28} />
                </div>

                <p className="text-sm md:text-base text-white/60">
                  Projects in Development
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-4xl md:text-6xl font-light text-white">
                    2.5B+
                  </h3>

                  <IndianRupee className="text-[#ef4800]" size={28} />
                </div>

                <p className="text-sm md:text-base text-white/60">
                  Total Projects Cost
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-[#ef4800]">
              Trusted Partners
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mt-4 leading-tight">
              Trusted Developers with
              <span className="font-semibold block">BestPropDeal</span>
            </h2>

            <p className="text-white/70 leading-8 md:leading-9 text-base md:text-lg mt-6 md:mt-8">
              freecompress-Property-0152.webp 40+ projects in development 2.5b+
              total projects cost Trusted Developers with BestPropDeal At
              BestPropDeal, we partner only with reputed and reliable real
              estate developers who share our vision of delivering quality,
              transparency, and timely possession. From affordable housing
              projects to premium luxury residences, we showcase a diverse range
              of developments that suit every budget and lifestyle. Our
              developer partners are RERA-registered, experienced, and
              customer-centric, ensuring you get the best options in the market.
            </p>

            <div className="space-y-3 md:space-y-3 mt-4 md:mt-6">
              {points.map((item, index) => (
                <div key={index} className="flex gap-3 md:gap-3 items-start">
                  <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-[#ef4800]/10 border border-[#ef4800]/20 flex items-center justify-center shrink-0">
                    <Star className="text-[#ef4800]" size={16} fill="#ef4800" />
                  </div>

                  <p className="text-sm md:text-lg text-white/80 leading-7 md:leading-8">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-[#ef4800]/10 rounded-full blur-[120px]" />

      <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-[#ef4800]/10 rounded-full blur-[120px]" />
    </section>
  );
}
