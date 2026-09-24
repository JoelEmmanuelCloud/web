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
        eyebrow="Our Philosophy"
        heading={"Indulgence\nIs Everything"}
        subheading="Not a strapline. The standard for every recipe, every decoration, every design, every box."
        image="/images/shopify-cdn/pwg-test-images03_5d64ae09-b48f-4f11-9979-6445be256bbe.jpg"
        video={{ src: "/video/indulgence-melt.mp4" }}
      />

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper">Why A Philosophy?</p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            A Philosophy, Not A Slogan
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Most chocolate companies have a strapline. We have a philosophy.
            &ldquo;Indulgence&nbsp;is&nbsp;everything&rdquo; isn&rsquo;t a line on a box
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
              <h2 className="tracked-display text-lg text-accent sm:text-xl">
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
                content — starting with Lesson One: can indulgence be
                measured? It&rsquo;s the first time we&rsquo;ve taught this
                openly, and the first time we&rsquo;ve shown the creative
                journey behind a new range as it happens, rather than after
                the fact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper">
            Can Indulgence Be Measured?
          </p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            What Does Indulgence Really Mean?
          </h2>
          <blockquote className="flex flex-col gap-5 text-left">
            <p className="text-base leading-8 text-paper-dim">
              &ldquo;The chocolates we create are made from some of the finest
              ingredients in the world, which we have taken a great deal of
              time to source. We are proud to say that we do not use any
              artificial food flavourings or artificial flavoured
              compounds.
            </p>
            <p className="text-base leading-8 text-paper-dim">
              The concept of our style starts with the look of the chocolate
              and ends in that rich after taste of smooth silky chocolate in
              the back of the mouth, with the main flavour taking centre
              stage. This is to create an experience of indulgence, which
              created the company&rsquo;s mission of
              &lsquo;Indulgence&nbsp;is&nbsp;everything.&rsquo;
            </p>
            <p className="text-base leading-8 text-paper-dim">
              A touch of salt or a minimal percentage of sugars may be added
              to selected chocolate fillings, to simply enhance the natural
              flavour of the main ingredient or simply to bring out a hidden
              taste note of flavour, to enhance a savoury ingredient, or
              simply to balance the flavours within the mouth. This
              understanding has been discovered through careful research and
              testing with our chocolate range and concept — creating what I
              call the flavour width to build from.
            </p>
            <p className="text-base leading-8 text-paper-dim">
              Let me explain: you do not come to us to get a meal which will
              fill you, or even a stop gap between meals. People come to us
              for one reason and one reason only — a moment of pleasure, a
              moment of self indulgence, for yourself or someone special.
            </p>
            <p className="text-base leading-8 text-paper-dim">
              It&rsquo;s that fine blend of selected chocolate, perfectly
              tempered to give that crisp crunch in the mouth. With full
              flavoured centres, light and well balanced with the right
              percentage cocoa from the chocolate selected to create that
              rich smooth finish, and then, that after taste of rich smooth
              silky chocolate to savour.
            </p>
            <p className="text-base leading-8 text-paper-dim">
              To most people, this is just an experience one must undertake
              at least once in their life time. For me, this is my
              life.&rdquo;
            </p>
          </blockquote>
          <p className="tracked-label text-xs text-paper-dim">
            — P.W. Gregory
          </p>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="tracked-label text-xs text-paper-dim">
              Two styles, one Standard.
            </p>
            <h2 className="tracked-display mt-3 text-xl text-accent sm:text-2xl">
              The Styles
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
                    Art Range Bonbon
                  </h3>
                  <p className="mt-2 text-sm text-paper-dim">
                    The art range which was born out of the multi-award
                    winning classic range.
                  </p>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <Link href="/shop" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/shopify-cdn/ChampagneTruffles.02.jpg"
                    alt="Truffle collection"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 border-l border-line pl-5">
                  <h3 className="tracked-label text-xs text-paper">
                    Truffles
                  </h3>
                  <p className="mt-2 text-sm text-paper-dim">
                    Classic looking truffles with a modern feel, flavour and
                    concepts.
                  </p>
                </div>
              </Link>
            </Reveal>

            <Reveal>
              <div className="block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/shopify-cdn/pwg_paul_piping_01.jpg"
                    alt="Hot Chocolate, coming soon"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 border-l border-line pl-5">
                  <div className="flex items-center gap-3">
                    <h3 className="tracked-label text-xs text-paper">
                      Hot Chocolate
                    </h3>
                    <span className="tracked-label rounded-full border border-line px-3 py-1 text-[10px] text-paper-dim">
                      Coming Soon
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-paper-dim">
                    Taste single origin chocolate from around the world in a
                    cup of real hot chocolate.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <Link href="/windrush" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/windrush/windrush-07-box-cover-final.webp"
                    alt="Windrush truffle collection"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 border-l border-line pl-5">
                  <div className="flex items-center gap-3">
                    <h3 className="tracked-label text-xs text-paper">
                      Windrush
                    </h3>
                    <span className="tracked-label rounded-full border border-line px-3 py-1 text-[10px] text-paper-dim">
                      Coming Soon
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-paper-dim">
                    Honouring the legacy of the Windrush Generation,
                    celebrating their courage, resilience, and lasting
                    contribution to Britain.
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
