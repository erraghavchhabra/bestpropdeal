"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Projects",
    dropdown: [
      { name: "Completed Projects", href: "/projects/completed" },
      { name: "Ongoing Projects", href: "/projects/ongoing" },
      { name: "Upcoming Project", href: "/projects/upcoming" },
    ],
  },
  { name: "Locations", href: "/locations" },
  {
    name: "Services",
    dropdown: [
      { name: "Real Estate Core", href: "/services/real-estate-core" },
      { name: "Finance", href: "/services/finance" },
      { name: "Interiors & Home Solutions", href: "/services/interiors" },
      { name: "Lifestyle & Cultural Services", href: "/services/lifestyle" },
    ],
  },
  { name: "Blog / Insights", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/img/logo.png"
            alt="Logo"
            width={120}
            height={30}
            priority
            className={`h-auto transition-all duration-300 ${
              isScrolled ? "w-[95px]" : "w-[120px]"
            }`}
          />
        </Link>

        {/* DESKTOP NAV + CALL */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button className="flex items-center gap-1 text-white font-medium hover:text-[#f07020] transition">
                    {link.name}
                    <ChevronDown size={16} />
                  </button>

                  <div className="absolute top-full left-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-5 py-3 text-sm text-gray-800 hover:bg-[#ef4800] hover:text-white transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white font-medium hover:text-[#f07020] transition"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* 📞 Call Button */}
          <a
            href="tel:+917969669900"
            className="flex items-center gap-2 bg-[#ef4800] hover:bg-[#b90002] text-white px-5 py-2 rounded-full font-medium transition shadow-lg hover:shadow-xl"
          >
            <Phone size={16} />
            Call Us
          </a>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Quick Call */}
          <a href="tel:+917969669900" className="text-white">
            <Phone size={24} />
          </a>

          {/* Menu Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl px-6 py-5 space-y-4">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.name ? null : link.name
                    )
                  }
                  className="w-full flex items-center justify-between text-white font-medium"
                >
                  {link.name}
                  {openDropdown === link.name ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === link.name
                      ? "max-h-96 mt-3"
                      : "max-h-0"
                  }`}
                >
                  <div className="pl-4 space-y-3">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          setMobileOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="block text-sm text-gray-300 hover:text-[#f07020]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white font-medium hover:text-[#f07020]"
              >
                {link.name}
              </Link>
            )
          )}

          {/* 📞 Mobile Call Button */}
          <a
            href="tel:+917969669900"
            className="mt-4 flex items-center justify-center gap-2 bg-[#ef4800] hover:bg-[#b90002] text-white px-5 py-3 rounded-full font-medium transition"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}