"use client";

import { ArrowRight } from "lucide-react";

const blogs = [
  {
    title: "Top 5 Investment Hotspots in Mumbai for 2025",
    desc: "Discover the most promising real estate locations offering high ROI and rapid growth potential.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    date: "April 12, 2026",
  },
  {
    title: "Things to Check Before Buying Your First Home",
    desc: "A complete checklist every first-time buyer must follow before making a property decision.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    date: "March 28, 2026",
  },
  {
    title: "Luxury vs Affordable Housing: What Should You Choose?",
    desc: "Understand the key differences and make a smart choice based on your financial goals.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    date: "March 10, 2026",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-[#0f0f0f] py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Real Estate Insights
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl text-white font-light leading-tight">
            Explore the Market.
            <span className="font-semibold"> Learn from Experts.</span>
            <br />
            <span className="font-semibold">Make Smarter Moves.</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <div
              key={i}
              className="group rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between h-[240px]">
                <div>
                  <p className="text-white/40 text-xs mb-2">{blog.date}</p>

                  <h3 className="text-white text-lg font-semibold leading-snug mb-3 group-hover:text-[#ef4800] transition">
                    {blog.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-6">
                    {blog.desc}
                  </p>
                </div>

                {/* Read More */}
                <div className="mt-6 flex items-center gap-2 text-[#ef4800] text-sm font-medium cursor-pointer">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-[#ef4800] hover:border-[#ef4800] transition">
            View All Blogs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}