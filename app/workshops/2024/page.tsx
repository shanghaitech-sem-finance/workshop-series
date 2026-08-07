import type { Metadata } from "next";
import { ProgramPage } from "../../components/ProgramPage";
import { workshops } from "../../data/workshops";

export const metadata: Metadata = {
  title: "2024 Program",
  description: "Program for the 2024 SEM Finance Workshop.",
};

export const dynamic = "force-static";

export default function Workshop2024() {
  return <ProgramPage workshop={workshops["2024"]} />;
}
