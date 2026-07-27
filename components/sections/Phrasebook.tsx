import { SectionHeading } from "@/components/SectionHeading";
import { SpeakButton } from "@/components/SpeakButton";
import { Reveal } from "@/components/motion/Reveal";
import { phrasebook } from "@/data/prep";

const phraseCount = phrasebook.reduce((n, g) => n + g.phrases.length, 0);

export function Phrasebook() {
  return (
    <section id="phrases" className="relative px-6 py-[clamp(6rem,12vw,11rem)]">
      {/* 麻の葉 asanoha — the hemp-leaf lattice, a charm for growing straight.
          An apt ground for the part of the site you are meant to learn from. */}
      <div
        className="motif-asanoha pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          seal="語"
          eyebrow={`${phraseCount} phrases, said out loud`}
          title="Enough to be understood, and polite"
          lead={
            <>
              Press the speaker on any line to hear it. The slashed line underneath is a
              respelling for an English mouth — Japanese has no stressed syllable, so
              give every beat the same weight and you will already sound better than
              most.
            </>
          }
        />

        <div className="mt-16 space-y-20">
          {phrasebook.map((group) => (
            <Reveal key={group.group} as="section">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-kincha/25 pb-5">
                <h3 className="font-display text-[clamp(1.35rem,1.1rem+1vw,1.85rem)] font-semibold text-shironeri">
                  {group.group}
                </h3>
                <span className="border border-kincha/30 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-kincha">
                  {group.lang === "ja-JP" ? "Japanese" : "Korean"}
                </span>
              </div>
              <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.75] text-rikyu">
                {group.note}
              </p>

              <ul className="mt-9 grid gap-px bg-kincha/18 sm:grid-cols-2 xl:grid-cols-3">
                {group.phrases.map((phrase) => (
                  <li key={phrase.en} className="flex flex-col bg-sumi p-6">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-nezu">
                      {phrase.en}
                    </p>

                    <div className="mt-3 flex items-start justify-between gap-4">
                      <p
                        className="font-jp text-[1.55rem] leading-tight text-kin"
                        lang={group.lang === "ja-JP" ? "ja" : "ko"}
                      >
                        {phrase.script}
                      </p>
                      <SpeakButton text={phrase.script} lang={group.lang} />
                    </div>

                    <p className="mt-3 text-[0.95rem] text-shironeri">{phrase.romaji}</p>
                    <p className="mt-1.5 font-mono text-[0.82rem] tracking-wide text-mizu">
                      /{phrase.phonetic}/
                    </p>

                    {phrase.tip ? (
                      <p className="mt-4 border-t border-kincha/15 pt-3 text-[0.8rem] leading-relaxed text-nezu">
                        {phrase.tip}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border border-kincha/25 bg-roiro/50 p-7 sm:p-9">
          <h3 className="font-display text-xl text-shironeri">
            If the speaker button sounds wrong
          </h3>
          <p className="mt-4 max-w-3xl text-[0.95rem] leading-[1.75] text-rikyu">
            The audio uses whatever voices your device already has. Windows and macOS
            both ship Japanese voices, but they are not always installed by default —
            if a phrase comes out with an English accent, add the Japanese language
            pack in your system settings and it will sound right. The button&rsquo;s
            tooltip will tell you if no Japanese voice was found.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
