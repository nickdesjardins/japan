"use client";

import { useCallback, useState } from "react";
import { Hanko } from "@/components/SectionHeading";
import { fortunes, type Fortune } from "@/data/voyage";

type Phase = "idle" | "shaking" | "drawn";

export function Omikuji() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [fortune, setFortune] = useState<Fortune | null>(null);
  /** Bumped on every draw so the slip remounts and the unfurl replays. */
  const [draws, setDraws] = useState(0);

  const draw = useCallback(() => {
    if (phase === "shaking") return;
    setPhase("shaking");
    const picked = fortunes[Math.floor(Math.random() * fortunes.length)];
    window.setTimeout(() => {
      setFortune(picked);
      setDraws((n) => n + 1);
      setPhase("drawn");
    }, 850);
  }, [phase]);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {/* -------------------------------------------------- the box itself */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={draw}
          aria-live="off"
          className="group grid place-items-center rounded-sm p-4 transition-transform active:scale-95"
        >
          <span className="sr-only">
            Shake the omikuji box and draw a fortune for the voyage
          </span>
          <svg
            /* headroom above the box so the drawn stick has somewhere to go */
            viewBox="0 -60 160 280"
            className={`w-40 text-bengara sm:w-48 ${phase === "shaking" ? "anim-shake" : ""}`}
            aria-hidden="true"
          >
            {/* The bamboo stick, drawn FIRST so the box paints over it: at rest
                it sits down inside and is simply not visible. */}
            <g
              className="transition-transform duration-500 ease-out"
              /* -70 leaves the stick's base at y=38, just below the rim at 34,
                 so it reads as still sitting in the hole rather than floating */
              style={{ transform: `translateY(${phase === "idle" ? 0 : -70}px)` }}
            >
              <rect x="75" y="50" width="10" height="58" rx="3" fill="var(--color-kinari)" />
              <rect x="75" y="50" width="10" height="10" rx="3" fill="var(--color-shu)" />
            </g>

            {/* the hexagonal wooden box */}
            <path d="M30,42 L130,42 L146,196 L14,196 Z" fill="currentColor" />
            <path d="M30,42 L130,42 L134,60 L26,60 Z" fill="var(--color-sumi)" opacity=".25" />
            {/* the hole the stick comes out of */}
            <ellipse cx="80" cy="34" rx="17" ry="7" fill="var(--color-sumi)" />
            <path d="M30,42 L130,42 L128,34 L32,34 Z" fill="var(--color-kincha)" opacity=".55" />
            {/* gold banding */}
            <path d="M22,104 L138,104 L139,112 L21,112 Z" fill="var(--color-kin)" opacity=".8" />
            <path d="M18,150 L142,150 L143,158 L17,158 Z" fill="var(--color-kin)" opacity=".55" />
            <text
              x="80"
              y="140"
              textAnchor="middle"
              fill="var(--color-shironeri)"
              fontSize="34"
              fontFamily="var(--font-brush)"
            >
              御籤
            </text>
          </svg>
        </button>

        <button
          type="button"
          onClick={draw}
          className="mt-6 border border-kincha/40 px-6 py-3 text-sm tracking-wide text-kin transition-colors hover:border-kin hover:bg-kin/10"
        >
          {phase === "drawn" ? "Draw another" : "Shake the box"}
        </button>
      </div>

      {/* ------------------------------------------------------- the slip */}
      <div aria-live="polite" className="min-h-[19rem]">
        {fortune ? (
          <article
            key={draws}
            className="anim-unfurl motif-washi border-t-4 p-8 text-ink sm:p-10"
            style={{ borderTopColor: fortune.good ? "var(--color-bengara)" : "var(--color-susutake)" }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.34em] text-susutake">
                  {fortune.gloss}
                </p>
                <p className="mt-3 font-jp text-5xl font-bold leading-none text-bengara" lang="ja">
                  {fortune.script}
                </p>
                <p className="mt-3 font-display text-lg text-ink">{fortune.rank}</p>
              </div>
              <Hanko char="籤" className="border-bengara text-bengara" />
            </div>

            <p className="mt-6 border-t border-susutake/25 pt-5 text-sm italic text-susutake">
              {fortune.reading}
            </p>
            <p className="mt-4 leading-[1.75] text-ink">{fortune.travel}</p>

            {!fortune.good ? (
              <p className="mt-6 border-t border-susutake/25 pt-5 text-[0.83rem] leading-relaxed text-susutake">
                Bad draw? Fold it into a thin strip and tie it to the rack of wires at
                the shrine. The misfortune stays knotted there; you walk on without it.
              </p>
            ) : (
              <p className="mt-6 border-t border-susutake/25 pt-5 text-[0.83rem] leading-relaxed text-susutake">
                A good slip is yours to keep. Fold it into your wallet and carry it for
                the rest of the voyage.
              </p>
            )}
          </article>
        ) : (
          <div className="border border-dashed border-kincha/30 p-10 text-center">
            <p className="font-jp text-2xl text-kincha" lang="ja">おみくじ</p>
            <p className="mt-4 leading-[1.75] text-rikyu">
              At Meoto Iwa you will pull a fortune out of a bronze frog&rsquo;s mouth;
              at the shrine above Katsurahama, from a shrine keeper&rsquo;s hand. Shake
              the box, tip out a numbered stick, and the priest hands you the slip that
              matches the number.
            </p>
            <p className="mt-4 text-sm text-nezu">
              Twelve grades run from <span className="text-kin">大吉</span> down to{" "}
              <span className="text-kin">大凶</span>. Try one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
