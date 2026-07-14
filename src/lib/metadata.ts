import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/* ================================================================
   METADATA HELPERS
   Utility functions to build consistent metadata across pages.
   ================================================================ */

/**
 * Create page-specific metadata with site defaults.
 */
export function createMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;
  const pageDescription = description ?? siteConfig.description;
  const pageImage = image ?? siteConfig.ogImage;
  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      images: [{ url: pageImage, width: 1200, height: 630 }],
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
