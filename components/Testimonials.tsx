"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Play, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

import { API } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  id: string | number;
  quote: string;
  name: string;
  role?: string;
  rating?: number | string;
  video_url?: string | null;
  image?: { medium?: string; full?: string } | null;
}

// ─── Skeletons ────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 h-[320px] flex flex-col justify-between animate-pulse">
      <div className="space-y-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded bg-white/10" />)}
        </div>
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="h-3 bg-white/10 rounded w-4/6" />
      </div>
      <div className="pt-5 border-t border-white/10 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded w-24" />
          <div className="h-3 bg-white/10 rounded w-16" />
        </div>
        <div className="w-12 h-12 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function VideoSkeleton() {
  return <div className="rounded-[2rem] bg-white/[0.03] h-[320px] animate-pulse" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Testimonials() {
  const [textTestimonials, setTextTestimonials]   = useState<Testimonial[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const url = API.testimonials({ per_page: 20 });
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list: Testimonial[] = Array.isArray(json) ? json : json.data ?? [];
        setTextTestimonials(list.filter((t) => !t.video_url));
        setVideoTestimonials(list.filter((t) =>  t.video_url));
      } catch (err) {
        console.error("Testimonials fetch error:", err);
        setError("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const swiperProps = {
    modules: [Navigation, Autoplay],
    navigation: true,
    loop: true,
    spaceBetween: 20,
    breakpoints: {
      0:    { slidesPerView: 1.1 },
      640:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  };

  // Don't render anything until client is mounted — avoids ALL hydration issues
  if (!mounted) return null;

  return (
    <section className="bg-[#0f0f0f] py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
            Hear From Our
            <span className="font-semibold"> Happy Clients</span>
          </h2>
        </div>

        {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

        {/* ── TEXT TESTIMONIALS ── */}
        <div className="mb-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : textTestimonials.length > 0 ? (
            <Swiper {...swiperProps} autoplay={{ delay: 4500, disableOnInteraction: false }}>
              {textTestimonials.map((item) => {
                const rating   = Number(item.rating) || 5;
                const imageUrl = item.image?.medium || item.image?.full || null;
                return (
                  <SwiperSlide key={item.id}>
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm h-[320px] flex flex-col justify-between">
                      <div>
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className={`w-4 h-4 ${idx < rating ? "fill-[#ef4800] text-[#ef4800]" : "fill-white/20 text-white/20"}`} />
                          ))}
                        </div>
                        <p className="text-white/75 text-sm leading-7 line-clamp-5">"{item.quote}"</p>
                      </div>
                      <div className="pt-5 border-t border-white/10 mt-6 flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-semibold">{item.name}</h4>
                          <p className="text-white/50 text-sm">{item.role}</p>
                        </div>
                        {imageUrl ? (
                          <img src={imageUrl} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#ef4800]/20 border-2 border-[#ef4800]/40 flex items-center justify-center">
                            <span className="text-[#ef4800] font-semibold text-sm">{item.name?.charAt(0) ?? "?"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            !error && <p className="text-white/40 text-sm">No testimonials found.</p>
          )}
        </div>

        {/* ── VIDEO TESTIMONIALS ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => <VideoSkeleton key={i} />)}
          </div>
        ) : videoTestimonials.length > 0 && (
          <Swiper {...swiperProps} autoplay={{ delay: 5000, disableOnInteraction: false }}>
            {videoTestimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative group rounded-[2rem] overflow-hidden cursor-pointer h-[320px]">
                  <video
                    src={item.video_url ?? undefined}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    autoPlay muted loop playsInline
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#ef4800] flex items-center justify-center group-hover:scale-110 transition">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
}