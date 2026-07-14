"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "age" | "between" | "addsubtract";

function calcAge(birthDate: Date, today: Date) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = today.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Next birthday
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday <= today) {
    nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return { years, months, days, totalDays, totalWeeks, totalMonths, nextBirthday, daysUntilBirthday };
}

function daysBetween(d1: Date, d2: Date) {
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const approxMonths = Math.round((totalDays / 30.44) * 10) / 10;
  const approxYears = Math.round((totalDays / 365.25) * 10) / 10;
  return { totalDays, totalWeeks, remainingDays, approxMonths, approxYears };
}

function addDaysToDate(base: Date, daysToAdd: number): Date {
  const result = new Date(base);
  result.setDate(result.getDate() + daysToAdd);
  return result;
}

export default function AgeDateCalculator() {
  const [tab, setTab] = useState<Tab>("age");

  // Age calculator state
  const [birthDate, setBirthDate] = useState("");

  // Between dates state
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  // Add/subtract state
  const [baseDate, setBaseDate] = useState("");
  const [daysAmount, setDaysAmount] = useState("30");
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const ageResult = birthDate ? calcAge(new Date(birthDate), today) : null;
  const betweenResult = date1 && date2 ? daysBetween(new Date(date1), new Date(date2)) : null;
  const addResult = baseDate && daysAmount
    ? addDaysToDate(new Date(baseDate), (operation === "add" ? 1 : -1) * parseInt(daysAmount))
    : null;

  function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
    return (
      <div className="rounded-xl border p-4 text-center dark:border-slate-700">
        <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{value}</div>
        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {([
          { id: "age" as Tab, label: "Age Calculator", icon: "🎂" },
          { id: "between" as Tab, label: "Days Between", icon: "📊" },
          { id: "addsubtract" as Tab, label: "Add/Subtract Days", icon: "➕" },
        ]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn("tab-button", tab === t.id && "tab-button-active")}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Age Calculator */}
      {tab === "age" && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="input-field max-w-xs" max={today.toISOString().split("T")[0]} />
          </div>

          {ageResult && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Years" value={ageResult.years} />
                <StatCard label="Months" value={ageResult.months} />
                <StatCard label="Days" value={ageResult.days} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard label="Total Days" value={ageResult.totalDays.toLocaleString()} />
                <StatCard label="Total Weeks" value={ageResult.totalWeeks.toLocaleString()} />
                <StatCard label="Total Months" value={ageResult.totalMonths.toLocaleString()} />
                <StatCard label="Next Birthday" value={`${ageResult.daysUntilBirthday} days`} sub={ageResult.nextBirthday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} />
              </div>
            </>
          )}
        </div>
      )}

      {/* Days Between */}
      {tab === "between" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
              <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
              <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="input-field" />
            </div>
          </div>

          {betweenResult && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard label="Total Days" value={betweenResult.totalDays.toLocaleString()} />
              <StatCard label="Weeks + Days" value={`${betweenResult.totalWeeks}w ${betweenResult.remainingDays}d`} />
              <StatCard label="Approx. Months" value={betweenResult.approxMonths} />
              <StatCard label="Approx. Years" value={betweenResult.approxYears} />
            </div>
          )}
        </div>
      )}

      {/* Add/Subtract Days */}
      {tab === "addsubtract" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
              <input type="date" value={baseDate} onChange={(e) => setBaseDate(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Operation</label>
              <select value={operation} onChange={(e) => setOperation(e.target.value as "add" | "subtract")} className="select-field">
                <option value="add">Add Days</option>
                <option value="subtract">Subtract Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Number of Days</label>
              <input type="number" value={daysAmount} onChange={(e) => setDaysAmount(e.target.value)} min="0" className="input-field" />
            </div>
          </div>

          {addResult && !isNaN(addResult.getTime()) && (
            <div className="rounded-xl bg-brand-50 p-6 text-center dark:bg-brand-950/30">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {operation === "add" ? "Adding" : "Subtracting"} {daysAmount} days {operation === "add" ? "to" : "from"}{" "}
                {new Date(baseDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <div className="text-2xl font-bold text-brand-700 dark:text-brand-300">
                {addResult.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
