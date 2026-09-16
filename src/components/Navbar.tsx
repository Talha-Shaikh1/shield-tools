"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Calculator,
  FileCheck2,
  Code2,
  Sun,
  Moon,
  Lock,
  Menu,
  X,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { EmbedModal } from "./EmbedModal";

import { InstallAppButton } from "./InstallAppButton";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navItems = [
    {
      name: "DocShield (ID Watermark)",
      href: "/docshield",
      icon: FileCheck2,
    },
    {
      name: "EcomShield (RTO Calculator)",
      href: "/ecomshield",
      icon: Calculator,
    },
    {
      name: "Blog & Guides",
      href: "/blog",
      icon: BookOpen,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950">
                <Lock className="h-2 w-2 text-white stroke-[2.5]" />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Shield<span className="text-blue-600 dark:text-blue-400">Tools</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
                100% Client-Side Privacy Suite
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-2.5 md:flex">
            {/* Install App Button */}
            <InstallAppButton variant="primary" />

            {/* Embed Trigger Button */}
            <button
              onClick={() => setIsEmbedOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <Code2 className="h-4 w-4 text-blue-500" />
              <span>&lt;/&gt; Embed</span>
            </button>

            {/* Dual Mode Switcher (Dark / Light) */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100/90 p-0.5 dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  resolvedTheme === "light"
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="Light Mode"
              >
                <Sun className="h-3.5 w-3.5" />
                <span className="text-[11px]">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  resolvedTheme === "dark"
                    ? "bg-slate-800 text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
                title="Dark Mode"
              >
                <Moon className="h-3.5 w-3.5" />
                <span className="text-[11px]">Dark</span>
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Dual Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dual mode"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-xl dark:border-slate-800 dark:bg-slate-950 md:hidden animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsEmbedOpen(true);
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20"
              >
                <Code2 className="h-4 w-4" />
                <span>&lt;/&gt; Embed on Your Site</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <EmbedModal
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
        defaultTool={pathname === "/ecomshield" ? "ecom-calculator" : "watermark"}
      />
    </>
  );
};
