import { SectionHeading } from "@/components/SectionHeading";
import { CloudBand } from "@/components/art/Motifs";
import { Reveal } from "@/components/motion/Reveal";
import { MAP_APPS } from "@/data/maps";
import { beforeYouLeave, packing } from "@/data/predeparture";

export function PreDeparture() {
  return (
    <section
      id="before"
      className="relative px-6 py-[clamp(6rem,12vw,11rem)]"
      style={{ backgroundColor: "var(--color-kachi)" }}
    >
      {/* 雲 — the cloud band is how a folding screen changes scene */}
      <CloudBand className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full rotate-180 text-sumi" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          seal="備"
          eyebrow="Before the taxi comes"
          title="What to sort out, and what to bring"
          lead={
            <>
              None of this is exciting and all of it is load-bearing. The phone in
              your pocket is the single most useful object on this trip — but only if
              the right things are on it before you leave, because two of them cannot
              be installed once you are there.
            </>
          }
        />

        {/* -------------------------------------------------------- the apps */}
        <Reveal className="mt-20">
          <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-semibold text-shironeri">
            On your phone
          </h3>
          <p className="mt-4 max-w-3xl leading-[1.78] text-rikyu">
            Google Maps is excellent in Japan and cannot give you directions of any
            kind in South Korea — not driving, not walking, not cycling. That is a
            legal problem rather than a technical one: Korean law forbids exporting
            the detailed national basemap abroad, and Google has been asking since
            2007. So the Jeju day needs a different app, and it needs installing
            before you sail.
          </p>
        </Reveal>

        <Reveal
          stagger={70}
          className="mt-12 grid gap-px border border-kincha/20 bg-kincha/20 md:grid-cols-2"
        >
          {MAP_APPS.map((app) => (
            <div key={app.name} className="flex flex-col bg-sumi p-6 sm:p-7">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg font-semibold text-shironeri">
                  {app.name}
                </span>
                {app.script ? (
                  <span className="font-jp text-sm text-kincha" lang={app.scriptLang}>
                    {app.script}
                  </span>
                ) : null}
                {app.essential ? (
                  <span className="border border-shu/50 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.22em] text-shu">
                    Get this one
                  </span>
                ) : null}
              </p>

              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.28em] text-mizu">
                {app.where}
              </p>

              <p className="mt-4 flex-1 text-[0.9rem] leading-[1.75] text-rikyu">
                {app.what}
              </p>

              {app.before ? (
                <p className="mt-5 border-t border-kincha/20 pt-4 text-[0.84rem] leading-[1.7] text-kinari">
                  <span className="mr-2 text-[0.6rem] uppercase tracking-[0.24em] text-yamabuki">
                    Before you go
                  </span>
                  {app.before}
                </p>
              ) : null}
            </div>
          ))}
        </Reveal>

        {/* ------------------------------------------------------ the admin */}
        <Reveal className="mt-24">
          <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-semibold text-shironeri">
            Things to do first
          </h3>
          <p className="mt-4 max-w-3xl leading-[1.78] text-rikyu">
            Counting backwards from the 19th. Where a government service is named
            below, that domain is the only place to use it — every one of these has
            look-alike sites that charge for something free, and they buy the search
            ads.
          </p>
        </Reveal>

        <Reveal stagger={60} className="mt-12 space-y-px border border-kincha/20 bg-kincha/20">
          {beforeYouLeave.map((task) => (
            <div key={task.title} className="bg-sumi p-6 sm:p-8">
              <div className="grid gap-x-8 gap-y-3 md:grid-cols-[11rem_1fr]">
                <p className="text-[0.62rem] uppercase tracking-[0.26em] text-yamabuki md:pt-1.5">
                  {task.when}
                </p>

                <div className="min-w-0">
                  <h4 className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 font-display text-lg text-shironeri">
                    {task.title}
                    {task.recheck ? (
                      <span className="border border-shu/50 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-shu">
                        Recheck in 2027
                      </span>
                    ) : null}
                  </h4>

                  <p className="mt-3 text-[0.92rem] leading-[1.78] text-rikyu">
                    {task.body}
                  </p>

                  {task.official ? (
                    <p className="mt-3 text-[0.82rem] text-nezu">
                      Only at{" "}
                      <span className="font-medium text-asagi">{task.official}</span>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        {/* ---------------------------------------------------- the packing */}
        <Reveal className="mt-24">
          <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-semibold text-shironeri">
            Things not to forget
          </h3>
          <p className="mt-4 max-w-3xl leading-[1.78] text-rikyu">
            Not a packing list — you know how to pack. These are the eight things
            specific to <em>this</em> itinerary, which is stair-heavy, outdoor-heavy
            and takes place in the hottest fortnight of the Japanese year.
          </p>
        </Reveal>

        <Reveal stagger={70} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {packing.map((item) => (
            <div key={item.what} className="border-t border-kincha/30 pt-5">
              <h4 className="font-display text-[1.05rem] leading-snug text-kin">
                {item.what}
              </h4>
              <p className="mt-3 text-[0.86rem] leading-[1.72] text-rikyu">{item.why}</p>
            </div>
          ))}
        </Reveal>

        <p className="mt-16 max-w-3xl border-l-2 border-shu/60 pl-5 text-[0.86rem] leading-[1.7] text-kinari">
          <span className="mr-2 font-display font-semibold text-shu" aria-hidden="true">
            !
          </span>
          Five things on this page are temporary, brand new, or genuinely unsettled:
          the Korean travel authorisation, Korea&rsquo;s arrival card, Japan&rsquo;s
          forthcoming JESTA, Japan&rsquo;s new tax-free refund mechanism, and whether
          Visit Japan Web works at a seaport at all. Every figure here was checked
          against official sources — but a year is a long time in border policy. Put
          a reminder in the calendar for January 2027 to read it all again.
        </p>
      </div>
    </section>
  );
}
