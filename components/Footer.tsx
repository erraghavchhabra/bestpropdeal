"use client";
import { Phone, Mail, MapPin, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-12 pb-14 border-b border-white/10">

          {/* BRAND */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/img/logo.png"
                alt="BestPropDeal"
                width={120}
                height={30}
                className="h-auto"
              />
            </Link>

            <div className="space-y-4 text-white/65 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#ef4800] mt-1 flex-shrink-0" />
                <p>+91-7969669900</p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#ef4800] mt-1 flex-shrink-0" />
                <p>sales@bestpropdeal.com</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ef4800] mt-1 flex-shrink-0" />
                <p className="max-w-xs leading-7">
                  567Q+FV2 Gandhi Chowk, Bestpropdeal Head offfice, opp. Pm shri Digital School, Patil Pada, Station Pada, Badlapur, Maharashtra 421503
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
  {[
    {
      Icon: FaInstagram,
      hover: "hover:bg-gradient-to-tr hover:from-pink-500 hover:via-red-500 hover:to-yellow-500",
    },
    {
      Icon: FaFacebookF,
      hover: "hover:bg-[#1877F2]",
    },
    {
      Icon: FaYoutube,
      hover: "hover:bg-[#FF0000]",
    },
    {
      Icon: FaWhatsapp,
      hover: "hover:bg-[#25D366]",
    },
  ].map((social, i) => (
    <a
      key={i}
      href="#"
      className={`w-10 h-10 rounded-full bg-white text-black hover:text-white flex items-center justify-center transition duration-300 ${social.hover}`}
    >
      <social.Icon className="w-4 h-4" />
    </a>
  ))}
</div>
<div className="pt-8 text-white/50 text-xs space-y-2">
  <p className="text-[#ef4800]">
    Rera ID : <span className="text-white/70">A51700007696</span>
  </p>
</div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-lg font-medium mb-6">Navigation</h4>

            <div className="space-y-3 text-white/65 text-sm">
              {[
                "Home",
                "Who We Are",
                "Awards",
                "Developers",
                "Video Gallery",
                "Blogs",
                "Contact us",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block hover:text-[#ef4800] transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* OVERVIEW */}
          <div>
            <h4 className="text-lg font-medium mb-6">Overview</h4>

            <div className="space-y-3 text-white/65 text-sm mb-6">
              {[
                "Auction Properties",
                "Real Estate",
                "Finance",
                "Interior & Home Solutions",
                "Lifestyle & Cultural Services",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block hover:text-[#ef4800] transition"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="space-y-3 text-white/65 text-sm">
              <Link href="#" className="block hover:text-[#ef4800] transition">
                Terms and Conditions
              </Link>
              <Link href="#" className="block hover:text-[#ef4800] transition">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* ✅ CALLBACK FORM (REPLACED NEWSLETTER) */}
          <div>
            <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-[#ef4800]" />
              Get Callback in 30 mins
            </h4>

            <p className="text-white/65 text-sm leading-7 mb-6">
              Looking for the right property? Enter your number and our expert
              will call you back within 30 minutes.
            </p>

            <label className="block text-xs mb-2 text-white/80">
              Phone Number <span className="text-[#ef4800]">*</span>
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#ef4800] transition"
            />

            <button className="w-full mt-5 bg-[#ef4800] hover:bg-[#d63f00] text-white rounded-full py-3.5 text-sm font-medium transition flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Get a Free Callback
            </button>

            {/* Trust microcopy */}
            <p className="text-white/40 text-xs mt-3">
              🔒 Your number is safe. No spam calls.
            </p>
          </div>

        </div>

        <div className="pt-8 text-white/50 text-xs">
          ©{new Date().getFullYear()} by BestpropDeal
        </div>
      </div>
    </footer>
  );
}