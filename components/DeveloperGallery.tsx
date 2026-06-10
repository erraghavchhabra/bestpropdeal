"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function DeveloperGallery({
  images,
}: {
  images: string[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <section className="bg-[#0f0f0f] py-24">
        <div className="max-w-7xl mx-auto px-5">

          <h2 className="text-white text-5xl mb-12">
            Gallery
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative h-[300px] rounded-[30px] overflow-hidden cursor-pointer"
                onClick={() => setActive(index)}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover hover:scale-110 duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center">

          <button
            className="absolute top-8 right-8 text-white"
            onClick={() => setActive(null)}
          >
            <X size={40} />
          </button>

          <button
            className="absolute left-5 text-white"
            onClick={() =>
              setActive((active - 1 + images.length) % images.length)
            }
          >
            <ChevronLeft size={50} />
          </button>

          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={images[active]}
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <button
            className="absolute right-5 text-white"
            onClick={() =>
              setActive((active + 1) % images.length)
            }
          >
            <ChevronRight size={50} />
          </button>

        </div>
      )}
    </>
  );
}