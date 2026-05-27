"use client";

import { Building2, Users, Award, FileCheck } from "lucide-react";

const stats = [
  {
    icon: Building2,
    number: "50+",
    label: "Projects Completed",
  },
  {
    icon: Users,
    number: "1,200+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    number: "10+",
    label: "Years of Experience",
  },
  {
    icon: FileCheck,
    number: "2,500+",
    label: "Title Clear Property",
  },
];

export default function WhoWeAre() {
  return (
    <section className="bg-[#1a1a1a] pt-34 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
 
          <div>
            <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
              Your Trusted Partner in
              <span className="font-semibold"> Property Buying</span>
            </h2>

            <div className="mt-8 space-y-6">
              <p className="text-white/70 leading-8 text-[15px]">
                At BestPropDeal, we believe that buying a home should be one of
                life’s happiest milestones—not a stressful process filled with
                confusion and delays. That’s why we built India’s first
                end-to-end digital home buying platform, designed to bring
                simplicity, transparency, and trust into real estate.
              </p>

              <p className="text-white/70 leading-8 text-[15px]">
                We are a team of passionate professionals with years of
                experience in property solutions, legal assistance, and customer
                service. Our mission is to empower homebuyers by offering
                verified property listings, honest pricing, and expert guidance
                at every stage of the journey. From browsing and shortlisting
                properties to handling paperwork, financing, and final
                ownership, we ensure that our clients experience a smooth and
                hassle-free process.
              </p>
            </div>

            {/* STATS */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {stats.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 hover:border-[#ef4800]/40 hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-4"
                  >
                    {/* ICON */}
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ef4800]/10 flex items-center justify-center group-hover:bg-[#ef4800]/20 transition">
                      <Icon className="w-6 h-6 text-[#ef4800]" />
                    </div>

                    {/* CONTENT */}
                    <div>
                      <h3 className="text-white text-3xl font-semibold leading-none">
                        {item.number}
                      </h3>

                      <p className="text-white/65 text-sm mt-2">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/assets/img/freecompress-Property.avif"
                alt="Who We Are"
                className="w-full h-[760px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
                <p className="text-[#ef4800] text-sm uppercase tracking-[0.2em] font-medium">
                  Your Trusted Partner
                </p>

                <h4 className="text-white text-2xl font-semibold mt-2">
                  Simplifying Home Buying
                </h4>

                <p className="text-white/70 text-sm mt-2 leading-6">
                  Designed to bring simplicity, transparency, and trust into
                  real estate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
