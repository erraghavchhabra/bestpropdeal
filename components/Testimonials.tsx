"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Play, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const textTestimonials = [
  {
    name: "Rahul Mehta",
    role: "Bought 3BHK in Andheri",
    quote:
      "BestPropDeal made the entire home buying process seamless. Transparent pricing and expert guidance throughout.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Priya Sharma",
    role: "Investor",
    quote:
      "Professional team with deep market knowledge. They helped me secure the right property at the right price.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Amit Verma",
    role: "First-Time Buyer",
    quote:
      "From shortlist to registration, everything was handled professionally. Highly recommended.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Sneha Kapoor",
    role: "Villa Buyer",
    quote:
      "Excellent service, transparent communication, and premium support at every stage.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    name: "Karan Patel",
    role: "Commercial Investor",
    quote:
      "Their investment advice was extremely valuable and helped me close a profitable deal.",
    image: "https://images.unsplash.com/photo-1502767089025-6572583495b0",
  },
  {
    name: "Neha Arora",
    role: "Apartment Buyer",
    quote:
      "Super smooth experience from property tours to documentation and possession.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
];

const videoTestimonials = [
  { video: "/assets/videos/testimonial-1.mp4" },
  { video: "/assets/videos/testimonial-2.mp4" },
  { video: "/assets/videos/testimonial-3.mp4" },
  { video: "/assets/videos/testimonial-4.mp4" },
  { video: "/assets/videos/testimonial-5.mp4" },
  { video: "/assets/videos/testimonial-6.mp4" },
];

export default function Testimonials() {
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

        {/* TEXT TESTIMONIAL SLIDER */}
        <div className="mb-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4500 }}
            loop
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {textTestimonials.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm h-[320px] flex flex-col justify-between">
                  
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-[#ef4800] text-[#ef4800]"
                        />
                      ))}
                    </div>

                    <p className="text-white/75 text-sm leading-7">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Bottom Info */}
                  <div className="pt-5 border-t border-white/10 mt-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">
                        {item.name}
                      </h4>
                      <p className="text-white/50 text-sm">{item.role}</p>
                    </div>

                    {/* ✅ Avatar (Bottom Right) */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* VIDEO TESTIMONIAL SLIDER */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000 }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {videoTestimonials.map((video, i) => (
            <SwiperSlide key={i}>
              <div className="relative group rounded-[2rem] overflow-hidden cursor-pointer h-[320px]">
                <video
                  src={video.video}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  autoPlay
                  muted
                  loop
                  playsInline
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

      </div>
    </section>
  );
}