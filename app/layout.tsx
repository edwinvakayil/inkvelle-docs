import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://inkvelle.edwinvakayil.info"),
  title: {
    default: "inkvelle — Typography for React",
    template: "%s | inkvelle",
  },
  description:
    "A lightweight React + TypeScript typography component with automatic Google Fonts support, 43 hero entrance animations, custom motionConfig, and an italic accent toggle.",
  keywords: [
    "react", "typescript", "typography", "animation", "google fonts",
    "component", "inkvelle", "motion", "next.js",
  ],
  authors: [{ name: "Edwin Vakayil", url: "https://www.edwinvakayil.info/" }],
  creator: "Edwin Vakayil",
  publisher: "Edwin Vakayil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "inkvelle — Typography for React",
    description:
      "40+ hero animations, Google Fonts auto-inject, custom motionConfig, and a direct DOM ref for GSAP or Framer Motion.",
    type: "website",
    url: "https://inkvelle.edwinvakayil.info",
    siteName: "inkvelle",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "inkvelle — Typography for React",
    description: "40+ hero animations, Google Fonts auto-inject, custom motionConfig.",
    site: "@edwinvakayil",
    creator: "@edwinvakayil",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
