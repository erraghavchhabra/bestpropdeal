"use client";

import {
  Eye,
  Target,
  ShieldCheck,
  Lightbulb,
  Users,
  Handshake,
  Award,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Upholding honesty and transparency in all our dealings.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Leveraging the latest tools and strategies to stay ahead of the curve.",
  },
  {
    icon: Users,
    title: "Customer-Centric Approach",
    text: "Prioritizing the needs of our clients and partners.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    text: "Building lasting relationships through teamwork and mutual trust.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "Striving for perfection in every project we undertake.",
  },
];

export default function VisionMission() {
  return (
    <section className="bg-[#0f0f0f] py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* VISION */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-[#ef4800]/10 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-[#ef4800]" />
            </div>

            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6">
              Our Vision
            </h2>

            <p className="text-white/70 leading-8 text-[15px]">
              To be the leading real estate marketing and branding partner,
              empowering developers and channel partners to achieve their sales
              and branding goals efficiently and effectively. To revolutionize
              the real estate experience by providing transparent, reliable, and
              customer-focused solutions that empower individuals to make
              informed property decisions.
            </p>
          </div>

          {/* MISSION */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-[#ef4800]/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#ef4800]" />
            </div>

            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6">
              Our Mission
            </h2>

            <p className="text-white/70 leading-8 text-[15px]">
              To revolutionize the real estate landscape by providing
              cutting-edge marketing solutions, fostering trust, and delivering
              exceptional value to developers, channel partners, and clients
              alike
            </p>
          </div>

        </div>

        {/* CORE VALUES */}
        <div className="mt-16">
          <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Core Values
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
            Principles That
            <span className="font-semibold"> Define Us</span>
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, i) => {
              const Icon = value.icon;

              return (
                <div
                  key={i}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-[#ef4800]/40 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ef4800]/10 flex items-center justify-center mb-5 group-hover:bg-[#ef4800]/20 transition">
                    <Icon className="w-5 h-5 text-[#ef4800]" />
                  </div>

                  <h3 className="text-white text-xl font-semibold mb-3">
                    {value.title}
                  </h3>

                  <p className="text-white/65 text-sm leading-7">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}