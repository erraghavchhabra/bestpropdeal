"use client";

export default function FounderSection() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">

              <img
                src="/assets/img/founder.avif"
                alt="Sachin Patil"
                className="w-full aspect-[4/5] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* FLOAT CARD */}
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">

                <p className="text-[#ef4800] text-sm uppercase tracking-[0.25em]">
                  Founder and CEO
                </p>

                <h3 className="mt-3 text-3xl text-white font-semibold">
                  Sachin Patil
                </h3>

              </div>

            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>

            <span className="text-[#ef4800] uppercase tracking-[0.22em] text-sm font-medium">
              Meet Our Founder
            </span>

            <h2 className="mt-4 text-4xl md:text-6xl text-white font-light leading-tight">
              SACHIN PATIL
            </h2>

            <p className="mt-3 text-white/40 uppercase tracking-[0.25em] text-sm">
              B E S T P R O P D E A L F O U N D E R
            </p>

            <p className="mt-8 text-white/65 leading-8 text-[15px]">
              Mr. Sachin Patil, the founder of BestPropDeal, is an accomplished
              entrepreneur with a strong background in marketing and business
              strategy. Holding an MBA/MMS in Marketing, Mr. Patil embarked on
              his entrepreneurial journey with a vision to transform the real
              estate industry by offering reliable, transparent, and
              customer-centric services.
            </p>

            {/* SKILLS */}
            <div className="mt-12 space-y-8">

              {/* MARKETING */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white text-lg font-medium">
                    Marketing
                  </h4>

                  <span className="text-[#ef4800] font-semibold">
                    80%
                  </span>
                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[80%] bg-[#ef4800] rounded-full" />
                </div>
              </div>

              {/* PEOPLE */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white text-lg font-medium">
                    People
                  </h4>

                  <span className="text-[#ef4800] font-semibold">
                    92%
                  </span>
                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[92%] bg-[#ef4800] rounded-full" />
                </div>
              </div>

              {/* SALES */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white text-lg font-medium">
                    Sales
                  </h4>

                  <span className="text-[#ef4800] font-semibold">
                    87%
                  </span>
                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[87%] bg-[#ef4800] rounded-full" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}