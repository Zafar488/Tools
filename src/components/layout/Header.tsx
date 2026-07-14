"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { tools, SITE_NAME } from "@/lib/tools-registry";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 dark:border-slate-800">
      <div className="max-container section-padding flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xl">
          <span className="text-2xl">🛠️</span>
          <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === "/" ? "text-brand-600 dark:text-brand-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
          >
            Home
          </Link>
          <Link
            href="/tools"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname.startsWith("/tools") ? "text-brand-600 dark:text-brand-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
          >
            All Tools
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
            aria-label="Open menu"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-4 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/tools" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setMenuOpen(false)}>
            All Tools
          </Link>
          <div className="pt-2 pb-1 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Access</div>
          {tools.slice(0, 4).map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setMenuOpen(false)}>
              <span>{tool.icon}</span>
              <span>{tool.name}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
