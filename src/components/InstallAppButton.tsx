"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  DownloadCloud,
  Smartphone,
  Monitor,
  Check,
  X,
  Sparkles,
  ArrowDownToLine,
  ArrowRight,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface InstallAppButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "pill";
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({
  className = "",
  variant = "primary",
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if prompt was already captured by early head script
    if (typeof window !== "undefined" && (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent }).__pwaPrompt) {
      setDeferredPrompt((window as unknown as { __pwaPrompt: BeforeInstallPromptEvent }).__pwaPrompt);
    }

    // Check if already running in standalone mode
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsInstalled(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const onPwaReady = () => {
      if ((window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent }).__pwaPrompt) {
        setDeferredPrompt((window as unknown as { __pwaPrompt: BeforeInstallPromptEvent }).__pwaPrompt);
      }
    };

    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent }).__pwaPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("pwa-ready", onPwaReady);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent | null }).__pwaPrompt = null;
      setShowModal(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("pwa-ready", onPwaReady);
    };
  }, []);

  const handleInstallClick = async () => {
    // 1. Try to invoke native prompt directly
    const promptEvent =
      deferredPrompt || (typeof window !== "undefined" && (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent | null }).__pwaPrompt);

    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === "accepted") {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
        if (typeof window !== "undefined") {
          (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent | null }).__pwaPrompt = null;
        }
        return;
      } catch (err) {
        console.error("Direct install prompt error", err);
      }
    }

    // 2. Fallback to clean, VIP visual guide modal
    setShowModal(true);
  };

  if (isInstalled) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50/70 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300">
        <Check className="h-3.5 w-3.5 text-emerald-500" />
        <span>App Installed</span>
      </span>
    );
  }

  let buttonClasses =
    "relative group overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 shadow-sm ";
  if (variant === "primary") {
    buttonClasses +=
      "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-95 ";
  } else if (variant === "secondary") {
    buttonClasses +=
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ";
  } else {
    buttonClasses +=
      "border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 ";
  }

  const modalContent = showModal && mounted ? (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        {/* VIP Logo Icon & Header */}
        <div className="flex items-center gap-3.5">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20 bg-slate-900 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-192.png" alt="ShieldTools VIP App Icon" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              Install ShieldTools App
            </h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Native Desktop & Mobile Shortcut</span>
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-5 space-y-3">
          {isIos ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                iPhone / iPad (Safari):
              </span>
              <ol className="mt-2 list-decimal pl-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>Tap the <strong>Share</strong> button (box with arrow ⎋).</li>
                <li>Scroll down and select <strong>&quot;Add to Home Screen ⊞&quot;</strong>.</li>
                <li>Tap <strong>&quot;Add&quot;</strong> in top right.</li>
              </ol>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Desktop Chrome / Edge / Brave:
              </span>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Click the <strong>Install icon (⊕)</strong> on the right side of your browser URL bar, or click browser menu (<strong>⋮</strong>) → <strong>&quot;Install ShieldTools&quot;</strong>.
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-3.5 text-xs text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-300">
            <p className="font-semibold">⚡ Zero URL Needed:</p>
            <p className="mt-0.5 text-[11px] opacity-90">
              ShieldTools will launch as a standalone desktop app right from your taskbar or phone home screen with 1 click.
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={`${buttonClasses} ${className}`}
        title="Install ShieldTools as Desktop/Mobile App (No URL needed)"
      >
        <div className="flex items-center gap-1.5">
          <DownloadCloud className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          <span>Install App</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping" />
        </div>
      </button>

      {/* Render directly onto document.body so it NEVER renders behind navbar */}
      {mounted && typeof document !== "undefined" && modalContent
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
};
