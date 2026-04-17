"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

import VideoCard from "./VideoCard";

const videos = [
  "/assets/videos/video1.mp4",
  "/assets/videos/video2.mp4",
  "/assets/videos/video3.mp4",
  "/assets/videos/video4.mp4",
  "/assets/videos/video1.mp4",
];

export default function VideoSlider() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  return (
    <>
      {/* MAIN SLIDER */}
      <section className="bg-[#0f0f0f] text-white py-16 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
         <div className="mb-10">
  <span className="text-[#ef4800] uppercase tracking-[0.25em] text-sm font-medium">
    Virtual Experience
  </span>

  <h2 className="mt-3 text-3xl md:text-5xl font-light tracking-tight leading-tight text-white">
    Explore Luxurious
    <span className="font-semibold"> Virtual Tours</span>
  </h2>
</div>
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
            className="video-swiper"
          >
            {videos.map((video, i) => (
              <SwiperSlide key={i}>
                <div
                  className="h-[380px] md:h-[420px] cursor-pointer"
                  onClick={() => openModal(i)}
                >
                  <VideoCard
                    id={`main-${i}`}
                    src={video}
                    playingId={playingId}
                    setPlayingId={setPlayingId}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center px-4">
          {/* Close */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#ef6f47] transition flex items-center justify-center"
          >
            <X className="text-white" size={22} />
          </button>

          <div className="w-full max-w-7xl">
            <Swiper
              modules={[Navigation]}
              navigation
              initialSlide={activeIndex}
              loop
              spaceBetween={20}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {videos.map((video, i) => (
                <SwiperSlide key={i}>
                  <div className="h-[280px] md:h-[420px] rounded-3xl overflow-hidden">
                    <VideoCard
                      id={`modal-${i}`}
                      src={video}
                      playingId={playingId}
                      setPlayingId={setPlayingId}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}