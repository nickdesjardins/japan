import { SectionHeading } from "@/components/SectionHeading";
import { destinations } from "@/data/destinations";
import { GlossaryList, type GlossaryEntry } from "./GlossaryList";

/** Full place names run long; the back-link only needs the head of one. */
const shortName = (name: string) => name.split(/\s+[—&]\s+|,\s/)[0].trim();

/** Hangul syllables — the Jeju entries are Korean, everything else Japanese. */
const HANGUL = /[가-힣ᄀ-ᇿ㄰-㆏]/;

/** Flattened once at build time; the client only ever sees the strings. */
const entries: GlossaryEntry[] = destinations.flatMap((d) =>
  d.glossary.map((g) => ({
    term: g.term,
    script: g.script,
    meaning: g.meaning,
    place: shortName(d.name),
    placeId: d.id,
    lang: HANGUL.test(g.script) ? ("ko-KR" as const) : ("ja-JP" as const),
  })),
);

export function Glossary() {
  return (
    <section id="words" className="px-6 py-[clamp(6rem,12vw,11rem)]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          seal="言"
          eyebrow={`${entries.length} words you will meet`}
          title="Everything worth being able to name"
          lead={
            <>
              Not vocabulary to memorise — just the words that will be written on the
              things in front of you, so that a rope is a{" "}
              <span className="text-kin">shimenawa</span> and a gate is a{" "}
              <span className="text-kin">ryūgū-mon</span> and you know why.
            </>
          }
        />
        <GlossaryList entries={entries} />
      </div>
    </section>
  );
}
