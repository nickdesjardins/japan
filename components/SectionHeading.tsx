import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * 判子 Hanko — the carved name seal stamped in cinnabar paste. Here it marks
 * the opening of each chapter, tilted a couple of degrees the way a real one
 * lands when you press it by hand.
 */
export function Hanko({ char, className }: { char: string; className?: string }) {
  return (
    <span
      className={`inline-grid h-12 w-12 shrink-0 place-items-center border-2 border-shu text-shu ${className ?? ""}`}
      style={{ transform: "rotate(-2.5deg)", borderRadius: 3 }}
      aria-hidden="true"
    >
      <span className="font-brush text-2xl leading-none">{char}</span>
    </span>
  );
}

export function SectionHeading({
  seal,
  eyebrow,
  title,
  lead,
  id,
  align = "left",
}: {
  seal: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center";
}) {
  const centred = align === "center";
  return (
    <Reveal
      id={id}
      as="header"
      /* Headings get a wider measure than the body copy beneath them, so a
         two-line title never breaks mid-phrase. */
      className={`max-w-5xl ${centred ? "mx-auto text-center" : ""}`}
    >
      <div className={`flex items-center gap-4 ${centred ? "justify-center" : ""}`}>
        <Hanko char={seal} />
        <p className="text-[0.66rem] uppercase tracking-[0.4em] text-nezu">{eyebrow}</p>
      </div>
      <h2
        className="mt-7 font-display text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] font-semibold leading-[1.08] text-shironeri"
        style={{ letterSpacing: "-0.015em" }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-6 max-w-2xl text-[clamp(1.02rem,0.96rem+0.34vw,1.15rem)] leading-[1.75] text-rikyu ${centred ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
