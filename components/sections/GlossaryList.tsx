"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";
import { chapterIndex, navDirection } from "@/data/nav";

export type GlossaryEntry = {
  term: string;
  script: string;
  meaning: string;
  place: string;
  placeId: string;
  lang: "ja-JP" | "ko-KR";
};

export function GlossaryList({ entries }: { entries: GlossaryEntry[] }) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  /* Every "→ place" link points at a destination card, and those cards now
     live on their own chapter. Asking the running order for the direction
     keeps the slide honest even if the chapters are ever reordered. */
  const toJourney = navDirection(pathname, chapterIndex("/journey"));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) =>
      `${e.term} ${e.script} ${e.meaning} ${e.place}`.toLowerCase().includes(q),
    );
  }, [entries, query]);

  return (
    <div>
      {/* The result count sits OUTSIDE the label. Inside, it was concatenated
          into the input's accessible name, so the field announced itself as
          "Search the glossary 84/84". */}
      <div className="mt-12 flex items-center gap-4 border-b border-kincha/30 pb-3 focus-within:border-kin">
        <span className="font-brush text-xl text-kincha" aria-hidden="true">
          探
        </span>
        <label htmlFor="glossary-search" className="sr-only">
          Search the glossary
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search — try “dragon”, “rope”, “fortune”…"
          className="w-full bg-transparent py-1 text-base text-shironeri outline-none placeholder:text-nezu"
        />
        <span aria-hidden="true" className="shrink-0 text-xs tabular-nums text-nezu">
          {filtered.length}/{entries.length}
        </span>
      </div>

      {/* Announced instead of the raw counter, so filtering is perceivable
          without sight. */}
      <p role="status" aria-live="polite" className="sr-only">
        {filtered.length === entries.length
          ? `Showing all ${entries.length} words.`
          : `${filtered.length} of ${entries.length} words match “${query}”.`}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-rikyu">
          Nothing by that name. Try <span className="text-kin">ryū</span>,{" "}
          <span className="text-kin">kami</span> or <span className="text-kin">shrine</span>.
        </p>
      ) : (
        <dl className="mt-12 grid gap-px border border-kincha/20 bg-kincha/20 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <div key={`${e.placeId}-${e.term}`} className="flex flex-col bg-sumi p-6">
              <dt>
                <span className="flex items-start justify-between gap-3">
                  <span className="font-jp text-2xl leading-tight text-kin" lang={e.lang === "ko-KR" ? "ko" : "ja"}>
                    {e.script}
                  </span>
                  <SpeakButton text={e.script} lang={e.lang} size="sm" />
                </span>
                <span className="mt-1.5 block text-sm text-shironeri">{e.term}</span>
              </dt>
              <dd className="mt-3 flex-1 text-[0.88rem] leading-[1.7] text-rikyu">
                {e.meaning}
              </dd>
              {/* a second <dd> rather than a bare <a>: a dl's grouping div may
                  only contain dt and dd elements */}
              <dd className="mt-5">
                <Link
                  href={`/journey#${e.placeId}`}
                  transitionTypes={[toJourney]}
                  className="text-[0.6rem] uppercase tracking-[0.26em] text-nezu transition-colors hover:text-kin"
                >
                  {e.place} →
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
