import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elarossa — Modern Essentials for Her",
  description: "Discover elevated women's essentials, activewear, swimwear and intimate styles at Elarossa.",
  metadataBase: new URL("https://elarossa.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}