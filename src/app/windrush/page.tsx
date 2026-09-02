import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Windrush | Paul Wayne Gregory Chocolates",
  description:
    "The Windrush Collection — a celebration of legacy, courage, and new beginnings, told through chocolate.",
  alternates: { canonical: "/windrush" },
};

const storyPanels = [
  {
    image: "/images/windrush/windrush-04-story-panel-1.webp",
    alt: "Windrush story panel one: A Journey of Hope, Carrying Dreams, Building Tomorrow",
  },
  {
    image: "/images/windrush/windrush-06-story-panel-2.webp",
    alt: "Windrush story panel two: Leaving Home Holding Hope, Far From Home Close To Heart, Building More Than A Life",
  },
  {
    image: "/images/windrush/windrush-08-story-panel-3.webp",
    alt: "Windrush story panel three: A Handshake Of Welcome, Rooted In Resilience, Shaping The Future",
  },
];

export default function WindrushPage() {
  return (
    <>
      <PageHero
        eyebrow="The Windrush Collection"
        heading="Windrush"
        subheading="A Celebration Of Legacy, Courage & New Beginnings."
        cta={{ label: "The Bespoke Box", href: "/bespoke-box" }}
        image="/images/windrush/windrush-05-promo-page.webp"
      />

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/windrush/windrush-07-box-cover-final.webp"
                alt="Windrush Chocolate Truffles box — a celebration of legacy, courage & new beginnings"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col gap-5">
              <p className="tracked-label text-xs text-paper-dim">
                Honouring A Legacy
              </p>
              <h2 className="tracked-display text-lg text-accent sm:text-xl">
                The Windrush Project
              </h2>
              <p className="text-base leading-8 text-paper-dim">
                Get ready to go behind the scenes for the very first time,
                witness the creations as they unfold.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <div className="text-center">
            <p className="tracked-label text-xs text-paper-dim">
              Told Through Chocolate
            </p>
            <h2 className="tracked-display mt-3 text-xl text-accent sm:text-2xl">
              The Windrush Story
            </h2>
          </div>

          {storyPanels.map((panel) => (
            <Reveal key={panel.image}>
              <div className="relative aspect-[2/1] overflow-hidden rounded-3xl">
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-20 text-center sm:px-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <p className="tracked-display text-lg text-accent sm:text-xl">
            Indulge Yourself
          </p>
          <Link
            href="/bespoke-box"
            className="tracked-label flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
          >
            The Bespoke Box
          </Link>
        </div>
      </section>
    </>
  );
}
