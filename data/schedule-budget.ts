import type { Currency, ScheduleEvent } from "../types/schedule";

export const scheduleBaseline = "2026-10-14";
export const tripStart = "2027-07-19";
export const tripEnd = "2027-07-29";
export const cruise = {
  total: 6333.30, deposit: 272, balance: 6061.30, due: "2027-04-22",
  description: "Diamond Princess · 7-Day Japan & Korea · Balcony Guarantee · Princess Premier · US$100 shore excursion credit per person",
} as const;
export const flightBaseline = {
  fetchedOn: scheduleBaseline, total: 5685.62, target: 4100, overTarget: 1585.62,
  baseFare: 3630, adultBaseFare: 1815, surcharges: 1784, taxes: 271.62,
  provenance: "User-supplied live quote fetched October 14, 2026; saved snapshot, not a continuously refreshed fare.",
  taxBreakdown: [
    { label: "Air Travellers Security Charge Canada", amount: 68.84 },
    { label: "Airport Improvement Fee Canada", amount: 91.98 },
    { label: "Passenger Security Service Charge Japan", amount: 12.60 },
    { label: "Passenger Service Facility Charge Japan", amount: 44.20 },
    { label: "International Tourist Tax Japan", amount: 54 },
  ],
} as const;

/** Budget conversion assumptions, deliberately not presented as current FX quotes. */
export const planningCadRates: Record<Currency, number> = { CAD: 1, JPY: 0.01, KRW: 0.001, USD: 1.40 };

export function transferTotals(events: ScheduleEvent[]) {
  const currencies: Record<Currency, { min: number; max: number }> = { CAD: { min: 0, max: 0 }, JPY: { min: 0, max: 0 }, KRW: { min: 0, max: 0 }, USD: { min: 0, max: 0 } };
  let rides = 0;
  for (const event of events) {
    if (!event.groundTransfer || event.phase !== "trip" || event.status === "alternative") continue;
    currencies[event.cost.currency].min += event.cost.min;
    currencies[event.cost.currency].max += event.cost.max;
    rides++;
  }
  const cad = Object.entries(currencies).reduce((sum, [currency, value]) => ({ min: sum.min + value.min * planningCadRates[currency as Currency], max: sum.max + value.max * planningCadRates[currency as Currency] }), { min: 0, max: 0 });
  return { currencies, cad, rides };
}
