import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/* ================================================================
   ROBOTS.TXT — Server Component
   Generates a dynamic robots.txt file for SEO compliance.
   ================================================================ */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
