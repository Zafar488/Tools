"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import QRCode from "qrcode";

type QRType = "url" | "text" | "email" | "phone" | "sms" | "wifi" | "vcard";

const qrTypes: { id: QRType; label: string; icon: string }[] = [
  { id: "url", label: "URL", icon: "🔗" },
  { id: "text", label: "Text", icon: "📝" },
  { id: "email", label: "Email", icon: "📧" },
  { id: "phone", label: "Phone", icon: "📞" },
  { id: "sms", label: "SMS", icon: "💬" },
  { id: "wifi", label: "WiFi", icon: "📶" },
  { id: "vcard", label: "vCard", icon: "👤" },
];

export default function QRCodeGenerator() {
  const [activeType, setActiveType] = useState<QRType>("url");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Form fields
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phone, setPhone] = useState("");
  const [smsTo, setSmsTo] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [vcName, setVcName] = useState("");
  const [vcPhone, setVcPhone] = useState("");
  const [vcEmail, setVcEmail] = useState("");
  const [vcOrg, setVcOrg] = useState("");

  function buildPayload(): string {
    switch (activeType) {
      case "url":
        return url || "";
      case "text":
        return text;
      case "email":
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "phone":
        return `tel:${phone}`;
      case "sms":
        return `smsto:${smsTo}:${smsBody}`;
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPass};;`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcName}\nTEL:${vcPhone}\nEMAIL:${vcEmail}\nORG:${vcOrg}\nEND:VCARD`;
      default:
        return "";
    }
  }

  async function generateQR() {
    const payload = buildPayload();
    if (!payload || payload.length < 3) {
      setError("Please fill in the required fields.");
      setQrDataUrl(null);
      return;
    }
    setError(null);
    try {
      const dataUrl = await QRCode.toDataURL(payload, {
        width: 400,
        margin: 2,
        color: { dark: "#0f172a", light: "#ffffff" },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);
    } catch {
      setError("Failed to generate QR code. Input may be too long.");
    }
  }

  // Auto-generate on type change
  useEffect(() => {
    setQrDataUrl(null);
    setError(null);
  }, [activeType]);

  function downloadQR() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qr-${activeType}-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="space-y-6">
      {/* Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {qrTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            className={cn("tab-button", activeType === t.id && "tab-button-active")}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,auto]">
        {/* Input Form */}
        <div className="space-y-4">
          {activeType === "url" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
              <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="input-field" />
            </div>
          )}

          {activeType === "text" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Text Content</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text..." className="input-field min-h-[100px] resize-y" />
            </div>
          )}

          {activeType === "email" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input value={emailTo} onChange={(e) => setEmailTo(e.target.value)} type="email" placeholder="name@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Email subject" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Body</label>
                <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Email body..." className="input-field min-h-[80px] resize-y" />
              </div>
            </>
          )}

          {activeType === "phone" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+1234567890" className="input-field" />
            </div>
          )}

          {activeType === "sms" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input value={smsTo} onChange={(e) => setSmsTo(e.target.value)} type="tel" placeholder="+1234567890" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea value={smsBody} onChange={(e) => setSmsBody(e.target.value)} placeholder="Your message..." className="input-field min-h-[80px] resize-y" />
              </div>
            </>
          )}

          {activeType === "wifi" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Network Name (SSID)</label>
                <input value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} placeholder="MyWiFiNetwork" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} type="password" placeholder="WiFi password" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Encryption</label>
                <select value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value as "WPA" | "WEP" | "nopass")} className="select-field">
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </>
          )}

          {activeType === "vcard" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input value={vcName} onChange={(e) => setVcName(e.target.value)} placeholder="John Doe" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                <input value={vcPhone} onChange={(e) => setVcPhone(e.target.value)} type="tel" placeholder="+1234567890" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input value={vcEmail} onChange={(e) => setVcEmail(e.target.value)} type="email" placeholder="name@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Organization</label>
                <input value={vcOrg} onChange={(e) => setVcOrg(e.target.value)} placeholder="Company name" className="input-field" />
              </div>
            </>
          )}

          <button onClick={generateQR} className="btn-primary w-full sm:w-auto">
            Generate QR Code
          </button>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        {/* QR Display */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-64 h-64 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-900 overflow-hidden">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Generated QR code" className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-sm text-slate-400 text-center px-4">
                Your QR code will appear here
              </span>
            )}
          </div>
          {qrDataUrl && (
            <button onClick={downloadQR} className="btn-secondary w-full max-w-[256px]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PNG
            </button>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}
