/**
 * One glyph per way of moving. Drawn on the same 24-unit grid and stroked
 * with `currentColor`, so a leg can tint its own icon by setting text colour
 * and nothing here needs to know about the palette.
 *
 * These are deliberately plain. The rest of the site draws waves and torii;
 * a timetable should look like a timetable.
 */

export type TransitMode =
  | "plane"
  | "coach"
  | "taxi"
  | "car"
  | "tender"
  | "boat"
  | "ship"
  | "walk"
  | "steps"
  | "lift"
  | "stay";

type GlyphProps = { className?: string };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Frame({ children, className }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...S}>
      {children}
    </svg>
  );
}

function Plane({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 13.4 21 6.2a1.6 1.6 0 0 1 1.4 2.8l-8.2 5.6-1.6 6.1-2.3-4.6-4.9-1.1Z" />
    </Frame>
  );
}

function Coach({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M3 9.5h18M9 4v5.5M15 4v5.5" />
      <circle cx="7.5" cy="19" r="1.9" />
      <circle cx="16.5" cy="19" r="1.9" />
      <path d="M3 13.5h2.5M18.5 13.5H21" />
    </Frame>
  );
}

function Taxi({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 16.5v-3l2.2-4.3A2 2 0 0 1 6.5 8h11a2 2 0 0 1 1.8 1.2l2.2 4.3v3" />
      <path d="M2.5 13.2h19" />
      <circle cx="6.8" cy="17.6" r="1.8" />
      <circle cx="17.2" cy="17.6" r="1.8" />
      {/* the roof sign — the one thing that says taxi and not car */}
      <rect x="9.5" y="4" width="5" height="2.6" rx="0.6" />
    </Frame>
  );
}

function Car({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 17v-3.2l2.3-4.6A2 2 0 0 1 6.6 8h10.8a2 2 0 0 1 1.8 1.2l2.3 4.6V17" />
      <path d="M2.5 13.6h19" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </Frame>
  );
}

/** The ship's own boat, run in to a pier the ship is too big to reach. */
function Tender({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M3 15.5h18l-2 3.2a2 2 0 0 1-1.7 1H6.7a2 2 0 0 1-1.7-1Z" />
      <path d="M5.5 15.5V12h13v3.5" />
      <path d="M9 12V9.2h6V12" />
      <path d="M12 9.2V5.5" />
    </Frame>
  );
}

/** A local passenger launch — the Bentenmaru sort, open to the weather. */
function Boat({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.6 16.2h18.8l-1.8 2.9a2 2 0 0 1-1.7 1H6.1a2 2 0 0 1-1.7-1Z" />
      <path d="M12 16.2V4.4l6.6 6.1-6.6 2" />
      <path d="M9.4 16.2V9.6L12 8" />
    </Frame>
  );
}

function Ship({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2 16.4h20l-1.9 3a2 2 0 0 1-1.7 1H5.6a2 2 0 0 1-1.7-1Z" />
      <path d="M4.4 16.4v-4.2h15.2v4.2" />
      <path d="M7.2 12.2V9h9.6v3.2" />
      <path d="M9.6 9V6.6h4.8V9" />
      <path d="M18.4 9V4.6" />
    </Frame>
  );
}

function Walk({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <circle cx="13.2" cy="4.6" r="1.9" />
      <path d="M11.4 21.4 13 15l-2.6-2.4.9-4.4 3.4 1.4 2.4 2.6" />
      <path d="M10.4 12.6 7.4 15l-.9 3.6" />
      <path d="M13 15l2.2 2.4 1 4" />
    </Frame>
  );
}

function Steps({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.8 20h4.1v-4h4.1v-4h4.1V8h4.1V4" />
      <path d="M2.8 20h18.4" />
    </Frame>
  );
}

/** Escalator or moving walkway — an incline you are carried up. */
function Lift({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M3 18.5h4.2L18.2 6.2H21" />
      <path d="M3 18.5a2.2 2.2 0 0 1 1.6-3.7" />
      <path d="M21 6.2a2.2 2.2 0 0 0-1.6 3.7" />
      <circle cx="13.6" cy="7.2" r="1.5" />
      <path d="M12.1 11.6v-2.9h3v2.9M12.6 14.6l-.5-3M15.1 14.6l.5-3" />
    </Frame>
  );
}

/** No travel at all — the days where the balcony is the excursion. */
function Stay({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M4.6 16.4c2.4-2.1 4.6-2.1 7.4 0s5 2.1 7.4 0" />
      <path d="M3.9 8.4c2.4-2.1 5.8-2.1 8.1 0s5.7 2.1 8.1 0" />
    </Frame>
  );
}

const GLYPHS: Record<TransitMode, (p: GlyphProps) => React.ReactElement> = {
  plane: Plane,
  coach: Coach,
  taxi: Taxi,
  car: Car,
  tender: Tender,
  boat: Boat,
  ship: Ship,
  walk: Walk,
  steps: Steps,
  lift: Lift,
  stay: Stay,
};

/** How each mode is named in running text, so the label and the icon agree. */
export const MODE_LABEL: Record<TransitMode, string> = {
  plane: "Flight",
  coach: "Coach",
  taxi: "Taxi",
  car: "Private car",
  tender: "Ship's tender",
  boat: "Passenger boat",
  ship: "Aboard ship",
  walk: "On foot",
  steps: "Steps",
  lift: "Escalator",
  stay: "No travel",
};

export function TransitGlyph({
  mode,
  className,
}: {
  mode: TransitMode;
  className?: string;
}) {
  const Glyph = GLYPHS[mode];
  return <Glyph className={className} />;
}
