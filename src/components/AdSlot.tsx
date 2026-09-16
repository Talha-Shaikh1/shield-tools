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
  const isConfigured = Boolean(client && slot);

  let dimensionsClass = "w-full max-w-[728px] h-[90px]";

  if (format === "sidebar-rectangle") {
    dimensionsClass = "w-full max-w-[300px] min-h-[250px]";
  } else if (format === "in-feed-banner") {
    dimensionsClass = "w-full min-h-[90px] sm:min-h-[100px]";
  } else if (format === "header-leaderboard") {
    dimensionsClass = "w-full max-w-[728px] min-h-[60px] sm:min-h-[90px]";
  }

  return (
    <div
      id={`ad-slot-${id}`}
      className={`relative mx-auto my-4 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/60 p-2 text-center transition-colors dark:border-slate-800/60 dark:bg-slate-900/30 ${dimensionsClass} ${className}`}
      aria-label="Advertisement"
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
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Advertisement
          </span>
          <span className="text-[11px] text-slate-400/80 dark:text-slate-500/80">
            Sponsored placement
          </span>
        </div>
      )}
    </div>
  );
};
