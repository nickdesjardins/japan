import { Reveal } from "@/components/motion/Reveal";
import { TransitGlyph, MODE_LABEL } from "@/components/art/TransitGlyphs";
import type { PortCall, TransitLeg } from "@/data/transit";

/**
 * 行程 — the day's movements, every one of them, in order.
 *
 * The rule this component exists to enforce: no leg is implied. If your body
 * has to cross a distance, it gets a row, a means and a duration — including
 * the walk back from the cave and the flight of steps up the headland, which
 * is exactly where a plan built only from taxi bookings falls apart.
 */
export function TransitRail({
  legs,
  advisory,
  portCall,
}: {
  legs: TransitLeg[];
  advisory?: string;
  portCall?: PortCall;
}) {
  if (legs.length === 0) return null;

  /* Asides are fallbacks and side trips. Counting a fallback alongside the
     leg it falls back from would bill the day for both. */
  const counted = legs.filter((l) => !l.aside);
  const total = counted.reduce((sum, l) => sum + l.minutes, 0);
  const moves = counted.filter((l) => l.minutes > 0).length;

  const summary =
    moves === 0 ? (
      "Nothing to catch"
    ) : (
      <>
        <span className="tabular-nums text-kin">{moves}</span>{" "}
        {moves === 1 ? "leg" : "legs"} ·{" "}
        <span className="tabular-nums text-kin">{humanise(total)}</span> moving
      </>
    );

  return (
    <Reveal className="mt-12">
      <div className="border border-kincha/25 bg-roiro/55">
        {/* Deliberately outside the fold. The boarding deadline and the day's
            warning are the two things you would least want folded away, and a
            collapsed day should still show you what time to be back. */}
        {portCall ? <PortCallBand call={portCall} /> : null}

        {advisory ? (
          <p className="flex gap-3.5 border-b border-shu/25 bg-bengara/[0.09] px-5 py-4 text-[0.86rem] leading-[1.7] text-kinari sm:px-7">
            <span
              className="mt-0.5 font-display text-base font-semibold leading-none text-shu"
              aria-hidden="true"
            >
              !
            </span>
            <span>
              <span className="sr-only">Warning for this day: </span>
              {advisory}
            </span>
          </p>
        ) : null}

        {/* <details> rather than React state: it opens without JavaScript, it
            is keyboard-operable and screen-reader-announced for free, and
            ctrl-F still finds text inside a closed one in most browsers. */}
        <details className="group">
          <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 py-4 transition-colors hover:bg-kincha/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-kin group-open:border-b group-open:border-kincha/20 sm:px-7 [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-3">
              <span
                className="font-brush text-lg leading-none text-kincha"
                aria-hidden="true"
              >
                程
              </span>
              <span className="text-[0.62rem] uppercase tracking-[0.32em] text-nezu transition-colors group-hover:text-rikyu">
                Every move you make today
              </span>
            </span>

            <span className="flex items-baseline gap-3 text-[0.68rem] tracking-wide text-nezu">
              {/* one flex item, not four — a bare fragment here would let the
                  gap fall between "11", "legs ·" and "1 h 51 min" */}
              <span>{summary}</span>
              <Chevron className="h-3 w-3 shrink-0 translate-y-px text-kincha transition-transform duration-300 group-open:-rotate-180" />
            </span>
          </summary>

          <ol className="px-5 py-2 sm:px-7">
            {legs.map((leg, i) => (
              <Leg
                key={`${leg.from}-${leg.to}-${i}`}
                leg={leg}
                last={i === legs.length - 1}
              />
            ))}
          </ol>
        </details>
      </div>
    </Reveal>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 8 8 8 8-8" />
    </svg>
  );
}

/**
 * 最終乗船時刻 — the last-boarding time, given its own band because it is the
 * only number on the page with a consequence you cannot undo. Everything else
 * here costs you time; this one costs you the ship.
 */
function PortCallBand({ call }: { call: PortCall }) {
  return (
    <div className="border-b border-kincha/20 bg-kachi/45 px-5 py-5 sm:px-7">
      <p className="text-[0.58rem] uppercase tracking-[0.3em] text-nezu">
        {call.port}
      </p>

      <div className="mt-4 grid gap-px overflow-hidden border border-kincha/25 bg-kincha/25 sm:grid-cols-3">
        <Slot label={call.ashoreLabel ?? "Ashore from"} time={call.ashore} />
        {/* Yours, not the ship's. At a tender port the ship's own deadline is
            the boat leaving the pier, so that is what goes in the small line. */}
        <Slot
          label={call.beBackByLabel ?? "Be back by"}
          time={call.beBackBy}
          urgent
          sub={
            call.lastTender
              ? `ship's last tender ${call.lastTender}`
              : `${call.allAboardLabel ?? "ship's all aboard"} ${call.allAboard}`
          }
        />
        <Slot label="Ship sails" time={call.sails} />
      </div>

      {call.note ? (
        <p className="mt-4 text-[0.82rem] leading-[1.65] text-rikyu">{call.note}</p>
      ) : null}

      {/* Stated once per port day rather than buried in one note, because it
          is the thing that turns a missed deadline from expensive into final. */}
      <p className="mt-4 border-t border-kincha/20 pt-4 text-[0.78rem] leading-[1.6] text-nezu">
        <span className="text-rikyu">
          {call.convention ??
            "The big number is ours, not the ship’s — ninety minutes before she sails rather than the thirty Princess asks for."}
        </span>{" "}
        Princess sails on schedule and says in writing that she may do it with no
        announcement; there is no last call. And on a Japan round trip Princess Japan
        does not accept boarding at a later port, so there is nothing to catch her up
        from. Both times here are derived from the published sailing time — the
        binding one is in the Princess app and on the gangway sign that morning.
      </p>
    </div>
  );
}

function Slot({
  label,
  time,
  sub,
  urgent,
}: {
  label: string;
  time: string;
  sub?: string;
  urgent?: boolean;
}) {
  return (
    <div className={`px-5 py-4 ${urgent ? "bg-bengara/25" : "bg-sumi"}`}>
      <p
        className={`text-[0.58rem] uppercase tracking-[0.24em] ${
          urgent ? "text-shinshu" : "text-nezu"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1.5 font-display text-2xl font-semibold leading-none tabular-nums ${
          urgent ? "text-yamabuki" : "text-shironeri"
        }`}
      >
        {time}
      </p>
      {sub ? (
        <p className="mt-1.5 text-[0.7rem] tabular-nums text-nezu">{sub}</p>
      ) : null}
    </div>
  );
}

function Leg({ leg, last }: { leg: TransitLeg; last: boolean }) {
  const aside = Boolean(leg.aside);

  return (
    <li className="grid grid-cols-[3.2rem_auto_1fr] gap-x-3 sm:grid-cols-[4rem_auto_1fr] sm:gap-x-5">
      {/* ------------------------------------------------- the clock column */}
      <p className="pt-[1.1rem] text-right text-[0.72rem] leading-none tabular-nums text-kin">
        {leg.depart ?? <span className="text-nezu/40">·</span>}
      </p>

      {/* ------------------------------------------- the rail, with its node */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <span
          className={`mt-[0.85rem] grid h-7 w-7 shrink-0 place-items-center rounded-full border bg-sumi ${
            aside ? "border-kincha/25 text-nezu" : "border-kincha/45 text-kincha"
          }`}
        >
          <TransitGlyph mode={leg.mode} className="h-[0.95rem] w-[0.95rem]" />
        </span>
        {last ? null : (
          <span
            className="w-px flex-1"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-kincha) 45%, transparent) 0 5px, transparent 5px 10px)",
            }}
          />
        )}
      </div>

      {/* ------------------------------------------------------------- body */}
      <div className={`min-w-0 pt-3 ${last ? "pb-5" : "pb-7"} ${aside ? "opacity-85" : ""}`}>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {leg.aside ? (
            <span className="border border-nezu/35 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.22em] text-nezu">
              {leg.aside === "instead" ? "Instead" : "If you fancy it"}
            </span>
          ) : null}
          <span className="text-[0.6rem] uppercase tracking-[0.28em] text-mizu">
            {MODE_LABEL[leg.mode]}
          </span>
          {leg.duration === "—" ? null : (
            <span className="border border-kin/35 px-2 py-0.5 text-[0.7rem] font-medium text-kin">
              {leg.duration}
            </span>
          )}
          {leg.distance ? (
            <span className="text-[0.7rem] text-nezu">{leg.distance}</span>
          ) : null}
          {leg.arrive ? (
            <span className="text-[0.7rem] text-nezu">arrive {leg.arrive}</span>
          ) : null}
        </p>

        <p className="mt-2 font-display text-[1.02rem] leading-snug text-shironeri">
          {leg.from}{" "}
          <span className="px-0.5 text-kincha" aria-hidden="true">
            →
          </span>
          <span className="sr-only">to</span> {leg.to}
        </p>

        <p className="mt-2 text-[0.86rem] leading-[1.7] text-rikyu">{leg.means}</p>

        {leg.note ? (
          <p className="mt-2 text-[0.82rem] leading-[1.65] text-nezu">{leg.note}</p>
        ) : null}

        {leg.caution ? (
          <p className="mt-3 flex gap-2.5 border-l-2 border-shu/60 pl-3 text-[0.82rem] leading-[1.6] text-kinari">
            <span
              className="font-display font-semibold leading-none text-shu"
              aria-hidden="true"
            >
              !
            </span>
            <span>
              <span className="sr-only">Check this: </span>
              {leg.caution}
            </span>
          </p>
        ) : null}
      </div>
    </li>
  );
}

/**
 * How you get to one particular place, compressed to a single line for the
 * top of its card — the day's rail has the detail, this just answers the
 * question you actually have while looking at the photograph.
 */
export function ArrivalChain({ legs }: { legs: TransitLeg[] }) {
  if (legs.length === 0) return null;

  /* Waiting still costs you the clock, so it counts toward the total — but
     berthing and border formalities are not a *way of travelling*, so they
     stay out of the means list and never supply the origin. */
  const total = legs.reduce((sum, l) => sum + l.minutes, 0);
  const moves = legs.filter((l) => l.mode !== "stay");
  const origin = (moves[0] ?? legs[0]).from;

  /* A mode repeated back-to-back would read as two separate hops when it is
     really one continued move. */
  const chain = moves.filter((leg, i) => i === 0 || leg.mode !== moves[i - 1].mode);

  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-l-2 border-kincha/40 py-0.5 pl-3.5 text-[0.78rem] leading-snug text-nezu">
      <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
        {chain.map((leg, i) => (
          <TransitGlyph
            key={`${leg.mode}-${i}`}
            mode={leg.mode}
            className="h-3.5 w-3.5 shrink-0 text-kincha"
          />
        ))}
      </span>
      <span className="text-kin">
        <span className="sr-only">Getting here: </span>
        {total > 0 ? `about ${humanise(total)}` : "no travel"}
      </span>
      <span>
        from {origin}
        {chain.length > 1 ? (
          <span className="text-nezu/75">
            {" "}
            — {chain.map((l) => MODE_LABEL[l.mode].toLowerCase()).join(", ")}
          </span>
        ) : null}
      </span>
    </p>
  );
}

/** 95 → "1 h 35 min", so the header total reads the way a person would say it. */
function humanise(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}
