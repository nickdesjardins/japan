"use client";

import Image from "next/image";
import { useState } from "react";

export type PrepVideo = {
  id: string;
  title: string;
  channel: string;
  heading: string;
  why: string;
};

/**
 * A click-to-load facade. Nothing is requested from YouTube until you press
 * play, so a page with ten of these still costs one poster frame each instead
 * of ten full player bundles. Uses youtube-nocookie.
 */
export function VideoCard({ video }: { video: PrepVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="flex flex-col border border-kincha/22 bg-roiro/50">
      <div className="relative aspect-video w-full overflow-hidden bg-sumi">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play “${video.title}” by ${video.channel} on YouTube`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-sumi/45 transition-colors group-hover:bg-sumi/25" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-shironeri/80 bg-bengara/85 transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-shironeri" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg leading-snug text-shironeri">{video.heading}</h3>
        <p className="mt-3 flex-1 text-[0.9rem] leading-[1.7] text-rikyu">{video.why}</p>
        <p className="mt-5 border-t border-kincha/20 pt-4 text-[0.7rem] leading-relaxed text-nezu">
          <span className="text-kincha">{video.channel}</span>
          <span className="mx-2 opacity-50">·</span>
          {video.title}
        </p>
      </div>
    </article>
  );
}
