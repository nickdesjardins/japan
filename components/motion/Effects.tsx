"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Sakura } from "@/components/art/Motifs";
import { useInView } from "./Reveal";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ------------------------------------------------------------------
   Parallax — the outer element is measured, the inner one is moved, so
   the transform never feeds back into the measurement.
   ------------------------------------------------------------------ */
export function Parallax({
  children,
  speed = 0.18,
  className,
  innerClassName,
}: {
  children: ReactNode;
  /** Positive drifts against the scroll, negative with it. */
  speed?: number;
  className?: string;
  innerClassName?: string;
}) {
  const frame = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outer = frame.current;
    const target = inner.current;
    if (!outer || !target || prefersReducedMotion()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 just below the fold, +1 just above it
      const centre = rect.top + rect.height / 2;
      const progress = (vh / 2 - centre) / (vh / 2 + rect.height / 2);
      target.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}px, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={frame} className={className}>
      <div ref={inner} className={innerClassName} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Scroll progress — a gold thread across the top of the page with a
   koi that rides its leading edge.
   ------------------------------------------------------------------ */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-tetsu/60"
      role="presentation"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-shu via-kin to-yamabuki"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   Falling petals. Values are hard-coded rather than random so the
   server and client markup match exactly.
   ------------------------------------------------------------------ */
const PETALS: { left: number; size: number; delay: number; duration: number; drift: number }[] = [
  { left: 4, size: 14, delay: 0, duration: 15, drift: 60 },
  { left: 12, size: 9, delay: 4.5, duration: 19, drift: -40 },
  { left: 21, size: 17, delay: 1.8, duration: 13, drift: 90 },
  { left: 29, size: 11, delay: 7.2, duration: 17, drift: -70 },
  { left: 37, size: 8, delay: 3.1, duration: 21, drift: 50 },
  { left: 46, size: 15, delay: 9.6, duration: 14, drift: -100 },
  { left: 54, size: 10, delay: 2.4, duration: 18, drift: 75 },
  { left: 62, size: 13, delay: 6.3, duration: 16, drift: -55 },
  { left: 70, size: 8, delay: 11.1, duration: 20, drift: 110 },
  { left: 78, size: 16, delay: 0.9, duration: 15, drift: -85 },
  { left: 86, size: 11, delay: 5.4, duration: 22, drift: 45 },
  { left: 94, size: 9, delay: 8.7, duration: 17, drift: -65 },
];

export function PetalFall({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={
            {
              left: `${p.left}%`,
              width: p.size * 1.6,
              "--drift": `${p.drift}px`,
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            } as CSSProperties
          }
        >
          <Sakura className="w-full text-sakura/60" />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   Count-up — runs once, when the number scrolls into view.
   ------------------------------------------------------------------ */
export function Counter({
  to,
  duration = 1400,
  className,
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion runs the same loop with a zero-length ramp, so the value
    // still lands on the first frame instead of being set inline.
    const ms = prefersReducedMotion() ? 0 : duration;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ms <= 0 ? 1 : Math.min(1, (now - start) / ms);
      // easeOutExpo — fast, then settling, like a struck bell decaying
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-CA")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Tilt — a light 3D lean toward the pointer. Pointer-only; touch and
   reduced-motion users get a plain card.
   ------------------------------------------------------------------ */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || event.pointerType !== "mouse" || prefersReducedMotion()) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    },
    [max],
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{ transition: "transform .5s cubic-bezier(.22,1,.36,1)" }}
    >
      {children}
    </div>
  );
}
