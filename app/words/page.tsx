import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Glossary } from "@/components/sections/Glossary";

export const metadata: Metadata = {
  title: "Words",
  description:
    "Everything on this voyage worth being able to name — shrines, sea gods, boats, baths and the words for them.",
};

export default function WordsPage() {
  return (
    <PageTransition>
      <Glossary />
      <ChapterNav />
    </PageTransition>
  );
}
