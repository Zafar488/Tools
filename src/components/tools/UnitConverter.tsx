"use client";

import { useState, useMemo } from "react";
import { unitCategories } from "@/lib/unit-data";
import { formatNumber, copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function UnitConverter() {
  const [categoryId, setCategoryId] = useState("length");
  const [fromUnitId, setFromUnitId] = useState("km");
  const [toUnitId, setToUnitId] = useState("mi");
  const [inputValue, setInputValue] = useState("1");
  const [copied, setCopied] = useState(false);

  const category = useMemo(
    () => unitCategories.find((c) => c.id === categoryId)!,
    [categoryId]
  );

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);

  const result = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num) || !fromUnit || !toUnit) return null;
    const baseValue = fromUnit.toBase(num);
    return toUnit.fromBase(baseValue);
  }, [inputValue, fromUnit, toUnit]);

  function handleCategoryChange(newCatId: string) {
    setCategoryId(newCatId);
    const newCat = unitCategories.find((c) => c.id === newCatId)!;
    setFromUnitId(newCat.units[0].id);
    setToUnitId(newCat.units[1]?.id ?? newCat.units[0].id);
  }

  function swapUnits() {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  }

  async function handleCopy() {
    if (result !== null) {
      await copyToClipboard(formatNumber(result, 6));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {unitCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "tab-button",
              categoryId === cat.id && "tab-button-active"
            )}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Converter */}
      <div className="grid gap-4 sm:grid-cols-[1fr,auto,1fr] items-end">
        {/* From */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            From
          </label>
          <select
            value={fromUnitId}
            onChange={(e) => setFromUnitId(e.target.value)}
            className="select-field"
          >
            {category.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="input-field text-lg font-semibold"
            inputMode="decimal"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center py-2">
          <button
            onClick={swapUnits}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700"
            aria-label="Swap units"
          >
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            To
          </label>
          <select
            value={toUnitId}
            onChange={(e) => setToUnitId(e.target.value)}
            className="select-field"
          >
            {category.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
          <div className="relative">
            <div className="input-field text-lg font-semibold bg-slate-50 dark:bg-slate-900 min-h-[50px] flex items-center">
              {result !== null ? formatNumber(result, 6) : "—"}
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Formula Display */}
      {result !== null && fromUnit && toUnit && (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
          <span className="font-medium">
            {inputValue} {fromUnit.symbol}
          </span>{" "}
          ={" "}
          <span className="font-semibold text-brand-600 dark:text-brand-400">
            {formatNumber(result, 6)} {toUnit.symbol}
          </span>
        </div>
      )}
    </div>
  );
}
