import Hero from "@/components/Hero";
import VideoSlider from "@/components/VideoSlider";
import PropertySlider from "@/components/PropertySlider";
import AssuredPropertiesSlider from "@/components/AssuredPropertiesSlider";
import { Property } from "@/components/PropertyCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import BlogSection from "@/components/Blogs";
import LogoSlider from "@/components/LogoSlider";
import { API } from "@/lib/api";
import type { Metadata } from "next";

function mapProperty(item: any): Property {
  return {
    id:          item.id,
    slug:        item.slug,
    title:       item.title       ?? "",
    location:    item.locality    ?? "",
    price:       item.price_label ?? "",
    type:        item.bhk         ?? "",
    image:       item.thumbnail   ?? "",
    whatsapp:    "919999999999",
    phone:       "919999999999",
    possession:  item.possession  ?? "",
    rera:        item.rera        ?? "",
    status:      item.status      ?? "",
    bhk_configs: item.bhk_configs ?? [],
  };
}

async function getHomePageMeta() {
  try {
    const res = await fetch(API.homePage, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getFastSellingProperties(): Promise<Property[]> {
  try {
    const res = await fetch(API.fastSelling, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []).map(mapProperty);
  } catch (error) {
    console.error("Failed to fetch fast-selling properties:", error);
    return [];
  }
}

async function getAssuredProperties(): Promise<Property[]> {
  try {
    const res = await fetch(API.assured, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []).map(mapProperty);
  } catch (error) {
    console.error("Failed to fetch assured properties:", error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePageMeta();

  return {
    title:       page?.acf?.meta_title       ?? page?.title ?? "Property Deal",
    description: page?.acf?.meta_description ?? "",
  };
}

export default async function Home() {
  const [fastSellingProperties, assuredProperties] = await Promise.all([
    getFastSellingProperties(),
    getAssuredProperties(),
  ]);

  return (
    <>
      <Hero />
      <VideoSlider />
      <AssuredPropertiesSlider properties={assuredProperties} />
      <PropertySlider properties={fastSellingProperties} />
      <WhyChooseUs />
      <Testimonials />
      <LogoSlider />
      <CallToAction />
      <BlogSection />
    </>
  );
}