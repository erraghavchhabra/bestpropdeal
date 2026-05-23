"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What makes BestPropDeal different from other real estate platforms?",
    a: "BestPropDeal is India’s first digital-first home buying platform offering verified listings, expert guidance, and complete end-to-end support—from property search to ownership.",
  },
  {
    q: "Are all the properties listed verified?",
    a: "Yes, every property on our platform goes through a strict verification process to ensure authenticity and reliability.",
  },
  {
    q: "Do you provide assistance with home loans and financing?",
    a: "Absolutely. We connect buyers with trusted financial partners to help secure the best loan options.",
  },
  {
    q: "Can BestPropDeal help with property documentation?",
    a: "Yes, we handle all paperwork and legal formalities to make the buying process smooth and stress-free.",
  },
  {
    q: "Is there any service charge for buyers?",
    a: "Our platform is designed to provide transparent pricing. Service charges, if applicable, will always be clearly communicated upfront.",
  },
  {
    q: "Do you only operate in Badlapur or across India?",
    a: "While our base is in Badlapur, we provide services across major cities in India and are continuously expanding.",
  },
  {
    q: "How do I schedule a property visit?",
    a: "You can request a visit directly through our platform or by contacting our team—we’ll arrange everything for your convenience.",
  },
  {
    q: "Can BestPropDeal assist with selling my property as well?",
    a: "Yes, in addition to helping buyers, we also assist sellers in listing and promoting their properties to the right audience.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            FAQs
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl font-light">
            Frequently Asked
            <span className="font-semibold"> Questions</span>
          </h1>

          <p className="text-white/60 mt-4">
            Everything you need to know about BestPropDeal and our services.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-white/10 rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-base md:text-lg font-medium">
                    {faq.q}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-[#ef4800] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`px-5 transition-all duration-300 ${
                    isOpen ? "pb-5 max-h-[300px]" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-white/70 text-sm leading-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ef4800]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ef4800]/10 rounded-full blur-3xl pointer-events-none" />
    </main>
  );
}