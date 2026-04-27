"use client";

import { useEffect, useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import PropertyGallery from "@/components/detailPage/PropertyGallery";
import PropertyOverview from "@/components/detailPage/PropertyOverview";
import PropertyAmenities from "@/components/detailPage/PropertyAmenities";
import PropertyPriceFloorPlan from "@/components/detailPage/PropertyPriceFloorPlan";
import PropertyLocality from "@/components/detailPage/PropertyLocality";
import DeveloperSection from "@/components/detailPage/DeveloperSection";
import EmiCalculator from "@/components/detailPage/EmiCalculator";
import FAQ from "@/components/detailPage/faqs";

export default function PropertyDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { label: "Overview", id: "overview" },
    { label: "Amenities", id: "amenities" },
    { label: "Price & Floor Plan", id: "price-floor" },
    { label: "Locality", id: "locality" },
    { label: "Developer", id: "developer" },
    { label: "FAQ", id: "faq" },
  ];

  // ✅ FIXED SCROLL SPY (NO FLICKER / NO MISSED STATE)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveTab(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        // accounts for navbar (86px) + sticky tab bar
        rootMargin: "-140px 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    const sections = [
      "overview",
      "amenities",
      "price-floor",
      "locality",
      "developer",
      "faq",
    ];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#0f0f0f] min-h-screen pb-14">
      <div className="max-w-7xl mx-auto">

        {/* GALLERY */}
        <PropertyGallery />

        {/* ✅ STICKY NAVBAR (below 86px main navbar) */}
        <div className="sticky top-[86px] z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10 overflow-x-auto">
          <div className="flex gap-8 min-w-max text-sm px-3">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  document.getElementById(tab.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className={`py-4 whitespace-nowrap transition border-b-2 ${
                  activeTab === tab.id
                    ? "text-white border-[#ef4800]"
                    : "text-white/55 border-transparent hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}

          </div>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-10 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-20">

            <div id="overview" className="scroll-mt-[140px]">
              <PropertyOverview />
            </div>

            <div id="amenities" className="scroll-mt-[140px]">
              <PropertyAmenities />
            </div>

            <div id="price-floor" className="scroll-mt-[140px]">
              <PropertyPriceFloorPlan />
            </div>

            <div id="locality" className="scroll-mt-[140px]">
              <PropertyLocality />
            </div>

            <div id="developer" className="scroll-mt-[140px]">
              <DeveloperSection developerName={""} />
            </div>

            <div id="emi" className="scroll-mt-[140px]">
              <EmiCalculator />
            </div>

            <div id="faq" className="scroll-mt-[140px]">
              <FAQ />
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">

              {/* PRICE */}
              <div className="pb-5 border-b border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-[0.22em] mb-2">
                  Starting Price
                </p>
                <h3 className="text-white text-3xl font-light">₹1.08 Cr</h3>
                <p className="text-white/55 text-sm mt-2">Avg. ₹23,500/sq.ft</p>
              </div>

              {/* INFO */}
              <div className="py-5 space-y-4 border-b border-white/10">
                {[
                  ["Configuration", "1 RK, 2 BHK"],
                  ["Possession", "Ready to Move"],
                  ["RERA No.", "P51700007696"],
                  ["Carpet Area", "320 - 590 sqft"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4"
                  >
                    <span className="text-white/50 text-sm">{label}</span>
                    <span className="text-white text-sm font-medium text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-6 space-y-3">

                <button className="w-full flex items-center justify-center gap-2 bg-[#ef4800] hover:bg-[#d63f00] text-white rounded-full py-3.5 text-sm font-medium transition">
                  <Calendar size={16} />
                  Book Site Visit
                </button>

                <a
                  href="tel:+919999999999"
                  className="w-full flex items-center justify-center gap-2 border border-white/15 
                  text-white rounded-full py-3.5 text-sm font-medium transition
                  hover:border-blue-400/40 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  <Phone size={16} />
                  Call Now
                </a>

                <button
                  className="w-full flex items-center justify-center gap-2 border border-green-500/30 
                  bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white 
                  rounded-full py-3.5 text-sm font-medium transition"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp Now
                </button>

              </div>

              <p className="text-white/35 text-xs leading-6 mt-5 text-center">
                Free expert consultation • No brokerage • Verified property
              </p>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}