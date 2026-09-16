import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Heart, Globe2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/70">
      {/* Privacy guarantee highlight banner */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-3 dark:border-slate-800/50 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
          <Lock className="h-3.5 w-3.5 text-emerald-500" />
          <span>
            <strong className="text-slate-800 dark:text-slate-200">100% Client-Side Privacy:</strong>{" "}
            All watermark processing and financial calculations happen directly inside your web browser. Zero files or metrics are ever uploaded to any server.
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Shield<span className="text-blue-600 dark:text-blue-400">Tools</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              ShieldTools is an independent privacy and profitability utility suite built for digital citizens, freelancers, job seekers, and e-commerce entrepreneurs worldwide.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <Globe2 className="h-3.5 w-3.5 text-blue-500" /> Free Global Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="h-3.5 w-3.5 text-emerald-500" /> Zero Data Retention
              </span>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Free Utilities
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/docshield"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  DocShield™ Watermark Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/ecomshield"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  EcomShield™ Profit Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/embed/watermark"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Watermark Embed Widget
                </Link>
              </li>
              <li>
                <Link
                  href="/embed/ecom-calculator"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Ecom Calculator Widget
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Research & Legal
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/blog"
                  className="text-slate-500 font-semibold transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  Blog & AEO Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  About Us & Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Terms of Service & Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Contact & Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-10 border-t border-slate-200/80 pt-6 dark:border-slate-800/80">
          <p className="text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
            Disclaimer: ShieldTools provides informational and utility software for identity fraud deterrence and business unit economics estimation. It does not constitute formal legal, accounting, tax, or banking advice. Always comply with local statutory document verification guidelines.
          </p>
          <div className="mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row text-xs text-slate-400 dark:text-slate-500">
            <p>© {new Date().getFullYear()} ShieldTools. Built with digital sovereignty in mind.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for privacy & entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
