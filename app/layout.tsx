import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elarossa.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Elarossa — Elevated Women's Essentials",
    template: "%s | Elarossa"
  },
  description: "Discover curated women's activewear, swimwear and intimate essentials from Elarossa. A quality-first collection designed for confidence, movement and elevated everyday style.",
  keywords: ["women's activewear", "women's swimwear", "women's intimates", "luxury women's clothing", "Elarossa"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Elarossa",
    title: "Elarossa — Elevated Women's Essentials",
    description: "Curated women's activewear, swimwear and intimate essentials.",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Elarossa — Elevated Women's Essentials",
    description: "Curated women's activewear, swimwear and intimate essentials."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
