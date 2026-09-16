import React from "react";
import { Metadata } from "next";
import { EcomCalculator } from "@/components/ecomshield/EcomCalculator";
import { EcomFaq } from "@/components/ecomshield/EcomFaq";
import { AdSlot } from "@/components/AdSlot";
import { Calculator, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "EcomShield™ — Real Net Profit & RTO Return Loss Calculator",
  description:
    "Calculate your true e-commerce profit margin after factoring in COD customer return rates (RTO), courier return penalties, and wasted ad spend.",
  keywords: [
    "ecom profit calculator",
    "RTO calculator",
    "COD return rate loss",
    "breakeven CAC calculator",
    "dropshipping profit calculator",
    "TikTok shop profit calculator",
    "Daraz profit calculator",
  ],
};

export default function EcomShieldPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Leaderboard Ad */}
      <AdSlot id="ecomshield-header-ad" format="header-leaderboard" />

      {/* Hero Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-300">
          <Calculator className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Stop Bleeding Cash on COD Returns • Real Bottom-Line Math</span>
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Real Net Profit & RTO Return Loss Calculator
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Standard calculators lie by ignoring customer refusals and courier reverse penalties. Unmask your true take-home profit, identify your breakeven CAC, and calculate the exact cash burned on RTO parcels.
        </p>
      </div>

      {/* Main Ecom Calculator */}
      <EcomCalculator />

      {/* Post-Result In-Feed Ad Banner */}
      <AdSlot id="ecomshield-post-result-ad" format="in-feed-banner" className="my-8" />

      {/* Educational Guide & FAQs */}
      <EcomFaq />
    </div>
  );
}
