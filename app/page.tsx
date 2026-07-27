import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BeforeYouGo } from "@/components/sections/BeforeYouGo";
import { DragonLore } from "@/components/sections/DragonLore";
import { Glossary } from "@/components/sections/Glossary";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Overview } from "@/components/sections/Overview";
import { Phrasebook } from "@/components/sections/Phrasebook";
import { Traditions } from "@/components/sections/Traditions";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <Overview />
        <DragonLore />
        <Journey />
        <Traditions />
        <BeforeYouGo />
        <Phrasebook />
        <Glossary />
      </main>
      <SiteFooter />
    </>
  );
}
