"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export interface BhkConfig {
  type: string;        // e.g. "2 BHK", "Studio"
  price: string;       // e.g. "85,00,000"
  label: string;       // e.g. "₹85 L" (formatted label)
  carpet_area: string; // e.g. "650"
  floor_plan_url?: string;
}

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;        // kept for fallback
  type: string;         // kept for fallback
  image: string;
  whatsapp: string;
  phone: string;
  slug?: string;

  // Multi-BHK configs from API
  bhk_configs?: BhkConfig[];

  // Optional fields
  possession?: string;
  rera?: string;
  status?: string;
  urgency?: "limited" | "prelaunch" | "ready" | "possession";
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function resolvePrice(property: Property): string {
  const configs = property.bhk_configs?.filter((c) => c.label || c.price);
  if (!configs || configs.length === 0) return property.price || "Price on Request";
  if (configs.length === 1) return configs[0].label || configs[0].price;
  const first = configs[0].label || configs[0].price;
  const last  = configs[configs.length - 1].label || configs[configs.length - 1].price;
  return `${first} – ${last}`;
}

function resolveType(property: Property): string {
  const configs = property.bhk_configs?.filter((c) => c.type);
  if (!configs || configs.length === 0) return property.type || "";
  if (configs.length === 1) return configs[0].type;
  return `${configs[0].type} – ${configs[configs.length - 1].type}`;
}

function resolveArea(property: Property): string {
  const configs = property.bhk_configs?.filter((c) => c.carpet_area);
  if (!configs || configs.length === 0) return "On Request";
  if (configs.length === 1) return `${configs[0].carpet_area} sq.ft`;
  const first = configs[0].carpet_area;
  const last  = configs[configs.length - 1].carpet_area;
  return first === last ? `${first} sq.ft` : `${first} – ${last} sq.ft`;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  const handleCardClick = () => router.push(`/properties/${property.slug}`);

  const getUrgencyLabel = () => {
    if (property.urgency === "limited")    return "3 Units Left";
    if (property.urgency === "prelaunch")  return "Pre-Launch Price";
    if (property.urgency === "ready")      return "Ready to Move";
    if (property.urgency === "possession") return `Possession: ${property.possession || "Dec 2025"}`;
    const labels = [
      "3 Units Left",
      "Pre-Launch Price",
      "Ready to Move",
      `Possession: ${property.possession || "Dec 2025"}`,
    ];
    return labels[property.id % labels.length];
  };

  const priceDisplay = resolvePrice(property);
  const typeDisplay  = resolveType(property);
  const areaDisplay  = resolveArea(property);

  return (
    <div
      onClick={handleCardClick}
      className="relative group rounded-3xl overflow-hidden cursor-pointer h-[480px] transition-all duration-300"
    >
      {/* Image */}
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Urgency Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-orange-500/90 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-medium shadow-md">
          {getUrgencyLabel()}
        </span>
      </div>

      {/* Right Icons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); window.open(`tel:${property.phone}`); }}
          className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-green-500 transition duration-300"
        >
          <FaPhoneAlt size={18} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${property.whatsapp}`); }}
          className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-green-600 transition duration-300"
        >
          <FaWhatsapp size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-4 text-white">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-sm opacity-80">{property.location}</p>

        {/* Data Points */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-white/5 backdrop-blur-md rounded-xl p-3">
          <div>
            <p className="opacity-70">Carpet Area</p>
            <p className="font-medium">{areaDisplay}</p>
          </div>
          <div>
            <p className="opacity-70">Possession</p>
            <p className="font-medium">{property.possession || "Dec 2026"}</p>
          </div>
          <div>
            <p className="opacity-70">RERA No.</p>
            <p className="font-medium truncate">{property.rera || "RERA12345678"}</p>
          </div>
          <div>
            <p className="opacity-70">Status</p>
            <p className="font-medium">{property.status || "Under Construction"}</p>
          </div>
        </div>

        {/* Price + Type + Explore */}
        <div className="mt-2 border-t border-white/30 pt-2 text-sm flex items-center justify-between">
          <div>
            <p className="font-medium">{priceDisplay}</p>
            <p className="opacity-80">{typeDisplay}</p>
          </div>
          <div className="mt-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => { e.stopPropagation(); router.push(`/properties/${property.slug}`); }}
              className="bg-orange-500 hover:bg-orange-600 text-white text-[13px] px-3 py-2 rounded-full"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}