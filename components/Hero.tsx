"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function Hero() {
  const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"];
  const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "Villa", "Plot"];
  const budgets = ["Under 50L", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"];

  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [selectedType, setSelectedType] = useState("Property Type");
  const [selectedBudget, setSelectedBudget] = useState("Budget");

  const [cityOpen, setCityOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

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
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/20" />

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

        {/* Search Box */}
        <div className="mt-8 max-w-7xl mx-auto bg-white rounded-3xl md:rounded-full p-2.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 shadow-2xl relative z-50">
          
          {/* Location Dropdown */}
          <div className="relative w-full lg:w-[180px]">
            <button
              onClick={() => {
                setCityOpen(!cityOpen);
                setTypeOpen(false);
                setBudgetOpen(false);
              }}
              className="w-full flex items-center justify-between px-5 py-2.5 text-gray-700 font-medium"
            >
              {selectedCity}
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  cityOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-xl z-[999] overflow-hidden transition-all duration-300 origin-top ${
                cityOpen
                  ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setCityOpen(false);
                  }}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-gray-800 text-sm"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block h-7 w-px bg-gray-300" />

          {/* Type Dropdown */}
          <div className="relative w-full lg:w-[180px]">
            <button
              onClick={() => {
                setTypeOpen(!typeOpen);
                setCityOpen(false);
                setBudgetOpen(false);
              }}
              className="w-full flex items-center justify-between px-5 py-2.5 text-gray-700 font-medium"
            >
              {selectedType}
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  typeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-xl z-[999] overflow-hidden transition-all duration-300 origin-top ${
                typeOpen
                  ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setTypeOpen(false);
                  }}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-gray-800 text-sm"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block h-7 w-px bg-gray-300" />

          {/* Budget Dropdown */}
          <div className="relative w-full lg:w-[180px]">
            <button
              onClick={() => {
                setBudgetOpen(!budgetOpen);
                setCityOpen(false);
                setTypeOpen(false);
              }}
              className="w-full flex items-center justify-between px-5 py-2.5 text-gray-700 font-medium"
            >
              {selectedBudget}
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  budgetOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-xl z-[999] overflow-hidden transition-all duration-300 origin-top ${
                budgetOpen
                  ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {budgets.map((budget) => (
                <button
                  key={budget}
                  onClick={() => {
                    setSelectedBudget(budget);
                    setBudgetOpen(false);
                  }}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-gray-800 text-sm"
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block h-7 w-px bg-gray-300" />

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search locality, project, landmark..."
            className="flex-1 w-full px-4 py-2.5 text-sm md:text-[15px] text-gray-700 outline-none"
          />

          {/* Search Button */}
          <button className="bg-[#ef4800] hover:bg-[#b90002] text-white px-6 py-2.5 rounded-full font-semibold transition flex items-center justify-center gap-2 w-full lg:w-auto">
            <Search size={16} />
            Search
          </button>
        </div>

        {/* Site Visit Button */}
        <div className="mt-6">
          <button className="bg-[#ef4800] hover:bg-[#b90002] text-white px-8 py-3 rounded-full font-medium transition-all duration-300">
            Book a Site Visit
          </button>
        </div>
      </div>
    </section>
  );
}