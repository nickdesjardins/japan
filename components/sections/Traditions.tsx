import { SectionHeading } from "@/components/SectionHeading";
import { Chochin } from "@/components/art/Motifs";
import { Reveal } from "@/components/motion/Reveal";
import { rituals } from "@/data/voyage";
import { Customs } from "./Customs";
import { Omikuji } from "./Omikuji";

export function Traditions() {
  return (
    <section id="traditions" className="relative px-6 py-[clamp(6rem,12vw,11rem)]">
      {/* A row of lanterns strung across the top, each swinging on its own
          clock so the line never moves as one block. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-px w-full bg-kincha/25" />
        <div className="flex justify-between px-[6%]">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Chochin
              key={i}
              className="anim-sway w-14 text-ni/70 sm:w-20"
              style={{
                animationDuration: `${4.2 + i * 0.55}s`,
                animationDelay: `${i * 0.35}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl pt-32 sm:pt-40">
        <SectionHeading
          seal="礼"
          eyebrow="Things you will do with your hands"
          title="How to join in, rather than watch"
          lead={
            <>
              None of this is difficult and nobody will mind if you get it wrong. But
              knowing the sequence turns you from someone watching a ritual into someone
              taking part in one — and that is a much better afternoon.
            </>
          }
        />

        <Reveal stagger={90} className="mt-16 grid gap-8 md:grid-cols-2">
          {rituals.map((ritual) => (
            <article key={ritual.name} className="border border-kincha/22 bg-roiro/50 p-7 sm:p-8">
              <h3 className="font-display text-xl text-shironeri">{ritual.name}</h3>
              <p className="mt-1.5 font-jp text-sm text-kin" lang="ja">{ritual.script}</p>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-nezu">
                {ritual.where}
              </p>
              <ol className="mt-6 space-y-3">
                {ritual.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 text-[0.92rem] leading-[1.7] text-rikyu">
                    <span className="mt-0.5 font-display text-xs tabular-nums text-kincha">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {ritual.note ? (
                <p className="mt-6 border-t border-kincha/20 pt-4 text-[0.85rem] leading-relaxed text-mizu">
                  {ritual.note}
                </p>
              ) : null}
            </article>
          ))}
        </Reveal>

        <Customs />

        <Reveal className="mt-24 border-t border-kincha/20 pt-16">
          <h3 className="font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)] font-semibold text-shironeri">
            Draw a fortune before you go
          </h3>
          <p className="mt-4 max-w-2xl leading-[1.75] text-rikyu">
            You will do this for real at least twice on this trip. Here is a practice
            run.
          </p>
          <div className="mt-12">
            <Omikuji />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
