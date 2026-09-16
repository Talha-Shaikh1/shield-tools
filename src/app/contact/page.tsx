"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle2, Send, HelpCircle } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    // Client-side confirmation
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Top Header Ad */}
      <AdSlot id="contact-top" format="header-leaderboard" />

      <div className="text-center">
        <span className="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
          Support & Feedback
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Contact the ShieldTools Team
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Have questions about document security, suggestions for new calculation features, or advertising inquiries? We would love to hear from you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Cards (5 cols) */}
        <div className="flex flex-col gap-4 md:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Direct Email
                </h4>
                <a
                  href="mailto:support@shieldtools.io"
                  className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  support@shieldtools.io
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Response Expectation
                </h4>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Typically within 24 to 48 business hours
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Feature Requests
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Want support for specific country ID formats or courier metrics? Send your request!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:col-span-7">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                Message Sent Successfully!
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                Thank you for contacting ShieldTools. A member of our team will review your inquiry and get back to you shortly at {email}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Send Us a Note
              </h3>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-850 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-850 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Subject / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-850 dark:text-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="feature">New Feature / Stamp Request</option>
                  <option value="bug">Report an Issue / Bug</option>
                  <option value="advertising">Advertising & Sponsorship</option>
                  <option value="legal">Privacy / Legal Question</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-850 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Ad */}
      <AdSlot id="contact-bottom" format="in-feed-banner" />
    </div>
  );
}
