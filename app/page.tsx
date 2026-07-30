import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { PlainEnglish } from "@/components/sections/PlainEnglish";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      {/* The hero's scroll cue aims here, so it still promises something real. */}
      <div id="continue">
        <PlainEnglish />
        <ChapterNav />
      </div>
    </PageTransition>
  );
}
