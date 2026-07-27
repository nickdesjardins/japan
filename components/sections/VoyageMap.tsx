import { Seigaiha } from "@/components/art/Motifs";

/**
 * The cruise track, drawn on a real equirectangular projection rather than a
 * decorative squiggle — the port positions below are the actual coordinates
 * pushed through the same transform, so the shape of the voyage is true.
 */
const LON_0 = 125.5;
const LAT_0 = 36.2;
const X_SCALE = 60; // px per degree of longitude
const Y_SCALE = 90; // px per degree of latitude

const px = (lon: number) => +((lon - LON_0) * X_SCALE).toFixed(0);
const py = (lat: number) => +((LAT_0 - lat) * Y_SCALE).toFixed(0);

type Port = {
  name: string;
  script: string;
  day: string;
  lat: number;
  lon: number;
  anchor: "start" | "middle" | "end";
  dy: number;
};

const PORTS: Port[] = [
  { name: "Yokohama", script: "横浜", day: "Days 3 & 10", lat: 35.45, lon: 139.65, anchor: "end", dy: -18 },
  { name: "Toba", script: "鳥羽", day: "Day 4", lat: 34.48, lon: 136.84, anchor: "start", dy: -18 },
  { name: "Kōchi", script: "高知", day: "Day 5", lat: 33.55, lon: 133.55, anchor: "middle", dy: 32 },
  { name: "Kanmon Straits", script: "関門海峡", day: "Day 6", lat: 33.95, lon: 130.95, anchor: "middle", dy: -18 },
  { name: "Seogwipo, Jeju", script: "서귀포", day: "Day 7", lat: 33.25, lon: 126.56, anchor: "start", dy: -18 },
  { name: "Nagasaki", script: "長崎", day: "Day 8", lat: 32.75, lon: 129.87, anchor: "middle", dy: 34 },
];

/** Outbound leg, Yokohama westward to Nagasaki. */
const OUTBOUND = [
  `M${px(139.65)},${py(35.45)}`,
  `Q${px(138.2)},${py(35.0)} ${px(136.84)},${py(34.48)}`,
  `Q${px(135.2)},${py(33.7)} ${px(133.55)},${py(33.55)}`,
  `Q${px(132.2)},${py(33.5)} ${px(130.95)},${py(33.95)}`,
  `Q${px(128.6)},${py(33.9)} ${px(126.56)},${py(33.25)}`,
  `Q${px(128.2)},${py(32.9)} ${px(129.87)},${py(32.75)}`,
].join(" ");

/** The long run home, south of Shikoku, with a full day at sea. */
const RETURN = [
  `M${px(129.87)},${py(32.75)}`,
  `C${px(132.5)},${py(31.6)} ${px(136.0)},${py(32.0)} ${px(138.4)},${py(33.9)}`,
  `C${px(139.4)},${py(34.6)} ${px(139.6)},${py(35.1)} ${px(139.65)},${py(35.45)}`,
].join(" ");

const WIDTH = 900;
const HEIGHT = 360;

/** Meridians and parallels, for the nautical-chart feel. */
const MERIDIANS = [126, 128, 130, 132, 134, 136, 138, 140];
const PARALLELS = [33, 34, 35, 36];

export function VoyageMap() {
  return (
    <figure className="relative">
      <div
        className="pointer-events-none absolute inset-0 text-ai/30"
        style={{
          maskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
        }}
      >
        <Seigaiha id="map-seigaiha" className="h-full w-full" strokeWidth={1} opacity={0.4} />
      </div>

      <svg
        viewBox={`-40 -30 ${WIDTH + 80} ${HEIGHT + 90}`}
        className="relative w-full"
        role="img"
        aria-label="Chart of the cruise track: Yokohama west to Toba, Kōchi, the Kanmon Straits, Jeju and Nagasaki, then back east to Yokohama."
      >
        {/* graticule */}
        <g stroke="currentColor" className="text-kincha/15" strokeWidth="0.8">
          {MERIDIANS.map((lon) => (
            <line key={lon} x1={px(lon)} y1={-24} x2={px(lon)} y2={HEIGHT + 8} />
          ))}
          {PARALLELS.map((lat) => (
            <line key={lat} x1={-32} y1={py(lat)} x2={WIDTH + 16} y2={py(lat)} />
          ))}
        </g>
        <g className="fill-nezu/50" fontSize="9" fontFamily="var(--font-body)">
          {MERIDIANS.filter((l) => l % 4 === 2).map((lon) => (
            <text key={lon} x={px(lon)} y={HEIGHT + 24} textAnchor="middle">
              {lon}°E
            </text>
          ))}
          {PARALLELS.map((lat) => (
            <text key={lat} x={-36} y={py(lat) + 3} textAnchor="end">
              {lat}°N
            </text>
          ))}
        </g>

        {/* the track */}
        <path
          d={RETURN}
          fill="none"
          stroke="currentColor"
          className="draw-path text-mizu/40"
          strokeWidth="2"
          strokeDasharray="6 9"
          strokeLinecap="round"
          style={{ transitionDelay: "700ms" }}
        />
        <path
          d={OUTBOUND}
          fill="none"
          stroke="currentColor"
          className="draw-path text-kin"
          strokeWidth="2.6"
          strokeLinecap="round"
          style={{ "--len": 1400 } as React.CSSProperties}
        />

        {/* ports */}
        {PORTS.map((port, i) => {
          const x = px(port.lon);
          const y = py(port.lat);
          return (
            <g key={port.name}>
              <circle cx={x} cy={y} r="14" className="fill-kin/10 anim-glow" />
              <circle cx={x} cy={y} r="5" className="fill-shu" />
              <circle cx={x} cy={y} r="9" fill="none" strokeWidth="1.2" className="stroke-kin/70" />

              {/* Below `sm` the whole 980-unit chart is squeezed into ~350px,
                  which would render these labels at 3–4px. They are replaced
                  by the numbered legend under the figure. */}
              <g className="hidden sm:block">
                <text
                  x={x}
                  y={y + port.dy}
                  textAnchor={port.anchor}
                  className="fill-shironeri"
                  fontSize="15"
                  fontFamily="var(--font-display)"
                >
                  {port.name}
                </text>
                <text
                  x={x}
                  y={y + port.dy + (port.dy < 0 ? -14 : 15)}
                  textAnchor={port.anchor}
                  className="fill-nezu"
                  fontSize="10"
                  letterSpacing="0.14em"
                  fontFamily="var(--font-body)"
                >
                  {port.day.toUpperCase()}
                </text>
              </g>

              {/* The legend key. At 350px wide the chart scales by ~0.36, so
                  this needs ~38 viewBox units to land near 14px on screen.
                  The dark stroke keeps it legible where it crosses the track. */}
              <text
                x={x + 22}
                y={y - 16}
                textAnchor="middle"
                className="fill-kin sm:hidden"
                fontSize="38"
                fontWeight="700"
                stroke="var(--color-sumi)"
                strokeWidth="7"
                paintOrder="stroke"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2 sm:hidden">
        {PORTS.map((port, i) => (
          <li key={port.name} className="flex gap-2.5 text-[0.78rem] leading-snug">
            <span className="font-display tabular-nums text-kin">{i + 1}</span>
            <span>
              <span className="block text-shironeri">{port.name}</span>
              <span className="block text-[0.68rem] uppercase tracking-wider text-nezu">
                {port.day}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="mt-4 text-center text-xs text-nezu">
        Solid gold: the outbound track. Dashed: the run home, south of Shikoku, with a
        full day at sea.
      </figcaption>
    </figure>
  );
}
