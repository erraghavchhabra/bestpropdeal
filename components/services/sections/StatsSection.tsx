export default function StatsSection({ data }: any) {

  return (
    <div className="grid sm:grid-cols-2 gap-5">

      {data.stats.map((item: any, i: number) => (

        <div
          key={i}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
        >
          <h3 className="text-white text-5xl font-semibold">
            {item.number}
          </h3>

          <p className="mt-3 text-white/70">
            {item.label}
          </p>
        </div>

      ))}

    </div>
  );
}