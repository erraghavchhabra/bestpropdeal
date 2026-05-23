"use client";

import { useState } from "react";
import {
  BedDouble,
  Building2,
  CalendarCheck2,
  IndianRupee,
  Ruler,
  ShieldCheck,
} from "lucide-react";

interface PropertyOverviewProps {
  title: string;
  content: string;
  locality?: string;
  possession?: string;
  totalFloors?: number;
  totalUnits?: number;
  virtualTourUrl?: string;
  isAssured?: boolean;
  status?: string[];
  bhk?: string;
  carpetArea?: string;
  priceLabel?: string;
}

export default function PropertyOverview({
  title,
  content,
  possession,
  totalFloors,
  totalUnits,
  isAssured,
  status = [],
  bhk,
  carpetArea,
  priceLabel,
}: PropertyOverviewProps) {
  const [expanded, setExpanded] = useState(false);

  // Strip HTML tags from WordPress content
  const plainText = content?.replace(/<[^>]*>/g, "").trim() ?? "";
  const shortText = plainText.length > 220 ? plainText.slice(0, 220) + "..." : plainText;

  const statusLabel = status.includes("fast-selling")
    ? "Fast Selling"
    : status.includes("blox-assured")
    ? "Blox Assured"
    : possession ?? "—";

  const features = [
    {
      icon: <BedDouble className="w-3.5 h-3.5" />,
      label: "Configuration",
      value: bhk || "—",
    },
    {
      icon: <CalendarCheck2 className="w-3.5 h-3.5" />,
      label: "Possession",
      value: possession || "—",
    },
    {
      icon: <IndianRupee className="w-3.5 h-3.5" />,
      label: "Price",
      value: priceLabel || "—",
    },
    {
      icon: <Ruler className="w-3.5 h-3.5" />,
      label: "Carpet Area",
      value: carpetArea ? `${carpetArea} sqft` : "—",
    },
    ...(totalFloors
      ? [
          {
            icon: <Building2 className="w-3.5 h-3.5" />,
            label: "Total Floors",
            value: String(totalFloors),
          },
        ]
      : []),
    ...(totalUnits
      ? [
          {
            icon: <Building2 className="w-3.5 h-3.5" />,
            label: "Total Units",
            value: String(totalUnits),
          },
        ]
      : []),
  ];

  return (
    <section className="bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-8 flex items-center gap-3">
          <h2 className="text-2xl md:text-4xl text-white font-light">Overview</h2>
          {isAssured && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#ef4800]/10 border border-[#ef4800]/30 text-[#ef4800] text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Blox Assured
            </span>
          )}
        </div>

        {/* Description */}
        {plainText && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8">
            <p className="text-white/75 text-sm md:text-base leading-8">
              {expanded ? plainText : shortText}
            </p>
            {plainText.length > 220 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 text-[#ef4800] text-sm font-medium hover:underline"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        )}

        {/* Feature Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3 hover:border-[#ef4800]/40 transition"
            >
              <div className="w-7 h-7 rounded-lg bg-[#ef4800]/10 text-[#ef4800] flex items-center justify-center mb-2">
                {feature.icon}
              </div>
              <p className="text-white/35 text-[11px] uppercase tracking-[0.18em] mb-1">
                {feature.label}
              </p>
              <h3 className="text-white text-[11px] font-medium leading-4">
                {feature.value}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}