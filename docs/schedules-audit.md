# Schedule data audit

Baseline: October 14, 2026. Travel: July 19–29, 2027. Scope: two adults.

The local HEAD and GitHub `master` were both `e65b004d0cd588ee4682f7e2099876c5aedff16d` before this change. `data/transit.ts`, `data/voyage.ts` and `data/predeparture.ts` matched GitHub after normalizing line endings. The published `/journey` at https://japan-xi-lime.vercel.app/journey also showed the same Mazu morning, morning Tarot and 11:00 COCOMO plan. The traveller explicitly selected that itinerary.

## Inputs

| Source | Used for |
| --- | --- |
| `AGENTS.md`, `CLAUDE.md` | Project instructions; bundled Next 16.2.11 routing and client-component documentation read before implementation |
| `app/layout.tsx`, `app/globals.css`, `components/SectionHeading.tsx`, `PageTransition.tsx`, `ChapterNav.tsx`, `SiteHeader.tsx`, `data/nav.ts` | Shared layout, lacquer/gold palette, fonts, chapter transitions, desktop and drawer navigation |
| `data/transit.ts` | All 124 original legs across 11 days, flight clocks, bus clocks, walking buffers, port windows and existing fare estimates |
| `data/voyage.ts`, `data/destinations.ts`, `components/sections/Journey.tsx` | Day names, activities, hotel choices and resolved itinerary conflicts |
| `data/predeparture.ts`, `components/sections/PreDeparture.tsx` | Preparation tasks, car procurement, packing and approximate booking lead times |
| `data/prep.ts`, `data/maps.ts`, `types/` | Supporting prep/map data and existing types; no additional confirmed booking invoices found |
| Traveller's task | Cruise invoice/deposit/deadline, October flight quote and itemized taxes, flight target, sale window and additional hotel alternatives |

## Decisions and limits

- Selected: July 21 Mazu/tai chi and Airi around 10:05; July 28 COCOMO 11:00. Enoshima and 10:30 COCOMO are visible alternatives, excluded from bulk export and selected costs.
- Cruise: CAD 6,333.30 total, CAD 272 paid, CAD 6,061.30 due April 22. The deposit's actual payment date was not supplied, so October 14 is explicitly an as-of record. No payment cutoff hour was invented.
- Flights: CAD 5,685.62 is a traveller-supplied quote snapshot, not a new fetch by the website or a live price feed. All five tax components reconcile to CAD 271.62. March 31 is the chosen end-of-March planning deadline, not an airline inventory closure claim.
- Hotel targets are nine calendar months before check-in, not verified release rules. COCOMO January 28 is six calendar months before July 28. Other lead times are labeled planning targets. Supplier payment/cancellation dates remain unconfirmed until rooms/services are booked.
- The [YCAT operator](https://www.keikyu-bus.co.jp/en/info/2025/0901_3652.html) says reservations open one month before travel. May 20 is preparation; June 20 is the outbound purchase follow-up. June 29 is the return follow-up, with that route's opening rule explicitly still to confirm.
- [Citadines Harbour Front Yokohama](https://www.discoverasr.com/en/citadines/japan/citadines-harbour-front-yokohama) exists; it is an alternative to the selected Hyatt. Tokyo's Gate Hotel alternative requires confirming the Asakusa property and luggage access to the Asakusa View bus stop.
- Izumi's existing US$39/person estimate remains separate from Premier. Check the app, then the onboard spa desk. Its July 27 session has no confirmed hour; do not invent one.
- Existing policy notes are converted to recheck tasks rather than asserting that 2026 entry, medication or insurance rules will apply in 2027.

## Costs and ownership

`data/schedules.ts` adapts existing transit data and attaches item-level prices, dates and source notes. `data/schedule-budget.ts` holds the supplied invoice/quote and explicit planning conversion rates. Price/title overrides use chapter and leg position; review them if `data/transit.ts` is reordered. IDs are derived from chapter, mode, origin and destination so reordering does not change calendar identities.

All prices are for two adults / one vehicle. Transfer subtotal: 20 selected car/bus legs; JPY 75,200–88,400 + KRW 35,000–45,000 + CAD 100–200. At budget assumptions of CAD 0.01/JPY and CAD 0.001/KRW, that is CAD 887–1,129. These are not live FX rates. Kōchi's JPY 22,000 charter is counted on its first ride only. Toba and Nagasaki each retain their JPY 6,800 daily estimate, allocated among rides. Bookings, alternatives, sightseeing boats and included tenders do not inflate this subtotal.

Hotel, meal, COCOMO, Tarot and missing transfer prices are explicitly unquoted planning allowances. No total trip cost is presented as settled. The old predeparture page's approximate JPY 36,000 port-car summary is not reused as an all-ground-transport total.

## Calendar contract

160 displayed items; 157 exported events; 25 outstanding pre-trip alarms. Export is a client-side download without OAuth or backend credentials. The [Google import workflow](https://support.google.com/calendar/answer/37118) creates a snapshot, not ongoing sync. Individual TEMPLATE links open drafts and cannot set a reminder reliably; the UI tells the traveller to review notifications.

`lib/schedule-calendar.ts` writes RFC 5545 CRLF records, UTF-8 75-octet folding, escaped text, stable UIDs, exclusive all-day ends, Toronto DST rules and Tokyo's fixed offset. Flight end timezones differ from their starts. Korea is labeled KST and uses Asia/Tokyo's identical UTC+09:00 offset as requested. Missing clocks export as explicitly described all-day placeholders.

Validation commands: `npm run build`, `npm run lint`, `npm run test:schedules`. Tests cover source coverage, dates, payment/tax arithmetic, transfer totals, timezone transitions, flight date boundaries, export completeness, alarms, Unicode folding and Google URL encoding. Browser QA checks filtering, download, layout and navigation; it does not import events into a real Google account.
