import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ShieldCheck, Calculator, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Blog & Intelligence Guides | ShieldTools",
  description:
    "Authoritative, in-depth guides on digital identity security, CNIC privacy protection, and cash-on-delivery (COD) e-commerce unit economics.",
  keywords: [
    "watermark CNIC guide",
    "how to watermark national ID",
    "RTO e-commerce meaning",
    "COD return rate reduction",
    "digital KYC privacy",
    "dropshipping profit math",
  ],
};

const POSTS = [
  {
    slug: "how-to-watermark-cnic-safely",
    title: "How to Watermark CNIC & National ID Cards Safely: The Complete 2026 Guide",
    summary:
      "A step-by-step guide explaining how to stamp purpose-specific watermarks onto your ID card, why cloud converters put you at risk, and legal KYC validity.",
    category: "Identity Privacy",
    date: "September 16, 2026",
    readTime: "6 min read",
    icon: ShieldCheck,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/40",
  },
  {
    slug: "ecom-rto-calculator-guide",
    title: "The True Cost of RTO: How Return Rates Destroy COD Dropshipping Profits",
    summary:
      "Why standard margin calculators lie. Discover the real formula that factors in courier return penalties, wasted ad spend (CAC), and packaging write-offs.",
    category: "E-Commerce Profitability",
    date: "September 15, 2026",
    readTime: "8 min read",
    icon: Calculator,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900/40",
  },
  {
    slug: "prevent-identity-theft-digital-kyc",
    title: "Digital KYC Fraud Prevention: How Criminals Use Stolen ID Photos & How to Stop Them",
    summary:
      "Learn how rogue telecom agents and loan apps exploit un-watermarked identity scans to register fraudulent SIMs and launder money.",
    category: "Fraud Prevention",
    date: "September 14, 2026",
    readTime: "7 min read",
    icon: ShieldCheck,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900/40",
  },
  {
    slug: "5-ways-to-reduce-cod-returns",
    title: "5 Battle-Tested Strategies to Reduce COD Return Rates (RTO) by 35%",
    summary:
      "Actionable techniques used by 8-figure e-commerce brands: automated WhatsApp confirmation, prepaid incentives, NDR workflows, and rider coordination.",
    category: "E-Commerce Growth",
    date: "September 12, 2026",
    readTime: "9 min read",
    icon: Calculator,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/40",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Header Ad */}
      <AdSlot id="blog-index-top" format="header-leaderboard" />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
          <BookOpen className="h-3.5 w-3.5" />
          <span>ShieldTools Intelligence & Research</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Digital Privacy & COD Unit Economics
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
          Deep dives, research breakdowns, and actionable guides designed to safeguard your personal identity and protect your business profits.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {POSTS.map((post) => {
          const Icon = post.icon;
          return (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-500/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${post.badgeColor}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="mt-4 text-lg font-bold text-slate-900 hover:text-blue-600 transition dark:text-white dark:hover:text-blue-400">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Mid In-Feed Ad */}
      <AdSlot id="blog-index-mid" format="in-feed-banner" className="my-10" />

      {/* Tools Quick Jump */}
      <div className="rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 p-6 sm:p-8 dark:border-blue-900/40 dark:bg-gradient-to-br dark:from-slate-900 dark:to-blue-950/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Free Client-Side Tools
            </span>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Try the utilities mentioned in these articles
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              100% private, no sign-up required, works right in your browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/docshield"
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
            >
              DocShield™ Watermark
            </Link>
            <Link
              href="/ecomshield"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              EcomShield™ Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
