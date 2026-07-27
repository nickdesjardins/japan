"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Marks its subtree as "revealed" once it scrolls into view. The actual
 * animation lives in globals.css keyed off `[data-revealed]`, so the markup
 * stays declarative and reduced-motion is handled in one place.
 */
export function useInView<T extends HTMLElement>(
  options?: { rootMargin?: string; threshold?: number; once?: boolean },
) {
  /**
   * threshold must stay 0.
   *
   * `intersectionRatio` is intersected-area ÷ the element's FULL area, so any
   * element taller than viewport ÷ threshold can never reach a proportional
   * threshold no matter how you scroll. The dragon-lore grid is 6,500px tall
   * when its cards stack on a phone — against a 0.15 threshold its ceiling is
   * 0.11, so it stayed at opacity 0 for the whole session.
   *
   * The trigger point is a distance, so it belongs in rootMargin.
   */
  const { rootMargin = "0px 0px -15% 0px", threshold = 0, once = true } =
    options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer available → just show it. Deferred rather than set inline so
    // the first client render still matches what the server produced.
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}

type RevealVariant = "up" | "left" | "right" | "scale" | "ink";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction/feel of the entrance. */
  variant?: RevealVariant;
  /** Milliseconds before this element starts. */
  delay?: number;
  /** Cascade direct children instead of animating as one block. */
  stagger?: number | boolean;
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
};

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  stagger,
  as,
  style,
  id,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useInView<HTMLElement>();

  const staggerMs =
    stagger === true ? 85 : typeof stagger === "number" ? stagger : undefined;

  return (
    <Tag
      id={id}
      ref={ref}
      className={className}
      data-reveal={staggerMs === undefined ? variant : undefined}
      data-stagger={staggerMs === undefined ? undefined : ""}
      data-revealed={inView ? "" : undefined}
      style={
        {
          ...style,
          ...(delay ? { "--reveal-delay": `${delay}ms` } : null),
          ...(staggerMs !== undefined ? { "--stagger": `${staggerMs}ms` } : null),
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
