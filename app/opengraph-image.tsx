import { ImageResponse } from "next/og";

export const alt = "Ryūgū — Ten Nights to the Dragon Palace, a July 2027 voyage around Japan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link preview. ImageResponse supports flexbox and a subset of CSS only —
 * no grid, no background-clip — so this is deliberately built from plain
 * boxes and solid colours.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(150deg, #0b0b0f 0%, #131a33 58%, #192f60 100%)",
          color: "#f5f1e6",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #eb6101",
              color: "#eb6101",
              fontSize: 30,
            }}
          >
            龍
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#a8a297",
            }}
          >
            19 – 29 July 2027
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 14, color: "#eb6101" }}>
            RYŪGŪ
          </div>
          {/* Two stacked divs rather than a <br />: Satori requires an
              explicit display on any element with more than one child, and
              text + <br /> + text counts as three. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              lineHeight: 1.05,
              marginTop: 18,
              color: "#e6b422",
            }}
          >
            <div style={{ display: "flex" }}>Ten Nights to the</div>
            <div style={{ display: "flex" }}>Dragon Palace</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(201,138,40,0.4)",
            paddingTop: 26,
            fontSize: 22,
            color: "#c9c1af",
          }}
        >
          <div style={{ display: "flex" }}>
            Diamond Princess · Yokohama · Toba · Kōchi · Jeju · Nagasaki
          </div>
          <div style={{ display: "flex", color: "#c98a28" }}>龍宮城</div>
        </div>
      </div>
    ),
    size,
  );
}
