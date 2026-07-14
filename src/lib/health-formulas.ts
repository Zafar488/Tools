// ─── Named exports expected by HealthCalculators.tsx ───

export function calculateBMI(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  let category: string;
  let color: string;
  if (bmi < 18.5) { category = "Underweight"; color = "#3B82F6"; }
  else if (bmi < 25) { category = "Normal weight"; color = "#22C55E"; }
  else if (bmi < 30) { category = "Overweight"; color = "#EAB308"; }
  else { category = "Obese"; color = "#EF4444"; }
  const heightM2 = heightCm / 100;
  const min = parseFloat((18.5 * heightM2 * heightM2).toFixed(1));
  const max = parseFloat((24.9 * heightM2 * heightM2).toFixed(1));
  return { bmi, category, color, healthyRange: { min, max } };
}

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: "male" | "female"
) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = Math.round(sex === "male" ? base + 5 : base - 161);
  const multipliers: Record<string, number> = {
    Sedentary: 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Very Active": 1.725,
    "Extra Active": 1.9,
  };
  const tdee: Record<string, number> = {};
  for (const [level, m] of Object.entries(multipliers)) {
    tdee[level] = Math.round(bmr * m);
  }
  return { bmr, tdee };
}

export function calculateIdealWeight(heightCm: number, sex: "male" | "female") {
  const heightIn = heightCm / 2.54;
  const over = Math.max(0, heightIn - 60);
  const round = (n: number) => parseFloat(n.toFixed(1));
  return {
    devine: round(sex === "male" ? 50 + 2.3 * over : 45.5 + 2.3 * over),
    robinson: round(sex === "male" ? 52 + 1.9 * over : 49 + 1.7 * over),
    miller: round(sex === "male" ? 56.2 + 1.41 * over : 53.1 + 1.36 * over),
    hamwi: round(sex === "male" ? 48 + 2.7 * over : 45.4 + 2.3 * over),
  };
}

// ─── Internal helpers (kept for reference) ───

// BMI
export function calcBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-500" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
  return { label: "Obese", color: "text-red-500" };
}

// BMR — Mifflin-St Jeor
export function calcBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: "male" | "female"
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

// TDEE multipliers
export const activityLevels = [
  { id: "sedentary", label: "Sedentary (desk job, little exercise)", multiplier: 1.2 },
  { id: "light", label: "Lightly active (1–3 days/week exercise)", multiplier: 1.375 },
  { id: "moderate", label: "Moderately active (3–5 days/week)", multiplier: 1.55 },
  { id: "active", label: "Very active (6–7 days/week)", multiplier: 1.725 },
  { id: "extra", label: "Extra active (physical job + training)", multiplier: 1.9 },
] as const;

export function calcTDEE(bmr: number, multiplier: number): number {
  return bmr * multiplier;
}

// Ideal body weight — 4 formulas (returns kg)
export function calcIdealWeights(heightCm: number, sex: "male" | "female") {
  const heightIn = heightCm / 2.54;
  const inchesOver5ft = Math.max(0, heightIn - 60);

  return {
    devine: sex === "male"
      ? 50 + 2.3 * inchesOver5ft
      : 45.5 + 2.3 * inchesOver5ft,
    robinson: sex === "male"
      ? 52 + 1.9 * inchesOver5ft
      : 49 + 1.7 * inchesOver5ft,
    miller: sex === "male"
      ? 56.2 + 1.41 * inchesOver5ft
      : 53.1 + 1.36 * inchesOver5ft,
    hamwi: sex === "male"
      ? 48 + 2.7 * inchesOver5ft
      : 45.4 + 2.3 * inchesOver5ft,
  };
}
