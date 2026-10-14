"use client";

import { useState } from "react";
import { cruise, flightBaseline, planningCadRates, scheduleBaseline, transferTotals } from "@/data/schedule-budget";
import { addDays, buildCalendar, exportableEvents, googleCalendarUrl, GOOGLE_IMPORT_URL } from "@/lib/schedule-calendar";
import type { Currency, ScheduleCategory, ScheduleCost, ScheduleEvent, ScheduleTime } from "@/types/schedule";

const filters = [
  { id: "all", label: "All" },
  { id: "pre-trip", label: "Reservations & Deadlines" },
  { id: "trip", label: "Trip & Cab Schedule" },
] as const;
type Filter = typeof filters[number]["id"];
const categories: ScheduleCategory[] = ["Action Today", "Payment Deadline", "Flight", "Cruise", "Hotel", "Taxi/Bus", "Activity"];
const badgeStyle: Record<ScheduleCategory, string> = {
  "Action Today": "border-kin/50 bg-kin/10 text-kin",
  "Payment Deadline": "border-shinshu/50 bg-shinshu/10 text-sakura",
  Flight: "border-mizu/40 bg-asagi/10 text-mizu",
  Cruise: "border-kincha/50 bg-kincha/10 text-kin",
  Hotel: "border-sakura/30 bg-sakura/5 text-sakura",
  "Taxi/Bus": "border-asagi/40 bg-asagi/10 text-mizu",
  Activity: "border-nezu/30 bg-nezu/5 text-rikyu",
};

function money(value: number, currency: Currency) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency, currencyDisplay: "code", maximumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2 }).format(value);
}
function range(min: number, max: number, currency: Currency) {
  return min === max ? money(min, currency) : `${money(min, currency)} – ${money(max, currency)}`;
}
function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date.slice(0, 10)}T12:00:00Z`));
}
function clockLabel(local: string) {
  return new Intl.DateTimeFormat("en-CA", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(`${local}Z`));
}
function timeLabel(time: ScheduleTime, chapter?: string) {
  if (time.kind === "date") {
    const end = addDays(time.endExclusive, -1);
    return time.start === end ? dateLabel(time.start) : `${dateLabel(time.start)} – ${dateLabel(end)}`;
  }
  const zone = time.zone === "America/Toronto" ? "Montréal" : chapter === "day-7" ? "KST" : "JST";
  const endZone = time.endZone && time.endZone !== time.zone ? time.endZone === "America/Toronto" ? "Montréal" : "JST" : zone;
  const nextDate = time.start.slice(0, 10) !== time.end.slice(0, 10) ? `, ${dateLabel(time.end)}` : "";
  return `${clockLabel(time.start)} ${zone} → ${clockLabel(time.end)} ${endZone}${nextDate}`;
}
function costLabel(cost: ScheduleCost) {
  if (cost.kind === "free") return "No additional cost";
  if (cost.kind === "included") return "Included / counted elsewhere";
  return range(cost.min, cost.max, cost.currency);
}

function ScheduleCard({ event }: { event: ScheduleEvent }) {
  return (
    <article id={event.id} className={`scroll-mt-24 border p-5 sm:p-6 ${event.status === "alternative" ? "border-dashed border-nezu/30 bg-sumi" : event.category === "Payment Deadline" ? "border-shinshu/35 bg-roiro" : "border-kincha/20 bg-roiro"}`}>
      <div className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.12em]">
        <span className={`border px-2 py-1 ${badgeStyle[event.category]}`}>{event.category}</span>
        <span className="text-nezu">{event.status === "completed" ? "✓ Completed" : event.status === "alternative" ? "Alternative · excluded from bulk export" : event.timing === "deadline" ? "Hard deadline" : event.timing === "time-tbc" ? "Time to confirm" : event.timing === "target" ? "Planning target" : "Planned · reconfirm"}</span>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:gap-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-mizu"><time dateTime={event.time.start}>{timeLabel(event.time, event.chapter)}</time></p>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-shironeri">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-nezu">{event.location}</p>
        </div>
        <div className="sm:max-w-64 sm:shrink-0 sm:text-right">
          <p className="text-sm font-semibold text-kinari">{costLabel(event.cost)}</p>
          <p className="mt-1 text-xs text-nezu">{event.cost.kind === "estimate" ? "Estimate · two travellers" : event.cost.kind === "quote" ? "Saved quote · two adults" : event.cost.kind === "balance" ? "Balance for the booking" : event.cost.kind === "paid" ? "Already paid" : "No duplicate charge"}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-rikyu">{event.details[0]}</p>
      <details className="mt-4 border-t border-kincha/15 pt-3">
        <summary className="cursor-pointer text-sm text-mizu hover:text-shironeri">Details, cost basis & source</summary>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-rikyu">
          <p><span className="font-semibold text-kinari">Cost basis: </span>{event.cost.basis}</p>
          {event.details.slice(1).map((detail, index) => <p key={index}>{detail}</p>)}
          {event.links?.length ? <div className="flex flex-wrap gap-x-5 gap-y-2">{event.links.map((link) => <a className="text-mizu underline underline-offset-4" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div> : null}
          <p className="text-xs text-nezu">Source: {event.source}</p>
        </div>
      </details>
      <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" aria-label={`Add to Google Calendar: ${event.title}`} className="mt-5 inline-flex min-h-11 items-center border border-kincha/35 px-3 py-2 text-xs text-kin transition-colors hover:border-kin hover:bg-kin/10">
        Add to Google Calendar <span aria-hidden="true" className="ml-3">↗</span>
      </a>
    </article>
  );
}

export function SchedulePlanner({ events, days }: { events: ScheduleEvent[]; days: { id: string; date: string; title: string }[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [category, setCategory] = useState<ScheduleCategory | "all">("all");
  const [message, setMessage] = useState("");
  const totals = transferTotals(events);
  const selected = events.filter((event) => (filter === "all" || event.phase === filter) && (category === "all" || event.category === category));
  const preTrip = selected.filter((event) => event.phase === "pre-trip");
  const trip = selected.filter((event) => event.phase === "trip");
  const exportCount = exportableEvents(events).length;

  function downloadCalendar() {
    try {
      const file = new Blob([buildCalendar(events)], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "ryugu-japan-2027-schedules.ics";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage(`Calendar download requested: ${exportCount} events. Open Google Calendar Import & Export and choose the downloaded .ics file.`);
    } catch {
      setMessage("The calendar could not be downloaded. Try again, or use the individual Google Calendar links below.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
      <div className="grid gap-px border border-kincha/25 bg-kincha/25 sm:grid-cols-2 xl:grid-cols-4">
        <Summary label="Cruise balance" value={money(cruise.balance, "CAD")} note="HARD DEADLINE · APR 22, 2027">
          <button type="button" className="mt-3 cursor-pointer text-xs text-mizu underline underline-offset-4" onClick={() => {
            setFilter("pre-trip");
            setCategory("all");
            window.requestAnimationFrame(() => document.getElementById("cruise-final-payment")?.scrollIntoView());
          }}>View payment details ↓</button>
        </Summary>
        <Summary label="Flight price tracker" value={money(flightBaseline.total, "CAD")} note="OCT 14, 2026 · LIVE QUOTE SNAPSHOT">
          <p className="mt-3 text-sm leading-relaxed text-rikyu">Target {money(flightBaseline.target, "CAD")}<br /><span className="text-sakura">+{money(flightBaseline.overTarget, "CAD")} over target</span></p>
        </Summary>
        <Summary label="Taxis & limousine buses" value={range(totals.cad.min, totals.cad.max, "CAD")} note={`${totals.rides} RIDES · TWO TRAVELLERS`}>
          <p className="mt-3 text-xs leading-relaxed text-nezu">Budget conversion; see currency totals and assumptions below.</p>
        </Summary>
        <Summary label="Next immediate action" value="Set flight trackers" note="OCT 14, 2026 · ROADMAP START">
          <p className="mt-3 text-sm leading-relaxed text-rikyu">Google Flights, KAYAK, Hopper & Air Canada. Track the same nonstop return trip for two.</p>
        </Summary>
      </div>

      <section aria-labelledby="calendar-heading" className="mt-8 border border-kincha/25 bg-kachi/40 p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-xl">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-mizu">Take the plan with you</p>
            <h2 id="calendar-heading" className="mt-2 font-display text-2xl text-shironeri">Your calendar, ready to import</h2>
            <p className="mt-3 text-sm leading-relaxed text-rikyu">Download all {exportCount} selected-plan events, including 24-hour alarms for outstanding pre-trip tasks and deadlines. Then choose the file in Google Calendar’s Import & Export settings on a computer.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 md:max-w-80">
            <button type="button" onClick={downloadCalendar} className="min-h-12 cursor-pointer bg-kin px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-yamabuki">Sync All to Google Calendar ↓</button>
            <a href={GOOGLE_IMPORT_URL} target="_blank" rel="noopener noreferrer" className="text-center text-sm text-mizu underline underline-offset-4">Open Google Calendar Import page ↗</a>
          </div>
        </div>
        <p className="mt-5 border-t border-mizu/15 pt-4 text-xs leading-relaxed text-nezu">This is a one-time import, not ongoing sync. Filters do not change the full export. Alternatives are excluded; the completed deposit is an informational record with no alarm. Use a dedicated trip calendar and avoid importing duplicates. Individual links open a draft for you to save; set its reminder in Google Calendar. Check imported notifications there too. <a className="text-mizu underline" href="https://support.google.com/calendar/answer/37118" target="_blank" rel="noopener noreferrer">Google’s import instructions</a></p>
        <p role="status" aria-live="polite" className="mt-3 text-sm text-kin">{message}</p>
      </section>

      <details className="mt-6 border border-kincha/20 p-5 text-sm">
        <summary className="cursor-pointer font-semibold text-kinari">Read the cost assumptions & itinerary decisions</summary>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="space-y-3 leading-relaxed text-rikyu">
            <p>All amounts cover two travellers: one cab or two bus tickets. Each ride is listed below. Kōchi’s charter is charged once, with its later rides included. Alternatives, sightseeing boats, cruise tenders and reservation reminders are outside the taxi/bus subtotal.</p>
            <ul className="space-y-1">{(["CAD", "JPY", "KRW"] as const).map((currency) => <li key={currency}>{range(totals.currencies[currency].min, totals.currencies[currency].max, currency)}</li>)}</ul>
            <p className="text-xs text-nezu">Planning FX only: JPY 1 = CAD {planningCadRates.JPY}; KRW 1 = CAD {planningCadRates.KRW}; USD 1 = CAD {planningCadRates.USD.toFixed(2)}. These are budget assumptions, not current exchange rates. Supplier quotes, tolls, waiting and card FX can change the total.</p>
          </div>
          <div className="space-y-3 leading-relaxed text-rikyu">
            <p>The selected plan matches the audited local/GitHub itinerary: Mazu Temple and Tarot on July 21; COCOMO at 11:00 on July 28. Enoshima and 10:30 COCOMO remain alternatives with timing caveats.</p>
            <p>The flight baseline is the traveller’s saved October 14 quote. Hotels, activities and unquoted transfers carry explicit estimates. Booking targets are not promises that inventory opens on that date.</p>
            <p className="text-xs text-nezu">Pre-trip dates use America/Toronto. Japan uses Asia/Tokyo; Jeju’s KST has the same UTC+09:00 offset. Flights retain separate departure/arrival timezones. Untimed items export as labeled all-day placeholders. All transport times require 2027 reconfirmation.</p>
          </div>
        </div>
      </details>

      <div className="mt-12 flex flex-col justify-between gap-5 border-b border-kincha/25 pb-5 lg:flex-row lg:items-end">
        <div role="group" aria-label="Schedule phase" className="flex flex-wrap gap-2">
          {filters.map((item) => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} className={`min-h-11 cursor-pointer border px-4 py-3 text-sm transition-colors ${filter === item.id ? "border-kin bg-kin/10 text-kin" : "border-kincha/25 text-rikyu hover:border-kincha"}`}>{item.label}</button>)}
        </div>
        <label className="flex items-center gap-3 text-sm text-nezu">Category
          <select value={category} onChange={(event) => setCategory(event.target.value as ScheduleCategory | "all")} className="min-h-11 border border-kincha/30 bg-roiro px-3 py-2 text-kinari">
            <option value="all">Every category</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      <p className="mt-4 text-xs text-nezu" aria-live="polite">{selected.length} items shown · roadmap baseline {dateLabel(scheduleBaseline)}</p>
      {selected.length === 0 ? <p className="py-12 text-rikyu">No items in this combination. Choose another category or All.</p> : null}

      {preTrip.length > 0 ? <section className="mt-10" aria-labelledby="roadmap-heading">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-kincha">Phase 01 · Before departure</p>
        <h2 id="roadmap-heading" className="mt-3 font-display text-3xl text-shironeri">Reservations & deadlines</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-rikyu">From October 14 to the flight out: what to arrange, when to act, and what is already paid. Dates are planning targets unless explicitly marked as a deadline.</p>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">{preTrip.map((event) => <ScheduleCard key={event.id} event={event} />)}</div>
      </section> : null}

      {trip.length > 0 ? <section className="mt-14" aria-labelledby="trip-heading">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-kincha">Phase 02 · July 19–29, 2027</p>
        <h2 id="trip-heading" className="mt-3 font-display text-3xl text-shironeri">Every day. Every transfer.</h2>
        <p className="mt-3 text-sm leading-relaxed text-rikyu">Open a day for every activity, cab, bus and connecting walk. All clock times are local; arrivals on another date say so.</p>
        <div className="mt-7 space-y-4">{days.map((day) => {
          const items = trip.filter((event) => event.chapter === day.id);
          if (!items.length) return null;
          const ordered = items.toSorted((a, b) => {
            if (a.status === "alternative" && b.status !== "alternative") return 1;
            if (b.status === "alternative" && a.status !== "alternative") return -1;
            return a.time.start.localeCompare(b.time.start);
          });
          return <details key={day.id} className="group border border-kincha/25" open={filter === "trip" || category !== "all"}>
            <summary className="cursor-pointer bg-roiro px-5 py-5 text-shironeri sm:px-6">
              <span className="ml-2 font-display text-xl">{dateLabel(day.date)} · {day.title}</span>
              <span className="ml-4 whitespace-nowrap text-xs text-nezu">{items.length} items</span>
            </summary>
            <div className="grid gap-3 p-3 lg:grid-cols-2">{ordered.map((event) => <ScheduleCard key={event.id} event={event} />)}</div>
          </details>;
        })}</div>
      </section> : null}
    </div>
  );
}

function Summary({ label, value, note, children }: { label: string; value: string; note: string; children?: React.ReactNode }) {
  return <div className="bg-roiro p-5 sm:p-6">
    <p className="text-xs text-rikyu">{label}</p>
    <p className="mt-3 font-display text-[1.5rem] font-semibold leading-snug text-shironeri">{value}</p>
    <p className="mt-3 text-[0.6rem] leading-relaxed tracking-[0.13em] text-kin">{note}</p>
    {children}
  </div>;
}
