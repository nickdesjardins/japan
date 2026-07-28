import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Dragon } from "@/components/art/Dragon";
import { Reveal } from "@/components/motion/Reveal";
import { destinations } from "@/data/destinations";

const thread = destinations.filter((d) => d.dragonConnection.trim().length > 0);

export function DragonLore() {
  return (
    <section
      id="lore"
      className="relative overflow-hidden px-6 py-[clamp(6rem,12vw,11rem)]"
      style={{ backgroundColor: "var(--color-kachi)" }}
    >
      {/* The serpent, drawing itself across the section as it comes into view.
          Positioning lives on the wrapper: the reveal resets `transform` on the
          element it marks, which would undo any centring put there. */}
      <div className="pointer-events-none absolute inset-x-0 top-[27%] -translate-y-1/2">
        <Reveal>
          <Dragon
            variant="stroke"
            drawOnReveal
            className="w-[150%] max-w-none -translate-x-[18%] text-kin/30"
          />
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          seal="龍"
          eyebrow="The thread running through all of it"
          title={
            <>
              Ryūjin, and the palace
              <br className="hidden sm:block" /> at the bottom of the sea
            </>
          }
          lead={
            <>
              Japan&rsquo;s dragon is not the hoard-guarding lizard of European stories.
              He is <span className="text-kin">Watatsumi</span>, the sea itself — a kami
              who keeps two jewels that raise and lower the tide, and who lives in{" "}
              <span className="text-kin">Ryūgū-jō</span>, a palace of coral and crystal
              on the seabed where each of the four walls holds a different season and a
              single day can cost you a hundred years above. Almost everything you will
              stand in front of on this trip is, one way or another, an address for him.
            </>
          }
        />

        <Reveal stagger={70} className="mt-16 grid gap-px border border-kincha/20 bg-kincha/20 sm:grid-cols-2 lg:grid-cols-3">
          {thread.map((d, i) => (
            /* The card each of these points at lives on the day-by-day
               chapter, which comes after this one — hence forward. */
            <Link
              key={d.id}
              href={`/journey#${d.id}`}
              transitionTypes={["nav-forward"]}
              className="group flex flex-col p-7 transition-colors hover:bg-roiro"
              style={{ backgroundColor: "var(--color-kachi)" }}
            >
              <p className="flex items-baseline gap-3">
                <span className="font-display text-xs tabular-nums text-kincha/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-jp text-lg text-kin" lang="ja">{d.japaneseName}</span>
              </p>
              <h3 className="mt-3 font-display text-lg leading-snug text-shironeri transition-colors group-hover:text-kin">
                {d.name}
              </h3>
              <p className="mt-4 flex-1 text-[0.9rem] leading-[1.7] text-rikyu">
                {d.dragonConnection}
              </p>
              <p className="mt-5 text-[0.62rem] uppercase tracking-[0.3em] text-nezu transition-colors group-hover:text-kincha">
                {d.day.split("·")[0].trim()} →
              </p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
