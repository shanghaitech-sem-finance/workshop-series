import type { Metadata } from "next";
import { MarketingHome } from "./components/MarketingHome";

export const metadata: Metadata = {
  description:
    "2026 ShanghaiTech SEM Finance Workshop information and previous workshop programs.",
};

export const dynamic = "force-static";

export default function Home() {
  return <MarketingHome />;
}
