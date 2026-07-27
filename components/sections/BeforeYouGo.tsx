import { SectionHeading } from "@/components/SectionHeading";
import { VideoCard } from "@/components/VideoCard";
import { CloudBand } from "@/components/art/Motifs";
import { Reveal } from "@/components/motion/Reveal";
import { prepVideos } from "@/data/prep";

export function BeforeYouGo() {
  return (
    <section
      id="watch"
      className="relative px-6 py-[clamp(6rem,12vw,11rem)]"
      style={{ backgroundColor: "var(--color-kachi)" }}
    >
      {/* 雲 — on a folding screen a band of cloud is how you change scene. */}
      <CloudBand className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full rotate-180 text-sumi" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          seal="観"
          eyebrow="Homework, but the good kind"
          title="Watch these before you leave"
          lead={
            <>
              An evening&rsquo;s viewing between now and July 2027. Shrine manners, the
              bath, chopsticks, enough Japanese to be polite — and a look at the two
              ports where a day ashore goes fastest.
            </>
          }
        />

        <Reveal stagger={80} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {prepVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Reveal>

        <p className="mt-10 text-xs leading-relaxed text-nezu">
          Videos are embedded from YouTube and load only when you press play. Each one
          was checked to be live and embeddable at build time — if a creator later takes
          one down, the card will show YouTube&rsquo;s own message.
        </p>
      </div>
    </section>
  );
}
