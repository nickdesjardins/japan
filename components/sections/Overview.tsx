import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/motion/Effects";
import { Reveal } from "@/components/motion/Reveal";
import { voyage, voyageStats } from "@/data/voyage";
import { VoyageMap } from "./VoyageMap";

export function Overview() {
  return (
    <section id="overview" className="relative px-6 py-[clamp(6rem,12vw,11rem)]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          seal="航"
          eyebrow="The shape of the voyage"
          title={
            <>
              Seven nights at sea, four ports,
              <br className="hidden sm:block" /> and one strait taken slowly
            </>
          }
          lead={
            <>
              The route was not chosen for the beaches, although there are beaches. It
              was chosen because a sea dragon lives at the end of every leg of it — in
              a cave, on a cliff, under a bridge, over a gate, across a ceiling.
            </>
          }
        />

        <Reveal stagger={70} className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-kincha/20 bg-kincha/20 sm:grid-cols-3">
          {voyageStats.map((stat) => (
            <div key={stat.label} className="bg-sumi p-6 sm:p-8">
              <p className="font-display text-4xl font-semibold text-kin sm:text-5xl">
                <Counter to={stat.value} />
              </p>
              <p className="mt-2 text-sm font-medium tracking-wide text-shironeri">
                {stat.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-nezu">{stat.note}</p>
            </div>
          ))}
        </Reveal>

        <Reveal variant="scale" className="mt-20">
          <VoyageMap />
        </Reveal>

        <Reveal stagger={90} className="mt-20 grid gap-8 md:grid-cols-3">
          <Detail
            label="The ship"
            value={voyage.ship}
            script={voyage.shipScript}
            note="Built in Nagasaki in 2004 — one of the very few large cruise ships made in Japan, which is why she keeps a proper cypress bath on deck."
          />
          <Detail
            label="Sails from"
            value={voyage.homePort}
            script={voyage.homePortScript}
            note="The timber-decked terminal locals call the whale's back. No railings on the roof, just a grass-and-wood field over the water."
          />
          <Detail
            label="The long way there"
            value={`${voyage.outboundFlight} · ${voyage.aircraft}`}
            script="モントリオール ⇄ 成田"
            note="Thirteen hours and twenty minutes non-stop from Montréal, straight over the pole. You land the day after you leave."
          />
        </Reveal>
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
  script,
  note,
}: {
  label: string;
  value: string;
  script: string;
  note: string;
}) {
  return (
    <div className="border-t border-kincha/25 pt-6">
      <p className="text-[0.62rem] uppercase tracking-[0.32em] text-nezu">{label}</p>
      <p className="mt-3 font-display text-xl text-shironeri">{value}</p>
      <p className="mt-1 font-jp text-sm text-kincha" lang="ja">{script}</p>
      <p className="mt-4 text-sm leading-relaxed text-rikyu">{note}</p>
    </div>
  );
}
