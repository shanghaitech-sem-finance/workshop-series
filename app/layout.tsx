import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteOrigin = new URL(siteUrl).origin;
const socialImageUrl = `${siteOrigin}${basePath}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShanghaiTech SEM Finance Workshop",
    template: "%s | ShanghaiTech SEM Finance Workshop",
  },
  description:
    "ShanghaiTech SEM Finance Workshop information and program archive.",
  keywords: [
    "ShanghaiTech",
    "SEM",
    "finance workshop",
    "financial markets",
    "academic conference",
  ],
  authors: [{ name: "ShanghaiTech School of Entrepreneurship and Management" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: "ShanghaiTech SEM Finance Workshop",
    title: "ShanghaiTech SEM Finance Workshop",
    description:
      "2026 workshop information and previous workshop programs.",
    images: [
      {
        url: socialImageUrl,
        width: 1733,
        height: 906,
        alt: "ShanghaiTech SEM Finance Workshop - October 10, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShanghaiTech SEM Finance Workshop",
    description:
      "Financial Markets in a Changing Information Environment - October 10, 2026.",
    images: [socialImageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
