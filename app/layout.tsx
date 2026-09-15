import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elarossa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Elarossa — Elevated Women's Essentials", template: "%s | Elarossa" },
  description: "Discover curated women's activewear, swimwear and intimate essentials from Elarossa.",
  keywords: ["women's activewear", "women's swimwear", "women's intimates", "women's essentials", "Elarossa"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Elarossa", title: "Elarossa — Elevated Women's Essentials", description: "Curated women's activewear, swimwear and intimate essentials.", url: siteUrl },
  twitter: { card: "summary_large_image", title: "Elarossa — Elevated Women's Essentials", description: "Curated women's activewear, swimwear and intimate essentials." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
