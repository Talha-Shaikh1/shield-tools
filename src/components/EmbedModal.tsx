"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, X, Code2, ExternalLink } from "lucide-react";

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTool?: "watermark" | "ecom-calculator";
}

export const EmbedModal: React.FC<EmbedModalProps> = ({
  isOpen,
  onClose,
  defaultTool = "watermark",
}) => {
  const [selectedTool, setSelectedTool] = useState<"watermark" | "ecom-calculator">(defaultTool);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [height, setHeight] = useState<number>(defaultTool === "watermark" ? 780 : 720);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://tools.talhaweb.xyz");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    setSelectedTool(defaultTool);
    setHeight(defaultTool === "watermark" ? 780 : 720);
  }, [defaultTool, isOpen]);

  if (!isOpen) return null;

  const embedUrl = `${origin}/embed/${selectedTool}?theme=${theme}`;

  const snippet = `<!-- ShieldTools Free Widget -->
<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="${height}" 
  frameborder="0" 
  style="border-radius: 14px; border: 1px solid #334155; box-shadow: 0 8px 30px rgba(0,0,0,0.12);"
  allow="clipboard-write"
></iframe>
<p style="font-size: 12px; text-align: center; color: #64748b; margin-top: 8px; font-family: sans-serif;">
  Free utility provided by <a href="${origin}" target="_blank" style="color: #2563eb; font-weight: 600; text-decoration: underline;">ShieldTools</a>
</p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy embed snippet", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Embed ShieldTools Widget
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add this interactive privacy & profit tool directly to your website or blog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-2">
          {/* Controls & Snippet */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Choose Widget
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTool("watermark");
                    setHeight(780);
                  }}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                    selectedTool === "watermark"
                      ? "border-blue-600 bg-blue-50/80 text-blue-600 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                  }`}
                >
                  🔒 DocShield Watermark
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTool("ecom-calculator");
                    setHeight(720);
                  }}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                    selectedTool === "ecom-calculator"
                      ? "border-blue-600 bg-blue-50/80 text-blue-600 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                  }`}
                >
                  📊 EcomShield Calculator
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "dark" | "light")}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200"
                >
                  <option value="dark">Dark Theme (Recommended)</option>
                  <option value="light">Light Theme</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Iframe Height (px)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={500}
                  max={1200}
                  step={20}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Copy HTML Embed Code
                </label>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative mt-1.5">
                <pre className="h-36 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[11px] leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  {snippet}
                </pre>
              </div>
            </div>

            <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-3 text-xs text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
              <span className="font-semibold">💡 Zero Setup Required:</span> Simply paste this iframe snippet into your WordPress, Webflow, Ghost, or Shopify store. It is fully mobile responsive and zero files touch external servers.
            </div>
          </div>

          {/* Live Preview Container */}
          <div className="flex flex-col">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live Interactive Preview
              </span>
              <a
                href={embedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span>Open in new tab</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl border border-slate-300 bg-slate-100 shadow-inner dark:border-slate-800 dark:bg-slate-950">
              <iframe
                key={`${selectedTool}-${theme}`}
                src={embedUrl}
                title="Widget Preview"
                className="h-[360px] w-full border-0"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50 px-6 py-3 rounded-b-2xl dark:border-slate-800 dark:bg-slate-900/60">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
