"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const teamMembers = [
  {
    id: 1,
    name: "Sachin Patil",
    designation: "Founder & CEO",
    image: "/assets/img/founder.avif",
  },
  {
    id: 2,
    name: "Preeti Tanpure",
    designation: "Source Head",
    image: "/assets/img/preeti.avif",
  },
  {
    id: 3,
    name: "Jayesh Patil",
    designation: "Closing Manager",
    image: "/assets/img/jayesh.avif",
  },
  {
    id: 4,
    name: "Alpesh Kadam",
    designation: "Closing Manager",
    image: "/assets/img/alpesh1.avif",
  },
  {
    id: 5,
    name: "Mohan Salunke",
    designation: "\u00A0",
    image: "/assets/img/mohan.avif",
  },
  {
    id: 6,
    name: "Sheetal Padekar",
    designation: "\u00A0",
    image: "/assets/img/sheetal.avif",
  },
];

export default function TeamSlider() {
  return (
    <section className="py-20 px-4 md:px-6 bg-[#111111] overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">
          <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Our Team
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
            Meet Our Expert
            <span className="font-semibold"> Team Members</span>
          </h2>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={5}
          loop={true}
          speed={900}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >

          {teamMembers.map((member) => (
            <SwiperSlide key={member.id}>

              <div className="group rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#ef4800]/40 transition-all duration-500">

                {/* IMAGE */}
                <div className="relative aspect-2.5/3 overflow-hidden">

                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="p-5 text-center">

                  <h3 className="text-white text-xl font-semibold">
                    {member.name}
                  </h3>

                  <span className="mt-2 text-[#ef4800] text-[11px] tracking-[0.18em] uppercase">
                    {member.designation}
                  </span>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      </div>

    </section>
  );
}