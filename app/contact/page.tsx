"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useThemeSettings } from "@/hooks/useThemeSettings";
import { API } from "@/lib/api";
export default function ContactPage() {
  const [agree, setAgree] = useState(false);
  const { settings } = useThemeSettings();
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const validateForm = () => {
  const newErrors: any = {};

  if (!form.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!form.phone.trim()) {
  newErrors.phone = "Phone number is required";
} else if (!/^[6-9]\d{9}$/.test(form.phone)) {
  newErrors.phone = "Enter a valid 10 digit mobile number";
}

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!form.subject.trim()) {
    newErrors.subject = "Subject is required";
  }

  if (!form.message.trim()) {
    newErrors.message = "Message is required";
  }

  console.log(newErrors); // <-- add this

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
   console.log("Form submitted");
   if (!validateForm()) {
    console.log("Validation failed");
    return;
  }
 if (!agree) {
  alert("Please accept Terms & Conditions");
  return;
}

  try {
    setLoading(true);

    const response = await fetch(API.contactForm, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (result.success) {
      alert("Message sent successfully");

      setForm({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      alert(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to send message");
  } finally {
    setLoading(false);
  }
};

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
  href={`tel:${settings?.phone_number}`}
  className="text-lg font-semibold mt-1 hover:text-[#ef4800] transition"
>
  {settings?.phone_number}
</a>
          </div>

          {/* Email */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <Mail className="text-[#ef4800] mb-4" />
            <p className="text-sm text-white/50">Email</p>
           <a
  href={`mailto:${settings?.email}`}
  className="text-lg font-semibold mt-1 hover:text-[#ef4800] transition"
>
  {settings?.email}
</a>
          </div>

          {/* Address */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <MapPin className="text-[#ef4800] mb-4" />
            <p className="text-sm text-white/50">Office</p>
          <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings?.address?.replace(/<br\s*\/?>/gi, " ") || ""
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm mt-1 text-white/80 leading-relaxed hover:text-[#ef4800] transition"
>
  <span
    dangerouslySetInnerHTML={{
      __html: settings?.address || "",
    }}
  />
</a>
          </div>
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* FORM */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

        <form className="flex flex-col h-full" onSubmit={handleSubmit}>
  <div className="space-y-5 flex-1">

    {/* Name */}
    <div>
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
          setErrors({ ...errors, name: "" });
        }}
        className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
      />

      {errors.name && (
        <p className="text-red-500 text-sm mt-1">
          {errors.name}
        </p>
      )}
    </div>

    {/* Phone */}
    <div>
      <input
        type="tel"
        placeholder="Your Phone Number"
        value={form.phone}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setForm({ ...form, phone: value });
          setErrors({ ...errors, phone: "" });
        }}
        maxLength={10}
        className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
      />

      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">
          {errors.phone}
        </p>
      )}
    </div>

    {/* Email */}
    <div>
      <input
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          setErrors({ ...errors, email: "" });
        }}
        className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
      />

      {errors.email && (
        <p className="text-red-500 text-sm mt-1">
          {errors.email}
        </p>
      )}
    </div>

    {/* Subject */}
    <div>
      <input
        type="text"
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => {
          setForm({ ...form, subject: e.target.value });
          setErrors({ ...errors, subject: "" });
        }}
        className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
      />

      {errors.subject && (
        <p className="text-red-500 text-sm mt-1">
          {errors.subject}
        </p>
      )}
    </div>

    {/* Message */}
    <div>
      <textarea
        rows={5}
        placeholder="Your Message"
        value={form.message}
        onChange={(e) => {
          setForm({ ...form, message: e.target.value });
          setErrors({ ...errors, message: "" });
        }}
        className="w-full p-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ef4800]"
      />

      {errors.message && (
        <p className="text-red-500 text-sm mt-1">
          {errors.message}
        </p>
      )}
    </div>

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

  {!agree && (
    <p className="text-red-500 text-sm mt-2">
      Please accept Terms & Conditions
    </p>
  )}

  <button
    type="submit"
    disabled={loading}
    className={`mt-6 py-3 rounded-lg font-medium transition ${
      loading
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-[#ef4800] hover:bg-[#d63f00]"
    }`}
  >
    {loading ? "Sending..." : "Send Message"}
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
