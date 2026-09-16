import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteShell } from "@/components/SiteShell";
import { JsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shieldtools.io"),
  title: {
    default: "ShieldTools — 100% Client-Side ID Watermark Studio & Ecom Profit Calculator",
    template: "%s | ShieldTools",
  },
  description:
    "Free, zero-server privacy utilities: stamp CNIC, Aadhaar, National IDs, Passports with security watermarks, and calculate true e-commerce profit after RTO return penalties and wasted ad spend.",
  keywords: [
    "watermark ID card",
    "watermark CNIC online",
    "secure ID watermark",
    "SIM verification watermark",
    "RTO return calculator",
    "COD profit calculator",
    "ecom net profit margin",
    "breakeven CAC",
    "client-side privacy tools",
  ],
  authors: [{ name: "ShieldTools Team", url: "https://shieldtools.io" }],
  creator: "ShieldTools",
  publisher: "ShieldTools",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shieldtools.io",
    siteName: "ShieldTools",
    title: "ShieldTools — 100% Client-Side ID Watermark Studio & Ecom Profit Calculator",
    description:
      "Zero-server document security and transparent COD e-commerce return loss calculators.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "ShieldTools Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShieldTools — Privacy Tools & Ecom Profit Calculator",
    description:
      "100% In-Browser ID Watermarking & COD Return Loss Analytics. Zero server uploads.",
    images: ["/icon-512.png"],
  },
  alternates: {
    canonical: "https://shieldtools.io",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('shieldtools_theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}window.__pwaPrompt=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pwaPrompt=e;window.dispatchEvent(new CustomEvent('pwa-ready'))});if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}})()`,
          }}
        />
      </head>
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
