import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, EyeOff, Lightbulb, Users, Globe2, Sparkles } from "lucide-react";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "About Us | ShieldTools — Digital Privacy & E-Commerce Sovereignty",
  description:
    "Learn about the mission behind ShieldTools: providing 100% private in-browser document security and transparent e-commerce profitability math with zero server costs.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Top Header Ad */}
      <AdSlot id="about-top" format="header-leaderboard" />

      {/* Hero */}
      <div className="text-center">
        <span className="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
          Our Story & Principles
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Defending Digital Privacy & Entrepreneurial Profitability
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          ShieldTools was born from a simple realization: the web’s most essential daily utilities shouldn’t demand that users sacrifice their personal identity or fall victim to deceptive commercial math.
        </p>
      </div>

      {/* Core Dual Mission */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            1. Zero-Knowledge Document Privacy
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Billions of individuals are routinely forced to share photocopies of their National Identity Cards (CNIC / Aadhaar / National ID), Passports, and driving licenses for basic services: registering telecom SIMs, applying for freelance gigs, or renting an apartment.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Most online &quot;watermarking&quot; tools upload your most sensitive identity documents to remote cloud storage servers, exposing you to data breaches and rogue operators. Our <strong>DocShield™</strong> module leverages modern HTML5 Canvas technology to perform 100% of image rendering inside your browser memory. Your documents never touch our servers because we don&apos;t have any file storage backend.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            2. Transparent Unit Economics for COD Sellers
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            In emerging e-commerce markets across South Asia, the Middle East, and Latin America, Cash on Delivery (COD) powers over 75% of online transactions. Yet over 80% of independent store owners bleed capital because conventional profit calculators completely ignore Return to Origin (RTO) courier penalties and wasted ad spend.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <strong>EcomShield™</strong> unmasks this &quot;invisible leak&quot; by calculating true net take-home profits, breakeven customer acquisition costs (CAC), and the exact monetary loss incurred from customer refusals.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Architectural Guarantees
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              01. Serverless by Design
            </span>
            <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
              Zero File Retention
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We do not possess a database for user files. If a government subpoenaed our servers, we could not provide a single document scan because we do not have it.
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              02. 100% Free Forever
            </span>
            <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
              Ad-Supported Utility
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We believe privacy tools must remain universally accessible. ShieldTools is financed purely through non-intrusive web display advertising.
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              03. Viral Open Web
            </span>
            <h4 className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
              Embeddable Everywhere
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Any blog, dropshipping academy, or enterprise portal can embed our standalone widgets for their audience with one line of HTML code.
            </p>
          </div>
        </div>
      </div>

      {/* Mid In-Feed Ad */}
      <AdSlot id="about-mid" format="in-feed-banner" />

      {/* Action CTA */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Ready to protect your identity or audit your store?
        </h3>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/docshield"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
          >
            Launch DocShield™ Studio
          </Link>
          <Link
            href="/ecomshield"
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
          >
            Launch EcomShield™ Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
