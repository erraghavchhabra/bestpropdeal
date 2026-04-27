"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is this property RERA registered?",
    a: "Yes, all listed properties on our platform are RERA registered and fully compliant with local real estate regulations for transparency and security.",
  },
  {
    q: "What is the booking process for a property?",
    a: "You can book a property by paying a token amount after site visit and documentation. Our team assists you through the entire booking and agreement process.",
  },
  {
    q: "Are site visits available before booking?",
    a: "Yes, site visits are highly recommended and can be scheduled at your convenience with our property advisor.",
  },
  {
    q: "What payment options are available?",
    a: "We support flexible payment plans including construction-linked plans, down payment options, and bank-approved home loan assistance.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No hidden charges. All costs including GST, maintenance, and registration fees are clearly communicated upfront.",
  },
  {
    q: "Can I get home loan assistance?",
    a: "Yes, we provide complete assistance with home loan approval through leading banks and financial institutions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mt-16">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-white text-2xl md:text-3xl font-light">
         Frequently Asked Questions
        </h2>
        
      </div>

      {/* Container */}
      <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 md:p-10 space-y-4">

        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-white/[0.04] overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-white text-sm md:text-base">
                  {item.q}
                </span>

                <span className="text-orange-500">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-white/60 text-sm leading-6">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}