import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { themeInitScript } from "@/lib/theme";

// next/font self-hosts fonts at build time (no layout shift, no external request)
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const description = `${profile.name}: ${profile.tagline}. ${profile.bio[0]}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name} | ${profile.tagline}`,
  description,
  openGraph: {
    title: `${profile.name} | ${profile.tagline}`,
    description,
    type: "website",
    url: profile.siteUrl,
    // Only include an image when the owner supplies one (see TODO in profile.ts)
    ...(profile.ogImage ? { images: [profile.ogImage] } : {}),
  },
  twitter: { card: profile.ogImage ? "summary_large_image" : "summary", title: profile.name, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the init script adds "dark" before React hydrates
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Without JS the reveal animation would leave content hidden */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
