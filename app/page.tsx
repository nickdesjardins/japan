import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      {/* The hero's scroll cue aims here, so it still promises something real. */}
      <div id="continue">
        <ChapterNav />
      </div>
    </PageTransition>
  );
}
