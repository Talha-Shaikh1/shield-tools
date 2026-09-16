export interface EcomInputs {
  currency: string;
  currencySymbol: string;
  sellingPrice: number;
  productCost: number;
  adSpendPerOrder: number;
  deliveryFeeCharged: number;
  courierFeePaid: number;
  courierReturnPenalty: number;
  packagingCost: number;
  platformCommissionPct: number;
  returnRatePct: number; // 0 to 50%
}

export interface EcomResults {
  deliveredOrders: number;
  returnedOrders: number;
  
  // Per order metrics
  grossRevenuePerDelivered: number;
  netProfitPerDelivered: number;
  costPerReturnedParcel: number;

  // 100 Orders scale
  totalRevenue: number;
  totalCogs: number;
  totalAdSpend: number;
  totalCourierFees: number;
  totalReturnPenalties: number;
  totalPackaging: number;
  totalCommissions: number;
  totalCosts: number;

  trueNetProfit100: number;
  profitPerDispatchedOrder: number;
  netProfitMarginPct: number;
  totalMoneyLostToReturns: number; // Eye opener
  maxTolerableCAC: number; // Breakeven ad spend

  healthStatus: "healthy" | "vulnerable" | "danger";
  healthTitle: string;
  healthDescription: string;
  actionableTips: string[];
}

export const CURRENCIES = [
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "AED", symbol: "AED ", name: "UAE Dirham" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "SAR", symbol: "SAR ", name: "Saudi Riyal" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

export const DEFAULT_INPUTS: EcomInputs = {
  currency: "PKR",
  currencySymbol: "₨",
  sellingPrice: 3500,
  productCost: 1200,
  adSpendPerOrder: 650,
  deliveryFeeCharged: 0,
  courierFeePaid: 250,
  courierReturnPenalty: 280,
  packagingCost: 80,
  platformCommissionPct: 5,
  returnRatePct: 20,
};

export function calculateEcomMetrics(inputs: EcomInputs): EcomResults {
  const totalDispatched = 100;
  const returnRate = Math.max(0, Math.min(90, inputs.returnRatePct));
  const returnedOrders = (totalDispatched * returnRate) / 100;
  const deliveredOrders = totalDispatched - returnedOrders;

  // Single unit economics
  const grossRevenuePerDelivered = inputs.sellingPrice + inputs.deliveryFeeCharged;
  const commissionPerDelivered = (inputs.sellingPrice * inputs.platformCommissionPct) / 100;

  // Cost incurred on a successfully delivered order (including its own ad spend)
  const deliveryCostPerOrder =
    inputs.productCost +
    inputs.courierFeePaid +
    inputs.packagingCost +
    commissionPerDelivered +
    inputs.adSpendPerOrder;

  const netProfitPerDelivered = grossRevenuePerDelivered - deliveryCostPerOrder;

  // Cost incurred on a returned parcel (Wasted Ad Spend + Return Courier Penalty + Wasted Packaging)
  // (Assuming product itself is returned safely into stock)
  const costPerReturnedParcel =
    inputs.adSpendPerOrder + inputs.courierReturnPenalty + inputs.packagingCost;

  // 100 Orders totals
  const totalRevenue = deliveredOrders * grossRevenuePerDelivered;
  const totalCogs = deliveredOrders * inputs.productCost;
  const totalAdSpend = totalDispatched * inputs.adSpendPerOrder;
  const totalCourierFees = deliveredOrders * inputs.courierFeePaid;
  const totalReturnPenalties = returnedOrders * inputs.courierReturnPenalty;
  const totalPackaging = totalDispatched * inputs.packagingCost;
  const totalCommissions = deliveredOrders * commissionPerDelivered;

  const totalCosts =
    totalCogs +
    totalAdSpend +
    totalCourierFees +
    totalReturnPenalties +
    totalPackaging +
    totalCommissions;

  const trueNetProfit100 = totalRevenue - totalCosts;
  const profitPerDispatchedOrder = trueNetProfit100 / totalDispatched;
  const netProfitMarginPct =
    totalRevenue > 0 ? (trueNetProfit100 / totalRevenue) * 100 : 0;

  // Total cash burned exclusively because of returns
  const totalMoneyLostToReturns = returnedOrders * costPerReturnedParcel;

  // Maximum tolerable CAC (Breakeven Ad Spend per order where trueNetProfit100 = 0)
  // 0 = totalRevenue - (totalNonAdCosts + 100 * maxCAC)
  const totalNonAdCosts =
    totalCogs +
    totalCourierFees +
    totalReturnPenalties +
    totalPackaging +
    totalCommissions;

  const maxTolerableCAC = Math.max(0, (totalRevenue - totalNonAdCosts) / totalDispatched);

  // Diagnostic health classification
  let healthStatus: "healthy" | "vulnerable" | "danger" = "healthy";
  let healthTitle = "Healthy & Scalable Business";
  let healthDescription =
    "Your profit margins are robust and comfortably absorb customer returns and ad fluctuations.";

  const actionableTips: string[] = [];

  if (netProfitMarginPct >= 20) {
    healthStatus = "healthy";
    healthTitle = "🟢 Healthy & Scalable Business (Margin > 20%)";
    healthDescription =
      "Your margins absorb COD returns well. You have healthy breathing room to scale marketing ad spend.";
    actionableTips.push(
      "Reinvest net cash flow into high-converting Lookalike or Retargeting ad campaigns.",
      "Negotiate volume discounts on courier rates once you exceed 500 parcels/month.",
      "Explore bundling products to lift Average Order Value (AOV) without increasing delivery fees."
    );
  } else if (netProfitMarginPct >= 5) {
    healthStatus = "vulnerable";
    healthTitle = "🟡 Vulnerable Margins (Margin 5% – 20%)";
    healthDescription =
      "High Risk: A 5% increase in returns or slight Facebook/TikTok ad cost spikes will wipe out your profits.";
    actionableTips.push(
      "Implement mandatory WhatsApp order verification or automated IVR calling before dispatch.",
      "Blacklist recurring fake COD buyers using a shared fraud phone database.",
      "Charge a nominal delivery fee upfront or offer a 5-10% discount for prepaid bank/card payments."
    );
  } else {
    healthStatus = "danger";
    healthTitle = "🔴 Burning Cash Alert (Margin < 5% or Negative)";
    healthDescription =
      "Critical Warning: Returns, reverse shipping penalties, and ad spend are actively draining your capital.";
    actionableTips.push(
      "Immediately stop dispatching unconfirmed COD orders. Verify phone numbers via WhatsApp/SMS OTP.",
      "Kill underperforming ad creatives with high CAC and test higher ticket price points.",
      "Switch to courier partners that offer automated re-attempt calls and 48-hour delivery SLAs."
    );
  }

  return {
    deliveredOrders,
    returnedOrders,
    grossRevenuePerDelivered,
    netProfitPerDelivered,
    costPerReturnedParcel,
    totalRevenue,
    totalCogs,
    totalAdSpend,
    totalCourierFees,
    totalReturnPenalties,
    totalPackaging,
    totalCommissions,
    totalCosts,
    trueNetProfit100,
    profitPerDispatchedOrder,
    netProfitMarginPct,
    totalMoneyLostToReturns,
    maxTolerableCAC,
    healthStatus,
    healthTitle,
    healthDescription,
    actionableTips,
  };
}

export function formatCurrency(amount: number, symbol: string): string {
  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const formatted = abs.toLocaleString();
  return isNegative ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export function generateWhatsAppSummary(
  inputs: EcomInputs,
  results: EcomResults
): string {
  const sym = inputs.currencySymbol;
  return `📊 *ECOM NET PROFIT & RTO BREAKDOWN*
━━━━━━━━━━━━━━━━━━━━
📦 *Scenario:* 100 Orders Dispatched
🛍️ *Selling Price:* ${formatCurrency(inputs.sellingPrice, sym)}
💰 *Product Cost (COGS):* ${formatCurrency(inputs.productCost, sym)}
📢 *Ad Spend (CAC):* ${formatCurrency(inputs.adSpendPerOrder, sym)} / order
🚚 *Return Rate (RTO):* ${inputs.returnRatePct}%

📈 *BOTTOM-LINE RESULTS (Per 100 Orders):*
✅ *Delivered:* ${results.deliveredOrders} parcels
❌ *Returned (RTO):* ${results.returnedOrders} parcels
💵 *Gross Revenue:* ${formatCurrency(results.totalRevenue, sym)}
💸 *Total Expenses:* ${formatCurrency(results.totalCosts, sym)}
━━━━━━━━━━━━━━━━━━━━
🎯 *True Net Take-Home:* ${formatCurrency(results.trueNetProfit100, sym)}
📊 *Net Profit Margin:* ${results.netProfitMarginPct.toFixed(1)}%
🔥 *Money Lost to Returns:* ${formatCurrency(results.totalMoneyLostToReturns, sym)}
🛑 *Max Tolerable CAC (Breakeven):* ${formatCurrency(results.maxTolerableCAC, sym)}

🏥 *Health Status:* ${results.healthTitle}
Generated by ShieldTools (https://shieldtools.io)`;
}
