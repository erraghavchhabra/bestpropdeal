import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertySection from "@/components/propertySections"
import "swiper/css";
import { FaWhatsapp } from "react-icons/fa";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "BestProDeal",
  description: "BestProDeal Website",
  icons: {
    icon: "favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />

        {children}
<PropertySection />
        <Footer />

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/917969669900?text=Hi%2C%20I%27m%20interested%20in%20properties%20in%20Navi%20Mumbai.%20Can%20you%20help%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
         <FaWhatsapp className="w-7 h-7 text-white" />
        </a>
      </body>
    </html>
  );
}