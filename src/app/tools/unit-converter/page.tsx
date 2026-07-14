import type { Metadata } from "next";
import Link from "next/link";
import UnitConverter from "@/components/tools/UnitConverter";

export const metadata: Metadata = {
  title: "Unit Converter — Length, Weight, Temperature & More",
  description: "Convert between 60+ units across 7 categories: length, weight, area, volume, speed, temperature, and digital storage. Free and instant.",
};

export default function UnitConverterPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/tools">Tools</Link><span>/</span>
        <span className="text-slate-900 dark:text-white">Unit Converter</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">📏</span>
          <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">Unit Converter</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Instantly convert between hundreds of units across 7 categories. All conversions happen in your browser — fast, accurate, and private.
        </p>
      </div>
      <div className="tool-wrapper">
        <UnitConverter />
      </div>
      <div className="mt-12">
        <h2 className="text-display-sm text-slate-900 dark:text-white">Supported Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[["📏 Length","km, mi, m, ft, in, cm, mm, yd"],["⚖️ Weight","kg, lb, g, oz, t, st, mg"],["🌡️ Temperature","°C, °F, K"],["📐 Area","m², km², ft², ac, ha"],["🧪 Volume","L, mL, gal, pt, cup, fl oz"],["💨 Speed","km/h, mph, m/s, knot"],["💾 Digital","GB, MB, KB, TB, byte, bit"]].map(([cat, units]) => (
            <div key={cat} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="font-semibold text-slate-900 dark:text-white text-sm">{cat}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{units}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
