"use client";

import { useState } from "react";
import {
  Users,
  ShieldCheck,
  BadgeCheck,
  ChevronDown,
  Search,
} from "lucide-react";

export default function Hero() {
  const cities = ["Badlapur", "Navi Mumbai", "Panvel", "Thane", "Kalyan"];

  const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "Villa", "Plot"];
  const budgets = ["Under 50L", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"];

  const trendingProjects = [
    "🔥 Panvelkar Greens — 3 units left • Badlapur East",
    "🚀 Arihant Anmol Phase 2 — Just Launched • Badlapur West",
    "🏡 Shreeji Greens — 5 units left • Ambernath",
    "🔥 Metro Pride — Ready to Move • Kalyan",
  ];

  const [selectedType, setSelectedType] = useState("Property Type");
  const [selectedBudget, setSelectedBudget] = useState("Budget");

  const [typeOpen, setTypeOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  const [locationInput, setLocationInput] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationChange = (value: string) => {
    setLocationInput(value);

    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[80vh] flex items-center justify-center overflow-visible">
      
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/img/hero-bg.avif')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center w-full pt-24 lg:pt-28">
        
        {/* Heading */}
        <h1 className="text-white font-light leading-tight tracking-tight text-[34px] sm:text-[42px] lg:text-[60px]">
          Find Your Dream Home, the Smarter Way
          <span className="text-[#f07050]">.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-base sm:text-lg md:text-xl mt-4 font-light max-w-3xl mx-auto">
          Discover verified properties, manage paperwork online, and close deals
          faster with BestPropDeal’s digital-first platform.
        </p>

        {/* Social Proof */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full">
            <Users size={16} className="text-[#f07050]" />
            <span>1,200+ Buyers</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full">
            <ShieldCheck size={16} className="text-[#f07050]" />
            <span>RERA Verified</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full">
            <BadgeCheck size={16} className="text-[#f07050]" />
            <span>Zero Hidden Charges</span>
          </div>
        </div>

        {/* Search Box */}
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-3xl md:rounded-full p-2.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 shadow-2xl relative z-50 lg:justify-between">
          
          {/* LOCATION */}
          <div className="relative w-full lg:w-[200px] flex-shrink-0">
            <input
              value={locationInput}
              onChange={(e) => handleLocationChange(e.target.value)}
              placeholder="Enter location..."
              className="w-full px-5 py-2.5 text-sm text-black outline-none"
            />

            {showSuggestions && filteredCities.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-[999] overflow-hidden">
                {filteredCities.map((city, index) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocationInput(city);
                      setShowSuggestions(false);
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm text-black transition
                      ${index === 0 ? "rounded-t-2xl" : ""}
                      ${index === filteredCities.length - 1 ? "rounded-b-2xl" : ""}
                      hover:bg-[#ef4800] hover:text-white`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block h-7 w-px bg-gray-300" />

          {/* Property Type */}
          <div className="relative w-full lg:w-[180px] flex-shrink-0">
            <button
              onClick={() => {
                setTypeOpen(!typeOpen);
                setBudgetOpen(false);
              }}
              className="w-full flex justify-between items-center px-5 py-2.5 text-black font-medium"
            >
              {selectedType}
              <ChevronDown size={18} className={`${typeOpen ? "rotate-180" : ""}`} />
            </button>

            {typeOpen && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-[999] overflow-hidden">
                {propertyTypes.map((type, index) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      setTypeOpen(false);
                    }}
                    className={`block w-full text-left items-center px-5 py-3 text-sm text-black transition
                      ${index === 0 ? "rounded-t-2xl" : ""}
                      ${index === propertyTypes.length - 1 ? "rounded-b-2xl" : ""}
                      hover:bg-[#ef4800] hover:text-white`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block h-7 w-px bg-gray-300" />

          {/* Budget */}
          <div className="relative w-full lg:w-[160px] flex-shrink-0">
            <button
              onClick={() => {
                setBudgetOpen(!budgetOpen);
                setTypeOpen(false);
              }}
              className="w-full flex justify-between px-5 py-2.5 text-black font-medium"
            >
              {selectedBudget}
              <ChevronDown size={18} className={`${budgetOpen ? "rotate-180" : ""}`} />
            </button>

            {budgetOpen && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-[999] overflow-hidden">
                {budgets.map((budget, index) => (
                  <button
                    key={budget}
                    onClick={() => {
                      setSelectedBudget(budget);
                      setBudgetOpen(false);
                    }}
                    className={`block w-full text-left px-5 py-3 text-sm text-black transition
                      ${index === 0 ? "rounded-t-2xl" : ""}
                      ${index === budgets.length - 1 ? "rounded-b-2xl" : ""}
                      hover:bg-[#ef4800] hover:text-white`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block h-7 w-px bg-gray-300" />

          {/* Search Button */}
          <button className="bg-[#ef4800] hover:bg-[#b90002] text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 justify-center shrink-0">
            <Search size={16} />
            Search
          </button>
        </div>

        {/* Trending */}
        <div className="mt-5 w-full overflow-hidden">
          <div className="flex whitespace-nowrap">
            <div className="flex animate-marquee gap-6">
              {trendingProjects.map((item, i) => (
                <span key={i} className="bg-white/10 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/20">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button className="bg-[#ef4800] hover:bg-[#b90002] text-white px-8 py-3 rounded-full font-medium">
            Book a Site Visit
          </button>
        </div>
      </div>
    </section>
  );
}