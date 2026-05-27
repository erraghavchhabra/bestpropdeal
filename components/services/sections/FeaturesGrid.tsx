export default function FeaturesGrid({ data }: any) {

  return (
    <div className="grid md:grid-cols-2 gap-5">

      {data.items.map((item: string, i: number) => (

        <div
          key={i}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white"
        >
          {item}
        </div>

      ))}

    </div>
  );
}