import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
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
    tagline: "A taste of the tropics, beautifully reimagined.",
    description:
      "Silky white chocolate meets delicate coconut in a luxuriously smooth truffle, bringing the warmth and sweetness of the Caribbean together with refined artisan chocolate craftsmanship.",
    signoff: "One bite. One memory. Pure indulgence.",
    image: "/images/windrush/flavours/coconut.webp",
  },
  {
    name: "Passion Fruit",
    theme: "New Beginnings",
    tagline: "Bright, vibrant and impossible to resist.",
    description:
      "A luscious passion fruit centre wrapped in fine rich chocolate, balancing the exotic Caribbean fruit with a sophisticated touch of elegance. Sweet, sharp and wonderfully refreshing is well balanced.",
    signoff: "A little taste of sunshine in every bite.",
    image: "/images/windrush/flavours/passion-fruit.webp",
  },
  {
    name: "Fruit Cake",
    theme: "Moments of Celebration",
    tagline: "The taste of home, with a Caribbean soul.",
    description:
      "Rich soaked fruit, warming spices makes the base of the traditional Fruit cake, then brought together with decadent chocolate. Inspired by the flavours of home, familiar, comforting and beautifully indulgent.",
    signoff: "A lifetime memory, reimagined in chocolate.",
    image: "/images/windrush/flavours/fruit-cake.webp",
  },
  {
    name: "Blue Mountain Coffee",
    theme: "Morning Conversations",
    tagline: "Bold Caribbean character mixed with chocolate luxury.",
    description:
      "Exceptional Blue Mountain coffee brings its deep roasted notes and subtle richness to this velvety textured chocolate truffle. Creates an elegant balance of intensity, creaminess and chocolate finish.",
    signoff: "Smooth. Sophisticated. Unforgettable.",
    image: "/images/windrush/flavours/blue-mountain-coffee.webp",
  },
  {
    name: "Dark Caribbean Rum",
    theme: "The Spirit of the Caribbean",
    tagline: "Deep, warming and irresistibly grown-up.",
    description:
      "Rich dark chocolate meets the warmth and depth of flavour of real Caribbean rum, creating a beautifully balanced truffle with lingering notes of spice, oak and sweetness to savour.",
    signoff: "Slow down. Savour the moment.",
    image: "/images/windrush/flavours/dark-caribbean-rum.webp",
  },
  {
    name: "Sorrel & A Touch Of Mixed Spice",
    theme: "Traditions Remembered",
    tagline: "A Caribbean classic with a luxurious chocolate twist.",
    description:
      "Fragrant sorrel and warming island spices unfold through rich chocolate, creating a beautifully aromatic truffle that is vibrant, sophisticated and wonderfully nostalgic.",
    signoff: "Exotic, warming and utterly moreish.",
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
      <section className="bg-ink pt-24">
        <h1 className="sr-only">
          The Windrush Collection — A Celebration Of Legacy, Courage &amp; New
          Beginnings
        </h1>
        <div className="mx-auto max-w-[1080px] sm:px-10 sm:pt-10">
          <div className="relative aspect-[3/2] overflow-hidden sm:rounded-3xl">
            <Image
              src="/images/windrush/windrush-10-hero-collection.webp"
              alt="Paul Wayne Gregory Chocolates, The Windrush Collection: an open box of six cocoa-dusted Windrush Chocolate Truffles, limited edition and handmade, in Passion Fruit, Fruit Cake, Coconut, Blue Mountain Coffee, Dark Rum, and Sorrel with a touch of mixed spice"
              fill
              priority
              sizes="(max-width: 1160px) 100vw, 1080px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex justify-center px-6 py-12">
          <Link
            href="/bespoke-box"
            className="tracked-label flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
          >
            The Bespoke Box
          </Link>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white">
              <Image
                src="/images/windrush/windrush-09-wno-logo.webp"
                alt="Windrush National Organisation logo — Advocating Today For A Better Future, established July 2020"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
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
                    <p className="mt-3 text-sm text-paper">
                      {flavour.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-paper-dim">
                      {flavour.description}
                    </p>
                    <p className="mt-3 text-sm italic text-paper">
                      {flavour.signoff}
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

      <section className="bg-ink-raised px-6 py-20 text-center sm:px-10">
        <div className="mx-auto flex max-w-md flex-col items-center gap-6">
          <p className="tracked-label text-xs text-paper-dim">
            Displayed With Permission
          </p>
          <p className="text-sm text-paper-dim">
            Used with the permission of the Windrush National Organisation.
          </p>
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
