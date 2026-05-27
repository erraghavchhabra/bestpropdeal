export default function HeroSection({ data }: any) {
  return (
    <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03]">
      {/* IMAGE */}
      <div className="relative h-[280px] md:h-[420px] overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* QUOTE CARD */}
        {data.quote && (
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 max-w-[320px]">
            <div className="rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
              {/* SMALL LABEL */}
              <span className="text-[#ef4800] text-[11px] uppercase tracking-[0.22em] font-medium">
                BestPropDeal
              </span>

              {/* QUOTE */}
              <p className="mt-3 text-white/90 text-sm md:text-[15px] leading-6 font-light">
                {data.quote}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-8 lg:p-10">
        <h1 className="text-white text-3xl md:text-5xl font-light leading-tight">
          {data.title}
        </h1>

        <p className="mt-1 text-white/70 leading-6 text-[15px] max-w-4xl whitespace-pre-line">
          {data.description}
        </p>
      </div>
    </div>
  );
}
