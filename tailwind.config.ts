import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(239 246 255)",
          100: "rgb(219 234 254)",
          200: "rgb(191 219 254)",
          300: "rgb(147 197 253)",
          400: "rgb(96 165 250)",
          500: "rgb(59 130 246)",
          600: "rgb(37 99 235)",
          700: "rgb(29 78 216)",
          800: "rgb(30 64 175)",
          900: "rgb(30 58 138)",
          950: "rgb(23 37 84)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /^(bg|text|border)-(brand|slate|red|green|yellow|blue)-/ },
    { pattern: /^(hover|dark|focus):(bg|text|border)-(brand|slate)-/ },
  ],
};
export default config;
