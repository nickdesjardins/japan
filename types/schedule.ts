export type SchedulePhase = "pre-trip" | "trip";
export type ScheduleCategory = "Action Today" | "Payment Deadline" | "Flight" | "Cruise" | "Hotel" | "Taxi/Bus" | "Activity";
export type ScheduleZone = "America/Toronto" | "Asia/Tokyo";
export type Currency = "CAD" | "JPY" | "KRW" | "USD";

export type ScheduleTime =
  | { kind: "date"; start: string; endExclusive: string; zone: ScheduleZone }
  | { kind: "timed"; start: string; end: string; zone: ScheduleZone; endZone?: ScheduleZone };

/** All amounts cover both travellers (one vehicle, or two adult tickets). */
export type ScheduleCost = {
  currency: Currency;
  min: number;
  max: number;
  basis: string;
  kind: "paid" | "balance" | "quote" | "estimate" | "included" | "free";
};

export type ScheduleEvent = {
  id: string;
  title: string;
  phase: SchedulePhase;
  category: ScheduleCategory;
  time: ScheduleTime;
  location: string;
  details: string[];
  cost: ScheduleCost;
  status: "completed" | "planned" | "alternative";
  timing: "deadline" | "target" | "itinerary" | "estimated" | "time-tbc";
  source: string;
  links?: { label: string; href: string }[];
  chapter?: string;
  /** One charge per paid transfer; never count a reservation or included charter hop twice. */
  groundTransfer?: boolean;
};
