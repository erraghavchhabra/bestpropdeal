"use client";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-6 pt-34 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
            Legal
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl font-light">
            Privacy Policy
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-white/70 leading-relaxed">

          <p>
            At BestPropDeal, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, services, and digital platforms. By accessing or using our services, you agree to the terms of this Privacy Policy.
          </p>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Information We Collect
            </h2>

            <p>We may collect the following types of information:</p>

            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                Personal Information: Name, email address, phone number, address, and other details you provide when signing up, subscribing, or making inquiries.
              </li>
              <li>
                Property-Related Information: Preferences, search criteria, and property requirements you share with us.
              </li>
              <li>
                Transactional Information: Records of your communications, purchases, or service use.
              </li>
              <li>
                Technical Information: IP address, browser type, device details, and cookies to improve website functionality and user experience.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              How We Use Your Information
            </h2>

            <p>We use your information to:</p>

            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                Provide property listings, offers, and services tailored to your needs.
              </li>
              <li>
                Respond to inquiries, provide customer support, and improve services.
              </li>
              <li>
                Send newsletters, updates, promotional materials, and property alerts (with your consent).
              </li>
              <li>
                Process transactions, manage bookings, and maintain records.
              </li>
              <li>
                Improve our website, analytics, and overall customer experience.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Sharing of Information
            </h2>

            <p>We do not sell or rent your personal data. However, we may share information with:</p>

            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                Trusted Partners: Financial institutions, legal advisors, or developers, only to complete your property transaction.
              </li>
              <li>
                Service Providers: IT, hosting, or marketing agencies assisting us in operations.
              </li>
              <li>
                Legal Requirements: When required by law, regulation, or government authority.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Cookies and Tracking
            </h2>

            <p>
              Our website uses cookies and similar technologies to:
            </p>

            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>Enhance browsing experience.</li>
              <li>Track website usage for analytics.</li>
              <li>Deliver relevant ads and marketing.</li>
            </ul>

            <p className="mt-3">
              You can manage cookie preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Data Security
            </h2>

            <p>
              We use industry-standard measures to protect your personal data from unauthorized access, misuse, or disclosure. However, no system is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Your Rights
            </h2>

            <p>You have the right to:</p>

            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                Access, update, or delete your personal information.
              </li>
              <li>
                Opt-out of marketing emails by clicking the unsubscribe link.
              </li>
              <li>
                Contact us for any privacy-related concerns.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Third-Party Links
            </h2>

            <p>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.
            </p>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-3">
              Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.
            </p>
          </div>

        </div>
      </div>

      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ef4800]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ef4800]/10 rounded-full blur-3xl pointer-events-none" />
    </main>
  );
}