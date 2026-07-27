"use client";

import { useEffect, useState } from "react";

const UNITS = [
  { key: "days", label: "days" },
  { key: "hours", label: "hours" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "sec" },
] as const;

type Parts = Record<(typeof UNITS)[number]["key"], number>;

function split(ms: number): Parts {
  const clamped = Math.max(0, ms);
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor(clamped / 3_600_000) % 24,
    minutes: Math.floor(clamped / 60_000) % 60,
    seconds: Math.floor(clamped / 1000) % 60,
  };
}

/**
 * Counts down to wheels-up. Rendered empty on the server and filled in after
 * mount — the value depends on the current clock, so there is nothing stable
 * to prerender.
 */
export function Countdown({ target, className }: { target: string; className?: string }) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const deadline = new Date(target).getTime();
    const tick = () => setParts(split(deadline - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <dl
      className={`flex items-end gap-5 sm:gap-7 ${className ?? ""}`}
      aria-label="Time until departure"
    >
      {UNITS.map(({ key, label }) => (
        /* dt before dd in the DOM — a definition list pairs them in source
           order, and emitting the value first told assistive tech that "12"
           was the term and "hours" its definition. flex-col-reverse puts the
           number back on top visually. */
        <div key={key} className="flex flex-col-reverse items-center">
          <dt className="mt-2 text-[0.6rem] uppercase tracking-[0.28em] text-nezu">
            {label}
          </dt>
          <dd
            className="font-display text-3xl leading-none tabular-nums text-kin sm:text-4xl"
            /* fixed width so the layout doesn't twitch as digits change */
            style={{ minWidth: "2.2ch", textAlign: "center" }}
          >
            {parts ? String(parts[key]).padStart(2, "0") : "––"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
