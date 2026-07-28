import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { DragonLore } from "@/components/sections/DragonLore";

export const metadata: Metadata = {
  title: "Dragon lore",
  description:
    "Ryūjin, the palace under the sea, and why every port on this route is anchored in sea-dragon mythology.",
};

export default function LorePage() {
  return (
    <PageTransition>
      <DragonLore />
      {/* This chapter is set on indigo. Carrying that through the pager keeps
          the single colour change on the page down at the footer, where the
          scrolling version put it too. */}
      <div style={{ backgroundColor: "var(--color-kachi)" }}>
        <ChapterNav />
      </div>
    </PageTransition>
  );
}
