"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { API } from "@/lib/api";

import PropertyGallery from "@/components/detailPage/PropertyGallery";
import PropertyOverview from "@/components/detailPage/PropertyOverview";
import PropertyAmenities from "@/components/detailPage/PropertyAmenities";
import PropertyPriceFloorPlan from "@/components/detailPage/PropertyPriceFloorPlan";
import PropertyLocality from "@/components/detailPage/PropertyLocality";
import DeveloperSection from "@/components/detailPage/DeveloperSection";
import EmiCalculator from "@/components/detailPage/EmiCalculator";
import PropertyRera from "@/components/detailPage/PropertyRera";
import FAQ from "@/components/detailPage/faqs";

// ── Types ──────────────────────────────────────────────────────────────────────

interface BhkConfig {
  type: string;
  price: string;
  label: string;
  carpet_area: string;
  floor_plan_id: number;
  floor_plan_url: string;
}

/** Shape returned by bap_format_gallery() in the REST API */
export interface GalleryItem {
  id: number;
  url: string;
  thumb: string;
  type: "image" | "video";
  mime: string;
  alt: string;
}

interface Property {
  title: string;
  content?: string;
  locality?: string;
  possession?: string;
  total_floors?: string | number;
  total_units?: string | number;
  virtual_tour_url?: string;
  is_assured?: boolean;
  status?: string[];
  bhk?: string;
  bhk_config_summary?: string;
  bhk_configs?: BhkConfig[];
  carpet_area?: string;
  carpet_range?: string;
  price?: string | number;
  price_label?: string;
  price_range?: string;
  rera_id?: string;
  /** API now returns rich objects, not plain strings */
  gallery?: GalleryItem[];
  thumbnail?: string;
  developer_name?: string;
  developer_logo?: string;
  developer_url?: string;
  amenities?: string[];
  nearby_essentials?:string[];
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Format a raw price number (e.g. 424000) into a readable Indian label. */
function formatIndianPrice(raw: string | number | null | undefined): string | null {
  if (!raw) return null;
  const num = Number(raw);
  if (isNaN(num)) return String(raw);
  if (num >= 10_000_000) return `₹${(num / 10_000_000).toFixed(2)} Cr`;
  if (num >= 100_000) return `₹${(num / 100_000).toFixed(2)} L`;
  return `₹${num.toLocaleString("en-IN")}`;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) return;
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(API.property(slug));
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setProperty(json.data as Property);
      } catch (err) {
        console.error(err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [slug]);

  // ── Scroll spy ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveTab(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-140px 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );
    ["overview", "amenities", "price-floor", "locality", "developer", "faq"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      },
    );
    return () => observer.disconnect();
  }, [property]);

  const tabs = [
    { label: "Overview",           id: "overview"    },
    { label: "Amenities",          id: "amenities"   },
    { label: "Price & Floor Plan", id: "price-floor" },
    { label: "Locality",           id: "locality"    },
    { label: "Developer",          id: "developer"   },
    { label: "FAQ",                id: "faq"         },
  ];

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="bg-[#0f0f0f] min-h-screen pb-14">
        <div className="max-w-7xl mx-auto px-4 space-y-4 pt-4">
          <div className="h-[420px] bg-white/5 rounded-2xl animate-pulse" />
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-10">
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
            <div className="h-80 bg-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!property) {
    return (
      <main className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
        <p className="text-white/50 text-lg">Property not found.</p>
      </main>
    );
  }

  // ── Derived values for sidebar ─────────────────────────────────────────────
  const displayPrice =
    property.price_label ||
    formatIndianPrice(property.price) ||
    "Price on Request";

  const configSummary = property.bhk_config_summary || property.bhk || "—";
  const carpetRange = property.carpet_range || property.carpet_area || "—";
  const reraId = property.rera_id || "—";

  const waLink = `https://wa.me/919999999999?text=Hi, I'm interested in ${encodeURIComponent(
    property.title,
  )}`;

  const sidebarInfo: [string, string][] = [
    ["Configuration", configSummary],
    ["Possession",    property.possession || "—"],
    ["RERA No.",      reraId],
    ["Carpet Area",   carpetRange],
  ];

  return (
    <main className="bg-[#0f0f0f] min-h-screen pb-14">
      <div className="max-w-7xl mx-auto">

        {/* GALLERY — now receives GalleryItem[] */}
        <PropertyGallery
          gallery={property.gallery ?? []}
          thumbnail={property.thumbnail ?? ""}
          title={property.title}
          locality={property.locality ?? ""}
          developerName={property.developer_name ?? ""}
          developerLogo={property.developer_logo ?? ""}
          priceLabel={property.price_label ?? ""}
        />

        {/* STICKY NAVBAR */}
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
              <PropertyOverview
                title={property.title}
                content={property.content ?? ""}
                locality={property.locality ?? ""}
                possession={property.possession ?? ""}
                totalFloors={property.total_floors ? Number(property.total_floors) : undefined}
                totalUnits={property.total_units ? Number(property.total_units) : undefined}
                virtualTourUrl={property.virtual_tour_url ?? ""}
                isAssured={property.is_assured ?? false}
                status={property.status ?? []}
                bhk={property.bhk_config_summary || property.bhk || ""}
                carpetArea={property.carpet_range || property.carpet_area || ""}
                priceLabel={property.price_label ?? ""}
              />
            </div>

            <div id="amenities" className="scroll-mt-[140px]">
              <PropertyAmenities amenities={property.amenities ?? []} />
            </div>

            <div id="price-floor" className="scroll-mt-[140px]">
              <PropertyPriceFloorPlan bhkConfigs={property.bhk_configs ?? []} />
            </div>

            <div id="locality" className="scroll-mt-[140px]">
             <PropertyLocality locality={property.locality}  nearbyEssentials={property.nearby_essentials}/>

            </div>

            <div id="developer" className="scroll-mt-[140px]">
              <DeveloperSection
                developerName={property.developer_name ?? ""}
                description={property.developer_url ?? ""}
              />
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
            <div
              className="
                relative overflow-hidden
                rounded-[2.2rem]
                border border-[#ef4800]/20
                bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black
                backdrop-blur-xl
                p-6
                shadow-[0_0_40px_rgba(239,72,0,0.12)]
              "
            >
              {/* Glow Effects */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#ef4800]/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute inset-0 rounded-[2.2rem] border border-white/5 pointer-events-none" />

              <div className="relative z-10">
                {/* PRICE */}
                <div className="pb-5 border-b border-white/10">
                  <p className="text-white/45 text-xs uppercase tracking-[0.24em] mb-2">
                    Starting Price
                  </p>
                  <div className="flex items-end gap-2 flex-wrap">
                    <h3 className="text-white text-4xl font-light tracking-tight">
                      {displayPrice}
                    </h3>
                    {property.status?.includes("fast-selling") && (
                      <span className="mb-1 text-[11px] px-2 py-1 rounded-full bg-[#ef4800]/15 text-[#ff8b52] border border-[#ef4800]/20">
                        Fast Selling
                      </span>
                    )}
                  </div>
                  {property.price_range && property.price_range !== property.price_label && (
                    <p className="text-white/55 text-sm mt-2">
                      Range: {property.price_range}
                    </p>
                  )}
                </div>

                {/* INFO ROWS */}
                <div className="py-5 space-y-3 border-b border-white/10">
                  {sidebarInfo.map(([label, value]) => (
                    <div
                      key={label}
                      className="
                        flex justify-between gap-4
                        rounded-2xl px-3 py-3
                        bg-white/[0.03] border border-white/5
                      "
                    >
                      <span className="text-white/50 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA BUTTONS */}
                <div className="pt-6 space-y-3">
                  <button
                    className="
                      w-full flex items-center justify-center gap-2
                      bg-gradient-to-r from-[#ef4800] to-[#ff6a00]
                      hover:scale-[1.02]
                      hover:shadow-[0_0_30px_rgba(239,72,0,0.45)]
                      text-white rounded-full py-3.5 text-sm font-medium
                      transition duration-300
                    "
                  >
                    <Calendar size={16} />
                    Book Site Visit
                  </button>

                  <a
                    href="tel:+919999999999"
                    className="
                      w-full flex items-center justify-center gap-2
                      border border-blue-400/20 bg-blue-500/[0.06] text-blue-300
                      rounded-full py-3.5 text-sm font-medium transition
                      hover:bg-blue-500 hover:text-white
                      hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]
                    "
                  >
                    <Phone size={16} />
                    Call Now
                  </a>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full flex items-center justify-center gap-2
                      border border-green-500/30 bg-green-500/[0.08]
                      hover:bg-green-500
                      text-green-400 hover:text-white
                      rounded-full py-3.5 text-sm font-medium transition
                      hover:shadow-[0_0_24px_rgba(34,197,94,0.35)]
                    "
                  >
                    <FaWhatsapp size={18} />
                    WhatsApp Now
                  </a>
                </div>

                {/* Bottom Note */}
                <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-white/40 text-xs leading-6 text-center">
                    Free expert consultation • No brokerage • Verified property
                  </p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}