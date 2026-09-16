"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  DownloadCloud,
  Smartphone,
  Monitor,
  Check,
  X,
  Sparkles,
  ExternalLink,
  ArrowDownToLine,
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
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Register service worker for PWA installability
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("ShieldTools Service Worker active"))
        .catch((err) => console.log("SW register notice", err));
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

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    setIsInstalling(true);
    setTimeout(() => setIsInstalling(false), 2000);

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error("Install prompt error", err);
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
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
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
            <ArrowDownToLine className="h-6 w-6 animate-bounce" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Install ShieldTools App
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct access from your Desktop or Mobile Home Screen
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
          {isIos ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <span className="font-bold text-slate-900 dark:text-white">
                iPhone / iPad (Safari) Instructions:
              </span>
              <ol className="mt-2 list-decimal pl-4 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>Tap the <strong>Share</strong> button (box with upward arrow ⎋) in Safari.</li>
                <li>Scroll down and select <strong>&quot;Add to Home Screen ⊞&quot;</strong>.</li>
                <li>Tap <strong>&quot;Add&quot;</strong> in the top right corner.</li>
              </ol>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <span className="font-bold text-slate-900 dark:text-white">
                Desktop (Chrome, Edge, Brave, Android):
              </span>
              <p className="mt-1.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                Click the <strong>Install icon (⊕)</strong> on the right side of your browser address bar, or click browser menu (<strong>⋮</strong>) → <strong>&quot;Install ShieldTools&quot;</strong>.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-3 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-300">
            <strong>⚡ No URL Needed:</strong> Once installed, ShieldTools launches in fullscreen mode with zero browser address bar, instant loading, and 1-click access directly from your taskbar or phone home screen.
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Got It, Thanks!
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
          <DownloadCloud className={`h-4 w-4 ${isInstalling ? "animate-pulse" : "group-hover:-translate-y-0.5 transition-transform"}`} />
          <span>Install App</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping" />
        </div>
      </button>

      {/* Render modal directly in document.body via Portal so it NEVER goes behind the navbar */}
      {mounted && typeof document !== "undefined" && modalContent
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
};
