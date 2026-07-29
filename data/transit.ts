/* Every movement of the eleven days, with its means and its duration.
   ------------------------------------------------------------------

   Where this comes from, and why the numbers sometimes disagree with the
   planning document in /public/pdf:

   The itinerary planner was written as a booking brief, so it records the
   legs somebody has to *pay* for and skips the ones the body has to *do* —
   the climb back up from the cave, the flight of steps to the cliff shrine,
   the three floors between a coach bay and a check-in desk. Those are the
   legs that decide whether a day works. They are all here.

   Every duration below was checked against route data, operator timetables,
   port authority schedules and municipal barrier-free surveys rather than
   taken from the brief. Where the brief's own figure did not survive that,
   `caution` says so in plain words instead of quietly overwriting it. Two
   scheduled services it names do not exist at all — the 16:30 Narita coach
   on day 2 and the 13:15 Asakusa coach on day 11 — and those are the two
   worth reading before anything else.

   Times are local: EDT in Montréal, JST in Japan, KST on Jeju. A leg carries
   a clock time only where a real timetable or port schedule fixes one. */

import type { TransitMode } from "@/components/art/TransitGlyphs";

export type TransitLeg = {
  mode: TransitMode;
  from: string;
  to: string;
  /** Named service or vehicle — specific enough to book or to ask for. */
  means: string;
  /** Display duration, verified. Ranges are honest, not hedging. */
  duration: string;
  /** The same span as a single number, for the day's running total. */
  minutes: number;
  distance?: string;
  /** Only where a timetable or port schedule actually fixes the hour. */
  depart?: string;
  arrive?: string;
  note?: string;
  /** Where the planning document and the verified world part company. */
  caution?: string;
  /** Destination id this leg delivers you to, if it delivers you to one. */
  arrivesAt?: string;
  /**
   * Legs you might not do. `instead` replaces the leg above it, `optional` is
   * an extra you can skip. Both are kept out of the day's running total —
   * counting a fallback and the thing it falls back from would double the day.
   */
  aside?: "instead" | "optional";
};

/**
 * The deadline that actually matters on a port day. Ships do not wait, and
 * the shore agent's phone number is a poor substitute for being aboard.
 */
export type PortCall = {
  /** Where she is that day. */
  port: string;
  /** Alongside or at anchor from — the earliest you are realistically ashore. */
  ashore: string;
  /** Overrides "Ashore from" — embarkation day is boarding, not landing. */
  ashoreLabel?: string;
  /**
   * Your own deadline: ninety minutes before she sails, an hour earlier than
   * the ship asks for. This is the number the page shouts, because the one
   * the ship prints has no slack in it and no second chance behind it.
   */
  beBackBy: string;
  /** Overrides "Be back by" — on embarkation day you are arriving, not returning. */
  beBackByLabel?: string;
  /** The ship's own deadline, kept as the small print beneath yours. */
  allAboard: string;
  /** Lines go. */
  sails: string;
  /**
   * Tender ports only. The last boat back leaves before all-aboard, and the
   * queue for it starts well before that — this is the commonest way people
   * watch their ship leave without them.
   */
  lastTender?: string;
  note?: string;
};

export type TransitDay = {
  /** Chapter id from `chapters` in data/voyage.ts. */
  chapter: string;
  /** Set on the days the ship is somewhere you can get off her. */
  portCall?: PortCall;
  /** A day-level warning, for the days that do not add up as written. */
  advisory?: string;
  legs: TransitLeg[];
};

export const transitDays: TransitDay[] = [
  /* ------------------------------------------------------- day 1 — 19 July */
  {
    chapter: "day-1",
    legs: [
      {
        mode: "car",
        from: "Montréal",
        to: "Montréal–Trudeau (YUL), departures kerb",
        means: "Private car. Autoroute 720 west to Autoroute 20, up onto the departures viaduct.",
        duration: "45 min",
        minutes: 45,
        distance: "20 km",
        depart: "09:15",
        arrive: "10:00",
        caution:
          "Allow an hour. YUL's road network is mid-reconstruction until 2035 and the arrivals-level drop-off has been closed in rolling phases, pushing all traffic up to departures.",
      },
      {
        mode: "walk",
        from: "Departures kerb",
        to: "AC5 gate, YUL international pier",
        means:
          "Air Canada priority check-in and bag drop inside the terminal, CATSA security on a timed YUL Express slot, then travelators out to the pier.",
        duration: "1 h 30 min",
        minutes: 90,
        distance: "800 m",
        depart: "10:00",
        arrive: "11:30",
        note: "Bags are tagged straight through to Narita — this is a single nonstop sector, so they are not touched again until the belt at NRT.",
        caution:
          "There is no curbside check-in. Air Canada does not offer it anywhere in Canada; the only kerbside service is accessibility assistance arranged with the airport. And 3 h 05 min before departure clears Aéroports de Montréal's three-hour minimum but not the 3 h 30 min it recommends at peak.",
      },
      {
        mode: "plane",
        from: "Montréal–Trudeau (YUL)",
        to: "Tokyo Narita (NRT), Terminal 1 South Wing",
        means: "Air Canada AC5, Boeing 777-300ER. The only nonstop anyone flies between these two cities.",
        duration: "13 h 20 min",
        minutes: 800,
        distance: "10,347 km great-circle",
        depart: "13:05 EDT",
        arrive: "15:25 JST, next day",
        note:
          "Not across the Pacific, whatever the brief says — AC5 tracks over Hudson Bay, the Arctic and Alaska, and comes down the far side. Air Canada is Star Alliance, so it works the South Wing at Terminal 1; the North Wing is SkyTeam.",
        caution:
          "Summer 2027 schedules are not loaded yet, and one aggregator lists AC5 as Tuesday-to-Sunday. 19 July 2027 is a Monday. Confirm the day of operation with Air Canada before anything else on this page gets booked.",
      },
    ],
  },

  /* ------------------------------------------------------- day 2 — 20 July */
  {
    chapter: "day-2",
    legs: [
      {
        mode: "walk",
        from: "AC5 touchdown",
        to: "Terminal 1 arrivals lobby, 1F",
        means:
          "Taxi-in, deplane a 400-seat aircraft, travelators to immigration, Visit Japan Web code, baggage belt, customs, out through the doors.",
        duration: "1 h 15 min",
        minutes: 75,
        distance: "900 m",
        depart: "15:25",
        arrive: "16:40",
        arrivesAt: "narita-arrival",
        caution:
          "The brief allows 50 minutes. Narita's own guidance is about an hour, measured from the doors rather than the wheels — and 20 July 2027 is the first working day after Marine Day, so the hall is absorbing a returning three-day weekend on top of the usual load.",
      },
      {
        mode: "walk",
        from: "Arrivals lobby",
        to: "Bus Stop 12, 1F kerbside",
        means:
          "Level walk to the Airport Limousine counter, buy tickets (¥4,000 each), then out to the pole. Trolleys and porters the whole way; nothing gets carried.",
        duration: "15 min",
        minutes: 15,
        distance: "250 m",
        note: "Stop 12 is the YCAT bay at Terminal 1. Terminal 2 is stop 15, Terminal 3 is stop 7.",
      },
      {
        mode: "coach",
        from: "Narita Terminal 1",
        to: "YCAT, Yokohama City Air Terminal — alighting bay Y4",
        means:
          "Friendly Airport Limousine highway coach, jointly run by Tokyo Airport Transportation, Keikyu and Keisei. Staff take the cases at the pole and stow them underfloor against a claim tag.",
        duration: "1 h 40 min",
        minutes: 100,
        distance: "94 km",
        depart: "16:55",
        arrive: "18:35",
        caution:
          "The 16:30 departure in the brief does not exist. Terminal 1 runs 16:25, 16:55, 17:25 — and off a realistic 16:40 in the lobby, the 16:25 is already gone. Every afternoon service is timetabled at 1 h 40 min, not the 1 h 55 min the brief allows. Get off at bay Y4; Y1 is the boarding bay at the wrong end of the concourse.",
      },
      {
        mode: "walk",
        from: "YCAT bay Y4",
        to: "Pick-up point, Yokohama Sky Building",
        means: "Wait for the hold to open, collect the cases against the tags, cross the concourse.",
        duration: "5 min",
        minutes: 5,
        distance: "100 m",
        note:
          "A hire car cannot wait in the bus bays. Agree an exact meeting point at the Sky Building general-vehicle bay when you book, rather than expecting to find a rank.",
      },
      {
        mode: "taxi",
        from: "YCAT, Yokohama Station East",
        to: "Hyatt Regency Yokohama, Yamashita-chō",
        means: "Pre-booked private taxi through the Minato Mirai and Kannai corridor. The driver loads and unloads.",
        duration: "13 min",
        minutes: 13,
        distance: "3.4 km",
        arrivesAt: "hyatt-yokohama",
        note: "Around ¥1,600–2,200 on the meter.",
        caution:
          "The brief says ten minutes. Free-flow is five and a half, but this is 18:40 in central Yokohama — twelve to fifteen is the honest figure, twenty if the Kannai corridor is backed up.",
      },
      {
        mode: "walk",
        from: "Hotel forecourt",
        to: "Reception",
        means: "Bell staff take the cases from the kerb and bring them up to the room.",
        duration: "3 min",
        minutes: 3,
        distance: "40 m",
        note: "Wheels down 15:25, standing at the desk about 18:56.",
      },
      {
        mode: "walk",
        from: "Hyatt Regency Yokohama",
        to: "Kanteibyō, Yokohama Chinatown",
        means:
          "Out of the hotel and south through the Yamashita-chō block, in under the Chōyōmon gate. Flat, lit, and quicker on foot than by car — Chinatown's inner lanes are narrow, one-way and partly pedestrianised, so a taxi has to go round the outside.",
        duration: "7 min",
        minutes: 7,
        distance: "500 m",
        depart: "19:05",
        arrivesAt: "yokohama-chinatown",
        note:
          "This is the hour the street is for: the lanterns are lit, Kanteibyō is floodlit, and five hundred kitchens are going at once. Doing it tonight is what turns tomorrow morning from a scramble into a morning.",
      },
      {
        mode: "walk",
        from: "Kanteibyō",
        to: "Uranai Yakata Airi",
        means:
          "Chinatown's inner lanes, level and busy in a good way after dark. Three branches, all on the east side: the main store in the Kamome market at Yamashita-chō 187, the Shanghai Road branch at 192-2, and the Tenchōmon branch also at 187 on Kanteibyō-dōri.",
        duration: "5 min",
        minutes: 5,
        distance: "300 m",
        depart: "19:15",
        caution:
          "Last reception on a weekday is 19:30 — this is the tightest hinge in the whole itinerary. Off the 16:55 coach you are at the hotel about 18:56, which leaves roughly half an hour; take the 17:25 coach instead and you arrive about 19:25 and miss it outright. Book a specific branch and a specific time before you fly, ideally 19:00, and ask whether they can serve you in English — nothing on their site says they can. Note too that the brief promises \"face analysis\": Airi's published menu is tarot at 20 minutes, and palm reading, which cannot be booked on its own.",
      },
      {
        mode: "walk",
        from: "Chinatown",
        to: "Hyatt Regency Yokohama",
        means: "Back north through the block after supper.",
        duration: "7 min",
        minutes: 7,
        distance: "500 m",
        note: "Nothing to carry and nothing to catch. The bags are already upstairs.",
      },
    ],
  },

  /* ------------------------------------------------------- day 3 — 21 July */
  {
    chapter: "day-3",
    portCall: {
      port: "Yokohama Ōsanbashi — embarkation day",
      ashore: "12:00",
      ashoreLabel: "Boarding from",
      beBackBy: "13:00",
      beBackByLabel: "Be there by",
      allAboard: "14:00",
      sails: "15:00",
      note:
        "Embarkation is stricter than a port day: check-in runs 12:00 to 14:00 and Princess states that if you arrive after it closes you will not be allowed to board. Yokohama also uses assigned Arrival Groups — you pick a staggered window in the Princess app about thirty days out, and arriving early only buys you the right to drop bags and come back. One thing worth knowing before you walk into the terminal: once you have checked in you cannot go back ashore, so do any last errand first.",
    },
    advisory:
      "The easiest morning of the whole trip, by design. The brief sent you to Enoshima — two and a half hours in a taxi, seven hundred-odd steps, an escalator that only runs upward, and a boat back that does not sail until eleven. It has been cut. What replaces it is eight minutes' walk away, opens at nine, and is a temple to the goddess who calms the sea. Longest drive today: seven minutes, at half past ten, to the pier.",
    legs: [
      {
        mode: "walk",
        from: "The room",
        to: "1F bell desk — check out, bags stored",
        means:
          "Check out and hand both cases to the bell desk. You carry nothing at all this morning, and you do not come back for them until half past ten.",
        duration: "15 min",
        minutes: 15,
        depart: "08:00",
      },
      {
        mode: "walk",
        from: "Hyatt Regency Yokohama",
        to: "Yokohama Masōbyō — 横濱媽祖廟, Yamashita-chō 136",
        arrivesAt: "yokohama-masobyo",
        means:
          "South through Chinatown's back streets, still shaded and still cool at this hour. No car, no driver, no meter — the whole morning happens inside a ten-minute walking radius of the hotel door.",
        duration: "9 min",
        minutes: 9,
        distance: "800 m",
        depart: "08:40",
        note:
          "Mazu is the Chinese goddess who calms the sea and brings sailors home — Watatsumi's opposite number, and the one who came to this harbour with the ships. The temple was consecrated in 2006 from the Grand Mazu Temple in Tainan. Dragons run the length of the gate, along the roof ridge and around the balustrade.",
      },
      {
        mode: "stay",
        from: "Yokohama Masōbyō",
        to: "Incense, dragons, and the Wednesday tai chi",
        means:
          "Opens 09:00, grounds free. Buy the five-stick incense set at the desk (¥500) and walk the five numbered censers in order. Then the courtyard: a free tai chi circle meets there Wednesdays and Saturdays 09:00–10:00, reception from 08:45, no booking, and visitors who simply turn up are welcome. Join it or sit and watch it.",
        duration: "1 h 10 min",
        minutes: 70,
        depart: "09:00",
        arrive: "10:10",
        note:
          "21 July 2027 is a Wednesday, which is why this works. The circle pauses through August; July is in season. Worth telephoning ahead to confirm it is still running.",
        caution:
          "The courtyard is at street level and everything worth seeing — the gate, the roof, the censers — works from it. What could not be confirmed is the step situation at the main hall door itself: these are raised-platform Chinese temples and usually have a raised sill. Assume a step or two there, and do not plan on getting inside.",
      },
      {
        mode: "walk",
        from: "Yokohama Masōbyō",
        to: "Hyatt Regency Yokohama, to collect the luggage",
        means: "Back the way you came, uphill in temperature only.",
        duration: "9 min",
        minutes: 9,
        distance: "800 m",
        depart: "10:10",
        note:
          "Kanteibyō is two minutes further on and has the better dragon carvings — cloud-dragon stone, dragon pillars, Taiwanese roof tiles. You saw it lit up last night, so it is only worth doubling back for if you want it in daylight.",
      },
      {
        mode: "taxi",
        from: "Hyatt Regency Yokohama",
        to: "Sankeien Garden, Honmoku — and back",
        means:
          "The one drive worth considering instead: a 3.8 km run out to Sankeien, in at 09:00 for the lotus, then a flat loop of the outer garden only.",
        duration: "13–18 min each way",
        minutes: 35,
        distance: "3.8 km",
        aside: "instead",
        note:
          "Late July is peak lotus, the pond is near the main gate in the flat part of the garden, and the flowers are at their best before nine. ¥900 each. Taxis reach the main gate.",
        caution:
          "Three things against it. The surface is unpaved gravel and the garden's own guidance says wheelchair users struggle on it; the inner garden and the pagoda hill are stone stairs and have to be skipped entirely; and it has no dragon and no sea connection at all. It is a beautiful garden that costs you forty minutes of driving and delivers none of the thread.",
      },
      {
        mode: "taxi",
        from: "Hyatt Regency Yokohama",
        to: "Ōsanbashi terminal, 2F set-down",
        means: "Private taxi with the luggage along the Yamashita Park frontage and Kaigan-dōri, then up the vehicle ramp.",
        duration: "7 min",
        minutes: 7,
        distance: "1.3 km",
        depart: "10:30",
        arrive: "10:37",
        arrivesAt: "osanbashi-pier",
        caution: "The brief puts the hotel 0.5 km from the pier. Hyatt's own page says 0.75 km.",
      },
      {
        mode: "walk",
        from: "2F set-down",
        to: "CIQ Plaza and the Princess desks",
        means: "Porters take the cases at the car. You walk the same level to the departure lobby.",
        duration: "5 min",
        minutes: 5,
        distance: "200 m",
        note:
          "Taxi rank, ticket counter, immigration lobby and CIQ Plaza are all on 2F — there is no level change here at all, and the terminal is lifts and ramps throughout. Only the car park is on 1F.",
      },
      {
        mode: "walk",
        from: "Check-in",
        to: "Balcony stateroom, Diamond Princess",
        means: "Security, CIQ, boarding gate, gangway, then the ship's own corridors and lifts.",
        duration: "20 min",
        minutes: 20,
        distance: "500 m",
        arrive: "about 11:15",
        note:
          "Ōsanbashi is a long finger pier and the ship is 290 metres, so the walk is real before you even join a queue. You are aboard by about a quarter past eleven — nearly three hours before check-in closes, with lunch and the sail-away still ahead of you.",
      },
      {
        mode: "ship",
        from: "Ōsanbashi Pier, Yokohama",
        to: "Under way",
        means: "Diamond Princess, seven nights, round trip.",
        duration: "—",
        minutes: 0,
        depart: "15:00",
        note: "All-aboard runs 30 to 90 minutes before she sails.",
      },
    ],
  },

  /* ------------------------------------------------------- day 4 — 22 July */
  {
    chapter: "day-4",
    portCall: {
      port: "Toba — at anchor, ashore by tender",
      ashore: "07:00",
      beBackBy: "14:30",
      allAboard: "15:30",
      lastTender: "15:30",
      sails: "16:00",
      note:
        "The deadline here is not \"be on the ship\" but \"be on the last boat leaving the pier\", and that queue is at its worst on the final runs. The day is now built so it never matters: everything happens on the water or inside the aquarium, you are back at the Marine Terminal by one, and you take the 14:30 tender rather than the last one.",
    },
    advisory:
      "Rebuilt around the heat and the tender. Futami is a bare seafront promenade with no shade and no benches, and it is a taxi each way — so it becomes the swap rather than the plan. What replaces it needs no car at all: a sightseeing boat named 龍宮城, built as the Dragon Palace itself, leaving from the same terminal your tender lands at, and an air-conditioned aquarium it drops you beside. About 800 metres on foot all day.",
    legs: [
      {
        mode: "walk",
        from: "Stateroom",
        to: "Tender platform, Deck 4",
        means: "Corridor and lift down to the shell door. Let the tour groups clear first — there is no hurry today at all.",
        duration: "10 min",
        minutes: 10,
        distance: "250 m",
        depart: "07:45",
        note:
          "Each of you collects your own numbered ticket if you go in the first wave; one person cannot collect both. Go after the rush and tickets stop being needed entirely.",
      },
      {
        mode: "tender",
        from: "At anchor, Toba Bay",
        to: "Toba Marine Terminal pontoon",
        means: "The ship's own tender. No quay at Toba takes a 290-metre ship, so this is the only way in.",
        duration: "12 min",
        minutes: 12,
        distance: "2 km",
        arrive: "08:10",
      },
      {
        mode: "stay",
        from: "Toba Marine Terminal",
        to: "The 2F lounge, and the cruise ticket counter",
        means:
          "Nothing in Toba opens before 09:30, so the first forty minutes are indoors on purpose. The 2F exchange lounge has bay windows over the bay, coffee and Ise udon. Buy the bay-cruise tickets at the 1F counter, ¥2,400 each.",
        duration: "40 min",
        minutes: 40,
        depart: "08:10",
        arrive: "08:50",
        caution:
          "Use the terminal's accessible toilet before you board — there is no toilet at all on the boat. And ask the counter which vessel is on your sailing: if it is the little Mitsushima, wait for the next one. It has a 66 cm door and internal stairs.",
      },
      {
        mode: "walk",
        from: "Terminal lobby",
        to: "Pier 1 — 1番のりば",
        means: "Through to the boarding pontoon. All of it indoors or under the pier roof.",
        duration: "10 min",
        minutes: 10,
        distance: "100–150 m",
        depart: "08:50",
        note:
          "This is the farthest pier in the complex rather than a door off the lobby, and the barrier-free centre tells visitors to allow extra time for it. Ten minutes at your own pace, not three.",
      },
      {
        mode: "boat",
        from: "Toba Marine Terminal",
        to: "Pearl Island & Aquarium pier, aboard the Ryūgū-jō",
        means:
          "鳥羽湾めぐり遊覧船「龍宮城」 — a 360-passenger sightseeing boat built as the undersea Dragon Palace itself, with Urashima Tarō and Princess Otohime standing on the superstructure. Sit at the REAR of the 1F cabin.",
        duration: "40 min",
        minutes: 40,
        depart: "09:00",
        arrive: "09:40",
        note:
          "This is the whole voyage's theme, afloat and seated: not a shrine to the dragon king but his palace, with the story's two characters on the roof. The castle is on the outside, so you get all of it from your seat and from the pier — the 2F Otohime throne room and the 3F deck are stairs only and cost you nothing to skip. The boat calls at Dolphin Island on the way; stay aboard.",
        caution:
          "A covered ramp down to a floating pontoon — the gradient changes with the tide — then one step-over threshold at the door, with staff on hand. The front of the 1F cabin has two low steps; only the rear is genuinely step-free.",
      },
      {
        mode: "stay",
        from: "Toba Aquarium",
        to: "The mermaid, and the Dragon Palace's messenger",
        means:
          "鳥羽水族館 — indoor, air-conditioned, and one of the largest in Japan. ¥2,800 each. Use the barrier-free entrance beside the ticket window on the highway side rather than the 2F stair-and-escalator front door.",
        duration: "2 h 30 min",
        minutes: 150,
        depart: "09:45",
        arrive: "12:15",
        note:
          "Opens 09:30, so this is a clean arrival. Sixteen wheelchairs and three electric carts are lent free at the door, no reservation and nobody thinks anything of it. There is deliberately no fixed route, so take the short version: H zone for Serena the dugong — the animal Japan credits as the origin of the mermaid — then marine mammals, then the seated indoor sea-lion show, then the Ancient Sea. Skip Jungle World and Japanese Rivers. Lunch inside around 11:30, before the crowd. And look for the ryūgū-no-tsukai if it is in: the oarfish, whose name means Messenger of the Dragon Palace.",
        caution:
          "Ramps run throughout but the aquarium's own page is honest that a few spots still need stairs and a few tanks cannot be approached. That is normal here — turn round and go another way.",
      },
      {
        mode: "boat",
        from: "Pearl Island & Aquarium pier",
        to: "Toba Marine Terminal",
        means: "The same loop in reverse, seated and roofed.",
        duration: "15 min",
        minutes: 15,
        depart: "12:45",
        caution:
          "Do not walk this. The terminal is about 1.2 km away, 17–20 minutes on unshaded Route 42 roadside, which is exactly the kind of leg this whole day was rebuilt to remove. If the boat does not suit, a taxi is four minutes.",
      },
      {
        mode: "stay",
        from: "Toba Marine Terminal",
        to: "Waiting comfortably, ninety minutes early",
        means:
          "The 2F lounge again, or the roofed benches at Kamome Hiroba just outside for air on your faces. Souvenirs at Toba Ichibangai are a four-minute taxi, not the walk the guidebooks claim.",
        duration: "1 h 10 min",
        minutes: 70,
        depart: "13:00",
        arrive: "14:10",
      },
      {
        mode: "walk",
        from: "Terminal",
        to: "Tender pontoon",
        means: "Cruise card scanned and bags checked by ship's security on the quay.",
        duration: "6 min",
        minutes: 6,
        distance: "200 m",
        depart: "14:15",
      },
      {
        mode: "tender",
        from: "Toba Marine Terminal",
        to: "Diamond Princess at anchor",
        means: "Return tender. No ticket needed coming back, but the queue builds through the last two hours.",
        duration: "30 min including the queue",
        minutes: 30,
        distance: "2 km",
        depart: "14:30",
        caution:
          "Toba's anchorage is exposed and tendering gets suspended in wind or swell — the failure mode here is weather, and it gives no warning. Take the 14:30 boat rather than the 15:30. If it is blowing, go earlier still.",
      },
      {
        mode: "walk",
        from: "Deck 4",
        to: "Stateroom",
        means: "Shell door, lift lobby, corridor.",
        duration: "8 min",
        minutes: 8,
        distance: "250 m",
        note: "About 800 metres on foot across the entire day, flat, and almost all of it indoors or under cover.",
      },
      {
        mode: "taxi",
        from: "Toba Marine Terminal",
        to: "Futami Okitama Shrine and the wedded rocks — the swap",
        means:
          "If you would rather have the shrine than the boat: a taxi from the terminal rank at 08:15, arriving about 08:30. Ask for 二見興玉神社 表参道入口 — the WEST entrance torii, not the east.",
        duration: "10 min each way",
        minutes: 20,
        distance: "7.5 km",
        aside: "instead",
        note:
          "The shrine's own access page gives 7.5 km, about ten minutes, ¥2,500–3,000 — comfortably inside the rule, and the sandō is deliberately thin gravel kept shallow for wheelchairs. Morning is the answer if you go: it is a bare seafront promenade with no benches and no shade at all, and by eleven it is punishing.",
      },
    ],
  },

  /* ------------------------------------------------------- day 5 — 23 July */
  {
    chapter: "day-5",
    portCall: {
      port: "Kōchi Shinkō — alongside, Misato No. 7 wharf",
      ashore: "09:30",
      beBackBy: "15:30",
      allAboard: "16:30",
      sails: "17:00",
      note:
        "The latest deadline of the week, and the most slack: Katsurahama uses under two hours of an eight-hour call. One thing to watch for in the Patter — because the first port after this is Korea, Japanese exit immigration happens before Seogwipo, and Princess's own wording allows it to be run at the previous port's terminal rather than on board. If Kōchi is named as the exit-inspection point, that inspection time becomes your real deadline, not 16:30, and you cannot go ashore again once you have cleared it.",
    },
    advisory:
      "Nothing ashore before about 09:30 — she is not alongside until nine and the gangway takes another half hour. After that the day is yours: a museum on the castle hill of the warlord who founded the dragon shrine, then the beach itself, the climb to the shrine on the cape, and the viewpoint that holds both capes in one frame. One taxi, held all day.",
    legs: [
      {
        mode: "stay",
        from: "Kōchi Shinkō",
        to: "Alongside, gangway rigged",
        means: "Berthing, lines ashore and port formalities at Misato No. 7 wharf. Alongside — no tender here.",
        duration: "30 min",
        minutes: 30,
        depart: "09:00",
        arrive: "09:30",
      },
      {
        mode: "walk",
        from: "Stateroom",
        to: "Gangway and across to the taxi",
        means: "Corridor and lift to the disembarkation deck, then across the quay apron to the terminal.",
        duration: "15 min",
        minutes: 15,
        distance: "about 250 m",
        note: "An unshaded working apron. It is the only open-air walking of the day that is not optional.",
      },
      {
        mode: "taxi",
        from: "Kōchi Shinkō cruise terminal",
        to: "Sakamoto Ryōma Memorial Museum, Urado Shiroyama",
        means:
          "Pre-booked taxi west over the Urado Bridge. Show the driver 高知県立坂本龍馬記念館（高知市浦戸城山830）and add 記念館の無料駐車場の中まで入ってください — please drive right into the museum's own free car park. Ask him back for 11:20 and take his card.",
        duration: "12 min",
        minutes: 12,
        distance: "5 km",
        depart: "09:35",
        arrive: "09:50",
        note:
          "There is no bus and no railway anywhere near this terminal, so the car has to be contracted to wait and return. The city centre is about 25 minutes away and is out of range under the new rule — everything worth having is on this headland.",
      },
      {
        mode: "stay",
        from: "Sakamoto Ryōma Memorial Museum",
        to: "The sea-view gallery, on the castle hill",
        means:
          "The taxi stops at the building. No step at the entrance, a handrail ramp, four wheelchairs lent free, and air conditioning throughout. Lift from reception to 2F, across the covered walkway into the Main Building, and out into the 海の見える・ぎゃらりい — a seated, step-free gallery looking clean over the Pacific.",
        duration: "1 h 30 min",
        minutes: 90,
        depart: "09:50",
        arrive: "11:20",
        note:
          "The museum stands on Urado Shiroyama, Chōsokabe Motochika's castle hill — and Motochika is the man credited with founding the dragon-king shrine on the cape below, as the guardian of his castle's unlucky quarter. Ryōma's own name is written 坂本龍馬: dragon horse.",
        caution:
          "Do not try for the roof. The museum's own floor plan marks the way up as a spiral stair from both 2F and the mezzanine, with no lift drawn to it. You lose nothing — the 2F gallery is the sea view.",
      },
      {
        mode: "taxi",
        from: "The museum",
        to: "Katsurahama Park car park",
        means: "The same held car, 660 m down the hill.",
        duration: "3 min",
        minutes: 3,
        distance: "660 m",
        depart: "11:20",
      },
      {
        mode: "stay",
        from: "Katsurahama Sea Terrace",
        to: "Lunch indoors, and the free museum",
        means:
          "The commercial terrace beside the car park, rebuilt and reopened in 2023. Sit-down lunch out of the sun at Kōchi Bishokukan Jin or Umisachi, then the free Katsurahama Museum — indoor, air-conditioned — and an information desk that lends wheelchairs and has charging and wifi.",
        duration: "2 h",
        minutes: 120,
        depart: "11:30",
        arrive: "13:30",
      },
      {
        mode: "walk",
        from: "Katsurahama Sea Terrace",
        to: "The Ryōma statue viewpoint — by the ramp, not the steps",
        means:
          "This is the find. Beside the wide staircase up to the viewpoint there is a wheelchair ramp, and Kōchi City's own wheelchair-and-pushchair route map runs this way: 「この階段左には車椅子用のスロープもあり、１段も階段を使う事無く龍馬像前に到着できます」 — a ramp to the left of the steps reaches the front of the Ryōma statue without using a single stair.",
        duration: "15 min there and back",
        minutes: 15,
        distance: "200–250 m each way, made surface",
        note:
          "From up there you get the whole crescent — strung between Ryūzu-misaki, Dragon Head Cape, where you are standing, and Ryūō-misaki, Dragon King Cape, at the far end with its red torii and the vermilion Ryūō-gū on the rock. Dragon's head looking at dragon king, the beach between them.",
      },
      {
        mode: "steps",
        from: "The south-west end of the beach",
        to: "Ryūō-gū, the dragon king's shrine on the cape",
        means:
          "Over the little Ryūgū bridge onto the rock, then a steep stone stairway rebuilt with heavy retaining walls after the 2018 typhoon. Accounts differ on the length — one visitor counts about thirty steps, another says they keep going — but either way it is a few minutes.",
        duration: "15 min up, at the top, and down",
        minutes: 15,
        distance: "80 m of climb",
        arrivesAt: "ryuotsu-shrine",
        note:
          "Ōwatatsumi-no-kami is enshrined up here: safety at sea, full nets, rain when the fields want it. The hall is tiny and the view is enormous — the whole crescent behind you and the Pacific working the cliff directly underneath. There is a further, steeper flight above it to the lookout with the compass rose, which is the only place you get the beach and the ocean in one frame.",
      },
      {
        mode: "steps",
        from: "Katsurahama Sea Terrace",
        to: "Down onto the sand",
        means:
          "Down through the shops and the rest house to the beach itself — about 200 metres. The direct path has both slopes and steps; there is a ramped walkway alongside it, so ask for the スロープ and take that.",
        duration: "20 min there, on the sand, and back",
        minutes: 20,
        distance: "200 m each way",
        arrivesAt: "katsurahama-beach",
        note:
          "This is the beach, and it is worth the twenty minutes: crouch down and the shingle is not grey but green, red, white, black and grey — five colours, ground off Mount Ishizuchi and sorted by the surf. Japan keeps this crescent for looking at the moon. With the climb to the cliff shrine now cut, you have the legs for it.",
        caution:
          "Do not swim here — the undertow is lethal and it is signposted, which is why the swim is on Jeju instead. Go down before lunch while it is still under thirty degrees; there is no shade at all once you are on the sand.",
      },
      {
        mode: "taxi",
        from: "Katsurahama",
        to: "Hirome Market, and a Tosa sake tasting",
        means:
          "ひろめ市場, 2-3-1 Obiyamachi — sixty stalls under one roof, open from 10:00. Tosa Kura Shachū inside does a pick-four-from-six tasting of Kōchi sake, alongside katsuo tataki seared over straw.",
        duration: "25 min each way",
        minutes: 50,
        aside: "optional",
        note:
          "If you would rather drink something local than look at another view, this is the better answer than whisky on a port day — Kōchi is sake country and Tosa drinking is a genuine local institution. It is right at the edge of the drive rule at 25 minutes, and the port has no public transport at all, so the car has to be held. Doing this as well as Katsurahama makes for about 75 minutes in the taxi across the day; doing it instead of Katsurahama is an easy afternoon.",
      },
      {
        mode: "taxi",
        from: "Katsurahama",
        to: "Kōchi Shinkō cruise terminal",
        means: "The same held car back over the Urado Bridge.",
        duration: "12 min",
        minutes: 12,
        distance: "5 km",
        depart: "13:30",
      },
      {
        mode: "walk",
        from: "Terminal",
        to: "Gangway",
        means: "Back across the apron and through the single re-boarding screening line.",
        duration: "10 min",
        minutes: 10,
        distance: "about 250 m",
        note: "Aboard by about 14:00, an hour and a half inside the deadline.",
      },
    ],
  },

  /* ------------------------------------------------------- day 6 — 24 July */
  {
    chapter: "day-6",
    advisory:
      "No gangway today and nothing to be late for — she never stops. The only time that matters is the transit window itself, and that one is set by the tide rather than by a timetable.",
    legs: [
      {
        mode: "walk",
        from: "Stateroom",
        to: "Your own balcony",
        means: "The verandah door.",
        duration: "under 1 min",
        minutes: 1,
        distance: "4 m",
        arrivesAt: "kanmon-straits",
        note:
          "Westbound through the strait, Shimonoseki and Honshū are to starboard and Moji and Kyūshū to port. Worth knowing which side of the ship you booked.",
      },
      {
        mode: "walk",
        from: "Stateroom",
        to: "Forward open deck",
        means: "Corridor and lift to Deck 15–16 forward, or the Promenade on Deck 7.",
        duration: "5–8 min each way",
        minutes: 7,
        distance: "200 m",
        caution:
          "The brief promises the whole thing \"viewed entirely from the private Balcony Stateroom\". A fixed balcony sees one bank. Both shores, and the bridge tower going over, mean leaving the cabin.",
      },
      {
        mode: "boat",
        from: "Pilot boarding ground, east approach",
        to: "The ship's bridge",
        means: "Kanmon Kaikyō pilot cutter, coming alongside while the ship slows without stopping.",
        duration: "about 10 min",
        minutes: 10,
        note: "Pilotage is compulsory in this channel at 10,000 gross tons and over. She is 115,875.",
      },
      {
        mode: "ship",
        from: "East entrance, off Tanoura",
        to: "West entrance, off Mutsure-jima",
        means: "Under pilotage and Kanmon MARTIS traffic control, through a channel that carries up to a thousand vessels a day.",
        duration: "2 h scheduled block, about 1 h 15 min of it in the channel",
        minutes: 120,
        distance: "28 km — 15 nautical miles",
        depart: "09:00",
        arrive: "11:00",
        caution:
          "The 09:00–11:00 window comes from cruise-retailer listings for this sailing, not from Princess. The hour is locked to the tide and differs on every sailing — other Diamond Princess dates show an 11:00–13:00 block. Take the Patter as the authority and set no alarm by this page.",
      },
      {
        mode: "ship",
        from: "Dan-no-ura",
        to: "Mekari, under the Kanmon Bridge",
        means: "The narrows — Hayatomo no Seto.",
        duration: "about 5 min",
        minutes: 5,
        distance: "2 km",
        note:
          "About 650 metres shore to shore. The bridge keeps 61 metres of clearance against roughly 54 of air draft. The current runs to ten knots and turns about every six hours.",
      },
      {
        mode: "boat",
        from: "The ship's bridge",
        to: "Pilot cutter, west of the strait",
        means: "The pilot goes off the same way he came on.",
        duration: "about 10 min",
        minutes: 10,
        note: "This is the real end of the scenic window — after it she works up for the overnight run to Jeju.",
      },
    ],
  },

  /* ------------------------------------------------------- day 7 — 25 July */
  {
    chapter: "day-7",
    portCall: {
      port: "Seogwipo Gangjeong, Jeju — alongside",
      ashore: "07:00",
      beBackBy: "14:30",
      allAboard: "15:30",
      sails: "16:00",
      note:
        "An immigration day, so plan it as one continuous trip ashore: where entry formalities are run, Princess suspends the usual right to come back for lunch and go out again. This is also the only day in a foreign country, which means exit formalities and a security screen on the way back in, and taxis that queue outside the port gate rather than at the terminal door. Dropping the third falls — it is marked optional below — puts you back aboard around midday with hours to spare. Note too that the shore-hours figure for this call comes from cruise-retailer databases rather than from Princess directly; reconfirm it in the app.",
    },
    advisory:
      "The swim day, and the one foreign port. Two things to know rather than worry about: the walk from the ship to Korean immigration is about 1,200 metres of corridor and you do it both ways, and no road reaches the Jungmun sand — it is 700 metres of path and 35 vertical metres down, ten minutes going and fifteen coming back. Neither is a problem; both are worth building the clock around.",
    legs: [
      {
        mode: "walk",
        from: "Stateroom",
        to: "Out through the port gate",
        means:
          "Gangway, then roughly 1,200 metres of covered corridor on a moving walkway to the terminal, then Korean immigration — quarantine, passport, customs, agricultural quarantine — and out to the gate.",
        duration: "1 h",
        minutes: 60,
        distance: "about 1.2 km each way",
        depart: "09:00",
        arrive: "10:00",
        caution:
          "This is the fact that reshapes the whole day, and no brief mentions it: the walk from the ship to immigration is about 1,200 metres, the walkway runs intermittently to manage crowding at the exits, and you do it twice. That is roughly 2.4 km of corridor before a single metre of sightseeing. Do not decline any shuttle, paid or free. Sit down at the gate before you do anything else.",
        note:
          "Korea is a separate entry: fingerprints and a facial scan, at a staffed counter. Gangjeong's automated gates will not help — Canada is not on the eligible list. Taxis rank outside the gate beside the Jeju Global Taxi desk, and Kakao T takes international cards.",
      },
      {
        mode: "taxi",
        from: "Gangjeong cruise port gate",
        to: "Jungmun Saekdal Beach car park",
        means:
          "One pre-booked car or Kakao T, held for the whole call — there is no rank at the beach and none at the falls, so the car that brings you is the car that takes you back.",
        duration: "17 min",
        minutes: 17,
        distance: "10.2 km",
        depart: "09:50",
        arrive: "10:10",
        note: "Roughly ₩15,000–20,000. Give the driver 중문색달해수욕장.",
      },
      {
        mode: "walk",
        from: "The car park",
        to: "Down to the sand, and a swim",
        means:
          "A ramp rather than steps, at about one in twelve — 250 to 700 metres depending which car park the driver stops at, dropping 30 to 50 metres to the water. Ask for 중문색달해수욕장 주차장, and if he will take you down to the lowest lot at 33.24519, 126.40504 you halve the climb back.",
        duration: "6–10 min down, 10–15 back up",
        minutes: 10,
        distance: "250–700 m, dropping 30–50 m",
        arrivesAt: "jungmun-beach",
        note:
          "Free to enter. Changing rooms and toilets on site; showers are ₩2,000 and cold only, so bring a towel and something dry to put on. No lockers are confirmed anywhere — leave anything you would mind losing on the ship. Parasols ₩20,000 if you want shade. Black, grey, red and white volcanic sand under basalt cliffs, a sea cave fifteen metres tall at the east end, and haenyeo working the water offshore.",
        caution:
          "Three things that matter here. The beach only operates 10:00–19:00 and there are no lifeguards outside that, so do not arrive early. It is split in half during the season — a swimming zone and a surfing zone — and you stay in the swimming half. And Jungmun is one of about ten Korean beaches with real-time rip-current monitoring: the rips are strong, entry is banned outright in the marked zone near the entrance, and the standing advice is to stay where you can touch the bottom. Jeju also raised its jellyfish alert in 2026 and someone was stung here that summer — check the boards and ask the lifeguards on the day.",
      },
      {
        mode: "taxi",
        from: "Jungmun Saekdal Beach",
        to: "Yeomiji Botanical Garden, main gate",
        means:
          "The waiting car, a couple of minutes up the hill inside the same resort complex. Show the driver 여미지식물원 정문 — the main gate.",
        duration: "6 min",
        minutes: 6,
        distance: "1.5 km",
        depart: "12:30",
        arrive: "12:36",
        note: "Somewhere cool and indoors to land after a swim, with a lift up the dome for the view.",
      },
      {
        mode: "stay",
        from: "Yeomiji Botanical Garden",
        to: "Under glass, out of the heat",
        arrivesAt: "yeomiji-garden",
        means:
          "A domed glasshouse: ramped main entrance, a lift to the 38-metre dome, three accessible toilets and seating throughout. Borrow a free wheelchair at the gate even if you think you will not need one — it costs nothing and it is the single best mitigation in this port.",
        duration: "50 min",
        minutes: 50,
        depart: "12:36",
        arrive: "13:26",
        caution:
          "Stay inside. The indoor houses run at two to six degrees of slope, with a couple of short pinches. The outdoor world gardens do not: the Japanese garden is twenty-three degrees at 73 cm wide, the Korean garden is stairs plus ten degrees, the Italian garden is stairs. All of that is from the surveyed accessibility record.",
      },
      {
        mode: "walk",
        from: "Yeomiji",
        to: "Cheonjeyeon west gate — ask first",
        means:
          "Three minutes' walk to the Yeomiji-side ticket booth, ₩2,500 each. Cross Seonimgyo, look down on the second falls, and go as far into the gorge as you feel like.",
        duration: "30 min",
        minutes: 30,
        arrivesAt: "cheonjeyeon-waterfall",
        note:
          "Seonimgyo is the arch with the seven nymphs carved along its flank — the reason this waterfall is on the itinerary at all. Seeing it from the top is the whole prize; the gorge below is not.",
        caution:
          "The full circuit is about 1.5 km and roughly 300 steps, and in thirty degrees that is a real walk rather than a stroll — but nothing about it is beyond you. The first falls only runs after heavy rain; the second is the one that flows year round and is worth the descent.",
      },
      {
        mode: "stay",
        from: "A Jungmun beach cafe",
        to: "Lunch, out of the sun",
        means: "Three to five minutes away, step-free, seated, air-conditioned, sea views.",
        duration: "45 min",
        minutes: 45,
        depart: "11:40",
        arrive: "12:25",
        note: "Lunch and a cold drink between the swim and the garden.",
      },
      {
        mode: "taxi",
        from: "Jungmun",
        to: "Gangjeong cruise port gate",
        means: "Kakao T back.",
        duration: "15 min",
        minutes: 15,
        distance: "10.8 km",
        depart: "13:30",
        caution: "Do not gamble the return on the free shuttle.",
      },
      {
        mode: "walk",
        from: "Port gate",
        to: "Stateroom",
        means: "Korean exit formalities, security screening, then the 1,200-metre corridor again.",
        duration: "45 min",
        minutes: 45,
        distance: "about 1.2 km",
        depart: "13:50",
        note: "Aboard about 14:15 — which is why the day holds only one stop.",
      },
      {
        mode: "taxi",
        from: "Gangjeong cruise port gate",
        to: "Seogwipo Maeil Olle Market — the one-taxi substitute",
        means:
          "Take this without regret if immigration runs long, if it rains, or if either of you is already tired at the gate. Ask to be dropped at the 주출입구, the street-side main entrance, not the public car park.",
        duration: "18 min",
        minutes: 36,
        distance: "11.2 km",
        aside: "instead",
        note:
          "620 metres of arcade under a retractable roof, no step at the entrances, three accessible toilets, food, cold drinks and seating in the stalls. You turn round whenever you like, which is the point.",
      },
    ],
  },

  /* ------------------------------------------------------- day 8 — 26 July */
  {
    chapter: "day-8",
    portCall: {
      port: "Nagasaki Matsugae — alongside",
      ashore: "07:45",
      beBackBy: "14:30",
      allAboard: "15:30",
      sails: "16:00",
      note:
        "Your Japanese landing permission was spent when the ship left for Korea, so the whole ship is re-admitted to Japan here, face to face, with a fresh seal, fingerprints and photo. Carry your actual passport — a photocopy will not do, and Japanese law requires you to have the real one on you ashore. Like Seogwipo, this is an immigration day, so treat it as one trip ashore rather than two.",
    },
    advisory:
      "Three dragons before lunch. The Dragon Palace Gate and the two National Treasures up the stair behind it; the Kunchi dragon-dance pair, which live indoors at Glover Garden through the summer rather than at Suwa Shrine; and Chinatown's Seiryū gate at pavement level. Glover Garden's hill is handled by a free public lift the brief has never heard of — and there is one trap it also misses: Gate 1 has no taxi access, so the way out is 200–300 metres downhill on cobbles to a road a car can use.",
    legs: [
      {
        mode: "stay",
        from: "Matsugae quay",
        to: "Cleared into Japan",
        means: "Immigration and customs taken in the terminal, because the previous port was foreign.",
        duration: "20–50 min",
        minutes: 35,
        depart: "07:00",
        arrive: "about 07:45",
        note:
          "The whole ship is cleared individually before general walk-off. Nobody is ashore at 07:00. Worth knowing and never advertised: the municipal car-park building beside the terminal lends wheelchairs and pushchairs free, and has a wheelchair-rated lift and an accessible toilet. If either of you would rather be pushed today than walk, collect one before you get in a taxi.",
      },
      {
        mode: "walk",
        from: "Stateroom",
        to: "Terminal street exit",
        means: "Corridor, lift down seven decks, gangway onto the apron, then through the terminal.",
        duration: "12–18 min",
        minutes: 15,
        distance: "about 400 m",
        caution:
          "A Diamond Princess call empties well over two thousand people onto one pier road between 07:45 and 09:00. Have the shore excursions desk book a car for 08:10, or sit in the terminal's air conditioning rather than stand in the queue outside.",
      },
      {
        mode: "taxi",
        from: "Matsugae terminal",
        to: "Sōfuku-ji, the Ryūgū-mon",
        means:
          "City taxi, 2.6 km. Show the driver: 崇福寺、鍛冶屋町7-5。三門前の右手の拝観者用無料駐車場までお願いします。少し待っていてください — into the free visitor car park to the right of the gate, and please wait.",
        duration: "10–15 min",
        minutes: 13,
        distance: "2.6 km",
        depart: "08:10",
        arrive: "08:25",
        note:
          "Allow the upper end: this route crosses the tram tracks twice and threads the Shianbashi one-way system. Kajiya-machi is a residential temple street with no rank, so have him wait on the meter.",
      },
      {
        mode: "walk",
        from: "The car park",
        to: "The Ryūgū-mon, from outside",
        means:
          "¥300 each at the window by the car park. Up the flight to the Ryūgū-mon itself, then the long stone stair behind it — commonly given as forty to fifty steps — to the Daiippō-mon and the Daiyūhōden.",
        duration: "45 min",
        minutes: 45,
        distance: "120 m, about 15 m of rise",
        arrivesAt: "sofukuji-ryugumon",
        note:
          "Those two upper halls are National Treasures: the Daiippō-mon was cut and fitted in China in the 1690s, shipped over in pieces by junk and raised here in 1696, and its underside is a honeycomb of brackets in vermilion and gold. The Daiyūhōden dates from 1646. Mazu keeps her own hall off to one side — the same sea goddess you met in Yokohama on embarkation morning.",
        caution:
          "There is no way past the gate except the stairs, and no handrail is confirmed. Worn stone, and 31 °C by mid-morning — which is exactly why this is the 08:25 stop rather than the noon one. If you would rather not climb, the gate itself is fully visible from the forecourt.",
      },
      {
        mode: "taxi",
        from: "Sōfuku-ji",
        to: "Glover Sky Road lower entrance, Ishibashi",
        means: "City taxi to the foot of the free public lift. Not to Gate 2 by road, which is twice as long over a winding hill.",
        duration: "8–11 min",
        minutes: 10,
        distance: "about 2 km",
        depart: "08:50",
      },
      {
        mode: "lift",
        from: "Ishibashi",
        to: "Glover Garden, Gate 2",
        means:
          "The Glover Sky Road — an inclined lift up the hillside then a vertical one, both free, both wheelchair-rated, 06:00 to 23:30. It is a public road that happens to be an elevator.",
        duration: "5 min",
        minutes: 5,
        distance: "62 m of rise, taken entirely by machine",
        depart: "09:05",
        arrivesAt: "glover-garden",
        note:
          "2階出口を進むとグラバー園第2ゲート入口は目の前です — step out of the upper exit and Gate 2 is directly in front of you. This is the thing that makes a hillside garden step-free, and no brief mentions it. ¥1,300 each; the discounted rate needs a Japanese disability certificate and will not take a foreign one.",
      },
      {
        mode: "walk",
        from: "Gate 2, the top of the garden",
        to: "The harbour terrace",
        means: "About fifty level metres to the viewpoint by the former Mitsubishi No. 2 Dock House, with your own ship directly below.",
        duration: "15 min",
        minutes: 15,
        distance: "about 50 m",
        note:
          "DECISION POINT, and make it here rather than earlier: if legs or heat are bad today, stop. Turn round, ride the lifts back down, taxi from Ishibashi. That is a complete visit for fifteen minutes of flat walking, and it includes the best view in Nagasaki.",
      },
      {
        mode: "walk",
        from: "The top of the garden",
        to: "Gate 1, by way of the Kunchi dragons",
        means:
          "Only if today is good. Take one of the free electric wheelchairs — they are lent at every gate precisely for these cobbles — and go down through the Ringer, Alt and Glover houses to the exit.",
        duration: "1 h 15 min",
        minutes: 75,
        distance: "500–700 m, dropping 34 m",
        aside: "optional",
        note:
          "It finishes indoors, air-conditioned and step-free, in the 長崎伝統芸能館 — which holds the 白龍 and the 青龍, the actual Kunchi dragon-dance dragons, included in your ticket. In July they live here rather than at Suwa Shrine, which is the reason not to drive across the city looking for them.",
        caution:
          "Downhill is not easy. Glover Garden's own words: 歩道の殆どが石畳で勾配も随所にあるため — mostly cobbles, on a gradient throughout, with assistance needed even descending. One of you steers the chair, one walks alongside.",
      },
      {
        mode: "walk",
        from: "Gate 1",
        to: "Ōura Tenshudō-shita, where taxis actually run",
        means: "Downhill on Glover-dōri, a cobbled shopping street with awning shade.",
        duration: "8 min",
        minutes: 8,
        distance: "200–300 m",
        caution:
          "Nobody tells you this and it is the day's real trap: Gate 1 is not a taxi rank. The city confirms set-down at Gate 2 only, the garden has no car park, and you come out at the top of a pedestrian slope. Book a car to meet you at Ōura Tenshudō-shita, or have a shop call one. And decline Ōura Church on the way past — the city is blunt that there is no way in other than a long staircase.",
      },
      {
        mode: "taxi",
        from: "Ōura Tenshudō-shita",
        to: "Shinchi Chinatown",
        means: "Six to eight minutes onto dead-flat reclaimed land.",
        duration: "8 min",
        minutes: 8,
        depart: "11:15",
        note:
          "Ten minutes standing under the Seiryū-mon on the east side — a dragon gate at pavement level, no steps and no ticket. Your third dragon of the morning, after the palace gate and the Kunchi pair.",
      },
      {
        mode: "stay",
        from: "Keikaen, Shinchi-machi",
        to: "Lunch, indoors, through the worst of the heat",
        means:
          "京華園 — the one Chinatown restaurant Nagasaki City's own barrier-free survey certifies: ramp, wheelchair-rated lift, barrier-free toilet, flat access, automatic doors. Lunch to 15:00, last entry 14:30.",
        duration: "1 h 15 min",
        minutes: 75,
        depart: "11:30",
        arrive: "12:45",
        note:
          "The shorter version of the whole day, if the morning went badly: skip Chinatown entirely and have champon at Shikairō, 200 flat metres from the gangway, where it was invented. Two lifts to the dining rooms. You will still have had the Dragon Palace Gate and the Kunchi dragons and climbed nothing.",
      },
      {
        mode: "taxi",
        from: "Chinatown",
        to: "Matsugae terminal",
        means: "Five to eight minutes back along the waterfront.",
        duration: "8 min",
        minutes: 8,
        depart: "13:00",
      },
      {
        mode: "walk",
        from: "Matsugae terminal",
        to: "Stateroom",
        means: "Terminal security and Medallion re-boarding, gangway, lift up seven decks.",
        duration: "12–18 min",
        minutes: 18,
        distance: "about 400 m",
        note: "Aboard by about 13:20, over an hour clear of the deadline.",
      },
    ],
  },

  /* ------------------------------------------------------- day 9 — 27 July */
  {
    chapter: "day-9",
    advisory:
      "No port, no gangway, no deadline. The only booking on the whole day is the bath, and that one you make on embarkation day rather than today.",
    legs: [
      {
        mode: "stay",
        from: "The Pacific",
        to: "Nowhere at all",
        means: "A sea day. Nothing to catch, nothing to be late for.",
        duration: "—",
        minutes: 0,
      },
      {
        mode: "walk",
        from: "Stateroom",
        to: "The Izumi bath, Deck 15",
        means: "Corridor, then the lift up three levels — there is no Deck 13 — and along Deck 15.",
        duration: "5–8 min",
        minutes: 7,
        distance: "about 170 m",
        arrivesAt: "izumi-bath",
        caution:
          "It is not covered by the Princess Premier package, whatever the brief says: about US$39 for a two-hour session or US$49 for a day pass. Premier covers drinks, wi-fi, gratuities, photos, specialty dining and fitness classes — not the spa.",
      },
      {
        mode: "walk",
        from: "The Izumi bath",
        to: "Stateroom",
        means: "The same three decks back down.",
        duration: "5–8 min",
        minutes: 7,
        distance: "about 170 m",
        note:
          "Capacity is capped near thirty across 818 m², so sea-day passes sell out — book on embarkation day. The two indoor halves are nude and gender-segregated and the sides swap daily; only the outdoor tub is mixed, and that one needs swimwear. You cannot share the main baths.",
      },
    ],
  },

  /* ------------------------------------------------------ day 10 — 28 July */
  {
    chapter: "day-10",
    advisory:
      "Berthing at 06:30 is not walking off at 06:30. Princess's own guidance is that disembarkation starts about two hours after arrival, once the shore authorities release the ship, and it goes by coloured luggage tag — while staterooms have to be empty by 08:00. It is also a turnaround: roughly 2,700 off and 2,700 on. The morning is tight rather than broken, but only if you walk to COCOMO instead of booking the taxi the brief books.",
    legs: [
      {
        mode: "ship",
        from: "Tokyo Bay",
        to: "Ōsanbashi Pier, alongside",
        means: "Diamond Princess, home after seven nights.",
        duration: "—",
        minutes: 0,
        arrive: "06:30",
      },
      {
        mode: "walk",
        from: "Cabin",
        to: "Gangway",
        means: "Corridor to the lift bank, down to the disembarkation deck, colour-group lounge, scan off.",
        duration: "15–25 min",
        minutes: 20,
        distance: "150–300 m plus several decks",
        note: "290 metres of ship over thirteen passenger decks, and on a turnaround morning the lifts are the bottleneck.",
      },
      {
        mode: "walk",
        from: "Gangway",
        to: "Vehicle apron, 1F",
        means: "Level into the 2F CIQ Plaza — immigration, baggage hall, customs — then lift or escalator down to the cars.",
        duration: "25–45 min door to car",
        minutes: 35,
        distance: "300–450 m and one level",
        caution: "The brief brackets 08:00 off the ship and 08:30 into the taxi. Thirty minutes is the best case, not the plan.",
      },
      {
        mode: "taxi",
        from: "Yokohama Ōsanbashi Pier",
        to: "Asakusa View Hotel, Nishi-Asakusa",
        means: "Pre-booked private sedan by the Bayshore Line, or K1 Yokohane and Route 1 through Haneda.",
        duration: "1 h 15 min — anywhere from 55 min to 1 h 35 min",
        minutes: 75,
        distance: "43.6 km",
        note: "About ¥20,000–25,000 on the meter plus toll, or ¥23,000–35,000 as a fixed private transfer.",
        caution: "The brief allows an hour. Verified free-flow alone is 47–49 minutes, and this is a Wednesday morning.",
      },
      {
        mode: "walk",
        from: "Porte-cochère, Kokusai-dōri",
        to: "1F bell desk",
        means: "Covered driveway into the lobby.",
        duration: "3 min",
        minutes: 3,
        distance: "30 m",
        arrivesAt: "asakusa-view-hotel",
        note: "Check-in is not until 15:00, but the bell desk takes the bags now and again after check-out tomorrow.",
      },
      {
        mode: "walk",
        from: "Asakusa View Hotel",
        to: "COCOMO, 1-29-8 Asakusa",
        means: "South-east through the Nishi-Asakusa grid, across Kokusai-dōri and along the western edge of the Sensō-ji precinct.",
        duration: "7 min",
        minutes: 7,
        distance: "508 m",
        arrivesAt: "cocomo-makeover",
        caution:
          "The brief says 0.2 km and books a five-minute taxi. It is 508 metres on foot and 1.17 km by road, because the one-way system sends the car the long way round. Walking is faster, cheaper and the thing that saves the 10:30 start.",
      },
      {
        mode: "steps",
        from: "Street",
        to: "COCOMO reception, 2F",
        means: "One floor up.",
        duration: "2 min",
        minutes: 2,
        note: "No lift is documented anywhere. Ask when you book.",
      },
      {
        mode: "steps",
        from: "Reception, 2F",
        to: "The Japanese-garden studio, 4F",
        means: "Two more floors to the full-scale set with the drum bridge and the tea room.",
        duration: "3 min",
        minutes: 3,
        note: "Four flights from the street in total, in full costume for the second half of it.",
      },
      {
        mode: "walk",
        from: "COCOMO",
        to: "Outdoor location shoot, if it is in your booking",
        means: "On foot in kimono and geta around the temple, the shrine and the Sumida riverside, then back to change.",
        duration: "20–40 min of walking across the session",
        minutes: 30,
        distance: "300–500 m each way",
        aside: "optional",
        note:
          "COCOMO advertises this but no public page says which plans include it. Confirm at booking — stone paving in geta is a different proposition from a studio session.",
      },
      {
        mode: "walk",
        from: "COCOMO",
        to: "Lunch by the Kaminarimon",
        means: "South-west through the Asakusa 1-chōme grid, straight to the gate.",
        duration: "3 min",
        minutes: 3,
        distance: "226 m",
        caution:
          "The brief sends you back to the hotel first — 508 metres in the wrong direction, to a room you cannot check into until 15:00 — and then on to a restaurant that was 226 metres from where you were standing. Go direct.",
      },
      {
        mode: "walk",
        from: "Kaminarimon",
        to: "Asakusa View Hotel, for the 15:00 check-in",
        means: "North-west back to Kokusai-dōri.",
        duration: "10 min",
        minutes: 10,
        distance: "752 m",
        note: "Start walking by 14:50.",
      },
      {
        mode: "walk",
        from: "Lobby",
        to: "The room",
        means: "Check in; the bell desk brings the stored luggage up.",
        duration: "8 min",
        minutes: 8,
      },
      {
        mode: "walk",
        from: "Asakusa View Hotel",
        to: "Sakaemon — 酒右衛門, the whisky tasting counter",
        means:
          "1-31-4 Asakusa, by the Kaminarimon. A Japanese-whisky specialist with a tasting counter: you pick bottles off the shelf, taste them at the bar, and buy what you liked. Open 11:00–19:00, no reservation, no cover charge, English website and a tax-free desk.",
        duration: "9 min",
        minutes: 9,
        distance: "650 m",
        depart: "16:00",
        note:
          "This is the answer to the whisky question, and it is a nine-minute walk. No distillery is within reach of anywhere this ship goes — Yamazaki, Hakushu and Chichibu are all two hours or more from every port, and Chichibu does not admit the public at all. What Sakaemon gives you instead is an actual flight, in daylight, with Yamazaki 18, Hibiki 21 and Hakushu 18 on the list. It also opens at 11:00 tomorrow, if the morning suits better than tonight.",
        caution:
          "Set expectations on price: Japanese whisky has been in short supply for a decade and Suntory raised prices again across 187 products in 2026. A 30 ml pour of something aged runs into thousands of yen and may simply be unavailable. The genuinely interesting drinking now is craft — Chichibu, Akkeshi, Kanosuke, Sakurao — and it is better value.",
      },
      {
        mode: "walk",
        from: "Sakaemon",
        to: "A bar for the evening",
        means:
          "Bar Flamingo, 2-1-11 Nishi-Asakusa, is the one to pick: 17:00–24:00, closed Sundays, ¥1,000 cover including a plate of fruit and cheese, and the only one of the Asakusa bars that takes cards. Three thousand jazz records and a craft-whisky list including independent bottlings.",
        duration: "7 min",
        minutes: 7,
        distance: "450 m",
        aside: "optional",
        note:
          "OGURA is Bar is closer still — four minutes from the hotel door, eleven seats, ¥1,080 cover, cash only, closed Mondays. And Bar Nemo is the famous one, founded 1960, with something like fourteen thousand bottles — but every one of its twenty seats is a smoking seat, its hours are reported two different ways, and it is cash only. Phone before walking over.",
      },
    ],
  },

  /* ------------------------------------------------------ day 11 — 29 July */
  {
    chapter: "day-11",
    advisory:
      "Two things in the brief do not survive contact with the timetable. Check-out is 12:00, not the 13:00 it plans for — so check out before the temple and leave the bags at the bell desk. And there is no 13:15 airport coach: the runs are 06:45, 07:45, 11:45, 12:45, 13:45 and 15:45. After a 13:00 return the 13:45 is the only one left, and it reaches Terminal 1 at 16:00 for a 17:35 flight.",
    legs: [
      {
        mode: "walk",
        from: "The room",
        to: "1F bell desk — check out, store the bags, reserve the coach seat",
        means: "Check out before going to the temple. The bell desk holds luggage after check-out, and the airport coach seat is reserved at the same desk.",
        duration: "15 min",
        minutes: 15,
        caution:
          "Check-out is 12:00 noon. The brief's 13:00 check-out is an hour past the deadline; at 13:00 you can only collect bags, not settle the room.",
      },
      {
        mode: "walk",
        from: "Asakusa View Hotel",
        to: "Kaminarimon",
        means: "Flat paved streets south-east off Kokusai-dōri.",
        duration: "10 min",
        minutes: 10,
        distance: "752 m",
        arrivesAt: "kaminarimon-gate",
        caution:
          "The brief has the hotel \"steps from Sensō-ji\". It is close to the main hall, but a full 752 metres from the southern gate where the visit starts.",
      },
      {
        mode: "walk",
        from: "Kaminarimon",
        to: "Hōzōmon, along Nakamise-dōri",
        means: "The pedestrian approach — flat, level stone paving, about 89 stalls running due north.",
        duration: "4 min unimpeded, 10–15 min in a late-July crowd",
        minutes: 12,
        distance: "312 m gate to gate",
        note: "There are side alleys behind the stalls if the crush is too much. Step-free the whole way, including under Hōzōmon.",
      },
      {
        mode: "walk",
        from: "Hōzōmon",
        to: "The Shinryū dragon fountain",
        means: "North into the forecourt, then bearing east to the temizuya pavilion.",
        duration: "2 min",
        minutes: 2,
        distance: "164 m",
        arrivesAt: "sensoji-dragon-fountain",
        note: "A deliberate detour off the centre line, not something you pass through.",
        caution: "The water supply here has been suspended before. The basin may be dry or restricted.",
      },
      {
        mode: "walk",
        from: "The fountain",
        to: "Foot of the Main Hall steps",
        means: "West across the paved forecourt, past the great bronze incense burner.",
        duration: "2 min",
        minutes: 2,
        distance: "139 m",
      },
      {
        mode: "lift",
        from: "The forecourt",
        to: "Outer worship hall, under the dragon ceiling",
        means:
          "A broad front staircase under the canopy — or a permanently open, self-operated lift on the left-hand side, with a ramp beyond it running level into the hall.",
        duration: "2 min by the steps, 5 min by the lift",
        minutes: 5,
        distance: "one storey",
        arrivesAt: "sensoji-dragon-ceiling",
        note: "The temple publishes no step count. The hall opens at 06:00.",
      },
      {
        mode: "lift",
        from: "The Main Hall",
        to: "Back down to the forecourt",
        means: "The same left-side lift, or the front steps.",
        duration: "5 min by the lift, 2 min by the steps",
        minutes: 5,
        note: "Descending worn stone under a crowded canopy is the harder direction. Worth its own decision.",
      },
      {
        mode: "walk",
        from: "Sensō-ji",
        to: "Asakusa View Hotel lobby",
        means: "West out of the precinct to Kokusai-dōri — the hotel's closest approach to the temple.",
        duration: "6 min",
        minutes: 6,
        distance: "419 m",
      },
      {
        mode: "walk",
        from: "Bell desk",
        to: "Coach, hotel driveway",
        means: "Bags retrieved and loaded into the underfloor bay at the kerbside.",
        duration: "10 min",
        minutes: 10,
        distance: "30 m",
        note:
          "Boarding is on the driveway, not in the lobby, and the seat must have been reserved in advance. The coaches are not low-floor: folding wheelchairs go in the luggage bay, motorised ones may be refused.",
      },
      {
        mode: "coach",
        from: "Asakusa View Hotel",
        to: "Narita Terminal 1",
        means:
          "Airport Transport Service limousine coach on the Narita–Kinshichō–Asakusa route. The hotel is the first stop; then Tobu Hotel Levant, Hotel East 21, Tokyo City Air Terminal, then Terminal 3, Terminal 2 and Terminal 1 last.",
        duration: "2 h 15 min",
        minutes: 135,
        distance: "66–69 km",
        depart: "13:45",
        arrive: "16:00",
        note: "¥3,100 each. The hotel's own page still quotes the old ¥2,900.",
        caution:
          "The 13:15 departure in the brief does not exist. Six runs a day only — 06:45, 07:45, 11:45, 12:45, 13:45, 15:45 — reaching Terminal 1 at 09:00, 10:00, 14:00, 14:35, 16:00 and 18:00. The 2 h 15 min duration the brief quotes is exactly right; it is simply attached to an invented departure.",
      },
      {
        mode: "taxi",
        from: "Asakusa View Hotel",
        to: "Narita Terminal 1 — the alternative",
        means: "Fixed-fare airport taxi via Shuto Route 7 and the Keiyō Road, or the Bayshore Line. Must be booked with a participating operator in advance.",
        duration: "1 h 25 min",
        minutes: 85,
        distance: "67.8 km",
        aside: "instead",
        note:
          "Narita's official fixed-fare table gives Taitō-ku at ¥29,000 via the Keiyō Road or ¥31,000 via the Bayshore, tolls on top — so ¥32,000–35,000 all in. Leaving at 13:15 it puts you at Terminal 1 around 14:40, which is the only version of this day with a real margin in it.",
      },
      {
        mode: "lift",
        from: "Terminal 1 coach bay, 1F",
        to: "Air Canada check-in, 4F South Wing",
        means: "Bags off at the kerb, then the central lifts or escalators near Exits 5–6 up three floors, then across to the Star Alliance zone.",
        duration: "12–15 min",
        minutes: 14,
        distance: "200–400 m and three levels",
        caution:
          "Every coach bay, ticket counter and taxi stand at Terminal 1 is on 1F, and all check-in is on 4F. This is a three-floor move with hold baggage, not the level walk it looks like on paper. Step-free by lift, and the lifts queue.",
      },
      {
        mode: "walk",
        from: "Check-in",
        to: "AC6 gate",
        means: "Bag drop, security, Japanese emigration, then out to the South Wing gates.",
        duration: "1 h 15 min",
        minutes: 75,
        distance: "1 km",
        caution:
          "Off a 16:00 coach you start check-in about 16:15, against Air Canada's bag-drop cut-off 60 minutes before departure — 16:35. That is twenty minutes of margin. Target a coach into Terminal 1 by 14:30, or take the taxi.",
      },
      {
        mode: "plane",
        from: "Tokyo Narita (NRT)",
        to: "Montréal–Trudeau (YUL)",
        means: "Air Canada AC6, Boeing 777-300ER.",
        duration: "12 h 25 min",
        minutes: 745,
        distance: "10,347 km great-circle",
        depart: "17:35 JST",
        arrive: "17:00 EDT, the same calendar day",
        note: "Fifty-five minutes shorter than the outbound, and the jet stream is why. You land before you took off, on paper.",
      },
      {
        mode: "walk",
        from: "AC6 touchdown",
        to: "YUL arrivals kerb",
        means: "Taxi-in, deplane, CBSA primary kiosks, baggage, customs.",
        duration: "55 min",
        minutes: 55,
        distance: "1 km",
        note: "File the ArriveCAN advance declaration before landing — it is the single biggest saving here.",
      },
      {
        mode: "car",
        from: "Montréal–Trudeau (YUL)",
        to: "Home",
        means: "Private car, Autoroute 20 east onto the 720.",
        duration: "45 min",
        minutes: 45,
        distance: "20 km",
        note:
          "The regulated flat fare is C$49.45 between 05:00 and 23:00. Confirm the pick-up zone with the driver rather than assuming the old arrivals kerb — it has moved repeatedly during the rebuild.",
      },
    ],
  },
];

const byChapter = new Map(transitDays.map((d) => [d.chapter, d]));

/** The day's boarding deadline, for the days there is one. */
export function portCallForChapter(chapterId: string): PortCall | undefined {
  return byChapter.get(chapterId)?.portCall;
}

/** The day's movements, in order. Empty array if a chapter has none. */
export function legsForChapter(chapterId: string): TransitLeg[] {
  return byChapter.get(chapterId)?.legs ?? [];
}

/** The day-level warning, for chapters that carry one. */
export function advisoryForChapter(chapterId: string): string | undefined {
  return byChapter.get(chapterId)?.advisory;
}

/* The chain that gets you to each stop: everything since you left the last
   place that has its own card, which is the span a reader standing at one
   card actually wants costed. Asides are left out — a fallback you did not
   take is not part of how you got here. */
const byDestination = new Map<string, TransitLeg[]>();
for (const day of transitDays) {
  let sinceLastStop: TransitLeg[] = [];
  for (const leg of day.legs) {
    if (leg.aside) continue;
    sinceLastStop.push(leg);
    if (leg.arrivesAt) {
      byDestination.set(leg.arrivesAt, sinceLastStop);
      sinceLastStop = [];
    }
  }
}

export function arrivalLegs(destinationId: string): TransitLeg[] {
  return byDestination.get(destinationId) ?? [];
}
