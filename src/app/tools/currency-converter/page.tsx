import type { Metadata } from "next";
import Link from "next/link";
import CurrencyConverter from "@/components/tools/CurrencyConverter";

export const metadata: Metadata = {
  title: "Currency Converter — Live Exchange Rates",
  description: "Convert between 30+ currencies with live exchange rates from the European Central Bank. Free, fast, and accurate.",
  keywords: ["currency converter", "exchange rate", "USD to EUR", "money converter", "live rates"],
};

export default function CurrencyConverterPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/tools">Tools</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white">Currency Converter</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">💱</span>
          <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">Currency Converter</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Convert between 30+ world currencies using live exchange rates powered by the European Central Bank. Rates update hourly.
        </p>
      </div>

      {/* Tool */}
      <div className="tool-wrapper">
        <CurrencyConverter />
      </div>

      {/* SEO Content */}
      <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-display-sm text-slate-900 dark:text-white">About This Currency Converter</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          Our currency converter uses real-time exchange rates from the Frankfurter API, which is backed by the European Central Bank (ECB). 
          Rates are refreshed hourly, ensuring you always get accurate and up-to-date conversion values for all major world currencies.
        </p>
        <h2 className="text-display-sm text-slate-900 dark:text-white mt-8">How to Use</h2>
        <ol className="text-slate-600 dark:text-slate-400 mt-3 space-y-2 list-decimal list-inside">
          <li>Select your source currency from the &quot;From&quot; dropdown</li>
          <li>Enter the amount you want to convert</li>
          <li>Select your target currency in the &quot;To&quot; dropdown</li>
          <li>The conversion result appears instantly below</li>
          <li>Click the swap button (⇄) to reverse the conversion</li>
        </ol>
      </div>
    </div>
  );
}
