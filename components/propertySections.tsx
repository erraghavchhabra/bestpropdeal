"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";

interface Term {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const CONSTRUCTION_SLUGS = new Set(["under-construction", "ready-to-move", "pre-launch"]);
const BEST_MOVING_SLUGS  = new Set(["top-selling", "blox-assured", "fast-selling"]);

const DEVELOPER_LINKS = [
  { label: "Crystal Group projects in Mumbai",   href: "/properties?developer=crystal-group" },
  { label: "Raymond Realty projects in Mumbai",  href: "/properties?developer=raymond-realty" },
  { label: "Puravankara Projects in Mumbai",     href: "/properties?developer=puravankara" },
  { label: "Mahindra Lifespaces in Mumbai",      href: "/properties?developer=mahindra-lifespaces" },
];

export default function PropertiesForSale() {
  const [bhkTerms, setBhkTerms]       = useState<Term[]>([]);
  const [statusTerms, setStatusTerms] = useState<Term[]>([]);
  const [city, setCity]               = useState("Mumbai");
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(API.bhk).then((r) => r.json()),
      fetch(API.statuses).then((r) => r.json()),
      fetch(API.settings).then((r) => r.json()),
    ])
      .then(([bhkRes, statusRes, settingsRes]) => {
        setBhkTerms(bhkRes.data ?? []);
        setStatusTerms(statusRes.data ?? []);
        const raw = settingsRes.data?.default_city ?? "Mumbai";
        setCity(raw.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const constructionTerms = statusTerms.filter((t) => CONSTRUCTION_SLUGS.has(t.slug));
  const bestMovingTerms   = statusTerms.filter((t) => BEST_MOVING_SLUGS.has(t.slug));

  const sections = [
    {
      title: `Flats by Bedrooms in ${city}`,
      links: bhkTerms.map((t) => ({
        label: `${t.name} apartments in ${city}`,
        href:  `/properties/bhk/${t.slug}`,         // ← changed
      })),
    },
    {
      title: `New & Upcoming projects by developers in ${city}`,
      links: DEVELOPER_LINKS,
    },
    {
      title: `Construction status in ${city}`,
      links: constructionTerms.map((t) => ({
        label: `${t.name} properties in ${city}`,
        href:  `/properties/status/${t.slug}`,      // ← changed
      })),
    },
    {
      title: `Best moving properties in ${city}`,
      links: bestMovingTerms.map((t) => ({
        label: `${t.name} properties in ${city}`,
        href:  `/properties/status/${t.slug}`,      // ← changed
      })),
    },
  ];

  return (
    <section className="bg-[#0f0f0f] py-10 px-4 md:px-6 border-t border-t-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="mt-4 text-3xl text-white font-light leading-tight">
            Properties for sale in
            <span className="font-semibold"> {city}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-white font-semibold leading-snug mb-4 min-h-[50px]">
                {section.title}
              </h3>

              <div className="space-y-3">
                {loading
                  ? Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="h-4 rounded bg-white/10 animate-pulse w-3/4" />
                    ))
                  : section.links.map((link, j) => (
                      <Link
                        key={j}
                        href={link.href}
                        className="block text-sm text-white/65 leading-relaxed hover:text-[#ef4800] transition duration-300"
                      >
                        {link.label}
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