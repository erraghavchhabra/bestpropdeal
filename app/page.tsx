import Hero from "@/components/Hero";
import VideoSlider from "@/components/VideoSlider";
import PropertySlider from "@/components/PropertySlider";
import AssuredPropertiesSlider from "@/components/AssuredPropertiesSlider";
import { Property } from "@/components/PropertyCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

const featuredProperties: Property[] = [
  {
    id: 1,
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
      <CallToAction />
    </>
  );
}
