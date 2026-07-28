"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapterIndex, chapters } from "@/data/nav";

/* Splitting the scroll into chapters costs the reader the one thing a long
   page gave for free: the next thing always arrived on its own. This puts it
   back. Both links are typed by their real direction, so continuing reads as
   the same leftward slide as picking the chapter from the menu. */
export function ChapterNav() {
  const pathname = usePathname();
  const index = chapterIndex(pathname);
  if (index < 0) return null;

  const previous = chapters[index - 1];
  const next = chapters[index + 1];

  return (
    <nav
      aria-label="Chapter"
      className="mx-auto grid max-w-6xl gap-px border-t border-kincha/20 px-6 py-[clamp(3rem,6vw,5rem)] sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          transitionTypes={["nav-back"]}
          className="group flex flex-col gap-2 py-4 pr-6 text-left transition-colors sm:border-r sm:border-kincha/15"
        >
          <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-nezu">
            <span
              className="transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              ←
            </span>
            Previous
          </span>
          <span className="flex items-baseline gap-2.5 font-display text-[clamp(1.15rem,1rem+0.7vw,1.5rem)] text-rikyu transition-colors group-hover:text-kin">
            <span className="font-brush text-kincha" aria-hidden="true">
              {previous.script}
            </span>
            {previous.label}
          </span>
          <span className="text-sm text-nezu">{previous.blurb}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next && (
        <Link
          href={next.href}
          transitionTypes={["nav-forward"]}
          className="group flex flex-col gap-2 py-4 text-left sm:items-end sm:pl-6 sm:text-right"
        >
          <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-nezu">
            Next
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
          <span className="flex items-baseline gap-2.5 font-display text-[clamp(1.15rem,1rem+0.7vw,1.5rem)] text-shironeri transition-colors group-hover:text-kin">
            <span className="font-brush text-kincha" aria-hidden="true">
              {next.script}
            </span>
            {next.label}
          </span>
          <span className="text-sm text-nezu">{next.blurb}</span>
        </Link>
      )}
    </nav>
  );
}
