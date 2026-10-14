import type { Metadata } from "next";
import { ChapterNav } from "@/components/ChapterNav";
import { PageTransition } from "@/components/PageTransition";
import { SchedulePlanner } from "@/components/SchedulePlanner";
import { Hanko } from "@/components/SectionHeading";
import { scheduleEvents, scheduleDays } from "@/data/schedules";

export const metadata: Metadata = {
  title: "Schedules",
  description: "The Japan & Korea master schedule: booking windows, cruise payments, flights, every ground transfer, and Google Calendar export. October 2026–July 2027.",
};

export default function SchedulesPage() {
  return (
    <PageTransition>
      <header className="relative mx-auto max-w-6xl px-5 pb-10 pt-[clamp(7rem,12vw,11rem)] sm:px-6">
        <div className="flex items-center gap-4"><Hanko char="暦" /><p className="text-[0.65rem] uppercase tracking-[0.3em] text-nezu">October 14, 2026 — July 29, 2027</p></div>
        <h1 className="mt-7 font-display text-[clamp(2.6rem,2rem+3vw,4.6rem)] font-semibold leading-[1.1] tracking-tight text-shironeri">The journey, <span className="text-gold-leaf">on the calendar.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rikyu">One place for the things to book, the dates that matter, and every ride from your front door to Japan and home again.</p>
      </header>
      <SchedulePlanner events={scheduleEvents} days={scheduleDays} />
      <ChapterNav />
    </PageTransition>
  );
}
