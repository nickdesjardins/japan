import Image from "next/image";
import { Tilt } from "@/components/motion/Effects";
import { Reveal } from "@/components/motion/Reveal";
import type { Destination } from "@/data/destinations";

export function DestinationCard({
  destination: d,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <article
      id={d.id}
      /* anchor offset comes from scroll-padding-top on <html> */
      style={
        {
          "--accent": d.accent,
          "--accent-text": d.accentText,
        } as React.CSSProperties
      }
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------------------------------------------------------- image */}
        <Reveal
          variant="ink"
          as="figure"
          className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        >
          <Tilt className="relative">
            {/* shakkei — the frame sits offset behind the photograph, so the
                image reads as a view rather than a bounded rectangle */}
            <div
              className="absolute -inset-3 border hairline-gold sm:-inset-4"
              aria-hidden="true"
            />
            <Image
              src={d.image}
              /* The figcaption below already carries this description, so an
                 identical alt would make a screen reader say it twice. */
              alt=""
              /* The column is capped by max-w-6xl (1152px) at 7/12 minus the
                 gap, so it never exceeds ~621px however wide the viewport. */
              sizes="(min-width: 1152px) 621px, (min-width: 1024px) 58vw, 100vw"
              placeholder={d.image.blurDataURL ? "blur" : "empty"}
              loading="lazy"
              className="relative w-full"
              style={{ width: "100%", height: "auto" }}
            />
            {/* a wash of the destination's accent, so each place has a key */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: "var(--accent)", opacity: 0.16 }}
              aria-hidden="true"
            />
          </Tilt>

          <figcaption className="mt-6 flex items-baseline gap-3 text-xs text-nezu">
            <span className="h-px w-8 bg-kincha/50" aria-hidden="true" />
            {d.imageAlt}
          </figcaption>
        </Reveal>

        {/* ----------------------------------------------------------- text */}
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <Reveal variant={flip ? "left" : "right"}>
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-nezu">
              {d.day}
            </p>

            <h4 className="mt-4 font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.05rem)] font-semibold leading-tight text-shironeri">
              {d.name}
            </h4>

            <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-jp text-lg text-kincha" lang="ja">{d.japaneseName}</span>
              <span className="text-xs italic text-nezu">{d.romaji}</span>
            </p>

            <p
              className="mt-6 font-display text-[1.15rem] leading-[1.6] italic"
              style={{ color: "var(--accent-text)" }}
            >
              {d.tagline}
            </p>

            <p className="mt-6 leading-[1.78] text-rikyu">{d.story}</p>
          </Reveal>
        </div>
      </div>

      {/* -------------------------------------------------------- the lore */}
      <Reveal stagger={110} className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-14">
        {/* the myth */}
        <div className="border-l-2 border-shu/70 pl-6 lg:col-span-7 lg:pl-8">
          <p className="text-[0.6rem] uppercase tracking-[0.34em] text-shu">
            The story behind it
          </p>
          <h5 className="mt-3 font-display text-xl text-shironeri">{d.myth.title}</h5>
          <p className="mt-4 leading-[1.78] text-rikyu">{d.myth.text}</p>

          {d.dragonConnection ? (
            <p className="mt-7 flex gap-4 border-t border-kincha/20 pt-6 text-[0.95rem] leading-[1.7] text-kin">
              <span className="font-brush text-2xl leading-none text-kin/80" aria-hidden="true">
                龍
              </span>
              {d.dragonConnection}
            </p>
          ) : null}
        </div>

        {/* the practical, living side */}
        <div className="space-y-8 lg:col-span-5">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.34em] text-mizu">
              What people actually do here
            </p>
            <p className="mt-3 text-[0.95rem] leading-[1.75] text-rikyu">{d.tradition}</p>
          </div>

          <p className="border border-kincha/25 bg-roiro/60 p-5 text-[0.9rem] leading-[1.7] text-kinari">
            <span className="mr-2 font-display font-semibold text-yamabuki">◆</span>
            {d.didYouKnow}
          </p>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.34em] text-nezu">
              Words you will see here
            </p>
            <dl className="mt-4 space-y-3">
              {d.glossary.map((g) => (
                <div key={g.term} className="border-b border-kincha/15 pb-3 last:border-0">
                  <dt className="flex flex-wrap items-baseline gap-x-2.5">
                    <span className="font-jp text-base text-kin">{g.script}</span>
                    <span className="text-sm text-shironeri">{g.term}</span>
                  </dt>
                  <dd className="mt-1 text-[0.83rem] leading-relaxed text-nezu">
                    {g.meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
