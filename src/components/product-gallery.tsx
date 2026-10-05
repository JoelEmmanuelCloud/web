"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ProductGallery({
  images,
  name,
  fit = "cover",
}: {
  images: string[];
  name: string;
  fit?: "cover" | "contain";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const hasMany = images.length > 1;

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = (index + images.length) % images.length;
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setCurrent(Math.round(track.scrollLeft / track.clientWidth));
  }

  const arrowClass =
    "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 bg-ink/50 text-paper transition-colors hover:border-paper hover:bg-ink/70";

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square w-full shrink-0 snap-center bg-paper/5"
            >
              <Image
                src={src}
                alt={`${name} — photo ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={fit === "contain" ? "object-contain" : "object-cover"}
              />
            </div>
          ))}
        </div>
        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous photo"
              className={`${arrowClass} left-3`}
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next photo"
              className={`${arrowClass} right-3`}
            >
              &rarr;
            </button>
            <span
              className="tracked-label absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-3 py-1 text-[10px] text-paper"
              aria-live="polite"
            >
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasMany && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === current}
              className={`relative aspect-square overflow-hidden rounded-2xl bg-paper/5 transition-opacity ${
                i === current
                  ? "opacity-100 ring-1 ring-paper"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 25vw, 10vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
