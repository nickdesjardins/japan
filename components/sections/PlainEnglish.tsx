import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { chapters, plainDays, type PlainDay } from "@/data/voyage";

const byId = new Map(chapters.map((c) => [c.id, c]));

/**
 * 要 — the gist.
 *
 * The rest of the site is written for someone who wants the myth. This is the
 * version you read aloud to a friend over the phone: no Japanese, no place
 * names to remember, and the be-back-on-the-ship time said in words rather
 * than buried in a collapsed timetable, because that is the thing people
 * actually want to hear.
 */
export function PlainEnglish() {
  return (
    <section id="plain-english" className="relative px-6 py-[clamp(5rem,10vw,9rem)]">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          seal="要"
          eyebrow="The whole trip, in plain English"
          title={
            <>
              Eleven days,
              <br className="hidden sm:block" /> without the poetry
            </>
          }
          lead={
            <>
              Everything else here assumes you want the story. This does not. It is just
              what happens each day, said the way you would say it out loud — and on the
              days there is a ship to catch, what time you are back on her.
            </>
          }
        />

        <Reveal stagger={60} className="mt-16 border-t border-kincha/20">
          {plainDays.map((day) => (
            <Day key={day.id} day={day} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Day({ day }: { day: PlainDay }) {
  const chapter = byId.get(day.id);

  return (
    <article className="grid gap-x-8 gap-y-4 border-b border-kincha/20 py-8 sm:grid-cols-[7.5rem_1fr] sm:py-10">
      {/* ------------------------------------------------- the day, and when */}
      <div className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1">
        <p className="font-display text-[2.6rem] font-bold leading-[0.85] text-kin/85 tabular-nums">
          {String(chapter?.day ?? "").padStart(2, "0")}
        </p>
        <p className="text-[0.66rem] uppercase leading-tight tracking-[0.22em] text-nezu">
          {chapter?.weekday}
          <span className="sm:block"> {chapter?.date.replace(" 2027", "")}</span>
        </p>
      </div>

      {/* ------------------------------------------------------------ the day */}
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="border border-kincha/40 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-kincha">
            {day.tag}
          </span>
          <span className="font-display text-[1.15rem] leading-snug text-shironeri">
            {day.where}
          </span>
        </p>

        <p className="mt-3.5 max-w-2xl text-[0.95rem] leading-[1.8] text-rikyu">
          {day.what}
        </p>

        {/* The one line somebody scrolls this whole section looking for. */}
        {day.back ? (
          <p className="mt-4 inline-flex items-baseline gap-2.5 border-l-2 border-kin/70 bg-kin/[0.06] py-1.5 pl-3 pr-4 text-[0.88rem] leading-snug text-kinari">
            <span className="font-brush text-sm leading-none text-kin" aria-hidden="true">
              船
            </span>
            <span>
              <span className="sr-only">Getting back: </span>
              {day.back}
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
