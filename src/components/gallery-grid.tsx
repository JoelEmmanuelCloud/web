"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";

export function GalleryGrid({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

      {activeIndex !== null && (
        <Lightbox
          images={images}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = startIndex * track.clientWidth;
  }, [startIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useLayoutEffect(() => {
    const zoom = zoomRef.current;
    if (!zoomed || !zoom) return;
    zoom.scrollLeft = (zoom.scrollWidth - zoom.clientWidth) / 2;
    zoom.scrollTop = (zoom.scrollHeight - zoom.clientHeight) / 2;
  }, [zoomed]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = (index + images.length) % images.length;
      track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
    },
    [images.length],
  );

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (zoomed) setZoomed(false);
        else onClose();
      } else if (!zoomed && event.key === "ArrowRight") {
        goTo(current + 1);
      } else if (!zoomed && event.key === "ArrowLeft") {
        goTo(current - 1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo, onClose, zoomed]);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setCurrent(Math.round(track.scrollLeft / track.clientWidth));
  }

  const controlClass =
    "tracked-label text-xs text-paper-dim transition-colors hover:text-paper";
  const arrowClass =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 bg-ink/40 text-paper transition-colors hover:border-paper hover:bg-paper/10 sm:flex";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery viewer"
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className={controlClass} aria-live="polite">
          {current + 1} / {images.length}
        </span>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setZoomed((value) => !value)}
            className={controlClass}
          >
            {zoomed ? "Fit To Screen" : "Zoom"}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={controlClass}
          >
            Close &times;
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className={`flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            zoomed ? "invisible" : ""
          }`}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative h-full w-full shrink-0 snap-center px-4 pb-6 sm:px-20"
            >
              <button
                type="button"
                onClick={() => setZoomed(true)}
                aria-label={`Zoom into image ${i + 1}`}
                className="relative block h-full w-full cursor-zoom-in"
              >
                <Image
                  src={src}
                  alt={`Paul Wayne Gregory Chocolates — showpiece ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </button>
            </div>
          ))}
        </div>

        {!zoomed && (
          <>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous image"
              className={`${arrowClass} left-4 sm:left-6`}
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next image"
              className={`${arrowClass} right-4 sm:right-6`}
            >
              &rarr;
            </button>
          </>
        )}

        {zoomed && (
          <div
            ref={zoomRef}
            className="absolute inset-0 overflow-auto overscroll-contain"
          >
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Zoom out"
              className="relative block h-[200%] w-[200%] cursor-zoom-out"
            >
              <Image
                src={images[current]}
                alt={`Paul Wayne Gregory Chocolates — showpiece ${current + 1}`}
                fill
                sizes="200vw"
                className="object-contain"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
