"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
  whatsapp: string;
  phone: string;
  slug?: string;

  // Optional fields
  carpetArea?: string;
  possession?: string;
  rera?: string;
  status?: string;

  // Optional urgency flags
  urgency?: "limited" | "prelaunch" | "ready" | "possession";
}

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  // ✅ Main Card Click → Property Detail Page
  const handleCardClick = () => {
    router.push(`/properties/${property.slug}`);
  };

  // ✅ Pick ONE urgency label
  const getUrgencyLabel = () => {
    if (property.urgency === "limited") return "3 Units Left";
    if (property.urgency === "prelaunch") return "Pre-Launch Price";
    if (property.urgency === "ready") return "Ready to Move";
    if (property.urgency === "possession") {
      return `Possession: ${property.possession || "Dec 2025"}`;
    }

    const labels = [
      "3 Units Left",
      "Pre-Launch Price",
      "Ready to Move",
      `Possession: ${property.possession || "Dec 2025"}`,
    ];

    return labels[property.id % labels.length];
  };

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
        {/* Call */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${property.phone}`);
          }}
          className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-green-500 transition duration-300"
        >
          <FaPhoneAlt size={18} />
        </button>

        {/* WhatsApp */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://wa.me/${property.whatsapp}`);
          }}
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
            <p className="font-medium">
              {property.carpetArea || "1200 sq.ft"}
            </p>
          </div>

          <div>
            <p className="opacity-70">Possession</p>
            <p className="font-medium">
              {property.possession || "Dec 2026"}
            </p>
          </div>

          <div>
            <p className="opacity-70">RERA No.</p>
            <p className="font-medium truncate">
              {property.rera || "RERA12345678"}
            </p>
          </div>

          <div>
            <p className="opacity-70">Status</p>
            <p className="font-medium">
              {property.status || "Under Construction"}
            </p>
          </div>
        </div>

        {/* Price + Explore */}
        <div className="mt-2 border-t border-white/30 pt-2 text-sm flex items-center justify-between">
          <div>
            <p className="font-medium">{property.price}</p>
            <p className="opacity-80">{property.type}</p>
          </div>

          {/* Explore Button */}
          <div className="mt-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/properties/${property.slug}`);
              }}
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