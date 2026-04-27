"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

export default function PropertyPriceFloorPlan() {
  const plans = {
    "1 RK": {
      area: "320 sq.ft",
      price: "₹75.20 L",
      image: "/assets/img/1bhk.png",
    },
    "2 BHK": {
      area: "590 sq.ft",
      price: "₹1.39 Cr",
      image: "/assets/img/2bhk.png",
    },
  };

  const [activePlan, setActivePlan] = useState<"1 RK" | "2 BHK">("1 RK");

  return (
    <section className="mt-14">
      
      {/* Heading */}
      <div className="mb-7">
        <h2 className="mt-3 text-2xl md:text-3xl text-white font-light">
           Price & Floor Plan
        </h2>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 md:p-7">
      
      
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-7">
          {Object.keys(plans).map((plan) => (
            <button
              key={plan}
              onClick={() => setActivePlan(plan as "1 RK" | "2 BHK")}
              className={`px-6 py-3 rounded-full text-sm tracking-[0.18em] font-medium transition ${
                activePlan === plan
                  ? "bg-[#2a2220] text-white border border-[#ef4800]/30"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {plan}
            </button>
          ))}
        </div>

        {/* Area */}
        <div className="mb-4">
          <p className="text-[#ef4800] text-lg font-light">
            {plans[activePlan].area}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-5">
          {/* Price Table */}
          <div className="grid grid-cols-2 max-w-sm mb-8">
            <div className="border-r border-white/10 pr-6">
              <p className="text-white/45 text-sm mb-2">Name</p>
              <h3 className="text-white text-xl font-light">{activePlan}</h3>
            </div>

            <div className="pl-6">
              <p className="text-white/45 text-sm mb-2">Price Range</p>
              <h3 className="text-white text-xl font-light">
                {plans[activePlan].price}
              </h3>
            </div>
          </div>

          {/* Floor Plan Image */}
          <div className="relative rounded-[1.8rem] overflow-hidden border border-white/10 bg-black/20 group">
            <div className="relative w-full h-[300px] md:h-[600px]">
              <Image
                src={plans[activePlan].image}
                alt={`${activePlan} Floor Plan`}
                fill
                className="object-contain p-4 md:p-8 group-hover:scale-105 transition duration-700"
              />
            </div>

         
          </div>
        </div>
      </div>
    </section>
  );
}