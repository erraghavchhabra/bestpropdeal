"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

export default function DeveloperFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="">
        <div className="max-w-7xl mx-auto py-20">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
          FAQs
        </span>

        <h2 className="mt-4 text-white text-2xl md:text-3xl font-light">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Container */}
      <div className=" backdrop-blur-md space-y-4">

        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-white/[0.04] overflow-hidden transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full flex items-center justify-between px-5 py-5 text-left"
              >
                <span className="text-white text-sm md:text-base font-medium">
                  {item.q}
                </span>

                <span className="text-[#ef4800]">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-5 text-white/60 text-sm leading-7">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}