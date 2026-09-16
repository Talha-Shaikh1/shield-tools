"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WatermarkStudio } from "@/components/docshield/WatermarkStudio";
import { ExternalLink, ShieldCheck } from "lucide-react";

function WatermarkEmbedContent() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme");

  useEffect(() => {
    const root = document.documentElement;
    if (themeParam === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [themeParam]);

  return (
    <main className="min-h-screen p-4 sm:p-6 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <div className="mx-auto max-w-5xl">
        <WatermarkStudio />

        {/* Viral Backlink & Attribution Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">DocShield™ Secure ID Studio</span>
            <span className="hidden sm:inline">• 100% Client-Side Privacy</span>
          </div>

          <a
            href="https://shieldtools.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 font-bold text-blue-700 shadow-sm transition hover:bg-blue-100 hover:text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            <span>⚡ Powered by ShieldTools</span>
            <span className="hidden sm:inline">| Free Tool</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </main>
  );
}

export default function WatermarkEmbedPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading DocShield widget...</div>}>
      <WatermarkEmbedContent />
    </Suspense>
  );
}
