"use client";

import { useMemo, useState } from "react";

export default function EmiCalculator() {
  const [amount, setAmount] = useState(10000000); // 1 Cr default
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);

  // EMI Formula:
  // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const result = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    if (!monthlyRate) return { emi: 0, total: 0, interest: 0 };

    const emi =
      (amount *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const total = emi * months;
    const interest = total - amount;

    return {
      emi: Math.round(emi),
      total: Math.round(total),
      interest: Math.round(interest),
    };
  }, [amount, rate, years]);

  return (
    <section className="mt-16">
         {/* Header */}
        <div className="mb-8">
          <h2 className="text-white text-2xl md:text-3xl font-light">
            EMI Calculator
          </h2>
          <p className="text-white/50 text-sm mt-2">
            Estimate your monthly home loan EMI instantly
          </p>
        </div>
      <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 md:p-10">

       

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT - INPUTS */}
          <div className="space-y-6">

            {/* Loan Amount */}
            <div>
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Loan Amount</span>
                <span>₹{amount.toLocaleString()}</span>
              </div>

              <input
                type="range"
                min={100000}
                max={50000000}
                step={100000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Interest Rate</span>
                <span>{rate}%</span>
              </div>

              <input
                type="range"
                min={5}
                max={15}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            {/* Tenure */}
            <div>
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Tenure</span>
                <span>{years} Years</span>
              </div>

              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>

          {/* RIGHT - RESULTS */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-6">

            <div>
              <p className="text-white/50 text-sm">Monthly EMI</p>
              <h3 className="text-white text-3xl font-light mt-1">
                ₹{result.emi.toLocaleString()}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-white/50">Total Interest</p>
                <p className="text-white mt-1">
                  ₹{result.interest.toLocaleString()}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-white/50">Total Payment</p>
                <p className="text-white mt-1">
                  ₹{result.total.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-white/40 text-xs leading-5">
              *This is an approximate calculation. Actual EMI may vary based on bank terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}