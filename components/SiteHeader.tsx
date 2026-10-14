"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollProgress } from "@/components/motion/Effects";
import { chapterIndex, chapters, navDirection } from "@/data/nav";
import { voyage } from "@/data/voyage";

export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderNavigation key={pathname} pathname={pathname} />;
}

/** A route change resets the drawer state without a cascading effect update. */
function HeaderNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement | null>(null);
  const toggle = useRef<HTMLButtonElement | null>(null);
  const current = chapterIndex(pathname);

  /* Closing from inside the drawer hands focus back to the control that
     opened it. Closing because a navigation happened must not — the new page
     should get focus, not the button the reader has already left behind. */
  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const panelEl = panel.current;
    panelEl?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelEl) return;

      /* Keep Tab inside the drawer. Without this the reader tabs straight
         out into the page they cannot see and lose the cursor entirely. */
      const focusable = panelEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    /* The page behind a full-height drawer must not scroll. Clearing the
       inline value on the way out restores the stylesheet's overflow-x. */
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <ScrollProgress />

      {/* Named so it can be pinned during a chapter slide: the header is the
          reader's fixed reference point, and a header that slides with the
          content makes the whole viewport feel like it moved. */}
      <header
        className="fixed inset-x-0 top-0 z-40 border-b border-kincha/15 bg-sumi/80 backdrop-blur-md"
        style={{ viewTransitionName: "site-header" }}
      >
        <nav
          aria-label="Chapters"
          className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3.5 sm:px-6"
        >
          <button
            ref={toggle}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="chapter-drawer"
            aria-label={open ? "Close the chapter menu" : "Open the chapter menu"}
            className="-ml-1.5 flex shrink-0 items-center gap-2.5 p-1.5 text-rikyu transition-colors hover:text-kin xl:hidden"
          >
            {/* Three strokes that fold into a cross. */}
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 block h-px w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
            <span className="text-[0.62rem] uppercase tracking-[0.28em]">Menu</span>
          </button>

          <Link
            href="/"
            transitionTypes={[navDirection(pathname, 0)]}
            className="group flex shrink-0 items-baseline gap-2.5"
          >
            <span className="font-brush whitespace-nowrap text-xl leading-none text-shu transition-colors group-hover:text-ni">
              龍宮
            </span>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.3em] text-nezu transition-colors group-hover:text-kin sm:inline">
              Ryūgū
            </span>
          </Link>

          {/* The full rail only fits from xl up; everything narrower gets the
              drawer, where the English has room to be read. */}
          <ul className="ml-auto hidden items-center gap-1 xl:flex xl:gap-2">
            {chapters.slice(1).map((chapter, i) => {
              const index = i + 1;
              const active = index === current;
              return (
                <li key={chapter.href}>
                  <Link
                    href={chapter.href}
                    transitionTypes={[navDirection(pathname, index)]}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 whitespace-nowrap px-3 py-2 text-[0.78rem] transition-colors ${
                      active ? "text-kin" : "text-rikyu hover:text-kin"
                    }`}
                  >
                    <span
                      className={`font-brush text-sm ${active ? "text-kin" : "text-kincha"}`}
                      aria-hidden="true"
                    >
                      {chapter.script}
                    </span>
                    <span>{chapter.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Also named, and also pinned: the drawer is a fixed overlay, and
          without its own transition group it would be dragged sideways by
          the chapter slide it just triggered. */}
      <div
        id="chapter-drawer"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 xl:hidden ${open ? "" : "pointer-events-none"}`}
        style={{ viewTransitionName: "chapter-drawer" }}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className={`absolute inset-0 bg-sumi/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Chapters"
          className={`absolute inset-y-0 left-0 flex w-[min(21rem,86vw)] flex-col border-r border-kincha/25 bg-roiro shadow-[0_0_60px_rgba(0,0,0,.6)] transition-transform duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="motif-asanoha pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent 70%)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
            }}
          />

          <div className="relative flex items-center justify-between border-b border-kincha/20 px-6 py-5">
            <div>
              <p className="font-brush text-2xl leading-none text-shu">龍宮</p>
              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-nezu">
                Ryūgū · Chapters
              </p>
            </div>
            <button
              type="button"
              data-autofocus
              onClick={close}
              aria-label="Close the chapter menu"
              className="-mr-2 p-2 text-nezu transition-colors hover:text-kin"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>

          <ul className="relative flex-1 overflow-y-auto py-3">
            {chapters.map((chapter, index) => {
              const active = index === current;
              return (
                <li key={chapter.href}>
                  <Link
                    href={chapter.href}
                    transitionTypes={[navDirection(pathname, index)]}
                    aria-current={active ? "page" : undefined}
                    /* The items cascade in behind the panel edge rather than
                       arriving as one slab. Delay only on the way in. */
                    style={{ transitionDelay: open ? `${120 + index * 45}ms` : "0ms" }}
                    className={`flex items-center gap-4 px-6 py-3.5 transition-[opacity,transform,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                      open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    } ${active ? "text-kin" : "text-kinari hover:text-kin"}`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border font-brush text-lg ${
                        active
                          ? "border-kin/60 bg-kin/10 text-kin"
                          : "border-kincha/30 text-kincha"
                      }`}
                      aria-hidden="true"
                    >
                      {chapter.script}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.95rem] leading-snug">
                        {chapter.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.7rem] text-nezu">
                        <span lang="ja">{chapter.script}</span>
                        <span> {chapter.reading} · {chapter.blurb}</span>
                      </span>
                    </span>
                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-kin" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative border-t border-kincha/20 px-6 py-5 text-[0.62rem] uppercase tracking-[0.28em] text-nezu">
            <p>{voyage.ship}</p>
            <p className="mt-1.5">19 – 29 July 2027</p>
          </div>
        </div>
      </div>
    </>
  );
}
