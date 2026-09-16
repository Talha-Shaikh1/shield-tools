import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteShell } from "@/components/SiteShell";

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
  title: "ShieldTools — 100% Client-Side ID Watermark Studio & Ecom Profit Calculator",
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
    "privacy tools",
  ],
  authors: [{ name: "ShieldTools Team", url: "https://shieldtools.io" }],
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
