"use client";

import { useState } from "react";
import {
  BedDouble,
  Building2,
  CalendarCheck2,
  IndianRupee,
  Ruler,
} from "lucide-react";

export default function PropertyOverview() {
  const [expanded, setExpanded] = useState(false);

  const fullText =
    "Panvelkar Greens is a thoughtfully designed residential project located in the fast-growing hub of Badlapur East. Built for modern urban living, this premium development offers smartly planned 1 RK and 2 BHK residences with excellent connectivity, lifestyle amenities, and a peaceful environment. Completed in December 2021, the project is ideal for both end-users and investors looking for long-term value appreciation. With competitive pricing, quality construction, and strategic location benefits, Panvelkar Greens presents a balanced opportunity for comfortable living and future growth.";

  const shortText = fullText.slice(0, 220) + "...";

  const features = [
    {
      icon: <BedDouble className="w-5 h-5" />,
      label: "Configuration",
      value: "1 RK, 2 BHK",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Status",
      value: "Ready to Move",
    },
    {
      icon: <CalendarCheck2 className="w-5 h-5" />,
      label: "Completed",
      value: "Dec 2021",
    },
    {
      icon: <IndianRupee className="w-5 h-5" />,
      label: "Avg. Price",
      value: "₹23,500/sq.ft",
    },
    {
      icon: <Ruler className="w-5 h-5" />,
      label: "RERA Carpet Area",
      value: "320 - 590 sqft",
    },
  ];

  return (
    <section className="bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
        

          <h2 className="mt-3 text-2xl md:text-4xl text-white font-light">
           Overview
         
          </h2>
        </div>

        {/* Description */}
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8">
          <p className="text-white/75 text-sm md:text-base leading-8">
            {expanded ? fullText : shortText}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-[#ef4800] text-sm font-medium hover:underline"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
        {/* Features */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              icon: <BedDouble className="w-3.5 h-3.5" />,
              label: "Configuration",
              value: "1 RK, 2 BHK",
            },
            {
              icon: <CalendarCheck2 className="w-3.5 h-3.5" />,
              label: "Status / Completed",
              value: "Ready to Move • Dec 2021",
            },
            {
              icon: <IndianRupee className="w-3.5 h-3.5" />,
              label: "Avg. Price",
              value: "₹23,500/sq.ft",
            },
            {
              icon: <Ruler className="w-3.5 h-3.5" />,
              label: "RERA Carpet Area",
              value: "320 - 590 sqft",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3 hover:border-[#ef4800]/40 transition"
            >
              <div className="w-7 h-7 rounded-lg bg-[#ef4800]/10 text-[#ef4800] flex items-center justify-center mb-2">
                {feature.icon}
              </div>

              <p className="text-white/35 !text-[12px] uppercase tracking-[0.18em] mb-1">
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
