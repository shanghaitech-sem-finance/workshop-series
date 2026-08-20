import type { Metadata } from "next";
import { absoluteSiteUrl } from "./lib/site-path";
import "./globals.css";

const homepageUrl = absoluteSiteUrl("/");
const socialImageUrl = absoluteSiteUrl("/og.png");

export const metadata: Metadata = {
  metadataBase: new URL(homepageUrl),
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: "ShanghaiTech SEM Finance Workshop",
    url: homepageUrl,
    title: "ShanghaiTech SEM Finance Workshop",
    description:
      "2026 workshop information and previous workshop programs.",
    images: [
      {
        url: socialImageUrl,
        width: 1735,
        height: 906,
        alt: "ShanghaiTech SEM Finance Workshop - October 11, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShanghaiTech SEM Finance Workshop",
    description:
      "Financial Markets in a Changing Information Environment - October 11, 2026.",
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
