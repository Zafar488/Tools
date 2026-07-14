import type { Metadata } from "next";
import Link from "next/link";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";

export const metadata: Metadata = {
  title: "QR Code Generator — Free Online QR Maker",
  description: "Generate QR codes for URLs, text, email, phone, SMS, WiFi, and vCards. Download as PNG. Free and instant.",
};

export default function QRCodeGeneratorPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/tools">Tools</Link><span>/</span>
        <span className="text-slate-900 dark:text-white">QR Code Generator</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">📱</span>
          <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">QR Code Generator</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Create QR codes for URLs, text, email, phone, SMS, WiFi credentials, and vCards. Download as PNG. All processing happens in your browser.
        </p>
      </div>
      <div className="tool-wrapper">
        <QRCodeGenerator />
      </div>
      <div className="mt-12">
        <h2 className="text-display-sm text-slate-900 dark:text-white">7 QR Code Types</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3">Generate QR codes for any purpose — from website links to WiFi credentials and digital business cards.</p>
      </div>
    </div>
  );
}
