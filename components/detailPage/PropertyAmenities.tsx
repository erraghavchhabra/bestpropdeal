"use client";

import {
  Dumbbell,
  ShieldCheck,
  Trees,
  Car,
  Waves,
  Gamepad2,
  Building2,
  CircleParking,
  Zap,
} from "lucide-react";

export default function PropertyAmenities() {
  const amenities = [
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "24x7 Security",
    },
    {
      icon: <Trees className="w-4 h-4" />,
      title: "Landscaped Garden",
    },
    {
      icon: <Dumbbell className="w-4 h-4" />,
      title: "Gymnasium",
    },
    {
      icon: <Car className="w-4 h-4" />,
      title: "Visitor Parking",
    },
    {
      icon: <Waves className="w-4 h-4" />,
      title: "Clubhouse",
    },
    {
      icon: <Gamepad2 className="w-4 h-4" />,
      title: "Children Play Area",
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Lift Facility",
    },
    {
      icon: <CircleParking className="w-4 h-4" />,
      title: "Reserved Parking",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "Power Backup",
    },
  ];

  return (
    <section className="mt-14">
      {/* Heading */}
      <div className="mb-7">
        <h2 className="mt-3 text-2xl md:text-3xl text-white font-light">
          Amenities
        </h2>
      </div>

      {/* Single Container */}
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 md:p-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-white/[0.04] transition duration-300"
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-[#ef4800]/10 text-[#ef4800] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                {amenity.icon}
              </div>

              {/* Text */}
              <h3 className="text-white text-xs md:text-sm font-medium leading-5">
                {amenity.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}