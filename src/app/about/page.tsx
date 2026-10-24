import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Paul Wayne Gregory Chocolates",
  description:
    "Meet Paul Wayne Gregory, the multi-award winning chocolatier behind every recipe.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        heading="Paul Wayne Gregory"
        subheading="Multi-award winning chocolatier."
        image="/images/shopify-cdn/pwg_paul_piping_01.jpg"
        video={{ src: "/video/tempering-craft.mp4" }}
      />

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper">Behind The Craft</p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            A Master Of This Craft
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Paul Wayne Gregory is a multi-award-winning chocolatier. Every
            recipe carries his own philosophy: indulgence&nbsp;is&nbsp;everything.
            This is a standard he developed himself and holds every creation
            to before it earns a place in the collection.
          </p>
          <p className="text-base leading-8 text-paper-dim">
            Read more about that philosophy and the taste framework behind it
            below.
          </p>
          <Link
            href="/philosophy"
            className="tracked-label text-xs text-paper underline underline-offset-4 transition-colors hover:text-accent"
          >
            Our Philosophy
          </Link>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper-dim">
            How It Started
          </p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            From The Kitchen To The Craft
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Paul started out as a baker before moving into the main kitchen
            as a chef. Something felt missing, so he retrained as a pastry
            chef and that&rsquo;s where he discovered chocolate and fell
            completely in love with working with it.
          </p>
          <p className="text-base leading-8 text-paper-dim">
            The true turning point came while training in France with Jean
            Valentine. He pointed out Paul&rsquo;s natural flair for
            chocolate and urged him to go all in. Paul later worked under
            master chocolatier Oriol Balaguer, where he could fully express
            his creativity without limits and, as they like to say, fell
            deep into the rabbit hole.
          </p>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper">
            What Makes It Different
          </p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            One Ingredient, Endless Possibility
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            &ldquo;It&rsquo;s the one ingredient that lends itself to
            everything. You can eat it raw, cook with it, build displays,
            paint, create truffles, bars, but most of all, it&rsquo;s simple
            but so complex.&rdquo;
          </p>
          <p className="tracked-label text-xs text-paper-dim">
            Paul Wayne Gregory
          </p>
          <p className="text-base leading-8 text-paper-dim">
            Every recipe starts from a philosophy first: flavour, look and
            feel, and the experience they create together, before it ever
            becomes a chocolate.
          </p>
          <Link
            href="/philosophy"
            className="tracked-label text-xs text-paper underline underline-offset-4 transition-colors hover:text-accent"
          >
            Our Philosophy
          </Link>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper-dim">
            The Proudest Moment
          </p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            The Chocolate That Started It All
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Of everything Paul has created, from displays and sculptures to
            paintings in chocolate, one moment stands above the rest: his first
            award-winning chocolate, the Passion Fruit Bonbon. It was the
            first piece to tell the full indulgence story, exactly as he
            imagined it, and it set the philosophy the whole company is still
            built on today.
          </p>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper">
            Recognition
          </p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            Awards &amp; Achievements
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Paul set himself one goal with the Pure Indulgence range: every
            single chocolate in it had to win an award. He achieved it,
            earning three Awards of Excellence alongside roughly twenty
            additional medals spanning gold, silver, and bronze, including
            one bronze he later reworked until it won gold. He accomplished
            all of this within five years and was appointed a Chocolate
            Ambassador along the way.
          </p>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper-dim">
            Looking Ahead
          </p>
          <h2 className="tracked-display text-[length:clamp(1rem,calc((100vw_-_4rem)/14.5),1.25rem)] leading-[calc(1.75/1.25)] text-accent sm:text-2xl sm:leading-[calc(2/1.5)]">
            Craftsmanship, Passed On
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Craftsmanship of this kind is a fading skill, and passing it on
            matters to Paul; teaching is part of where he wants to take the
            brand next. Before that, one more collection is coming: the
            &ldquo;More Indulgence&rdquo; range, the next chapter after Pure
            Indulgence.
          </p>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-center sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <p className="tracked-label text-xs text-accent">
            In His Own Words
          </p>
          <p className="text-base italic leading-8 text-paper-dim">
            &ldquo;If someone remembers only one thing about the brand, I
            want it to be that I was able to give them a special moment:
            that moment of self-indulgence.&rdquo;
          </p>
          <p className="tracked-label text-xs text-paper-dim">
            Paul Wayne Gregory
          </p>
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
