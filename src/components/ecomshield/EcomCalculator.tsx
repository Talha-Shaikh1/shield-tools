"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Percent,
  Flame,
  FileText,
  Share2,
  Check,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  Package,
  Truck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  EcomInputs,
  CURRENCIES,
  DEFAULT_INPUTS,
  calculateEcomMetrics,
  formatCurrency,
  generateWhatsAppSummary,
} from "@/utils/ecomCalculations";
import { exportEcomReportToPdf } from "@/utils/pdfExport";
import { HealthIndicator } from "./HealthIndicator";

export const EcomCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<EcomInputs>(DEFAULT_INPUTS);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Compute metrics dynamically
  const results = useMemo(() => {
    return calculateEcomMetrics(inputs);
  }, [inputs]);

  // Handle currency selection
  const handleCurrencyChange = (code: string) => {
    const selected = CURRENCIES.find((c) => c.code === code);
    if (!selected) return;

    // Smart default conversions based on regional typical product prices
    let newDefaults = { ...inputs, currency: selected.code, currencySymbol: selected.symbol };
    if (selected.code === "USD") {
      newDefaults = {
        ...newDefaults,
        sellingPrice: 49,
        productCost: 14,
        adSpendPerOrder: 15,
        deliveryFeeCharged: 0,
        courierFeePaid: 5.5,
        courierReturnPenalty: 6,
        packagingCost: 1.5,
        platformCommissionPct: 5,
        returnRatePct: 15,
      };
    } else if (selected.code === "AED" || selected.code === "SAR") {
      newDefaults = {
        ...newDefaults,
        sellingPrice: 120,
        productCost: 35,
        adSpendPerOrder: 30,
        deliveryFeeCharged: 0,
        courierFeePaid: 18,
        courierReturnPenalty: 18,
        packagingCost: 4,
        platformCommissionPct: 5,
        returnRatePct: 20,
      };
    } else if (selected.code === "INR") {
      newDefaults = {
        ...newDefaults,
        sellingPrice: 1299,
        productCost: 380,
        adSpendPerOrder: 320,
        deliveryFeeCharged: 0,
        courierFeePaid: 85,
        courierReturnPenalty: 95,
        packagingCost: 25,
        platformCommissionPct: 8,
        returnRatePct: 22,
      };
    } else if (selected.code === "PKR") {
      newDefaults = { ...DEFAULT_INPUTS };
    }
    setInputs(newDefaults);
  };

  const handleCopyWhatsapp = async () => {
    const text = generateWhatsAppSummary(inputs, results);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 3000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      await exportEcomReportToPdf(inputs, results);
    } catch (err) {
      console.error("Failed to export PDF", err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const sym = inputs.currencySymbol;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controls Bar: Currency & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Select Currency:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCurrencyChange(c.code)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  inputs.currency === c.code
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {c.code} ({c.symbol})
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setInputs(DEFAULT_INPUTS)}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Input Fields (6 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              1. Pricing & Product Costs
            </h3>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Selling Price */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Selling Price to Customer</span>
                  <span className="text-slate-400">{sym}</span>
                </div>
                <input
                  type="number"
                  value={inputs.sellingPrice}
                  onChange={(e) =>
                    setInputs({ ...inputs, sellingPrice: Number(e.target.value) || 0 })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Product Cost (COGS) */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Product Wholesale Cost (COGS)</span>
                  <span className="text-slate-400">{sym}</span>
                </div>
                <input
                  type="number"
                  value={inputs.productCost}
                  onChange={(e) =>
                    setInputs({ ...inputs, productCost: Number(e.target.value) || 0 })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Ad Spend per Order (CAC) */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Ad Spend per Order (CAC / CPA)</span>
                  <span className="text-slate-400">{sym}</span>
                </div>
                <input
                  type="number"
                  value={inputs.adSpendPerOrder}
                  onChange={(e) =>
                    setInputs({ ...inputs, adSpendPerOrder: Number(e.target.value) || 0 })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Delivery Fee Charged to Customer */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Delivery Charged to Customer</span>
                  <span className="text-[10px] text-slate-400">0 = Free Shipping</span>
                </div>
                <input
                  type="number"
                  value={inputs.deliveryFeeCharged}
                  onChange={(e) =>
                    setInputs({ ...inputs, deliveryFeeCharged: Number(e.target.value) || 0 })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Shipping & Fulfillment Costs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              2. Courier & Fulfillment Friction
            </h3>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Courier Delivery Fee Paid */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Actual Courier Delivery Fee Paid</span>
                  <span className="text-slate-400">{sym}</span>
                </div>
                <input
                  type="number"
                  value={inputs.courierFeePaid}
                  onChange={(e) =>
                    setInputs({ ...inputs, courierFeePaid: Number(e.target.value) || 0 })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Courier Return Penalty (The Killer Cost) */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
                  <span>Courier Return Penalty (Reverse Fee)</span>
                  <span className="text-xs">⚠️</span>
                </div>
                <input
                  type="number"
                  value={inputs.courierReturnPenalty}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      courierReturnPenalty: Number(e.target.value) || 0,
                    })
                  }
                  className="mt-1.5 w-full rounded-xl border border-rose-300 bg-rose-50/20 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-rose-500 focus:outline-none dark:border-rose-900/60 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Packaging & Labeling Cost */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Flyer, Box & Labeling Cost</span>
                  <span className="text-slate-400">{sym}</span>
                </div>
                <input
                  type="number"
                  value={inputs.packagingCost}
                  onChange={(e) =>
                    setInputs({ ...inputs, packagingCost: Number(e.target.value) || 0 })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Platform Commission Fee % */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Platform Commission / Gateway</span>
                  <span className="text-slate-400">%</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max="40"
                  step="0.5"
                  value={inputs.platformCommissionPct}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      platformCommissionPct: Number(e.target.value) || 0,
                    })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Critical Return Rate Slider (RTO) */}
          <div className="rounded-2xl border-2 border-blue-500/40 bg-blue-50/30 p-5 shadow-sm dark:border-blue-500/30 dark:bg-blue-950/20">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-block rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Critical COD Metric
                </span>
                <h4 className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white">
                  Expected Return to Origin (RTO) Rate
                </h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {inputs.returnRatePct}%
                </span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                  {results.returnedOrders} returns per 100
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={inputs.returnRatePct}
              onChange={(e) =>
                setInputs({ ...inputs, returnRatePct: parseInt(e.target.value) || 0 })
              }
              className="mt-4 w-full cursor-pointer h-2 bg-slate-200 rounded-lg dark:bg-slate-700"
            />

            <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span>0% (Prepaid/Ideal)</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">20% (Typical COD)</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">50% (High Risk)</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Dynamic Analytics, The Eye-Opener Card & Diagnostics (6 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-6">
          {/* THE EYE-OPENER CARD: Total Money Lost to Returns */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-rose-500 bg-gradient-to-br from-rose-500 to-rose-600 p-6 text-white shadow-xl shadow-rose-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                  <Flame className="h-5 w-5 text-white" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-100">
                  The Eye-Opener Card
                </span>
              </div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                {results.returnedOrders} Parcels Refused
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-medium text-rose-100">
                Total Cash Burned Purely on Returns (Per 100 Orders):
              </span>
              <div className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-white">
                {formatCurrency(results.totalMoneyLostToReturns, sym)}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-rose-100/90">
                Includes {formatCurrency(results.returnedOrders * inputs.adSpendPerOrder, sym)} in wasted ad spend, {formatCurrency(results.totalReturnPenalties, sym)} in courier return penalties, and {formatCurrency(results.returnedOrders * inputs.packagingCost, sym)} in ruined packaging.
              </p>
            </div>
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* True Take-Home Profit */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                True Net Take-Home
              </span>
              <div className={`mt-1 text-xl sm:text-2xl font-black ${
                results.trueNetProfit100 >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}>
                {formatCurrency(results.trueNetProfit100, sym)}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Per 100 dispatched orders
              </span>
            </div>

            {/* Net Profit Margin % */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Real Net Margin
              </span>
              <div className={`mt-1 text-xl sm:text-2xl font-black ${
                results.netProfitMarginPct >= 20
                  ? "text-emerald-600 dark:text-emerald-400"
                  : results.netProfitMarginPct >= 5
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}>
                {results.netProfitMarginPct.toFixed(1)}%
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Bottom-line percentage
              </span>
            </div>

            {/* Profit Per Delivered Order */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Delivered Order Profit
              </span>
              <div className="mt-1 text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {formatCurrency(results.netProfitPerDelivered, sym)}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                On successful delivery
              </span>
            </div>

            {/* Maximum Tolerable CAC */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Breakeven Ad Spend
              </span>
              <div className="mt-1 text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400">
                {formatCurrency(results.maxTolerableCAC, sym)}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Max tolerable CAC
              </span>
            </div>
          </div>

          {/* Diagnostic Business Health Status */}
          <HealthIndicator results={results} />

          {/* Export & WhatsApp Share Bar */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleCopyWhatsapp}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              {copiedWhatsapp ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span>Copy WhatsApp Breakdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isExportingPdf}
              onClick={handleExportPdf}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 disabled:opacity-50"
            >
              <FileText className="h-4 w-4 text-blue-500" />
              <span>{isExportingPdf ? "Generating..." : "Download PDF Report"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
