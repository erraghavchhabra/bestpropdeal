"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Panvelkar Greens",
    location: "Badlapur, Mumbai",
    image: "/assets/img/p1.avif",
  },
  {
    title: "Sky Heights",
    location: "Thane",
    image: "/assets/img/p2.avif",
  },
  {
    title: "Elite Towers",
    location: "Kalyan",
    image: "/assets/img/p3.avif",
  },
  {
    title: "Golden Residency",
    location: "Dombivli",
    image: "/assets/img/p4.avif",
  },
  {
    title: "Urban Nest",
    location: "Mumbai",
    image: "/assets/img/p5.jpg",
  },
];

export default function FeaturedProjects() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#161515] py-24 px-5 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-14">

          <div>
            <span className="inline-flex px-5 py-2 rounded-full bg-[#ef4800] text-white text-sm">
              Featured Projects
            </span>

            <h2 className="mt-8 text-4xl md:text-6xl text-white font-light leading-tight">
              Discover luxury living at an
              <span className="font-semibold block">
                affordable price
              </span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-4 border border-white/20 rounded-full px-7 py-4 text-white hover:bg-[#ef4800] hover:border-[#ef4800] duration-300 h-fit"
          >
            View All Properties

            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        {/* Accordion Gallery */}
        <div className="flex gap-4 overflow-x-auto lg:overflow-hidden">

          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`
                relative
                h-[500px]
                rounded-[32px]
                overflow-hidden
                cursor-pointer
                transition-all
                duration-700
                shrink-0

                ${
                  active === index
                    ? "w-[80vw] lg:flex-[5]"
                    : "w-[90px] sm:w-[110px] lg:flex-1"
                }
              `}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {active === index && (
                <div className="absolute bottom-8 left-8 transition-all duration-500">
                  <h3 className="text-white text-3xl md:text-4xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-white/70 mt-2">
                    {project.location}
                  </p>
                </div>
              )}
            </div>
          ))}

        </div>

      </div>

   
    </section>
  );
}