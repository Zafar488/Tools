"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { calculateBMI, calculateBMR, calculateIdealWeight } from "@/lib/health-formulas";

type Tab = "bmi" | "bmr" | "ideal";

export default function HealthCalculators() {
  const [tab, setTab] = useState<Tab>("bmi");

  // Shared inputs
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [age, setAge] = useState("25");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState("154");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("7");

  function getWeightKg(): number {
    if (unitSystem === "metric") return parseFloat(weight) || 0;
    return (parseFloat(weightLbs) || 0) * 0.453592;
  }

  function getHeightCm(): number {
    if (unitSystem === "metric") return parseFloat(height) || 0;
    const ft = parseFloat(heightFt) || 0;
    const inches = parseFloat(heightIn) || 0;
    return (ft * 12 + inches) * 2.54;
  }

  const weightKg = getWeightKg();
  const heightCm = getHeightCm();
  const ageNum = parseInt(age) || 0;

  const bmiResult = weightKg > 0 && heightCm > 0 ? calculateBMI(weightKg, heightCm) : null;
  const bmrResult = weightKg > 0 && heightCm > 0 && ageNum > 0 ? calculateBMR(weightKg, heightCm, ageNum, sex) : null;
  const idealResult = heightCm > 0 ? calculateIdealWeight(heightCm, sex) : null;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {([
          { id: "bmi" as Tab, label: "BMI Calculator", icon: "📊" },
          { id: "bmr" as Tab, label: "BMR & Calories", icon: "🔥" },
          { id: "ideal" as Tab, label: "Ideal Weight", icon: "⚖️" },
        ]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn("tab-button", tab === t.id && "tab-button-active")}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Unit System Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setUnitSystem("metric")}
          className={cn("px-4 py-1.5 text-sm font-medium rounded-lg transition-colors", unitSystem === "metric" ? "bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800")}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnitSystem("imperial")}
          className={cn("px-4 py-1.5 text-sm font-medium rounded-lg transition-colors", unitSystem === "imperial" ? "bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800")}
        >
          Imperial (lbs/ft)
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {unitSystem === "metric" ? (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-field" min="1" max="500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="input-field" min="50" max="300" />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Weight (lbs)</label>
              <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="input-field" min="1" max="1000" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Feet</label>
                <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="input-field" min="1" max="8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Inches</label>
                <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="input-field" min="0" max="11" />
              </div>
            </div>
          </>
        )}

        {tab === "bmr" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age (years)</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input-field" min="1" max="120" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sex</label>
          <select value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")} className="select-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* BMI Results */}
      {tab === "bmi" && bmiResult && (
        <div className="space-y-4">
          <div className="rounded-xl p-6 text-center" style={{ backgroundColor: bmiResult.color + "15" }}>
            <div className="text-4xl font-bold" style={{ color: bmiResult.color }}>{bmiResult.bmi}</div>
            <div className="text-lg font-semibold mt-1" style={{ color: bmiResult.color }}>{bmiResult.category}</div>
          </div>

          {/* BMI Scale */}
          <div className="space-y-2">
            <div className="flex rounded-full overflow-hidden h-3">
              <div className="bg-blue-400 flex-1" title="Underweight" />
              <div className="bg-green-400 flex-1" title="Normal" />
              <div className="bg-yellow-400 flex-1" title="Overweight" />
              <div className="bg-orange-400 flex-1" title="Obese I" />
              <div className="bg-red-400 flex-1" title="Obese II+" />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>16</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40+</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
            Healthy weight range for your height: <span className="font-semibold text-green-600 dark:text-green-400">{bmiResult.healthyRange.min} – {bmiResult.healthyRange.max} kg</span>
          </div>
        </div>
      )}

      {/* BMR & TDEE Results */}
      {tab === "bmr" && bmrResult && (
        <div className="space-y-4">
          <div className="rounded-xl bg-orange-50 p-6 text-center dark:bg-orange-950/30">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Basal Metabolic Rate (BMR)</div>
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">{bmrResult.bmr}</div>
            <div className="text-sm text-slate-500 mt-1">calories/day at complete rest</div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Daily Calorie Needs (TDEE) by Activity Level</h4>
            <div className="space-y-2">
              {Object.entries(bmrResult.tdee).map(([level, calories]) => (
                <div key={level} className="flex items-center justify-between rounded-xl border p-3 dark:border-slate-700">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{level}</span>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">{calories.toLocaleString()} cal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ideal Weight Results */}
      {tab === "ideal" && idealResult && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ideal Body Weight (4 Formulas)</h4>
          <div className="grid grid-cols-2 gap-4">
            {([
              { name: "Robinson", value: idealResult.robinson, year: "1983" },
              { name: "Miller", value: idealResult.miller, year: "1983" },
              { name: "Devine", value: idealResult.devine, year: "1974" },
              { name: "Hamwi", value: idealResult.hamwi, year: "1964" },
            ]).map((f) => (
              <div key={f.name} className="rounded-xl border p-4 text-center dark:border-slate-700">
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{f.value} kg</div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">{f.name}</div>
                <div className="text-xs text-slate-400">{f.year}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
            These are estimation formulas. Consult a healthcare professional for personalized guidance.
          </div>
        </div>
      )}
    </div>
  );
}
