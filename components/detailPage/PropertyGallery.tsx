"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  MapPin,
  PlayCircle,
} from "lucide-react";

const galleryImages = [
  "/assets/img/p1.avif",
  "/assets/img/p2.avif",
  "/assets/img/p3.avif",
  "/assets/img/p1.avif",
  "/assets/img/p2.avif",
  "/assets/img/p3.avif",
];

export default function PropertyGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <>
      <section className="bg-[#0f0f0f] pt-34 ">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-white/55 text-xs md:text-sm mb-6 flex flex-wrap gap-2">
            <span>Mumbai</span> &gt;
            <span>Properties in Mumbai</span> &gt;
            <span>Properties in Badlapur</span> &gt;
            <span className="text-white">Panvelkar Greens</span>
          </div>

          {/* Main Grid */}
          <div className=" gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4 w-full">
              {/* Left Main Image */}
              <div
                onClick={() => openLightbox(0)}
                className="relative h-[320px] md:h-[420px] rounded-[2rem] overflow-hidden cursor-pointer group"
              >
                <Image
                  src={galleryImages[0]}
                  alt="Property"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />

                {/* Share Button */}
                <button className="absolute top-5 left-5 w-12 h-12 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#ef4800] transition">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Right Gallery Grid */}
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.slice(1, 5).map((img, index) => (
                  <div
                    key={index}
                    onClick={() => openLightbox(index + 1)}
                    className="relative h-[155px] md:h-[200px] rounded-[1.8rem] overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />

                    {/* View All Overlay */}
                    {index === 3 && (
                      <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                        <button className="px-7 py-3 rounded-full bg-[#1a1a1a]/90 text-white text-sm tracking-[0.25em] font-medium hover:bg-[#ef4800] transition">
                          VIEW ALL
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Property Info */}
         <div className="grid lg:grid-cols-[1fr_auto] gap-8 mt-8 items-center">
  <div className="flex flex-col md:flex-row md:items-center gap-5">
    {/* Logo */}
    <div className="w-20 h-20 rounded-[1.8rem] bg-white flex items-center justify-center text-[#0f0f0f] font-semibold text-xs flex-shrink-0">
      Panvelkar
    </div>

    <div>
      <h1 className="text-white text-2xl md:text-4xl font-light leading-tight">
        Panvelkar Greens
      </h1>

      <p className="text-white/75 mt-2 text-xs md:text-base leading-6 flex items-start gap-2">
        <MapPin className="w-4 h-4 mt-0.5 text-[#ef4800] flex-shrink-0" />
        Joveli, Badlapur East, Thane, Maharashtra
      </p>
    </div>
  </div>

  <div className="flex flex-col items-start lg:items-end">
    <h2 className="text-white text-2xl md:text-3xl font-light leading-tight">
      ₹1.08 Cr - ₹2.34 Cr
    </h2>

    <button className="mt-4 px-8 py-3.5 rounded-full bg-white text-[#0f0f0f] hover:bg-[#ef4800] hover:text-white transition text-xs tracking-[0.28em] font-medium">
      BOOK PROPERTY
    </button>
  </div>
</div>

        
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center">
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#ef4800] transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#ef4800] transition"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Image */}
          <div className="relative w-[92%] max-w-6xl h-[65vh] md:h-[82vh]">
            <Image
              src={galleryImages[activeIndex]}
              alt="Full View"
              fill
              className="object-contain rounded-2xl"
            />
          </div>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#ef4800] transition"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Bottom Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto max-w-[90%] px-4">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 ${
                  activeIndex === index
                    ? "border-[#ef4800]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumb ${index}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
