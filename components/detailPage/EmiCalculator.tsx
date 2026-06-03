"use client";

import { useMemo, useState } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatINR(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

// ── Slider Row ────────────────────────────────────────────────────────────────

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;           // formatted display string shown next to label
  inputSuffix?: string;      // e.g. "%" or "Yrs"
  inputValue: string;        // raw string for the text input
  onInputChange: (raw: string) => void;
  onSliderChange: (n: number) => void;
  onInputBlur: () => void;
}

interface EmiCalculatorProps {
  defaultAmount?: number;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  inputSuffix = "",
  inputValue,
  onInputChange,
  onSliderChange,
  onInputBlur,
}: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      {/* Label + editable value */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-white/55 text-sm">{label}</span>

        <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-[#ef4800]/60 transition">
          <input
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onBlur={onInputBlur}
            className="
              w-24 bg-transparent text-white text-sm text-right
              focus:outline-none placeholder:text-white/30
            "
          />
          {inputSuffix && (
            <span className="text-white/40 text-sm">{inputSuffix}</span>
          )}
        </div>
      </div>

      {/* Slider */}
      <div className="relative h-1.5 rounded-full bg-white/10">
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-[#ef4800] to-[#ff6a00]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className="
            absolute inset-0 w-full opacity-0 cursor-pointer h-full
          "
        />
        {/* Thumb */}
        <div
          className="
            absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            w-4 h-4 rounded-full
            bg-white border-2 border-[#ef4800]
            shadow-[0_0_8px_rgba(239,72,0,0.5)]
            pointer-events-none
          "
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* Min / Max hints */}
      <div className="flex justify-between text-[10px] text-white/25">
        <span>
          {inputSuffix === "%"
            ? `${min}%`
            : inputSuffix === "Yrs"
              ? `${min} Yr`
              : formatINR(min)}
        </span>
        <span>
          {inputSuffix === "%"
            ? `${max}%`
            : inputSuffix === "Yrs"
              ? `${max} Yrs`
              : formatINR(max)}
        </span>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function EmiCalculator({ defaultAmount = 10_000_000 }: EmiCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [amountRaw, setAmountRaw] = useState(String(defaultAmount));

  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);
  const [rateRaw, setRateRaw] = useState("9");
  const [yearsRaw, setYearsRaw] = useState("20");

  // ── Sync helpers ────────────────────────────────────────────────────────────

  const clamp = (n: number, min: number, max: number) =>
    Math.min(max, Math.max(min, n));

  const commitAmount = () => {
    const n = clamp(Number(amountRaw.replace(/,/g, "")), 100_000, 50_000_000);
    if (!isNaN(n)) { setAmount(n); setAmountRaw(String(n)); }
    else setAmountRaw(String(amount));
  };

  const commitRate = () => {
    const n = clamp(parseFloat(rateRaw), 5, 15);
    if (!isNaN(n)) { setRate(n); setRateRaw(String(n)); }
    else setRateRaw(String(rate));
  };

  const commitYears = () => {
    const n = clamp(Math.round(Number(yearsRaw)), 1, 30);
    if (!isNaN(n)) { setYears(n); setYearsRaw(String(n)); }
    else setYearsRaw(String(years));
  };

  // ── EMI Calculation ─────────────────────────────────────────────────────────

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    if (!r) return { emi: 0, total: 0, interest: 0 };
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return {
      emi: Math.round(emi),
      total: Math.round(total),
      interest: Math.round(total - amount),
    };
  }, [amount, rate, years]);

  const principalPct = Math.round((amount / result.total) * 100) || 0;
  const interestPct = 100 - principalPct;

  return (
    <section>
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

          {/* LEFT — Inputs */}
          <div className="space-y-8">
            <SliderRow
              label="Loan Amount"
              value={amount}
              min={100_000}
              max={50_000_000}
              step={100_000}
              display={formatINR(amount)}
              inputValue={amountRaw}
              onInputChange={(v) => setAmountRaw(v)}
              onSliderChange={(n) => { setAmount(n); setAmountRaw(String(n)); }}
              onInputBlur={commitAmount}
            />

            <SliderRow
              label="Interest Rate"
              value={rate}
              min={5}
              max={15}
              step={0.1}
              display={`${rate}%`}
              inputSuffix="%"
              inputValue={rateRaw}
              onInputChange={(v) => setRateRaw(v)}
              onSliderChange={(n) => { setRate(n); setRateRaw(String(n)); }}
              onInputBlur={commitRate}
            />

            <SliderRow
              label="Loan Tenure"
              value={years}
              min={1}
              max={30}
              step={1}
              display={`${years} Yrs`}
              inputSuffix="Yrs"
              inputValue={yearsRaw}
              onInputChange={(v) => setYearsRaw(v)}
              onSliderChange={(n) => { setYears(n); setYearsRaw(String(n)); }}
              onInputBlur={commitYears}
            />
          </div>

          {/* RIGHT — Results */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 flex flex-col justify-between gap-6">

            {/* Monthly EMI */}
            <div>
              <p className="text-white/45 text-xs uppercase tracking-widest mb-1">
                Monthly EMI
              </p>
              <h3 className="text-white text-4xl font-light tracking-tight">
                {formatINR(result.emi)}
              </h3>
            </div>

            {/* Breakdown bar */}
            <div className="space-y-2">
              <div className="flex rounded-full overflow-hidden h-2">
                <div
                  className="bg-gradient-to-r from-[#ef4800] to-[#ff6a00] transition-all duration-500"
                  style={{ width: `${principalPct}%` }}
                />
                <div
                  className="bg-white/20 transition-all duration-500"
                  style={{ width: `${interestPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ef4800] inline-block" />
                  Principal {principalPct}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/30 inline-block" />
                  Interest {interestPct}%
                </span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-white/45 text-xs mb-1">Principal</p>
                <p className="text-white font-medium">{formatINR(amount)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-white/45 text-xs mb-1">Total Interest</p>
                <p className="text-white font-medium">{formatINR(result.interest)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl col-span-2">
                <p className="text-white/45 text-xs mb-1">Total Payment</p>
                <p className="text-white font-medium text-lg">{formatINR(result.total)}</p>
              </div>
            </div>

            <p className="text-white/30 text-xs leading-5">
              * Approximate calculation. Actual EMI may vary based on bank terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}