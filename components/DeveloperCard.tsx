"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";

type Developer = {
  id: number;
  name: string;
  experience: string;
  image: string;
  description: string;
  slug: string;
  about: string;
  vision: string;
  gallery: string[];
};

export default function DeveloperCard() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const res = await fetch(API.developers);
        const data = await res.json();
        setDevelopers(data);
      } catch (err) {
        console.error("Failed to fetch developers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDevelopers();
  }, []);

  return (
    <section className="bg-[#0f0f0f] pt-34 pb-34 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Developers
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl text-white font-light">
            Trusted Developer Partnerships That Define
            <span className="font-semibold"> Quality & Credibility</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden animate-pulse"
              >
                <div className="h-[220px] bg-white/10" />
                <div className="p-8 space-y-4">
                  <div className="h-3 w-32 bg-white/10 rounded" />
                  <div className="h-6 w-48 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-5/6 bg-white/10 rounded" />
                  <div className="h-4 w-24 bg-white/10 rounded mt-8" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {developers.map((developer) => (
              <article
                key={developer.id}
                className="group bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden"
              >
                <div className="relative h-[220px] bg-white">
                  <Image
                    src={developer.image}
                    alt={developer.name}
                    fill
                    className="object-contain p-10"
                  />
                </div>

                <div className="p-8">
                  <span className="text-[#ef4800] text-sm">
                    {developer.experience}
                  </span>

                  <h3 className="text-2xl text-white mt-4 mb-4">
                    {developer.name}
                  </h3>

                  <p className="text-white/70 line-clamp-3">
                    {developer.description}
                  </p>

                  <Link
                    href={`/developers/${developer.slug}`}
                    className="inline-flex items-center gap-2 text-[#ef4800] mt-8"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}