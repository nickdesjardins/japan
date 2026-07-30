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
  { value: 20, label: "places", note: "shrines, temples, beaches, gates", suffix: "" },
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
    note: "Down through the cloud onto Chiba, out through Terminal 1, and onto an orange coach that runs the long way around Tokyo Bay to a harbour room in Yokohama. You take the 17:25 rather than the 16:55, because the earlier one leaves at the exact minute the walk to it ends and this is not a day to gamble with two suitcases. Then, after dark and eight minutes south, the lanterns are already lit in Chinatown — which is the hour to see it. Incense tonight, supper tonight; the fortune hall waits for the morning, when it is open and you are awake.",
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
    note: "Enoshima was two and a half hours in a taxi and seven hundred steps for a dragon hall. Eight minutes' walk from the hotel there is a temple to Mazu, the goddess who calms the sea and brings sailors home — dragons the whole length of the gate and along the roof ridge, and on a Wednesday a tai chi circle in the courtyard at nine. It ends at ten, which is the minute the fortune hall five minutes north unlocks its door, so the tarot happens here rather than in a rush on the Tuesday night. Then the whale's back, and the ship. Lines go at 15:00.",
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
    headline: "Two rocks, a rope, and the Dragon Palace itself",
    note: "Up at seven, because everything outdoors today happens before nine. Ashore by tender and ten minutes west by taxi to the wedded rocks — the husband rock, the wife rock, thirty-five metres of rice-straw rope slung between them, and frogs the whole length of the path, because kaeru means both frog and safe return. The shrine office opens at seven, so the fortunes come out of a frog's mouth while the promenade is still in shade. Then two hundred flat metres east to the little vermillion shrine named for the dragon king's palace. Back for a boat that was built to be that palace, and the air-conditioned aquarium it sets you down beside.",
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
    note: "The beach day. A crescent of five-coloured shingle that Japan reserves for looking at the moon, strung between Dragon Head Cape and Dragon King Cape, with the sea god's shrine on the rock at the far end. You go down onto the sand before lunch, while it is still under thirty degrees — then you see the shrine from the viewpoint rather than climbing to it, and you reach that up a ramp instead of the stairs. The morning goes to an air-conditioned museum on the castle hill of the warlord who founded the shrine in the first place, and lunch is the long cool sit-down at the end rather than a break in the middle.",
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
    note: "No shore excursion and nothing to be late for. Mostly the balcony — but a fixed balcony only ever sees one bank, so the twenty minutes that matter happen on an open deck, with a bridge passing overhead and Shimonoseki to starboard: the stretch of water where a six-year-old emperor was carried down to a capital beneath the waves.",
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
    note: "The one foreign port, and the one with a kilometre of corridor at each end of it — so the day is deliberately short and in the right order. First the gorge at nine, while it is cool: an arched bridge over the falls with seven heavenly women carved along its flank, coming down to bathe. Then the swim, eighty minutes of it, on black and red and white volcanic sand. Then a long lunch, and back aboard by two with two hours still in hand. Two stops, never three — a third is what used to push this day past its own deadline.",
    stops: ["cheonjeyeon-waterfall", "jungmun-beach"],
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
    note: "A Ming-style Chinese gate built to look like the entrance to the dragon king's undersea palace — seen from the forecourt, because everything behind it is stairs, and the two National Treasures up there stay a bonus rather than a promise. Then a free public lift carries you up the hill to Glover Garden, and the descent ends indoors with the two Kunchi dragons themselves. Third is Chinatown's Azure Dragon gate, at pavement level. Three dragons before lunch, nothing climbed, and aboard again by half past one.",
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
    note: "Alongside at 06:30 — but berthing is not walking off. Disembarkation goes by luggage-tag colour from about half past eight, so you are off the ship around then and in Asakusa by a quarter to eleven. Then three hours of white makeup, silk, lacquered armour and a camera, booked for eleven rather than half past ten so the morning has somewhere to slip. The window in the room does the rest after dark: the temple floodlit below, the Skytree changing colour past the river.",
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
    note: "Check out first, then the Thunder Gate at nine, a dragon pouring the water you wash with, and a golden dragon on the ceiling of the main hall. It is all done by eleven, which leaves an unhurried hour before the 12:45 coach — the one that reaches Narita at 14:35 rather than the 13:45 that reaches it at four and puts you at the gate after the door has shut. Then Montréal, on the same calendar day.",
    stops: ["kaminarimon-gate", "sensoji-dragon-fountain", "sensoji-dragon-ceiling"],
  },
];

/* ------------------------------------------------------------------
   The same eleven days with the poetry taken out.

   Everything else on this site assumes you want the story. This is for
   the moment you don't — for reading to somebody who has never heard of
   Watatsumi or Ōsanbashi and only wants to know what you are doing on
   the Tuesday. No Japanese, no myth, no place-name you have to hold in
   your head. Times are plain, and every port day says out loud when you
   are back on the ship, because that is the question that gets asked.
   ------------------------------------------------------------------ */
export type PlainDay = {
  /** Chapter id, so this stays tied to the day it describes. */
  id: string;
  /** Where you are, said the way you would say it out loud. */
  where: string;
  /** Two or three words for what kind of day it is. */
  tag: string;
  /** The whole day, for someone who knows none of the names. */
  what: string;
  /** The reassurance, on the days there is something to catch. */
  back?: string;
};

export const plainDays: PlainDay[] = [
  {
    id: "day-1",
    where: "Montréal, then a very long flight",
    tag: "Travel day",
    what:
      "Leave the house at half past eight in the morning and fly straight to Tokyo — thirteen hours and twenty minutes, no changing planes. You take off on Monday and land on Tuesday afternoon, because you cross the date line and Monday evening simply never happens.",
  },
  {
    id: "day-2",
    where: "Tokyo airport, then Yokohama",
    tag: "Arrive and eat",
    what:
      "Land at 3:25pm, get through passport control, and take an airport coach around the bay to Yokohama — about an hour and forty minutes, bags stowed underneath. In the hotel by half past seven. Then a seven-minute walk into Yokohama's Chinatown, which is at its best after dark: red lanterns lit, a gold temple floodlit, five hundred kitchens going. Light some incense, have supper, walk back. Nothing is booked and there is nothing to catch — the fortune reading is tomorrow morning instead, because the last time they take anybody is half past seven and you only reach the hotel at about half past seven.",
  },
  {
    id: "day-3",
    where: "Yokohama — the day you get on the ship",
    tag: "Tarot, then board",
    what:
      "An easy morning on purpose, all of it within ten minutes' walk of the hotel. First a small Chinese temple dedicated to the goddess who protects sailors — you light five sticks of incense and walk them round five burners. Then, on Wednesday mornings only, a free tai chi class meets in the courtyard at nine; join the back row or just sit and watch. It finishes at ten, which happens to be the exact minute the fortune hall five minutes up the road opens — so you are the first ones in for the tarot, twenty minutes each, plus the reading of your palms. Then back for the bags, a seven-minute taxi to the pier, twenty-five minutes on its famous wooden roof looking at your ship, and aboard.",
    back: "Aboard by about 12:50pm. She sails at 3pm.",
  },
  {
    id: "day-4",
    where: "Toba, Japan",
    tag: "Frogs, then a boat",
    what:
      "The one early start — up at seven, because everything outdoors happens before nine while it is still cool. The ship anchors offshore so small boats ferry you in, then a ten-minute taxi to a seaside shrine famous for two things. Two big rocks standing in the sea, joined by an enormous rope of woven rice straw, said to be the husband-and-wife gods who made Japan. And frogs — stone frogs everywhere, because the Japanese word for frog also means \"to return safely\", so people come here to ask for a safe journey home. You pull a paper fortune out of a frog's mouth. Two hundred flat metres further on there is a tiny red shrine right at the water's edge for the sea dragon. Then back for a sightseeing boat built to look like the dragon's underwater palace, which drops you at one of Japan's biggest aquariums — indoors, air-conditioned, with a dugong, the sea cow that probably started the mermaid stories. Lunch is inside.",
    back: "Back on the ship by about 2pm. She sails at 4pm.",
  },
  {
    id: "day-5",
    where: "Kōchi, Japan",
    tag: "Beach day",
    what:
      "First an air-conditioned museum on a hilltop with a big window looking straight out over the Pacific. Then down onto the beach — the pebbles here are genuinely five different colours if you crouch down. You go down before lunch because there is no shade at all on the sand. Then a ramp, not stairs, up to a lookout where you can see a little red shrine on the headland at the far end. Then a long cool lunch indoors.",
    back: "Back on the ship by about 2pm. She sails at 5pm.",
  },
  {
    id: "day-6",
    where: "At sea, between two Japanese islands",
    tag: "Nothing to do",
    what:
      "The ship does not stop today. She threads the narrowest gap in Japan — about 650 metres of water — with a suspension bridge passing right overhead. Watch from your balcony, then go up to an open deck for twenty minutes or so, because a balcony only faces one way and you want to see both shores. That is the whole day.",
  },
  {
    id: "day-7",
    where: "Jeju Island, South Korea",
    tag: "Swimming day",
    what:
      "The only day in a different country, so there is passport control on the way out and on the way back, and about a kilometre of covered walkway each time. First a waterfall at nine, while it is still cool and while the beach is closed anyway — you cross an arched bridge over the gorge with seven flying women carved along the side of it, look down at the falls, and come back. Then the beach, which has black, grey, red and white volcanic sand, for a proper swim — lifeguards are on from ten. Then a long lunch somewhere air-conditioned.",
    back: "Back on the ship by about 2pm. She sails at 4pm.",
  },
  {
    id: "day-8",
    where: "Nagasaki, Japan",
    tag: "Three dragons",
    what:
      "A bright red Chinese gate built to look like the front door of a dragon king's underwater palace — you see the whole thing from the flat forecourt, because everything behind it is stairs. Then a free public lift carries you up a hillside to a garden of old Western houses with the best view in the city, and the walk down finishes indoors with the two real dragon costumes the city parades every October. Then a third dragon gate in Chinatown, at pavement level, and Chinese lunch.",
    back: "Back on the ship by about half past one. She sails at 4pm.",
  },
  {
    id: "day-9",
    where: "At sea, all day",
    tag: "Rest day",
    what:
      "Nothing at all, deliberately. The one thing worth getting up for is the Japanese bath on the top deck — cypress-wood tubs, hot water, and nothing through the glass but open ocean. Two hours, booked on the first day aboard because it sells out. You wash thoroughly at a seated shower first, then get in; the bath is for soaking, never for washing.",
  },
  {
    id: "day-10",
    where: "Off the ship at Yokohama, then Tokyo",
    tag: "Geisha and samurai dress-up",
    what:
      "Off the ship in the morning and about an hour and a quarter by car into Tokyo. Then the big one: three hours of being turned into other people and photographed — full white makeup, a heavy lacquered wig and layers of silk for one of you, laced armour and a crested helmet for the other. Late lunch by the enormous red lantern gate afterwards. The hotel room that night looks down on a floodlit temple with the Tokyo Skytree changing colour past the river.",
  },
  {
    id: "day-11",
    where: "Tokyo, then home",
    tag: "Temple, then fly",
    what:
      "Check out of the hotel first and leave the bags at the desk, then Tokyo's oldest temple: a gate with a four-metre red lantern hanging in it, a covered shopping street that has been feeding pilgrims since the 1600s, a bronze dragon pouring the water you wash your hands with, and a golden dragon painted across the ceiling of the main hall. All done by eleven, with an unhurried hour for lunch before the airport coach.",
    back: "At the airport by 2:35pm. The flight leaves at 5:35pm, and you are home in Montréal the same evening.",
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
