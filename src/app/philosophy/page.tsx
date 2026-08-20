import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Philosophy | Paul Wayne Gregory Chocolates",
  description:
    "Indulgence is everything — the philosophy behind Paul Wayne Gregory Chocolates, not a strapline but the standard every recipe is built to.",
  alternates: { canonical: "/philosophy" },
};

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        eyebrow="The Philosophy"
        heading="Indulgence Is Everything"
        subheading="Not a strapline. The standard every recipe, every decoration, and every box is built to."
        image="/images/shopify-cdn/pwg-test-images03_5d64ae09-b48f-4f11-9979-6445be256bbe.jpg"
        video={{ src: "/video/indulgence-melt.mp4" }}
      />

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-accent">Why This Word</p>
          <h2 className="tracked-display text-xl text-paper sm:text-2xl">
            A Philosophy, Not A Slogan
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Most chocolate companies have a strapline. We have a philosophy.
            &ldquo;Indulgence is everything&rdquo; isn&rsquo;t a line on a box
            — it&rsquo;s the guideline every recipe gets held to before it
            earns a place in the collection.
          </p>
          <p className="text-base leading-8 text-paper-dim">
            The world of chocolatiers can look the same from one maker to the
            next — same look, same colours, same basic feel. We&rsquo;d
            rather be different: playful where it counts, uncompromising
            where it matters, and always chasing the same question — what
            does true indulgence actually taste like?
          </p>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/shopify-cdn/pwgtrufflesmatugga2_large.jpg"
                alt="Paul Wayne Gregory truffle collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col gap-5">
              <p className="tracked-label text-xs text-paper-dim">
                The Taste Framework
              </p>
              <h2 className="tracked-display text-lg text-paper sm:text-xl">
                Can Indulgence Be Measured?
              </h2>
              <p className="text-base leading-8 text-paper-dim">
                Behind every recipe is a framework Paul developed himself —
                taste profile, and what he calls &ldquo;width of
                flavour.&rdquo; It&rsquo;s not marketing language. It&rsquo;s
                the actual method used to decide whether a new flavour is
                ready, or needs another six months in development.
              </p>
              <p className="text-base leading-8 text-paper-dim">
                We&rsquo;re building this out into proper masterclass
                content — starting with Lesson One and Two: can indulgence be
                measured? It&rsquo;s the first time we&rsquo;ve taught this
                openly, and the first time we&rsquo;ve shown the creative
                journey behind a new range as it happens, rather than after
                the fact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="tracked-label text-xs text-paper-dim">
              Two Ranges, One Standard
            </p>
            <h2 className="tracked-display mt-3 text-xl text-paper sm:text-2xl">
              The Collection
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal>
              <Link href="/shop" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/shopify-cdn/ArtRangeTwo24.04.jpg"
                    alt="Art Range collection"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 border-l border-line pl-5">
                  <h3 className="tracked-label text-xs text-paper">
                    The New Range
                  </h3>
                  <p className="mt-2 text-sm text-paper-dim">
                    Introduced alongside this relaunch and documented as
                    it&rsquo;s created — the first time we&rsquo;ve taken
                    customers behind the scenes of a range being built.
                  </p>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <Link href="/shop" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/shopify-cdn/ChampagneTruffles.02.jpg"
                    alt="Classic truffle collection"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 border-l border-line pl-5">
                  <h3 className="tracked-label text-xs text-paper">
                    The Classic Range
                  </h3>
                  <p className="mt-2 text-sm text-paper-dim">
                    Our founding collection, now proven over years — every
                    flavour in it has won an award, and each one has a story
                    worth retelling.
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-20 text-center sm:px-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <p className="tracked-display text-lg text-accent sm:text-xl">
            Indulge Yourself
          </p>
          <Link
            href="/shop"
            className="tracked-label flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Shop The Collection
          </Link>
        </div>
      </section>
    </>
  );
}
