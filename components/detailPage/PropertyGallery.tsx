"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  MapPin,
  Play,
} from "lucide-react";
 // adjust path if needed

// ── Props ──────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number;
  url: string;
  thumb: string;
  type: "image" | "video";
  mime: string;
  alt: string;
}

interface PropertyGalleryProps {
  /** Rich gallery items from the API (images + videos) */
  gallery: GalleryItem[];
  thumbnail: string;
  title: string;
  locality?: string;
  developerName?: string;
  developerLogo?: string;
  priceLabel?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/** Build the master list: thumbnail first (as image), then gallery items */
function buildMediaList(thumbnail: string, gallery: GalleryItem[]): GalleryItem[] {
  const items: GalleryItem[] = [];

  if (thumbnail && isValidUrl(thumbnail)) {
    items.push({
      id: 0,
      url: thumbnail,
      thumb: thumbnail,
      type: "image",
      mime: "image/webp",
      alt: "Property thumbnail",
    });
  }

  for (const item of gallery) {
    if (item && item.url && isValidUrl(item.url)) {
      items.push(item);
    }
  }

  return items;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

/** A single thumbnail tile — renders <Image> for images, <video> poster for videos */
function MediaTile({
  item,
  fill = true,
  className = "",
  onClick,
}: {
  item: GalleryItem;
  fill?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  if (item.type === "video") {
    return (
      <div className={`relative w-full h-full ${className}`} onClick={onClick}>
        <video
          src={item.url}
          muted
          preload="metadata"
          className="w-full h-full object-cover"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        {/* VIDEO badge */}
        <span className="absolute bottom-2 left-2 text-[9px] font-bold tracking-widest bg-black/60 text-white px-2 py-0.5 rounded-full uppercase">
          Video
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`} onClick={onClick}>
      <Image
        src={item.url}
        alt={item.alt || "Property image"}
        fill={fill}
        className="object-cover group-hover:scale-105 transition duration-700"
      />
    </div>
  );
}

/** Lightbox media — full image or playing video */
function LightboxMedia({ item }: { item: GalleryItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        src={item.url}
        controls
        autoPlay
        className="max-w-[92vw] max-h-[82vh] rounded-2xl bg-black outline-none"
        style={{ width: "auto", height: "auto" }}
      />
    );
  }

  return (
    <div className="relative w-[92vw] max-w-6xl h-[65vh] md:h-[82vh]">
      <Image
        src={item.url}
        alt={item.alt || "Property image"}
        fill
        className="object-contain rounded-2xl"
        priority
      />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PropertyGallery({
  gallery = [],
  thumbnail,
  title,
  locality,
  developerName,
  developerLogo,
  priceLabel,
}: PropertyGalleryProps) {
  const allMedia = buildMediaList(thumbnail, gallery);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % allMedia.length);
  }, [allMedia.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  }, [allMedia.length]);

  // Keyboard nav
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [closeLightbox, goNext, goPrev],
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      <section className="bg-[#0f0f0f] pt-34">
        <div className="max-w-7xl mx-auto">

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4 w-full">

            {/* Hero / first media */}
            {allMedia[0] ? (
              <div
                onClick={() => openLightbox(0)}
                className="relative h-[320px] md:h-[420px] rounded-[2rem] overflow-hidden cursor-pointer group"
              >
                <MediaTile item={allMedia[0]} />
                <button
                  onClick={(e) => { e.stopPropagation(); navigator.share?.({ title, url: window.location.href }); }}
                  className="absolute top-5 left-5 w-12 h-12 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#ef4800] transition z-10"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* Fallback when no media at all */
              <div className="relative h-[320px] md:h-[420px] rounded-[2rem] overflow-hidden bg-white/5 flex items-center justify-center">
                <span className="text-white/30 text-sm">No images available</span>
              </div>
            )}

            {/* Right 2×2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {allMedia.slice(1, 5).map((item, index) => {
                const globalIndex = index + 1;
                const isLast = index === 3 && allMedia.length > 5;
                return (
                  <div
                    key={item.id ?? globalIndex}
                    onClick={() => openLightbox(globalIndex)}
                    className="relative h-[155px] md:h-[200px] rounded-[1.8rem] overflow-hidden cursor-pointer group"
                  >
                    <MediaTile item={item} />
                    {isLast && (
                      <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-10">
                        <button className="px-7 py-3 rounded-full bg-[#1a1a1a]/90 text-white text-sm tracking-[0.25em] font-medium hover:bg-[#ef4800] transition">
                          +{allMedia.length - 5} MORE
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Empty placeholders so grid always fills 4 cells */}
              {allMedia.length < 5 &&
                Array.from({ length: 4 - Math.max(allMedia.length - 1, 0) }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="h-[155px] md:h-[200px] rounded-[1.8rem] bg-white/[0.03] border border-white/5"
                  />
                ))}
            </div>
          </div>

          {/* ── Property Info Bar ── */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 mt-8 items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-5">

              {/* Developer logo / fallback */}
              <div className="w-20 h-20 rounded-[1.8rem] bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                {developerLogo && isValidUrl(developerLogo) ? (
                  <Image
                    src={developerLogo}
                    alt={developerName || "Developer"}
                    width={80}
                    height={80}
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-[#0f0f0f] font-semibold text-xs text-center px-2">
                    {developerName || "Developer"}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-white text-2xl md:text-4xl font-light leading-tight">
                  {title}
                </h1>
                {locality && (
                  <p className="text-white/75 mt-2 text-xs md:text-base leading-6 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-[#ef4800] flex-shrink-0" />
                    {locality}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              {priceLabel && (
                <h2 className="text-white text-2xl md:text-3xl font-light leading-tight">
                  {priceLabel}
                </h2>
              )}
              <button className="mt-4 px-8 py-3.5 rounded-full bg-white text-[#0f0f0f] hover:bg-[#ef4800] hover:text-white transition text-xs tracking-[0.28em] font-medium">
                BOOK PROPERTY
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#ef4800] transition z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
            {activeIndex + 1} / {allMedia.length}
            {allMedia[activeIndex]?.type === "video" && (
              <span className="ml-2 text-[10px] bg-white/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                Video
              </span>
            )}
          </div>

          {/* Prev */}
          {allMedia.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#ef4800] transition z-10"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Main media */}
          <div className="flex items-center justify-center">
            <LightboxMedia key={activeIndex} item={allMedia[activeIndex]} />
          </div>

          {/* Next */}
          {allMedia.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-4 md:right-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#ef4800] transition z-10"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto max-w-[90%] px-4 pb-1">
            {allMedia.map((item, index) => (
              <button
                key={item.id ?? index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                  activeIndex === index
                    ? "border-[#ef4800]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.url}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.thumb || item.url}
                    alt={item.alt || `Media ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}