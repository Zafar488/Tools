export interface CurrencyInfo {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}

export const currencies: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", symbol: "NZ$" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", symbol: "₩" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", symbol: "$" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", symbol: "R" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", symbol: "₽" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", symbol: "₺" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", symbol: "﷼" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", symbol: "Rp" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭", symbol: "₱" },
  { code: "PLN", name: "Polish Złoty", flag: "🇵🇱", symbol: "zł" },
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰", symbol: "₨" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬", symbol: "E£" },
];

export function getCurrencyByCode(code: string): CurrencyInfo | undefined {
  return currencies.find((c) => c.code === code);
}
