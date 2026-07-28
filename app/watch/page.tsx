import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { BeforeYouGo } from "@/components/sections/BeforeYouGo";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "An evening's viewing before July 2027 — shrine manners, the bath, chopsticks, and the two ports where a day ashore goes fastest.",
};

export default function WatchPage() {
  return (
    <PageTransition>
      <BeforeYouGo />
      {/* Set on indigo, like the lore chapter — see the note there. */}
      <div style={{ backgroundColor: "var(--color-kachi)" }}>
        <ChapterNav />
      </div>
    </PageTransition>
  );
}
