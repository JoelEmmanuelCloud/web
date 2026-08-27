"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";

export function GalleryGrid({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : images[activeIndex];

  function showRelative(delta: number) {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + delta + images.length) % images.length;
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <Reveal key={src}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="relative block aspect-square w-full overflow-hidden rounded-3xl bg-paper/5"
              aria-label={`Open gallery image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Paul Wayne Gregory Chocolates — showpiece ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-6"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
            className="tracked-label absolute right-6 top-6 text-xs text-paper-dim transition-colors hover:text-paper"
          >
            Close &times;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showRelative(-1);
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:border-paper hover:bg-paper/10 sm:left-8"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showRelative(1);
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:border-paper hover:bg-paper/10 sm:right-8"
          >
            &rarr;
          </button>
          <div
            className="relative h-full max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active}
              alt={`Paul Wayne Gregory Chocolates — showpiece ${(activeIndex ?? 0) + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
