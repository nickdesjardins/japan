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
  /** The one to set an alarm for. */
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
    ],
  },

  /* ------------------------------------------------------- day 3 — 21 July */
  {
    chapter: "day-3",
    advisory:
      "This is the day that does not fit. Both Enoshima drives are booked at 45 minutes and neither can be done in under about 70; the island is 791 steps one way, not the flat walk the brief describes; the Escar does not start until 08:50 and the caves do not open until 09:00. Worked through honestly, you reach the gangway at roughly 14:00 — on top of the all-aboard deadline, with nothing in hand. Leaving the hotel at 06:45, or dropping either the caves or Chinatown, is what buys the day back.",
    legs: [
      {
        mode: "taxi",
        from: "Hyatt Regency Yokohama",
        to: "Enoshima island car park",
        means:
          "Pre-booked hire car via Route 1 through Hodogaya and Totsuka, then Route 467 and Route 134, crossing the Enoshima Ōhashi road bridge onto the island itself.",
        duration: "1 h 20 min",
        minutes: 80,
        distance: "30.2 km",
        caution:
          "The brief allows 45 minutes. The standard routing figure is 57, and a 07:45 weekday start in July sits squarely in the Route 1 peak — 70 to 90 minutes is the real band. Have the car cross onto the island; it deletes the bridge walk entirely.",
      },
      {
        mode: "walk",
        from: "Island car park",
        to: "The bronze torii, foot of Nakamise-dōri",
        means: "Level tarmac past the bus rotary.",
        duration: "5 min",
        minutes: 5,
        distance: "250 m",
        note: "This is the only genuinely flat stretch of the island, and it is 250 metres long.",
      },
      {
        mode: "lift",
        from: "The bronze torii",
        to: "Hetsunomiya, the first shrine",
        means: "The Enoshima Escar — Japan's first outdoor escalator. ¥500 for the full three-section run, ¥260 for section one. Stone steps alongside if you would rather.",
        duration: "6 min",
        minutes: 6,
        distance: "200 m",
        caution:
          "The Escar does not open until 08:50. The brief has you standing at the dragon shrine at 08:45, which is before the machine that gets you there starts running.",
      },
      {
        mode: "lift",
        from: "Hetsunomiya",
        to: "Nakatsunomiya",
        means: "Escar section two.",
        duration: "6 min",
        minutes: 6,
        distance: "200 m",
        note: "Twenty-three steps down out of the Hetsunomiya precinct before you reach it. Even the assisted route is not step-free.",
      },
      {
        mode: "walk",
        from: "Nakatsunomiya",
        to: "Okutsunomiya and the Ryūgū dragon hall",
        means: "Escar section three to Samuel Cocking Garden, then on foot over the ridge past the Sea Candle and down the far side.",
        duration: "14 min",
        minutes: 14,
        distance: "500 m",
        arrivesAt: "enoshima-dragon-shrine",
        caution:
          "The Escar covers 46 metres of a 106-metre climb. Everything past Cocking Garden is unassisted. And the hall you arrive at is Ryūgū, the Wadatsumi shrine built in 1993 — Gozuryū, the five-headed dragon of Enoshima's founding legend, is enshrined not here but at Ryūkō Myōjin in Koshigoe, 2.5 km off the island. The brief sends you to the wrong one by name.",
      },
      {
        mode: "walk",
        from: "Okutsunomiya",
        to: "Ryūren-no-Kane, the dragon's love bell, and back",
        means: "A signed path branching left just past the shrine into Ryūnogaoka woods. Gently stepped.",
        duration: "10 min",
        minutes: 10,
        distance: "350 m there and back",
      },
      {
        mode: "steps",
        from: "Okutsunomiya",
        to: "Iwaya sea caves, via Chigogafuchi",
        means: "Two hundred-odd stone steps down to the wave-cut shelf, then the coastal walkway and the vermilion Iwaya bridge to the ticket window.",
        duration: "20 min",
        minutes: 20,
        distance: "600 m",
        arrivesAt: "enoshima-iwaya-caves",
        caution:
          "The brief calls the island \"a scenic, flat walk\". The surveyed route from the bronze torii to the caves is 791 steps one way, and this descent alone is two hundred-plus, described in Japanese sources as quite steep. There is no ramp and no lift. Caves open at 09:00.",
      },
      {
        mode: "walk",
        from: "Cave entrance",
        to: "Cave exit, both caverns walked",
        means: "First cave 152 m deep, hand-held candle lanterns issued partway in. Then out, across the open coastal walkway, into the 56 m second cave where the dragon is.",
        duration: "30 min",
        minutes: 30,
        distance: "500 m",
        note: "The two caverns are not joined. You come out of one, cross weather, and go into the other. Damp, uneven, low-headroom throughout.",
      },
      {
        mode: "boat",
        from: "Chigogafuchi pier, below the caves",
        to: "Foot of Benten Bridge",
        means: "The Bentenmaru launch. ¥500 each, cash only.",
        duration: "6 min",
        minutes: 6,
        distance: "1.2 km",
        note:
          "This is the single best thing on the day and the brief never mentions it: it is the only way back that is not the 200 steps.",
        caution:
          "Weekday service runs roughly 11:00 to 14:30, and whether it sails at all is confirmed only around 10:30 on the morning — it stops for strong wind, high waves or low tide. The brief's 10:15 departure predates the first boat.",
      },
      {
        mode: "steps",
        from: "Iwaya caves",
        to: "Island car park, on foot",
        means: "The fallback if the boat is cancelled: back up the two hundred steps, over the ridge past Okutsunomiya and Cocking Garden, then down through the shrines.",
        duration: "45 min",
        minutes: 45,
        distance: "1.6 km",
        aside: "instead",
        caution:
          "The Escar runs upward only, and it is on the wrong side of the hill anyway. Roughly 60 metres of climb to regain, in July.",
      },
      {
        mode: "taxi",
        from: "Enoshima",
        to: "Yokohama Chinatown",
        means: "The same held car, back the way it came.",
        duration: "1 h 5 min",
        minutes: 65,
        distance: "30.2 km",
        arrivesAt: "yokohama-chinatown",
        caution:
          "Again booked at 45 minutes, again nearer 65. And there is no taxi rank at Enoshima or Katase-Enoshima — dispatch is by app or phone only, so the outbound driver has to be paid to wait about two and a quarter hours, plus ¥400 an hour of island parking with no daily cap. The brief prices none of this.",
      },
      {
        mode: "walk",
        from: "Kanteibyō",
        to: "Uranai Yakata Airi",
        means: "Chinatown's inner lanes — level, but narrow and solid with people at lunchtime.",
        duration: "5 min",
        minutes: 5,
        distance: "300 m",
      },
      {
        mode: "walk",
        from: "Chinatown",
        to: "Hyatt Regency Yokohama, to collect the luggage",
        means: "Out through Chinatown's east side into the Yamashita-chō block. Nothing to carry — the concierge has the bags.",
        duration: "7 min",
        minutes: 7,
        distance: "500 m",
        caution:
          "The brief books a five-minute taxi for this. Walking is faster: the lanes are narrow, one-way and partly pedestrianised, so a car has to go round the outside.",
      },
      {
        mode: "taxi",
        from: "Hyatt Regency Yokohama",
        to: "Ōsanbashi terminal, 2F set-down",
        means: "Private taxi with the luggage along the Yamashita Park frontage and Kaigan-dōri, then up the vehicle ramp.",
        duration: "7 min",
        minutes: 7,
        distance: "1.3 km",
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
        note: "Ōsanbashi is a long finger pier and the ship is 290 metres. The walk is real before you even join a queue.",
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
    advisory: "Toba: anchored 07:00, away 16:00. All-aboard about 15:30.",
    legs: [
      {
        mode: "walk",
        from: "Stateroom",
        to: "Tender platform, Deck 4",
        means: "Corridor and lift down to the shell door. Numbered tender tickets are issued in a lounge and called over the PA.",
        duration: "10 min after 09:30 — 40 min in the ticketed first wave",
        minutes: 10,
        distance: "250 m",
        note:
          "Once the morning rush clears, tickets stop being needed and you wait where you like. For an unhurried day, going ashore around 09:30 deletes this queue completely.",
      },
      {
        mode: "tender",
        from: "At anchor, Toba Bay",
        to: "Toba Marine Terminal pontoon",
        means: "The ship's own tender. No quay at Toba takes a 290-metre ship, so this is the only way in.",
        duration: "12 min",
        minutes: 12,
        distance: "2 km",
        note: "The brief's ten minutes is water time. Twelve is door to door, including coming alongside.",
      },
      {
        mode: "walk",
        from: "Pontoon",
        to: "Taxi rank, terminal forecourt",
        means: "Floating gangway, then through the circular terminal hall past the ferry counters.",
        duration: "4 min",
        minutes: 4,
        distance: "200 m",
        note: "The gangway angle follows the tide and can be a real ramp at low water.",
      },
      {
        mode: "taxi",
        from: "Toba Marine Terminal",
        to: "Futami Okitama Shrine, main torii",
        means: "Pre-booked private taxi on Route 42, then the toll-free Ise–Futami–Toba Line.",
        duration: "15 min",
        minutes: 15,
        distance: "8 km",
        note:
          "The brief's fifteen minutes is right — the one detail it gets wrong is \"along the coast\". The quick way cuts inland. Around ¥2,500–3,000.",
      },
      {
        mode: "walk",
        from: "Main torii",
        to: "Shrine hall, and the wedded rocks beyond it",
        means: "The sandō along the seawall, surfaced with deliberately thin gravel kept shallow for wheelchairs. No steps.",
        duration: "3 min",
        minutes: 3,
        distance: "150 m, up to 350 m",
        arrivesAt: "meoto-iwa",
        note:
          "150 m only holds if the driver stops on the approach itself. The marked accessible bay is about 200 m out and is hard to spot.",
      },
      {
        mode: "walk",
        from: "Meoto Iwa",
        to: "Ryūgū-sha",
        means: "The east sandō — paved, a little uneven, gently rising, with a steeper pinch either side of Misogi bridge.",
        duration: "5 min",
        minutes: 5,
        distance: "300 m",
        arrivesAt: "ryugusha-shrine",
        note: "\"Adjoining\", in the brief. It is 300 metres, and the bridge is the only real gradient at Futami.",
      },
      {
        mode: "walk",
        from: "Ryūgū-sha",
        to: "Meoto Iwa east entrance, for the car",
        means: "Straight on off the sandō to the coach lay-by.",
        duration: "3 min",
        minutes: 3,
        distance: "150 m",
        note:
          "Ask the driver to reposition east and Futami becomes a one-way walk-through. If he will not, it is 450 m back over the gravel to the main torii.",
      },
      {
        mode: "taxi",
        from: "Futami",
        to: "Toba Marine Terminal",
        means: "The same car, contracted to wait and return.",
        duration: "15 min",
        minutes: 15,
        distance: "8 km",
        note: "Nothing runs on spec in Futami-chō, and Toba's fleet is small against 2,700 landed passengers. Contract the wait before you leave the terminal.",
      },
      {
        mode: "walk",
        from: "Terminal forecourt",
        to: "Tender queue, pontoon",
        means: "Back through the hall to the quay, cruise card scanned and bags checked by ship's security.",
        duration: "6 min",
        minutes: 6,
        distance: "200 m",
      },
      {
        mode: "tender",
        from: "Toba Marine Terminal",
        to: "Diamond Princess at anchor",
        means: "Return tender. No ticket needed coming back, but the queue on the pontoon builds through the last two hours.",
        duration: "30 min including the queue",
        minutes: 30,
        distance: "2 km",
        caution:
          "Toba's anchorage is exposed and tendering gets suspended in wind or swell. Be back with an hour in hand, not ten minutes.",
      },
      {
        mode: "walk",
        from: "Deck 4",
        to: "Stateroom",
        means: "Shell door, lift lobby, corridor.",
        duration: "8 min",
        minutes: 8,
        distance: "250 m",
      },
    ],
  },

  /* ------------------------------------------------------- day 5 — 23 July */
  {
    chapter: "day-5",
    advisory:
      "Kōchi: alongside 09:00, away 17:00, all-aboard about 16:30. Nothing can happen ashore before roughly 09:30 — and Katsurahama uses under two hours of an eight-hour call, so the day has a great deal of slack the brief never spends.",
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
        to: "Gangway",
        means: "Corridor and lift to the disembarkation deck.",
        duration: "12 min",
        minutes: 12,
        distance: "250 m",
        note: "The cost here is congestion right after the gangway opens.",
      },
      {
        mode: "walk",
        from: "Gangway",
        to: "Cruise terminal and taxi rank",
        means: "Across the open quay apron to the single-storey terminal.",
        duration: "6 min",
        minutes: 6,
        distance: "about 250 m",
        note: "An unshaded working apron in late July, now crossed at about a quarter to ten rather than early morning.",
      },
      {
        mode: "taxi",
        from: "Kōchi Shinkō cruise terminal",
        to: "Katsurahama Park car park",
        means: "Pre-booked taxi west on the port road, over Urado Ōhashi.",
        duration: "12 min",
        minutes: 12,
        distance: "5 km",
        note: "About ¥2,000. There is no bus and no railway anywhere near this terminal, so the car has to be contracted to wait.",
        caution: "The brief says twenty minutes. The port's own survey says about ten.",
      },
      {
        mode: "steps",
        from: "Car park",
        to: "The sand",
        means: "Down through the shops and rest house. Ramped walkways exist alongside — ask for them.",
        duration: "4 min",
        minutes: 4,
        distance: "200 m",
        arrivesAt: "katsurahama-beach",
        caution:
          "There are slopes and stairs between the car park and the beach, before any of the climbing starts. No vehicle reaches the sand.",
      },
      {
        mode: "walk",
        from: "North-east end of the beach",
        to: "Foot of Ryūō-misaki",
        means: "The arc of coarse five-coloured shingle between the two headlands.",
        duration: "8 min",
        minutes: 8,
        distance: "about 300 m",
        note: "Swimming is prohibited here and signposted as such. People have drowned on this beach.",
      },
      {
        mode: "steps",
        from: "Ryūgū bridge",
        to: "Watatsumi Shrine — the Ryūō-gū",
        means: "Over the little Dragon Palace bridge onto the promontory, then a steep stone stairway rebuilt with heavy retaining walls after the 2018 typhoon.",
        duration: "6 min",
        minutes: 6,
        distance: "80 m",
        arrivesAt: "ryuotsu-shrine",
        caution:
          "Accounts differ sharply — one visitor counts about thirty steps, another describes steep stairs continuing for a while. No official count exists. Assume the harder reading.",
      },
      {
        mode: "steps",
        from: "The shrine",
        to: "Ryūō-misaki lookout",
        means: "A further, steeper flight to the platform with the compass rose.",
        duration: "3 min",
        minutes: 3,
        distance: "40 m",
        aside: "optional",
        note: "The only place that gives you the Pacific and the beach in one view.",
      },
      {
        mode: "walk",
        from: "The cape",
        to: "Waiting taxi, car park",
        means: "Back down the steps, back across the sand, up the ramped walkway.",
        duration: "15 min",
        minutes: 15,
        distance: "about 500 m",
        note: "Slower than the way out — descending those steps takes most people longer than climbing them.",
      },
      {
        mode: "taxi",
        from: "Katsurahama",
        to: "Kōchi Shinkō cruise terminal",
        means: "The same held car back over Urado Ōhashi.",
        duration: "12 min",
        minutes: 12,
        distance: "5 km",
      },
      {
        mode: "walk",
        from: "Terminal",
        to: "Gangway",
        means: "Back across the apron and through the single re-boarding screening line.",
        duration: "10 min",
        minutes: 10,
        distance: "about 250 m",
      },
    ],
  },

  /* ------------------------------------------------------- day 6 — 24 July */
  {
    chapter: "day-6",
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
        caution:
          "No window is published for 24 July 2027 and none can be: the hour is locked to the tide and set per sailing. A March 2027 Diamond Princess sailing schedules the block 11:00–13:00. Take the Patter as the authority, not this page.",
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
    advisory:
      "Korea is a separate country, so this is a full immigration entry taken ashore in the terminal — and neither of the day's two sights is reachable by the \"direct taxi\" the brief promises. No road goes to the Jungmun sand, and Cheonjeyeon is a staircase gorge.",
    legs: [
      {
        mode: "walk",
        from: "Stateroom",
        to: "Gangway",
        means: "Corridors and lift down to the disembarkation deck.",
        duration: "8–12 min",
        minutes: 10,
        distance: "250 m",
      },
      {
        mode: "walk",
        from: "Gangway",
        to: "Gangjeong cruise terminal",
        means: "Open quay apron.",
        duration: "8–15 min",
        minutes: 12,
        distance: "300–600 m",
        caution:
          "How far depends entirely on where along the 1,100-metre quay she ties up, and there is no confirmed covered walkway or moving walk. Budget it as unassisted.",
      },
      {
        mode: "walk",
        from: "Arrivals hall",
        to: "Out through customs",
        means: "Korean quarantine, immigration, customs, then agricultural and livestock quarantine. 38 automated gates.",
        duration: "20 min, up to 45 at peak",
        minutes: 25,
        distance: "200 m",
        note: "The largest unbudgeted block of the day. Pre-submit the e-Arrival card.",
      },
      {
        mode: "walk",
        from: "Customs exit",
        to: "Taxi pick-up, outside the port gate",
        means: "Out through the perimeter of what is still a working naval facility.",
        duration: "5–10 min",
        minutes: 8,
        distance: "200–400 m",
        note:
          "Cars queue outside the gates, not at the terminal door. Whether a pre-booked car may come inside has to be settled with the operator — if not, you walk this twice.",
      },
      {
        mode: "taxi",
        from: "Gangjeong cruise port",
        to: "Jungmun Saekdal Beach car park",
        means: "Pre-booked private car or Kakao T, via Route 1132 and Jungmun-gwangwang-ro.",
        duration: "15–20 min",
        minutes: 17,
        distance: "10.2 km",
        caution:
          "The brief says ten minutes. Routing gives 14.4 with no stops and nothing in the way; ten would need a door-to-door average over 60 km/h.",
      },
      {
        mode: "walk",
        from: "Car park, 35 m up",
        to: "The sand",
        means: "A long descending access path and a ramp, with a low step partway down and blown sand across it.",
        duration: "9–12 min",
        minutes: 10,
        distance: "700 m, dropping 35 m",
        arrivesAt: "jungmun-beach",
        caution: "No road reaches the sand. The brief's \"direct taxi\" stops 700 metres and 35 vertical metres short of it.",
      },
      {
        mode: "walk",
        from: "The access point",
        to: "Along the beach and back",
        means: "Soft multi-coloured volcanic sand. The beach runs 560 m by 50.",
        duration: "20–30 min",
        minutes: 25,
        distance: "about 1.1 km on soft sand",
        note: "25 July is peak Korean beach season and this is an officially operated swimming beach. It will be busy.",
      },
      {
        mode: "walk",
        from: "The sand",
        to: "Car park",
        means: "The same ramp and path, now uphill.",
        duration: "15–20 min",
        minutes: 17,
        distance: "700 m, climbing 35 m",
        caution:
          "Reviewers call the climb back strenuous, and a Jeju afternoon in late July runs 28–30 °C with high humidity. With the stroll before it, this is the hardest sequence of the whole voyage.",
      },
      {
        mode: "taxi",
        from: "Beach car park",
        to: "Cheonjeyeon Falls ticket gate",
        means: "The waiting car, entirely inside the Jungmun resort complex.",
        duration: "4–7 min",
        minutes: 5,
        distance: "1.75 km",
        arrivesAt: "cheonjeyeon-waterfall",
        note:
          "The brief calls this \"a short taxi ride\" and for once that is exactly right. Give the driver 천제연폭포 — Cheonjiyeon, a different falls, is 13 km the other way in Seogwipo city.",
      },
      {
        mode: "steps",
        from: "Ticket gate",
        to: "First falls viewing platform",
        means: "Paved path and steps down into the gorge. Admission about ₩2,500.",
        duration: "4–6 min",
        minutes: 5,
        distance: "about 200 m",
        note: "The first falls only runs after heavy rain. Most days it is a cliff face above an emerald pool.",
      },
      {
        mode: "steps",
        from: "First falls",
        to: "Second falls",
        means: "Back up, then down along the river. Well made, but steep and largely staircase.",
        duration: "8–10 min",
        minutes: 9,
        distance: "270–300 m",
        note: "This is the one that flows year round, and the one worth the descent.",
      },
      {
        mode: "steps",
        from: "Second falls",
        to: "Seonimgyo bridge and the third falls lookout",
        means: "The seven-nymph arch bridge, about 130 m, then roughly 400 m more of mostly stairs.",
        duration: "12–15 min each way",
        minutes: 14,
        distance: "400–530 m",
        aside: "optional",
        note:
          "Probably skippable — though Seonimgyo is the one carved with the seven maidens the whole story is about. It can also be reached from the resort side, which is the low-effort way to the photograph.",
      },
      {
        mode: "steps",
        from: "Second falls",
        to: "Back up to the ticket office",
        means: "Out-and-back the way you came, uphill on staircases.",
        duration: "15–18 min",
        minutes: 16,
        distance: "500 m, climbing 50–60 m",
        caution:
          "The full circuit is about 1.5 km and roughly 300 steps. The brief describes a mythological pool \"accessed entirely via direct taxis\".",
      },
      {
        mode: "taxi",
        from: "Cheonjeyeon Falls",
        to: "Gangjeong cruise port gate",
        means: "The waiting car back via Route 1132.",
        duration: "12–16 min",
        minutes: 14,
        distance: "8.8 km",
        note: "Shorter than the run out — the falls are nearer the port than the beach is.",
      },
      {
        mode: "walk",
        from: "Port gate",
        to: "Stateroom",
        means: "Gate to terminal, Korean exit formalities, security screening, quay, gangway, ship's lift.",
        duration: "25–35 min",
        minutes: 30,
        distance: "about 800 m",
      },
    ],
  },

  /* ------------------------------------------------------- day 8 — 26 July */
  {
    chapter: "day-8",
    advisory:
      "Nagasaki's Diamond Princess calls that run on to Yokohama are scheduled 07:00 to 16:00, with all-aboard about 15:30. The brief calls this \"a flat, easy walk-off experience with zero staircases\". Sōfuku-ji has no step-free route to its gate at all, and Glover Garden is a hillside — but there is a free public lift up the hill that the brief never mentions, and it changes the day completely.",
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
        note: "The whole ship is cleared individually before general walk-off is released. Nobody is ashore at 07:00.",
      },
      {
        mode: "walk",
        from: "Stateroom",
        to: "Terminal street exit",
        means: "Corridor, lift down seven decks, gangway onto the apron, then through the terminal.",
        duration: "12–18 min",
        minutes: 15,
        distance: "about 400 m",
        note: "The terminal itself is properly barrier-free — accessible lifts, automatic doors, braille guide blocks.",
      },
      {
        mode: "taxi",
        from: "Matsugae terminal",
        to: "Sōfuku-ji, the Ryūgū-mon",
        means: "City taxi via Ōura Kaigan-dōri, Shinchi and Route 324. There is a free ten-space temple car park right of the gate.",
        duration: "8–10 min",
        minutes: 9,
        distance: "1.9 km",
        note: "About ¥1,100–1,500. Free-flow is under four minutes; tram junctions and the Chinatown one-way system make the rest. Temple opens 08:00, ¥300.",
      },
      {
        mode: "walk",
        from: "Car park",
        to: "Ticket window, foot of the Sanmon",
        means: "Level asphalt.",
        duration: "2–3 min",
        minutes: 3,
        distance: "about 40 m",
        arrivesAt: "sofukuji-ryugumon",
        note:
          "This is the only step-free part of Sōfuku-ji, and Nagasaki City offers it deliberately as the end of the line for anyone who cannot climb: you can take in the gate and the atmosphere from here without going up.",
      },
      {
        mode: "steps",
        from: "The Ryūgū-mon",
        to: "Daiippō-mon and the Daiyūhōden",
        means: "Stone staircases only — a flight up to the gate itself, then a long stair to the National Treasures above.",
        duration: "8–12 min unhurried",
        minutes: 10,
        distance: "120 m, about 15 m of rise",
        caution:
          "Nagasaki City states it plainly: there are stairs at the Sanmon, a long staircase continuing to the Daiippō-mon, and no other way around. Commonly given as forty to fifty steps, though no official count exists.",
      },
      {
        mode: "steps",
        from: "Upper courtyard",
        to: "Back down to the car park",
        means: "The same stair, descending. Partial handrails, worn treads.",
        duration: "6–9 min",
        minutes: 8,
        distance: "120 m",
        note: "There is no taxi rank at Sōfuku-ji. The driver waits, or one is called to the car park.",
      },
      {
        mode: "taxi",
        from: "Sōfuku-ji",
        to: "Glover Sky Road lower entrance, Ishibashi",
        means: "City taxi, about ¥1,200–1,600. Drop-off only at the Sky Road entrance — no parking.",
        duration: "8–10 min",
        minutes: 9,
        distance: "about 2 km",
        caution:
          "The brief has you making \"a short walk\" from Sōfuku-ji to Glover Garden. It is 2.06 km: down from 27 metres to sea level at Chinatown, then back up to 40, the last 380 metres at about one in ten. Thirty-two to forty minutes in late-July Nagasaki. Do not walk it.",
      },
      {
        mode: "lift",
        from: "Ishibashi, 12 m",
        to: "Upper plaza by Glover Garden's second gate, 74 m",
        means: "The Glover Sky Road — a free public slant elevator followed by a vertical one. Both wheelchair-accessible, 06:00 to 23:30.",
        duration: "3–5 min",
        minutes: 4,
        distance: "62 m of rise, taken entirely by machine",
        note:
          "This is the thing that makes the brief's \"zero staircases\" ambition actually true, and the brief has never heard of it.",
      },
      {
        mode: "walk",
        from: "Sky Road upper exit",
        to: "Glover Garden, second gate",
        means: "Level paved plaza. Volunteer guides are permanently stationed here.",
        duration: "2–4 min",
        minutes: 3,
        distance: "about 100 m",
        arrivesAt: "glover-garden",
        note: "Gate 2 is the entrance Nagasaki City recommends for anyone with mobility difficulties. ¥1,300, open 08:00–18:00.",
      },
      {
        mode: "walk",
        from: "The top of the garden",
        to: "Gate 1 and the exit",
        means: "Downhill on cobbled paths and wheelchair ramps past the Ringer, Alt and Glover houses.",
        duration: "12–20 min walking, 60–90 min if you go into the houses",
        minutes: 20,
        distance: "about 450 m, dropping 34 m",
        note:
          "Free electric and manual wheelchair hire at both gates. Cobblestone the whole way — it is the surface, not the gradient, that catches people out.",
      },
      {
        mode: "walk",
        from: "Glover Garden, Gate 1",
        to: "Matsugae terminal",
        means: "Back down Glover-dōri, the cobbled souvenir street, now entirely downhill.",
        duration: "7–9 min",
        minutes: 8,
        distance: "381 m, dropping 37 m",
        caution:
          "The brief calls this \"a flat 5-minute walk\". Uphill it is 381 metres climbing 37, averaging about one in ten. A taxi from the Ōura Tenshudō rank is ¥700–900 if the cobbles are not wanted.",
      },
      {
        mode: "taxi",
        from: "Matsugae terminal",
        to: "Dejima, if you go",
        means: "City taxi north along the waterfront, about ¥700–900.",
        duration: "4–6 min",
        minutes: 5,
        distance: "about 1 km",
        aside: "optional",
        caution:
          "The brief puts Dejima in the same \"flat 5-minute walk\" as Glover Garden. On foot it is 1.31 km and 17–22 minutes, in the opposite direction. Dejima is the level one and the far one; Glover Garden is the close one and the steep one. Note also that Dejima is a through-route — you enter at the Omotemon bridge gate and leave by the west gate, so the car meets you somewhere else.",
      },
      {
        mode: "walk",
        from: "Matsugae terminal",
        to: "Stateroom",
        means: "Terminal security and Medallion re-boarding, gangway, lift up seven decks.",
        duration: "12–18 min, plus up to 20 min of queue in the last hour",
        minutes: 18,
        distance: "about 400 m",
      },
    ],
  },

  /* ------------------------------------------------------- day 9 — 27 July */
  {
    chapter: "day-9",
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
      "A turnaround morning: roughly 2,700 passengers off and 2,700 on, and because the voyage called in Korea everyone clears full immigration and customs ashore. The morning is tight rather than broken — but only if you walk to COCOMO instead of booking the taxi the brief books.",
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
