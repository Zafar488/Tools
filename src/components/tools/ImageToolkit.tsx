"use client";

import { useState, useRef } from "react";
import { cn, formatFileSize } from "@/lib/utils";

type Action = "compress" | "resize" | "convert";

interface ProcessedImage {
  dataUrl: string;
  size: number;
  width: number;
  height: number;
  format: string;
}

export default function ImageToolkit() {
  const [action, setAction] = useState<Action>("compress");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [sourceDimensions, setSourceDimensions] = useState({ width: 0, height: 0 });
  const [processed, setProcessed] = useState<ProcessedImage | null>(null);
  const [processing, setProcessing] = useState(false);

  // Options
  const [quality, setQuality] = useState(80);
  const [resizeWidth, setResizeWidth] = useState("800");
  const [resizeHeight, setResizeHeight] = useState("600");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">("jpeg");

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setSourceFile(file);
    setProcessed(null);

    const url = URL.createObjectURL(file);
    setSourcePreview(url);

    const img = new Image();
    img.onload = () => {
      setSourceDimensions({ width: img.width, height: img.height });
      setResizeWidth(String(img.width));
      setResizeHeight(String(img.height));
    };
    img.src = url;
  }

  function handleWidthChange(val: string) {
    setResizeWidth(val);
    if (maintainRatio && sourceDimensions.width > 0) {
      const ratio = sourceDimensions.height / sourceDimensions.width;
      setResizeHeight(String(Math.round(parseInt(val) * ratio) || 0));
    }
  }

  function handleHeightChange(val: string) {
    setResizeHeight(val);
    if (maintainRatio && sourceDimensions.height > 0) {
      const ratio = sourceDimensions.width / sourceDimensions.height;
      setResizeWidth(String(Math.round(parseInt(val) * ratio) || 0));
    }
  }

  async function processImage() {
    if (!sourceFile || !sourcePreview) return;
    setProcessing(true);

    try {
      const img = new Image();
      img.src = sourcePreview;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement("canvas");
      let targetWidth = img.width;
      let targetHeight = img.height;

      if (action === "resize") {
        targetWidth = parseInt(resizeWidth) || img.width;
        targetHeight = parseInt(resizeHeight) || img.height;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const mimeType = `image/${outputFormat}`;
      const q = outputFormat === "png" ? undefined : quality / 100;
      const dataUrl = canvas.toDataURL(mimeType, q);

      // Calculate size from data URL
      const base64Length = dataUrl.split(",")[1]?.length || 0;
      const size = Math.round((base64Length * 3) / 4);

      setProcessed({
        dataUrl,
        size,
        width: targetWidth,
        height: targetHeight,
        format: outputFormat.toUpperCase(),
      });
    } catch (err) {
      console.error("Image processing error:", err);
    } finally {
      setProcessing(false);
    }
  }

  function downloadImage() {
    if (!processed) return;
    const a = document.createElement("a");
    a.href = processed.dataUrl;
    a.download = `processed-${Date.now()}.${outputFormat}`;
    a.click();
  }

  function clearAll() {
    setSourceFile(null);
    setSourcePreview(null);
    setProcessed(null);
    setSourceDimensions({ width: 0, height: 0 });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-6">
      {/* Action Tabs */}
      <div className="flex flex-wrap gap-2">
        {([
          { id: "compress" as Action, label: "Compress", icon: "📦" },
          { id: "resize" as Action, label: "Resize", icon: "↔️" },
          { id: "convert" as Action, label: "Convert", icon: "🔄" },
        ]).map((t) => (
          <button key={t.id} onClick={() => { setAction(t.id); setProcessed(null); }}
            className={cn("tab-button", action === t.id && "tab-button-active")}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* File Upload */}
      {!sourceFile ? (
        <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 p-12 cursor-pointer hover:border-brand-400 hover:bg-brand-50/50 transition-colors dark:border-slate-600 dark:hover:border-brand-500 dark:hover:bg-brand-950/20">
          <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <div className="text-center">
            <span className="text-brand-600 font-semibold dark:text-brand-400">Click to upload</span>
            <span className="text-slate-500"> or drag and drop</span>
          </div>
          <span className="text-xs text-slate-400">JPG, PNG, WebP — max 20MB</span>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileSelect} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          {/* Source Info */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
            <div className="flex items-center gap-3 min-w-0">
              {sourcePreview && (
                <img src={sourcePreview} alt="Source" className="h-12 w-12 rounded-lg object-cover" />
              )}
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{sourceFile.name}</div>
                <div className="text-xs text-slate-500">
                  {sourceDimensions.width} × {sourceDimensions.height} &middot; {formatFileSize(sourceFile.size)}
                </div>
              </div>
            </div>
            <button onClick={clearAll} className="text-sm text-red-500 hover:text-red-600 font-medium shrink-0 ml-2">Remove</button>
          </div>

          {/* Options */}
          <div className="grid gap-4 sm:grid-cols-2">
            {(action === "compress" || action === "convert") && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="font-medium text-slate-700 dark:text-slate-300">Quality</label>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">{quality}%</span>
                </div>
                <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full accent-brand-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>Smaller file</span><span>Higher quality</span></div>
              </div>
            )}

            {action === "resize" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Width (px)</label>
                  <input type="number" value={resizeWidth} onChange={(e) => handleWidthChange(e.target.value)} className="input-field" min="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height (px)</label>
                  <input type="number" value={resizeHeight} onChange={(e) => handleHeightChange(e.target.value)} className="input-field" min="1" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
                  <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Maintain aspect ratio</span>
                </label>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Output Format</label>
              <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as "jpeg" | "png" | "webp")} className="select-field">
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          </div>

          <button onClick={processImage} disabled={processing} className="btn-primary w-full sm:w-auto">
            {processing ? "Processing..." : `${action === "compress" ? "Compress" : action === "resize" ? "Resize" : "Convert"} Image`}
          </button>

          {/* Result */}
          {processed && (
            <div className="rounded-xl border p-4 space-y-4 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Result</h4>
                <button onClick={downloadImage} className="btn-primary text-sm py-2 px-4">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Dimensions: </span>
                  <span className="font-medium text-slate-900 dark:text-white">{processed.width} × {processed.height}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Format: </span>
                  <span className="font-medium text-slate-900 dark:text-white">{processed.format}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Original: </span>
                  <span className="font-medium text-slate-900 dark:text-white">{formatFileSize(sourceFile.size)}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">New size: </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{formatFileSize(processed.size)}</span>
                  {processed.size < sourceFile.size && (
                    <span className="ml-1 text-xs text-green-600 dark:text-green-400">
                      ({Math.round((1 - processed.size / sourceFile.size) * 100)}% smaller)
                    </span>
                  )}
                </div>
              </div>

              <img src={processed.dataUrl} alt="Processed result" className="rounded-lg max-h-64 mx-auto object-contain" />
            </div>
          )}
        </div>
      )}

      {/* Privacy Note */}
      <div className="rounded-xl bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950/30 dark:text-green-300 flex items-start gap-2">
        <span className="mt-0.5">🔒</span>
        <span>Your images are processed entirely in your browser. Nothing is uploaded to any server.</span>
      </div>
    </div>
  );
}
