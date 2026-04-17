"use client";

import {
  BarChart3,
  BadgeCheck,
  Smartphone,
  IndianRupee,
  Users,
  FileCheck,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Market Expertise",
    text: "Strong local market knowledge for accurate and confident decisions.",
  },
  {
    icon: BadgeCheck,
    title: "Expert Guidance",
    text: "Backed by years of real estate expertise to help you make the right choice.",
  },
  {
    icon: Smartphone,
    title: "Digital Convenience",
    text: "A tech-enabled platform for faster, transparent, and hassle-free transactions.",
  },
  {
    icon: IndianRupee,
    title: "Best Price Assurance",
    text: "Get the right property at the most competitive market value.",
  },
  {
    icon: Users,
    title: "Trusted by Buyers",
    text: "Over 1,200 happy clients who found their dream homes with us.",
  },
  {
    icon: FileCheck,
    title: "End-to-End Support",
    text: "From search to paperwork, we assist you at every step of the buying journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#1a1a1a] py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
          Why Choose Us
        </span>

        <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
          Turning Property Dreams
          <span className="font-semibold"> Into Reality</span>
        </h2>

        {/* GRID WRAPPER */}
        <div className="mt-12 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 hover:border-[#ef4800]/40 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ef4800]/10 flex items-center justify-center mb-4 group-hover:bg-[#ef4800]/20 transition">
                    <Icon className="w-5 h-5 text-[#ef4800]" />
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-white/65 text-sm leading-6">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/assets/img/why.jpg"
                alt="Why Choose Us"
                className="w-full h-[650px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
                <p className="text-[#ef4800] text-sm uppercase tracking-[0.2em] font-medium">
                  Trusted Performance
                </p>

                <h4 className="text-white text-2xl font-semibold mt-2">
                  1,200+ Happy Buyers
                </h4>

                <p className="text-white/70 text-sm mt-2 leading-6">
                  Delivering exceptional real estate experiences with trust,
                  transparency, and unmatched support.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}