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
            Paul Wayne Gregory is a multi-award winning chocolatier. Every
            recipe carries his own philosophy — indulgence&nbsp;is&nbsp;everything —
            a standard he developed himself and holds every creation to
            before it earns a place in the collection.
          </p>
          <p className="text-base leading-8 text-paper-dim">
            Read more about that philosophy, and the taste framework behind
            it, below.
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
            Paul started out as a baker, then moved into a main kitchen as a
            chef. It didn&rsquo;t feel right, so he trained as a pastry chef —
            and it was there that he found chocolate, and his true love of
            working with it.
          </p>
          <p className="text-base leading-8 text-paper-dim">
            The turning point came while training in France with Jean
            Valtintine, who told him he had a natural flair for chocolate and
            should go all in. He went on to work under master chocolatier
            Orial Balalgure, where he was able to express himself fully and,
            in his own words, &ldquo;fell deep into the rabbit hole.&rdquo;
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
            everything,&rdquo; Paul says. &ldquo;You can eat it raw, cook with
            it, build displays, paint, create truffles, bars — but most of
            all, it&rsquo;s simple but so complex.&rdquo;
          </p>
          <p className="text-base leading-8 text-paper-dim">
            Every recipe starts from a philosophy first — flavour, look and
            feel, and the experience they create together — before it ever
            becomes a chocolate. Read more about that philosophy on its own
            page.
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
            Of everything Paul has created — displays, sculptures, paintings
            in chocolate — one moment stands above the rest: his first
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
            Paul set himself one goal with the Pure Indulgence range: that
            every single chocolate in it would win an award. He achieved it —
            three Awards of Excellence, and around twenty further medals
            across gold, silver and bronze, including one bronze he later
            reworked until it won gold. He achieved all of it within five
            years, and was called up for Chocolate Ambassadorship along the
            way.
          </p>
        </div>
      </section>

      <section className="bg-ink-raised px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-paper-dim">
            Looking Ahead
          </p>
          <h2 className="tracked-display text-xl text-accent sm:text-2xl">
            Craftsmanship, Passed On
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Craftsmanship of this kind is a fading skill, and passing it on
            matters to Paul — teaching is part of where he wants to take the
            brand next. Before that, one more collection is coming: the
            &ldquo;More Indulgence&rdquo; range, the next chapter after Pure
            Indulgence.
          </p>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-center sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <p className="tracked-label text-xs text-paper-dim">
            In His Own Words
          </p>
          <p className="text-base leading-8 text-paper-dim">
            &ldquo;If someone remembers only one thing about the brand, I
            want it to be that I was able to give them a moment — that moment
            of self indulgence.&rdquo;
          </p>
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
