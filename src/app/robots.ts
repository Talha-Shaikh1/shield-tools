import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/playbook", "/private*"],
      },
    ],
    sitemap: "https://shieldtools.io/sitemap.xml",
  };
}
