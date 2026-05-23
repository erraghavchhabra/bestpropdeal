"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
export default function ContactPage() {
  const [agree, setAgree] = useState(false);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 pt-34 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Contact Us
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl font-light">
            Let’s Connect.
            <span className="font-semibold"> We’re Here to Help.</span>
          </h1>

          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Have questions or want to discuss your property needs? Reach out to
            us.
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Phone */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <Phone className="text-[#ef4800] mb-4" />
            <p className="text-sm text-white/50">Call Us</p>
            <a
              href="tel:+917969669900"
              className="text-lg font-semibold mt-1 hover:text-[#ef4800] transition"
            >
              +91-7969669900
            </a>
          </div>

          {/* Email */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <Mail className="text-[#ef4800] mb-4" />
            <p className="text-sm text-white/50">Email</p>
            <a
              href="mailto:sales@bestpropdeal.com"
              className="text-lg font-semibold mt-1 hover:text-[#ef4800] transition"
            >
              sales@bestpropdeal.com
            </a>
          </div>

          {/* Address */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <MapPin className="text-[#ef4800] mb-4" />
            <p className="text-sm text-white/50">Office</p>
            <a
              href="https://www.google.com/maps?q=567Q+FV2+Gandhi+Chowk+Badlapur"
              target="_blank"
              className="text-sm mt-1 text-white/80 leading-relaxed hover:text-[#ef4800] transition"
            >
              567Q+FV2, Gandhi Chowk, Bestpropdeal Head Office,
              <br />
              Opp. PM Shri Digital School,
              <br />
              Patil Pada, Station Pada,
              <br />
              Badlapur, Maharashtra 421503
            </a>
          </div>
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* FORM */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="flex flex-col h-full">
              <div className="space-y-5 flex-1">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
                />

                {/* ✅ Phone Added */}
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
                />

                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
                />
              </div>

              {/* Terms */}
              <div className="mt-5 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="mt-1 accent-[#ef4800]"
                />

                <p className="text-sm text-white/60">
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-[#ef4800] hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#ef4800] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!agree}
                className={`mt-6 py-3 rounded-lg font-medium transition ${
                  agree
                    ? "bg-[#ef4800] hover:bg-[#d63f00]"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* MAP */}
          <div className="rounded-3xl overflow-hidden border border-white/10 h-full min-h-[500px]">
            <iframe
              src="https://maps.google.com/maps?q=567Q%2BFV2%20Gandhi%20Chowk%20Badlapur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ef4800]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ef4800]/10 rounded-full blur-3xl pointer-events-none" />
    </main>
  );
}
