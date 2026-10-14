import type { ScheduleEvent, ScheduleTime, ScheduleZone } from "../types/schedule";

export const GOOGLE_IMPORT_URL = "https://calendar.google.com/calendar/u/0/r/settings/export";

export function addDays(date: string, days: number): string {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function monthsBefore(date: string, months: number): string {
  const value = new Date(`${date}T12:00:00Z`);
  const day = value.getUTCDate();
  value.setUTCDate(1);
  value.setUTCMonth(value.getUTCMonth() - months);
  const lastDay = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + 1, 0)).getUTCDate();
  value.setUTCDate(Math.min(day, lastDay));
  return value.toISOString().slice(0, 10);
}

/** Resolve a local wall clock independently of the browser/server timezone, including Toronto DST. */
export function zonedInstant(local: string, zone: ScheduleZone): Date {
  const wall = Date.parse(`${local}Z`);
  let instant = wall;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  });
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(formatter.formatToParts(instant).map((p) => [p.type, p.value]));
    const represented = Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
    instant += wall - represented;
  }
  return new Date(instant);
}

const compact = (value: string) => value.replace(/[-:]/g, "");
const utcStamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

export function calendarDescription(event: ScheduleEvent): string {
  const cost = event.cost;
  return [
    `Status: ${event.status}. Timing: ${event.timing}.`,
    `Local timezone: ${event.time.zone}${event.time.kind === "timed" && event.time.endZone ? ` → ${event.time.endZone}` : ""}.`,
    `Cost for two: ${cost.currency} ${cost.min.toFixed(2)}${cost.min !== cost.max ? `–${cost.max.toFixed(2)}` : ""} (${cost.kind}). ${cost.basis}`,
    ...event.details,
    `Source: ${event.source}`,
    ...(event.links ?? []).map((link) => `${link.label}: ${link.href}`),
    ...(event.phase === "pre-trip" && event.status !== "completed" ? ["Reminder: 24 hours before. Check the notification setting after importing or saving in Google Calendar."] : []),
  ].join("\n\n");
}

export function googleCalendarUrl(event: ScheduleEvent): string {
  const time = event.time;
  const dates = time.kind === "date"
    ? `${compact(time.start)}/${compact(time.endExclusive)}`
    : `${utcStamp(zonedInstant(time.start, time.zone))}/${utcStamp(zonedInstant(time.end, time.endZone ?? time.zone))}`;
  const params = new URLSearchParams({
    action: "TEMPLATE", text: `${event.status === "alternative" ? "[Alternative] " : ""}${event.title}`,
    dates, ctz: time.zone, details: calendarDescription(event), location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** RFC 5545 TEXT escaping and UTF-8 octet folding (not JS character count). */
export function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export function foldIcs(line: string): string {
  const encoder = new TextEncoder();
  let result = "";
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > 75) { result += "\r\n "; bytes = 1; }
    result += char;
    bytes += size;
  }
  return result;
}

const timezones = [
  "BEGIN:VTIMEZONE", "TZID:America/Toronto", "X-LIC-LOCATION:America/Toronto",
  "BEGIN:DAYLIGHT", "DTSTART:20070311T020000", "TZOFFSETFROM:-0500", "TZOFFSETTO:-0400",
  "TZNAME:EDT", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU", "END:DAYLIGHT",
  "BEGIN:STANDARD", "DTSTART:20071104T020000", "TZOFFSETFROM:-0400", "TZOFFSETTO:-0500",
  "TZNAME:EST", "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU", "END:STANDARD", "END:VTIMEZONE",
  "BEGIN:VTIMEZONE", "TZID:Asia/Tokyo", "X-LIC-LOCATION:Asia/Tokyo",
  "BEGIN:STANDARD", "DTSTART:19700101T000000", "TZOFFSETFROM:+0900", "TZOFFSETTO:+0900",
  "TZNAME:JST", "END:STANDARD", "END:VTIMEZONE",
];

function icsTime(time: ScheduleTime): string[] {
  if (time.kind === "date") return [`DTSTART;VALUE=DATE:${compact(time.start)}`, `DTEND;VALUE=DATE:${compact(time.endExclusive)}`];
  return [`DTSTART;TZID=${time.zone}:${compact(time.start)}`, `DTEND;TZID=${time.endZone ?? time.zone}:${compact(time.end)}`];
}

export function exportableEvents(events: ScheduleEvent[]): ScheduleEvent[] {
  return events.filter((event) => event.status !== "alternative");
}

export function buildCalendar(events: ScheduleEvent[], now = new Date()): string {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ryugu//Japan 2027 Schedule//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:Ryūgū — Japan & Korea 2027", ...timezones];
  for (const event of exportableEvents(events)) {
    lines.push("BEGIN:VEVENT", `UID:${event.id}@ryugu.itinerary`, `DTSTAMP:${utcStamp(now)}`,
      ...icsTime(event.time), `SUMMARY:${escapeIcs(event.title)}`, `DESCRIPTION:${escapeIcs(calendarDescription(event))}`,
      `LOCATION:${escapeIcs(event.location)}`, `CATEGORIES:${escapeIcs(event.category)}`,
      "CLASS:PRIVATE", "TRANSP:TRANSPARENT", `STATUS:${event.status === "completed" ? "CONFIRMED" : "TENTATIVE"}`);
    if (event.phase === "pre-trip" && event.status !== "completed") {
      lines.push("BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", `DESCRIPTION:${escapeIcs(event.title)}`, "END:VALARM");
    }
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldIcs).join("\r\n") + "\r\n";
}
