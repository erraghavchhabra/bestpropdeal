"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { API } from "@/lib/api";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] animate-pulse">
      <div className="h-[220px] bg-white/10" />
      <div className="p-6 h-[240px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-2 bg-white/10 rounded w-24" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-4/5" />
          <div className="h-3 bg-white/10 rounded w-full mt-2" />
          <div className="h-3 bg-white/10 rounded w-5/6" />
        </div>
        <div className="h-3 bg-white/10 rounded w-20" />
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/&hellip;/g, "…").trim();
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogSection() {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // _embed pulls wp:featuredmedia so we get the image in one request
        const res = await fetch(`${API.blogs}?per_page=3&_embed`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const mapped = json.map((post) => ({
          id:      post.id,
          slug:    post.slug,
          title:   post.title?.rendered ?? "",
          excerpt: stripHtml(post.excerpt?.rendered ?? ""),
          date:    formatDate(post.date),
          link:    post.link,
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url ||
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url ||
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            null,
        }));

        setBlogs(mapped);
      } catch (err) {
        console.error("Blog fetch error:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

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

        {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : blogs.map((blog) => (
                <a
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm block"
                >
                  {/* Image */}
                  <div className="relative h-[220px] overflow-hidden bg-white/5">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    ) : (
                      // Fallback if no featured image set
                      <div className="w-full h-full flex items-center justify-center bg-white/[0.03]">
                        <span className="text-white/20 text-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between h-[240px]">
                    <div>
                      <p className="text-white/40 text-xs mb-2">{blog.date}</p>

                      <h3
                        className="text-white text-lg font-semibold leading-snug mb-3 group-hover:text-[#ef4800] transition"
                        dangerouslySetInnerHTML={{ __html: blog.title }}
                      />

                      <p className="text-white/70 text-sm leading-6 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-[#ef4800] text-sm font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <a
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-[#ef4800] hover:border-[#ef4800] transition"
          >
            View All Blogs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}