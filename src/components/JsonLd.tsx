import React from "react";

export const JsonLd: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tools.talhaweb.xyz/#organization",
        "name": "ShieldTools",
        "url": "https://tools.talhaweb.xyz",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tools.talhaweb.xyz/icon-512.png",
          "width": 512,
          "height": 512,
        },
        "description":
          "Independent zero-server digital privacy and e-commerce unit economics platform.",
        "sameAs": ["https://twitter.com/shieldtools", "https://github.com/shieldtools"],
      },
      {
        "@type": "WebSite",
        "@id": "https://tools.talhaweb.xyz/#website",
        "url": "https://tools.talhaweb.xyz",
        "name": "ShieldTools",
        "publisher": {
          "@id": "https://tools.talhaweb.xyz/#organization",
        },
        "description":
          "Free, 100% in-browser identity document watermark studio and COD return loss calculator.",
      },
      {
        "@type": "SoftwareApplication",
        "name": "DocShield™ ID Watermark Studio",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "All (Web Browser)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description":
          "100% Client-Side National ID and CNIC watermarking studio. Stamping happens in browser RAM with zero server file uploads.",
        "url": "https://tools.talhaweb.xyz/docshield",
      },
      {
        "@type": "SoftwareApplication",
        "name": "EcomShield™ Profit & RTO Loss Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All (Web Browser)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description":
          "Real e-commerce net profit and RTO return loss calculator modeling courier penalties and wasted ad spend.",
        "url": "https://tools.talhaweb.xyz/ecomshield",
      },
      {
        "@type": "FAQPage",
        "@id": "https://tools.talhaweb.xyz/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does ShieldTools upload or save my CNIC or National ID photos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "No. ShieldTools operates on a 100% client-side architecture using the HTML5 Canvas API. Your documents never leave your browser memory and zero files are uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            "name": "What is RTO in e-commerce and why does it cause financial loss?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "RTO stands for Return to Origin. On returned COD parcels, the seller receives zero revenue while still paying for wasted ad spend (CAC), courier return penalties, and ruined flyer packaging.",
            },
          },
          {
            "@type": "Question",
            "name": "Are watermarked ID copies legally accepted for KYC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. Major compliance directives encourage purpose-limited documentation provided essential legal details remain legible at around 30% to 40% opacity.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I embed ShieldTools on my Shopify or WordPress site?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. Click '</> Embed' on any tool to generate a responsive, lightweight iframe snippet that can be pasted directly into any website.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
