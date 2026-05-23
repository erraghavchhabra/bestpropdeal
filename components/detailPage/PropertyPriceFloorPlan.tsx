"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface BhkConfig {
  type: string;         // e.g. "1 BHK", "2 BHK"
  price: string;        // e.g. "4,24,000"
  label: string;        // e.g. "4 lak onwards"
  carpet_area: string;  // e.g. "1320"
  floor_plan_id: number;
  floor_plan_url: string;
}

interface Props {
  bhkConfigs?: BhkConfig[];
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Format "1320" → "1,320 sq.ft" */
function formatArea(raw: string | number): string {
  const n = Number(String(raw).replace(/[^0-9.]/g, ""));
  if (isNaN(n)) return String(raw);
  return `${n.toLocaleString("en-IN")} sq.ft`;
}

// Fallback floor plan placeholder (grey blueprint grid as inline SVG data-URL)
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23444' font-size='18' font-family='sans-serif'%3EFloor Plan Coming Soon%3C/text%3E%3C/svg%3E";

// ── Component ──────────────────────────────────────────────────────────────────

export default function PropertyPriceFloorPlan({ bhkConfigs }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Graceful empty state
  if (!bhkConfigs || bhkConfigs.length === 0) {
    return (
      <section className="mt-14">
        <div className="mb-7">
          <h2 className="mt-3 text-2xl md:text-3xl text-white font-light">
            Price &amp; Floor Plan
          </h2>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">
          <p className="text-white/40 text-sm">Floor plan details not available.</p>
        </div>
      </section>
    );
  }

  const active = bhkConfigs[activeIndex];
  const floorPlanSrc = active.floor_plan_url || FALLBACK_IMAGE;
  const hasFloorPlan = Boolean(active.floor_plan_url);

  return (
    <section className="mt-14">

      {/* Heading */}
      <div className="mb-7">
        <h2 className="mt-3 text-2xl md:text-3xl text-white font-light">
          Price &amp; Floor Plan
        </h2>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 md:p-7">

        {/* BHK Type Tabs */}
        <div className="flex flex-wrap gap-3 mb-7">
          {bhkConfigs.map((cfg, i) => (
            <button
              key={cfg.type}
              onClick={() => setActiveIndex(i)}
              className={`px-6 py-3 rounded-full text-sm tracking-[0.18em] font-medium transition ${
                activeIndex === i
                  ? "bg-[#2a2220] text-white border border-[#ef4800]/30"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {cfg.type}
            </button>
          ))}
        </div>

        {/* Carpet Area */}
        <div className="mb-4">
          <p className="text-[#ef4800] text-lg font-light">
            {formatArea(active.carpet_area)}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-5">

          {/* Price Table */}
          <div className="grid grid-cols-2 max-w-sm mb-8">
            <div className="border-r border-white/10 pr-6">
              <p className="text-white/45 text-sm mb-2">Name</p>
              <h3 className="text-white text-xl font-light">{active.type}</h3>
            </div>

            <div className="pl-6">
              <p className="text-white/45 text-sm mb-2">Price Range</p>
              <h3 className="text-white text-xl font-light">
                {/* Prefer the human label; fall back to raw price string */}
                {active.label || `₹${active.price}`}
              </h3>
            </div>
          </div>

          {/* Floor Plan Image */}
          <div className="relative rounded-[1.8rem] overflow-hidden border border-white/10 bg-black/20 group">
            <div className="relative w-full h-[300px] md:h-[600px]">
              <Image
                src={floorPlanSrc}
                alt={`${active.type} Floor Plan`}
                fill
                className="object-contain p-4 md:p-8 group-hover:scale-105 transition duration-700"
                unoptimized={!hasFloorPlan} // skip Next.js optimisation for data-URL fallback
              />
            </div>

            {/* Expand button — only shown when a real image exists */}
            {hasFloorPlan && (
              <button
                onClick={() => setLightboxOpen(true)}
                className="
                  absolute bottom-4 right-4
                  flex items-center gap-2
                  bg-black/60 hover:bg-black/80
                  text-white/80 hover:text-white
                  backdrop-blur-sm
                  border border-white/10
                  rounded-full px-4 py-2 text-xs
                  transition duration-200
                  opacity-0 group-hover:opacity-100
                "
              >
                <Maximize2 size={13} />
                View Full Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && hasFloorPlan && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={floorPlanSrc}
              alt={`${active.type} Floor Plan`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/60 hover:text-white text-sm border border-white/20 rounded-full px-4 py-1.5 transition"
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}
