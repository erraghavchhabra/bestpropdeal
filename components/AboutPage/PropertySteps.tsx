"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Discover Ideal Properties",
    text: "We begin by understanding your needs and presenting a curated list of properties that match your lifestyle and investment goals—whether it’s luxury living, eco-conscious design, or vacation retreats.",
    image: "/assets/img/step-1.avif",
  },
  {
    step: "02",
    title: "Schedule Private Tours",
    text: "Our team coordinates seamless property viewings, allowing you to explore each option in person or virtually, with expert guidance throughout the visit.",
    image: "/assets/img/step-2.avif",
  },
  {
    step: "03",
    title: "Personalized Consultation & Negotiation",
    text: "We help evaluate the property, provide insights on value and sustainability, and assist with tailored offers and negotiations to secure the best deal.",
    image: "/assets/img/step-3.avif",
  },
  {
    step: "04",
    title: "Legal & Documentation Support",
    text: "We simplify the legal process, ensuring all paperwork, contracts, and documentation are handled professionally and securely.",
    image: "/assets/img/step-4.avif",
  },
  {
    step: "05",
    title: "Close & Move In",
    text: "Once the deal is closed, we support your transition, whether it’s settling into your dream home, managing a rental, or preparing an investment property for returns.",
    image: "/assets/img/step-5.avif",
  },
];

export default function PropertySteps() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const section = sectionRef.current;

        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        const progress = Math.min(
          Math.max(-rect.top / (sectionHeight - viewportHeight), 0),
          1
        );

        const stepIndex = Math.min(
          steps.length - 1,
          Math.floor(progress * steps.length)
        );

        setActive(stepIndex);

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* DESKTOP */}
      <section
        ref={sectionRef}
        className="relative bg-[#111111] hidden lg:block"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden px-6">

          <div className="max-w-7xl mx-auto w-full">

            <div className="grid lg:grid-cols-[1fr_560px] gap-20 items-center">

              {/* LEFT CONTENT */}
              <div className="relative h-[420px] overflow-hidden">

                {steps.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      active === index
                        ? "opacity-100 translate-y-0"
                        : index < active
                        ? "opacity-0 -translate-y-24"
                        : "opacity-0 translate-y-24"
                    }`}
                  >

                    <div className="flex gap-8">

                      {/* NUMBER */}
                      <div className="shrink-0">
                        <h2 className="text-[120px] leading-none font-bold text-white/10">
                          {item.step}
                        </h2>
                      </div>

                      {/* CONTENT */}
                      <div className="pt-5 max-w-xl">

                        <p className="text-[#ef4800] uppercase tracking-[0.25em] text-sm">
                          Step / {item.step}
                        </p>

                        <h3 className="mt-5 text-5xl text-white font-semibold leading-tight">
                          {item.title}
                        </h3>

                        <p className="mt-7 text-white/65 leading-8 text-[15px]">
                          {item.text}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* RIGHT IMAGE */}
              <div className="relative">

                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 aspect-[4/3]">

                  {steps.map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        active === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-110"
                      }`}
                    />
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">

                    <div className="flex items-center justify-between">

                      <span className="text-[#ef4800] text-sm tracking-[0.25em] uppercase">
                        Step / {steps[active].step}
                      </span>

                      <div className="flex gap-2">
                        {steps.map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-500 ${
                              active === i
                                ? "w-10 bg-[#ef4800]"
                                : "w-2 bg-white/30"
                            }`}
                          />
                        ))}
                      </div>

                    </div>

                    <h3 className="mt-4 text-1xl text-white font-semibold">
                      {steps[active].title}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* MOBILE */}
      <section className="lg:hidden bg-[#111111] py-20 px-4">
        <div className="max-w-xl mx-auto space-y-10">

          {steps.map((item, index) => (
            <div
              key={index}
              className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03]"
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="bg-[#ef4800] text-white text-xs px-4 py-2 rounded-full tracking-[0.2em] uppercase">
                    Step / {item.step}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-2xl text-white font-semibold leading-tight">
                  {item.title}
                </h3>

                <p className="mt-4 text-white/65 leading-7 text-[15px]">
                  {item.text}
                </p>

              </div>

            </div>
          ))}

        </div>
      </section>
    </>
  );
}