import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Overview } from "@/components/sections/Overview";

export const metadata: Metadata = {
  title: "The voyage",
  description:
    "The shape of the route: eleven days, twenty-one places, from Yokohama around Japan and Jeju aboard the Diamond Princess.",
};

export default function VoyagePage() {
  return (
    <PageTransition>
      <Overview />
      <ChapterNav />
    </PageTransition>
  );
}
