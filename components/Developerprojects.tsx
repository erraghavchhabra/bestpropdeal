"use client";

import PropertyCard from "@/components/PropertyCard";

interface BhkConfig {
  type: string;
  price: string;
  label: string;
  carpet_area: string;
  floor_plan_id: number;
  floor_plan_url: string;
}

interface GalleryItem {
  id: number;
  url: string;
  thumb: string;
  type: "image" | "video";
  mime: string;
  alt: string;
}

interface Property {
  id: number;
  slug: string;
  title: string;
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
  gallery?: GalleryItem[];
  thumbnail?: string;
  developer_name?: string;
  developer_logo?: string;
  developer_url?: string;
  amenities?: string[];
  whatsapp?: string;
  phone?: string;
}

interface DeveloperProjectsProps {
  properties: Property[];
}

export default function DeveloperProjects({ properties }: DeveloperProjectsProps) {
  if (properties.length === 0) return null;

  return (
    <section className="bg-[#0f0f0f] py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-white text-3xl font-bold mb-2">Projects</h2>
        <p className="text-white/50 text-sm mb-10">
          {properties.length} {properties.length === 1 ? "property" : "properties"} by this developer
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                id: property.id,
                slug: property.slug,
                title: property.title,
                location: property.locality || "",
                price: property.price_label || String(property.price || ""),
                type: property.bhk || "",
                image: property.thumbnail || "",
                status: property.status?.[0] || "",
                possession: property.possession || "",
                whatsapp: property.whatsapp || "",
                phone: property.phone || "",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}