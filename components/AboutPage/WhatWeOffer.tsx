"use client";

import {
  Landmark,
  Trees,
  BriefcaseBusiness,
} from "lucide-react";

const offerings = [
  {
    icon: Landmark,
    title: "Mixed-Use Development",
    text: "A seamless blend of residential, commercial, and lifestyle spaces designed to create vibrant, self-sustained communities.",
  },
  {
    icon: Trees,
    title: "Greenview Apartments",
    text: "Modern residences surrounded by greenery, offering comfort, convenience, and a refreshing environment for families.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Premium Office Tower",
    text: "State-of-the-art office spaces built for productivity, innovation, and a professional business ecosystem.",
  },
];

export default function WhatWeOffer() {
  return (
    <section className="bg-[#0f0f0f] py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/assets/img/offer.avif"
                alt="What We Offer"
                className="w-full h-[750px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
              What We Offer
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
              Smarter Way to
              <span className="font-semibold"> Buy Property</span>
            </h2>

            <p className="mt-6 text-white/70 leading-8 text-[15px]">
              A tech-enabled approach that connects you with verified listings,
              digital tools, and expert support all in one place.
            </p>

            {/* OFFERINGS */}
            <div className="mt-5 space-y-5">
              {offerings.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-[#ef4800]/40 hover:bg-white/[0.05] transition-all duration-300 flex gap-5"
                  >

                    {/* ICON */}
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ef4800]/10 flex items-center justify-center group-hover:bg-[#ef4800]/20 transition">
                      <Icon className="w-6 h-6 text-[#ef4800]" />
                    </div>

                    {/* CONTENT */}
                    <div>
                      <h3 className="text-white text-xl font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-white/65 text-sm leading-7">
                        {item.text}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}