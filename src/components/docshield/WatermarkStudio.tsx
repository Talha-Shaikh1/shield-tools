"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  ShieldAlert,
  Download,
  FileImage,
  RefreshCw,
  Layers,
  Sparkles,
  Lock,
  Calendar,
  Building,
  CheckCircle2,
  FileText,
  Sliders,
  Maximize2,
} from "lucide-react";
import {
  WatermarkOptions,
  renderSingleDocumentToCanvas,
  renderDualDocumentToCanvas,
} from "@/utils/watermarkRenderer";
import { exportCanvasToPdf } from "@/utils/pdfExport";
import { PresetStamps } from "./PresetStamps";

const COLOR_OPTIONS = [
  { name: "Security Red", hex: "#dc2626", bgClass: "bg-red-600" },
  { name: "Navy Blue", hex: "#1d4ed8", bgClass: "bg-blue-700" },
  { name: "Charcoal Dark", hex: "#1e293b", bgClass: "bg-slate-800" },
  { name: "White Shield", hex: "#ffffff", bgClass: "bg-white border border-slate-300" },
];

export const WatermarkStudio: React.FC = () => {
  const [mode, setMode] = useState<"single" | "dual">("dual");
  const [layout, setLayout] = useState<"side-by-side" | "stacked">("side-by-side");

  // Single doc image state
  const [singleImg, setSingleImg] = useState<HTMLImageElement | null>(null);
  // Dual doc images state
  const [frontImg, setFrontImg] = useState<HTMLImageElement | null>(null);
  const [backImg, setBackImg] = useState<HTMLImageElement | null>(null);

  // Watermark parameters
  const [text, setText] = useState("FOR SIM VERIFICATION ONLY");
  const [recipient, setRecipient] = useState("SUBMITTED TO: TELECOM PROVIDER");
  const [pattern, setPattern] = useState<"grid" | "center">("grid");
  const [opacity, setOpacity] = useState(0.35);
  const [color, setColor] = useState("#dc2626");
  const [fontSize, setFontSize] = useState(32);
  const [angle, setAngle] = useState(25);
  const [includeDate, setIncludeDate] = useState(true);
  const [dateText, setDateText] = useState(() => new Date().toISOString().split("T")[0]);

  const [isExporting, setIsExporting] = useState(false);
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Create demo placeholder image on first load so users see the capability right away
  useEffect(() => {
    const createDemoCard = (title: string, subtitle: string): HTMLImageElement => {
      const c = document.createElement("canvas");
      c.width = 640;
      c.height = 400;
      const ctx = c.getContext("2d")!;

      // Card gradient background
      const grad = ctx.createLinearGradient(0, 0, 640, 400);
      grad.addColorStop(0, "#e2e8f0");
      grad.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = grad;
      ctx.roundRect(0, 0, 640, 400, 24);
      ctx.fill();

      // Card Header
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, 640, 60);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(title, 24, 38);

      // Photo placeholder
      ctx.fillStyle = "#94a3b8";
      ctx.roundRect(40, 100, 130, 160, 12);
      ctx.fill();
      ctx.fillStyle = "#475569";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("PHOTO", 80, 190);

      // Detail lines
      ctx.fillStyle = "#334155";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText("NAME: JANE DOE", 200, 120);
      ctx.fillText("NATIONAL ID: 42101-9876543-1", 200, 155);
      ctx.fillText("DOB: 12-OCT-1994", 200, 190);
      ctx.fillText("EXPIRY: 12-OCT-2032", 200, 225);

      // Chip placeholder
      ctx.fillStyle = "#eab308";
      ctx.roundRect(200, 255, 60, 45, 6);
      ctx.fill();

      ctx.fillStyle = "#64748b";
      ctx.font = "italic 13px sans-serif";
      ctx.fillText(subtitle, 40, 360);

      const img = new Image();
      img.src = c.toDataURL();
      return img;
    };

    const demoFront = createDemoCard(
      "NATIONAL IDENTITY CARD (SAMPLE FRONT)",
      "Demo preview document — Replace with your ID photo"
    );
    demoFront.onload = () => {
      setFrontImg(demoFront);
      setSingleImg(demoFront);
    };

    const demoBack = createDemoCard(
      "NATIONAL IDENTITY CARD (SAMPLE BACK)",
      "Demo preview document — Address & Family Registration Details"
    );
    demoBack.onload = () => {
      setBackImg(demoBack);
    };
  }, []);

  // Update canvas preview
  const redrawCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const watermarkOpts: WatermarkOptions = {
      text,
      recipientText: recipient,
      pattern,
      opacity,
      color,
      fontSize,
      angle,
      includeDate,
      dateText,
    };

    if (mode === "single") {
      if (singleImg) {
        renderSingleDocumentToCanvas(canvas, singleImg, watermarkOpts);
      }
    } else {
      if (frontImg && backImg) {
        renderDualDocumentToCanvas(canvas, frontImg, backImg, layout, watermarkOpts);
      } else if (frontImg) {
        renderSingleDocumentToCanvas(canvas, frontImg, watermarkOpts);
      }
    }
  }, [
    mode,
    layout,
    singleImg,
    frontImg,
    backImg,
    text,
    recipient,
    pattern,
    opacity,
    color,
    fontSize,
    angle,
    includeDate,
    dateText,
  ]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // File upload helpers
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "single" | "front" | "back"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        if (target === "single") setSingleImg(img);
        if (target === "front") setFrontImg(img);
        if (target === "back") setBackImg(img);
      };
    };
    reader.readAsDataURL(file);
  };

  // Download handlers
  const handleDownload = (format: "png" | "jpg" | "pdf") => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    setExportedStatus(`Generating ${format.toUpperCase()}...`);

    setTimeout(async () => {
      const canvas = canvasRef.current!;
      const cleanPurpose = text.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() || "watermarked-id";
      const fileName = `shieldtools-${cleanPurpose}-${new Date().getTime()}`;

      if (format === "pdf") {
        await exportCanvasToPdf(canvas, `${fileName}.pdf`);
      } else {
        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const link = document.createElement("a");
        link.download = `${fileName}.${format}`;
        link.href = canvas.toDataURL(mimeType, 0.95);
        link.click();
      }

      setIsExporting(false);
      setExportedStatus(`Successfully downloaded ${format.toUpperCase()}!`);
      setTimeout(() => setExportedStatus(null), 3500);
    }, 150);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 100% Privacy Guarantee Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-950/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
              🔒 100% Client-Side Privacy Guarantee
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-400">
              Your documents never leave your browser. All image stamping and merging happens completely inside your device RAM with zero server uploads.
            </p>
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" /> 0% Server Risk
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Controls & Uploads (5 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {/* Mode Switcher */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step 1: Document Upload Mode
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode("dual")}
                className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition ${
                  mode === "dual"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-300 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Front & Back (Dual ID)</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("single")}
                className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition ${
                  mode === "single"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-300 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                <FileImage className="h-4 w-4" />
                <span>Single Document</span>
              </button>
            </div>

            {/* Upload zones */}
            {mode === "single" ? (
              <div className="mt-4">
                <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-5 text-center cursor-pointer transition hover:border-blue-500 hover:bg-blue-50/20 dark:border-slate-700 dark:bg-slate-850 dark:hover:border-blue-500">
                  <Upload className="h-7 w-7 text-slate-400" />
                  <span className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Upload Passport, Single ID, or License
                  </span>
                  <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 25MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "single")}
                  />
                </label>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 text-center cursor-pointer transition hover:border-blue-500 hover:bg-blue-50/20 dark:border-slate-700 dark:bg-slate-850 dark:hover:border-blue-500">
                  <Upload className="h-6 w-6 text-slate-400" />
                  <span className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Front Side Photo
                  </span>
                  <span className="text-[10px] text-slate-400">Drag or browse</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "front")}
                  />
                </label>
                <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 text-center cursor-pointer transition hover:border-blue-500 hover:bg-blue-50/20 dark:border-slate-700 dark:bg-slate-850 dark:hover:border-blue-500">
                  <Upload className="h-6 w-6 text-slate-400" />
                  <span className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Back Side Photo
                  </span>
                  <span className="text-[10px] text-slate-400">Drag or browse</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "back")}
                  />
                </label>
              </div>
            )}

            {/* Merge layout options if in dual mode */}
            {mode === "dual" && (
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Dual Merger Layout:
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLayout("side-by-side")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      layout === "side-by-side"
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("stacked")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      layout === "stacked"
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    Stacked Vertical
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Watermark Details & Presets */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step 2: Watermark Text & Fraud Prevention
            </label>

            <div className="mt-3">
              <PresetStamps
                currentText={text}
                onSelect={(presetText, presetColor) => {
                  setText(presetText);
                  if (presetColor) setColor(presetColor);
                }}
              />
            </div>

            {/* Custom Purpose Input */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Watermark Purpose Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. FOR SIM VERIFICATION ONLY"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold tracking-wide text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/80 dark:text-white"
              />
            </div>

            {/* Recipient context field */}
            <div className="mt-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Building className="h-3.5 w-3.5 text-blue-500" />
                <span>Submitted To (Recipient Identity)</span>
              </div>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. SUBMITTED TO: Jazz Telecom / HBL Bank"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold tracking-wide text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/80 dark:text-white"
              />
            </div>

            {/* Auto date toggle */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Append Current Date Stamp
                </span>
              </div>
              <input
                type="checkbox"
                checked={includeDate}
                onChange={(e) => setIncludeDate(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>
            {includeDate && (
              <div className="mt-2 px-1">
                <input
                  type="date"
                  value={dateText}
                  onChange={(e) => setDateText(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
            )}
          </div>

          {/* Watermark Styling Controls */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step 3: Styling & Security Pattern
            </label>

            {/* Pattern Grid vs Center */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPattern("grid")}
                className={`rounded-xl border p-2 text-xs font-bold transition ${
                  pattern === "grid"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-300 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                🛡️ Security Grid (Crop-Proof)
              </button>
              <button
                type="button"
                onClick={() => setPattern("center")}
                className={`rounded-xl border p-2 text-xs font-bold transition ${
                  pattern === "center"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-300 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                🎯 Single Center Stamp
              </button>
            </div>

            {/* Color selector */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Security Stamp Color
              </label>
              <div className="mt-1.5 flex gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.hex)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                      color === c.hex
                        ? "border-blue-600 ring-2 ring-blue-500/30 dark:border-blue-400"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    <span className={`h-3 w-3 rounded-full ${c.bgClass}`} />
                    <span className="text-slate-700 dark:text-slate-300">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity Slider */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Opacity (Legibility Balance)</span>
                <span className="text-blue-600 dark:text-blue-400">{Math.round(opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.80"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="mt-1.5 w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>15% (Subtle)</span>
                <span className="font-semibold text-slate-500">35% (Recommended)</span>
                <span>80% (Heavy)</span>
              </div>
            </div>

            {/* Font Size & Angle Sliders */}
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Font Scale</span>
                  <span className="text-blue-600 dark:text-blue-400">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="52"
                  step="2"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="mt-1.5 w-full cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Stamp Angle</span>
                  <span className="text-blue-600 dark:text-blue-400">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="45"
                  step="1"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="mt-1.5 w-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Interactive Canvas Preview & Export (7 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Live Watermarked Document Preview
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                Updates in real-time
              </span>
            </div>

            {/* Interactive Preview Canvas Container */}
            <div className="relative mt-4 flex min-h-[380px] max-h-[560px] items-center justify-center overflow-auto rounded-xl border border-slate-200/80 bg-slate-900/5 p-3 dark:border-slate-800 dark:bg-slate-950/40">
              <canvas
                ref={canvasRef}
                className="max-h-[500px] w-auto max-w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Export Notification */}
            {exportedStatus && (
              <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>{exportedStatus}</span>
              </div>
            )}

            {/* One-Click High-Res Export Action Bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Export Options (High Resolution):
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => handleDownload("png")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PNG</span>
                </button>
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => handleDownload("jpg")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                  <span>JPG</span>
                </button>
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => handleDownload("pdf")}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-red-300 bg-red-50/70 px-3.5 py-2.5 text-xs font-bold text-red-700 shadow-sm transition hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 disabled:opacity-50"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Security Checklist */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h5 className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              <span>Recommended Security Practices When Sharing ID Copies</span>
            </h5>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Always use Security Grid pattern:</strong> Criminals cannot easily crop or clone away watermarks that span diagonal borders.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Name the specific institution:</strong> Write "SUBMITTED TO [COMPANY NAME]" so the copy is invalid for other entities.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Keep opacity around 35%:</strong> This keeps your original legal details readable by official KYC officers while preventing reuse.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
