import React from "react";
import { TrendingUp, TrendingDown, ShieldAlert, CheckCircle2, DollarSign, Truck, AlertOctagon } from "lucide-react";

export const EcomFaq: React.FC = () => {
  return (
    <section className="mt-12 space-y-10 border-t border-slate-200/80 pt-10 dark:border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
          E-Commerce Profitability Masterclass
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          The Hidden COD Math That Bankrupts 80% of Online Stores
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Why standard gross margin formulas are dangerous, and how Cash on Delivery (COD) returns quietly eat 100% of your net profits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            <Truck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            What is RTO in E-Commerce?
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <strong>RTO (Return to Origin)</strong> refers to parcels that could not be successfully delivered to the customer and are sent back to the seller warehouse. In Cash on Delivery (COD) markets like Pakistan, UAE, Saudi Arabia, and India, average RTO rates oscillate between <strong>18% and 35%</strong>.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Common reasons include customer buyer remorse, impulsive ordering, delivery courier delays, incorrect phone numbers, or the customer being unavailable when the rider attempts delivery.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            How Return Fees Destroy Profitability
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Novice dropshippers and brand owners calculate margins as: <br />
            <code>Net Profit = Price - COGS - Ad Spend - Courier Fee</code>.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            This naive formula is disastrous because on a returned parcel:
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-1.5">
              <span className="text-rose-500 font-bold">•</span>
              <span>You receive <strong>₨0 / $0</strong> revenue from the customer.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Your ad spend (CAC) spent to acquire that lead is 100% lost.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Couriers charge reverse shipping / return penalties for returning the parcel.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Your branded packaging flyers and boxes are destroyed.</span>
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Breakeven CAC (Maximum Tolerable Ad Cost)
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Your <strong>Breakeven CAC</strong> is the highest amount you can afford to pay Meta, Google, or TikTok to acquire an order before your business begins losing money.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Because unreturned orders must generate enough surplus profit to pay for the deadweight losses of returned orders, your real breakeven CAC is often <strong>30% to 50% lower</strong> than what traditional gross margin calculators tell you.
          </p>
        </div>
      </div>

      {/* 5 Proven Strategies */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          5 Battle-Tested Strategies to Cut E-Commerce Return Rates by 35%
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
              1
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Automated WhatsApp Order Verification
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect a WhatsApp Business API or automated webhook to send an instant order confirmation button. If the buyer does not confirm or provide a landmark within 12 hours, do not dispatch the parcel.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
              2
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Incentivize Prepaid Orders (5% - 10% Off)
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Give customers a reason to pay via credit card, debit card, or mobile wallet (JazzCash / EasyPaisa / UPI) by passing on courier savings as an instant discount. Prepaid orders experience virtually 0% RTO.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
              3
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Fast 24-48 Hour Fulfillment SLA
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Data shows that for every 24 hours of dispatch delay, RTO likelihood jumps by 3.8%. Ship orders within 24 hours of placement while customer enthusiasm is at its absolute peak.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
              4
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Proactive Delivery SMS & Rider Coordination
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Send an SMS on the morning of delivery stating: <em>&quot;Your rider will arrive today with parcel #1234. Amount due: ₨3,500. Please keep exact cash ready.&quot;</em> This eliminates the classic excuse &quot;I had no cash at home&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
