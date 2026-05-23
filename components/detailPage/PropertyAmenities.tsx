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
  Droplets,
  Wifi,
  Wind,
  PersonStanding,
  Bike,
  FlameKindling,
  PawPrint,
  Accessibility,
  Star,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PropertyAmenitiesProps {
  amenities: string[];
}

// Map amenity keywords → icon
const iconMap: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["security", "guard", "cctv"],          icon: ShieldCheck     },
  { keywords: ["garden", "landscape", "park", "lawn"], icon: Trees           },
  { keywords: ["gym", "gymnasium", "fitness"],         icon: Dumbbell        },
  { keywords: ["visitor", "parking", "reserved"],      icon: CircleParking   },
  { keywords: ["car", "garage"],                       icon: Car             },
  { keywords: ["pool", "swimming", "clubhouse"],       icon: Waves           },
  { keywords: ["play", "children", "kids"],            icon: Gamepad2        },
  { keywords: ["lift", "elevator"],                    icon: Building2       },
  { keywords: ["power", "backup", "generator"],        icon: Zap             },
  { keywords: ["water", "tank", "supply"],             icon: Droplets        },
  { keywords: ["wifi", "internet", "broadband"],       icon: Wifi            },
  { keywords: ["air", "ventilation", "ac"],            icon: Wind            },
  { keywords: ["walk", "jogging", "track"],            icon: PersonStanding  },
  { keywords: ["cycle", "bicycle", "bike"],            icon: Bike            },
  { keywords: ["bbq", "fire", "bonfire"],              icon: FlameKindling   },
  { keywords: ["pet", "dog", "animal"],                icon: PawPrint        },
  { keywords: ["disable", "wheelchair", "access"],     icon: Accessibility   },
];

function getIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  const match = iconMap.find(({ keywords }) =>
    keywords.some((kw) => lower.includes(kw))
  );
  return match?.icon ?? Star;
}

export default function PropertyAmenities({ amenities = [] }: PropertyAmenitiesProps) {
  if (!amenities.length) return null;

  return (
    <section className="mt-14">
      <div className="mb-7">
        <h2 className="mt-3 text-2xl md:text-3xl text-white font-light">
          Amenities
        </h2>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 md:p-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {amenities.map((name, index) => {
            const Icon = getIcon(name);
            return (
              <div
                key={index}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-white/[0.04] transition duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-[#ef4800]/10 text-[#ef4800] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-white text-xs md:text-sm font-medium leading-5">
                  {name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}