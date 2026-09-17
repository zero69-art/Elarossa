import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elarossa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Elarossa — The Founding Edit", template: "%s | Elarossa" },
  description: "Elarossa curates feminine essentials for movement, confidence, travel and everyday life.",
  keywords: ["women's fashion", "women's activewear", "women's swimwear", "women's intimates", "Elarossa"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Elarossa", title: "Elarossa — The Founding Edit", description: "Curated feminine essentials for movement, confidence, travel and everyday life.", url: siteUrl },
  twitter: { card: "summary_large_image", title: "Elarossa — The Founding Edit", description: "Curated feminine essentials for movement, confidence, travel and everyday life." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f2ee", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
