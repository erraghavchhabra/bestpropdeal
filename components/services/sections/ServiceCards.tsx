export default function ServiceCards({ data }: any) {

  return (
    <div className="space-y-10">

      <h2 className="text-white text-4xl font-light">
        {data.title}
      </h2>

      {data.services.map((service: any, i: number) => (

        <div
          key={i}
          className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] p-8 lg:p-10"
        >

          {/* TOP CONTENT */}
          <div>

            <h3 className="text-white text-3xl md:text-3xl font-medium leading-tight">
              {service.title}
            </h3>

            <p className="mt-5 text-white/70 leading-8 whitespace-pre-line">
              {service.description}
            </p>

          </div>

          {/* IMAGE + LIST */}
          <div className="grid lg:grid-cols-2 gap-8 mt-10 items-start">

            {/* IMAGE */}
            <div className="overflow-hidden rounded-[2rem] border border-white/10">

              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[350px] object-cover"
              />

            </div>

            {/* OFFERINGS */}
            <div className="p-1">

              <h4 className="text-white text-2xl font-medium">
                What We Offer
              </h4>

              <div className="mt-8 space-y-5">

                {service.offerings.map(
                  (offer: string, idx: number) => (

                    <div
                      key={idx}
                      className="flex items-start gap-4"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ef4800] mt-2 shrink-0" />

                      <p className="text-white/80 leading-7">
                        {offer}
                      </p>
                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}