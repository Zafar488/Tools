import type { ToolDefinition, CategoryDefinition } from "@/types";

export const SITE_NAME = "ToolsVerse";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolsverse.com";
export const SITE_DESCRIPTION =
  "Free online tools — convert units, generate QR codes, check passwords, calculate BMI, and more. Fast, private, no sign-up required.";

// ─── Categories ───
export const categories: CategoryDefinition[] = [
  {
    id: "converters",
    name: "Converters",
    description: "Convert units, currencies, and measurements instantly",
    icon: "🔄",
  },
  {
    id: "generators",
    name: "Generators",
    description: "Generate QR codes, passwords, and more",
    icon: "⚡",
  },
  {
    id: "calculators",
    name: "Calculators",
    description: "Calculate dates, health metrics, and numeric values",
    icon: "🧮",
  },
  {
    id: "media",
    name: "Media Tools",
    description: "Compress, resize, and convert images",
    icon: "🖼️",
  },
];

// ─── Tools ───
export const tools: ToolDefinition[] = [
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert between length, weight, area, volume, speed, temperature, and digital storage units.",
    longDescription:
      "Instantly convert between hundreds of units across 7 categories: length, weight, area, volume, speed, temperature, and digital storage. All conversions happen in your browser — fast, accurate, and private.",
    category: "converters",
    icon: "📏",
    keywords: [
      "unit converter",
      "length converter",
      "weight converter",
      "temperature converter",
      "km to miles",
      "kg to lbs",
      "celsius to fahrenheit",
    ],
    features: [
      "7 unit categories",
      "Real-time conversion",
      "Swap units instantly",
      "Client-side processing",
    ],
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "Convert currencies with live exchange rates. Supports 30+ world currencies.",
    longDescription:
      "Convert between 30+ world currencies using real-time exchange rates from the European Central Bank. Rates update hourly. Optional historical rate view.",
    category: "converters",
    icon: "💱",
    keywords: [
      "currency converter",
      "exchange rate",
      "USD to EUR",
      "money converter",
      "forex rates",
    ],
    features: [
      "Live exchange rates",
      "30+ currencies",
      "Hourly rate updates",
      "Swap currencies",
    ],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, email, phone, SMS, WiFi, and vCards. Download as PNG.",
    longDescription:
      "Create QR codes for any purpose — website links, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, and digital business cards (vCard). Download in PNG format.",
    category: "generators",
    icon: "📱",
    keywords: [
      "QR code generator",
      "create QR code",
      "QR code maker",
      "WiFi QR code",
      "vCard QR",
    ],
    features: [
      "7 QR code types",
      "Instant generation",
      "PNG download",
      "Client-side processing",
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, random passwords and check password strength with entropy analysis.",
    longDescription:
      "Generate cryptographically strong passwords with customizable length, character sets, and complexity. Built-in strength checker analyzes entropy and provides improvement suggestions.",
    category: "generators",
    icon: "🔐",
    keywords: [
      "password generator",
      "strong password",
      "random password",
      "password strength checker",
      "secure password",
    ],
    features: [
      "Customizable rules",
      "Strength analysis",
      "Entropy calculation",
      "One-click copy",
    ],
  },
  {
    slug: "age-date-calculator",
    name: "Age & Date Calculator",
    description: "Calculate exact age, days between dates, add or subtract days from any date.",
    longDescription:
      "Calculate your exact age in years, months, and days. Find the number of days between two dates. Add or subtract days, weeks, or months from any date. See your next birthday countdown.",
    category: "calculators",
    icon: "📅",
    keywords: [
      "age calculator",
      "date calculator",
      "days between dates",
      "how old am I",
      "date difference",
    ],
    features: [
      "Exact age calculation",
      "Days between dates",
      "Add/subtract days",
      "Birthday countdown",
    ],
  },
  {
    slug: "health-calculators",
    name: "Health Calculators",
    description: "Calculate BMI, BMR, daily calorie needs, and ideal body weight using proven formulas.",
    longDescription:
      "A suite of health calculators: Body Mass Index (BMI), Basal Metabolic Rate (BMR) using Mifflin-St Jeor, daily calorie needs (TDEE), and ideal body weight using 4 established formulas.",
    category: "calculators",
    icon: "❤️",
    keywords: [
      "BMI calculator",
      "BMR calculator",
      "calorie calculator",
      "ideal weight calculator",
      "TDEE calculator",
    ],
    features: [
      "BMI with categories",
      "BMR (Mifflin-St Jeor)",
      "TDEE by activity level",
      "4 ideal weight formulas",
    ],
  },
  {
    slug: "image-toolkit",
    name: "Image Toolkit",
    description: "Compress, resize, and convert images between JPG, PNG, and WebP — all in your browser.",
    longDescription:
      "Compress images to reduce file size, resize to exact dimensions, and convert between JPG, PNG, and WebP formats. All processing happens in your browser — your images never leave your device.",
    category: "media",
    icon: "🖼️",
    keywords: [
      "image compressor",
      "image resizer",
      "JPG to PNG",
      "PNG to WebP",
      "image converter",
      "compress image online",
    ],
    features: [
      "Compress images",
      "Resize with aspect ratio",
      "Format conversion",
      "100% browser-side",
    ],
  },
];

// ─── Helpers ───
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return tools.filter((t) => t.category === category);
}

export function getCategoryById(id: string): CategoryDefinition | undefined {
  return categories.find((c) => c.id === id);
}
