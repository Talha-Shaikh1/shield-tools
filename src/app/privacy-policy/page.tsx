import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, Cookie, Eye, CheckCircle2 } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Privacy Policy & GDPR/CCPA Compliance | ShieldTools",
  description:
    "Review our transparent Privacy Policy detailing our 100% client-side zero-server file processing, Google AdSense cookie usage, and GDPR/CCPA rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Top Header Ad */}
      <AdSlot id="privacy-top" format="header-leaderboard" />

      <div className="text-center">
        <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          Transparency & Legal Compliance
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Last updated: September 16, 2026 • Compliant with GDPR, CCPA, and Google Publisher Policies
        </p>
      </div>

      <div className="mt-10 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {/* Core Guarantee */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-4 dark:border-emerald-500/20 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold">
            <Lock className="h-4 w-4" />
            <span>Core Privacy Axiom: Zero Server-Side File Retention</span>
          </div>
          <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
            ShieldTools (operating at tools.talhaweb.xyz) does not collect, transmit, store, or view any image, national ID card, passport, document, or financial parameter you input into our tools. All processing happens entirely within your web browser using HTML5 client-side memory.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Information We Do NOT Collect
          </h2>
          <p>
            When utilizing <strong>DocShield™</strong>, your identity card scans, photos, names, registration numbers, and purpose stamps are rendered directly onto an HTML5 Canvas element executed by your browser&apos;s local JavaScript runtime. At no point in time does any image data get uploaded to an external web server, cloud bucket (such as AWS S3 or Google Cloud Storage), or database.
          </p>
          <p>
            When utilizing <strong>EcomShield™</strong>, all sales numbers, costs, marketing spend, and profit margins are calculated in transient client memory. We do not maintain any seller databases, accounting records, or store performance logs.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Log Files & Analytics
          </h2>
          <p>
            Like standard web servers across the internet, our hosting provider automatically records standard non-personally identifiable log information when you access the website. This information may include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Internet Protocol (IP) addresses</li>
            <li>Browser type and operating system version</li>
            <li>Referring / exit pages and timestamp</li>
            <li>Aggregated page visit counts</li>
          </ul>
          <p>
            This data is used solely for analyzing system health, detecting malicious DDoS attacks, and administering the static hosting infrastructure.
          </p>
        </section>

        {/* Section 3: Advertising & Cookies */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Cookies & Google AdSense Advertising
          </h2>
          <p>
            ShieldTools is a 100% free public service funded by contextual and personalized digital advertising. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites across the internet.
          </p>
          <p>
            <strong>Google&apos;s use of advertising cookies:</strong> Google and its partner advertising networks use cookies (such as the DoubleClick DART cookie) to serve ads to visitors based on their visit to ShieldTools and other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-semibold dark:text-blue-400"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-semibold dark:text-blue-400"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        {/* Section 4: GDPR */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. General Data Protection Regulation (GDPR) Compliance
          </h2>
          <p>
            For users residing within the European Economic Area (EEA) and United Kingdom, ShieldTools adheres strictly to the data minimization principle (Article 5(1)(c) of GDPR). Because we do not store personal data or document copies:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>There is no personal data to access, rectify, or erase under Articles 15–17.</li>
            <li>There are no cross-border document transfers to third countries.</li>
            <li>No biometric or identity records are harvested or processed.</li>
          </ul>
        </section>

        {/* Section 5: CCPA */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5. California Consumer Privacy Act (CCPA) Rights
          </h2>
          <p>
            Under the California Consumer Privacy Act (CCPA), California residents have the right to request disclosure of categories of personal data collected and request deletion. ShieldTools <strong>does not sell or share personal information</strong> of consumers as defined under the CCPA.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            6. Changes to this Policy
          </h2>
          <p>
            We may update our Privacy Policy periodically to reflect changes in regulatory standards or tool capabilities. Any modifications will be posted on this page with an updated revision date.
          </p>
        </section>
      </div>

      {/* Bottom In-Feed Ad */}
      <AdSlot id="privacy-bottom" format="in-feed-banner" />
    </div>
  );
}
