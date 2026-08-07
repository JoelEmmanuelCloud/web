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

export function HeroCarousel({ chapters }: { chapters: HeroChapter[] }) {
  const [activeId, setActiveId] = useState(chapters[0]?.id);
  const activeIdRef = useRef(activeId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: container, threshold: [0.6] },
    );

    const sections = container.querySelectorAll("[data-chapter]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function handleVideoEnded(chapterId: string) {
    if (activeIdRef.current !== chapterId) return;
    const index = chapters.findIndex((c) => c.id === chapterId);
    const next = chapters[index + 1];
    if (!next) return;
    document
      .getElementById(next.id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const activeIndex = chapters.findIndex((c) => c.id === activeId);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-[100dvh] snap-y snap-mandatory overflow-y-auto scroll-smooth"
      >
        {chapters.map((chapter, index) => {
          const shouldLoadVideo =
            !!chapter.video && Math.abs(index - activeIndex) <= 1;

          return (
          <section
            key={chapter.id}
            id={chapter.id}
            data-chapter
            className="relative flex h-[100dvh] snap-start items-center justify-center overflow-hidden"
          >
            {chapter.video ? (
              shouldLoadVideo ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={chapter.video.src}
                  poster={chapter.video.poster ?? chapter.image}
                  autoPlay
                  muted
                  loop={chapter.video.loop ?? true}
                  playsInline
                  controls={false}
                  onEnded={
                    chapter.video.loop === false
                      ? () => handleVideoEnded(chapter.id)
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
                priority={chapter.id === chapters[0]?.id}
                className="object-cover"
              />
            )}

            {chapter.heading && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/40"
                />

                <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
                  {chapter.eyebrow && (
                    <p className="tracked-label text-xs text-paper-dim">
                      {chapter.eyebrow}
                    </p>
                  )}
                  <h1 className="tracked-display max-w-3xl text-2xl text-paper sm:text-4xl">
                    {chapter.heading}
                  </h1>
                  {chapter.subheading && (
                    <p className="tracked-label text-xs text-paper-dim sm:text-sm">
                      {chapter.subheading}
                    </p>
                  )}
                  {chapter.cta && (
                    <Link
                      href={chapter.cta.href}
                      className="tracked-label mt-2 flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
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
      </div>

      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 sm:flex">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-label={chapter.heading ?? chapter.id}
            aria-current={activeId === chapter.id}
            className={`h-2.5 w-2.5 rounded-full border border-paper/70 transition-colors ${
              activeId === chapter.id ? "bg-paper" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
