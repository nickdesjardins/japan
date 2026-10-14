import { transitDays, type TransitLeg } from "./transit";
import { chapters } from "./voyage";
import { packing } from "./predeparture";
import { addDays, monthsBefore } from "../lib/schedule-calendar";
import type { Currency, ScheduleCategory, ScheduleCost, ScheduleEvent, ScheduleTime, ScheduleZone } from "../types/schedule";

import { scheduleBaseline, tripStart, cruise, flightBaseline } from "./schedule-budget";
export { scheduleBaseline, tripStart, tripEnd, cruise, flightBaseline, planningCadRates, transferTotals } from "./schedule-budget";

const cost = (currency: Currency, min: number, max: number, basis: string, kind: ScheduleCost["kind"] = "estimate"): ScheduleCost => ({ currency, min, max, basis, kind });
const free = (basis = "No additional charge for this movement or task.") => cost("CAD", 0, 0, basis, "free");
const included = (basis = "Included in the cruise fare; do not add the fare again.") => cost("CAD", 0, 0, basis, "included");
const day = (start: string, end = start, zone: ScheduleZone = "America/Toronto"): ScheduleTime => ({ kind: "date", start, endExclusive: addDays(end, 1), zone });
const hotelYokohama = cost("JPY", 25000, 45000, "Allowance for one room / two adults, July 20–21; obtain a cancellable tax-inclusive quote.");
const hotelTokyo = cost("JPY", 25000, 50000, "Allowance for one room / two adults, July 28–29; view rooms may cost more.");
const cocomoCost = cost("JPY", 50000, 80000, "Planning allowance for the couple, not a studio quote; confirm costumes, photos, tax and outdoor shoot.");
const tarotCost = cost("JPY", 6000, 12000, "Allowance for two readings; tarot varies by reader. Existing data only prices palm reading from about ¥1,000 each.");
const bathCost = cost("USD", 78, 78, "Existing estimate: 2 × US$39 for a two-hour session. Day passes: 2 × US$49. Reconfirm onboard.");
const busSource = "https://www.keikyu-bus.co.jp/en/info/2025/0901_3652.html";
const busBooking = "https://www.limousinebus.co.jp/en/";
const princess = "https://www.princess.com/en-us/ships-and-experience/princess-medallionclass";

type RoadmapInput = Pick<ScheduleEvent, "id" | "title" | "category" | "details"> & {
  date: string; end?: string; cost?: ScheduleCost; status?: ScheduleEvent["status"];
  timing?: ScheduleEvent["timing"]; source?: string; links?: ScheduleEvent["links"];
};
function roadmap(item: RoadmapInput): ScheduleEvent {
  return {
    id: item.id, title: item.title, phase: "pre-trip", category: item.category,
    time: day(item.date, item.end), location: "Montréal · trip planning",
    details: item.details, cost: item.cost ?? free(), status: item.status ?? "planned",
    timing: item.timing ?? "target", source: item.source ?? "Planning target calculated from trip dates; availability must be confirmed with the operator.", links: item.links,
  };
}

export const bookingRoadmap: ScheduleEvent[] = [
  roadmap({ id: "cruise-deposit", date: scheduleBaseline, title: "Cruise deposit · completed", category: "Cruise", status: "completed",
    cost: cost("CAD", cruise.deposit, cruise.deposit, "Paid deposit, already part of the total fare.", "paid"), source: "Booking amounts supplied by the traveller.",
    details: [cruise.description, "$6,333.30 CAD total less $272.00 CAD paid = $6,061.30 CAD remaining.", "Recorded as completed as of October 14; the original payment date was not supplied. The US$200 combined shore credit is not cash and is not deducted from taxi costs."] }),
  roadmap({ id: "flight-trackers", date: scheduleBaseline, title: "Install apps & set flight price trackers", category: "Action Today", source: flightBaseline.provenance,
    cost: cost("CAD", flightBaseline.total, flightBaseline.total, "Roundtrip quote for two adults; monitoring is free. This is not a charge due today.", "quote"),
    details: ["Track nonstop YUL ↔ NRT for 2 adults: AC5 Monday July 19, 2027 / AC6 Thursday July 29, 2027. Set email/push notifications and compare the same baggage and fare conditions.",
      "Configure Google Flights tracking in the browser; install KAYAK, Hopper and Air Canada. Use price alerts where supported; use the Air Canada app to check the direct fare and flight details.",
      "October 14 live quote: $5,685.62 CAD, which is $1,585.62 CAD above the $4,100.00 CAD target. Track and wait for a suitable fare; sales are not guaranteed.",
      "Base fare: 2 adults × $1,815.00 CAD = $3,630.00 CAD. Carrier surcharges: $1,784.00 CAD. Taxes, fees & charges: $271.62 CAD.",
      ...flightBaseline.taxBreakdown.map((tax) => `${tax.label}: $${tax.amount.toFixed(2)} CAD.`),
      "Confirm the July 19 Monday operation and both flight times directly with Air Canada before nonrefundable ground bookings. The old itinerary's schedule-availability warning predates this supplied quote."],
    links: [{ label: "Google Flights", href: "https://www.google.com/travel/flights" }, { label: "KAYAK", href: "https://www.ca.kayak.com/flights" }, { label: "Hopper", href: "https://hopper.com/" }, { label: "Air Canada", href: "https://www.aircanada.com/" }] }),
  roadmap({ id: "passport-review", date: scheduleBaseline, title: "Check passports & travel documents", category: "Action Today",
    details: ["Check both passports, blank pages, and any renewal needs now. Confirm airline, Japan and South Korea entry requirements against official guidance closer to departure; the existing prep notes contain time-sensitive policy assumptions.", "Keep the actual passport available for port immigration. Renewal fees, if needed, are additional and unquoted."], source: "data/predeparture.ts · Check both passports; policy review, not a new entry-rule assertion." }),
  roadmap({ id: "book-yokohama", date: monthsBefore("2027-07-20", 9), title: "Reserve the Yokohama hotel", category: "Hotel", cost: hotelYokohama,
    details: ["Nine-month planning target: October 20. One night July 20–21, 2027. Choose Hyatt Regency Yokohama (current route) or Citadines Harbour Front Yokohama (alternative).", "Citadines is confirmed on the operator's official site. A hotel change requires adjusting walking routes and taxi pickups. Prefer a cancellable room after confirming flights. Save the rate's actual payment/cancellation deadlines." ], links: [{ label: "Citadines Harbour Front Yokohama", href: "https://www.discoverasr.com/en/citadines/japan/citadines-harbour-front-yokohama" }] }),
  roadmap({ id: "book-tokyo", date: monthsBefore("2027-07-28", 9), title: "Reserve the Tokyo hotel", category: "Hotel", cost: hotelTokyo,
    details: ["Nine-month planning target: October 28. One night July 28–29, 2027. Asakusa View Hotel is the current route; The Gate Hotel is an alternative (confirm the Asakusa property).", "The direct airport bus is planned from Asakusa View. A hotel change requires a new luggage transfer to that stop. Save the supplier's actual payment/cancellation deadlines; none are recorded yet." ] }),
  roadmap({ id: "flight-sale-window", date: "2026-11-27", end: "2026-12-26", title: "Buy flights · Black Friday to Boxing Day window", category: "Flight",
    cost: cost("CAD", 4100, 4100, "Target for both adults roundtrip, not a sale quote."),
    details: ["November 27–December 26 inclusive: compare Air Canada nonstop AC5/AC6 offers against the $4,100 CAD target and October's $5,685.62 CAD quote. Check total price after baggage, seats and fare rules.", "If no acceptable promotion appears, continue tracking into March. March 31 is the planning purchase deadline; there is no verified date when summer economy fare buckets close."] }),
  roadmap({ id: "cruise-reprice", date: "2026-11-27", title: "Check Princess Black Friday / Cyber Monday repricing", category: "Cruise",
    details: ["Compare the same cabin category and Princess Premier inclusions with the booked $6,333.30 CAD total. If the price falls or bonus onboard credit improves the offer, call Princess before final payment.", "Ask whether repricing changes the deposit, shore credit, cabin guarantee or cancellation terms. Repricing eligibility is subject to the booking terms."] }),
  roadmap({ id: "insurance", date: monthsBefore(tripStart, 6), title: "Arrange travel insurance", category: "Activity",
    cost: cost("CAD", 300, 800, "Unquoted planning allowance for two; actual premium depends on age, health and coverage."),
    details: ["Six months before departure. Obtain cover for July 19–29, cruise travel, Japan and Korea, medical evacuation and repatriation. Ask the insurer about time-sensitive cancellation and pre-existing-condition requirements now rather than assuming January is early enough."], source: "data/predeparture.ts; premium is a new planning allowance." }),
  roadmap({ id: "korea-entry-review", date: monthsBefore(tripStart, 6), title: "Recheck Korean entry authorisation", category: "Activity",
    cost: cost("KRW", 0, 20000, "Allowance based on the repo's ₩10,000 per adult K-ETA estimate, only if required; recheck current fee."),
    details: ["Check the rules applying to Canadian travellers in July 2027 before applying. The repo's 2026 exemption expiry is not proof of the rules for this trip. If an e-Arrival Card is required, review its submission window again shortly before Jeju."], links: [{ label: "Official K-ETA", href: "https://www.k-eta.go.kr/" }] }),
  roadmap({ id: "port-car-window", date: monthsBefore("2027-07-21", 6), end: monthsBefore("2027-07-21", 3), title: "Arrange port cars · six to three months out", category: "Taxi/Bus",
    details: ["January 21–April 21: request written pickup confirmations for Toba (July 22), a four-hour Kōchi charter (July 23), and the two key Nagasaki pickups (July 26). Jeju can use local taxis; prearrange if preferred.", "Toba: about ¥6,800 total; Kōchi: about ¥22,000 charter; Nagasaki: about ¥6,800; Jeju: ₩35,000–45,000. Each individual ride is priced in the trip schedule. Confirm port access, luggage, waiting, tolls and late tender/immigration arrangements.", "A private taxi does not carry the ship-sponsored excursion return guarantee. Compare Princess excursions and the US$100 per-person credit before committing."], source: "data/predeparture.ts · portCars and bookingRoutes.", cost: included("Booking task only; all transfer charges are counted on their travel dates.") }),
  roadmap({ id: "book-cocomo", date: monthsBefore("2027-07-28", 6), title: "Book COCOMO · Geisha & Samurai couple makeover", category: "Activity", cost: cocomoCost,
    details: ["January 28 is exactly six months before July 28. Request 11:00–14:00 JST, the current itinerary's slot. This is a contact target, not a verified booking-release rule.", "The earlier 10:30 option is shown separately: the current disembarkation/transfer plan reaches the studio around 11:00. Confirm an earlier ship exit and transfer before requesting it. Ask about stairs/lift access, costumes, photos, outdoor shoot and cancellation/payment terms."], links: [{ label: "COCOMO official site", href: "https://www.cocomo.tokyo/en/experience-faq-en/" }] }),
  roadmap({ id: "flight-purchase-deadline", date: "2027-03-31", title: "Buy flights by the end of March", category: "Payment Deadline", timing: "deadline",
    cost: cost("CAD", 4100, 5685.62, "Target to October quote range; neither bound guarantees a future fare."),
    details: ["Self-imposed hard purchase deadline: March 31, chosen to make the brief's ‘March 2027’ deadline actionable. Do not wait indefinitely for the $4,100 CAD target.", "Reconfirm AC5 July 19 / AC6 July 29, nonstop, two adults, and all-in costs before buying. No claim is made that economy inventory closes on this date."] }),
  roadmap({ id: "book-tarot", date: monthsBefore("2027-07-21", 3), title: "Reserve Airi Tarot & palm readings", category: "Activity", cost: tarotCost,
    details: ["Three-month target: April 21. Request July 21 around 10:05 JST (or shorten tai chi to make a confirmed 10:00 appointment). Allow 55 minutes for two readers/sessions; confirm whether they run together or consecutively.", "Request the Shanghai Road or Tenchōmon branch and an English-capable reader. July 20 evening is not workable on the current airport/hotel chain: the repo lists last reception at 19:30."], links: [{ label: "Airi reservations", href: "https://coubic.com/irieuranai" }] }),
  roadmap({ id: "cruise-payment-check", date: addDays(cruise.due, -7), title: "Verify final cruise invoice & payment method", category: "Cruise",
    details: ["One-week buffer: confirm the balance, supplier cutoff timezone and payment processing time. Settle early if bank or card processing could delay receipt."] }),
  roadmap({ id: "cruise-final-payment", date: cruise.due, title: "HARD DEADLINE · pay cruise balance", category: "Payment Deadline", timing: "deadline", source: "Traveller-supplied booking deadline and fare breakdown.",
    cost: cost("CAD", cruise.balance, cruise.balance, "$6,333.30 total − $272.00 deposit.", "balance"),
    details: ["Pay the remaining $6,061.30 CAD by April 22, 2027. Per the supplied booking terms, failure to pay results in automatic cancellation. Confirm the exact processing cutoff with Princess; no hour was supplied.", cruise.description] }),
  roadmap({ id: "specialty-dining", date: "2027-04-22", title: "Reserve specialty dining in the Princess app", category: "Cruise", cost: included("Princess Premier specialty dining, subject to the package terms and capacity."),
    details: ["After final payment, open the Princess / MedallionClass app and reserve preferred specialty dinners. Check earlier if the booking's status permits. April 22 is a follow-up target, not a guaranteed inventory release.", "Check Izumi availability in the app too. If it is not offered, reserve at the spa desk immediately after boarding July 21; the current plan budgets US$39 per person for July 27, separately from Premier."], links: [{ label: "Princess app", href: princess }] }),
  roadmap({ id: "bus-preparation", date: monthsBefore("2027-07-20", 2), title: "Review both airport bus routes & sales windows", category: "Taxi/Bus",
    details: ["May 20: confirm the July timetable and fare for NRT → YCAT on July 20 and Asakusa View → NRT on July 29. The old ‘buy two months out’ task is preparation only.", "YCAT's operator currently allows reservations one month before travel. Set June 20 and June 29 follow-ups; confirm the Asakusa route's release rule and Japan-local sale time with its operator. The return route is from Tokyo, so no YCAT → NRT ticket is needed."], links: [{ label: "YCAT reservation rule", href: busSource }, { label: "Bus reservations", href: busBooking }] }),
  roadmap({ id: "phones", date: monthsBefore(tripStart, 1), title: "Prepare phones, regional eSIMs & taxi apps", category: "Activity",
    cost: cost("CAD", 40, 100, "Allowance for two regional data plans; confirm Japan + South Korea coverage."),
    details: ["June 19: confirm both phones are unlocked; install profiles on home Wi-Fi and check the activation rules. Set up taxi apps and save pickup addresses, driver contacts and booking confirmations offline."] }),
  roadmap({ id: "cards", date: monthsBefore(tripStart, 1), title: "Check cards, PINs & cash access", category: "Activity",
    details: ["June 19: check card travel requirements, international ATM support, PINs and limits. Carry backup payment methods separately and budget yen/won cash for small operators." ] }),
  roadmap({ id: "book-nrt-ycat", date: monthsBefore("2027-07-20", 1), title: "Book NRT → YCAT bus tickets", category: "Taxi/Bus", cost: cost("JPY", 8000, 8000, "2 × ¥4,000 from existing itinerary; charged once on July 20 in transfer totals."),
    details: ["June 20: one calendar month before July 20. Target the 17:25 Terminal 1 service arriving 19:05, subject to the 2027 timetable. Reserve two seats, confirm luggage allowances and save tickets offline.", "This is a date reminder in Toronto; check Japan-local sale opening time in advance if seats are scarce."], links: [{ label: "Operator sales window", href: busSource }, { label: "Book bus", href: busBooking }] }),
  roadmap({ id: "arrival-group", date: addDays("2027-07-21", -30), title: "Check Princess arrival-group availability", category: "Cruise",
    details: ["June 21: 30 days before sailing. Request the earliest offered July 21 boarding window in the app; the schedule assumes noon check-in. Availability and assigned group control the actual boarding time." ] }),
  roadmap({ id: "book-asakusa-nrt", date: monthsBefore("2027-07-29", 1), title: "Reserve Asakusa View → NRT bus seats", category: "Taxi/Bus", cost: cost("JPY", 6200, 6200, "2 × ¥3,100 existing estimate; charged once on July 29 in transfer totals."),
    details: ["June 29: one-month follow-up target, pending confirmation of this route's sale rule. Request July 29 at 12:45, reaching NRT Terminal 1 at 14:35 on the existing timetable, before AC6 at 17:35.", "Reconfirm 2027 service and allow for road delays. The later 13:45 coach leaves too little airport margin in the current plan."], links: [{ label: "Asakusa View access", href: "https://www.viewhotels.jp/asakusa/access/" }, { label: "Book bus", href: busBooking }] }),
  roadmap({ id: "hotel-taxis", date: addDays("2027-07-20", -21), title: "Confirm all door-to-door hotel & airport cars", category: "Taxi/Bus", cost: included("Reservation task only; each ride is priced on its travel date."),
    details: ["June 29: three weeks before arrival. Ask the Yokohama concierge for YCAT pickup July 20 around 19:10 and hotel → Ōsanbashi July 21 at 11:20. Reserve Ōsanbashi → Asakusa July 28 around 09:30 with flexibility for luggage tags.", "Arrange Montréal home → YUL July 19 at 08:30 and the return July 29 with flight tracking. Reconfirm port-day pickups, written fares, tolls, waiting, port access and driver contact numbers."] }),
  roadmap({ id: "visit-japan", date: addDays(tripStart, -14), end: addDays(tripStart, -2), title: "Prepare Visit Japan Web & offline documents", category: "Activity",
    details: ["July 5–17: complete applicable arrival/customs details, save codes and confirmations offline, and check whether cruise re-entry requires separate paperwork. Recheck official rules rather than relying on old preparation notes."], links: [{ label: "Visit Japan Web", href: "https://vjw.digital.go.jp/" }] }),
  roadmap({ id: "oceanready", date: addDays(tripStart, -14), title: "Complete OceanReady & review reservations", category: "Cruise",
    details: ["July 5: upload required passport details/photo, set the onboard payment method, confirm arrival group and dining. Reconfirm the final invoice is paid and check all supplier cancellation/payment deadlines saved when booking."], links: [{ label: "Princess app", href: princess }] }),
  roadmap({ id: "pack-and-reconfirm", date: addDays(tripStart, -2), title: "Pack & reconfirm every departure", category: "Activity",
    details: ["July 17: check flights, buses, hotel rooms, port cars, Tarot and COCOMO. Pack passports, insurance, medication, chargers, swimwear, light layers, sun/rain protection, small cash and offline contacts. Keep medicines and essential documents in carry-on.",
      `Original packing checklist: ${packing.map((item) => item.what).join("; ")}.`,
      "Check medication import rules with the relevant official authorities well before packing; old prep notes are not a substitute for current permission requirements.",
      "Reserve an airport security time if available. Confirm July 19 home pickup at 08:30. Supplier confirmation takes precedence over any planning time here."], source: "data/predeparture.ts · packing; data/transit.ts · departure chain." }),
].sort((a, b) => a.time.start.localeCompare(b.time.start));

/** Prices attach to the existing leg, so reservations never double the total. */
const legCosts: Record<string, ScheduleCost> = {
  "day-1:0": cost("CAD", 50, 100, "One vehicle for two; home address is unknown, so confirm the fare. Airport-zone flat rates may not apply."),
  "day-2:2": cost("JPY", 8000, 8000, "2 adults × ¥4,000; existing route estimate, reconfirm 2027 fare."),
  "day-2:4": cost("JPY", 1600, 2200, "One YCAT → Hyatt taxi, existing meter estimate; confirm dispatch fee."),
  "day-2:6": hotelYokohama,
  "day-2:8": cost("JPY", 0, 1000, "Grounds free; allow two ¥500 incense sets if the counter is open."),
  "day-2:9": cost("JPY", 4000, 8000, "Dinner allowance for two, not a restaurant quote."),
  "day-3:2": cost("JPY", 1000, 1000, "2 × ¥500 incense; courtyard/tai chi free in existing plan."),
  "day-3:4": tarotCost,
  "day-3:6": cost("JPY", 800, 1400, "Allowance for one short Hyatt → pier taxi, with luggage; request dispatch-inclusive fare."),
  "day-3:11": included("Booking only; the two Izumi admissions are budgeted on July 27."),
  "day-4:2": cost("JPY", 2800, 2800, "One terminal → Futami taxi; existing ¥6,800 daily budget allocation."),
  "day-4:3": cost("JPY", 0, 1000, "Shrine visit free; optional fortunes/offerings allowance for two."),
  "day-4:5": cost("JPY", 0, 1000, "Ryūgūsha visit free; optional snack/offerings allowance."),
  "day-4:6": cost("JPY", 3200, 3200, "One Futami → terminal taxi: ¥2,800 fare + ¥400 return pickup allowance."),
  "day-4:7": cost("JPY", 500, 1500, "Coffee/snack allowance for two. Bay-cruise tickets counted on the boat event."),
  "day-4:10": cost("JPY", 4800, 4800, "2 × ¥2,400 bay-cruise tickets; sightseeing boat, excluded from taxi/bus subtotal."),
  "day-4:11": cost("JPY", 5600, 5600, "2 × ¥2,800 aquarium admission, paid at entry."),
  "day-4:12": cost("JPY", 3000, 5000, "Lunch allowance for two; admission counted at entry above."),
  "day-4:13": cost("JPY", 800, 800, "One aquarium → terminal taxi; completes ¥6,800 Toba daily estimate."),
  "day-5:2": cost("JPY", 22000, 22000, "Whole four-hour Kōchi charter, counted once here. Includes museum → beach, return to port and waiting; reconfirm extras."),
  "day-5:3": cost("JPY", 1400, 2000, "Museum admission allowance for two; exact exhibition fare unconfirmed."),
  "day-5:4": included("Included in the ¥22,000 Kōchi charter, charged on the first ride."),
  "day-5:7": cost("JPY", 3000, 5000, "Lunch allowance for two; free museum per existing itinerary."),
  "day-5:8": included("Included in the ¥22,000 Kōchi charter, charged on the first ride."),
  "day-7:1": cost("KRW", 15000, 20000, "One Gangjeong gate → Cheonjeyeon taxi; existing estimate."),
  "day-7:2": cost("KRW", 5000, 5000, "2 × ₩2,500 falls admission; existing estimate."),
  "day-7:3": cost("KRW", 5000, 5000, "One falls → Jungmun beach car-park taxi."),
  "day-7:5": cost("KRW", 4000, 24000, "Beach free; two ₩2,000 showers, with optional ₩20,000 parasol."),
  "day-7:7": cost("KRW", 30000, 50000, "Lunch allowance for two, not a cafe quote."),
  "day-7:8": cost("KRW", 15000, 20000, "One Jungmun → Gangjeong port-gate taxi. Immigration corridor still on foot."),
  "day-8:2": cost("JPY", 3900, 3900, "Allocated estimate: first taxi plus 45-minute wait at Sōfuku-ji; part of ¥6,800 daily car budget."),
  "day-8:3": cost("JPY", 0, 600, "Forecourt plan; allow 2 × ¥300 if entering the paid temple. Stairs are optional."),
  "day-8:4": cost("JPY", 1300, 1300, "Allocated Sōfuku-ji → Glover Sky Road taxi fare; waiting charged above."),
  "day-8:6": cost("JPY", 2600, 2600, "2 × ¥1,300 Glover Garden admission at Gate 2; public Sky Road lift free."),
  "day-8:9": cost("JPY", 800, 800, "Allocated Ōura Tenshudō-shita → Chinatown taxi fare."),
  "day-8:11": cost("JPY", 4000, 7000, "Lunch allowance for two at Keikaen; confirm menu."),
  "day-8:12": cost("JPY", 800, 800, "Allocated Chinatown → Matsugae taxi fare; daily estimate totals ¥6,800."),
  "day-9:2": bathCost,
  "day-10:4": cost("JPY", 23000, 35000, "One fixed private transfer for two + luggage. Existing range; require an all-in toll/waiting quote. Meter alternative ¥20,000–25,000 plus tolls."),
  "day-10:9": cocomoCost,
  "day-10:11": cost("JPY", 4000, 7000, "Late lunch allowance for two."),
  "day-10:13": hotelTokyo,
  "day-10:14": cost("JPY", 4000, 12000, "Whisky tasting allowance for two at Sakaemon; walking is free. Aged pours may exceed this."),
  "day-10:15": cost("JPY", 6000, 12000, "Evening allowance for two, including 2 × ¥1,000 Bar Flamingo covers; drinks extra within allowance."),
  "day-11:8": cost("JPY", 0, 1000, "Sensō-ji admission free; optional fortunes and offerings allowance."),
  "day-11:11": cost("JPY", 3000, 5000, "Lunch allowance for two; souvenirs additional."),
  "day-11:13": cost("JPY", 6200, 6200, "2 adults × ¥3,100; existing itinerary fare, reconfirm 2027 timetable and price."),
  "day-11:18": cost("CAD", 50, 100, "One YUL → home car; home zone unknown. Repo's older C$49.45 flat fare is not a confirmed home quote."),
};

const legTitles: Record<string, string> = {
  "day-1:2": "AC5 · Montréal → Tokyo Narita",
  "day-2:6": "Check in · Hyatt Regency Yokohama",
  "day-2:8": "Chinatown lanterns & Kanteibyō incense",
  "day-3:0": "Check out · store luggage at Hyatt",
  "day-3:2": "Mazu Temple, incense & Wednesday tai chi",
  "day-3:4": "Airi · Tarot & palm readings for two",
  "day-3:9": "Cruise check-in & embarkation",
  "day-3:11": "Reserve Izumi & confirm specialty dining",
  "day-3:12": "Diamond Princess · sail from Yokohama",
  "day-4:3": "Meoto Iwa · wedded rocks & frog fortunes",
  "day-4:5": "Ryūgūsha shrine & mochi shops",
  "day-4:10": "Ryūgū-jō Dragon Palace sightseeing boat",
  "day-4:12": "Toba Aquarium & lunch",
  "day-5:3": "Sakamoto Ryōma Memorial Museum",
  "day-5:5": "Katsurahama beach",
  "day-5:6": "Ryōma viewpoint & Ryūō shrine view",
  "day-6:3": "Kanmon Straits · scenic cruising window",
  "day-7:2": "Cheonjeyeon Falls & Seonimgyo bridge",
  "day-7:5": "Jungmun Beach · swim",
  "day-8:3": "Sōfuku-ji · Dragon Palace Gate",
  "day-8:7": "Glover Garden & Kunchi dragons",
  "day-9:2": "Izumi Japanese Bath · two-hour session, time TBC",
  "day-10:0": "Diamond Princess · dock in Yokohama",
  "day-10:2": "Disembark by assigned luggage-tag group",
  "day-10:9": "COCOMO · Geisha & Samurai couple makeover",
  "day-10:13": "Check in · Asakusa View Hotel",
  "day-11:0": "Check out · store luggage & reconfirm bus",
  "day-11:2": "Sensō-ji · Kaminarimon lantern & dragon",
  "day-11:5": "Sensō-ji · dragon fountain purification",
  "day-11:8": "Sensō-ji · golden dragon ceiling & fortunes",
  "day-11:16": "AC6 · Tokyo Narita → Montréal",
};

function stableLegId(chapter: string, leg: TransitLeg): string {
  let hash = 2166136261;
  for (const char of `${leg.mode}|${leg.from}|${leg.to}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `${chapter}-${(hash >>> 0).toString(16)}`;
}
const clock = (text?: string) => text?.match(/\d{2}:\d{2}/)?.[0];
const plusMinutes = (local: string, minutes: number) => new Date(Date.parse(`${local}Z`) + minutes * 60000).toISOString().slice(0, 19);

function categoryFor(chapter: string, index: number, leg: TransitLeg): ScheduleCategory {
  if (leg.mode === "plane") return "Flight";
  if (["car", "taxi", "coach"].includes(leg.mode)) return "Taxi/Bus";
  if (["day-2:6", "day-3:0", "day-10:13", "day-11:0"].includes(`${chapter}:${index}`)) return "Hotel";
  if (["ship", "tender"].includes(leg.mode) || (chapter === "day-3" && index >= 9)) return "Cruise";
  return "Activity";
}

export const tripEvents: ScheduleEvent[] = transitDays.flatMap((transitDay) => {
  const dayNumber = Number(transitDay.chapter.replace("day-", ""));
  const date = addDays(tripStart, dayNumber - 1);
  let cursor: string | undefined;
  const events: ScheduleEvent[] = transitDay.legs.map((leg, index) => {
    const key = `${transitDay.chapter}:${index}`;
    const zone: ScheduleZone = dayNumber === 1 || (dayNumber === 11 && index >= 17) ? "America/Toronto" : "Asia/Tokyo";
    const explicitStart = clock(leg.depart);
    const explicitEnd = clock(leg.arrive);
    // Infer only sequential missing walking times; scenic observations and the sea-day bath stay untimed.
    const start = explicitStart ? `${date}T${explicitStart}:00`
      : dayNumber === 10 && index === 0 ? `${date}T06:30:00`
      : dayNumber !== 6 && dayNumber !== 9 ? cursor : undefined;
    let time: ScheduleTime = day(date, date, zone);
    if (start) {
      const endDate = dayNumber === 1 && leg.mode === "plane" ? addDays(date, 1) : date;
      let end = explicitEnd ? `${endDate}T${explicitEnd}:00` : plusMinutes(start, Math.max(leg.minutes, 1));
      if (dayNumber === 10 && index === 0) end = plusMinutes(start, 1);
      time = { kind: "timed", start, end, zone,
        ...(leg.mode === "plane" ? { endZone: dayNumber === 1 ? "Asia/Tokyo" as const : "America/Toronto" as const } : {}) };
      cursor = end;
    }
    let price = legCosts[key];
    if (!price) price = leg.mode === "plane" ? included("Both flight legs are covered by the roundtrip flight quote / eventual purchase; no additional fare here.")
      : ["ship", "tender"].includes(leg.mode) || dayNumber === 6 || dayNumber === 9 ? included() : free();
    const details = [leg.means, `Duration: ${leg.duration}.`, ...(leg.note ? [leg.note] : []), ...(leg.caution && leg.mode !== "plane" ? [leg.caution] : [])];
    if (!explicitStart) details.push(start ? "Start time estimated from the preceding itinerary leg; reconfirm on the day." : "No clock time is recorded. Calendar entry is an all-day placeholder, not an all-day activity.");
    if (leg.mode === "plane") details.push("Times from the existing itinerary; verify against your ticket. Roundtrip price is the user-supplied October 14 snapshot.");
    if (dayNumber === 7) details.push("Jeju uses KST (UTC+09:00), the same offset as Asia/Tokyo used for this calendar.");
    if (key === "day-3:2") details.push("The repo lists opening at 09:00. Arrive/wait from 08:40; confirm incense access and the tai chi start. Do not assume the desk is open at 08:40.");
    return { id: stableLegId(transitDay.chapter, leg), title: legTitles[key] ?? `${leg.from} → ${leg.to}`,
      phase: "trip", category: categoryFor(transitDay.chapter, index, leg), time,
      location: `${leg.from} → ${leg.to}`, details, cost: price,
      status: leg.aside ? "alternative" : "planned", timing: !start ? "time-tbc" : !explicitStart ? "estimated" : "itinerary",
      source: `data/transit.ts · ${transitDay.chapter}, leg ${index + 1}. Prices: existing data or explicitly labeled planning allowances; reconfirm for 2027.`,
      chapter: transitDay.chapter, groundTransfer: ["car", "taxi", "coach"].includes(leg.mode),
    };
  });
  const port = transitDay.portCall;
  if (port) {
    events.push({ id: `${transitDay.chapter}-port-window`, title: `${port.port} · port window`, phase: "trip", category: "Cruise",
      time: { kind: "timed", start: `${date}T${dayNumber === 5 ? "09:00" : dayNumber === 8 ? "07:00" : port.ashore}:00`, end: `${date}T${port.sails}:00`, zone: "Asia/Tokyo" },
      location: port.port, details: [`${port.ashoreLabel ?? "Ashore from"}: ${port.ashore}. ${port.beBackByLabel ?? "Personal return deadline"}: ${port.beBackBy}. ${port.allAboardLabel ?? "All aboard"}: ${port.allAboard}. Sail: ${port.sails}.`, ...(port.lastTender ? [`Planning last tender: ${port.lastTender}; verify the actual last boat aboard.`] : []), port.note ?? "", "Port windows, arrival clearance and all-aboard times must be reconfirmed in the Princess app / daily programme."],
      cost: included(), status: "planned", timing: "itinerary", source: "data/transit.ts · portCall; arrival from first transit leg where available.", chapter: transitDay.chapter });
  }
  return events;
});

const extraTripEvents: ScheduleEvent[] = [
  { id: "korea-arrival-recheck", title: "Check any Korean arrival form requirement", phase: "trip", category: "Activity", time: day("2027-07-22", "2027-07-22", "Asia/Tokyo"), location: "Diamond Princess",
    details: ["Three days before Jeju: confirm with the ship whether any arrival form is required for your passport and authorisation status. Use only the official service and its actual filing window."], cost: free(), status: "planned", timing: "target", source: "data/predeparture.ts · Korea entry preparation.", chapter: "day-4" },
  { id: "arrivecan", title: "File optional ArriveCAN advance declaration", phase: "trip", category: "Activity", time: { kind: "timed", start: "2027-07-28T16:00:00", end: "2027-07-28T16:15:00", zone: "Asia/Tokyo" }, location: "Asakusa View Hotel",
    details: ["Target time: before heading out for whisky. July 28 is inside 72 hours of July 29's Canadian arrival. Recheck service availability and save the receipt."], cost: free(), status: "planned", timing: "target", source: "data/predeparture.ts · ArriveCAN.", chapter: "day-10", links: [{ label: "CBSA", href: "https://www.cbsa-asfc.gc.ca/" }] },
  { id: "enoshima-alternative", title: "Alternative only · Enoshima Island dragon quest", phase: "trip", category: "Activity", time: day("2027-07-21", "2027-07-21", "Asia/Tokyo"), location: "Enoshima Island",
    details: ["Not in the selected itinerary. The live plan replaced this with Mazu Temple and Tarot because Enoshima adds about 2½ hours of driving and substantial stairs before cruise check-in.", "Do not add it on top of the Yokohama morning. Replan the whole day, obtain a car quote and protect the 14:00 check-in cutoff before choosing it. No reliable visit time is recorded."], cost: cost("JPY", 30000, 45000, "Rough alternative allowance for a return car plus admissions for two; unquoted and excluded from selected totals."), status: "alternative", timing: "time-tbc", source: "data/voyage.ts · day 3; alternative requested by traveller.", chapter: "day-3" },
  { id: "cocomo-1030-alternative", title: "Alternative only · COCOMO at 10:30", phase: "trip", category: "Activity", time: { kind: "timed", start: "2027-07-28T10:30:00", end: "2027-07-28T13:30:00", zone: "Asia/Tokyo" }, location: "Studio COCOMO, 1-29-8 Asakusa",
    details: ["Replaces the 11:00 session; never book both. The current plan reaches Asakusa View at 10:45 and the studio around 11:00. A 10:30 booking needs confirmed earlier disembarkation and a revised transfer/luggage plan."], cost: cocomoCost, status: "alternative", timing: "target", source: "Traveller alternative; data/transit.ts · July 28 feasibility.", chapter: "day-10" },
  { id: "airport-taxi-fallback", title: "Alternative only · Asakusa → NRT private taxi", phase: "trip", category: "Taxi/Bus", time: { kind: "timed", start: "2027-07-29T12:30:00", end: "2027-07-29T13:55:00", zone: "Asia/Tokyo" }, location: "Asakusa View Hotel → Narita Terminal 1",
    details: ["Replaces the 12:45 coach if needed; arrange early and allow for traffic. One vehicle for two adults and bags. Excluded from the selected bus/taxi total."], cost: cost("JPY", 32000, 35000, "Existing fixed-fare all-in estimate; confirm tolls and pickup."), status: "alternative", timing: "estimated", source: "data/transit.ts · July 29 airport fallback.", chapter: "day-11", groundTransfer: true },
];

export const scheduleEvents: ScheduleEvent[] = [...bookingRoadmap, ...tripEvents, ...extraTripEvents];
export const scheduleDays = chapters.map((chapter, index) => ({ id: chapter.id, date: addDays(tripStart, index), title: chapter.place }));

