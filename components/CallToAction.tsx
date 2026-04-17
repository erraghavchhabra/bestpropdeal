"use client";

import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-[#1a1a1a] px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#f47a2a] to-[#d94a00] px-6 md:px-12 py-14 md:py-20 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">

          {/* Glow Effects */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/10 blur-3xl rounded-full" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight">
              Ready to Find Your Dream Property?
            </h2>

            <p className="text-white/90 text-base md:text-xl mt-5 leading-8">
              Schedule a personalized site visit with our property experts and
              explore verified listings tailored to your needs.
            </p>

            <div className="mt-10">
              <button className="inline-flex items-center gap-3 bg-white text-[#ef4800] hover:bg-[#f7f7f7] px-8 md:px-10 py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:scale-105">
                Book a Site Visit
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}