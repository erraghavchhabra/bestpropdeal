import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { API } from "@/lib/api"; // adjust path as needed

// ─── Force runtime rendering (no static export) ───────────────────────────────
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// ─── Types ───────────────────────────────────────────────────────────────────

type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

function getFeaturedImage(post: WPPost): string {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    "/assets/img/blog-placeholder.avif"
  );
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(`${API.blogs}?slug=${slug}&_embed`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data: WPPost[] = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

async function getOtherPosts(excludeSlug: string): Promise<WPPost[]> {
  try {
    const res = await fetch(`${API.blogs}?_embed&per_page=5`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data: WPPost[] = await res.json();
    return data.filter((p) => p.slug !== excludeSlug);
  } catch {
    return [];
  }
}

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API.blogs}?per_page=100`);
    if (!res.ok) return [];
    const posts: WPPost[] = await res.json();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const [blog, otherBlogs] = await Promise.all([
    getPostBySlug(slug),
    getOtherPosts(slug),
  ]);

  if (!blog) notFound();

  const title = stripHtml(blog.title.rendered);
  const excerpt = stripHtml(blog.excerpt.rendered);
  const image = getFeaturedImage(blog);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      <section className="pt-34 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#ef4800] font-semibold mb-10 hover:gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── LEFT CONTENT ── */}
            <div className="lg:col-span-2">

              {/* Date */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
                <CalendarDays className="w-4 h-4 text-[#ef4800]" />
                <span>{formatDate(blog.date)}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                {title}
              </h1>

              {/* Featured Image */}
              <div className="relative w-full h-[320px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl border border-white/10 mb-10">
                <Image
                  src={image}
                  alt={title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <article className="bg-[#111] rounded-3xl p-8 md:p-12 border border-white/10">

                {/* Excerpt / Description */}
                <p className="text-xl text-gray-300 leading-relaxed mb-8 border-l-4 border-[#ef4800] pl-5">
                  {excerpt}
                </p>

                {/* Full WP content — rendered as HTML */}
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-p:text-gray-400 prose-p:leading-relaxed
                    prose-headings:text-white prose-headings:font-bold
                    prose-a:text-[#ef4800] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-ul:text-gray-400 prose-ol:text-gray-400
                    prose-blockquote:border-l-[#ef4800] prose-blockquote:text-gray-300
                    prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
                  dangerouslySetInnerHTML={{ __html: blog.content.rendered }}
                />
              </article>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-[#111] rounded-3xl p-6 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Other Blogs
                  </h3>

                  <div className="w-14 h-[3px] bg-[#ef4800] mb-6 rounded-full" />

                  {otherBlogs.length === 0 ? (
                    <p className="text-gray-500 text-sm">No other posts yet.</p>
                  ) : (
                    <div className="space-y-6">
                      {otherBlogs.map((post, index) => {
                        const postTitle = stripHtml(post.title.rendered);
                        const postImage = getFeaturedImage(post);

                        return (
                          <Link
                            key={post.id}
                            href={`/blogs/${post.slug}`}
                            className="group block"
                          >
                            <div className="flex gap-4">

                              {/* Thumbnail */}
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10">
                                <Image
                                  src={postImage}
                                  alt={postTitle}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>

                              {/* Text */}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                                  <CalendarDays className="w-3 h-3 text-[#ef4800] flex-shrink-0" />
                                  {formatDate(post.date)}
                                </p>

                                <h4 className="text-sm font-semibold text-white leading-snug group-hover:text-[#ef4800] transition-colors duration-300 line-clamp-3">
                                  {postTitle}
                                </h4>

                                <span className="inline-flex items-center gap-1 text-[#ef4800] text-sm font-medium mt-2">
                                  Read
                                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                              </div>
                            </div>

                            {index !== otherBlogs.length - 1 && (
                              <div className="border-b border-white/10 mt-6" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ef4800]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ef4800]/10 rounded-full blur-3xl pointer-events-none" />
    </main>
  );
}