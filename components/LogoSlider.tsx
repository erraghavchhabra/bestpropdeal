"use client";

import Image from "next/image";

const logos = [
  { name: "Logo 1", image: "/assets/img/dashmesh.png" },
  { name: "Logo 2", image: "/assets/img/flower-valley.png" },
  { name: "Logo 3", image: "/assets/img/jp-harmony.png" },
  { name: "Logo 4", image: "/assets/img/panvelakr.png" },
];

export default function LogoSlider() {
  return (
    <section className="bg-[#0f0f0f] py-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Trusted Partners
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
           Our Top Developer
            <span className="font-semibold"> Partners</span>
        
          </h2>
        </div>

        {/* Logo Slider */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10" />

          <div className="flex animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="w-1/5 min-w-[20%] px-4 flex-shrink-0"
              >
                <div className="h-28 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center group hover:border-[#ef4800]/40 hover:bg-white/[0.06] transition duration-500">
                  <div className="relative w-[150px] h-[60px] grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        .animate-marquee {
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 1024px) {
          .animate-marquee > div {
            min-width: 33.33%;
          }
        }

        @media (max-width: 768px) {
          .animate-marquee > div {
            min-width: 50%;
          }
        }
      `}</style>
    </section>
  );
}