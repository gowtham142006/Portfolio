import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

/* ================================================================
   FONT CONFIGURATION
   Using next/font for automatic optimization and zero layout shift.
   ================================================================ */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/* ================================================================
   METADATA — SEO, Open Graph, Twitter Cards
   ================================================================ */

export const metadata: Metadata = {
  metadataBase: new URL("https://gowtham.dev"),
  title: {
    default: "Gowtham A — Software Engineer & Flutter Developer",
    template: "%s | Gowtham A",
  },
  description:
    "Portfolio of Gowtham A — a passionate software engineer specializing in Flutter, React, Next.js, and AI-powered applications. Computer Science student at Kings Engineering College.",
  keywords: [
    "Gowtham A",
    "Software Engineer",
    "Flutter Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "AI",
    "Portfolio",
    "Web Developer",
    "Full Stack",
  ],
  authors: [{ name: "Gowtham A", url: "https://gowtham.dev" }],
  creator: "Gowtham A",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gowtham.dev",
    siteName: "Gowtham A — Portfolio",
    title: "Gowtham A — Software Engineer & Flutter Developer",
    description:
      "Passionate software engineer specializing in Flutter, React, Next.js, and AI-powered applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gowtham A — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gowtham A — Software Engineer & Flutter Developer",
    description:
      "Passionate software engineer specializing in Flutter, React, Next.js, and AI-powered applications.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ================================================================
   ROOT LAYOUT — Server Component
   Wraps every page with fonts, metadata, and providers.
   ================================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gowtham A",
              jobTitle: "Software Engineer",
              url: "https://gowtham.dev",
              sameAs: [
                "https://github.com/gowtham142006",
                "https://www.linkedin.com/in/gowtham-a-6381aa356",
              ],
              knowsAbout: [
                "Flutter",
                "React",
                "Next.js",
                "TypeScript",
                "Artificial Intelligence",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {/* Skip to content — accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
