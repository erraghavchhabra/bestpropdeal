"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { API } from "@/lib/api"; // adjust path as needed

type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        taxonomy: string;
      }>
    >;
  };
};

type Props = {
  showViewAll?: boolean;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function getCategoryFromPost(post: WPPost): string {
  const terms = post._embedded?.["wp:term"];
  if (!terms) return "General";
  const categories = terms.flat().filter((t) => t.taxonomy === "category");
  const nonDefault = categories.find((c) => c.name !== "Uncategorized");
  return nonDefault?.name ?? categories[0]?.name ?? "General";
}

function getFeaturedImage(post: WPPost): string {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    "/assets/img/blog-placeholder.avif"
  );
}

export default function BlogCards({ showViewAll = true }: Props) {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        // _embed pulls in featured media and terms in one request
        const res = await fetch(`${API.blogs}?_embed&per_page=12`);
        if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
        const data: WPPost[] = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const categories = [
    "All",
    ...new Set(posts.map((p) => getCategoryFromPost(p))),
  ];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => getCategoryFromPost(p) === activeCategory);

  return (
    <section className="bg-[#0f0f0f] py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
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

        {/* Category Filters */}
        {!loading && !error && (
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  activeCategory === cat
                    ? "bg-[#ef4800] text-white border-[#ef4800]"
                    : "text-white/70 border-white/20 hover:border-[#ef4800] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] animate-pulse"
              >
                <div className="h-[220px] bg-white/10" />
                <div className="p-6 h-[240px] flex flex-col gap-3">
                  <div className="h-3 w-24 bg-white/10 rounded" />
                  <div className="h-5 w-full bg-white/10 rounded" />
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 text-white/50">
            <p className="text-lg mb-2">Failed to load blogs</p>
            <p className="text-sm text-white/30">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-20 text-white/50">
            <p>No posts found in this category.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const category = getCategoryFromPost(post);
              const image = getFeaturedImage(post);
              const excerpt = stripHtml(post.excerpt.rendered);
              const title = stripHtml(post.title.rendered);

              return (
                <Link key={post.id} href={`/blogs/${post.slug}`}>
                  <article className="group rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm cursor-pointer hover:shadow-xl transition">

                    {/* Image */}
                    <div className="relative h-[220px] overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20" />

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 bg-[#ef4800] text-white text-xs px-3 py-1 rounded-full">
                        {category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between h-[240px]">
                      <div>
                        <p className="text-white/40 text-xs mb-2">
                          {formatDate(post.date)}
                        </p>

                        <h3 className="text-white text-lg font-semibold mb-3 group-hover:text-[#ef4800] transition line-clamp-2">
                          {title}
                        </h3>

                        <p className="text-white/70 text-sm line-clamp-2">
                          {excerpt}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-[#ef4800] text-sm font-medium">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* View All */}
        {showViewAll && !loading && !error && (
          <div className="mt-12 flex justify-center">
            <Link href="/blogs">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-[#ef4800] hover:border-[#ef4800] transition">
                Explore More
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}

      </div>

      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ef4800]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ef4800]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}