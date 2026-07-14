"use client";

import { useState, useCallback, useEffect } from "react";
import { cn, copyToClipboard } from "@/lib/utils";
import type { PasswordOptions, PasswordStrength } from "@/types";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const AMBIGUOUS = "Il1O0o";

function generatePassword(opts: PasswordOptions): string {
  let pool = "";
  if (opts.uppercase) pool += CHARS.uppercase;
  if (opts.lowercase) pool += CHARS.lowercase;
  if (opts.numbers) pool += CHARS.numbers;
  if (opts.symbols) pool += CHARS.symbols;

  if (opts.excludeAmbiguous) {
    pool = pool
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }

  if (pool.length === 0) return "";

  const array = new Uint32Array(opts.length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => pool[v % pool.length]).join("");
}

function analyzeStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "None", color: "#94A3B8", suggestions: ["Generate a password"] };

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;

  const entropy = password.length * Math.log2(poolSize || 1);
  const suggestions: string[] = [];

  if (password.length < 12) suggestions.push("Use at least 12 characters");
  if (!/[A-Z]/.test(password)) suggestions.push("Add uppercase letters");
  if (!/[a-z]/.test(password)) suggestions.push("Add lowercase letters");
  if (!/[0-9]/.test(password)) suggestions.push("Add numbers");
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push("Add symbols");

  let score: number;
  let label: string;
  let color: string;

  if (entropy < 28) {
    score = 1; label = "Very Weak"; color = "#DC2626";
  } else if (entropy < 36) {
    score = 2; label = "Weak"; color = "#F97316";
  } else if (entropy < 60) {
    score = 3; label = "Fair"; color = "#EAB308";
  } else if (entropy < 80) {
    score = 4; label = "Strong"; color = "#22C55E";
  } else {
    score = 5; label = "Very Strong"; color = "#15803D";
  }

  return { score, label, color, suggestions };
}

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"generate" | "check">("generate");

  const generate = useCallback(() => {
    setPassword(generatePassword(options));
    setCopied(false);
  }, [options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const strength = analyzeStrength(activeTab === "generate" ? password : checkPassword);

  async function handleCopy() {
    const pwd = activeTab === "generate" ? password : checkPassword;
    if (pwd) {
      await copyToClipboard(pwd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("generate")}
          className={cn("tab-button", activeTab === "generate" && "tab-button-active")}
        >
          Generate Password
        </button>
        <button
          onClick={() => setActiveTab("check")}
          className={cn("tab-button", activeTab === "check" && "tab-button-active")}
        >
          Check Strength
        </button>
      </div>

      {activeTab === "generate" ? (
        <>
          {/* Password Display */}
          <div className="relative">
            <div className="input-field font-mono text-lg py-4 pr-24 break-all bg-slate-50 dark:bg-slate-900">
              {password || "—"}
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button onClick={handleCopy} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-900/50 dark:text-brand-300">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={generate} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300">
                New
              </button>
            </div>
          </div>

          {/* Strength Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Strength</span>
              <span className="font-semibold" style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${(strength.score / 5) * 100}%`, backgroundColor: strength.color }}
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="font-medium text-slate-700 dark:text-slate-300">Length</label>
                <span className="font-semibold text-brand-600 dark:text-brand-400">{options.length}</span>
              </div>
              <input
                type="range"
                min={4}
                max={64}
                value={options.length}
                onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>4</span><span>64</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                { key: "uppercase", label: "Uppercase (A-Z)" },
                { key: "lowercase", label: "Lowercase (a-z)" },
                { key: "numbers", label: "Numbers (0-9)" },
                { key: "symbols", label: "Symbols (!@#$)" },
                { key: "excludeAmbiguous", label: "Exclude ambiguous (I,l,1,O,0)" },
              ] as const).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                </label>
              ))}
            </div>

            <button onClick={generate} className="btn-primary w-full">
              Generate New Password
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Password Check Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Enter a password to check
            </label>
            <input
              type="text"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              placeholder="Type or paste a password..."
              className="input-field font-mono text-lg"
            />
          </div>

          {/* Strength Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Strength</span>
              <span className="font-semibold" style={{ color: strength.color }}>{strength.label}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(strength.score / 5) * 100}%`, backgroundColor: strength.color }} />
            </div>
          </div>

          {/* Suggestions */}
          {strength.suggestions.length > 0 && (
            <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/30">
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">Suggestions</h4>
              <ul className="space-y-1">
                {strength.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                    <span className="mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
