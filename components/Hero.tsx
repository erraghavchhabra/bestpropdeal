"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  ShieldCheck,
  BadgeCheck,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

export default function Hero() {
  const router = useRouter();

  const cities = ["Badlapur", "Navi Mumbai", "Panvel", "Thane", "Kalyan"];
  const propertyTypes = ["Apartment", "Duplex", "Penthouse", "Villa", "Studio"];
  const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"];

  const allProjectSuggestions = [
    "Apartments in Navi Mumbai",
    "Luxury Apartments in Thane",
    "2 BHK in Panvel",
    "3 BHK Flats in Kalyan",
    "Ready to Move Apartments",
    "Under Construction Projects",
    "Affordable Homes in Badlapur",
    "Premium Villas in Navi Mumbai",
    "Duplex Homes in Thane",
    "Penthouse in Panvel",
    "Sea View Apartments",
    "New Launch Projects",
    "RERA Approved Flats",
    "Gated Community Apartments",
    "Township Projects in Mumbai",
    "Luxury Residences",
    "Studio Apartments",
    "Family Homes in Kalyan",
    "Smart Homes in Navi Mumbai",
    "High Rise Towers in Thane",
  ];

  const trendingProjects = [
    "🔥 Panvelkar Greens — 3 units left • Badlapur East",
    "🚀 Arihant Anmol Phase 2 — Just Launched • Badlapur West",
    "🏡 Shreeji Greens — 5 units left • Ambernath",
    "🔥 Metro Pride — Ready to Move • Kalyan",
  ];

  // --- State ---
  const [showFilters, setShowFilters] = useState(false);

  // Location
  const [locationInput, setLocationInput] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Project
  const [projectInput, setProjectInput] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState<string[]>([]);
  const [showProjectSuggestions, setShowProjectSuggestions] = useState(false);

  // Budget (both in Lakhs for consistent range: 10L – 500L)
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [minBudget, setMinBudget] = useState(10);
  const [maxBudget, setMaxBudget] = useState(500);

  // Bedrooms
  const [bedroomOpen, setBedroomOpen] = useState(false);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);

  // Property Type
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);

  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // --- Single click-outside handler ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
        setBudgetOpen(false);
        setTypeOpen(false);
        setBedroomOpen(false);
        setShowSuggestions(false);
        setShowProjectSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Helpers ---
  const closeAllDropdowns = () => {
    setBudgetOpen(false);
    setBedroomOpen(false);
    setTypeOpen(false);
    setShowProjectSuggestions(false);
    setShowSuggestions(false);
  };

  const handleLocationChange = (value: string) => {
    setLocationInput(value);
    if (value.trim().length > 0) {
      setFilteredCities(
        cities.filter((city) =>
          city.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setFilteredCities(cities);
      setShowSuggestions(false);
    }
  };

  const handleProjectChange = (value: string) => {
    setProjectInput(value);
    setShowFilters(true);
    if (value.trim().length > 0) {
      const filtered = allProjectSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setProjectSuggestions(filtered);
      setShowProjectSuggestions(true);
    } else {
      setProjectSuggestions([]);
      setShowProjectSuggestions(false);
    }
  };

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  // Budget: enforce min <= max
  const handleMinBudget = (value: number) => {
    setMinBudget(Math.min(value, maxBudget - 5));
  };
  const handleMaxBudget = (value: number) => {
    setMaxBudget(Math.max(value, minBudget + 5));
  };

  const formatBudget = (val: number) =>
    val >= 100 ? `₹${(val / 100).toFixed(val % 100 === 0 ? 0 : 1)}Cr` : `₹${val}L`;

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (locationInput.trim()) params.set("city", locationInput.trim());
    if (projectInput.trim())  params.set("project", projectInput.trim());

    // Bedrooms → sent as "bhk" param (e.g. "2-bhk") — matched against bap_bhk taxonomy
    if (selectedBedrooms.length > 0)
      params.set("bhk", selectedBedrooms[0].toLowerCase().replace(/\s+/g, "-"));

    // Property Type → sent as "property_type" param (e.g. "duplex") — also matched against bap_bhk
    if (selectedPropertyTypes.length > 0)
      params.set("property_type", selectedPropertyTypes[0].toLowerCase().replace(/\s+/g, "-"));

    router.push(`/properties?${params.toString()}`);
  };

  const handleClearAll = () => {
    setLocationInput("");
    setProjectInput("");
    setSelectedBedrooms([]);
    setSelectedPropertyTypes([]);
    setMinBudget(10);
    setMaxBudget(500);
    setShowFilters(false);
    setShowSuggestions(false);
    setProjectSuggestions([]);
    setShowProjectSuggestions(false);
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[90vh] flex items-center justify-center overflow-visible">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/img/hero-bg.avif')" }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/20" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 lg:pt-28">
        {/* Heading */}
        <h1 className="text-white font-light leading-tight tracking-tight text-[34px] sm:text-[42px] lg:text-[60px]">
          Find Your Dream Home, the Smarter Way
          <span className="text-[#f07050]">.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-center text-base sm:text-lg md:text-xl mt-4 font-light max-w-4xl mx-auto">
          Discover verified properties, manage paperwork online, and close deals
          faster with BestPropDeal&apos;s digital-first platform.
        </p>

        {/* Social Proof */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: <Users size={16} className="text-[#f07050]" />, label: "1,200+ Buyers" },
            { icon: <ShieldCheck size={16} className="text-[#f07050]" />, label: "RERA Verified" },
            { icon: <BadgeCheck size={16} className="text-[#f07050]" />, label: "Zero Hidden Charges" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full"
            >
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Search Box */}
        <div
          ref={searchWrapperRef}
          className="mt-6 sm:mt-8 bg-white rounded-[24px] shadow-2xl overflow-visible relative z-50"
        >
          {/* Top Row */}
          <div className="p-2 sm:p-3">
            <div className="bg-[#f8f8f8] rounded-[24px] lg:rounded-full flex flex-col lg:flex-row overflow-visible">

              {/* Location */}
              <div className="relative w-full lg:w-[220px] flex-shrink-0">
                <input
                  value={locationInput}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() => {
                    setFilteredCities(cities);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Location"
                  suppressHydrationWarning
                  className="w-full h-[52px] sm:h-[54px] px-5 sm:px-6 text-[14px] sm:text-[15px] text-gray-700 placeholder:text-gray-500 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (showSuggestions) {
                      setShowSuggestions(false);
                    } else {
                      setFilteredCities(
                        locationInput.trim()
                          ? cities.filter((c) =>
                              c.toLowerCase().includes(locationInput.toLowerCase())
                            )
                          : cities
                      );
                      setShowSuggestions(true);
                    }
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <ChevronDown size={16} />
                </button>

                {showSuggestions && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-[999] overflow-hidden">
                    {filteredCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setLocationInput(city);
                          setShowSuggestions(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-xs text-black hover:bg-[#ef4800] hover:text-white transition"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block h-8 w-px bg-gray-300 self-center" />

              {/* Project Search */}
              <div className="flex-1 relative">
                <input
                  value={projectInput}
                  onChange={(e) => handleProjectChange(e.target.value)}
                  onFocus={() => {
                    setShowFilters(true);
                    if (projectInput.trim().length > 0) {
                      const filtered = allProjectSuggestions.filter((item) =>
                        item.toLowerCase().includes(projectInput.toLowerCase())
                      );
                      setProjectSuggestions(filtered);
                      setShowProjectSuggestions(true);
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder='Search for Project "The Altitude"'
                  className="w-full h-[52px] sm:h-[54px] px-5 sm:px-6 text-[14px] sm:text-[15px] text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
                />

                {showProjectSuggestions && projectSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 z-[999] overflow-hidden max-h-[320px] overflow-y-auto">
                    {projectSuggestions.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setProjectInput(item);
                          setShowProjectSuggestions(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#fff4ef] transition border-b border-gray-100 last:border-0"
                      >
                        <Search size={14} className="text-[#ef4800] flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="p-2 pt-0 lg:pt-2">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full lg:w-auto h-[46px] px-6 bg-[#ef4800] hover:bg-[#b90002] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Search size={16} />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="px-3 sm:px-5 pb-5 search-filters-animate">
              <div className="flex flex-wrap gap-2">

                {/* Budget */}
                <div className="relative w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllDropdowns();
                      setBudgetOpen((prev) => !prev);
                    }}
                    className="w-full sm:w-auto min-h-[42px] px-4 sm:px-5 rounded-full border border-[#ef4800] text-gray-800 text-xs font-medium flex items-center justify-between sm:justify-center gap-2 bg-white"
                  >
                    <span className="truncate">
                      {formatBudget(minBudget)} – {formatBudget(maxBudget)}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform flex-shrink-0 ${budgetOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {budgetOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-[320px] bg-white rounded-2xl shadow-xl border border-gray-200 z-[999] p-5">
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-700">Min Budget</span>
                            <span className="text-xs font-semibold text-[#ef4800]">{formatBudget(minBudget)}</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="495"
                            step="5"
                            value={minBudget}
                            onChange={(e) => handleMinBudget(Number(e.target.value))}
                            className="w-full accent-[#ef4800]"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-700">Max Budget</span>
                            <span className="text-xs font-semibold text-[#ef4800]">{formatBudget(maxBudget)}</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="500"
                            step="5"
                            value={maxBudget}
                            onChange={(e) => handleMaxBudget(Number(e.target.value))}
                            className="w-full accent-[#ef4800]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bedrooms */}
                <div className="relative w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllDropdowns();
                      setBedroomOpen((prev) => !prev);
                    }}
                    className="w-full sm:w-auto min-h-[42px] px-4 sm:px-5 rounded-full border border-gray-300 text-gray-700 text-xs font-medium flex items-center justify-between sm:justify-center gap-2 bg-white"
                  >
                    <span>
                      Bedrooms{selectedBedrooms.length > 0 && ` (${selectedBedrooms.length})`}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${bedroomOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {bedroomOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-72 bg-white rounded-2xl shadow-xl border border-gray-200 z-[999] p-4">
                      <div className="flex flex-wrap gap-2">
                        {bedroomOptions.map((bedroom) => {
                          const active = selectedBedrooms.includes(bedroom);
                          return (
                            <button
                              key={bedroom}
                              type="button"
                              onClick={() =>
                                toggleSelection(bedroom, selectedBedrooms, setSelectedBedrooms)
                              }
                              className={`px-4 py-2 rounded-full text-xs font-medium transition border ${
                                active
                                  ? "bg-[#ef4800] text-white border-[#ef4800]"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-[#ef4800]"
                              }`}
                            >
                              {bedroom}
                            </button>
                          );
                        })}
                      </div>
                      {selectedBedrooms.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                          {selectedBedrooms.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-1 bg-[#fff1eb] text-[#ef4800] px-3 py-1.5 rounded-full text-xs font-semibold"
                            >
                              {item}
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedBedrooms(selectedBedrooms.filter((b) => b !== item))
                                }
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Property Type */}
                <div className="relative w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      closeAllDropdowns();
                      setTypeOpen((prev) => !prev);
                    }}
                    className="w-full sm:w-auto min-h-[42px] px-4 sm:px-5 rounded-full border border-gray-300 text-gray-700 text-xs font-medium flex items-center justify-between sm:justify-center gap-2 bg-white"
                  >
                    <span>
                      Property Type{selectedPropertyTypes.length > 0 && ` (${selectedPropertyTypes.length})`}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${typeOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {typeOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-[999] p-4">
                      <div className="flex flex-wrap gap-2">
                        {propertyTypes.map((type) => {
                          const active = selectedPropertyTypes.includes(type);
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                toggleSelection(type, selectedPropertyTypes, setSelectedPropertyTypes)
                              }
                              className={`px-4 py-2 rounded-full text-xs font-medium transition border ${
                                active
                                  ? "bg-[#ef4800] text-white border-[#ef4800]"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-[#ef4800]"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear All */}
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="w-full sm:w-auto sm:ml-auto min-h-[42px] text-xs font-semibold text-gray-700 hover:text-[#ef4800] transition"
                >
                  CLEAR ALL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trending */}
        <div className="mt-5 w-full overflow-hidden">
          <div className="flex whitespace-nowrap">
            <div className="flex animate-marquee gap-6">
              {trendingProjects.map((item, i) => (
                <span
                  key={i}
                  className="bg-white/10 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <button className="bg-[#ef4800] hover:bg-[#b90002] text-white px-8 py-3 rounded-full font-medium transition">
            Book a Site Visit
          </button>
        </div>
      </div>
    </section>
  );
}