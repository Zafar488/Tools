import type { Metadata } from "next";
import Link from "next/link";
import HealthCalculators from "@/components/tools/HealthCalculators";

export const metadata: Metadata = {
  title: "Health Calculators — BMI, BMR, TDEE & Ideal Weight",
  description: "Calculate BMI, BMR, daily calorie needs (TDEE), and ideal body weight using proven medical formulas. Free health calculator.",
};

export default function HealthCalculatorsPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/tools">Tools</Link><span>/</span>
        <span className="text-slate-900 dark:text-white">Health Calculators</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">❤️</span>
          <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">Health Calculators</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Calculate BMI, Basal Metabolic Rate (BMR), daily calorie needs (TDEE), and ideal body weight using clinically proven formulas.
        </p>
      </div>
      <div className="tool-wrapper">
        <HealthCalculators />
      </div>
      <div className="mt-12">
        <h2 className="text-display-sm text-slate-900 dark:text-white">Disclaimer</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm leading-relaxed">
          These calculators provide estimates based on established formulas for informational purposes only. Results are not medical advice. Consult a healthcare professional for personalized guidance.
        </p>
      </div>
    </div>
  );
}
