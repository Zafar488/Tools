import type { Metadata } from "next";
import Link from "next/link";
import ImageToolkit from "@/components/tools/ImageToolkit";

export const metadata: Metadata = {
  title: "Image Toolkit — Compress, Resize & Convert Images",
  description: "Compress images, resize to exact dimensions, and convert between JPG, PNG, and WebP. 100% browser-side — your images never leave your device.",
};

export default function ImageToolkitPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/tools">Tools</Link><span>/</span>
        <span className="text-slate-900 dark:text-white">Image Toolkit</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">🖼️</span>
          <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">Image Toolkit</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Compress, resize, and convert images between JPG, PNG, and WebP formats — entirely in your browser. Your images never leave your device.
        </p>
      </div>
      <div className="tool-wrapper">
        <ImageToolkit />
      </div>
    </div>
  );
}
