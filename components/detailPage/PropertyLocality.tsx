"use client";

import { MapPin, Train, School, Hospital, ShoppingBag } from "lucide-react";

export default function PropertyLocality() {
  const nearbyPlaces = [
    {
      icon: <Train className="w-4 h-4" />,
      name: "Badlapur Railway Station",
      distance: "8 mins",
    },
    {
      icon: <School className="w-4 h-4" />,
      name: "Ryan International School",
      distance: "10 mins",
    },
    {
      icon: <Hospital className="w-4 h-4" />,
      name: "Dube Hospital",
      distance: "7 mins",
    },
    {
      icon: <ShoppingBag className="w-4 h-4" />,
      name: "D Mart",
      distance: "12 mins",
    },
  ];

  return (
    <section className="mt-14">
         {/* Header */}
        <div className="mb-8">
          <h2 className="text-white text-2xl md:text-3xl font-light">
            Locality & Map
          </h2>

        </div>

      {/* Outer Container */}
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 md:p-7">
       
        {/* Full Width Map */}
        <div className="rounded-[1.8rem] overflow-hidden border border-white/10 h-[320px] md:h-[450px] mb-8">
          <iframe
            src="https://www.google.com/maps?q=Badlapur%20East%20Maharashtra&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Nearby Essentials */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-[#ef4800]" />
            <h3 className="text-white text-base md:text-lg font-light">
              Nearby Essentials
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {nearbyPlaces.map((place, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/8 bg-white/[0.02] px-4 py-5 hover:border-[#ef4800]/20 transition text-center"
              >
                {/* Icon */}
                <div className="text-[#ef4800] flex justify-center mb-3">
                  {place.icon}
                </div>

                {/* Name */}
                <h4 className="text-white/85 text-[11px] md:text-xs leading-5 font-medium">
                  {place.name}
                </h4>

                {/* Distance */}
                <p className="mt-2 text-white/40 text-[10px] tracking-wide">
                  {place.distance}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-white/45 text-[11px] uppercase tracking-[0.2em] mb-2">
            Project Address
          </p>

          <p className="text-white text-sm leading-7">
            Panvelkar Greens, Joveli, Badlapur East, Thane, Maharashtra
          </p>
        </div>
      </div>
    </section>
  );
}
