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
    title: "Book the makeover, and the cars",
    when: "Six to three months out",
    body: "COCOMO is the one booking with a real queue behind it — book direct rather than through a reseller if you want a particular morning. The Chinatown fortune reading needs a named branch and a named time, because last reception is 19:30. And the port-day cars matter just as much: Toba, Kōchi and Jeju all have thin taxi supply against 2,700 landed passengers and no rank where you will actually be standing, so contract each driver wait-and-return with the return time named. Get the waiting terms in writing, including what happens if an immigration queue overruns.",
  },
  {
    title: "Reserve the airport coach seat",
    when: "Two months out",
    body: "The Asakusa View Hotel is a stop on the Narita limousine route, but there are only six runs a day and the seat has to be reserved — the bell desk will do it, or book online. Note the coach serves Terminal 1 last, after Terminals 3 and 2.",
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
    why: "Sōfuku-ji has no step-free route to its gate, Katsurahama has slopes and stairs before the sand, and Cheonjeyeon is a staircase gorge — then you take them off at the door of a temple or a tatami room. Broken in, with grip: late July is the tail of the rainy season and wet stone is slick. Clean socks without holes.",
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
