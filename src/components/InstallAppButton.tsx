"use client";

import React, { useState, useEffect } from "react";
import { Download, Smartphone, Monitor, Check, X, Sparkles, ExternalLink } from "lucide-react";

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

  useEffect(() => {
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
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
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
      <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50/60 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300">
        <Check className="h-3.5 w-3.5 text-emerald-500" />
        <span>App Installed</span>
      </span>
    );
  }

  let buttonClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-sm ";
  if (variant === "primary") {
    buttonClasses +=
      "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20 ";
  } else if (variant === "secondary") {
    buttonClasses +=
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ";
  } else {
    buttonClasses +=
      "border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 ";
  }

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={`${buttonClasses} ${className}`}
        title="Install ShieldTools as Desktop/Mobile App (No URL needed)"
      >
        <Download className="h-4 w-4" />
        <span>Install App</span>
      </button>

      {/* Guide Modal if prompt is not natively supported */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Install ShieldTools App
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Open directly from your Desktop or Home Screen
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              {isIos ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/60">
                  <span className="font-bold text-slate-900 dark:text-white">
                    On iPhone / iPad (Safari):
                  </span>
                  <ol className="mt-2 list-decimal pl-4 space-y-1 text-slate-500 dark:text-slate-400">
                    <li>Tap the <strong>Share</strong> button (box with upward arrow) at the bottom.</li>
                    <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                    <li>Tap <strong>&quot;Add&quot;</strong> in the top right.</li>
                  </ol>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/60">
                  <span className="font-bold text-slate-900 dark:text-white">
                    On Desktop (Chrome, Edge, Brave):
                  </span>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    Look at the right side of your browser address bar and click the <strong>Install</strong> icon (computer icon with down arrow ⊕), or click the browser menu (⋮) → <strong>&quot;Install ShieldTools&quot;</strong>.
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-3 text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
                <strong>💡 Tip:</strong> Once installed, ShieldTools acts as a native application with zero browser navigation bar, instant loading, and one-click access right from your taskbar or home screen!
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
