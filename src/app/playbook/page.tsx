"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Copy,
  Check,
  Search,
  Sparkles,
  Lock,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Image as ImageIcon,
  CheckCircle2,
  Bookmark,
  Share2,
  Sliders,
} from "lucide-react";
import playbookData from "@/data/playbookData.json";
import { InstallAppButton } from "@/components/InstallAppButton";

interface PlaybookDay {
  day: number;
  title: string;
  phase: number;
  phaseName: string;
  targetAudience: string;
  objective: string;
  postCopy: string;
  visualType: string;
  referenceAsset: string;
  aiPrompt: string;
  canvaOverlay: string;
  firstComment: string;
}

const PHASES = [
  { id: 0, label: "All Days (1–30)" },
  { id: 1, label: "Phase 1: Broken E-Commerce (1–7)" },
  { id: 2, label: "Phase 2: RAG Engineering (8–14)" },
  { id: 3, label: "Phase 3: Pre-Launch Teasers (15–20)" },
  { id: 4, label: "Phase 4: Grand Launch (21–30)" },
];

export default function PlaybookPrivatePage() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activePhase, setActivePhase] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Copy feedback states
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedComment, setCopiedComment] = useState(false);

  // Load completed days from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("botaura_playbook_completed");
      if (saved) {
        setCompletedDays(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleCompleted = (day: number) => {
    setCompletedDays((prev) => {
      const updated = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      try {
        localStorage.setItem("botaura_playbook_completed", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Filtered day list
  const filteredDays = useMemo(() => {
    return (playbookData as PlaybookDay[]).filter((item) => {
      const matchesPhase = activePhase === 0 || item.phase === activePhase;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(query) ||
        item.postCopy.toLowerCase().includes(query) ||
        item.aiPrompt.toLowerCase().includes(query) ||
        `day ${item.day}`.includes(query);
      return matchesPhase && matchesSearch;
    });
  }, [activePhase, searchQuery]);

  const currentItem = useMemo(() => {
    return (
      (playbookData as PlaybookDay[]).find((d) => d.day === selectedDay) ||
      (playbookData[0] as PlaybookDay)
    );
  }, [selectedDay]);

  const handleCopy = async (
    text: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const isCurrentCompleted = completedDays.includes(currentItem.day);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner with PWA Install CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                BOTAURA — 30-Day Launch & Authority Playbook
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                <Lock className="h-3 w-3" /> Private Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              1-Click Copy Ready • All 30 Days of Posts, AI Generation Prompts & First Comments
            </p>
          </div>
        </div>

        {/* Install App Button */}
        <div className="flex items-center gap-2">
          <InstallAppButton variant="primary" />
        </div>
      </div>

      {/* Main Container */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Filters, Search & Day List (4 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Phase Filter Tabs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter By Phase:
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PHASES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePhase(p.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    activePhase === p.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search post topic, prompt, day #..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-2 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/80 dark:text-white"
              />
            </div>
          </div>

          {/* Day Selection List */}
          <div className="max-h-[640px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 flex items-center justify-between px-2 text-[11px] font-bold text-slate-400">
              <span>{filteredDays.length} DAYS FOUND</span>
              <span>{completedDays.length}/30 COMPLETED</span>
            </div>

            <div className="space-y-1.5">
              {filteredDays.map((item) => {
                const isSelected = item.day === selectedDay;
                const isDone = completedDays.includes(item.day);
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setSelectedDay(item.day)}
                    className={`flex w-full items-center justify-between rounded-xl p-2.5 text-left transition ${
                      isSelected
                        ? "border border-blue-500/50 bg-blue-50 text-blue-900 dark:border-blue-500/40 dark:bg-blue-950/50 dark:text-white shadow-sm"
                        : "border border-transparent hover:bg-slate-50 text-slate-700 dark:hover:bg-slate-800/60 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : isDone
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {item.day}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold">{item.title}</p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {item.phaseName}
                        </p>
                      </div>
                    </div>

                    {isDone && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Day Content & One-Click Copy Workstations (8 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-8">
          {/* Active Day Header Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white text-base shadow-md shadow-blue-500/20">
                  {currentItem.day}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Day {currentItem.day} • {currentItem.phaseName}
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {currentItem.title}
                  </h2>
                </div>
              </div>

              {/* Status Mark Button */}
              <button
                type="button"
                onClick={() => toggleCompleted(currentItem.day)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                  isCurrentCompleted
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
                <span>{isCurrentCompleted ? "Posted on LinkedIn ✓" : "Mark as Posted"}</span>
              </button>
            </div>

            {/* Target Audience & Objective Badges */}
            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-850">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  Target Audience:
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {currentItem.targetAudience}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-850">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  Core Objective:
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {currentItem.objective}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 1: POST COPY WORKSTATION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Copy className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  LinkedIn Post Copy (Ready to Paste)
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(currentItem.postCopy, setCopiedPost)}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
              >
                {copiedPost ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Post Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Full Post</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50 p-4 font-sans text-xs sm:text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 whitespace-pre-line select-all">
              {currentItem.postCopy}
            </div>
          </div>

          {/* CARD 2: AI IMAGE PROMPT WORKSTATION */}
          <div className="rounded-2xl border border-purple-200/80 bg-white p-5 shadow-sm dark:border-purple-900/40 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    AI Visual Prompt (Midjourney / Ideogram 2.0)
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    Type: {currentItem.visualType}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(currentItem.aiPrompt, setCopiedPrompt)}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-purple-600/20 transition hover:bg-purple-700"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Prompt Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy AI Prompt</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-purple-200/60 bg-purple-50/40 p-4 font-mono text-xs leading-relaxed text-purple-950 dark:border-purple-900/30 dark:bg-purple-950/20 dark:text-purple-200 select-all">
              {currentItem.aiPrompt || "No prompt specified for this day."}
            </div>

            {currentItem.canvaOverlay && (
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">🎨 Canva Overlay Guide:</strong>{" "}
                {currentItem.canvaOverlay}
              </div>
            )}
          </div>

          {/* CARD 3: FIRST COMMENT COPY */}
          {currentItem.firstComment && (
            <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-sm dark:border-emerald-900/40 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      First Comment Copy
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Post immediately after publishing to trigger algorithm reach
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(currentItem.firstComment, setCopiedComment)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  {copiedComment ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Comment Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy First Comment</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-200/60 bg-emerald-50/40 p-3.5 text-xs leading-relaxed text-emerald-950 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-200 select-all">
                &ldquo;{currentItem.firstComment}&rdquo;
              </div>
            </div>
          )}

          {/* Navigation Bar (Prev / Next) */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              disabled={selectedDay <= 1}
              onClick={() => setSelectedDay((prev) => Math.max(1, prev - 1))}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Day</span>
            </button>

            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Day {currentItem.day} of 30
            </span>

            <button
              type="button"
              disabled={selectedDay >= 30}
              onClick={() => setSelectedDay((prev) => Math.min(30, prev + 1))}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span>Next Day</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
