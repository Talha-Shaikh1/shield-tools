"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const PRESET_STAMPS = [
  { label: "SIM Verification", text: "FOR SIM VERIFICATION ONLY", color: "#dc2626" },
  { label: "Job Application", text: "FOR JOB APPLICATION ONLY", color: "#1d4ed8" },
  { label: "Bank / Loan KYC", text: "FOR BANK / LOAN KYC ONLY", color: "#dc2626" },
  { label: "Property Lease", text: "FOR PROPERTY LEASE ONLY", color: "#1e293b" },
  { label: "Telecom Only", text: "FOR TELECOM / VERIFICATION ONLY", color: "#1d4ed8" },
];

interface PresetStampsProps {
  currentText: string;
  onSelect: (text: string, suggestedColor?: string) => void;
}

export const PresetStamps: React.FC<PresetStampsProps> = ({
  currentText,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <Sparkles className="h-3.5 w-3.5 text-blue-500" />
        <span>One-Click Preset Purpose Stamps</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PRESET_STAMPS.map((stamp) => {
          const isSelected = currentText.toUpperCase() === stamp.text;
          return (
            <button
              key={stamp.label}
              type="button"
              onClick={() => onSelect(stamp.text, stamp.color)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-850"
              }`}
            >
              🔘 {stamp.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
