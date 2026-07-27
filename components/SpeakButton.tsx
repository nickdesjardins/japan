"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Support = "unknown" | "none" | "no-voice" | "ready";

/**
 * Reads a Japanese or Korean phrase aloud with the browser's own speech
 * synthesiser. No network, no audio files — but voice coverage varies by
 * platform, so the button reports honestly when it can't help.
 */
export function SpeakButton({
  text,
  lang = "ja-JP",
  label,
  className,
  size = "md",
}: {
  /** The native-script text to pronounce. */
  text: string;
  lang?: "ja-JP" | "ko-KR";
  /** Accessible name; defaults to a sensible sentence. */
  label?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const [support, setSupport] = useState<Support>("unknown");
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  /** The utterance this particular button started, if it is still running. */
  const ownUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const supported = "speechSynthesis" in window;
    const prefix = lang.split("-")[0];

    const pick = () => {
      if (!supported) {
        setSupport("none");
        return;
      }
      const voices = window.speechSynthesis.getVoices();
      // Voices arrive asynchronously in Chrome; an empty list is not "no voice".
      if (voices.length === 0) return;
      const match =
        voices.find((v) => v.lang.replace("_", "-") === lang) ??
        voices.find((v) => v.lang.replace("_", "-").startsWith(prefix));
      voiceRef.current = match ?? null;
      setSupport(match ? "ready" : "no-voice");
    };

    // Deferred by a tick so the first client render still matches the server's.
    const timer = window.setTimeout(pick, 0);
    if (!supported) return () => window.clearTimeout(timer);

    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => {
      window.clearTimeout(timer);
      window.speechSynthesis.removeEventListener("voiceschanged", pick);
    };
  }, [lang]);

  const speak = useCallback(() => {
    if (support === "none") return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    if (voiceRef.current) utterance.voice = voiceRef.current;
    // A shade under natural pace — these are phrases being learned, not read.
    utterance.rate = 0.85;
    const done = () => {
      setSpeaking(false);
      if (ownUtterance.current === utterance) ownUtterance.current = null;
    };
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = done;
    utterance.onerror = done;
    ownUtterance.current = utterance;
    synth.speak(utterance);
  }, [support, text, lang]);

  /* Cancel on unmount, but only our own utterance.
     There are ~150 of these buttons on the page. An unconditional
     speechSynthesis.cancel() here meant that any button unmounting — which
     happens every time the glossary filter re-renders its list — silently
     killed speech another button had started. */
  useEffect(
    () => () => {
      if ("speechSynthesis" in window && ownUtterance.current) {
        window.speechSynthesis.cancel();
        ownUtterance.current = null;
      }
    },
    [],
  );

  const languageName = lang === "ja-JP" ? "Japanese" : "Korean";
  const title =
    support === "none"
      ? "This browser can't read text aloud"
      : support === "no-voice"
        ? `No ${languageName} voice is installed — your device may read this with the wrong accent`
        : `Hear it: ${text}`;

  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";

  return (
    <button
      type="button"
      onClick={speak}
      disabled={support === "none"}
      title={title}
      aria-label={label ?? `Play the pronunciation of ${text} in ${languageName}`}
      className={`inline-grid shrink-0 place-items-center rounded-full border transition-colors ${box} ${
        support === "none"
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
          opacity={support === "no-voice" ? 0.35 : 1}
        />
      </svg>
    </button>
  );
}
