/* The chapters, in reading order.

   Position in this array is load-bearing. It is what the header, the drawer
   and the pager all read to decide whether a link goes *deeper* into the
   voyage or *back* toward the harbour — which in turn picks the slide
   direction. Reorder this array and the animation follows. */

export type Chapter = {
  href: string;
  /** English, always shown. The reader does not know Japanese yet. */
  label: string;
  /** One kanji, used as a seal alongside the English — never instead of it. */
  script: string;
  /** How that kanji is said, so the seal teaches instead of decorating. */
  reading: string;
  /** A one-line standfirst for the drawer and the pager. */
  blurb: string;
};

export const chapters: Chapter[] = [
  {
    href: "/",
    label: "Home",
    script: "宮",
    reading: "miya",
    blurb: "Ten nights to the Dragon Palace",
  },
  {
    href: "/voyage",
    label: "The voyage",
    script: "航",
    reading: "kō",
    blurb: "The shape of the route",
  },
  {
    href: "/lore",
    label: "Dragon lore",
    script: "龍",
    reading: "ryū",
    blurb: "Ryūjin and the palace under the sea",
  },
  {
    href: "/journey",
    label: "Day by day",
    script: "旅",
    reading: "tabi",
    blurb: "Eleven days, twenty places",
  },
  {
    href: "/traditions",
    label: "Traditions",
    script: "礼",
    reading: "rei",
    blurb: "Shrines, baths and chopsticks",
  },
  {
    href: "/watch",
    label: "Watch",
    script: "観",
    reading: "kan",
    blurb: "Homework, but the good kind",
  },
  {
    href: "/phrases",
    label: "Phrases",
    script: "語",
    reading: "go",
    blurb: "Enough Japanese to be polite",
  },
  {
    href: "/words",
    label: "Words",
    script: "言",
    reading: "koto",
    blurb: "Everything worth being able to name",
  },
];

/** Where a path sits in the running order, or -1 if it is not a chapter. */
export function chapterIndex(pathname: string) {
  return chapters.findIndex((chapter) => chapter.href === pathname);
}

/** Forward is "further from home", which reads as a leftward slide.
    Anything we cannot place (a 404, a deep link) is treated as forward. */
export function navDirection(pathname: string, targetIndex: number) {
  const current = chapterIndex(pathname);
  return targetIndex < current ? "nav-back" : "nav-forward";
}
