"use client";

import React from "react";

export type AdFormat = "header-leaderboard" | "sidebar-rectangle" | "in-feed-banner";

interface AdSlotProps {
  id: string;
  format: AdFormat;
  client?: string; // e.g. ca-pub-xxxxxxxx
  slot?: string; // e.g. 1234567890
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id,
  format,
  client,
  slot,
  className = "",
}) => {
  // If publisher ID is provided, an actual adsbygoogle snippet can be loaded
  const isConfigured = Boolean(client && slot);

  let dimensionsClass = "w-full max-w-[728px] h-[90px]";
  let label = "728 × 90 Leaderboard";

  if (format === "sidebar-rectangle") {
    dimensionsClass = "w-full max-w-[300px] min-h-[250px] sm:min-h-[300px]";
    label = "300 × 250 / 300 × 600 Sidebar Ad";
  } else if (format === "in-feed-banner") {
    dimensionsClass = "w-full min-h-[100px] sm:min-h-[120px]";
    label = "In-Feed Responsive Native Ad";
  } else if (format === "header-leaderboard") {
    dimensionsClass = "w-full max-w-[728px] min-h-[60px] sm:min-h-[90px]";
    label = "728 × 90 Desktop / 320 × 50 Mobile Leaderboard";
  }

  return (
    <div
      id={`ad-container-${id}`}
      className={`relative mx-auto my-4 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300/80 bg-slate-100/50 p-3 text-center dark:border-slate-800/80 dark:bg-slate-900/40 ${dimensionsClass} ${className}`}
      aria-label="Advertisement slot"
    >
      {isConfigured ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">
              Sponsor Space
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
            {label}
          </p>
          <span className="text-[10px] text-slate-400 dark:text-slate-600">
            Ready for Google AdSense • Monetag • Mediavine
          </span>
        </div>
      )}
    </div>
  );
};
