/** Voyage-level facts, taken from the itinerary planner. */
export const voyage = {
  ship: "Diamond Princess",
  shipScript: "ダイヤモンド・プリンセス",
  homePort: "Yokohama Ōsanbashi Pier",
  homePortScript: "横浜大さん橋",
  sailAway: "2027-07-21T15:00:00+09:00",
  /** Wheels-up from Montréal — the moment the whole thing starts. */
  departure: "2027-07-19T13:05:00-04:00",
  homecoming: "2027-07-29T17:00:00-04:00",
  outboundFlight: "AC5",
  inboundFlight: "AC6",
  aircraft: "Boeing 777-300ER",
  from: "Montréal–Trudeau (YUL)",
  to: "Tokyo Narita (NRT)",
} as const;

export const voyageStats = [
  { value: 11, label: "days", note: "19–29 July 2027", suffix: "" },
  { value: 21, label: "places", note: "shrines, temples, beaches, gates", suffix: "" },
  { value: 4, label: "ports of call", note: "plus one strait, sailed slowly", suffix: "" },
  { value: 7, label: "nights aboard", note: "balcony stateroom, port side", suffix: "" },
  { value: 2, label: "countries", note: "Japan and South Korea", suffix: "" },
  { value: 13, label: "hours ahead", note: "a whole day gained, then given back", suffix: "" },
] as const;

export type ChapterKind = "transit" | "landfall" | "port" | "cruising" | "sea" | "city";

export type Chapter = {
  id: string;
  day: number;
  date: string;
  weekday: string;
  place: string;
  placeScript: string;
  kind: ChapterKind;
  headline: string;
  note: string;
  /** Ids from `destinations`, in the order they happen. */
  stops: string[];
};

export const chapters: Chapter[] = [
  {
    id: "day-1",
    day: 1,
    date: "19 July 2027",
    weekday: "Monday",
    place: "Montréal → the Pacific",
    placeScript: "出発",
    kind: "transit",
    headline: "You lose a day on purpose",
    note: "AC5 lifts off at 13:05 and flies thirteen hours and twenty minutes into tomorrow. Somewhere over the Bering Sea the date line takes the rest of Monday from you and sets you down on Tuesday afternoon. You get it back on the way home.",
    stops: [],
  },
  {
    id: "day-2",
    day: 2,
    date: "20 July 2027",
    weekday: "Tuesday",
    place: "Narita & Yokohama",
    placeScript: "成田・横浜",
    kind: "landfall",
    headline: "Landfall, and the smell of salt",
    note: "Down through the cloud onto Chiba, out through Terminal 1, and onto an orange coach that runs the long way around Tokyo Bay to a harbour room in Yokohama. Then, five minutes south and after dark, the lanterns come on in Chinatown — which is the hour to see it.",
    stops: ["narita-arrival", "hyatt-yokohama", "yokohama-chinatown"],
  },
  {
    id: "day-3",
    day: 3,
    date: "21 July 2027",
    weekday: "Wednesday",
    place: "Yokohama & Embarkation",
    placeScript: "横浜・乗船",
    kind: "city",
    headline: "The sea goddess, eight minutes from the door",
    note: "Enoshima was two and a half hours in a taxi and seven hundred steps for a dragon hall. Eight minutes' walk from the hotel there is a temple to Mazu, the goddess who calms the sea and brings sailors home — dragons the whole length of the gate and along the roof ridge, and on a Wednesday a tai chi circle in the courtyard at nine. Then the whale's back, and the ship. Lines go at 15:00.",
    stops: ["yokohama-masobyo", "osanbashi-pier"],
  },
  {
    id: "day-4",
    day: 4,
    date: "22 July 2027",
    weekday: "Thursday",
    place: "Toba",
    placeScript: "鳥羽",
    kind: "port",
    headline: "You board the Dragon Palace itself",
    note: "Anchored in Toba Bay, ashore by tender — and then, from the same pier, onto a boat called Ryūgū-jō that was built to be the undersea palace, Urashima Tarō and Otohime standing on its roof. It sets you down beside an aquarium holding the dugong that Japan turned into the mermaid. No taxi all day. The wedded rocks are still there if you want them, ten minutes west and flat the whole way.",
    stops: ["meoto-iwa", "ryugusha-shrine"],
  },
  {
    id: "day-5",
    day: 5,
    date: "23 July 2027",
    weekday: "Friday",
    place: "Kōchi",
    placeScript: "高知",
    kind: "port",
    headline: "The dragon shrine, seen from the dragon's head",
    note: "The beach day. A crescent of five-coloured shingle that Japan reserves for looking at the moon, strung between Dragon Head Cape and Dragon King Cape, with the sea god's shrine on the rock at the far end. You go down onto the sand, but you see the shrine from the viewpoint rather than climbing to it — and you reach that up a ramp instead of the stairs. The morning goes to an air-conditioned museum on the castle hill of the warlord who founded the shrine in the first place.",
    stops: ["katsurahama-beach", "ryuotsu-shrine"],
  },
  {
    id: "day-6",
    day: 6,
    date: "24 July 2027",
    weekday: "Saturday",
    place: "Kanmon Straits",
    placeScript: "関門海峡",
    kind: "cruising",
    headline: "The narrowest water in Japan, taken slowly",
    note: "No shore excursion. Just the balcony, a bridge passing overhead, and the stretch of water where a six-year-old emperor was carried down to a capital beneath the waves.",
    stops: ["kanmon-straits"],
  },
  {
    id: "day-7",
    day: 7,
    date: "25 July 2027",
    weekday: "Sunday",
    place: "Seogwipo, Jeju",
    placeScript: "서귀포 · 제주",
    kind: "port",
    headline: "Korea for a day, taken gently",
    note: "The one foreign port, and the one with a kilometre of corridor at each end of it — so the day holds a single stop. A domed glasshouse in the Jungmun resort, with a lift and a loaned wheelchair and thirty degrees kept firmly outside. And then, if the gate staff say the bridge is step-free, the arch above the waterfall where seven heavenly women are carved coming down to bathe.",
    stops: ["jungmun-beach", "yeomiji-garden", "cheonjeyeon-waterfall"],
  },
  {
    id: "day-8",
    day: 8,
    date: "26 July 2027",
    weekday: "Monday",
    place: "Nagasaki",
    placeScript: "長崎",
    kind: "port",
    headline: "You stand at the Dragon Palace Gate",
    note: "A Ming-style Chinese gate built to look like the entrance to the dragon king's undersea palace — seen from the forecourt, because everything behind it is stairs. Then a free public lift carries you up the hill to Glover Garden, and the descent ends indoors with the two Kunchi dragons themselves. Three dragons before lunch, and nothing climbed.",
    stops: ["sofukuji-ryugumon", "glover-garden"],
  },
  {
    id: "day-9",
    day: 9,
    date: "27 July 2027",
    weekday: "Tuesday",
    place: "At Sea",
    placeScript: "洋上",
    kind: "sea",
    headline: "Nothing at all, deliberately",
    note: "The Pacific on every side and no obligations. The one thing worth getting up for is the cypress bath on deck, open to the sea air.",
    stops: ["izumi-bath"],
  },
  {
    id: "day-10",
    day: 10,
    date: "28 July 2027",
    weekday: "Wednesday",
    place: "Yokohama → Asakusa",
    placeScript: "浅草",
    kind: "city",
    headline: "You become other people for an afternoon",
    note: "Alongside at 06:30, ashore by eight, and in Asakusa by nine-thirty. Then three hours of white makeup, silk, lacquered armour and a camera. Skytree does the rest after dark.",
    stops: ["cocomo-makeover", "asakusa-view-hotel"],
  },
  {
    id: "day-11",
    day: 11,
    date: "29 July 2027",
    weekday: "Thursday",
    place: "Asakusa & Home",
    placeScript: "浅草・帰国",
    kind: "city",
    headline: "The golden dragon, and then the long way west",
    note: "The Thunder Gate, a dragon pouring the water you wash with, and a golden dragon on the ceiling of the main hall. Then the bus from the lobby, and Montréal on the same calendar day.",
    stops: ["kaminarimon-gate", "sensoji-dragon-fountain", "sensoji-dragon-ceiling"],
  },
];

/* ------------------------------------------------------------------
   The rituals you will actually take part in. Worth knowing before you
   are standing at the basin with a queue behind you.
   ------------------------------------------------------------------ */
export type Ritual = {
  name: string;
  script: string;
  where: string;
  steps: string[];
  note?: string;
};

export const rituals: Ritual[] = [
  {
    name: "Purifying at the basin",
    script: "手水舎 · temizuya",
    where: "Every shrine — and, memorably, the dragon's mouth at Sensō-ji",
    steps: [
      "Take the ladle in your right hand and rinse your left.",
      "Swap hands and rinse your right.",
      "Back in the right hand, pour water into your cupped left palm and rinse your mouth from the palm — never from the ladle.",
      "Rinse the left hand once more, then tip the ladle upright so the last of the water runs down the handle and cleans it for the next person.",
    ],
    note: "One scoop is meant to do all four steps. Don't refill.",
  },
  {
    name: "Praying at a shrine",
    script: "二礼二拍手一礼 · ni-rei ni-hakushu ichi-rei",
    where: "Ryūgūsha, Futami Okitama, Ryūō",
    steps: [
      "Drop a coin in the box — a five-yen piece if you have one; go-en puns on ご縁, 'a connection formed'.",
      "Ring the bell if there is one, to let the kami know you have come.",
      "Bow deeply twice.",
      "Clap twice, hold your hands together, and say what you came to say.",
      "Bow deeply once more.",
    ],
    note: "Walk in at the side of the torii, not down the middle — the centre line is the kami's own path.",
  },
  {
    name: "At a Buddhist temple instead",
    script: "合掌 · gasshō",
    where: "Sensō-ji, Sōfuku-ji",
    steps: [
      "Bow once at the gate.",
      "Wash at the basin as above.",
      "At the great incense burner, pull the smoke over yourself — over whatever hurts.",
      "Offer a coin, press your palms together silently, and bow.",
    ],
    note: "Do not clap at a temple. Clapping is for kami, not for buddhas — this is the single most common visitor slip.",
  },
  {
    name: "Bathing properly",
    script: "温泉 · onsen",
    where: "The Izumi bath, on the way home across the Pacific",
    steps: [
      "Undress completely in the changing room; nothing goes into the bath but you.",
      "Sit on a stool at the taps and wash and rinse thoroughly — the bath is for soaking, not cleaning.",
      "Tie long hair up, and keep the small towel out of the water. Most people fold it on their head.",
      "Get in slowly. Stay as long as it feels good and no longer.",
    ],
    note: "The Izumi bath is one of very few at sea, because the Diamond Princess was built in Nagasaki.",
  },
];

/* ------------------------------------------------------------------
   おみくじ Omikuji — the fortune slips drawn at shrines. The ranking
   below is the common twelve-level scale; many shrines use a shorter
   one. A bad draw is not a disaster: you tie it to a rack on the
   grounds and leave the misfortune behind you.
   ------------------------------------------------------------------ */
export type Fortune = {
  rank: string;
  script: string;
  gloss: string;
  reading: string;
  /** Written for this voyage rather than for life in general. */
  travel: string;
  good: boolean;
};

export const fortunes: Fortune[] = [
  {
    rank: "Dai-kichi",
    script: "大吉",
    gloss: "Great blessing",
    reading: "The best slip in the box.",
    travel:
      "The sea lies down for you. Every tender runs, every gate stands open, and the one photograph you most wanted turns out better than you imagined it.",
    good: true,
  },
  {
    rank: "Chū-kichi",
    script: "中吉",
    gloss: "Middle blessing",
    reading: "Solidly good, without fuss.",
    travel:
      "Nothing goes wrong and several small things go quietly right. You find the shop with the good mochi. You get the balcony side with the bridge view.",
    good: true,
  },
  {
    rank: "Shō-kichi",
    script: "小吉",
    gloss: "Small blessing",
    reading: "Modest good fortune.",
    travel:
      "One grey morning, then sun for the rest. Take the earlier taxi and you will make the cave before the queue does.",
    good: true,
  },
  {
    rank: "Kichi",
    script: "吉",
    gloss: "Blessing",
    reading: "Plain, dependable luck.",
    travel:
      "The day unfolds exactly as planned, which on a trip this tightly scheduled is its own kind of miracle.",
    good: true,
  },
  {
    rank: "Han-kichi",
    script: "半吉",
    gloss: "Half blessing",
    reading: "Good, with a condition attached.",
    travel:
      "Fortune favours the one who gets up early. Sleep in and you will be looking at the back of a tour group all morning.",
    good: true,
  },
  {
    rank: "Sue-kichi",
    script: "末吉",
    gloss: "Blessing yet to come",
    reading: "Slow to arrive, but it arrives.",
    travel:
      "The first half of the voyage is merely pleasant. Then Nagasaki happens, and you understand why the itinerary was built this way.",
    good: true,
  },
  {
    rank: "Sue-shō-kichi",
    script: "末小吉",
    gloss: "Small blessing yet to come",
    reading: "Patience, then a little reward.",
    travel:
      "You will spend a day thinking a port was a disappointment, and remember it fondly for the rest of your life.",
    good: true,
  },
  {
    rank: "Kyō",
    script: "凶",
    gloss: "Misfortune",
    reading: "Tie it to the rack and walk away.",
    travel:
      "Rain over the wedded rocks and the frogs no help at all. Fold this one, knot it to the rope with the others, and let the shrine keep it.",
    good: false,
  },
  {
    rank: "Shō-kyō",
    script: "小凶",
    gloss: "Small misfortune",
    reading: "A minor nuisance, nothing more.",
    travel:
      "You leave the good hat on the bus. It is only a hat. The dragon still pours the water and the bell still rings.",
    good: false,
  },
  {
    rank: "Dai-kyō",
    script: "大凶",
    gloss: "Great misfortune",
    reading: "Rare, and oddly prized.",
    travel:
      "The rarest slip in the box, and some pilgrims hunt it on purpose: from the very bottom, every direction is up. Tie it tight and enjoy your voyage.",
    good: false,
  },
];
