import React from "react";
import { Metadata } from "next";
import { WatermarkStudio } from "@/components/docshield/WatermarkStudio";
import { DocShieldFaq } from "@/components/docshield/DocShieldFaq";
import { AdSlot } from "@/components/AdSlot";
import { ShieldCheck, Lock, Sparkles, FileCheck, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "DocShield™ — Free Client-Side CNIC & ID Card Watermark Studio",
  description:
    "Protect your sensitive documents from fraud. Add custom diagonal watermarks, purpose stamps, and recipient tags to your CNIC, Passport, or Driving License with 100% in-browser privacy.",
  keywords: [
    "watermark ID card",
    "watermark CNIC online",
    "secure ID watermark",
    "SIM verification watermark",
    "client-side watermark",
    "merge ID front and back",
    "identity theft protection",
  ],
};

export default function DocShieldPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Leaderboard Ad */}
      <AdSlot id="docshield-header-ad" format="header-leaderboard" />

      {/* Hero Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>Zero Server Uploads • 100% In-Browser Document Security</span>
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Secure ID & CNIC Watermark Studio
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Never share an unprotected copy of your National ID, Passport, or License. Stamp purpose-specific diagonal security watermarks that prevent identity theft, unauthorized SIM activations, and fraudulent loans.
        </p>
      </div>

      {/* Main Watermarking Studio */}
      <WatermarkStudio />

      {/* Post-Result In-Feed Ad Banner */}
      <AdSlot id="docshield-post-result-ad" format="in-feed-banner" className="my-8" />

      {/* Educational Guide & FAQs */}
      <DocShieldFaq />
    </div>
  );
}
