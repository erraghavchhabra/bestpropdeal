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
}

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/property/${property.id}`)}
      className="relative group rounded-3xl overflow-hidden cursor-pointer h-[420px] transition-all duration-300"
    >
      {/* Image */}
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Right Icons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${property.phone}`);
          }}
          className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white"
        >
          <FaPhoneAlt size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://wa.me/${property.whatsapp}`);
          }}
          className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white"
        >
          <FaWhatsapp size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-4 text-white">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-sm opacity-80">{property.location}</p>

        <div className="mt-2 border-t border-white/30 pt-2 text-sm flex items-center justify-between">
          <div>
            <p className="font-medium">{property.price}</p>
            <p className="opacity-80">{property.type}</p>
          </div>
          <div>
            {/* Book Visit Button */}
            <div className="mt-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={(e) => e.stopPropagation()}
                className="bg-orange-500 hover:bg-orange-600 text-white text-[13px] px-3 py-2 rounded-full"
              >
                BOOK A VISIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
