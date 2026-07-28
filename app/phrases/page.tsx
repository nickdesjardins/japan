import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Phrasebook } from "@/components/sections/Phrasebook";

export const metadata: Metadata = {
  title: "Phrases",
  description:
    "Enough Japanese to be polite — the phrases worth having by heart, written, romanised and spoken aloud.",
};

export default function PhrasesPage() {
  return (
    <PageTransition>
      <Phrasebook />
      <ChapterNav />
    </PageTransition>
  );
}
