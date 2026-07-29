import { googleMapsUrl, mapPins, naverMapUrl } from "@/data/maps";

/** A dropped pin, drawn rather than borrowed so it inherits currentColor. */
function Pin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21.5s7-6.1 7-11.2A7 7 0 0 0 5 10.3c0 5.1 7 11.2 7 11.2Z" />
      <circle cx="12" cy="10.1" r="2.5" />
    </svg>
  );
}

/**
 * Where a place is, and the name to hold up to a driver.
 *
 * The local-script name is the point of this component as much as the link
 * is. Nobody on this itinerary is taking a train, so every stop is reached by
 * saying a name to someone — and several of these names have a near-twin that
 * sends you to the wrong side of an island.
 */
export function MapLink({ id }: { id: string }) {
  const pin = mapPins[id];

  /* Deliberately absent for the Izumi bath: it is a room on a moving ship,
     and any coordinate for it is wrong within minutes of being right. */
  if (!pin) return null;

  const korea = pin.country === "kr";

  return (
    <div className="mt-4 border-l-2 border-kincha/40 py-0.5 pl-3.5">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.78rem]">
        <a
          href={googleMapsUrl(pin)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-asagi transition-colors hover:text-kin"
        >
          <Pin className="h-3.5 w-3.5 shrink-0" />
          Google Maps
          <span aria-hidden="true">↗</span>
        </a>

        {korea ? (
          <>
            <span className="text-kincha/60" aria-hidden="true">
              ·
            </span>
            <a
              href={naverMapUrl(pin)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-asagi transition-colors hover:text-kin"
            >
              <Pin className="h-3.5 w-3.5 shrink-0" />
              Naver Map
              <span aria-hidden="true">↗</span>
            </a>
          </>
        ) : null}

        <span
          className="font-jp text-[0.9rem] text-kin"
          lang={korea ? "ko" : "ja"}
        >
          {pin.script}
        </span>
        <span className="text-nezu/80">— show this to the driver</span>
      </p>

      {korea ? (
        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-shinshu/90">
          Google can show you this pin but cannot give you directions to it —
          nothing routes inside South Korea. Use Naver.
        </p>
      ) : null}

      {pin.note ? (
        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-nezu">{pin.note}</p>
      ) : null}
    </div>
  );
}
