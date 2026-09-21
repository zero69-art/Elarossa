import type { Metadata, Viewport } from "next";
import "./globals.css";
import ImageFallbackGuard from "@/components/ImageFallbackGuard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elarossa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Elarossa | Women's Activewear, Swim & Intimates",
    template: "%s | Elarossa",
  },
  description:
    "Elarossa curates women's activewear, swimwear and intimates for movement, confidence and everyday life. Minimal pieces. Considered quality.",
  keywords: [
    "Elarossa",
    "women's activewear",
    "seamless leggings",
    "women's swimwear",
    "women's intimates",
    "sports bra",
    "yoga leggings",
    "luxury loungewear",
    "founding edit",
  ],
  authors: [{ name: "Elarossa" }],
  creator: "Elarossa",
  publisher: "Elarossa",
  applicationName: "Elarossa",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Elarossa",
    title: "Elarossa | Women's Activewear, Swim & Intimates",
    description:
      "Curated feminine essentials for movement, confidence, travel and everyday life.",
    url: siteUrl,
    images: [{ url: "/logo-mark.svg", width: 64, height: 64, alt: "Elarossa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elarossa | Women's Activewear, Swim & Intimates",
    description:
      "Curated feminine essentials for movement, confidence, travel and everyday life.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
  },
  category: "fashion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f2ee",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elarossa",
  url: siteUrl,
  logo: `${siteUrl}/logo-mark.svg`,
  description:
    "Elarossa curates women's activewear, swimwear and intimates for movement, confidence and everyday life.",
  sameAs: [],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ImageFallbackGuard />
        {children}
      </body>
    </html>
  );
}
