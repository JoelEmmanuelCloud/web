"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";

export function GalleryGrid({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <Reveal key={src}>
            <button
              type="button"
              onClick={() => setActive(src)}
              className="relative block aspect-square w-full overflow-hidden bg-paper/5"
              aria-label={`Open gallery image ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-6"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="tracked-label absolute right-6 top-6 text-xs text-paper-dim transition-colors hover:text-paper"
          >
            Close &times;
          </button>
          <div className="relative h-full max-h-[80vh] w-full max-w-3xl">
            <Image src={active} alt="" fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
