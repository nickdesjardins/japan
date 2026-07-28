"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { audioClips } from "@/data/audio";

type Mode = "unknown" | "none" | "native" | "romaji";

/**
 * The utterance currently being spoken, held at module scope.
 * Chrome garbage-collects utterances that nothing outside a component holds,
 * and a collected utterance falls silent mid-word.
 */
let active: SpeechSynthesisUtterance | null = null;

/** Whichever button is currently playing a recording, so a new press can stop
 *  it — and tell it to stop pulsing, since pause() fires no "ended". */
let playing: { el: HTMLAudioElement; settle: () => void } | null = null;

const MACRON: Record<string, string> = {
  ā: "ah",
  ī: "ee",
  ū: "oo",
  ē: "eh",
  ō: "oh",
  Ā: "Ah",
  Ī: "Ee",
  Ū: "Oo",
  Ē: "Eh",
  Ō: "Oh",
};

/**
 * A Latin voice has no phoneme for ō and skips whatever it cannot say — often
 * the whole word. Spell the long vowels the way an English mouth reads them.
 */
function latinise(romaji: string) {
  return romaji
    .replace(/[āīūēōĀĪŪĒŌ]/g, (c) => MACRON[c])
    .replace(/[^\x20-\x7E]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** The best installed voice for a language, or null if the device has none. */
function pickVoice(lang: string) {
  const prefix = lang.slice(0, 2).toLowerCase();
  const family = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith(prefix));
  if (family.length === 0) return null;
  const exact = family.filter(
    (v) => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase(),
  );
  const pool = exact.length > 0 ? exact : family;
  /* Remote voices are the ones that fail silently — no network, no sound, and
     no error anyone would think to look for. Prefer a local one. */
  return pool.find((v) => v.localService) ?? pool[0];
}

/**
 * Reads a Japanese or Korean phrase aloud, in that order of preference:
 *
 *   1. the recording in public/audio/ — a real native voice, same on every
 *      device, generated once by scripts/generate-audio.mjs
 *   2. the browser's own synthesiser, if the device has a voice for `lang`
 *   3. the romaji, read by whatever voice there is
 *
 * The ladder exists because most Windows installs ship English voices only,
 * and an English engine handed かな returns instantly having made no sound at
 * all. Step 3 is the floor: something always plays.
 */
export function SpeakButton({
  text,
  romaji,
  lang = "ja-JP",
  label,
  className,
  size = "md",
}: {
  /** The native-script text to pronounce. */
  text: string;
  /** Latin respelling, spoken when the device has no voice for `lang`. */
  romaji?: string;
  lang?: "ja-JP" | "ko-KR";
  /** Accessible name; defaults to a sensible sentence. */
  label?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const [mode, setMode] = useState<Mode>("unknown");
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  /** The utterance this particular button started, if it is still running. */
  const mine = useRef<SpeechSynthesisUtterance | null>(null);
  /** Built on first press rather than at render — there are ~150 of these. */
  const audio = useRef<HTMLAudioElement | null>(null);

  const spoken = romaji ? latinise(romaji) : "";
  const clip: string | undefined = audioClips[`${lang}|${text}`];

  useEffect(() => {
    const supported = "speechSynthesis" in window;

    const resolve = () => {
      if (!supported) {
        setMode("none");
        return;
      }
      // Voices arrive asynchronously in Chrome; an empty list is not "no voice".
      if (window.speechSynthesis.getVoices().length === 0) return;
      voiceRef.current = pickVoice(lang);
      setMode(voiceRef.current ? "native" : spoken ? "romaji" : "none");
    };

    // Deferred by a tick so the first client render still matches the server's.
    const timer = window.setTimeout(resolve, 0);
    if (!supported) return () => window.clearTimeout(timer);

    window.speechSynthesis.addEventListener("voiceschanged", resolve);
    return () => {
      window.clearTimeout(timer);
      window.speechSynthesis.removeEventListener("voiceschanged", resolve);
    };
  }, [lang, spoken]);

  const synthesise = useCallback(() => {
    if (mode === "none" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;

    /* The voice list is reliably populated by the time anyone clicks, even when
       the effect above ran too early to see it. */
    const voice = voiceRef.current ?? pickVoice(lang);
    voiceRef.current = voice;

    let retried = false;

    const start = (native: boolean) => {
      const utterance = new SpeechSynthesisUtterance(native ? text : spoken);
      if (native) {
        utterance.lang = lang;
        if (voice) utterance.voice = voice;
      } else {
        /* Deliberately *not* lang="ja-JP" here: asking a device for a language
           it cannot speak is precisely what produced the silence. Hand the
           romaji to the default voice in that voice's own language. */
        const latin = synth.getVoices().find((v) => v.default);
        if (latin) {
          utterance.voice = latin;
          utterance.lang = latin.lang;
        }
      }
      // A shade under natural pace — these are phrases being learned, not read.
      utterance.rate = 0.85;

      const began = performance.now();
      const finish = () => {
        if (active === utterance) active = null;
        if (mine.current === utterance) {
          mine.current = null;
          setSpeaking(false);
        }
      };
      /* An engine that skipped every character still reports a clean end, just
         an impossibly quick one. Treat that "success" as the failure it is and
         fall back to the romaji — but never when another button cut us off. */
      const fallback = (superseded: boolean) => {
        if (native && !superseded && !retried && spoken) {
          retried = true;
          start(false);
        }
      };

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        const superseded = active !== utterance;
        const silent = performance.now() - began < 200;
        finish();
        if (silent) fallback(superseded);
      };
      utterance.onerror = (event) => {
        const superseded =
          active !== utterance ||
          event.error === "interrupted" ||
          event.error === "canceled";
        finish();
        fallback(superseded);
      };

      mine.current = utterance;
      active = utterance;
      synth.speak(utterance);
    };

    /* Chrome parks the queue in a paused state after some navigations, and a
       paused queue swallows speak() without a sound. */
    if (synth.paused) synth.resume();

    const busy = synth.speaking || synth.pending;
    synth.cancel();
    if (busy) {
      // Chrome drops an utterance queued in the same task as a cancel().
      window.setTimeout(() => start(mode !== "romaji"), 60);
    } else {
      start(mode !== "romaji");
    }
  }, [mode, text, spoken, lang]);

  const speak = useCallback(() => {
    /* Whatever is sounding now stops, whichever button started it — two
       phrases talking over each other teaches nobody anything. */
    if (playing) {
      playing.el.pause();
      playing.settle();
      playing = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    if (!clip) {
      synthesise();
      return;
    }

    const el = (audio.current ??= new Audio());
    if (el.src !== new URL(clip, window.location.href).href) el.src = clip;
    // A shade under natural pace — these are phrases being learned, not read.
    el.playbackRate = 0.9;
    el.currentTime = 0;

    const settle = () => {
      setSpeaking(false);
      if (playing?.el === el) playing = null;
    };
    el.onplaying = () => setSpeaking(true);
    el.onended = settle;
    /* If the file is missing or the decode fails, drop to the browser's own
       voice rather than leaving the press with nothing to show for it. */
    el.onerror = () => {
      settle();
      synthesise();
    };

    playing = { el, settle };
    el.play().catch(() => {
      settle();
      synthesise();
    });
  }, [clip, synthesise]);

  /* Stop on unmount, but only our own sound.
     There are ~150 of these buttons on the page. An unconditional
     speechSynthesis.cancel() here meant that any button unmounting — which
     happens every time the glossary filter re-renders its list — silently
     killed speech another button had started. */
  useEffect(
    () => () => {
      if ("speechSynthesis" in window && mine.current && active === mine.current) {
        window.speechSynthesis.cancel();
        active = null;
      }
      mine.current = null;
      if (audio.current && playing?.el === audio.current) {
        audio.current.pause();
        playing = null;
      }
    },
    [],
  );

  const languageName = lang === "ja-JP" ? "Japanese" : "Korean";
  /* A recording overrules whatever the device can or cannot say, so the button
     is only ever dead when there is no clip *and* no usable voice. */
  const dead = !clip && mode === "none";
  const approximating = !clip && mode === "romaji";
  const title = clip
    ? `Hear it: ${text}`
    : dead
      ? `No ${languageName} voice is installed on this device`
      : approximating
        ? `No ${languageName} voice installed — reading the romaji instead: ${spoken}`
        : `Hear it: ${text}`;

  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";

  return (
    <button
      type="button"
      onClick={speak}
      disabled={dead}
      title={title}
      aria-label={label ?? `Play the pronunciation of ${text} in ${languageName}`}
      className={`inline-grid shrink-0 place-items-center rounded-full border transition-colors ${box} ${
        dead
          ? "cursor-not-allowed border-nezu/25 text-nezu/40"
          : "border-kincha/40 text-kin hover:border-kin hover:bg-kin/10"
      } ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
        {/* the sound waves pulse only while it is actually speaking */}
        <path d="M15.5 8.5a5 5 0 0 1 0 7" className={speaking ? "anim-glow" : undefined} />
        <path
          d="M18.5 5.5a9 9 0 0 1 0 13"
          className={speaking ? "anim-glow" : undefined}
          style={speaking ? { animationDelay: "180ms" } : undefined}
          opacity={approximating ? 0.35 : 1}
        />
      </svg>
    </button>
  );
}
