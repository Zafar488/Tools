"use client";

import { useState, useEffect, useMemo } from "react";
import { currencies, getCurrencyByCode } from "@/lib/currency-data";
import { formatNumber, copyToClipboard } from "@/lib/utils";

interface RatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCode, setFromCode] = useState("USD");
  const [toCode, setToCode] = useState("EUR");
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchRates(fromCode);
  }, [fromCode]);

  async function fetchRates(base: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${base}`
      );
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data: RatesResponse = await res.json();
      setRates(data);
    } catch {
      setError("Could not fetch exchange rates. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const result = useMemo(() => {
    if (!rates || !amount) return null;
    const num = parseFloat(amount);
    if (isNaN(num)) return null;
    if (fromCode === toCode) return num;
    const rate = rates.rates[toCode];
    if (!rate) return null;
    return num * rate;
  }, [amount, fromCode, toCode, rates]);

  const rate = rates?.rates[toCode] ?? null;

  function swapCurrencies() {
    setFromCode(toCode);
    setToCode(fromCode);
  }

  async function handleCopy() {
    if (result !== null) {
      await copyToClipboard(formatNumber(result, 4));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const fromCurrency = getCurrencyByCode(fromCode);
  const toCurrency = getCurrencyByCode(toCode);

  return (
    <div className="space-y-6">
      {/* Rate Info Bar */}
      {rates && rate !== null && (
        <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3 text-sm dark:bg-brand-950/30">
          <span className="text-slate-600 dark:text-slate-300">
            {fromCurrency?.flag} 1 {fromCode} ={" "}
            <span className="font-semibold text-brand-700 dark:text-brand-300">
              {formatNumber(rate, 4)} {toCode}
            </span>{" "}
            {toCurrency?.flag}
          </span>
          <span className="text-xs text-slate-400">
            Updated: {rates.date}
          </span>
        </div>
      )}

      {/* Converter Grid */}
      <div className="grid gap-4 sm:grid-cols-[1fr,auto,1fr] items-end">
        {/* From */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            From
          </label>
          <select
            value={fromCode}
            onChange={(e) => setFromCode(e.target.value)}
            className="select-field"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="input-field text-lg font-semibold"
            inputMode="decimal"
            min="0"
          />
        </div>

        {/* Swap */}
        <div className="flex justify-center py-2">
          <button
            onClick={swapCurrencies}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700"
            aria-label="Swap currencies"
          >
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            To
          </label>
          <select
            value={toCode}
            onChange={(e) => setToCode(e.target.value)}
            className="select-field"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
          <div className="relative">
            <div className="input-field text-lg font-semibold bg-slate-50 dark:bg-slate-900 min-h-[50px] flex items-center">
              {loading ? (
                <span className="text-slate-400 animate-pulse">Loading...</span>
              ) : error ? (
                <span className="text-red-500 text-sm">{error}</span>
              ) : result !== null ? (
                formatNumber(result, 4)
              ) : (
                "—"
              )}
            </div>
            {result !== null && !loading && (
              <button
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Popular Conversions */}
      {rates && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Popular rates from {fromCode}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {["USD", "EUR", "GBP", "JPY", "MYR", "PKR", "AUD", "CAD", "SGD", "AED"]
              .filter((code) => code !== fromCode && rates.rates[code])
              .slice(0, 5)
              .map((code) => {
                const info = getCurrencyByCode(code);
                return (
                  <button
                    key={code}
                    onClick={() => setToCode(code)}
                    className="rounded-xl border p-3 text-left hover:border-brand-300 transition-colors dark:border-slate-600 dark:hover:border-brand-500"
                  >
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {info?.flag} {code}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {formatNumber(rates.rates[code], 4)}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
