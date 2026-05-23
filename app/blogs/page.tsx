import BlogCards from "@/components/BlogCards";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] pt-24">
      <BlogCards showViewAll={false} />
    </main>
  );
}