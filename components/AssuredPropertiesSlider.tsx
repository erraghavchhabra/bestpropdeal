"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import PropertyCard, { Property } from "./PropertyCard";

export default function AssuredPropertiesSlider({
  properties,
}: {
  properties: Property[];
}) {
  return (
    <section className="bg-[#0f0f0f] text-white pt-0 py-16 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="mb-10">
          <span className="text-[#ef4800] uppercase tracking-[0.25em] text-sm font-medium">
            Verified Listings
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-light tracking-tight leading-tight">
            Assured
            <span className="font-semibold"> Properties</span>
          </h2>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {properties.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-[380px] md:h-[420px]">
                <PropertyCard property={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}