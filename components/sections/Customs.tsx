import { Reveal } from "@/components/motion/Reveal";
import { customs } from "@/data/prep";

/**
 * Ten more customs, folded away behind native <details> — ten open cards
 * would bury the page, and disclosure lets you skim the list first.
 */
export function Customs() {
  return (
    <Reveal className="mt-24 border-t border-kincha/20 pt-16">
      <h3 className="font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.1rem)] font-semibold text-shironeri">
        Ten more things worth knowing
      </h3>
      <p className="mt-4 max-w-2xl leading-[1.75] text-rikyu">
        Small courtesies that cost nothing and change how a place receives you.
        Open the ones you don&rsquo;t already know.
      </p>

      <div className="mt-10 divide-y divide-kincha/18 border-y border-kincha/18">
        {customs.map((custom) => (
          <details key={custom.name} className="group">
            <summary className="flex cursor-pointer list-none items-center gap-5 py-5 transition-colors hover:bg-roiro/40">
              {/* ASCII plus, not the fullwidth ＋ — that lives in a CJK
                  unicode range and would drag a whole font shard down for
                  one decorative mark. */}
              <span
                className="text-xl leading-none text-kincha transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg text-shironeri">
                  {custom.name}
                </span>
                <span className="mt-1 block font-jp text-sm text-kin" lang="ja">
                  {custom.script}
                </span>
              </span>
              <span className="hidden shrink-0 text-[0.62rem] uppercase tracking-[0.24em] text-nezu sm:block">
                {custom.where}
              </span>
            </summary>

            <div className="grid gap-8 pb-8 pl-10 pr-2 lg:grid-cols-[1fr_18rem]">
              <ol className="space-y-3">
                {custom.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-[0.92rem] leading-[1.7] text-rikyu"
                  >
                    <span className="mt-0.5 font-display text-xs tabular-nums text-kincha">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="border-l-2 border-shu/60 pl-5 text-[0.88rem] leading-[1.7] text-mizu">
                {custom.note}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
