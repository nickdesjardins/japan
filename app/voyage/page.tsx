import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Overview } from "@/components/sections/Overview";
import { PreDeparture } from "@/components/sections/PreDeparture";

export const metadata: Metadata = {
  title: "The voyage",
  description:
    "The shape of the route: eleven days, twenty-one places, from Yokohama around Japan and Jeju aboard the Diamond Princess — and everything to sort out before the taxi comes.",
};

export default function VoyagePage() {
  return (
    <PageTransition>
      <Overview />
      <PreDeparture />
      <ChapterNav />
    </PageTransition>
  );
}
