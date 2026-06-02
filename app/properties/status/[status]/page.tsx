"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { API } from "@/lib/api";

// Human-readable labels for known status slugs
const STATUS_LABELS: Record<string, string> = {
  "blox-assured":       "Blox Assured",
  "fast-selling":       "Fast Selling",
  "top-selling":        "Top Selling",
  "under-construction": "Under Construction",
  "ready-to-move":      "Ready to Move",
  "pre-launch":         "Pre-Launch",
  "newly-added":        "Newly Added",
};

export default function StatusPropertiesPage() {
  const params = useParams();
  const statusSlug = params?.status as string;

  const [projects, setProjects] = useState([]);
  const [city, setCity] = useState("Mumbai");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const statusLabel =
    STATUS_LABELS[statusSlug] ??
    statusSlug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Fetch city from settings + properties in parallel
  useEffect(() => {
    if (!statusSlug) return;

    setLoading(true);
    setError(false);

    Promise.all([
      fetch(API.properties({ status: statusSlug })).then((r) => r.json()),
      fetch(API.settings).then((r) => r.json()),
    ])
      .then(([propRes, settingsRes]) => {
        setProjects(propRes.data || []);
        const raw = settingsRes.data?.default_city ?? "Mumbai";
        setCity(
          raw.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [statusSlug]);

  return (
    <section className="bg-[#0f0f0f] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#ef4800] text-sm uppercase tracking-widest mb-2">
            Browse Properties
          </p>
          <h1 className="text-white text-4xl font-bold">
            {statusLabel} Properties in {city}
          </h1>
          {!loading && !error && (
            <p className="text-white/40 mt-2 text-sm">
              {projects.length} propert{projects.length === 1 ? "y" : "ies"} found
            </p>
          )}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-white/50 text-center py-20">
            Something went wrong. Please try again.
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-white/50 text-center py-20">
            No {statusLabel} properties found.
          </div>
        )}

        {/* Results */}
        {!loading && !error && projects.length > 0 && (
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