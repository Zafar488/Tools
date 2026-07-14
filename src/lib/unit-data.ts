export interface UnitEntry {
  id: string;
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

export interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  units: UnitEntry[];
}

export const unitCategories: UnitCategory[] = [
  {
    id: "length",
    name: "Length",
    icon: "📏",
    units: [
      { id: "mm", name: "Millimeter", symbol: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "cm", name: "Centimeter", symbol: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: "m", name: "Meter", symbol: "m", toBase: (v) => v, fromBase: (v) => v },
      { id: "km", name: "Kilometer", symbol: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "in", name: "Inch", symbol: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: "ft", name: "Foot", symbol: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "yd", name: "Yard", symbol: "yd", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: "mi", name: "Mile", symbol: "mi", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: "nmi", name: "Nautical Mile", symbol: "nmi", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    ],
  },
  {
    id: "weight",
    name: "Weight",
    icon: "⚖️",
    units: [
      { id: "mg", name: "Milligram", symbol: "mg", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      { id: "g", name: "Gram", symbol: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "kg", name: "Kilogram", symbol: "kg", toBase: (v) => v, fromBase: (v) => v },
      { id: "t", name: "Metric Ton", symbol: "t", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "oz", name: "Ounce", symbol: "oz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { id: "lb", name: "Pound", symbol: "lb", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: "st", name: "Stone", symbol: "st", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "🌡️",
    units: [
      { id: "c", name: "Celsius", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
      { id: "f", name: "Fahrenheit", symbol: "°F", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      { id: "k", name: "Kelvin", symbol: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    id: "area",
    name: "Area",
    icon: "📐",
    units: [
      { id: "mm2", name: "Square Millimeter", symbol: "mm²", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      { id: "cm2", name: "Square Centimeter", symbol: "cm²", toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
      { id: "m2", name: "Square Meter", symbol: "m²", toBase: (v) => v, fromBase: (v) => v },
      { id: "km2", name: "Square Kilometer", symbol: "km²", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: "ha", name: "Hectare", symbol: "ha", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      { id: "ac", name: "Acre", symbol: "ac", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { id: "ft2", name: "Square Foot", symbol: "ft²", toBase: (v) => v * 0.0929, fromBase: (v) => v / 0.0929 },
      { id: "mi2", name: "Square Mile", symbol: "mi²", toBase: (v) => v * 2.59e6, fromBase: (v) => v / 2.59e6 },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    icon: "🧪",
    units: [
      { id: "ml", name: "Milliliter", symbol: "mL", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "l", name: "Liter", symbol: "L", toBase: (v) => v, fromBase: (v) => v },
      { id: "m3", name: "Cubic Meter", symbol: "m³", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "tsp", name: "Teaspoon", symbol: "tsp", toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
      { id: "tbsp", name: "Tablespoon", symbol: "tbsp", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
      { id: "floz", name: "Fluid Ounce", symbol: "fl oz", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
      { id: "cup", name: "Cup", symbol: "cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      { id: "pt", name: "Pint", symbol: "pt", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      { id: "gal", name: "Gallon", symbol: "gal", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    ],
  },
  {
    id: "speed",
    name: "Speed",
    icon: "💨",
    units: [
      { id: "mps", name: "Meters per Second", symbol: "m/s", toBase: (v) => v, fromBase: (v) => v },
      { id: "kph", name: "Kilometers per Hour", symbol: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: "mph", name: "Miles per Hour", symbol: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: "knot", name: "Knot", symbol: "kn", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { id: "fps", name: "Feet per Second", symbol: "ft/s", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    ],
  },
  {
    id: "digital",
    name: "Digital Storage",
    icon: "💾",
    units: [
      { id: "bit", name: "Bit", symbol: "bit", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { id: "byte", name: "Byte", symbol: "B", toBase: (v) => v, fromBase: (v) => v },
      { id: "kb", name: "Kilobyte", symbol: "KB", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: "mb", name: "Megabyte", symbol: "MB", toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
      { id: "gb", name: "Gigabyte", symbol: "GB", toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
      { id: "tb", name: "Terabyte", symbol: "TB", toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
      { id: "pb", name: "Petabyte", symbol: "PB", toBase: (v) => v * 1024 ** 5, fromBase: (v) => v / 1024 ** 5 },
    ],
  },
];
