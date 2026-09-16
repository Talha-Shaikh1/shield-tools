"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Calculator,
  Lock,
  FileCheck2,
  Code2,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Zap,
  Globe2,
} from "lucide-react";
import { WatermarkStudio } from "@/components/docshield/WatermarkStudio";
import { EcomCalculator } from "@/components/ecomshield/EcomCalculator";
import { DocShieldFaq } from "@/components/docshield/DocShieldFaq";
import { EcomFaq } from "@/components/ecomshield/EcomFaq";
import { AdSlot } from "@/components/AdSlot";
import { EmbedModal } from "@/components/EmbedModal";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"docshield" | "ecomshield">("docshield");
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header Leaderboard Ad */}
      <AdSlot id="home-top-leaderboard" format="header-leaderboard" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 sm:py-12 text-center">
        {/* Glow effect */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-72 w-96 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-600/20" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>The Zero-Server Privacy & Profit Utility Engine</span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Protect Your Identity. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Calculate True Ecom Profits.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Free, privacy-first web utilities designed for the modern internet. Zero server file uploads, instant client-side document watermarking, and COD return loss analytics.
          </p>

          {/* Embed & Quick Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsEmbedOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <Code2 className="h-4 w-4 text-blue-500" />
              <span>&lt;/&gt; Embed Widget On Your Site</span>
            </button>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>No Sign-Up Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Switcher Tabs */}
      <section className="mt-4">
        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setActiveTab("docshield")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
                activeTab === "docshield"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <FileCheck2 className="h-4 w-4" />
              <span>DocShield™ ID Watermark Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ecomshield")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
                activeTab === "ecomshield"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>EcomShield™ Profit & RTO Calculator</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tool Content */}
        <div className="mt-8">
          {activeTab === "docshield" ? (
            <div>
              <WatermarkStudio />
              <AdSlot id="home-mid-docshield" format="in-feed-banner" className="my-8" />
              <DocShieldFaq />
            </div>
          ) : (
            <div>
              <EcomCalculator />
              <AdSlot id="home-mid-ecomshield" format="in-feed-banner" className="my-8" />
              <EcomFaq />
            </div>
          )}
        </div>
      </section>

      {/* Embed Modal */}
      <EmbedModal
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
        defaultTool={activeTab === "docshield" ? "watermark" : "ecom-calculator"}
      />
    </div>
  );
}
