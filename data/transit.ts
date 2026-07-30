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
  /** Overrides "ship's all aboard" in that small print — see `convention`. */
  allAboardLabel?: string;
  /** Lines go. */
  sails: string;
  /**
   * Overrides the band's standing sentence about where the big number comes
   * from. Embarkation day is the exception: there the binding hour is check-in
   * closing, not the ship sailing, so "ninety minutes before she sails" would
   * be the wrong arithmetic printed in the one place it has to be right.
   */
  convention?: string;
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
    advisory:
      "One thing on this day is still unresolved and it sits above everything else on this site: an aggregator lists AC5 as operating Tuesday to Sunday, and 19 July 2027 is a Monday. Confirm the day of operation with Air Canada before a single other booking on this page is made. Everything downstream — the hotel, the ship, the coach seat — hangs off that flight existing.",
    legs: [
      {
        mode: "car",
        from: "Montréal",
        to: "Montréal–Trudeau (YUL), departures kerb",
        means: "Private car. Autoroute 720 west to Autoroute 20, up onto the departures viaduct.",
        duration: "1 h",
        minutes: 60,
        distance: "20 km",
        depart: "08:30",
        arrive: "09:30",
        caution:
          "Costed at the full hour rather than the free-flow 45 minutes. YUL's road network is mid-reconstruction until 2035 and the arrivals-level drop-off has been closed in rolling phases, pushing all traffic up to departures.",
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
        depart: "09:30",
        arrive: "11:00",
        note: "Bags are tagged straight through to Narita — this is a single nonstop sector, so they are not touched again until the belt at NRT. At the gate 2 h 05 min before departure, with nothing left to do.",
        caution:
          "There is no curbside check-in. Air Canada does not offer it anywhere in Canada; the only kerbside service is accessibility assistance arranged with the airport. Leaving at 08:30 rather than 09:15 puts you at the kerb 3 h 35 min before departure, which clears the 3 h 30 min Aéroports de Montréal recommends at peak — the earlier 09:15 start met the three-hour minimum and missed the recommendation.",
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
    advisory:
      "The one day on this trip built around a vehicle you cannot afford to miss, so it is built around the later one. Off a realistic 16:40 in the arrivals lobby you cannot reach the coach pole before the 16:55 leaves — 250 metres, two cases and a ticket counter do not fit in fifteen minutes. This day takes the 17:25 instead, buys the coach tickets online before you fly, and puts you at the pole with twenty-five minutes in hand. Tonight is therefore Chinatown for the lanterns, the incense and supper, and nothing with a closing time on it. The fortune reading has moved to tomorrow morning, where it fits properly: Airi opens at ten and the tai chi circle two streets away ends at ten, which is a neater join than anything this evening could offer.",
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
          "Level walk out to the pole with the tickets already on your phone. Trolleys and porters the whole way; nothing gets carried.",
        duration: "20 min",
        minutes: 20,
        distance: "250 m",
        depart: "16:40",
        arrive: "17:00",
        note: "Stop 12 is the YCAT bay at Terminal 1. Terminal 2 is stop 15, Terminal 3 is stop 7.",
        caution:
          "Buy the two ¥4,000 tickets online before you fly. Queuing at the Limousine counter is what makes this leg unpredictable, and 20 July 2027 is the first working day after Marine Day — the counter is absorbing a returning three-day weekend along with everyone else.",
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
        depart: "17:25",
        arrive: "19:05",
        caution:
          "The 16:30 departure in the brief does not exist. Terminal 1 runs 16:25, 16:55 and 17:25 — the 16:25 is long gone off a 16:40 lobby, and the 16:55 leaves at the exact minute the walk to the pole ends, which is not a connection but a coin toss with two suitcases on it. This day takes the 17:25 with twenty-five minutes standing at the pole. Every afternoon service is timetabled at 1 h 40 min, not the 1 h 55 min the brief allows. Get off at bay Y4; Y1 is the boarding bay at the wrong end of the concourse.",
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
        depart: "19:10",
        arrive: "19:23",
        arrivesAt: "hyatt-yokohama",
        note: "Around ¥1,600–2,200 on the meter. Book the car for 19:10 with a twenty-minute window either side rather than a single minute — the coach is the variable here, not the road.",
        caution:
          "The brief says ten minutes. Free-flow is five and a half, but this is the evening peak in central Yokohama — twelve to fifteen is the honest figure, twenty if the Kannai corridor is backed up.",
      },
      {
        mode: "walk",
        from: "Hotel forecourt",
        to: "Reception",
        means: "Bell staff take the cases from the kerb and bring them up to the room.",
        duration: "3 min",
        minutes: 3,
        distance: "40 m",
        note: "Wheels down 15:25, standing at the desk about 19:26.",
      },
      {
        mode: "stay",
        from: "Reception",
        to: "Checked in, and five minutes sitting down",
        means:
          "Two international check-ins, two passports, two keys, and the cases sent up. Then sit down for five minutes before you go out again — you have been awake a very long time and the clock in your body says it is the middle of the night.",
        duration: "25 min",
        minutes: 25,
        depart: "19:26",
        arrive: "19:51",
        note: "Nothing after this has a deadline attached to it, which is the whole point of taking the later coach.",
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
        depart: "19:55",
        arrive: "20:02",
        arrivesAt: "yokohama-chinatown",
        note:
          "This is the hour the street is for, and eight o'clock is better than seven: the lanterns are lit, Kanteibyō is floodlit, and five hundred kitchens are going at once. Doing it tonight is what turns tomorrow morning from a scramble into a morning.",
      },
      {
        mode: "stay",
        from: "Kanteibyō",
        to: "Five sticks, five censers, in order",
        means:
          "Incense at the desk, lit at the great censer in the forecourt and fanned out rather than blown, then one stick to each of the five burners: the Jade Emperor, Guan Yu, Di Mu Niang Niang, Guan Yin, Fu De Zheng Shen. Two of you, a bow at each.",
        duration: "25 min",
        minutes: 25,
        depart: "20:05",
        arrive: "20:30",
        caution:
          "The forecourt and the floodlit gate are there whatever the hour, but Kanteibyō's incense desk keeps its own closing time and it is not published anywhere reliable — assume it may be shut by eight. If it is, tonight is the gate, the roof carvings and the light, and the five-censer ritual moves to Masōbyō tomorrow morning, which is already built to hold it.",
      },
      {
        mode: "stay",
        from: "Chinatown",
        to: "Supper, sitting down, somewhere with air conditioning",
        means:
          "Five hundred kitchens and no booking. Pork buns, roast duck in the windows, and the first proper meal since Montréal.",
        duration: "1 h 15 min",
        minutes: 75,
        depart: "20:35",
        arrive: "21:50",
      },
      {
        mode: "walk",
        from: "Chinatown",
        to: "Hyatt Regency Yokohama",
        means: "Back north through the block after supper.",
        duration: "7 min",
        minutes: 7,
        distance: "500 m",
        depart: "21:50",
        arrive: "21:57",
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
      beBackBy: "12:30",
      beBackByLabel: "Be there by",
      allAboard: "14:00",
      allAboardLabel: "check-in closes",
      sails: "15:00",
      convention:
        "Today the binding hour is not the ship sailing but check-in closing — so the big number is ninety minutes before 14:00, not before 15:00.",
      note:
        "Embarkation is stricter than a port day: check-in runs 12:00 to 14:00 and Princess states that if you arrive after it closes you will not be allowed to board. Yokohama also uses assigned Arrival Groups — you pick a staggered window in the Princess app about thirty days out, and arriving early only buys you the right to drop bags and wait. This day is timed to be at the terminal by twenty past eleven and through the desks in the first minutes of the noon window, which means the whale's back happens before check-in rather than instead of it. One thing worth knowing before you walk in: once you have checked in you cannot go back ashore, so do any last errand first.",
    },
    advisory:
      "The easiest morning of the whole trip, and the one that quietly rescues the fortune reading. The brief sent you to Enoshima — two and a half hours in a taxi, seven hundred-odd steps, an escalator that only runs upward, and a boat back that does not sail until eleven. It has been cut. What replaces it all happens inside a ten-minute walking radius of the hotel door: incense at the sea goddess's temple from twenty to nine, the free Wednesday tai chi circle from nine to ten, and then Airi — which opens at ten, five minutes away — for the tarot the Tuesday evening could never hold. Longest drive today is seven minutes, at twenty past eleven, to the pier. One correction worth having in advance: an earlier version of this day had you aboard by 11:15, which cannot happen — check-in does not open until noon and Yokohama runs assigned Arrival Groups, so turning up at half past ten buys you a bench, not a cabin.",
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
        arrive: "08:15",
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
        depart: "08:25",
        arrive: "08:34",
        note:
          "Mazu is the Chinese goddess who calms the sea and brings sailors home — Watatsumi's opposite number, and the one who came to this harbour with the ships. The temple was consecrated in 2006 from the Grand Mazu Temple in Tainan. Dragons run the length of the gate, along the roof ridge and around the balustrade.",
      },
      {
        mode: "stay",
        from: "Yokohama Masōbyō",
        to: "Incense, dragons, and the Wednesday tai chi",
        means:
          "Opens 09:00, grounds free. Buy the five-stick incense set at the desk (¥500) and walk the five numbered censers in order. Then the courtyard: a free tai chi circle meets there Wednesdays and Saturdays 09:00–10:00, reception from 08:45, no booking, and visitors who simply turn up are welcome. Join it or sit and watch it.",
        duration: "1 h 20 min",
        minutes: 80,
        depart: "08:40",
        arrive: "10:00",
        note:
          "21 July 2027 is a Wednesday, which is why this works. Reception opens 08:45 and the circle runs 09:00 to 10:00, so the twenty minutes before it are the incense and the dragons and the hour after is the tai chi. It finishes at ten on the dot, which is the minute the fortune hall five minutes away opens its doors — the two halves of this morning fit together with nothing left over. The circle pauses through August; July is in season. Worth telephoning ahead to confirm it is still running.",
        caution:
          "The courtyard is at street level and everything worth seeing — the gate, the roof, the censers — works from it. What could not be confirmed is the step situation at the main hall door itself: these are raised-platform Chinese temples and usually have a raised sill. Assume a step or two there, and do not plan on getting inside.",
      },
      {
        mode: "walk",
        from: "Yokohama Masōbyō",
        to: "Uranai Yakata Airi — 占い館 愛梨",
        means:
          "North through Chinatown's inner lanes, level the whole way. Three branches, all a few doors apart: the main store in the Kamome market at Yamashita-chō 187, the Shanghai Road branch at 192-2, and the Tenchōmon branch also at 187 on Kanteibyō-dōri.",
        duration: "5 min",
        minutes: 5,
        distance: "400 m",
        depart: "10:00",
        arrive: "10:05",
        note:
          "Kanteibyō is on the way and has the better dragon carvings in daylight — cloud-dragon stone, dragon pillars, Taiwanese roof tiles. You saw it lit up last night, so put your head in for two minutes or walk straight past.",
        caution:
          "Ask for the Shanghai Road or Tenchōmon branch rather than the main store: 本店 is on the 2F of the Kamome market building, and no lift is documented. All three keep the same hours.",
      },
      {
        mode: "stay",
        from: "Uranai Yakata Airi",
        to: "The tarot, and the lines in your hand",
        means:
          "Twenty minutes of tarot each, and the palm reading that comes with it — a curtained booth, a small table, and somebody who turns your hand over before she touches the cards. Palm reading from about ¥1,000; tarot priced by reader.",
        duration: "55 min",
        minutes: 55,
        depart: "10:05",
        arrive: "11:00",
        note:
          "Ten o'clock is opening time, so you are the first customers of the day and there is no queue in front of you — which is exactly what the Tuesday evening could not offer at any price.",
        caution:
          "Book it, and book it before you fly: reservations go through their own site at coubic.com/irieuranai, and a named reader has to be requested in advance. Weekday hours are 10:00 to 20:00 with last reception at 19:30 — confirmed on their own site, and the reason this reading is on Wednesday morning rather than Tuesday night. Two things to settle when you book: ask whether they can read in English, because nothing on their site says they can, and note that the brief's promised \"face analysis\" is not on the published menu — what Airi sells is tarot and palm reading.",
      },
      {
        mode: "walk",
        from: "Uranai Yakata Airi",
        to: "Hyatt Regency Yokohama, to collect the luggage",
        means: "Back north through the block, uphill in temperature only.",
        duration: "8 min",
        minutes: 8,
        distance: "700 m",
        depart: "11:00",
        arrive: "11:08",
        note: "Twelve minutes at the bell desk before the car: a cold drink, the bags, the bathroom, and no clock.",
      },
      {
        mode: "taxi",
        from: "Hyatt Regency Yokohama",
        to: "Ōsanbashi terminal, 2F set-down",
        means: "Private taxi with the luggage along the Yamashita Park frontage and Kaigan-dōri, then up the vehicle ramp.",
        duration: "7 min",
        minutes: 7,
        distance: "1.3 km",
        depart: "11:20",
        arrive: "11:27",
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
        depart: "11:27",
        arrive: "11:32",
        arrivesAt: "osanbashi-pier",
        note:
          "Taxi rank, ticket counter, immigration lobby and CIQ Plaza are all on 2F — there is no level change here at all, and the terminal is lifts and ramps throughout. Only the car park is on 1F.",
      },
      {
        mode: "stay",
        from: "The terminal roof",
        to: "The whale's back, before you are anybody's passenger",
        means:
          "Out onto kujira no senaka — Brazilian ipe decking, no columns, no steps, no right angles, open to anyone twenty-four hours a day. Your ship fills the northern edge close enough to read her rivets.",
        duration: "25 min",
        minutes: 25,
        depart: "11:32",
        arrive: "11:57",
        note:
          "Do this now, not later. Once you have checked in you cannot come back ashore, and the rooftop is on the wrong side of that line — which is exactly the mistake the earlier version of this day made by putting you aboard at a quarter past eleven. Twenty-five minutes rather than thirty is the only thing the fortune reading cost this morning, and the roof is open around the clock if you would rather have it back.",
      },
      {
        mode: "stay",
        from: "CIQ Plaza",
        to: "Checked in — Arrival Group window, desks, security, CIQ",
        means:
          "Medallion collection or pickup, passports, the security screen and the boarding gate. This is a transaction with a queue behind it, not a doorway.",
        duration: "30 min",
        minutes: 30,
        depart: "12:00",
        arrive: "12:30",
        caution:
          "Your assigned Arrival Group governs when you may join this queue — it is picked in the app about thirty days out, and if you do not pick one it is picked for you 24 hours ahead. Pick the earliest window offered. Check-in closes at 14:00 and Princess states in writing that arriving after it closes means not boarding.",
      },
      {
        mode: "walk",
        from: "Boarding gate",
        to: "Balcony stateroom, Diamond Princess",
        means: "Gangway, then the ship's own corridors and lifts.",
        duration: "20 min",
        minutes: 20,
        distance: "500 m",
        depart: "12:30",
        arrive: "about 12:50",
        note:
          "Ōsanbashi is a long finger pier and the ship is 290 metres, so the walk is real. Aboard about ten to one — seventy minutes before check-in closes, with lunch and the sail-away still ahead of you.",
      },
      {
        mode: "stay",
        from: "Aboard",
        to: "Book the Izumi bath for the sea day",
        means:
          "The spa desk, before lunch on the first afternoon. Capacity is capped near thirty across 818 m² and the sea-day passes are the ones that sell out — this is the single booking that has to be made today rather than later.",
        duration: "20 min",
        minutes: 20,
        depart: "13:00",
        arrive: "13:20",
        note: "About US$39 for a two-hour session, US$49 for a day pass. Not covered by Princess Premier.",
      },
      {
        mode: "ship",
        from: "Ōsanbashi Pier, Yokohama",
        to: "Under way",
        means: "Diamond Princess, seven nights, round trip.",
        duration: "—",
        minutes: 0,
        depart: "15:00",
        note: "Streamers off the rails, Hotaru no Hikari on the quay, and the wooden deck slides away from you.",
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
      lastTender: "15:00",
      sails: "16:00",
      note:
        "The deadline here is not \"be on the ship\" but \"be on the last boat leaving the pier\", and that queue is at its worst on the final runs. The last tender has to leave before all-aboard, not at it — the crossing alone is twelve minutes — so it is shown here at 15:00 and the real figure is the one printed in the Patter that morning. The day is built so that none of it matters: you are back at the Marine Terminal by one and on the 13:25 tender, with an hour and a half still in hand.",
    },
    advisory:
      "An early start, and it buys you the whole day. Futami is the original Toba plan and it is back where it belongs — but at a quarter to eight rather than mid-morning, because it is a bare seafront promenade with no shade and no benches, and by eleven it is punishing. The shrine office opens at seven, so the frog fortunes, the goshuin and the salt-grass purification are all available when you get there. Then back for the boat named 龍宮城, built as the Dragon Palace itself, and the air-conditioned aquarium it sets you down beside. Two short taxi rides, both under ten minutes, and everything else is on the water or indoors.",
    legs: [
      {
        mode: "walk",
        from: "Stateroom",
        to: "Tender platform, Deck 4",
        means: "Corridor and lift down to the shell door. Let the tour groups clear first — there is no hurry today at all.",
        duration: "10 min",
        minutes: 10,
        distance: "250 m",
        depart: "07:00",
        arrive: "07:10",
        note:
          "The one early start of the cruise, and it is what makes the rest of the day easy. Each of you collects your own numbered tender ticket in the first wave; one person cannot collect both.",
      },
      {
        mode: "tender",
        from: "At anchor, Toba Bay",
        to: "Toba Marine Terminal pontoon",
        means: "The ship's own tender. No quay at Toba takes a 290-metre ship, so this is the only way in.",
        duration: "15 min",
        minutes: 15,
        distance: "2 km",
        depart: "07:15",
        arrive: "07:30",
      },
      {
        mode: "taxi",
        from: "Toba Marine Terminal",
        to: "Futami Okitama Shrine — 二見興玉神社",
        means:
          "Pre-booked car from the terminal rank along the coast road. Ask for 二見興玉神社 表参道入口 — the WEST entrance torii, not the east — and have him come back for you at 08:55.",
        duration: "10 min",
        minutes: 10,
        distance: "7.5 km",
        depart: "07:35",
        arrive: "07:45",
        arrivesAt: "meoto-iwa",
        note:
          "The shrine's own access page gives 7.5 km and about ten minutes at ¥2,500–3,000; the original planning document said fifteen. Either way it is comfortably inside the drive rule, and the sandō is deliberately thin gravel kept shallow for wheelchairs.",
      },
      {
        mode: "stay",
        from: "Futami Okitama Shrine",
        to: "The wedded rocks, the frogs, and a fortune out of a frog's mouth",
        duration: "50 min",
        minutes: 50,
        depart: "07:45",
        arrive: "08:35",
        means:
          "The shore path west to east: the husband rock nine metres out with its little torii, the wife rock beside him, and thirty-five metres of braided rice-straw rope slung between them over open water. Frog after frog after frog along the way — Sarutahiko's messengers, and a pun, because kaeru means both \"frog\" and \"to return\". Draw the kaeru-mikuji at the shrine office, tugging the slip out of a frog's mouth.",
        note:
          "Quarter to eight is the whole trick. The office opens at 07:00, so the fortunes, the goshuin and the hamasangu purification with salt grass are all available — and the promenade is still in shade and still bearable. By eleven it would be neither.",
        caution:
          "There is no shade and there are no benches on this path at any hour. Hats and water before you get out of the car, not after.",
      },
      {
        mode: "walk",
        from: "Futami Okitama Shrine",
        to: "Ryūgūsha — 龍宮社, at the tideline",
        means: "Two hundred metres further east along the same flat shore path, past the last of the frogs, until the walkway runs out at the water.",
        duration: "10 min",
        minutes: 10,
        distance: "200 m",
        depart: "08:35",
        arrive: "08:45",
        arrivesAt: "ryugusha-shrine",
        note:
          "Vermillion hall, green roof, and no gap at all between it and the ocean. Watatsumi Ōkami lives here — the sea kami Japan reads as Ryūjin the dragon, and the shrine is named for his palace. Two bows, two claps, one bow, straight out over the bay.",
      },
      {
        mode: "stay",
        from: "Ryūgūsha",
        to: "The mochi shops on the way back",
        means: "Back up the approach, where the steamers are going. Futami's own is ofuku-mochi, wave-shaped and filled with bean paste.",
        duration: "10 min",
        minutes: 10,
        depart: "08:45",
        arrive: "08:55",
        caution:
          "Ryūgūsha keeps its own posted hours of roughly 09:00–16:00 for anything handed over a counter, so at this hour it is the hall and the sea rather than a stamp. The main shrine office behind you has been open since seven if you want both.",
      },
      {
        mode: "taxi",
        from: "Futami",
        to: "Toba Marine Terminal",
        means: "The same held car back along the coast.",
        duration: "10 min",
        minutes: 10,
        distance: "7.5 km",
        depart: "08:55",
        arrive: "09:05",
      },
      {
        mode: "stay",
        from: "Toba Marine Terminal",
        to: "The 2F lounge, and the cruise ticket counter",
        means:
          "Back indoors and out of the sun. The 2F exchange lounge has bay windows over the bay, coffee and Ise udon. Buy the bay-cruise tickets at the 1F counter, ¥2,400 each.",
        duration: "20 min",
        minutes: 20,
        depart: "09:05",
        arrive: "09:25",
        caution:
          "Use the terminal's accessible toilet before you board — there is no toilet at all on the boat. And ask the counter which vessel is on your sailing: if it is the little Mitsushima, take the next departure instead. It has a 66 cm door and internal stairs, and in summer the boats run every half hour, so waiting costs you nothing.",
      },
      {
        mode: "walk",
        from: "Terminal lobby",
        to: "Pier 1 — 1番のりば",
        means: "Through to the boarding pontoon. All of it indoors or under the pier roof.",
        duration: "10 min",
        minutes: 10,
        distance: "100–150 m",
        depart: "09:25",
        arrive: "09:35",
        note:
          "This is the farthest pier in the complex rather than a door off the lobby, and the barrier-free centre tells visitors to allow extra time for it. Ten minutes at your own pace, not three.",
      },
      {
        mode: "stay",
        from: "Pier 1",
        to: "On the pontoon, a clear quarter of an hour early",
        means:
          "The covered ramp down, the tide-dependent gradient, the step-over threshold at the door, and staff finding you a seat at the rear of the 1F cabin.",
        duration: "25 min",
        minutes: 25,
        depart: "09:35",
        arrive: "10:00",
        caution:
          "The operator's own instruction is 出航時刻の15分前までにお越しください — be here fifteen minutes before departure. An earlier draft of this day had the walk to Pier 1 ending at the exact minute the boat left, which is not a connection. Summer sailings go on the hour and the half hour from 09:00 to 16:00, so if you miss one the next is thirty minutes away and the day still works.",
      },
      {
        mode: "boat",
        from: "Toba Marine Terminal",
        to: "Pearl Island & Aquarium pier, aboard the Ryūgū-jō",
        means:
          "鳥羽湾めぐり遊覧船「龍宮城」 — a 360-passenger sightseeing boat built as the undersea Dragon Palace itself, with Urashima Tarō and Princess Otohime standing on the superstructure. Sit at the REAR of the 1F cabin.",
        duration: "35 min",
        minutes: 35,
        depart: "10:00",
        arrive: "10:35",
        arrivesAt: "toba-ryugujo-boat",
        note:
          "This is the whole voyage's theme, afloat and seated: not a shrine to the dragon king but his palace, with the story's two characters on the roof. The castle is on the outside, so you get all of it from your seat and from the pier — the 2F Otohime throne room and the 3F deck are stairs only and cost you nothing to skip. The boat calls at Dolphin Island on the way; stay aboard. The full loop is about fifty minutes, of which this is the long leg.",
        caution:
          "A covered ramp down to a floating pontoon — the gradient changes with the tide — then one step-over threshold at the door, with staff on hand. The front of the 1F cabin has two low steps; only the rear is genuinely step-free.",
      },
      {
        mode: "walk",
        from: "Pearl Island & Aquarium pier",
        to: "Toba Aquarium, barrier-free entrance",
        means:
          "Off the boat with 360 other people, across to the highway-side entrance beside the ticket window, and two tickets at ¥2,800 each.",
        duration: "15 min",
        minutes: 15,
        depart: "10:35",
        arrive: "10:50",
        arrivesAt: "toba-aquarium",
        note:
          "Not five minutes. Disembarking a full sightseeing boat down a floating pontoon takes as long as boarding it did, and there is a ticket window at the far end of it. The aquarium has been open since 09:30, so nothing here is waiting on you.",
      },
      {
        mode: "stay",
        from: "Toba Aquarium",
        to: "The mermaid, and the Dragon Palace's messenger",
        means:
          "鳥羽水族館 — indoor, air-conditioned, and one of the largest in Japan. Use the barrier-free entrance rather than the 2F stair-and-escalator front door.",
        duration: "2 h",
        minutes: 120,
        depart: "10:50",
        arrive: "12:50",
        note:
          "Sixteen wheelchairs and three electric carts are lent free at the door, no reservation and nobody thinks anything of it. There is deliberately no fixed route, so take the short version: first 人魚の海, the Sea of Mermaids, for Serena — the only dugong in Japan, in the tank the aquarium named for the legend she is supposed to have started, and as of April 2026 thirty-nine years in residence, which is the world record. Then marine mammals, then the seated indoor sea-lion show, then the Ancient Sea. Skip Jungle World and Japanese Rivers. Lunch inside around 11:45, before the crowd. And look for the ryūgū-no-tsukai if it is in: the oarfish, whose name means Messenger of the Dragon Palace.",
        caution:
          "Two things. Ramps run throughout but the aquarium's own page is honest that a few spots still need stairs and a few tanks cannot be approached — that is normal here, turn round and go another way. And the sea-lion show runs to fixed times that are posted at the entrance and change with the season: read the board on the way in and build the two hours around it, rather than hoping to walk into one.",
      },
      {
        mode: "taxi",
        from: "Toba Aquarium",
        to: "Toba Marine Terminal",
        means: "Four minutes by road from the aquarium's own rank, rather than waiting for the next sailing.",
        duration: "10 min",
        minutes: 10,
        distance: "1.2 km",
        depart: "12:50",
        arrive: "13:00",
        caution:
          "Do not walk this. The terminal is about 1.2 km away, 17–20 minutes on unshaded Route 42 roadside, which is exactly the kind of leg this day is built to avoid. The sightseeing boat also comes back here, but its return leg is timetabled rather than on demand — the taxi is the one that fits the tender.",
      },
      {
        mode: "stay",
        from: "Toba Marine Terminal",
        to: "Waiting comfortably, with the whole afternoon in hand",
        means:
          "The 2F lounge again, or the roofed benches at Kamome Hiroba just outside for air on your faces. Souvenirs at Toba Ichibangai are a four-minute taxi, not the walk the guidebooks claim.",
        duration: "15 min",
        minutes: 15,
        depart: "13:00",
        arrive: "13:15",
      },
      {
        mode: "walk",
        from: "Terminal",
        to: "Tender pontoon",
        means: "Cruise card scanned and bags checked by ship's security on the quay.",
        duration: "6 min",
        minutes: 6,
        distance: "200 m",
        depart: "13:15",
        arrive: "13:21",
      },
      {
        mode: "tender",
        from: "Toba Marine Terminal",
        to: "Diamond Princess at anchor",
        means: "Return tender. No ticket needed coming back, but the queue builds through the last two hours.",
        duration: "30 min including the queue",
        minutes: 30,
        distance: "2 km",
        depart: "13:25",
        arrive: "about 13:55",
        caution:
          "Toba's anchorage is exposed and tendering gets suspended in wind or swell — the failure mode here is weather, and it gives no warning. This is why the day takes the 13:25 boat and not one of the last three: aboard about two o'clock, half an hour inside our own deadline, an hour and a half before the last boat and two hours before she sails. If it is blowing, go straight back after the aquarium and read in the lounge on board.",
      },
      {
        mode: "walk",
        from: "Deck 4",
        to: "Stateroom",
        means: "Shell door, lift lobby, corridor.",
        duration: "8 min",
        minutes: 8,
        distance: "250 m",
        note: "About 1.5 km on foot across the entire day, flat, and everything outdoors done before nine in the morning.",
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
        "The latest deadline of the week, and the most slack: the whole shore day runs 09:30 to 14:00 against a call that does not end until 17:00, so there is an hour and a half of margin behind you and no point in the day where you are hurrying. One thing to watch for in the Patter — because the first port after this is Korea, Japanese exit immigration happens before Seogwipo, and Princess's own wording allows it to be run at the previous port's terminal rather than on board. If Kōchi is named as the exit-inspection point, that inspection time becomes your real deadline, not 16:30, and you cannot go ashore again once you have cleared it.",
    },
    advisory:
      "Nothing ashore before about 09:30 — she is not alongside until nine and the gangway takes another half hour. After that the day is yours: a museum on the castle hill of the warlord who founded the dragon shrine, then the beach itself, then the ramped viewpoint that holds both capes in one frame, then a long indoor lunch. One taxi, held all day, and aboard again by two — an hour and a half inside our own deadline. The beach comes before lunch on purpose: there is no shade at all on the sand and by half past twelve it is over thirty degrees.",
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
        depart: "09:30",
        arrive: "09:45",
        note: "An unshaded working apron. It is the only open-air walking of the day that is not optional.",
      },
      {
        mode: "taxi",
        from: "Kōchi Shinkō cruise terminal",
        to: "Sakamoto Ryōma Memorial Museum, Urado Shiroyama",
        means:
          "Pre-booked taxi west over the Urado Bridge. Show the driver 高知県立坂本龍馬記念館（高知市浦戸城山830）and add 記念館の無料駐車場の中まで入ってください — please drive right into the museum's own free car park. Ask him back for 11:20 and take his card.",
        duration: "12–15 min",
        minutes: 15,
        distance: "5 km",
        depart: "09:45",
        arrive: "10:00",
        note:
          "There is no bus and no railway anywhere near this terminal, so the car has to be contracted to wait and return. The city centre is about 25 minutes away and is out of range under the new rule — everything worth having is on this headland.",
        caution:
          "Book the car for 09:45, not 09:35. She is not alongside until nine, the gangway takes another half hour, and the walk across the apron is a further fifteen minutes — a car ordered for 09:35 is a car waiting on the meter while you are still on the ship.",
      },
      {
        mode: "stay",
        from: "Sakamoto Ryōma Memorial Museum",
        to: "The sea-view gallery, on the castle hill",
        means:
          "The taxi stops at the building. No step at the entrance, a handrail ramp, four wheelchairs lent free, and air conditioning throughout. Lift from reception to 2F, across the covered walkway into the Main Building, and out into the 海の見える・ぎゃらりい — a seated, step-free gallery looking clean over the Pacific.",
        duration: "1 h 20 min",
        minutes: 80,
        depart: "10:00",
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
        mode: "steps",
        from: "Katsurahama Sea Terrace",
        to: "Down onto the sand",
        means:
          "Down through the shops and the rest house to the beach itself — about 200 metres. The direct path has both slopes and steps; there is a ramped walkway alongside it, so ask for the スロープ and take that.",
        duration: "25 min there, on the sand, and back",
        minutes: 25,
        distance: "200 m each way",
        depart: "11:30",
        arrive: "11:55",
        arrivesAt: "katsurahama-beach",
        note:
          "This is the beach, and it is worth the time: crouch down and the shingle is not grey but green, red, white, black and grey — five colours, ground off Mount Ishizuchi and sorted by the surf. Japan keeps this crescent for looking at the moon.",
        caution:
          "Do not swim here — the undertow is lethal and it is signposted, which is why the swim is on Jeju instead. This is the first thing you do after the museum, and deliberately so: there is no shade at all once you are on the sand, and by half past twelve it is over thirty degrees. Lunch is the reward afterwards, indoors.",
      },
      {
        mode: "walk",
        from: "The beach",
        to: "The Ryōma statue viewpoint — by the ramp, not the steps",
        means:
          "This is the find. Beside the wide staircase up to the viewpoint there is a wheelchair ramp, and Kōchi City's own wheelchair-and-pushchair route map runs this way: 「この階段左には車椅子用のスロープもあり、１段も階段を使う事無く龍馬像前に到着できます」 — a ramp to the left of the steps reaches the front of the Ryōma statue without using a single stair.",
        duration: "20 min there, at the statue, and back",
        minutes: 20,
        distance: "200–250 m each way, made surface",
        depart: "11:55",
        arrive: "12:15",
        arrivesAt: "ryuotsu-shrine",
        note:
          "This is where you see the dragon king's shrine from, and it is the whole reason the climb is not on the plan. From up here you get the entire crescent — strung between Ryūzu-misaki, Dragon Head Cape, where you are standing, and Ryūō-misaki, Dragon King Cape, at the far end with its red torii and the vermilion Ryūō-gū on the rock. Dragon's head looking at dragon king, the beach between them. Getting to the shrine itself means the full length of the beach in unshaded sand and then a steep salt-worn stairway with no confirmed handrail, which is not what this trip is for — you have the torii, the hall and both capes from here.",
      },
      {
        mode: "stay",
        from: "Katsurahama Sea Terrace",
        to: "Lunch indoors, and the free museum",
        means:
          "The commercial terrace beside the car park, rebuilt and reopened in 2023. Sit-down lunch out of the sun at Kōchi Bishokukan Jin or Umisachi, then the free Katsurahama Museum — indoor, air-conditioned — and an information desk that lends wheelchairs and has charging and wifi.",
        duration: "1 h 15 min",
        minutes: 75,
        depart: "12:15",
        arrive: "13:30",
        note:
          "The long cool sit-down at the end of the shore day rather than in the middle of it. Everything outdoors is behind you by now.",
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
        arrive: "13:42",
      },
      {
        mode: "walk",
        from: "Terminal",
        to: "Gangway",
        means: "Back across the apron and through the single re-boarding screening line.",
        duration: "15 min",
        minutes: 15,
        distance: "about 250 m",
        depart: "13:45",
        arrive: "about 14:00",
        note:
          "Aboard by about two — an hour and a half inside our own deadline of 15:30, two and a half hours inside the ship's, and three hours before she sails. Costed at fifteen minutes rather than ten because the walk out had no queue and this one has a screening line at the end of it.",
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
        minutes: 14,
        distance: "200 m each way",
        caution:
          "The brief promises the whole thing \"viewed entirely from the private Balcony Stateroom\", and so, until this pass, did the chapter above. It is not true. A fixed balcony sees one bank: booked port side you get Moji and Kyūshū and miss Shimonoseki, Akama Jingū and the Dan-no-ura shore the whole day is built on. Both banks, and the bridge tower passing overhead, mean going up to an open deck for the twenty minutes it matters. Take a hat — there is no shade up there.",
      },
      {
        mode: "boat",
        from: "Pilot boarding ground, east approach",
        to: "The ship's bridge",
        means: "Kanmon Kaikyō pilot cutter, coming alongside while the ship slows without stopping.",
        duration: "about 10 min",
        minutes: 0,
        note: "Pilotage is compulsory in this channel at 10,000 gross tons and over. She is 115,875. Costed at nothing because it is the pilot's journey, not yours — it is here so you know what the small boat coming alongside is.",
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
        minutes: 0,
        distance: "2 km",
        note:
          "About 650 metres shore to shore. The bridge keeps 61 metres of clearance against roughly 54 of air draft. The current runs to ten knots and turns about every six hours. These five minutes sit inside the two-hour block above rather than after it — this is the moment to be on deck for, not a separate leg.",
      },
      {
        mode: "boat",
        from: "The ship's bridge",
        to: "Pilot cutter, west of the strait",
        means: "The pilot goes off the same way he came on.",
        duration: "about 10 min",
        minutes: 0,
        note: "Again the pilot's journey rather than yours. This is the real end of the scenic window — after it she works up for the overnight run to Jeju.",
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
        "An immigration day, so plan it as one continuous trip ashore: where entry formalities are run, Princess suspends the usual right to come back for lunch and go out again. This is also the only day in a foreign country, which means exit formalities and a security screen on the way back in, and taxis that rank outside the port gate rather than at the terminal door. The return is costed at fifty-five minutes rather than forty-five for exactly that reason, and it still puts you aboard at two — half an hour inside our own deadline and an hour and a half inside the ship's. Two stops only, and that is the whole trick of this day: a third one is what used to land it five minutes past our own deadline. Note that the shore-hours figure for this call comes from cruise-retailer databases rather than from Princess directly; reconfirm it in the app.",
    },
    advisory:
      "The swim day, and the one foreign port. Two hard facts shape it: the walk from the ship to Korean immigration is about 1,200 metres of corridor and you do it both ways, and the Jungmun sand has no road to it — 250 to 700 metres of ramp and 30 to 50 vertical metres down. So the day holds two stops and no more. The falls come first, at nine, while it is still cool and while the beach is shut anyway — Jungmun has no lifeguards before ten. Then eighty minutes in the sea, then a long lunch out of the sun, then home with two hours to spare before she sails. Yeomiji's glasshouse was the alternative first stop and it is the safer one on paper — documented step-free, a lift, free wheelchairs — but it costs the swim twenty minutes and it is not what the waterfall is on this itinerary for. No car is held today: Jungmun is a resort, cars circulate, and the whole day's driving comes to about ₩40,000.",
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
        depart: "07:45",
        arrive: "08:45",
        caution:
          "This is the fact that reshapes the whole day, and no brief mentions it: the walk from the ship to immigration is about 1,200 metres, the walkway runs intermittently to manage crowding at the exits, and you do it twice. That is roughly 2.4 km of corridor before a single metre of sightseeing. Do not decline any shuttle, paid or free. Sit down at the gate before you do anything else — and if immigration has run long or it is raining, tell the driver 서귀포매일올레시장 instead: a 620-metre covered arcade eighteen minutes away, step-free, with three accessible toilets and somewhere to sit down, which you can leave whenever you like.",
        note:
          "Korea is a separate entry: fingerprints and a facial scan, at a staffed counter. Gangjeong's automated gates will not help — Canada is not on the eligible list. Taxis rank outside the gate beside the Jeju Global Taxi desk, and Kakao T takes international cards. Going at a quarter to eight rather than at nine is what buys the whole day its margin: it is the only slack this port has, and it sits at the front.",
      },
      {
        mode: "taxi",
        from: "Gangjeong cruise port gate",
        to: "Cheonjeyeon Falls, west gate",
        means:
          "Kakao T or k.ride from the rank outside the gate. Show the driver 천제연폭포 — and ask for the west ticket booth on the Jungmun resort side, the one nearest Yeomiji, not the main east entrance.",
        duration: "18 min",
        minutes: 18,
        distance: "10.6 km",
        depart: "08:50",
        arrive: "09:08",
        arrivesAt: "cheonjeyeon-waterfall",
        note: "Roughly ₩15,000–20,000. No need to hold this car — Jungmun is a resort with hotels on every corner and cars circulating all day, so you hail the next one when you are ready.",
      },
      {
        mode: "stay",
        from: "Cheonjeyeon Falls",
        to: "Seonimgyo, and the seven who come down at midnight",
        means:
          "₩2,500 each. Cross the arch over the gorge and look down on the second falls — thirty metres of white water into a ravine ten degrees cooler than the road. Along the bridge's flank, carved in stone, seven heavenly women fly in trailing ribbons with instruments in their hands.",
        duration: "40 min",
        minutes: 40,
        depart: "09:10",
        arrive: "09:50",
        note:
          "The bridge is the whole prize and it is at the top, so this is a there-and-back rather than the full circuit. Nine in the morning is the coolest hour you will get ashore, and the beach has no lifeguards until ten anyway — so this slot was otherwise going to be spent waiting.",
        caution:
          "Ask at the west booth before you buy whether Seonimgyo itself is step-free, and take a straight answer for an answer: the surveyed accessibility record for this gorge could not be confirmed, and most of what is published online actually describes Cheonjiyeon, a different waterfall 12.7 km away whose name differs by one syllable. If they hesitate, the falls are visible from the rim and the full circuit — about 1.5 km and roughly 300 steps — is not the plan in any case. The first fall only runs after heavy rain; the second flows year round.",
      },
      {
        mode: "taxi",
        from: "Cheonjeyeon Falls",
        to: "Jungmun Saekdal Beach car park",
        means:
          "A couple of minutes down the hill inside the same resort complex. Give the driver 중문색달해수욕장 주차장.",
        duration: "6 min",
        minutes: 6,
        distance: "1.8 km",
        depart: "09:55",
        arrive: "10:01",
        note: "About ₩5,000. Hail it at the falls car park or on the app — you are inside a resort, not out in the country.",
      },
      {
        mode: "walk",
        from: "The car park",
        to: "Down to the sand",
        means:
          "A ramp rather than steps, at about one in twelve — 250 to 700 metres depending which car park the driver stops at, dropping 30 to 50 metres to the water. If he will take you down to the lowest lot at 33.24519, 126.40504 you halve the climb back.",
        duration: "12 min down",
        minutes: 12,
        distance: "250–700 m, dropping 30–50 m",
        depart: "10:05",
        arrive: "10:17",
        arrivesAt: "jungmun-beach",
        note:
          "Free to enter. Changing rooms and toilets on site; showers are ₩2,000 and cold only, so bring a towel and something dry to put on. No lockers are confirmed anywhere — leave anything you would mind losing on the ship. Parasols ₩20,000 if you want shade.",
      },
      {
        mode: "stay",
        from: "Jungmun Saekdal Beach",
        to: "The swim, and the sound the divers make",
        means:
          "Black, grey, red and white volcanic sand under basalt cliffs, a sea cave fifteen metres tall at the east end, and haenyeo working the water offshore. Eighty minutes in and out of the water, which is what the whole day was built for — and twenty more than the garden version of this day allowed.",
        duration: "1 h 20 min",
        minutes: 80,
        depart: "10:20",
        arrive: "11:40",
        caution:
          "Three things that matter here. The beach only operates 10:00–19:00 and there are no lifeguards outside that, which is why nothing on this day tries to get you here earlier. It is split in half during the season — a swimming zone and a surfing zone — and you stay in the swimming half. And Jungmun is one of about ten Korean beaches with real-time rip-current monitoring: the rips are strong, entry is banned outright in the marked zone near the entrance, and the standing advice is to stay where you can touch the bottom. Jeju also raised its jellyfish alert in 2026 and someone was stung here that summer — check the boards and ask the lifeguards on the day.",
      },
      {
        mode: "walk",
        from: "The sand",
        to: "Back up to the car park",
        means: "The same ramp, the other way, in the middle of the day.",
        duration: "15 min up",
        minutes: 15,
        distance: "250–700 m, climbing 30–50 m",
        depart: "11:40",
        arrive: "11:55",
        note:
          "Longer coming up than going down, and it has its own row because it is the single hardest fifteen minutes of the day — 50 vertical metres, wet, in thirty degrees. Take it slowly; nothing is waiting on you.",
      },
      {
        mode: "stay",
        from: "A Jungmun beach cafe",
        to: "Lunch, out of the sun, for as long as you like",
        means: "Three to five minutes from the car park, step-free, seated, air-conditioned, sea views.",
        duration: "50 min",
        minutes: 50,
        depart: "12:00",
        arrive: "12:50",
        note: "Everything demanding is now behind you. This is where the day's spare half hour lives if you want to spend it.",
      },
      {
        mode: "taxi",
        from: "Jungmun",
        to: "Gangjeong cruise port gate",
        means: "Kakao T or k.ride from the resort — cars circulate here all day.",
        duration: "15 min",
        minutes: 15,
        distance: "10.8 km",
        depart: "12:50",
        arrive: "13:05",
        note: "About ₩15,000–20,000 again, so roughly ₩40,000 for the whole day's driving.",
        caution: "Do not gamble the return on the free shuttle. Order the car before you leave the cafe, not at the kerb.",
      },
      {
        mode: "walk",
        from: "Port gate",
        to: "Stateroom",
        means: "Korean exit formalities, security screening, then the 1,200-metre corridor again.",
        duration: "55 min",
        minutes: 55,
        distance: "about 1.2 km",
        depart: "13:05",
        arrive: "about 14:00",
        note:
          "Costed at fifty-five minutes, not the forty-five an earlier version allowed — this is the same corridor as the morning plus exit formalities and a security screen, and it is the last thing standing between you and the ship. Aboard about two: half an hour inside our own deadline, an hour and a half inside the ship's, and two hours before she sails.",
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
      "Three dragons before lunch, and no climbing required for any of them. The Dragon Palace Gate, seen whole from the forecourt — the two National Treasures behind it are up forty or fifty worn stone steps with no confirmed handrail, so treat those as a bonus rather than the plan. Then the Kunchi dragon-dance pair, which live indoors at Glover Garden through the summer rather than at Suwa Shrine. Then Chinatown's Seiryū gate at pavement level. Glover Garden's hill is handled by a free public lift the brief has never heard of — and there is one trap it also misses: Gate 1 has no taxi access, so the way out is 200–300 metres downhill on cobbles to a road a car can use.",
    legs: [
      {
        mode: "walk",
        from: "Stateroom",
        to: "Terminal hall, Matsugae",
        means: "Corridor, lift down seven decks, gangway onto the apron, then into the terminal.",
        duration: "12–18 min",
        minutes: 15,
        distance: "about 400 m",
        depart: "07:00",
        arrive: "07:15",
        caution:
          "A Diamond Princess call empties well over two thousand people onto one pier road between 07:45 and 09:00. Have the shore excursions desk book a car for 08:10, and sit in the terminal's air conditioning rather than stand in the queue outside.",
      },
      {
        mode: "stay",
        from: "Terminal hall",
        to: "Cleared back into Japan",
        means:
          "Immigration and customs face to face in the terminal, because the previous port was foreign: a fresh landing seal, fingerprints and a photo, taken group by group.",
        duration: "30 min",
        minutes: 30,
        depart: "07:15",
        arrive: "07:45",
        note:
          "The whole ship is cleared individually, so nobody is out on the street at 07:00 whatever the gangway sign says. Worth knowing and never advertised: the municipal car-park building beside the terminal lends wheelchairs and pushchairs free, and has a wheelchair-rated lift and an accessible toilet. If either of you would rather be pushed today than walk, collect one before you get in a taxi.",
      },
      {
        mode: "taxi",
        from: "Matsugae terminal",
        to: "Sōfuku-ji, the Ryūgū-mon",
        means:
          "City taxi, 2.6 km. Show the driver: 崇福寺、鍛冶屋町7-5。三門前の右手の拝観者用無料駐車場までお願いします。少し待っていてください — into the free visitor car park to the right of the gate, and please wait.",
        duration: "10–15 min",
        minutes: 15,
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
        depart: "08:25",
        arrive: "09:10",
        arrivesAt: "sofukuji-ryugumon",
        note:
          "Forty-five minutes, and the car waits through all of it. Those two upper halls are National Treasures: the Daiippō-mon was cut and fitted in China in the 1690s, shipped over in pieces by junk and raised here in 1696, and its underside is a honeycomb of brackets in vermilion and gold. The Daiyūhōden dates from 1646. Mazu keeps her own hall off to one side — the same sea goddess you met in Yokohama on embarkation morning.",
        caution:
          "There is no way past the gate except the stairs — commonly given as forty to fifty of them — and no handrail is confirmed. Worn stone, and 31 °C by mid-morning, which is exactly why this is the 08:25 stop rather than the noon one. Decide at the bottom, not halfway up: the Ryūgū-mon itself is fully visible from the forecourt, and if you stop there the forty-five minutes is a comfortable look at the gate rather than a climb against a clock.",
      },
      {
        mode: "taxi",
        from: "Sōfuku-ji",
        to: "Glover Sky Road lower entrance, Ishibashi",
        means: "City taxi to the foot of the free public lift. Not to Gate 2 by road, which is twice as long over a winding hill.",
        duration: "8–11 min",
        minutes: 10,
        distance: "about 2 km",
        depart: "09:15",
        arrive: "09:25",
        caution:
          "The earlier version of this day sent the car away at 08:50, which is twenty minutes before a forty-five-minute visit beginning at 08:25 can possibly end. Tell the driver 09:15.",
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
        depart: "09:25",
        arrive: "09:30",
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
        depart: "09:30",
        arrive: "09:45",
        note:
          "DECISION POINT, and make it here rather than earlier: if legs or heat are bad today, stop. Turn round, ride the lifts back down, and take a taxi from Ishibashi straight to Chinatown — the row below is the one to skip, and skipping it costs you nothing but the Kunchi pair. That is a complete visit for fifteen minutes of flat walking, and it includes the best view in Nagasaki.",
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
        depart: "09:45",
        arrive: "11:00",
        note:
          "It finishes indoors, air-conditioned and step-free, in the 長崎伝統芸能館 — which holds the 白龍 and the 青龍, the actual Kunchi dragon-dance dragons, included in your ticket. In July they live here rather than at Suwa Shrine, which is the reason not to drive across the city looking for them. Kept as a counted leg rather than an option because the whole day has an hour of margin behind it and because the dragons are the reason to be here — but the decision point above is real, and turning back is a complete day too.",
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
        depart: "11:00",
        arrive: "11:08",
        caution:
          "Nobody tells you this and it is the day's real trap: Gate 1 is not a taxi rank. The city confirms set-down at Gate 2 only, the garden has no car park, and you come out at the top of a pedestrian slope. Book a car to meet you at Ōura Tenshudō-shita for 11:15, or have a shop call one. And decline Ōura Church on the way past — the city is blunt that there is no way in other than a long staircase.",
      },
      {
        mode: "taxi",
        from: "Ōura Tenshudō-shita",
        to: "Shinchi Chinatown",
        means: "Six to eight minutes onto dead-flat reclaimed land.",
        duration: "8 min",
        minutes: 8,
        depart: "11:15",
        arrive: "11:23",
      },
      {
        mode: "stay",
        from: "Shinchi Chinatown",
        to: "Under the Seiryū-mon",
        means:
          "Standing under the Azure Dragon gate on the east side — pavement level, no steps, no ticket. Your third dragon of the morning, after the palace gate and the Kunchi pair.",
        duration: "15 min",
        minutes: 15,
        depart: "11:25",
        arrive: "11:40",
        note:
          "Given its own row because the old plan promised ten minutes here inside a seven-minute gap. Fifteen is enough to stand under it, photograph it and cross the road.",
      },
      {
        mode: "stay",
        from: "Keikaen, Shinchi-machi",
        to: "Lunch, indoors, through the worst of the heat",
        means:
          "京華園 — the one Chinatown restaurant Nagasaki City's own barrier-free survey certifies: ramp, wheelchair-rated lift, barrier-free toilet, flat access, automatic doors. Lunch to 15:00, last entry 14:30.",
        duration: "1 h 15 min",
        minutes: 75,
        depart: "11:40",
        arrive: "12:55",
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
        arrive: "13:08",
      },
      {
        mode: "walk",
        from: "Matsugae terminal",
        to: "Stateroom",
        means: "Terminal security and Medallion re-boarding, gangway, lift up seven decks.",
        duration: "12–18 min",
        minutes: 18,
        distance: "about 400 m",
        depart: "13:08",
        arrive: "about 13:26",
        note: "Aboard by about half past one — an hour clear of our own deadline, two hours clear of the ship's, and two and a half hours before she sails.",
      },
    ],
  },

  /* ------------------------------------------------------- day 9 — 27 July */
  {
    chapter: "day-9",
    advisory:
      "No port, no gangway, no deadline. The only booking on the whole day is the bath, and it was made on embarkation day rather than today — sea-day passes are the ones that sell out, which is why it has its own row back on the 21st.",
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
        mode: "stay",
        from: "The Izumi bath",
        to: "Cypress, stone, steam and open ocean",
        means:
          "The stool and the hand shower first — wash and rinse completely, twice if you are unsure — then the hinoki tub at about forty-one degrees, with the North Pacific through the glass and nothing on it.",
        duration: "2 h",
        minutes: 120,
        note:
          "The session you paid for is two hours; this row exists so the day is honest about it. The two indoor halves are nude and gender-segregated and the sides swap daily, so check which is which on the door. Only the outdoor tub is mixed, and that one needs swimwear — you cannot share the main baths, so agree a time to meet outside.",
      },
      {
        mode: "walk",
        from: "The Izumi bath",
        to: "Stateroom",
        means: "The same three decks back down.",
        duration: "5–8 min",
        minutes: 7,
        distance: "about 170 m",
      },
    ],
  },

  /* ------------------------------------------------------ day 10 — 28 July */
  {
    chapter: "day-10",
    advisory:
      "Berthing at 06:30 is not walking off at 06:30. Princess's own guidance is that disembarkation starts about two hours after arrival, once the shore authorities release the ship, and it goes by coloured luggage tag — while staterooms have to be empty by 08:00, so there is an hour of sitting in a lounge with your hand luggage that no plan can remove. It is also a turnaround: roughly 2,700 off and 2,700 on. Two things follow. Request the earliest tag colour at the passenger services desk the night before — that is the one lever you have on this morning. And book COCOMO for 11:00, not 10:30: the honest chain gets you to the studio door about half past ten, and a three-hour session that starts the minute you arrive out of breath is not what you are paying for.",
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
        mode: "stay",
        from: "Cabin",
        to: "The colour-group lounge, waiting for your tag",
        means:
          "Staterooms empty at 08:00 and disembarkation is called by luggage-tag colour from about 08:30. You sit with your hand luggage until your colour is called — there is coffee, and there is no way to hurry it.",
        duration: "40 min",
        minutes: 40,
        depart: "07:50",
        arrive: "08:30",
        caution:
          "This is the biggest uncosted variable of the morning and the earlier version of this day left it out entirely. Ask at passenger services the night before for the earliest tag colour: a late colour can put you an hour behind everything below, and the only thing downstream that cannot absorb an hour is a studio booking.",
      },
      {
        mode: "walk",
        from: "The lounge",
        to: "Gangway",
        means: "Corridor to the lift bank, down to the disembarkation deck, scan off.",
        duration: "15–25 min",
        minutes: 20,
        distance: "150–300 m plus several decks",
        depart: "08:30",
        arrive: "08:50",
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
        depart: "08:50",
        arrive: "09:25",
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
        depart: "09:30",
        arrive: "10:45",
        note: "About ¥20,000–25,000 on the meter plus toll, or ¥23,000–35,000 as a fixed private transfer. Book it for 09:30 with a wide window — the tag colour decides when you actually reach the kerb.",
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
        depart: "10:45",
        arrive: "10:48",
        arrivesAt: "asakusa-view-hotel",
        note: "A bag drop rather than a check-in — the room is not yours until 15:00, but the bell desk takes the cases now, and again after check-out tomorrow.",
      },
      {
        mode: "walk",
        from: "Asakusa View Hotel",
        to: "COCOMO, 1-29-8 Asakusa",
        means: "South-east through the Nishi-Asakusa grid, across Kokusai-dōri and along the western edge of the Sensō-ji precinct.",
        duration: "7 min",
        minutes: 7,
        distance: "508 m",
        depart: "10:48",
        arrive: "10:55",
        arrivesAt: "cocomo-makeover",
        caution:
          "The brief says 0.2 km and books a five-minute taxi. It is 508 metres on foot and 1.17 km by road, because the one-way system sends the car the long way round. Walking is faster, cheaper, and the reason an 11:00 booking works at all.",
      },
      {
        mode: "steps",
        from: "Street",
        to: "COCOMO reception, 2F",
        means: "One floor up.",
        duration: "2 min",
        minutes: 2,
        depart: "10:55",
        note: "No lift is documented anywhere. Ask when you book.",
      },
      {
        mode: "steps",
        from: "Reception, 2F",
        to: "The Japanese-garden studio, 4F",
        means: "Two more floors to the full-scale set with the drum bridge and the tea room.",
        duration: "3 min",
        minutes: 3,
        note: "Four flights from the street in total, in full costume for the second half of it — and four flights back down at the end, which is the harder direction in a hikizuri.",
      },
      {
        mode: "stay",
        from: "Studio cocomo",
        to: "Three hours of becoming other people",
        means:
          "Oshiroi laid on cold and white, eyebrows redrawn, the katsura pinned on, silk on silk until the hem trails — and laced scales, the dō strapped down, the kabuto last. Then the camera.",
        duration: "3 h",
        minutes: 180,
        depart: "11:00",
        arrive: "14:00",
        note:
          "The load-bearing block of the whole afternoon, and it had no row until this pass — the day was costed as five minutes of stairs. Book it for 11:00: the chain above reaches the studio at about 11:00 exactly, and the earlier 10:30 booking could only be met by a morning that went perfectly. Settle one thing when you book — whether your plan includes the outdoor location shoot around the temple and the riverside. Stone paving in geta is a different proposition from a studio floor, and it happens inside these three hours rather than after them.",
      },
      {
        mode: "walk",
        from: "COCOMO",
        to: "Lunch by the Kaminarimon",
        means: "South-west through the Asakusa 1-chōme grid, straight to the gate.",
        duration: "3 min",
        minutes: 3,
        distance: "226 m",
        depart: "14:05",
        arrive: "14:08",
        caution:
          "The brief sends you back to the hotel first — 508 metres in the wrong direction, to a room you cannot check into until 15:00 — and then on to a restaurant that was 226 metres from where you were standing. Go direct.",
      },
      {
        mode: "stay",
        from: "By the Thunder Gate",
        to: "A late lunch, and the first sit-down since the ship",
        means: "Anywhere on the Kaminarimon frontage. You have been in costume since eleven and on your feet since seven.",
        duration: "50 min",
        minutes: 50,
        depart: "14:10",
        arrive: "15:00",
      },
      {
        mode: "walk",
        from: "Kaminarimon",
        to: "Asakusa View Hotel, for the 15:00 check-in",
        means: "North-west back to Kokusai-dōri.",
        duration: "10 min",
        minutes: 10,
        distance: "752 m",
        depart: "15:00",
        arrive: "15:10",
      },
      {
        mode: "stay",
        from: "Lobby",
        to: "The room, and the window",
        means: "Check in; the bell desk brings the stored luggage up. Then the two chairs in the bay by the glass, which is what the room is for.",
        duration: "45 min",
        minutes: 45,
        depart: "15:10",
        arrive: "15:55",
        note:
          "Sensō-ji is floodlit from below and the Skytree changes colour on its own schedule past the river — this window is the only place either of them is on the itinerary after dark, so the evening does not need a leg to reach them.",
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
        depart: "18:00",
        arrive: "18:07",
        note:
          "Flamingo is the pick because it takes cards and it is open on a Wednesday. The famous one, Bar Nemo, founded 1960 with something like fourteen thousand bottles, is cash only and every one of its twenty seats is a smoking seat — which settles it.",
      },
    ],
  },

  /* ------------------------------------------------------ day 11 — 29 July */
  {
    chapter: "day-11",
    advisory:
      "The most important day on this page, because it is the only one where being late cannot be fixed by a taxi. Three corrections. Check-out is 12:00, not the 13:00 the brief plans for — so check out before the temple and leave the bags at the bell desk. There is no 13:15 airport coach: the runs are 06:45, 07:45, 11:45, 12:45, 13:45 and 15:45. And the 13:45 this day used to be built on is the wrong one — it reaches Terminal 1 at 16:00, which puts you at the gate at about 17:29 for a 17:35 departure, six minutes before pushback and well after boarding has closed. There is no reason to be on it. Sensō-ji's main hall opens at 06:00 and the bell desk holds bags after check-out, so a nine o'clock start gets the whole temple morning done by eleven and puts you on the 12:45, into Terminal 1 at 14:35, with three hours before the flight and the 13:45 still behind you as a fallback.",
    legs: [
      {
        mode: "walk",
        from: "The room",
        to: "1F bell desk — check out, store the bags, reserve the coach seat",
        means: "Check out before going to the temple. The bell desk holds luggage after check-out, and the airport coach seat — reserved two months ago — is confirmed at the same desk.",
        duration: "15 min",
        minutes: 15,
        depart: "08:45",
        arrive: "09:00",
        caution:
          "Check-out is 12:00 noon. The brief's 13:00 check-out is an hour past the deadline; at 13:00 you can only collect bags, not settle the room. Doing it at a quarter to nine, before the temple, means the rest of the day has no hotel business left in it.",
      },
      {
        mode: "walk",
        from: "Asakusa View Hotel",
        to: "Kaminarimon",
        means: "Flat paved streets south-east off Kokusai-dōri.",
        duration: "10 min",
        minutes: 10,
        distance: "752 m",
        depart: "09:00",
        arrive: "09:10",
        arrivesAt: "kaminarimon-gate",
        caution:
          "The brief has the hotel \"steps from Sensō-ji\". It is close to the main hall, but a full 752 metres from the southern gate where the visit starts.",
      },
      {
        mode: "stay",
        from: "Kaminarimon",
        to: "The lantern, and the dragon underneath it",
        means:
          "Raijin on the left, Fūjin on the right, and the thing almost nobody does: step under the seven-hundred-kilogram lantern, stop dead, and look up into its base at the dragon carved on the underside.",
        duration: "15 min",
        minutes: 15,
        depart: "09:10",
        arrive: "09:25",
      },
      {
        mode: "walk",
        from: "Kaminarimon",
        to: "Hōzōmon, along Nakamise-dōri",
        means: "The pedestrian approach — flat, level stone paving, about 89 stalls running due north.",
        duration: "4 min unimpeded, 10–15 min in a late-July crowd",
        minutes: 20,
        distance: "312 m gate to gate",
        depart: "09:25",
        arrive: "09:45",
        note: "Twenty minutes, because nobody walks Nakamise in four — there is ningyō-yaki to eat hot and standing up, and this is the last of Japan you will see. There are side alleys behind the stalls if the crush is too much. Step-free the whole way, including under Hōzōmon.",
      },
      {
        mode: "walk",
        from: "Hōzōmon",
        to: "The Shinryū dragon fountain",
        means: "North into the forecourt, then bearing east to the temizuya pavilion.",
        duration: "2 min",
        minutes: 2,
        distance: "164 m",
        depart: "09:45",
        arrive: "09:47",
        arrivesAt: "sensoji-dragon-fountain",
        note: "A deliberate detour off the centre line, not something you pass through.",
      },
      {
        mode: "stay",
        from: "The temizuya",
        to: "Between two dragons, washing your hands",
        means:
          "Sakara Ryūō reared up in bronze over the octagonal basin, cast in 1903 — and directly above your head, an ink dragon uncoiling across the pavilion ceiling. Do the temizu properly: right hand, left hand, the cupped palm, then tip the ladle upright.",
        duration: "15 min",
        minutes: 15,
        depart: "09:47",
        arrive: "10:02",
        caution: "The water supply here has been suspended before. The basin may be dry or restricted — the two dragons are the point either way.",
      },
      {
        mode: "walk",
        from: "The fountain",
        to: "Foot of the Main Hall steps",
        means: "West across the paved forecourt, past the great bronze incense burner — pull the smoke over whatever hurts.",
        duration: "5 min",
        minutes: 5,
        distance: "139 m",
        depart: "10:02",
        arrive: "10:07",
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
        depart: "10:07",
        arrive: "10:12",
        arrivesAt: "sensoji-dragon-ceiling",
        note: "The temple publishes no step count. The hall opens at 06:00, so nothing here is waiting on you.",
      },
      {
        mode: "stay",
        from: "The outer worship hall",
        to: "The golden dragon, and one last omikuji",
        means:
          "Coins on wood, the rope-bell, incense in every surface, and the hidden Kannon you will never see. Then tip your head back: three panels roughly six metres by five, Dōmoto Inshō's heavenly crowds either side of Kawabata Ryūshi's dragon.",
        duration: "30 min",
        minutes: 30,
        depart: "10:12",
        arrive: "10:42",
        note:
          "Sensō-ji has never softened its odds — about thirty per cent of its slips come out kyō. If the news is bad, fold it and tie it to the rack, and leave the luck in Japan rather than carrying it onto the plane.",
      },
      {
        mode: "lift",
        from: "The Main Hall",
        to: "Back down to the forecourt",
        means: "The same left-side lift, or the front steps.",
        duration: "5 min by the lift, 2 min by the steps",
        minutes: 5,
        depart: "10:42",
        arrive: "10:47",
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
        depart: "10:47",
        arrive: "10:53",
      },
      {
        mode: "stay",
        from: "Asakusa",
        to: "Lunch, and an hour that belongs to nobody",
        means:
          "The temple is done by eleven and the coach does not go until a quarter to one. Eat somewhere near Kokusai-dōri, buy the last of the souvenirs, sit down.",
        duration: "1 h 20 min",
        minutes: 80,
        depart: "11:00",
        arrive: "12:20",
        note:
          "This hour is the whole point of the rebuild. It is not dead time — it is the buffer that means a slow lift at Sensō-ji, a long queue on Nakamise or a late start costs you nothing at all. Spend it if the morning ran smoothly; hand it back to the clock if it did not.",
      },
      {
        mode: "walk",
        from: "Bell desk",
        to: "Coach, hotel driveway",
        means: "Bags retrieved and loaded into the underfloor bay at the kerbside.",
        duration: "15 min",
        minutes: 15,
        distance: "30 m",
        depart: "12:25",
        arrive: "12:40",
        note:
          "Boarding is on the driveway, not in the lobby, and the seat must have been reserved in advance. Be on the driveway with the bags fifteen minutes early, not five — the coaches are not low-floor, folding wheelchairs go in the luggage bay, and motorised ones may be refused.",
      },
      {
        mode: "coach",
        from: "Asakusa View Hotel",
        to: "Narita Terminal 1",
        means:
          "Airport Transport Service limousine coach on the Narita–Kinshichō–Asakusa route. The hotel is the first stop; then Tobu Hotel Levant, Hotel East 21, Tokyo City Air Terminal, then Terminal 3, Terminal 2 and Terminal 1 last.",
        duration: "1 h 50 min",
        minutes: 110,
        distance: "66–69 km",
        depart: "12:45",
        arrive: "14:35",
        note: "¥3,100 each. The hotel's own page still quotes the old ¥2,900.",
        caution:
          "Take this one, not the 13:45. There is no 13:15 departure at all — six runs a day only, 06:45, 07:45, 11:45, 12:45, 13:45 and 15:45, reaching Terminal 1 at 09:00, 10:00, 14:00, 14:35, 16:00 and 18:00. The 13:45 arrives 16:00 and leaves twenty minutes against a bag-drop cut-off and six against the gate; the 12:45 arrives 14:35 and leaves three hours. The published table gives this run 1 h 50 min where the others get 2 h 15 min, so treat 14:35 as the optimistic end. If the morning slips or it is pouring, a fixed-fare airport taxi is the answer rather than a later coach: ¥32,000–35,000 all in from Taitō-ku, door to door, bags never leaving the car, and about 1 h 25 min.",
      },
      {
        mode: "lift",
        from: "Terminal 1 coach bay, 1F",
        to: "Air Canada check-in, 4F South Wing",
        means: "Bags off at the kerb, then the central lifts or escalators near Exits 5–6 up three floors, then across to the Star Alliance zone.",
        duration: "12–15 min",
        minutes: 14,
        distance: "200–400 m and three levels",
        depart: "14:35",
        arrive: "14:49",
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
        depart: "14:49",
        arrive: "about 16:04",
        caution:
          "Two deadlines here, not one, and the old plan only ever checked the first. Air Canada's bag drop closes 60 minutes before departure — 16:35. Boarding a 777-300ER closes around twenty minutes before pushback — about 17:15. Off the 12:45 coach you start check-in at 14:49 and reach the gate about 16:04: an hour and three quarters on the bag drop and an hour and ten at the gate. Off the 13:45 you would start at 16:14 and reach the gate at 17:29, which is six minutes before departure and after the door has shut.",
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
  let justArrived = false;
  for (const leg of day.legs) {
    if (leg.aside) continue;

    /* The visit itself is not part of getting anywhere. Once a leg has
       delivered you somewhere, the `stay` rows that immediately follow are
       you standing in that place — so they belong to neither chain, and
       counting them made the aquarium read "2 h 15 min from the pier" when
       the pier is a fifteen-minute walk away. Waiting rows that are genuinely
       part of a journey — border clearance, a disembarkation lounge — do not
       follow an arrival, so they still count. */
    if (justArrived && leg.mode === "stay") continue;
    justArrived = false;

    sinceLastStop.push(leg);
    if (leg.arrivesAt) {
      byDestination.set(leg.arrivesAt, sinceLastStop);
      sinceLastStop = [];
      justArrived = true;
    }
  }
}

export function arrivalLegs(destinationId: string): TransitLeg[] {
  return byDestination.get(destinationId) ?? [];
}
