"use client";

import React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { EcomResults } from "@/utils/ecomCalculations";

interface HealthIndicatorProps {
  results: EcomResults;
}

export const HealthIndicator: React.FC<HealthIndicatorProps> = ({ results }) => {
  const isHealthy = results.healthStatus === "healthy";
  const isVulnerable = results.healthStatus === "vulnerable";

  const containerClasses = isHealthy
    ? "border-emerald-500/30 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-950/20"
    : isVulnerable
    ? "border-amber-500/30 bg-amber-50/50 dark:border-amber-500/20 dark:bg-amber-950/20"
    : "border-rose-500/30 bg-rose-50/50 dark:border-rose-500/20 dark:bg-rose-950/20";

  const Icon = isHealthy
    ? CheckCircle2
    : isVulnerable
    ? AlertTriangle
    : AlertCircle;

  const iconColor = isHealthy
    ? "text-emerald-600 dark:text-emerald-400"
    : isVulnerable
    ? "text-amber-600 dark:text-amber-400"
    : "text-rose-600 dark:text-rose-400";

  return (
    <div className={`rounded-2xl border p-5 transition-all shadow-sm ${containerClasses}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {results.healthTitle}
            </h4>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Diagnostic Status
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {results.healthDescription}
          </p>

          {/* Actionable recommendations */}
          <div className="mt-4 border-t border-black/5 dark:border-white/5 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
              <span>Action Plan to Cut Return Losses & Protect Capital:</span>
            </div>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {results.actionableTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
