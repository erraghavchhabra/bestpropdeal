"use client";

export default function PropertyRera() {
  return (
    <section className="bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl text-white font-light">
           Rera QR Codes
          </h2>
        </div>
        <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-10 overflow-hidden">
          {/* Heading */}
          <div className="max-w-5xl">
            <p className="text-white font-light leading-snug">
              Mahindra Rainforest is a real estate project registered under
              MahaRERA (Maharashtra Real Estate Regulatory Authority), ensuring
              transparency and accountability in its development.
            </p>

            <p className="mt-5 text-white/65 text-sm md:text-base leading-7">
              Scan this RERA QR code to find out more or search ID here -
              <a
                href="https://maharera.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ef4800] hover:underline ml-1 break-all"
              >
                https://maharera.maharashtra.gov.in
              </a>
            </p>
          </div>

          {/* QR Codes */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20">
            {/* QR Item 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-[1.5rem] border border-white/10 bg-white p-2 shadow-lg">
                <img
                  src="/assets/img/qr1.webp"
                  alt="PM1181012502957"
                  className="w-32 h-32 object-contain"
                />
              </div>

              <a
                href="https://maharera.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 text-[#ef4800] text-sm md:text-base hover:underline"
              >
                PM1181012502957
              </a>
            </div>

            {/* QR Item 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="rounded-[1.5rem] border border-white/10 bg-white p-2 shadow-lg">
                <img
                  src="/assets/img/qr1.webp"
                  alt="PR1181012502956"
                  className="w-32 h-32 object-contain"
                />
              </div>

              <a
                href="https://maharera.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 text-[#ef4800] text-sm md:text-base hover:underline"
              >
                PR1181012502956
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
