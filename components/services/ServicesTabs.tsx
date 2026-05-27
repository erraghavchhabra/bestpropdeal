"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import {
  Building2,
  Landmark,
  Sofa,
  Globe2,
  Mail,
  PhoneCall,
} from "lucide-react";

import { services } from "./servicesData";

import SectionRenderer from "./SectionRenderer";

const serviceIcons: any = {
  "real-estate-core": Building2,
  finance: Landmark,
  interiors: Sofa,
  lifestyle: Globe2,
};

export default function ServicesTabs() {

  const searchParams = useSearchParams();

  const active =
    searchParams.get("service") ||
    "real-estate-core";

  const current =
    services.find((item) => item.id === active);

  return (
    <section className="bg-[#1a1a1a] pt-28 pb-20 px-4">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">

        {/* LEFT SIDEBAR */}
        <div className="space-y-5 lg:sticky lg:top-24 h-fit">

          {/* HEADING */}
          <div>

            <span className="text-[#ef4800] uppercase tracking-[0.18em] text-[11px] font-medium">
              What We Offer
            </span>

            <h2 className="mt-2 text-2xl md:text-3xl text-white font-light leading-tight">
              Our
              <span className="font-semibold"> Services</span>
            </h2>

          </div>

          {/* SERVICE TABS */}
          <div className="space-y-3">

            {services.map((service) => {

              const Icon =
                serviceIcons[service.id];

              return (

                <Link
                  key={service.id}
                  href={`/services?service=${service.id}`}
                  className={`group flex items-center gap-3 rounded-2xl border p-2 transition-all duration-300
                
                  ${
                    active === service.id
                      ? "bg-[#ef4800] border-[#ef4800]"
                      : "bg-white/[0.03] border-white/10 hover:border-[#ef4800]/40"
                  }
                  `}
                >

                  {/* ICON */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                    
                    ${
                      active === service.id
                        ? "bg-white/15"
                        : "bg-[#ef4800]/10"
                    }
                    `}
                  >

                    <Icon
                      className={`w-5 h-5
                    
                      ${
                        active === service.id
                          ? "text-white"
                          : "text-[#ef4800]"
                      }
                      `}
                    />

                  </div>

                  {/* TEXT */}
                  <h3 className="text-white text-sm md:text-[15px] font-medium leading-snug">
                    {service.tabTitle}
                  </h3>

                </Link>

              );
            })}

          </div>

          {/* CONTACT CARD */}
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">


            <h3 className="mt-2 text-white text-xl font-medium leading-snug">
              Still Have a Question?
            </h3>

            <p className="mt-3 text-white/60 leading-6 text-sm">
              Our team is always here to help you.
            </p>

            {/* EMAIL */}
            <div className="mt-6 flex items-start gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#ef4800]/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#ef4800]" />
              </div>

              <div>
                <p className="text-white/40 text-xs">
                  Email
                </p>

                <a
                  href="mailto:sales@bestpropdeal.com"
                  className="text-white text-sm hover:text-[#ef4800] transition"
                >
                  sales@bestpropdeal.com
                </a>
              </div>

            </div>

            {/* PHONE */}
            <div className="mt-5 flex items-start gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#ef4800]/10 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4 text-[#ef4800]" />
              </div>

              <div>
                <p className="text-white/40 text-xs">
                  Phone
                </p>

                <a
                  href="tel:+917969669900"
                  className="text-white text-sm hover:text-[#ef4800] transition"
                >
                  +91-7969669900
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-8">

          {current?.sections.map((section, index) => (

            <SectionRenderer
              key={index}
              section={section}
            />

          ))}

        </div>

      </div>

    </section>
  );
}