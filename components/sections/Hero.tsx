import { Countdown } from "@/components/Countdown";
import { Dragon } from "@/components/art/Dragon";
import { Seigaiha, SunDisc, WaveBand } from "@/components/art/Motifs";
import { Parallax, PetalFall } from "@/components/motion/Effects";
import { Reveal } from "@/components/motion/Reveal";
import { voyage } from "@/data/voyage";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-28 pt-24">
      {/* The sea, seen from above: night at the top, deep water below. */}
      <div
        className="absolute inset-0 -z-40"
        style={{
          background:
            "radial-gradient(125% 88% at 50% 118%, var(--color-konjo) 0%, var(--color-kachi) 38%, var(--color-sumi) 76%)",
        }}
      />

      {/* Sun low in the corner, turning slowly. */}
      <Parallax speed={-0.12} className="pointer-events-none absolute -right-20 -top-16 -z-30 w-[18rem] sm:w-[24rem]">
        <SunDisc className="w-full text-kin/25" />
      </Parallax>

      {/* Seigaiha field, fading upward out of the water. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-30 h-[46vh] text-ai/70"
        style={{
          maskImage: "linear-gradient(to top, black 8%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to top, black 8%, transparent 92%)",
        }}
      >
        <Seigaiha id="hero-seigaiha" className="h-full w-full" strokeWidth={1.2} opacity={0.55} />
      </div>

      {/* The dragon, swimming across the whole hero. */}
      <Parallax
        speed={0.16}
        className="pointer-events-none absolute inset-x-0 top-[52%] -z-20 hidden md:block"
      >
        <Dragon className="anim-float w-[135%] max-w-none -translate-x-[14%] text-kin/[0.10]" />
      </Parallax>

      <PetalFall className="-z-10" />

      {/* ---------------------------------------------------------------- */}
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal variant="ink" className="max-w-2xl">
            <p className="mb-6 flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.42em] text-nezu">
              <span className="h-px w-12 bg-kincha/60" />
              19 – 29 July 2027
            </p>

            <h1 className="font-display">
              <span className="block text-[clamp(1rem,2.2vw,1.3rem)] font-normal uppercase tracking-[0.5em] text-shu">
                Ryūgū
              </span>
              {/* background-clip:text paints only inside the line boxes, so the
                  line-height has to clear the descenders or the tail of the "g"
                  in "Dragon" is simply never painted. */}
              <span
                className="text-gold-leaf anim-shimmer mt-3 block text-[clamp(2.3rem,5.6vw,4.5rem)] font-bold leading-[1.25]"
                style={{ letterSpacing: "-0.015em" }}
              >
                Ten Nights to the
                <br />
                Dragon Palace
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-[clamp(1.05rem,0.98rem+0.4vw,1.2rem)] leading-[1.75] text-rikyu">
              A voyage around Japan and Jeju aboard the{" "}
              <em className="not-italic text-shironeri">{voyage.ship}</em>. Every port on
              this route is anchored in sea-dragon mythology — wedded rocks bound by
              rope, a cave lit by hand-held lanterns, a gate built to look like the
              palace under the waves, and a golden dragon painted across a temple
              ceiling in Asakusa.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#journey"
                className="group relative inline-flex items-center gap-3 bg-bengara px-7 py-3.5 text-sm font-medium tracking-wide text-shironeri transition-colors hover:bg-shu"
              >
                Follow the route
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href="#lore"
                className="border-b border-kincha/40 pb-1 text-sm text-mizu transition-colors hover:border-kin hover:text-kin"
              >
                Read the dragon lore first
              </a>
            </div>
          </Reveal>

          {/* Vertical rail — the ship's name written down the margin. */}
          <Reveal
            variant="right"
            delay={280}
            className="hidden shrink-0 lg:flex lg:items-end lg:gap-6"
          >
            <p className="tategaki font-jp text-2xl text-kincha" lang="ja">龍宮城</p>
            <p className="tategaki-latin text-[0.62rem] uppercase text-nezu">
              Diamond Princess · Yokohama
            </p>
          </Reveal>
        </div>

        <Reveal delay={420} className="mt-16 border-t border-kincha/20 pt-8">
          <p className="mb-5 text-[0.62rem] uppercase tracking-[0.34em] text-nezu">
            Until AC5 leaves Montréal
          </p>
          <Countdown target={voyage.departure} />
        </Reveal>
      </div>

      {/* Waves rolling along the bottom edge. */}
      <WaveBand className="absolute inset-x-0 bottom-0 -z-10 h-40 text-konjo/70" />

      <a
        href="#overview"
        aria-label="Scroll to the voyage overview"
        className="anim-float absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-kincha/70 transition-colors hover:text-kin"
      >
        <svg width="26" height="42" viewBox="0 0 26 42" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="24" height="40" rx="12" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="13" cy="12" r="3" fill="currentColor" />
        </svg>
      </a>
    </section>
  );
}
