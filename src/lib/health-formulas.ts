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
