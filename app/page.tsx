import type { Metadata } from "next";
import { MarketingHome } from "./components/MarketingHome";
import { absoluteSiteUrl } from "./lib/site-path";

export const metadata: Metadata = {
  description:
    "2026 ShanghaiTech SEM Finance Workshop information and previous workshop programs.",
};

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <link rel="canonical" href={absoluteSiteUrl("/")} />
      <MarketingHome />
    </>
  );
}
