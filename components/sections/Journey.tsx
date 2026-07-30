import { DestinationCard } from "@/components/DestinationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TransitRail } from "@/components/TransitRail";
import { Torii, WaveBand } from "@/components/art/Motifs";
import { Reveal } from "@/components/motion/Reveal";
import { destinations, type Destination } from "@/data/destinations";
import {
  advisoryForChapter,
  legsForChapter,
  portCallForChapter,
} from "@/data/transit";
import { chapters, type Chapter, type ChapterKind } from "@/data/voyage";

const byId = new Map(destinations.map((d) => [d.id, d]));


const KIND_LABEL: Record<ChapterKind, string> = {
  transit: "In transit",
  landfall: "Landfall",
  port: "Port of call",
  cruising: "Scenic cruising",
  sea: "A day at sea",
  city: "Ashore",
};

/** Chapters spent on the water get the deep-indigo ground. */
const isDeepSea = (kind: ChapterKind) => kind === "sea" || kind === "cruising";

export function Journey() {
  return (
    <section id="journey" className="relative">
      <div className="px-6 pb-[clamp(4rem,8vw,7rem)] pt-[clamp(6rem,12vw,11rem)]">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            seal="旅"
            eyebrow="Eleven days, twenty places"
            title="The whole journey, in order"
            lead={
              <>
                Each day below is a chapter: where the ship is, what you go and see, and
                the story that makes it worth going to see. Read it straight through and
                the dragon shows up again and again — which is the point.
              </>
            }
          />
        </div>
      </div>

      {chapters.map((chapter) => {
        const stops = chapter.stops
          .map((id) => byId.get(id))
          .filter((d): d is Destination => Boolean(d));
        const deep = isDeepSea(chapter.kind);

        return (
          <div
            key={chapter.id}
            id={chapter.id}
            className="relative"
            style={deep ? { backgroundColor: "var(--color-kachi)" } : undefined}
          >
            <div className="mx-auto max-w-6xl px-6 py-[clamp(3.5rem,7vw,6rem)]">
              <ChapterHeader chapter={chapter} />

              <TransitRail
                legs={legsForChapter(chapter.id)}
                advisory={advisoryForChapter(chapter.id)}
                portCall={portCallForChapter(chapter.id)}
              />

              {stops.length > 0 ? (
                <div className="mt-16 space-y-[clamp(4rem,8vw,7rem)]">
                  {stops.map((stop, i) => (
                    <DestinationCard key={stop.id} destination={stop} index={i} />
                  ))}
                </div>
              ) : null}
            </div>

            {deep ? (
              <WaveBand className="pointer-events-none absolute inset-x-0 bottom-0 h-24 text-sumi" />
            ) : null}
          </div>
        );
      })}
    </section>
  );
}

function ChapterHeader({ chapter }: { chapter: Chapter }) {
  const portish = chapter.kind === "port" || chapter.kind === "landfall";

  return (
    <Reveal className="relative">
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
        {/* the day numeral, standing behind a torii for the port calls */}
        <div className="relative flex items-start gap-5">
          {portish ? (
            <Torii className="absolute -left-6 -top-5 w-32 text-shu/[0.18]" />
          ) : null}
          <p className="relative font-display text-[clamp(3.4rem,10vw,5.5rem)] font-bold leading-[0.8] text-kin/85">
            {String(chapter.day).padStart(2, "0")}
          </p>
          <div className="relative pt-2">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-nezu">Day</p>
            <p className="tategaki mt-3 font-jp text-base text-kincha" lang="ja">
              {chapter.placeScript}
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.62rem] uppercase tracking-[0.3em] text-nezu">
            <span>
              {chapter.weekday}, {chapter.date}
            </span>
            <span className="border border-kincha/30 px-2.5 py-1 text-kincha">
              {KIND_LABEL[chapter.kind]}
            </span>
          </p>

          <h3 className="mt-5 font-display text-[clamp(1.8rem,1.3rem+2vw,2.9rem)] font-semibold leading-[1.08] text-shironeri">
            {chapter.place}
          </h3>

          <p className="mt-4 font-display text-[1.2rem] italic leading-snug text-ni">
            {chapter.headline}
          </p>

          <p className="mt-5 max-w-2xl leading-[1.78] text-rikyu">{chapter.note}</p>
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-gradient-to-r from-kincha/45 via-kincha/15 to-transparent" />
    </Reveal>
  );
}
