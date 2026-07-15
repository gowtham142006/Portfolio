import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/* ================================================================
   SITEMAP.XML — Server Component
   Generates a dynamic sitemap.xml file for SEO search engines.
   ================================================================ */

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/blog"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
