import { ScrollProgress } from "@/components/motion/Effects";

const LINKS = [
  { href: "#overview", label: "The voyage", script: "航" },
  { href: "#lore", label: "Dragon lore", script: "龍" },
  { href: "#journey", label: "Day by day", script: "旅" },
  { href: "#traditions", label: "Traditions", script: "礼" },
  { href: "#watch", label: "Watch", script: "観" },
  { href: "#phrases", label: "Phrases", script: "語" },
  { href: "#words", label: "Words", script: "言" },
];

export function SiteHeader() {
  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-kincha/15 bg-sumi/80 backdrop-blur-md">
        <nav
          aria-label="Sections"
          className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3.5"
        >
          <a href="#top" className="group flex shrink-0 items-baseline gap-2.5">
            <span className="font-brush whitespace-nowrap text-xl leading-none text-shu transition-colors group-hover:text-ni">
              龍宮
            </span>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.3em] text-nezu transition-colors group-hover:text-kin sm:inline">
              Ryūgū
            </span>
          </a>

          <ul className="ml-auto flex items-center gap-1 lg:gap-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 whitespace-nowrap px-2 py-2 text-[0.78rem] text-rikyu transition-colors hover:text-kin lg:px-3"
                >
                  <span className="font-brush text-sm text-kincha" aria-hidden="true">
                    {link.script}
                  </span>
                  <span className="sr-only lg:not-sr-only">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
