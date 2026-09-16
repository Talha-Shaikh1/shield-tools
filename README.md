# 🛡️ ShieldTools — High-Trust Zero-Server Web Tools Suite

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-emerald?style=flat-square&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

**ShieldTools** is an ultra-modern, zero-server-cost web utilities platform designed to solve two massive digital pain points with 100% client-side security, viral embed capability, PWA native installability, and Google AdSense monetization readiness.

---

## 🌟 Core Modules

### 1. 🪪 DocShield™ — Secure ID & CNIC Watermark Studio
> **100% In-Browser Privacy Guarantee**: Documents never leave the user's browser. Zero network uploads, zero server storage, zero data leaks.

- **Dual Mode Document Processing**:
  - Single Document Mode (CNIC, Passport, Driving License, Student Card, utility bill).
  - Dual Side Mode (Front & Back) with auto-merging into a single printable document (**Side-by-Side** or **Stacked Vertical**).
- **Fraud-Proof Preset Stamping**:
  - One-click presets: `FOR SIM VERIFICATION ONLY`, `FOR JOB APPLICATION ONLY`, `FOR BANK / LOAN KYC ONLY`, `FOR PROPERTY LEASE ONLY`, and custom purpose text.
  - Recipient locking (e.g. `SUBMITTED TO: HBL Bank / Jazz Telecom`) preventing unauthorized reuse across different institutions.
  - Optional auto-date stamping (`DATE: YYYY-MM-DD`).
- **Security Pattern Customization**:
  - Full diagonal security cross-grid (protects against AI cloning and image cropping).
  - Bold center diagonal stamp with protective border box.
  - Granular controls: Opacity (15%–80%), Security Red / Navy Blue / Charcoal / White color schemes, font size, and rotation angle.
- **Instant High-Res Export**:
  - 1-Click PNG & JPG downloads.
  - Multi-side compiled **Printable PDF Export** via `jspdf`.

---

### 2. 📊 EcomShield™ — COD Net Profit & RTO Loss Calculator
> **The Real Unit Economics Engine for E-Commerce Merchants & D2C Brands.**

- **Hidden Return Cost Isolation ("The Eye-Opener Card")**:
  - Quantifies exactly how much capital is burned on wasted ad spend, courier reverse penalties, and ruined packaging on failed deliveries.
- **Complete Cost Modeling**:
  - Wholesale Cost (COGS), Customer Shipping Charged, Courier Delivery Fee, **Courier Return Penalty / Reverse Shipping Fee**, Packaging/Boxes/Tape, and Platform Commission % (Shopify, TikTok Shop, Daraz).
- **Critical Financial Diagnostics**:
  - Expected Return to Origin (RTO) Rate Slider (0%–50%).
  - Real Net Profit Margin %, True Net Take-Home on 100 dispatched orders, and **Breakeven CAC (Maximum Tolerable Ad Spend)**.
  - Dynamic Business Health Status: 🟢 Healthy (>20%), 🟡 Vulnerable (5%–20%), 🔴 Burning Cash (<5%).
- **Share & Report Generation**:
  - 1-Click **WhatsApp Shareable Summary** formatted for business partners and investor updates.
  - Executive **PDF Financial Report** with metric breakdowns and actionable mitigation tips.

---

## 🚀 Key Platform Features

- **📱 Progressive Web App (PWA)**:
  - Installable on Windows, macOS, Android, and iOS as a standalone desktop/mobile app with zero browser address bar.
  - Early-capture install script to trigger native browser install prompts instantly.
  - VIP cybernetic shield app icons (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon.ico`, `icon.svg`).
  - Seamless fallback visual install guide modal rendered via React Portal at `z-[999999]`.
- **🌓 Dual Theme (Light / Dark Mode)**:
  - Seamless class-based theme switcher using Tailwind CSS v4 custom variants (`@custom-variant dark`).
  - High-contrast obsidian dark palette and crisp daylight theme with zero styling flashes.
- **🌐 Viral Embeddable Widgets (`/embed/*`)**:
  - Independent, distraction-free embed routes: `/embed/watermark` and `/embed/ecom-calculator`.
  - Built-in `⚡ Powered by ShieldTools` attribution pill generating organic high-authority backlinks.
  - Interactive "Embed on Your Site" modal with live iframe preview and copyable HTML code.
- **🔍 Semantic SEO & AEO (Answer Engine Optimization)**:
  - Integrated with `every-app/open-seo` standards.
  - Dynamic XML Sitemap (`/sitemap.xml`) and crawler configuration (`/robots.txt`).
  - Rich JSON-LD Schemas: `Organization`, `WebSite`, `SoftwareApplication` (DocShield & EcomShield), and `FAQPage` targeting Google SGE, Perplexity, and ChatGPT search snippets.
  - Long-form educational guides covering digital identity security, KYC fraud prevention, and COD return reduction strategies.
- **💼 Growth & Content Playbook (`/playbook`)**:
  - Private growth hub with 30-day viral content schedule, AI image prompts, and 1-click copy buttons.
  - Excluded from search indexing via `robots.ts`.
- **💰 AdSense & Monetization Architecture**:
  - Google AdSense-compliant responsive `<AdSlot />` components (Leaderboard, Sidebar, In-feed) with clean label styling.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Client-Side Canvas Processing**: HTML5 Canvas API
- **Document & PDF Export**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
- **PWA Support**: Custom Service Worker + Web App Manifest
- **Hosting Target**: Serverless / Static-friendly ($0 backend compute cost on Vercel, Cloudflare Pages, or Netlify)

---

## 📂 Project Structure

```text
shield-tools/
├── public/
│   ├── icon.svg                 # VIP Cybernetic vector app icon
│   ├── icon-192.png             # PWA Home screen icon
│   ├── icon-512.png             # PWA Splash / high-res icon
│   ├── apple-touch-icon.png     # iOS Web Clip icon
│   ├── favicon.ico              # Browser tab favicon
│   ├── manifest.json            # PWA Web App Manifest
│   └── sw.js                    # Service worker for offline caching
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, theme script, early PWA prompt, JSON-LD
│   │   ├── page.tsx             # Main platform landing & interactive tools hub
│   │   ├── globals.css          # Tailwind CSS v4 styling & dark theme variants
│   │   ├── sitemap.ts           # Dynamic XML sitemap generation (/sitemap.xml)
│   │   ├── robots.ts            # Dynamic robots.txt configuration
│   │   ├── docshield/           # Dedicated DocShield tool page
│   │   ├── ecomshield/          # Dedicated EcomShield tool page
│   │   ├── embed/
│   │   │   ├── watermark/       # Embeddable watermark widget route
│   │   │   └── ecom-calculator/ # Embeddable e-commerce calculator route
│   │   ├── blog/                # SEO/AEO-optimized educational articles
│   │   ├── playbook/            # Private 30-day viral content playbook
│   │   ├── about/               # About Us page
│   │   ├── privacy-policy/      # GDPR/CCPA compliant privacy policy
│   │   ├── terms/               # Terms of Service & disclaimer
│   │   └── contact/             # Contact Us & inquiry form
│   └── components/
│       ├── Navbar.tsx           # Responsive navigation with Theme & PWA buttons
│       ├── Footer.tsx           # Platform footer & compliance links
│       ├── InstallAppButton.tsx # PWA native install button & Portal modal
│       ├── ThemeToggle.tsx      # Dark / Light mode toggle
│       ├── WatermarkStudio.tsx  # Core Canvas-based ID watermarking engine
│       ├── EcomCalculator.tsx   # Core COD profit & RTO loss calculator engine
│       ├── EmbedModal.tsx       # Shareable iframe embed code generator
│       ├── AdSlot.tsx           # Monetization advertising slot component
│       └── JsonLd.tsx           # Schema.org structured data injection
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/your-username/shield-tools.git
cd shield-tools
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test the platform.

### 4. Build for production
```bash
npm run build
npm run start
```

All routes will be statically compiled and optimized for sub-second page loads.

---

## 🔒 Security & Privacy Specification

DocShield operates under a strict **Zero-Knowledge Data Architecture**:
- All image rendering, canvas manipulations, and PDF outputs execute purely within the user's client browser thread.
- No documents, images, or personally identifiable data (PII) are ever uploaded, logged, or transmitted to any server.
- The platform is fully compliant with GDPR data minimization standards and CCPA user protection guidelines.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
