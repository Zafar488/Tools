import type { Metadata } from "next";
import Link from "next/link";
import AgeDateCalculator from "@/components/tools/AgeDateCalculator";

export const metadata: Metadata = {
  title: "Age & Date Calculator — Calculate Age & Days Between Dates",
  description: "Calculate your exact age, find days between dates, add or subtract days. Free age and date calculator tool.",
};

export default function AgeDateCalculatorPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/tools">Tools</Link><span>/</span>
        <span className="text-slate-900 dark:text-white">Age & Date Calculator</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">📅</span>
          <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">Age & Date Calculator</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Calculate your exact age in years, months, and days. Find days between dates. Add or subtract days from any date. See birthday countdowns.
        </p>
      </div>
      <div className="tool-wrapper">
        <AgeDateCalculator />
      </div>
    </div>
  );
}
