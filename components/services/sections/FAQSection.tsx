export default function FAQSection({ data }: any) {

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">

      <h2 className="text-white text-4xl font-light">
        {data.title}
      </h2>

      <div className="mt-10 space-y-6">

        {data.faqs.map((faq: any, i: number) => (

          <div
            key={i}
            className="border-b border-white/10 pb-6"
          >
            <h3 className="text-white text-xl font-medium">
              {faq.question}
            </h3>

            <p className="mt-3 text-white/70 leading-7">
              {faq.answer}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}