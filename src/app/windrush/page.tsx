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

const flavours = [
  {
    name: "Coconut",
    theme: "A Taste of Home",
    hook: "A taste of the tropics, beautifully reimagined.",
    image: "/images/windrush/flavours/coconut.webp",
  },
  {
    name: "Passion Fruit",
    theme: "New Beginnings",
    hook: "Bright, vibrant and impossible to resist.",
    image: "/images/windrush/flavours/passion-fruit.webp",
  },
  {
    name: "Fruit Cake",
    theme: "Moments of Celebration",
    hook: "The taste of home, with a Caribbean soul.",
    image: "/images/windrush/flavours/fruit-cake.webp",
  },
  {
    name: "Blue Mountain Coffee",
    theme: "Morning Conversations",
    hook: "Bold Caribbean character mixed with chocolate luxury.",
    image: "/images/windrush/flavours/blue-mountain-coffee.webp",
  },
  {
    name: "Dark Caribbean Rum",
    theme: "The Spirit of the Caribbean",
    hook: "Deep, warming and irresistibly grown-up.",
    image: "/images/windrush/flavours/dark-caribbean-rum.webp",
  },
  {
    name: "Sorrel & A Touch Of Mixed Spice",
    theme: "Traditions Remembered",
    hook: "A Caribbean classic with a luxurious chocolate twist.",
    image: "/images/windrush/flavours/sorrel-mixed-spice.webp",
  },
];

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
                Every Journey Has A Story
              </p>
              <h2 className="tracked-display text-lg text-accent sm:text-xl">
                The Windrush Project
              </h2>
              <p className="text-base leading-8 text-paper-dim">
                Some stories deserve to be remembered. The Windrush
                Collection has been created to honour one of the most
                significant journeys in British history — celebrating the
                courage, resilience and determination of the men and women
                who travelled from the Caribbean to Britain, bringing with
                them their skills, ambition and a rich culture that has
                helped shape modern Britain.
              </p>
              <p className="text-base leading-8 text-paper-dim">
                As a Master Chocolatier, I wanted to tell this remarkable
                story in a different way — not through words alone, but
                through flavour. Each handcrafted chocolate has been
                carefully created to capture the tastes, aromas and memories
                carried across the Atlantic: familiar flavours of home,
                moments of celebration, family traditions, and ingredients
                that evoke comfort, belonging and hope.
              </p>
              <p className="text-base leading-8 text-paper-dim">
                Together, they create more than a box of chocolates. They
                create a journey — through heritage, through culture,
                through memory.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="tracked-label text-xs text-paper-dim">
              Six Handcrafted Chocolates, Six Distinctive Flavours
            </p>
            <h2 className="tracked-display mt-3 text-xl text-accent sm:text-2xl">
              The Collection
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {flavours.map((flavour) => (
              <Reveal key={flavour.name}>
                <div className="flex flex-col gap-5">
                  {flavour.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                      <Image
                        src={flavour.image}
                        alt={`${flavour.name} truffle — ${flavour.theme}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="border-l border-line pl-5">
                    <p className="tracked-label text-xs text-paper-dim">
                      {flavour.theme}
                    </p>
                    <h3 className="tracked-label mt-2 text-xs text-paper">
                      {flavour.name}
                    </h3>
                    <p className="mt-2 text-sm text-paper-dim">
                      {flavour.hook}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
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

      <section className="bg-ink px-6 py-24 text-center sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <p className="tracked-label text-xs text-paper-dim">
            A Personal Dedication
          </p>
          <p className="text-base leading-8 text-paper-dim">
            &ldquo;I dedicate this creation to all the brave people who came
            to this unknown land to make a new life for themselves, and by
            doing so, you have helped shape my life. So I thank you
            all.&rdquo;
          </p>
          <p className="tracked-label text-xs text-accent">One Love!</p>
          <p className="tracked-label text-xs text-paper-dim">
            — Paul Wayne Gregory
          </p>
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
