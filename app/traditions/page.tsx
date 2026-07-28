import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Traditions } from "@/components/sections/Traditions";

export const metadata: Metadata = {
  title: "Traditions",
  description:
    "Shrine manners, the bath, chopsticks — the customs worth knowing before the first morning ashore.",
};

export default function TraditionsPage() {
  return (
    <PageTransition>
      <Traditions />
      <ChapterNav />
    </PageTransition>
  );
}
