"use client";

import { useMemo, useState } from "react";
import PropertyCard, { Property } from "@/components/PropertyCard";

const allProperties: Property[] = [
  {
    id: 1,
    title: "Panvelkar Greens",
    location: "Badlapur East, Thane",
    price: "₹1.08 Cr",
    type: "1 BHK",
    image: "/assets/img/p1.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
    carpetArea: "650 sq.ft",
    possession: "Dec 2026",
    status: "Under Construction",
  },
  {
    id: 2,
    title: "Panvelkar Utsav",
    location: "Badlapur West, Thane",
    price: "₹2.25 Cr",
    type: "2 BHK",
    image: "/assets/img/p2.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
    carpetArea: "980 sq.ft",
    possession: "Ready",
    status: "Ready to Move",
  },
  {
    id: 3,
    title: "Dreamland Enclave",
    location: "Belavali, Thane",
    price: "₹3.10 Cr",
    type: "3 BHK",
    image: "/assets/img/p3.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
    carpetArea: "1450 sq.ft",
    possession: "Jun 2027",
    status: "Pre Launch",
  },
];

export default function PropertiesPage() {
  const [budget, setBudget] = useState("");
  const [carpet, setCarpet] = useState("");
  const [type, setType] = useState("");

  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      const numericPrice = parseFloat(property.price.replace(/[₹,Cr\s]/g, ""));

      const matchesBudget =
        !budget ||
        (budget === "1" && numericPrice <= 1) ||
        (budget === "2" && numericPrice > 1 && numericPrice <= 2) ||
        (budget === "3" && numericPrice > 2);

      const carpetValue = parseInt(property.carpetArea || "0");

      const matchesCarpet =
        !carpet ||
        (carpet === "700" && carpetValue <= 700) ||
        (carpet === "1200" && carpetValue > 700 && carpetValue <= 1200) ||
        (carpet === "1201" && carpetValue > 1200);

      const matchesType = !type || property.type.includes(type);

      return matchesBudget && matchesCarpet && matchesType;
    });
  }, [budget, carpet, type]);

  return (
    <section className="bg-[#0f0f0f] min-h-screen lg:pt-40 lg:pb-20 py-30 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="mt-4 text-3xl md:text-5xl text-white font-light">
            1 BHK in
            <span className="font-semibold"> Badlapur</span>
          </h1>

          <p className="text-white/60 mt-3">
            {filteredProperties.length} properties found
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-white text-base font-medium">
                  Filter Properties
                </h3>
              </div>
              <button
                onClick={() => {
                  setBudget("");
                  setCarpet("");
                  setType("");
                }}
                className="text-[#ef4800] text-sm font-medium hover:underline self-start lg:self-auto"
              >
                Reset Filters
              </button>
            </div>

            {/* Filters Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Budget */}
              <div className="relative">
                <label className="block text-white/55 text-[11px] mb-2 uppercase tracking-wider">
                  Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white text-sm rounded-2xl px-4 py-3 outline-none focus:border-[#ef4800] transition appearance-none"
                >
                  <option value="">Select Budget</option>
                  <option value="1">Below ₹1 Cr</option>
                  <option value="2">₹1 Cr - ₹2 Cr</option>
                  <option value="3">Above ₹2 Cr</option>
                </select>
              </div>

              {/* Carpet Area */}
              <div className="relative">
                <label className="block text-white/55 text-[11px] mb-2 uppercase tracking-wider">
                  Carpet Area
                </label>
                <select
                  value={carpet}
                  onChange={(e) => setCarpet(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white text-sm rounded-2xl px-4 py-3 outline-none focus:border-[#ef4800] transition appearance-none"
                >
                  <option value="">Select Area</option>
                  <option value="700">Below 700 sq.ft</option>
                  <option value="1200">700 - 1200 sq.ft</option>
                  <option value="1201">1200+ sq.ft</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="relative">
                <label className="block text-white/55 text-[11px] mb-2 uppercase tracking-wider">
                  Property Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#181818] border border-white/10 text-white text-sm rounded-2xl px-4 py-3 outline-none focus:border-[#ef4800] transition appearance-none"
                >
                  <option value="">Select Type</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full bg-[#ef4800] hover:bg-[#d63f00] text-white text-sm font-medium rounded-2xl py-3 transition">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties */}
        {filteredProperties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredProperties.map((property) => (
              <div key={property.id} className="w-full max-w-[320px]">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-white/10 rounded-3xl bg-white/[0.02]">
            <h3 className="text-white text-2xl font-semibold">
              No Properties Found
            </h3>
            <p className="text-white/50 mt-3">
              Try adjusting your filters to explore more options.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
