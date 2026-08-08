"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type HeroChapter = {
  id: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  cta?: { label: string; href: string };
  image: string;
  video?: { src: string; poster?: string; loop?: boolean };
};

const CROSSFADE_MS = 1200;
const KEN_BURNS_MS = 9000;

export function HeroCarousel({ chapters }: { chapters: HeroChapter[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const activeChapter = chapters[activeIndex];
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;
      if (id === activeChapter.id) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, chapters]);

  function goToChapter(index: number) {
    setActiveIndex((index + chapters.length) % chapters.length);
  }

  function handleVideoEnded(index: number) {
    setActiveIndex((current) => {
      if (current !== index) return current;
      return (index + 1) % chapters.length;
    });
  }

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-ink">
      {chapters.map((chapter, index) => {
        const forwardDistance = (index - activeIndex + chapters.length) % chapters.length;
        const loopDistance = Math.min(forwardDistance, chapters.length - forwardDistance);
        const shouldLoadVideo = !!chapter.video && loopDistance <= 1;
        const isActive = index === activeIndex;
        const zooming = isActive && mounted;

        return (
          <section
            key={chapter.id}
            aria-hidden={!isActive}
            inert={!isActive}
            className={`absolute inset-0 flex items-center justify-center overflow-hidden transition-opacity ease-in-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: zooming ? "scale(1.06)" : "scale(1)",
                transition: zooming
                  ? `transform ${KEN_BURNS_MS}ms linear`
                  : "transform 0s linear",
              }}
            >
              {chapter.video ? (
                shouldLoadVideo ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[chapter.id] = el;
                    }}
                    className="h-full w-full object-cover"
                    src={chapter.video.src}
                    poster={chapter.video.poster ?? chapter.image}
                    autoPlay
                    muted
                    loop={chapter.video.loop ?? true}
                    playsInline
                    controls={false}
                    onEnded={
                      chapter.video.loop === false
                        ? () => handleVideoEnded(index)
                        : undefined
                    }
                  />
                ) : (
                  <Image
                    src={chapter.video.poster ?? chapter.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                )
              ) : (
                <Image
                  src={chapter.image}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              )}
            </div>

            {chapter.heading && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/40"
                />

                <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
                  {chapter.eyebrow && (
                    <p
                      className="tracked-label text-xs text-paper-dim transition-all ease-out"
                      style={{
                        transitionDuration: "700ms",
                        transitionDelay: isActive ? "450ms" : "0ms",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
                      }}
                    >
                      {chapter.eyebrow}
                    </p>
                  )}
                  <h1
                    className="tracked-display max-w-3xl text-2xl text-paper transition-all ease-out sm:text-4xl"
                    style={{
                      transitionDuration: "700ms",
                      transitionDelay: isActive ? "550ms" : "0ms",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    {chapter.heading}
                  </h1>
                  {chapter.subheading && (
                    <p
                      className="tracked-label text-xs text-paper-dim transition-all ease-out sm:text-sm"
                      style={{
                        transitionDuration: "700ms",
                        transitionDelay: isActive ? "650ms" : "0ms",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
                      }}
                    >
                      {chapter.subheading}
                    </p>
                  )}
                  {chapter.cta && (
                    <Link
                      href={chapter.cta.href}
                      className="tracked-label mt-2 flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
                      style={{
                        transitionDuration: "700ms",
                        transitionDelay: isActive ? "750ms" : "0ms",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
                      }}
                    >
                      {chapter.cta.label}
                    </Link>
                  )}
                </div>
              </>
            )}
          </section>
        );
      })}

      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 sm:flex">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            onClick={() => goToChapter(index)}
            aria-label={chapter.heading ?? `Chapter ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-2.5 w-2.5 rounded-full border border-paper/70 transition-colors ${
              index === activeIndex ? "bg-paper" : "bg-transparent"
            }`}
          />
        ))}
      </div>

      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
        <button
          type="button"
          onClick={() => goToChapter(activeIndex - 1)}
          aria-label="Previous chapter"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:border-paper hover:bg-paper/10"
        >
          <ChevronIcon direction="up" />
        </button>
        <button
          type="button"
          onClick={() => goToChapter(activeIndex + 1)}
          aria-label="Next chapter"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:border-paper hover:bg-paper/10"
        >
          <ChevronIcon direction="down" />
        </button>
      </div>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={direction === "up" ? "rotate-180" : undefined}
    >
      <path
        d="M2 4.5L7 9.5L12 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
