import type { Metadata } from "next";
import Link from "next/link";
import PasswordGenerator from "@/components/tools/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator — Strong & Secure Passwords",
  description: "Generate strong random passwords with customizable rules. Check password strength with entropy analysis. Free and secure.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/tools">Tools</Link><span>/</span>
        <span className="text-slate-900 dark:text-white">Password Generator</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">🔐</span>
          <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">Password Generator</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Generate cryptographically strong passwords. Customize length and character sets. Built-in strength checker with entropy analysis.
        </p>
      </div>
      <div className="tool-wrapper">
        <PasswordGenerator />
      </div>
      <div className="mt-12">
        <h2 className="text-display-sm text-slate-900 dark:text-white">Why Use a Password Generator?</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          Strong, unique passwords are your first line of defense against unauthorized access. Our generator uses your browser&apos;s cryptographic random number generator for maximum security. Passwords are never sent to any server.
        </p>
      </div>
    </div>
  );
}
