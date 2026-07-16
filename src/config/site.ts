import type { SiteConfig } from "@/types";

/* ================================================================
   SITE CONFIGURATION
   Centralized site metadata used across layout, SEO, and components.
   Update this file when deploying to a custom domain.
   ================================================================ */

export const siteConfig: SiteConfig = {
  name: "Gowtham A",
  title: "Gowtham A — Fullstack Developer & Software Engineer",
description:
  "Portfolio of Gowtham A — a fullstack developer specializing in Flutter, React, Next.js, and AI-driven applications.",
  url: "https://gowtham.dev",
  ogImage: "/og-image.png",
  author: "Gowtham A",
  email: "gowtham142006a@gmail.com",
  github: "https://github.com/gowtham142006",
  linkedin: "https://www.linkedin.com/in/gowtham-a-6381aa356",
} as const;
