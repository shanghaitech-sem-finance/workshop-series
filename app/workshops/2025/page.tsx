import type { Metadata } from "next";
import { ProgramPage } from "../../components/ProgramPage";
import { workshops } from "../../data/workshops";
import { absoluteSiteUrl } from "../../lib/site-path";

export const metadata: Metadata = {
  title: "2025 Program",
  description: "Program for the 2025 SEM Finance Workshop: Household Finance.",
};

export const dynamic = "force-static";

export default function Workshop2025() {
  return (
    <>
      <link rel="canonical" href={absoluteSiteUrl("/workshops/2025")} />
      <ProgramPage workshop={workshops["2025"]} />
    </>
  );
}
