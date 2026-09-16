import React from "react";
import { Shield, AlertTriangle, Scale, Lock, CheckCircle } from "lucide-react";

export const DocShieldFaq: React.FC = () => {
  return (
    <section className="mt-12 space-y-10 border-t border-slate-200/80 pt-10 dark:border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
          Digital Identity Protection Guide
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Why Unprotected ID Copies Are the #1 Cause of Identity Theft
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Learn how fraudsters exploit un-watermarked government identity cards, passports, and utility bills, and how client-side watermarking safeguards your legal identity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Common Identity Theft Scams in 2026
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Every day, individuals share photos of their National Identity Cards (CNIC, Aadhaar, SSN, Passport) for routine transactions like renting an apartment, verifying a telecom SIM card, or onboarding at a new freelance gig. Unscrupulous middlemen frequently harvest these unprotected photos to:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Register unauthorized mobile SIM cards used for smishing and extortion scams.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Open digital burner bank accounts or cryptocurrency exchange wallets for laundering.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Take out micro-loans and pay-later credits in your name without your knowledge.</span>
            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Why You Must Never Send Clean ID Scans
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            A pristine, un-watermarked photo of your national ID card is the holy grail for identity thieves because automated Optical Character Recognition (OCR) systems and human compliance reviewers cannot distinguish whether you authorized this specific use case.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            By applying a permanent, diagonal security watermark indicating the specific recipient (e.g. <em>&quot;FOR SIM ISSUANCE ONLY — SUBMITTED TO JAZZ&quot;</em>), you render the scan useless for opening a bank account or signing a rental lease.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Scale className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Legal Validity & KYC Acceptance
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Many users mistakenly fear that banks or employers will reject watermarked ID scans. In reality, modern compliance directives (including GDPR Article 5, SBP KYC guidelines, and RBI digital lending rules) explicitly encourage purpose-limited documentation.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            As long as the essential legal fields (full name, identification number, photo, and dates) remain legible through a semi-transparent opacity (30%–40%), legitimate compliance teams accept and appreciate the security measure.
          </p>
        </div>
      </div>

      {/* Accordion FAQ items */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions About DocShield™
        </h3>
        <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
          <div className="py-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Does ShieldTools store my National ID Card or Passport photos?
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>No. Never.</strong> ShieldTools operates on a 100% client-side architecture. When you pick or drop an image into DocShield, your browser loads the file directly into local memory (HTML5 Canvas). The image data never leaves your computer or phone, and no server call is ever made. You can even disconnect your internet Wi-Fi before watermarking and downloading!
            </p>
          </div>

          <div className="py-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Why should I prefer the &quot;Security Grid&quot; pattern over a single stamp?
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              A single watermark stamp placed in an open corner can be easily cropped or edited using AI generative fill tools. The diagonal repeated grid overlays across the entire face of the document at staggered coordinates, making automated or manual removal practically impossible without visibly ruining the document.
            </p>
          </div>

          <div className="py-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              What opacity level should I choose?
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              We recommend <strong>35%</strong>. This provides optimal contrast: the security purpose is immediately apparent to any human inspector, while the underlying text, numbers, signature, and facial photo remain completely legible for official KYC compliance verification.
            </p>
          </div>

          <div className="py-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Can I merge the front and back of my CNIC or Driver License onto one page?
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Yes! Switch to <strong>&quot;Front & Back (Dual ID)&quot;</strong> mode, upload both sides, and DocShield will automatically balance the aspect ratios, apply the watermarks independently, and merge them into a single side-by-side or stacked printable PNG, JPG, or PDF file ready to send via WhatsApp or email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
