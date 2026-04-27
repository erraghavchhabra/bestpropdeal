"use client";

import { ArrowRight, PhoneCall, ShieldCheck, BadgeCheck } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-[#0f0f0f] px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] items-center">
            
            {/* LEFT CONTENT */}
            <div className="p-8 md:p-14">
              <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
                Start Your Property Journey
              </span>

              <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
                Ready to Find Your
                <span className="font-semibold"> Dream Property?</span>
              </h2>

              <p className="text-white/65 text-base md:text-lg mt-6 leading-8 max-w-2xl">
                Book a personalized consultation with our experts and discover
                verified properties that match your lifestyle, location, and
                investment goals.
              </p>

              {/* Trust Points */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {[
                  {
                    icon: ShieldCheck,
                    text: "Verified Listings",
                  },
                  {
                    icon: BadgeCheck,
                    text: "Expert Guidance",
                  },
                  {
                    icon: PhoneCall,
                    text: "Priority Support",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-white/80 text-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#ef4800]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#ef4800]" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-3 bg-[#ef4800] hover:bg-[#d63f00] text-white px-8 py-4 rounded-full font-medium transition-all duration-300">
                  Book a Site Visit
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button className="inline-flex items-center gap-3 border border-white/15 text-white hover:border-[#ef4800] hover:text-[#ef4800] px-8 py-4 rounded-full font-medium transition-all duration-300">
                  Explore Projects
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL PANEL */}
            <div className="h-full min-h-[320px] bg-gradient-to-br from-[#ef4800]/15 via-transparent to-white/5 border-l border-white/10 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-semibold text-white">
                  500+
                </div>
                <p className="text-white/60 mt-3 text-sm md:text-base">
                  Verified Properties Across
                  <br />
                  Mumbai • Thane • Navi Mumbai
                </p>

                <div className="mt-8 inline-flex px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#ef4800] text-sm">
                  Trusted by 10,000+ Buyers
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}