import jsPDF from "jspdf";
import { EcomInputs, EcomResults, formatCurrency } from "./ecomCalculations";

/**
 * Exports a canvas element as a downloadable PDF document
 */
export async function exportCanvasToPdf(
  canvas: HTMLCanvasElement,
  fileName: string = "watermarked-document.pdf"
) {
  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  const isLandscape = canvas.width > canvas.height;

  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "pt",
    format: isLandscape ? [canvas.width, canvas.height] : [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
  pdf.save(fileName);
}

/**
 * Exports an EcomShield breakdown report as a styled PDF document
 */
export async function exportEcomReportToPdf(
  inputs: EcomInputs,
  results: EcomResults,
  fileName: string = "ecom-profit-rto-report.pdf"
) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const sym = inputs.currencySymbol;
  const pageWidth = pdf.internal.pageSize.getWidth();

  // Background Header
  pdf.setFillColor(15, 23, 42); // slate-900
  pdf.rect(0, 0, pageWidth, 90, "F");

  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.text("ShieldTools — EcomShield™ Report", 36, 42);

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(148, 163, 184);
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()} | Unit Economics & RTO Return Analysis`,
    36,
    64
  );

  // Health Status Banner
  const isHealthy = results.healthStatus === "healthy";
  const isVulnerable = results.healthStatus === "vulnerable";
  const bannerColor = isHealthy
    ? [22, 101, 52] // green-800
    : isVulnerable
    ? [161, 98, 7] // yellow-700
    : [185, 28, 28]; // red-700

  pdf.setFillColor(bannerColor[0], bannerColor[1], bannerColor[2]);
  pdf.roundedRect(36, 110, pageWidth - 72, 45, 6, 6, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.text(results.healthTitle, 50, 134);
  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "normal");
  pdf.text(results.healthDescription, 50, 146);

  // Key Metric Highlights Grid
  let y = 180;
  const colWidth = (pageWidth - 72 - 24) / 3;

  const drawCard = (
    x: number,
    title: string,
    val: string,
    sub: string,
    highlight: boolean = false
  ) => {
    pdf.setFillColor(highlight ? 254 : 248, highlight ? 242 : 250, highlight ? 242 : 252);
    pdf.setDrawColor(highlight ? 248 : 226, highlight ? 113 : 232, highlight ? 113 : 240);
    pdf.roundedRect(x, y, colWidth, 70, 6, 6, "FD");

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(highlight ? 185 : 71, highlight ? 28 : 85, highlight ? 28 : 105);
    pdf.text(title.toUpperCase(), x + 14, y + 20);

    pdf.setFontSize(16);
    pdf.setTextColor(highlight ? 185 : 15, highlight ? 28 : 23, highlight ? 28 : 42);
    pdf.text(val, x + 14, y + 42);

    pdf.setFontSize(8.5);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 116, 139);
    pdf.text(sub, x + 14, y + 58);
  };

  drawCard(36, "True Take-Home", formatCurrency(results.trueNetProfit100, sym), "Per 100 orders");
  drawCard(
    36 + colWidth + 12,
    "Cash Lost to RTO",
    formatCurrency(results.totalMoneyLostToReturns, sym),
    `${results.returnedOrders} returns wasted`,
    true
  );
  drawCard(
    36 + (colWidth + 12) * 2,
    "Max CAC Allowed",
    formatCurrency(results.maxTolerableCAC, sym),
    "Breakeven limit"
  );

  // Detailed Breakdown Table
  y = 280;
  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.text("Comprehensive Financial Breakdown (100 Orders Dispatched)", 36, y);

  y += 18;
  pdf.setFillColor(241, 245, 249);
  pdf.rect(36, y, pageWidth - 72, 24, "F");

  pdf.setFontSize(9.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text("FINANCIAL LINE ITEM", 48, y + 16);
  pdf.text("CALCULATION / RATE", 300, y + 16);
  pdf.text("TOTAL IMPACT", pageWidth - 140, y + 16);

  const tableRows = [
    {
      label: "Gross Retail Revenue",
      desc: `${results.deliveredOrders} delivered × ${formatCurrency(inputs.sellingPrice + inputs.deliveryFeeCharged, sym)}`,
      amount: formatCurrency(results.totalRevenue, sym),
      type: "pos",
    },
    {
      label: "Product Cost of Goods (COGS)",
      desc: `${results.deliveredOrders} delivered × ${formatCurrency(inputs.productCost, sym)}`,
      amount: `-${formatCurrency(results.totalCogs, sym)}`,
      type: "neg",
    },
    {
      label: "Total Marketing Ad Spend (CAC)",
      desc: `100 orders dispatched × ${formatCurrency(inputs.adSpendPerOrder, sym)}`,
      amount: `-${formatCurrency(results.totalAdSpend, sym)}`,
      type: "neg",
    },
    {
      label: "Courier Delivery Fees (Outbound)",
      desc: `${results.deliveredOrders} delivered × ${formatCurrency(inputs.courierFeePaid, sym)}`,
      amount: `-${formatCurrency(results.totalCourierFees, sym)}`,
      type: "neg",
    },
    {
      label: "Courier RTO Return Penalties",
      desc: `${results.returnedOrders} returned × ${formatCurrency(inputs.courierReturnPenalty, sym)}`,
      amount: `-${formatCurrency(results.totalReturnPenalties, sym)}`,
      type: "neg",
    },
    {
      label: "Packaging & Boxes (Dispatched)",
      desc: `100 orders × ${formatCurrency(inputs.packagingCost, sym)}`,
      amount: `-${formatCurrency(results.totalPackaging, sym)}`,
      type: "neg",
    },
    {
      label: "Platform Commission Fees",
      desc: `${inputs.platformCommissionPct}% on delivered revenue`,
      amount: `-${formatCurrency(results.totalCommissions, sym)}`,
      type: "neg",
    },
  ];

  y += 26;
  tableRows.forEach((row, i) => {
    if (i % 2 === 1) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(36, y, pageWidth - 72, 22, "F");
    }
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(30, 41, 59);
    pdf.text(row.label, 48, y + 15);
    pdf.setTextColor(100, 116, 139);
    pdf.text(row.desc, 300, y + 15);

    pdf.setFont("helvetica", "bold");
    if (row.type === "pos") {
      pdf.setTextColor(22, 101, 52);
    } else {
      pdf.setTextColor(185, 28, 28);
    }
    pdf.text(row.amount, pageWidth - 140, y + 15);

    y += 22;
  });

  // Total Net Profit Box
  y += 10;
  pdf.setFillColor(15, 23, 42);
  pdf.roundedRect(36, y, pageWidth - 72, 38, 6, 6, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("TRUE BOTTOM LINE NET PROFIT (100 Dispatches)", 48, y + 24);
  pdf.setFontSize(14);
  pdf.text(formatCurrency(results.trueNetProfit100, sym), pageWidth - 140, y + 25);

  // Actionable Insights
  y += 65;
  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Diagnostic Action Plan to Protect Margins", 36, y);

  y += 18;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(51, 65, 85);
  results.actionableTips.forEach((tip) => {
    pdf.text(`• ${tip}`, 44, y);
    y += 16;
  });

  // Footer attribution
  pdf.setFontSize(8.5);
  pdf.setTextColor(148, 163, 184);
  pdf.text(
    "Generated free by ShieldTools (https://shieldtools.io) — Confidential Business Plan",
    36,
    pageWidth > 595 ? 800 : 810
  );

  pdf.save(fileName);
}
