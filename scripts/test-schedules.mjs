import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

// Use the project's TypeScript compiler, with no test runner dependency or emitted build files.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modules = new Map();
function load(relative) {
  const path = resolve(root, relative);
  if (modules.has(path)) return modules.get(path).exports;
  const loaded = { exports: {} };
  modules.set(path, loaded);
  const js = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const localRequire = (specifier) => load(resolve(dirname(path), `${specifier}.ts`));
  new Function("require", "module", "exports", js)(localRequire, loaded, loaded.exports);
  return loaded.exports;
}
const data = load("data/schedules.ts");
const calendar = load("lib/schedule-calendar.ts");
const { transitDays } = load("data/transit.ts");
const byId = (id) => data.scheduleEvents.find((event) => event.id === id);

test("every existing transit leg is represented, with unique stable IDs, valid dates and costs", () => {
  const ids = new Set(data.scheduleEvents.map((event) => event.id));
  assert.equal(ids.size, data.scheduleEvents.length);
  for (const day of transitDays) {
    const imported = data.tripEvents.filter((event) => event.chapter === day.chapter && !event.id.endsWith("port-window"));
    assert.equal(imported.length, day.legs.length, day.chapter);
  }
  for (const event of data.scheduleEvents) {
    assert.ok(event.time.start >= "2026-10-14" && event.time.start < "2027-07-30", event.id);
    if (event.time.kind === "timed") {
      const start = calendar.zonedInstant(event.time.start, event.time.zone);
      const end = calendar.zonedInstant(event.time.end, event.time.endZone ?? event.time.zone);
      assert.ok(Number.isFinite(+start) && +end > +start, `${event.id}: ${event.time.start} → ${event.time.end}`);
    } else {
      assert.ok(event.time.endExclusive > event.time.start, event.id);
    }
    assert.ok(Number.isFinite(event.cost.min) && event.cost.min >= 0 && event.cost.max >= event.cost.min, event.id);
    assert.ok(event.cost.basis.length > 0 && event.source.length > 0);
    if (event.groundTransfer && event.status !== "alternative") assert.notEqual(event.cost.kind, "free", event.id);
  }
});

test("booking arithmetic, six-month date and inclusive sales window are exact", () => {
  const cents = (amount) => Math.round(amount * 100);
  assert.equal(cents(data.cruise.total) - cents(data.cruise.deposit), cents(data.cruise.balance));
  assert.equal(cents(data.flightBaseline.total) - cents(data.flightBaseline.target), cents(data.flightBaseline.overTarget));
  assert.equal(data.flightBaseline.taxBreakdown.reduce((sum, tax) => sum + cents(tax.amount), 0), cents(data.flightBaseline.taxes));
  assert.equal(cents(data.flightBaseline.baseFare) + cents(data.flightBaseline.surcharges) + cents(data.flightBaseline.taxes), cents(data.flightBaseline.total));
  assert.equal(byId("book-cocomo").time.start, "2027-01-28");
  assert.equal(byId("book-nrt-ycat").time.start, "2027-06-20");
  assert.equal(byId("book-asakusa-nrt").time.start, "2027-06-29");
  assert.equal(byId("cruise-final-payment").time.start, "2027-04-22");
  assert.equal(byId("flight-sale-window").time.endExclusive, "2026-12-27");
  assert.equal(calendar.monthsBefore("2027-03-31", 1), "2027-02-28");
});

test("cab and bus totals count two adults, one charter, no alternatives or booking duplicates", () => {
  const totals = data.transferTotals(data.scheduleEvents);
  assert.equal(totals.rides, 20);
  assert.deepEqual(totals.currencies.JPY, { min: 75200, max: 88400 });
  assert.deepEqual(totals.currencies.KRW, { min: 35000, max: 45000 });
  assert.deepEqual(totals.currencies.CAD, { min: 100, max: 200 });
  assert.deepEqual(totals.cad, { min: 887, max: 1129 });
  const kochi = data.scheduleEvents.filter((event) => event.chapter === "day-5");
  assert.equal(data.transferTotals(kochi).currencies.JPY.max, 22000);
  assert.deepEqual(data.transferTotals(data.bookingRoadmap).cad, { min: 0, max: 0 });
});

test("flight calendar instants cross date lines and Toronto DST correctly", () => {
  assert.equal(calendar.zonedInstant("2026-10-14T09:00:00", "America/Toronto").toISOString(), "2026-10-14T13:00:00.000Z");
  assert.equal(calendar.zonedInstant("2027-01-28T09:00:00", "America/Toronto").toISOString(), "2027-01-28T14:00:00.000Z");
  const flights = data.tripEvents.filter((event) => event.category === "Flight");
  assert.equal(flights.length, 2);
  const outbound = new URL(calendar.googleCalendarUrl(flights[0]));
  const inbound = new URL(calendar.googleCalendarUrl(flights[1]));
  assert.equal(outbound.searchParams.get("dates"), "20270719T170500Z/20270720T062500Z");
  assert.equal(inbound.searchParams.get("dates"), "20270729T083500Z/20270729T210000Z");
  assert.equal(inbound.searchParams.get("ctz"), "Asia/Tokyo");
  assert.equal(new URL(calendar.googleCalendarUrl(byId("cruise-final-payment"))).searchParams.get("dates"), "20270422/20270423");
});

test("ICS contains every selected event, valid timezone definitions and all pre-trip alarms", () => {
  const ics = calendar.buildCalendar(data.scheduleEvents, new Date("2026-10-14T16:00:00Z"));
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\nVERSION:2.0\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.ok(!ics.replaceAll("\r\n", "").includes("\n"));
  for (const line of ics.split("\r\n")) assert.ok(Buffer.byteLength(line, "utf8") <= 75);
  const unfolded = ics.replace(/\r\n[ \t]/g, "");
  const events = unfolded.match(/BEGIN:VEVENT\r\n[\s\S]*?END:VEVENT/g);
  assert.equal(events.length, calendar.exportableEvents(data.scheduleEvents).length);
  assert.equal(events.length, 157);
  assert.equal((unfolded.match(/BEGIN:VTIMEZONE/g) ?? []).length, 2);
  assert.ok(unfolded.includes("RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU"));
  const expectedAlarms = data.bookingRoadmap.filter((event) => event.status !== "completed").length;
  assert.equal((unfolded.match(/TRIGGER:-P1D/g) ?? []).length, expectedAlarms);
  assert.ok(unfolded.includes("DTSTART;TZID=America/Toronto:20270719T130500"));
  assert.ok(unfolded.includes("DTEND;TZID=Asia/Tokyo:20270720T152500"));
  assert.ok(unfolded.includes("DTEND;TZID=America/Toronto:20270729T170000"));
  assert.ok(!unfolded.includes("UID:enoshima-alternative@"));
  assert.ok(!unfolded.includes("UID:cocomo-1030-alternative@"));
  const deposit = events.find((event) => event.includes("UID:cruise-deposit@"));
  assert.ok(!deposit.includes("VALARM"));
  const second = calendar.buildCalendar(data.scheduleEvents, new Date("2026-10-15T16:00:00Z")).replace(/\r\n[ \t]/g, "");
  assert.deepEqual(unfolded.match(/^UID:.*$/gm), second.match(/^UID:.*$/gm));
});

test("Unicode folding and escaping preserve calendar text and Google link data", () => {
  const value = "龍宮, café; one\\two\n".repeat(20);
  const escaped = calendar.escapeIcs(value);
  const folded = calendar.foldIcs(`DESCRIPTION:${escaped}`);
  assert.equal(folded.replace(/\r\n /g, ""), `DESCRIPTION:${escaped}`);
  assert.ok(escaped.includes("龍宮\\, café\\; one\\\\two\\n"));
  const event = { ...byId("flight-trackers"), title: "龍宮 & Montréal / test", location: "A&B, #1" };
  const params = new URL(calendar.googleCalendarUrl(event)).searchParams;
  assert.equal(params.get("text"), event.title);
  assert.equal(params.get("location"), event.location);
  assert.ok(params.get("details").includes("271.62"));
});
