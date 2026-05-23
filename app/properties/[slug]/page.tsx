"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { API } from "@/lib/api";

// Derive a display name from the image URL
// e.g. "flower-valley.png" → "Flower Valley"
function nameFromUrl(url: string): string {
  const filename = url.split("/").pop() ?? "";
  const base     = filename.replace(/\.[^.]+$/, ""); // strip extension
  return base
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function LogoSlider() {
  const [partners, setPartners]     = useState<string[]>([]);
  const [activeLogo, setActiveLogo] = useState<number | null>(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res  = await fetch(API.settings);
        const json = await res.json();
        setPartners(json.partners ?? []);
      } catch (err) {
        console.error("Partners fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  // Duplicate for infinite marquee
  const slides = [...partners, ...partners];

  return (
    <section className="py-20 px-4 md:px-6 overflow-hidden">
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

        {/* Skeleton */}
        {loading ? (
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-36 rounded-[2rem] bg-white/[0.03] border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Fades */}
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee whitespace-nowrap py-4">
              {slides.map((url, index) => {
                const realIndex = index % partners.length;
                const isActive  = activeLogo === realIndex;
                const name      = nameFromUrl(url);

                return (
                  <div key={index} className="w-1/5 min-w-[20%] px-3 flex-shrink-0">
                    <button
                      onClick={() => setActiveLogo(isActive ? null : realIndex)}
                      className={`w-full h-36 rounded-[2rem] border backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "border-[#ef4800] bg-white/[0.08] shadow-[0_0_25px_rgba(239,72,0,0.18)] active-shake"
                          : "border-white/10 bg-white/[0.03] hover:border-[#ef4800]/40 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="relative w-[150px] h-[65px]">
                        <Image
                          src={url}
                          alt={name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-10 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                        <p className="text-[#ef4800] text-sm font-medium tracking-wide">
                          {name}
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-marquee {
          width: max-content;
          animation: marquee 24s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-4px); }
          40%       { transform: translateX(4px); }
          60%       { transform: translateX(-3px); }
          80%       { transform: translateX(3px); }
        }
        .active-shake { animation: shake 0.45s ease-in-out; }

        @media (max-width: 1280px) { .animate-marquee > div { min-width: 25%; } }
        @media (max-width: 1024px) { .animate-marquee > div { min-width: 33.33%; } }
        @media (max-width: 768px)  { .animate-marquee > div { min-width: 50%; } }
        @media (max-width: 640px)  { .animate-marquee > div { min-width: 80%; } }
      `}</style>
    </section>
  );
}