import { Koi, Seigaiha } from "@/components/art/Motifs";
import { Reveal } from "@/components/motion/Reveal";
import { voyage } from "@/data/voyage";

export function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden px-6 pb-16 pt-[clamp(5rem,10vw,9rem)]"
      style={{ backgroundColor: "var(--color-kachi)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 text-ai/50"
        style={{
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      >
        <Seigaiha id="footer-seigaiha" className="h-full w-full" strokeWidth={1.2} opacity={0.5} />
      </div>

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <Koi className="anim-float mx-auto w-24 text-kin/70" />
        <p className="mt-10 font-display text-[clamp(1.4rem,1.1rem+1.4vw,2rem)] leading-snug text-shironeri">
          A carp that swims all the way up the falls at the Dragon Gate
          <br className="hidden sm:block" /> turns into a dragon.
        </p>
        <p className="mt-4 text-lg text-kin">
          <span className="font-jp" lang="ja">登竜門</span>
          <span className="font-display"> · tōryūmon</span>
        </p>
        <p className="mx-auto mt-6 max-w-xl leading-[1.75] text-rikyu">
          It is where the English phrase &ldquo;gateway to success&rdquo; comes from, and
          it is a reasonable thing to think about on a ship named for a jewel, sailing
          from a pier shaped like a whale, toward a temple with a golden dragon on the
          ceiling.
        </p>

        <div className="mt-14 flex flex-col items-center gap-2 border-t border-kincha/20 pt-8 text-[0.68rem] uppercase tracking-[0.28em] text-nezu">
          <p>
            {voyage.ship} · {voyage.homePort}
          </p>
          <p>19 – 29 July 2027</p>
        </div>
      </Reveal>
    </footer>
  );
}
