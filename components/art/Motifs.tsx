/**
 * Traditional motifs, drawn as inline SVG so they inherit `currentColor`
 * and can be tinted per-section.
 */

/* ------------------------------------------------------------------
   青海波 Seigaiha — "blue sea waves". Overlapping fans of concentric
   arcs; the oldest wave pattern in Japanese design, borrowed from a
   6th-century Persian map convention for the sea.
   ------------------------------------------------------------------ */
const SEIGAIHA_RADII = [30, 22, 14, 6];
/** Row centres inside a 60×30 tile; rows alternate their x offset. */
const SEIGAIHA_ROWS: { y: number; xs: number[] }[] = [
  { y: 0, xs: [30] },
  { y: 15, xs: [0, 60] },
  { y: 30, xs: [30] },
  { y: 45, xs: [0, 60] },
  { y: 60, xs: [30] },
];

export function Seigaiha({
  id,
  className,
  strokeWidth = 1.4,
  opacity = 0.5,
}: {
  id: string;
  className?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id={id}
          width="60"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            opacity={opacity}
          >
            {SEIGAIHA_ROWS.flatMap(({ y, xs }) =>
              xs.flatMap((cx) =>
                SEIGAIHA_RADII.map((r) => (
                  <path
                    key={`${y}-${cx}-${r}`}
                    d={`M${cx - r},${y} A${r},${r} 0 0 1 ${cx + r},${y}`}
                  />
                )),
              ),
            )}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Rolling wave band. Three parallax layers, each a path that repeats
   every 400 units so translating by exactly -50% loops seamlessly.
   ------------------------------------------------------------------ */
function wavePath(amplitude: number, baseline: number, repeats = 6) {
  let d = `M0,${baseline}`;
  for (let i = 0; i < repeats; i += 1) {
    const x = i * 400;
    d += ` C${x + 50},${baseline - amplitude} ${x + 150},${baseline - amplitude} ${x + 200},${baseline}`;
    d += ` C${x + 250},${baseline + amplitude} ${x + 350},${baseline + amplitude} ${x + 400},${baseline}`;
  }
  return `${d} L2400,240 L0,240 Z`;
}

export function WaveBand({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="h-full w-full">
        <g className="anim-drift" style={{ animationDuration: "38s" }}>
          <path d={wavePath(34, 96)} fill="currentColor" opacity=".22" />
        </g>
        <g className="anim-drift" style={{ animationDuration: "26s", animationDirection: "reverse" }}>
          <path d={wavePath(24, 132)} fill="currentColor" opacity=".38" />
        </g>
        <g className="anim-drift" style={{ animationDuration: "17s" }}>
          <path d={wavePath(16, 168)} fill="currentColor" opacity=".6" />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------
   鳥居 Torii — a myojin-style gate: curved kasagi lintel, shimaki
   beneath it, a nuki crossbeam and the little gakuzuka strut.
   ------------------------------------------------------------------ */
export function Torii({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 190" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      {/* pillars, tapering outward toward the ground */}
      <path d="M47,40 L59,40 L63,182 L43,182 Z" />
      <path d="M141,40 L153,40 L157,182 L137,182 Z" />
      {/* nuki — the crossbeam that pierces both pillars */}
      <path d="M30,72 L170,72 L170,88 L30,88 Z" />
      {/* gakuzuka — the strut that carries the shrine's name tablet */}
      <path d="M93,54 L107,54 L107,72 L93,72 Z" />
      {/* shimaki */}
      <path d="M22,42 Q100,24 178,42 L178,54 Q100,36 22,54 Z" />
      {/* kasagi — the great curved lintel */}
      <path d="M6,28 Q100,6 194,28 L194,42 Q100,20 6,42 Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   提灯 Chōchin — the paper lantern. The giant one at Kaminarimon is
   3.9 m tall and weighs about 700 kg.
   ------------------------------------------------------------------ */
const CHOCHIN_RIBS: { y: number; half: number }[] = [
  { y: 42, half: 34 },
  { y: 56, half: 39 },
  { y: 70, half: 42 },
  { y: 84, half: 43 },
  { y: 98, half: 43 },
  { y: 112, half: 41 },
  { y: 126, half: 37 },
  { y: 140, half: 31 },
];

export function Chochin({
  className,
  label,
  style,
}: {
  className?: string;
  /** Kanji painted down the lantern's face, e.g. 雷門 */
  label?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 170" className={className} style={style} aria-hidden="true" focusable="false">
      {/* cord */}
      <path d="M50,0 L50,16" stroke="currentColor" strokeWidth="2" opacity=".6" />
      {/* top cap */}
      <rect x="32" y="14" width="36" height="12" rx="3" fill="var(--color-sumi)" />
      {/* paper body */}
      <path
        d="M34,26 C14,40 7,62 7,90 C7,118 14,140 34,152 L66,152 C86,140 93,118 93,90 C93,62 86,40 66,26 Z"
        fill="currentColor"
      />
      {/* bamboo ribs */}
      <g stroke="var(--color-sumi)" strokeWidth="1.6" opacity=".35" fill="none">
        {CHOCHIN_RIBS.map(({ y, half }) => (
          <path key={y} d={`M${50 - half},${y} Q50,${y + 4} ${50 + half},${y}`} />
        ))}
      </g>
      {/* bottom cap */}
      <rect x="32" y="148" width="36" height="12" rx="3" fill="var(--color-sumi)" />
      {label ? (
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fill="var(--color-sumi)"
          fontSize="30"
          fontFamily="var(--font-brush)"
          style={{ writingMode: "vertical-rl", letterSpacing: "0.05em" }}
        >
          {label}
        </text>
      ) : null}
    </svg>
  );
}

/* ------------------------------------------------------------------
   日の丸 Hinomaru — the sun disc, with a slow corona of rays.
   ------------------------------------------------------------------ */
export function SunDisc({ className, rays = 36 }: { className?: string; rays?: number }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true" focusable="false">
      <g className="anim-spin-slow" style={{ transformOrigin: "center" }}>
        {Array.from({ length: rays }, (_, i) => (
          <path
            key={i}
            d="M0,-48 L1.8,-99 L-1.8,-99 Z"
            fill="currentColor"
            opacity={i % 2 === 0 ? 0.42 : 0.16}
            transform={`rotate(${(360 / rays) * i})`}
          />
        ))}
      </g>
      <circle r="42" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   雲 Kumo — the stylised cloud bands that frame scenes on folding
   screens, letting the artist show two places at once.
   ------------------------------------------------------------------ */
export function CloudBand({ className }: { className?: string }) {
  const scallops = Array.from({ length: 9 }, (_, i) => {
    const x = i * 60;
    return `M${x},40 A26,26 0 0 1 ${x + 52},40`;
  }).join(" ");
  return (
    <svg viewBox="0 0 520 80" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d={`${scallops} L520,80 L0,80 Z`} fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   鯉 Koi — carp that swim upriver and, at the Dragon Gate, become
   dragons. The origin of the whole voyage's theme, really.
   ------------------------------------------------------------------ */
export function Koi({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M18,40 C34,16 72,10 100,24 C118,33 126,40 138,40 C126,40 118,47 100,56 C72,70 34,64 18,40 Z" />
      <path d="M138,40 C146,28 154,20 158,12 C150,24 152,34 148,40 C152,46 150,56 158,68 C154,60 146,52 138,40 Z" />
      <path d="M62,22 C70,10 84,6 92,10 C82,12 74,18 70,26 Z" opacity=".7" />
      <path d="M62,58 C70,70 84,74 92,70 C82,68 74,62 70,54 Z" opacity=".7" />
      <circle cx="36" cy="36" r="3.4" fill="var(--color-sumi)" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   桜 Sakura — a single five-petal blossom.
   ------------------------------------------------------------------ */
export function Sakura({ className }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      {Array.from({ length: 5 }, (_, i) => (
        <path
          key={i}
          d="M0,-6 C-13,-16 -15,-34 -6,-44 C-3,-40 -1,-44 0,-47 C1,-44 3,-40 6,-44 C15,-34 13,-16 0,-6 Z"
          transform={`rotate(${72 * i})`}
        />
      ))}
      <circle r="5" fill="var(--color-yamabuki)" opacity=".9" />
    </svg>
  );
}
