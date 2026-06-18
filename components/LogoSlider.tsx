"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";

interface Partner {
  id: number;
  name: string;
  experience?: string;
  image: string;
  description?: string;
  slug?: string;
  about?: string;
  vision?: string;
  gallery?: string[];
  properties?: unknown[];
  total_projects?: number;
}

export default function LogoSlider() {
  const [logos, setLogos] = useState<Partner[]>([]);
  const [activeLogo, setActiveLogo] = useState<number | null>(null);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const res = await fetch(API.developers);
        const data = await res.json();

        console.log("Partners:", data);

        setLogos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    loadPartners();
  }, []);

  if (!logos.length) return null;

  return (
    <section className="py-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Trusted Partners
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
            Our Top Developer
            <span className="font-semibold"> Partners</span>
          </h2>
        </div>

        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            {[...logos, ...logos].map((logo, index) => {
              const realIndex = index % logos.length;
              const isActive = activeLogo === realIndex;

              return (
                <div
                  key={`${logo.id}-${index}`}
                  className="w-1/5 min-w-[20%] px-3 flex-shrink-0"
                >
                  <Link
                    href={`/developers/${logo.slug}`}
                    onClick={() => setActiveLogo(isActive ? null : realIndex)}
                    className={`w-full h-36 rounded-[2rem] border backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "border-[#ef4800] bg-white/[0.08] shadow-[0_0_25px_rgba(239,72,0,0.18)] active-shake"
                        : "border-white/10 bg-white/[0.03] hover:border-[#ef4800]/40 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="relative w-[150px] h-[65px]">
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isActive
                          ? "max-h-10 opacity-100 mt-3"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-[#ef4800] text-sm font-medium tracking-wide">
                        {logo.name}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
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
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-4px);
          }
          40% {
            transform: translateX(4px);
          }
          60% {
            transform: translateX(-3px);
          }
          80% {
            transform: translateX(3px);
          }
        }

        .active-shake {
          animation: shake 0.45s ease-in-out;
        }

        @media (max-width: 1280px) {
          .animate-marquee > div {
            min-width: 25%;
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

        @media (max-width: 640px) {
          .animate-marquee > div {
            min-width: 80%;
          }
        }
      `}</style>
    </section>
  );
}