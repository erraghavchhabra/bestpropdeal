"use client";

import {
  MapPin,
  Train,
  School,
  Hospital,
  ShoppingBag,
  Bus,
  Plane,
  Utensils,
  Building2,
  TreePine,
  Dumbbell,
  Landmark,
  ShoppingCart,
  Coffee,
  Banknote,
  GraduationCap,
  Church,
  Car,
  Waves,
  LucideIcon,
} from "lucide-react";

interface Props {
  locality?: string;
  nearbyEssentials?: string | string[]; // WP REST API returns string[], raw meta is a string
}

/* ─── Icon mapping ───────────────────────────────────────────────────────── */

type IconEntry = { keywords: string[]; icon: LucideIcon };

const ICON_MAP: IconEntry[] = [
  { keywords: ["train", "railway", "station", "rail"],          icon: Train        },
  { keywords: ["school", "primary", "secondary"],               icon: School       },
  { keywords: ["hospital", "clinic", "medical", "health"],      icon: Hospital     },
  { keywords: ["dmart", "mall", "shopping", "market", "plaza"], icon: ShoppingBag  },
  { keywords: ["bus", "depot", "stop"],                         icon: Bus          },
  { keywords: ["airport", "airfield"],                          icon: Plane        },
  { keywords: ["restaurant", "food", "eat", "dine", "hotel"],   icon: Utensils     },
  { keywords: ["office", "corporate", "business", "it park"],   icon: Building2    },
  { keywords: ["park", "garden", "nature", "green"],            icon: TreePine     },
  { keywords: ["gym", "fitness", "sport"],                      icon: Dumbbell     },
  { keywords: ["temple", "church", "mosque", "mandir", "masjid", "gurudwara"], icon: Church },
  { keywords: ["landmark", "monument"],                         icon: Landmark     },
  { keywords: ["supermarket", "grocery", "store"],              icon: ShoppingCart },
  { keywords: ["cafe", "coffee", "tea"],                        icon: Coffee       },
  { keywords: ["bank", "atm", "finance"],                       icon: Banknote     },
  { keywords: ["college", "university", "institute", "iit", "iim"], icon: GraduationCap },
  { keywords: ["metro", "subway", "tube"],                      icon: Train        },
  { keywords: ["highway", "expressway", "road", "toll"],        icon: Car          },
  { keywords: ["lake", "river", "beach", "sea", "water"],       icon: Waves        },
];

function getIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  for (const entry of ICON_MAP) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.icon;
    }
  }
  return MapPin; // default fallback
}

/* ─── Fallback hardcoded list (shown when WP field is empty) ─────────────── */

const FALLBACK_PLACES = [
  { Icon: Train,       name: "Badlapur Railway Station",  distance: "8 mins"  },
  { Icon: School,      name: "Ryan International School", distance: "10 mins" },
  { Icon: Hospital,    name: "Dube Hospital",             distance: "7 mins"  },
  { Icon: ShoppingBag, name: "D Mart",                    distance: "12 mins" },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function PropertyLocality({ locality, nearbyEssentials }: Props) {
  const mapQuery = locality
    ? encodeURIComponent(locality)
    : "Mumbai%20Maharashtra";

  // Normalise: REST API sends string[], raw WP meta is a comma-separated string
  const essentialsArray: string[] | null =
    Array.isArray(nearbyEssentials)
      ? nearbyEssentials.filter(Boolean)
      : nearbyEssentials?.trim()
      ? nearbyEssentials.split(",").map((s) => s.trim()).filter(Boolean)
      : null;

  const dynamicPlaces = essentialsArray?.length
    ? essentialsArray.map((name) => ({ Icon: getIcon(name), name, distance: null }))
    : null;

  const places = dynamicPlaces ?? FALLBACK_PLACES;

  return (
    <section className="mt-14">
      <div className="mb-8">
        <h2 className="text-white text-2xl md:text-3xl font-light">
          Locality &amp; Map
        </h2>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 md:p-7">

        {/* Map — uses live locality from API */}
        <div className="rounded-[1.8rem] overflow-hidden border border-white/10 h-[320px] md:h-[450px] mb-8">
          <iframe
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
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
            {places.map((place, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/8 bg-white/[0.02] px-4 py-5 hover:border-[#ef4800]/20 transition text-center"
              >
                <div className="text-[#ef4800] flex justify-center mb-3">
                  <place.Icon className="w-4 h-4" />
                </div>
                <h4 className="text-white/85 text-[11px] md:text-xs leading-5 font-medium">
                  {place.name}
                </h4>
                {place.distance && (
                  <p className="mt-2 text-white/40 text-[10px] tracking-wide">
                    {place.distance}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Address — from API */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-white/45 text-[11px] uppercase tracking-[0.2em] mb-2">
            Project Address
          </p>
          <p className="text-white text-sm leading-7">
            {locality || "Address not available"}
          </p>
        </div>
      </div>
    </section>
  );
}