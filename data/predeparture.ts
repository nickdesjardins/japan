/* Everything that has to happen before the taxi comes on 19 July 2027.
   ------------------------------------------------------------------

   Two rules govern this file.

   First: dates. Border policy in Japan and Korea is being digitised hard
   through 2026–2028, and this trip is a year out from the research behind
   these lines. Anything temporary carries its own expiry in the text rather
   than reading as settled fact.

   Second: official domains, always spelled out. Visit Japan Web, K-ETA, the
   Korean e-Arrival Card and ArriveCAN each have a ring of paid look-alike
   sites charging real money for free government services, and the look-alikes
   buy the search ads. */

export type Task = {
  title: string;
  /** Roughly when, counting back from the flight. */
  when: string;
  body: string;
  /** The one place to do it, where getting the domain wrong costs money. */
  official?: string;
  /** True where the rule is temporary, new, or genuinely unresolved. */
  recheck?: boolean;
  /**
   * 1, 2, 3 — the only three things on this list with a queue behind them.
   * Everything else can be done in any order on any evening; these three are
   * finite supply against a fixed date, and one of them is finite supply
   * against 2,700 people landing at once.
   */
  priority?: number;
};

export const beforeYouLeave: Task[] = [
  {
    title: "Check both passports",
    when: "Now",
    body: "Japan asks only that a passport be valid for your stay, but airlines routinely apply their own six-month rule, so treat anything expiring before about February 2028 as needing renewal. Check the blank pages too: this one trip can generate six stamps — into Japan, out to Korea, into Korea, out again, back into Japan at Nagasaki, and out on the 29th. Japanese law requires you to carry the actual passport whenever you are ashore in Japan. A photocopy is not a substitute.",
  },
  {
    title: "Buy travel insurance",
    when: "About six months out",
    body: "RAMQ pays what a treatment would have cost in Quebec, at Quebec rates, and covers nothing of emergency transport, private rooms or drugs bought out of province — it says so itself and recommends private cover. Check three things specifically: medical evacuation including an escort home, pre-existing conditions in writing, and repatriation. Then check the policy covers a cruise, covers both Japan and South Korea, and covers 19–29 July including the travel days.",
  },
  {
    title: "Buy a Korean K-ETA, even though you may not need one",
    when: "About six months out",
    body: "Canada's exemption from Korea's travel authorisation runs out on 31 December 2026 — seven months before you sail — and no extension into 2027 has been announced. As things stand you will need one. Buy it early regardless: it costs about ₩10,000, lasts three years, and holding one also exempts you from Korea's e-Arrival Card, which otherwise has to be filed from the ship within three days of the Jeju call over ship wifi. It gets you into the faster automated lane at Gangjeong too.",
    official: "k-eta.go.kr",
    recheck: true,
  },
  {
    title: "Book the geisha and samurai session",
    when: "Six months out — the first thing you book",
    priority: 1,
    body: "This is the only thing on the whole trip with a genuine queue in front of it, and the only one where losing your slot loses you the afternoon rather than costing you a fee. Book direct with COCOMO rather than through a reseller — resellers hold a smaller block and cannot move you. Ask for 11:00 on Wednesday 28 July, not 10:30: disembarkation that morning goes by luggage-tag colour from about half past eight, and the honest chain reaches the studio door at eleven exactly. Settle two things in the same email — whether the plan includes the outdoor location shoot around the temple, which happens inside your three hours rather than after them, and whether there is a lift, because reception is on 2F and the garden studio on 4F and no lift is documented anywhere.",
  },
  {
    title: "Book the port-day cars",
    when: "Six to three months out",
    priority: 2,
    body: "The most consequential booking on this list, because a car that is not there is the only thing on this trip that can cost you the ship — and also the one most easily overbought. Only Kōchi genuinely needs a car held for hours: the wharf has no rank, no bus and no railway, so charter that one for about four hours and stop worrying about it. Toba needs two one-way runs with a booked return pickup rather than a driver paid to sit at Futami for eighty minutes. Nagasaki needs a car for 08:10 through the ship's shore excursions desk and another to meet you at Ōura Tenshudō-shita for 11:15, because Glover Garden's Gate 1 is not a taxi rank and nobody tells you that — the rest of that day you simply hail. Jeju needs nothing booked at all. Read the section below before you commit to any of it: which instrument you buy matters more than how early you buy it, and the difference between doing this well and doing it nervously is about ¥70,000.",
  },
  {
    title: "Book the Chinatown tarot reading",
    when: "Three months out",
    priority: 3,
    body: "Airi takes reservations through their own site at coubic.com/irieuranai, and a named reader has to be requested in advance. Book 10:00 on Wednesday 21 July — that is their opening hour, so you are the first customers of the day with nobody in front of you, and the tai chi circle two streets south finishes at exactly ten. Ask for the Shanghai Road or Tenchōmon branch rather than the main store, which is up on the 2F of the Kamome market with no lift documented. Weekday hours are 10:00 to 20:00 with last reception 19:30 — which is why this cannot be the Tuesday evening, whatever the original plan said. Two things to settle when you book: whether they can read in English, because nothing on their site says they can, and that what is on the menu is tarot and palm reading. The \"face analysis\" the brief promised is not a service they offer.",
  },
  {
    title: "Buy the Narita coach tickets, both ways",
    when: "Two months out",
    body: "Outbound, buy the two ¥4,000 Airport Limousine tickets online before you fly. Queuing at the Terminal 1 counter after a thirteen-hour flight is the thing that decides whether you make a coach at all, and the plan is built on the 17:25 to Yokohama with the counter already dealt with. Homebound, the Asakusa View Hotel is a stop on the Narita route but there are only six runs a day and the seat has to be reserved: book the 12:45 departure, which reaches Terminal 1 at 14:35 for the 17:35 flight. Not the 13:45 — it arrives at 16:00, and by the time you are through check-in, security and emigration the gate has closed. Confirm the reservation at the bell desk on the morning. The coach serves Terminal 1 last, after Terminals 3 and 2.",
  },
  {
    title: "Book the Izumi bath — but not until you are aboard",
    when: "Embarkation day, 21 July, before lunch",
    body: "This is the one booking that cannot be made in advance and cannot be left until the day. Capacity is capped near thirty across 818 m² and the sea-day passes are the first to go, so it has to be done at the spa desk in the first hours aboard, for the sea day on the 27th. About US$39 for a two-hour session or US$49 for a day pass — and it is not covered by Princess Premier, whatever the brief says. The two indoor halves are nude and gender-segregated and the sides swap daily, so you cannot share the main baths; only the outdoor tub is mixed, and that one needs swimwear.",
  },
  {
    title: "Sort out phones and data",
    when: "One month out",
    body: "Buy one regional eSIM that explicitly lists both Japan and South Korea — a Japan-only plan is dead the moment you step off at Seogwipo. Install the profile at home on wifi, because installing it needs a connection you will not have on arrival, then leave the line switched off until you land. Keep your Canadian number as the primary line: Uber's tourist taxi access in Japan is keyed to a foreign phone number. Confirm both handsets are carrier-unlocked first.",
  },
  {
    title: "Tell the banks, and check the cards",
    when: "One month out",
    body: "At least one debit card has to carry a Plus or Cirrus logo — an Interac-only card will not work in Japan at all. Set the PIN to four digits, because Japanese ATMs commonly reject longer ones. Carry one Visa and one Mastercard, kept in different places. 7-Eleven ATMs are the reliable ones: over 20,000 of them, English menus, essentially round the clock.",
  },
  {
    title: "Register on Visit Japan Web",
    when: "Two weeks to 48 hours out",
    body: "Japan's own portal, free, and it replaces the paper landing card and customs declaration with a single 2D code. It is optional — paper is still accepted — but it is the difference between two queues. Screenshot the code on both phones and print it; it lives behind a login, which is miserable on airport wifi after thirteen hours. Whether it also works for the mid-cruise re-entry at Nagasaki is genuinely unresolved, so expect paper forms from Princess there and treat the code as a bonus.",
    official: "vjw.digital.go.jp",
    recheck: true,
  },
  {
    title: "Complete OceanReady",
    when: "Two weeks out",
    body: "Passport details, security photo, payment method and your arrival-group time all go in the Princess app before you fly. Yokohama uses assigned arrival groups, and if you do not pick a window one gets assigned to you 24 hours out. If the Medallions ship to Montreal, pack them in your carry-on with a lanyard each.",
  },
  {
    title: "File the ArriveCAN advance declaration",
    when: "From Tokyo, in the last 72 hours",
    body: "Not required to enter Canada, but it saves real time at Montréal–Trudeau, which has the kiosks that read it. You cannot do it before you leave — the window is 72 hours, so it is a job for the Asakusa hotel room on the 28th.",
    official: "cbsa-asfc.gc.ca",
  },
];

/* ------------------------------------------------------------------
   The held cars, and the question everybody actually asks about them.

   "If the driver goes, can we just call another one?" The answer is
   different at every port and only alarming at one of them, so it is
   set out per port rather than as a single reassurance that would be
   false in Kōchi and needlessly frightening everywhere else.
   ------------------------------------------------------------------ */
export type HireMethod = {
  name: string;
  script?: string;
  /** Roughly what it costs, in the currency you will actually be quoted. */
  cost: string;
  /** When this is the right instrument rather than the other one. */
  use: string;
};

export const hireMethods: HireMethod[] = [
  {
    name: "Just take one, and take another later",
    script: "流し · nagashi",
    cost: "Only the fare. Regional Japan runs about ¥670 for the first kilometre and roughly ¥300 a kilometre after it, so most hops on this trip are ¥800–2,800",
    use: "The default, and the right answer more often than the planning documents suggest. It works anywhere there is a rank, a resort or a city — Jeju, Nagasaki, and the Toba terminal. Do not hire a car by the hour to sit outside a building in a place where another one will come.",
  },
  {
    name: "Metered, with the driver waiting",
    script: "待機 · taiki",
    cost: "The fare, plus roughly ¥60–70 a minute parked — so about ¥5,000 for an eighty-minute wait",
    use: "One stop of up to about an hour, somewhere with no rank. The meter keeps ticking slowly while he waits rather than stopping. Say 少し待っていてください and show him the return time written down. This is what Sōfuku-ji wants, and nothing else on the trip really does.",
  },
  {
    name: "Send him away and book him back",
    script: "迎車 · geisha — and no, not that one",
    cost: "Two one-way fares plus a pickup fee of about ¥400 — which beats waiting by roughly half on any stop over an hour",
    use: "The one most people never think of, and the biggest saving on this itinerary. At Futami you are ashore eighty minutes; paying a driver to sit through that costs more than the round trip itself. Book the same firm to come back at a named time, take their number, and confirm it before he drives off.",
  },
  {
    name: "Hourly charter",
    script: "時間制運賃 · jikansei unchin",
    cost: "About ¥5,900 for the first hour, then about ¥2,700 each half hour — so a four-hour port day is roughly ¥22,000, for the car rather than per person",
    use: "Exactly one day on this trip justifies it: Kōchi, where the wharf has no rank, no bus and no railway, and where three separate bookings at a port with thin supply is more risk than a single known car. Everywhere else this is money spent on reassurance you already have. Also called 貸切, kashikiri.",
  },
];

export type PortCar = {
  port: string;
  day: string;
  /** What the car has to do that day. */
  job: string;
  /** The verdict, in three words — this is the column to read first. */
  hold: string;
  /** Realistic total for the day's driving, at 2026 regional meter rates. */
  cost: string;
  /** How bad it is if he is not there — the honest answer, per port. */
  risk: "Fine" | "Manageable" | "This is the one";
  /** And what you actually do about it. */
  stranded: string;
};

export const portCars: PortCar[] = [
  {
    port: "Toba",
    day: "Thursday 22 July",
    job: "Terminal → Futami at 07:35, then back at 08:55 once you have done the shrine and Ryūgūsha. A separate short hop, aquarium → terminal, at 12:50.",
    hold: "Book him back, don't pay him to wait",
    cost: "About ¥6,800 — two 7.5 km runs at roughly ¥2,800, a pickup fee, and a ¥800 hop at the end",
    risk: "Manageable",
    stranded:
      "You would lose an hour, not the ship. The Marine Terminal has a rank, and Futami is about fifteen minutes' walk from Futaminoura station on the JR Sangū line, two stops from Toba — infrequent, but it exists. GO covers Mie; Uber does not reach here. Supply is thin on a cruise day, which is the argument for booking the return rather than for paying ¥5,000 to have a driver sit in a car park.",
  },
  {
    port: "Kōchi",
    day: "Friday 23 July",
    job: "Terminal at 09:45, the museum, down the hill to Katsurahama, through lunch, and back to the terminal at 13:30 — about four hours.",
    hold: "Hold this one. Only this one.",
    cost: "About ¥18,000 on the meter with the waiting, or roughly ¥22,000 as a fixed four-hour charter",
    risk: "This is the one",
    stranded:
      "Misato No. 7 is a working cargo wharf with no rank, no bus and no railway anywhere near it, and app dispatch into a restricted port area is unreliable. Katsurahama itself is fine — a bus terminus, a big car park, a tourist site — but its bus goes to the town centre, not to your ship. This is the single place on the trip where the cheap version is not worth it. Take the driver's card at the museum and photograph the plate.",
  },
  {
    port: "Jeju",
    day: "Sunday 25 July",
    job: "Three separate rides: port gate → the falls, the falls → the beach, and the beach → port gate. Nothing waits.",
    hold: "Don't hold anything",
    cost: "About ₩40,000 for the whole day — roughly ¥4,300, and the cheapest port on the trip",
    risk: "Fine",
    stranded:
      "Jungmun is a resort: hotels on every corner and cars circulating all day. k.ride and Kakao T both cover it, there is a Jeju Global Taxi desk beside the port gate, and the drive back is under twenty minutes. Ordering the return car from inside the cafe rather than at the kerb is the whole of the precaution needed here.",
  },
  {
    port: "Nagasaki",
    day: "Monday 26 July",
    job: "Four short city hops and one 45-minute wait: 08:10 from the terminal, waiting at Sōfuku-ji, on to the Sky Road, a pickup at Ōura Tenshudō-shita for 11:15, and 13:00 back from Chinatown.",
    hold: "One short wait, otherwise hail them",
    cost: "About ¥6,800 including the wait at Sōfuku-ji",
    risk: "Fine",
    stranded:
      "A city of four hundred thousand with trams, ranks, full GO coverage and Uber as well. The only trap is Glover Garden's Gate 1, which is not a rank and never will be — walk the 200 metres downhill to Ōura Tenshudō-shita, which is a tram stop with cars on it.",
  },
];

export type BookingRoute = {
  name: string;
  /** Ranked by how much can go wrong, least first. */
  effort: string;
  what: string;
};

export const bookingRoutes: BookingRoute[] = [
  {
    name: "The ship's shore excursions desk",
    effort: "Costs the most, removes the risk entirely",
    what:
      "The only option that does not merely manage the problem. Anything arranged through Princess is coordinated with the ship's own schedule, and their stated policy is that if a ship-sponsored trip runs late the ship waits — and where she genuinely cannot, Princess gets you to the next port at their expense. No independent taxi anywhere carries that. It is bookable from home in the Princess app once the excursion list opens, and again at the desk on board. On the days that worry you, it is the right amount more expensive.",
  },
  {
    name: "The hotel concierge, for the Yokohama days",
    effort: "Free, and they do the hard part",
    what:
      "The bit you cannot do from Montréal is telephone a Japanese taxi firm in Japanese. The Hyatt's desk does exactly that, as a matter of routine, for guests. Email them two or three weeks out with the date, the time and the destination in both scripts — this is how the pier run on the 21st gets booked, and it is worth asking them about Toba at the same time.",
  },
  {
    name: "Direct with the local firm, by email",
    effort: "Cheapest, most work, book earliest",
    what:
      "Small-town operators rarely have an English booking page. Write short Japanese — run it through a translator, nobody minds — and give five things: the date, the ship's name, the pickup point, the pickup time, and 時間制運賃でお願いします if you want the hourly charter. Ask for the confirmation in writing with the driver's mobile number on it, and ask explicitly what happens if immigration or the tender queue overruns. Then put that number in both phones.",
  },
];

export type PackItem = {
  what: string;
  why: string;
};

export const packing: PackItem[] = [
  {
    what: "Yen in cash, and coins",
    why: "Japan is 58% cashless now, but the gaps sit exactly where you are going: shrine and temple counters, omikuji and omamori, incense at the Chinatown temples at ¥500 a set, and temple admissions of ¥300–600. Cash for anything religious and anything run by one person.",
  },
  {
    what: "A small towel",
    why: "For the Izumi bath, and for the fact that a great many Japanese public washrooms have neither paper towels nor a dryer. The small towel goes into the bathing area and stays out of the water; the ship provides the big one.",
  },
  {
    what: "Shoes you can climb in and slip off",
    why: "Sōfuku-ji has no step-free route past its gate, Katsurahama has slopes and stairs before the sand, Futami's shore path is loose gravel, Cheonjeyeon is a gorge with a bridge over it, and the Jungmun beach ramp climbs fifty metres coming back — then you take them off at the door of a temple or a tatami room. Broken in, with grip: late July is the tail of the rainy season and wet stone is slick. Clean socks without holes.",
  },
  {
    what: "Heat kit, treated as safety equipment",
    why: "High-SPF sunscreen, a wide-brimmed hat or a UV umbrella, a rechargeable neck fan each, a cooling towel and a power bank. Recent Julys have put tens of thousands of people in Japanese hospitals with heatstroke. Buy the electrolyte drinks and salt tablets there — Pocari Sweat is in every convenience store and better than anything you would carry.",
  },
  {
    what: "Medication in its original labelled containers",
    why: "With a printed prescription and a doctor's letter using generic names, in cabin baggage. Check every item first: Japan bans stimulant ADHD drugs outright with no prescription defence, bans cannabis in every form, and requires advance written permission for codeine and other narcotics. Leave the pseudoephedrine cold remedies at home and buy a Japanese one there.",
    // The rule is more nuanced than a flat ban, but the practical advice is
    // the same and the burden of proving concentration falls on you at the desk.
  },
  {
    what: "A compact umbrella and a long-sleeved layer",
    why: "Nagasaki averages about nineteen rainy days in July, and the ship, the shops and every indoor space are air-conditioned hard.",
  },
  {
    what: "A foldable tote and a bag for your own rubbish",
    why: "Shops charge for plastic bags, and Japan has almost no public bins — people carry their rubbish home. Neither is a rule you can talk your way around.",
  },
  {
    what: "Motion-sickness remedy and compression socks",
    why: "The Toba tender crosses open water twice on an exposed anchorage, and the flight out is thirteen hours and twenty minutes.",
  },
];
