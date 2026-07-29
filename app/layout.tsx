import type { Metadata, Viewport } from "next";
import { Manrope, Shippori_Mincho_B1, Yuji_Syuku } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

/* Shippori Mincho B1 — a modern mincho with a beautifully drawn Latin set.
   Its serifs are called *uroko* ("scales") in Japanese type terminology,
   which is a happy accident for a site about dragons.

   preload: false is deliberate and load-bearing. These are CJK families, so
   Google serves each weight as ~122 unicode-range shards; `subsets` does not
   stop those being emitted, it only decides which get a <link rel="preload">.
   With preloading on, this page shipped 844 preload tags — 24.4 MB — in the
   head. Switched off, the @font-face rules still carry their unicode-ranges
   and the browser fetches only the handful of shards the page's characters
   actually need. Weights are trimmed to the ones the markup really selects. */
const shippori = Shippori_Mincho_B1({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
});

/* Manrope carries the body copy. It is deliberately a Latin-only family:
   the prose is peppered with inline kanji (glossary meanings, phrase notes),
   and a CJK body font would fetch a unicode-range shard for each one. Manrope
   simply has no Japanese glyphs, so those characters fall straight through to
   the system gothic in the stack. It is also variable, so one file covers
   every weight. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

/* Yuji Syuku — brushed by hand with a fude. Used sparingly, for the
   moments that should feel written rather than typeset. */
const yuji = Yuji_Syuku({
  variable: "--font-yuji",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

/* metadataBase must be an absolute, reachable origin — every relative URL in
   openGraph is resolved against it. Point NEXT_PUBLIC_SITE_URL at the real
   host when this is deployed; until then localhost is at least routable,
   which "https://ryugu.local" never was. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ryūgū — Ten Nights to the Dragon Palace",
    template: "%s · Ryūgū",
  },
  description:
    "A voyage around Japan and Jeju aboard the Diamond Princess, July 2027 — dragon shrines, sea caves lit by lantern light, wedded rocks, thunder gates and a golden dragon on a temple ceiling.",
  keywords: [
    "Japan",
    "Diamond Princess",
    "Ryujin",
    "dragon mythology",
    "Toba",
    "Kochi",
    "Nagasaki",
    "Jeju",
    "Sensoji",
  ],
  openGraph: {
    title: "Ryūgū — Ten Nights to the Dragon Palace",
    description:
      "Every port on this voyage is anchored in sea-dragon mythology. Follow the route from Yokohama to the Thunder Gate.",
    type: "website",
    locale: "en_CA",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning: browser extensions (password managers, screen
       recorders, translation tools) routinely stamp attributes onto <html>
       before React hydrates. Suppressing here covers only this element's own
       attributes, not the tree below it. */
    /* data-scroll-behavior: as of Next 16 the router no longer neutralises
       `scroll-behavior: smooth` during a navigation. Without this attribute
       every chapter change would smooth-scroll back to the top *while* the
       slide plays — two motions fighting. The attribute restores the old
       behaviour: instant for navigation, smooth for in-page anchors. */
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${shippori.variable} ${manrope.variable} ${yuji.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sumi text-shironeri">
        {/* Runs synchronously as the browser parses, before first paint. The
            scroll-reveal CSS starts content at opacity 0 and is scoped to
            `.js`, so if this never runs — scripting off, a crawler, a bundle
            that failed — the page renders fully visible instead of blank. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        {/* Header and footer live in the layout so they survive a chapter
            change: the router swaps only `children`, which is exactly the
            part wrapped in a <ViewTransition>. */}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
