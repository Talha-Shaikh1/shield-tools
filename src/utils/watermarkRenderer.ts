export interface WatermarkOptions {
  text: string;
  pattern: "grid" | "center";
  opacity: number; // 0.15 to 0.80
  color: string; // hex
  fontSize: number; // px scale
  angle: number; // degrees, e.g. 20 to 45
  includeDate: boolean;
  dateText?: string;
  recipientText?: string; // e.g. "SUBMITTED TO: Jazz Telecom"
}

export interface DualDocumentOptions {
  frontImage: HTMLImageElement | null;
  backImage: HTMLImageElement | null;
  layout: "side-by-side" | "stacked";
  watermark: WatermarkOptions;
}

/**
 * Renders watermark overlay onto an existing 2D canvas context for a given image dimension
 */
export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opts: WatermarkOptions
) {
  if (!opts.text && !opts.recipientText) return;

  ctx.save();
  ctx.globalAlpha = Math.max(0.15, Math.min(0.85, opts.opacity));
  ctx.fillStyle = opts.color;
  ctx.strokeStyle = opts.color;

  const dateString = opts.includeDate
    ? opts.dateText || new Date().toISOString().split("T")[0]
    : "";

  const lines: string[] = [];
  if (opts.text) lines.push(opts.text.toUpperCase());
  if (opts.recipientText) lines.push(opts.recipientText.toUpperCase());
  if (dateString) lines.push(`DATE: ${dateString}`);

  const rad = (opts.angle * Math.PI) / 180;

  if (opts.pattern === "center") {
    // Single Bold Center Stamp
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-rad);

    const baseSize = Math.max(16, Math.round((width / 22) * (opts.fontSize / 32)));
    ctx.font = `bold ${baseSize}px "Inter", "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = baseSize * 1.35;
    const totalHeight = lines.length * lineHeight;
    const startY = -(totalHeight / 2) + lineHeight / 2;

    // Draw protective badge border behind or around text
    const maxTextWidth = lines.reduce((max, line) => {
      const w = ctx.measureText(line).width;
      return w > max ? w : max;
    }, 0);

    const padding = baseSize * 0.7;
    ctx.lineWidth = Math.max(2, baseSize * 0.08);
    ctx.strokeRect(
      -(maxTextWidth / 2 + padding),
      -(totalHeight / 2 + padding * 0.6),
      maxTextWidth + padding * 2,
      totalHeight + padding * 1.2
    );

    lines.forEach((line, idx) => {
      ctx.fillText(line, 0, startY + idx * lineHeight);
    });
  } else {
    // Repeated Diagonal Security Grid (Un-croppable protection)
    const baseSize = Math.max(12, Math.round((width / 32) * (opts.fontSize / 32)));
    ctx.font = `700 ${baseSize}px "Inter", "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = baseSize * 1.25;
    const blockHeight = lines.length * lineHeight;

    const maxTextWidth = lines.reduce((max, line) => {
      const w = ctx.measureText(line).width;
      return w > max ? w : max;
    }, 0);

    const stepX = Math.max(maxTextWidth * 1.4, 220);
    const stepY = Math.max(blockHeight * 2.8, 140);

    // Diagonal dimension coverage
    const diagonal = Math.hypot(width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-rad);

    const startX = -diagonal;
    const endX = diagonal;
    const startY = -diagonal;
    const endY = diagonal;

    let row = 0;
    for (let y = startY; y < endY; y += stepY) {
      const offsetX = (row % 2 === 0) ? 0 : stepX / 2;
      for (let x = startX; x < endX; x += stepX) {
        lines.forEach((line, lineIdx) => {
          ctx.fillText(line, x + offsetX, y + lineIdx * lineHeight);
        });
      }
      row++;
    }
  }

  ctx.restore();
}

/**
 * Render a single image with watermark onto a target canvas
 */
export function renderSingleDocumentToCanvas(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  opts: WatermarkOptions
) {
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Draw background image
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Draw watermark
  drawWatermark(ctx, canvas.width, canvas.height, opts);
}

/**
 * Render dual images (Front & Back) merged with watermark onto a target canvas
 */
export function renderDualDocumentToCanvas(
  canvas: HTMLCanvasElement,
  frontImg: HTMLImageElement,
  backImg: HTMLImageElement,
  layout: "side-by-side" | "stacked",
  opts: WatermarkOptions
) {
  const fW = frontImg.naturalWidth || frontImg.width;
  const fH = frontImg.naturalHeight || frontImg.height;
  const bW = backImg.naturalWidth || backImg.width;
  const bH = backImg.naturalHeight || backImg.height;

  const gap = 30; // spacing between cards
  const margin = 24; // margin border

  let totalWidth = 0;
  let totalHeight = 0;

  let fX = 0, fY = 0, bX = 0, bY = 0;

  if (layout === "side-by-side") {
    const targetHeight = Math.max(fH, bH);
    const scaleF = targetHeight / fH;
    const scaleB = targetHeight / bH;
    const adjFW = fW * scaleF;
    const adjBW = bW * scaleB;

    totalWidth = Math.round(margin * 2 + adjFW + gap + adjBW);
    totalHeight = Math.round(margin * 2 + targetHeight);

    fX = margin;
    fY = margin;
    bX = margin + adjFW + gap;
    bY = margin;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clean neutral canvas background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    // Draw front & back
    ctx.drawImage(frontImg, fX, fY, adjFW, targetHeight);
    ctx.drawImage(backImg, bX, bY, adjBW, targetHeight);

    // Apply watermark independently to front card
    ctx.save();
    ctx.beginPath();
    ctx.rect(fX, fY, adjFW, targetHeight);
    ctx.clip();
    ctx.translate(fX, fY);
    drawWatermark(ctx, adjFW, targetHeight, opts);
    ctx.restore();

    // Apply watermark independently to back card
    ctx.save();
    ctx.beginPath();
    ctx.rect(bX, bY, adjBW, targetHeight);
    ctx.clip();
    ctx.translate(bX, bY);
    drawWatermark(ctx, adjBW, targetHeight, opts);
    ctx.restore();
  } else {
    // Stacked vertically
    const targetWidth = Math.max(fW, bW);
    const scaleF = targetWidth / fW;
    const scaleB = targetWidth / bW;
    const adjFH = fH * scaleF;
    const adjBH = bH * scaleB;

    totalWidth = Math.round(margin * 2 + targetWidth);
    totalHeight = Math.round(margin * 2 + adjFH + gap + adjBH);

    fX = margin;
    fY = margin;
    bX = margin;
    bY = margin + adjFH + gap;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clean neutral canvas background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    // Draw front & back
    ctx.drawImage(frontImg, fX, fY, targetWidth, adjFH);
    ctx.drawImage(backImg, bX, bY, targetWidth, adjBH);

    // Apply watermark to front card
    ctx.save();
    ctx.beginPath();
    ctx.rect(fX, fY, targetWidth, adjFH);
    ctx.clip();
    ctx.translate(fX, fY);
    drawWatermark(ctx, targetWidth, adjFH, opts);
    ctx.restore();

    // Apply watermark to back card
    ctx.save();
    ctx.beginPath();
    ctx.rect(bX, bY, targetWidth, adjBH);
    ctx.clip();
    ctx.translate(bX, bY);
    drawWatermark(ctx, targetWidth, adjBH, opts);
    ctx.restore();
  }
}
