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

const featuredProperties: Property[] = [
  {
    id: 1,
    slug: "panvelkar-greens",
    title: "Panvelkar Greens",
    location: "Joveli, Badlapur East, Thane, Maharashtra",
    price: "₹1.08 Cr - 2.34 Cr",
    type: "1, 2 BHK",
    image: "/assets/img/p1.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 2,
    slug: "panvelkar-utsav",
    title: "Panvelkar Utsav",
    location: "Valivali Gaon, Badlapur West, Maharashtra",
    price: "₹8.25 Cr - 11.55 Cr",
    type: "3, 4 BHK",
    image: "/assets/img/p2.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 3,
    slug: "dreamland-dreams-enclave",
    title: "Dreamland Dreams Enclave",
    location: "Belavali, Badlapur West, Thane",
    price: "₹1.54 Cr - 1.75 Cr",
    type: "2 BHK",
    image: "/assets/img/p3.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 4,
    slug: "panvelkar-greens-2",
    title: "Panvelkar Greens",
    location: "Joveli, Badlapur East, Thane, Maharashtra",
    price: "₹1.08 Cr - 2.34 Cr",
    type: "1, 2 BHK",
    image: "/assets/img/p1.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 5,
    slug: "panvelkar-utsav-2",
    title: "Panvelkar Utsav",
    location: "Valivali Gaon, Badlapur West, Maharashtra",
    price: "₹8.25 Cr - 11.55 Cr",
    type: "3, 4 BHK",
    image: "/assets/img/p2.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 6,
    slug: "dreamland-dreams-enclave-2",
    title: "Dreamland Dreams Enclave",
    location: "Belavali, Badlapur West, Thane",
    price: "₹1.54 Cr - 1.75 Cr",
    type: "2 BHK",
    image: "/assets/img/p3.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
];

const assuredProperties: Property[] = [
  {
    id: 101,
    slug: "assured-panvelkar-greens",
    title: "Panvelkar Greens",
    location: "Joveli, Badlapur East, Thane, Maharashtra",
    price: "₹1.08 Cr - 2.34 Cr",
    type: "1, 2 BHK",
    image: "/assets/img/p1.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 102,
    slug: "assured-panvelkar-utsav",
    title: "Panvelkar Utsav",
    location: "Valivali Gaon, Badlapur West, Maharashtra",
    price: "₹8.25 Cr - 11.55 Cr",
    type: "3, 4 BHK",
    image: "/assets/img/p2.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 103,
    slug: "assured-dreamland-dreams-enclave",
    title: "Dreamland Dreams Enclave",
    location: "Belavali, Badlapur West, Thane",
    price: "₹1.54 Cr - 1.75 Cr",
    type: "2 BHK",
    image: "/assets/img/p3.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 104,
    slug: "assured-panvelkar-greens-2",
    title: "Panvelkar Greens",
    location: "Joveli, Badlapur East, Thane, Maharashtra",
    price: "₹1.08 Cr - 2.34 Cr",
    type: "1, 2 BHK",
    image: "/assets/img/p1.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 105,
    slug: "assured-panvelkar-utsav-2",
    title: "Panvelkar Utsav",
    location: "Valivali Gaon, Badlapur West, Maharashtra",
    price: "₹8.25 Cr - 11.55 Cr",
    type: "3, 4 BHK",
    image: "/assets/img/p2.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
  {
    id: 106,
    slug: "assured-dreamland-dreams-enclave-2",
    title: "Dreamland Dreams Enclave",
    location: "Belavali, Badlapur West, Thane",
    price: "₹1.54 Cr - 1.75 Cr",
    type: "2 BHK",
    image: "/assets/img/p3.avif",
    whatsapp: "919999999999",
    phone: "919999999999",
  },
];
export default function Home() {
  return (
    <>
      <Hero />
      <VideoSlider />
      <AssuredPropertiesSlider properties={assuredProperties} />
      <PropertySlider properties={featuredProperties} />
      <WhyChooseUs />
      <Testimonials />
      <LogoSlider />
      <CallToAction />
      <BlogSection />
    </>
  );
}
