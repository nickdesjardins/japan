import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Journey } from "@/components/sections/Journey";

export const metadata: Metadata = {
  title: "Day by day",
  description:
    "The whole journey in order — eleven days and twenty places, from the pier at Yokohama to the Thunder Gate at Asakusa.",
};

export default function JourneyPage() {
  return (
    <PageTransition>
      <Journey />
      <ChapterNav />
    </PageTransition>
  );
}
