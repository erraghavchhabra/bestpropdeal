"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { API } from "@/lib/api";

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
}

export default function OngoingProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API.ongoing);
        const data = await res.json();

        setProjects(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-[#0f0f0f] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white text-4xl font-bold mb-10">
          Ongoing Projects
        </h1>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
                        {projects.map((property: any) => (
              <PropertyCard
                key={property.id}
                property={{
                  id: property.id,
                  slug: property.slug,
                  title: property.title,
                  location: property.locality || "",
                  price: property.price_label || property.price || "",
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
        )}
      </div>
    </section>
  );
}