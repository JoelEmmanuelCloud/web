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
        video={{ src: "/video/makers-hands.mp4" }}
      />

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
          <p className="tracked-label text-xs text-accent">Behind The Craft</p>
          <h2 className="tracked-display text-xl text-paper sm:text-2xl">
            A Master Of This Craft
          </h2>
          <p className="text-base leading-8 text-paper-dim">
            Paul Wayne Gregory is a multi-award winning chocolatier. Every
            recipe carries his own philosophy — indulgence is everything —
            a standard he developed himself and holds every creation to
            before it earns a place in the collection.
          </p>
          <p className="text-base leading-8 text-paper-dim">
            Read more about that philosophy, and the taste framework behind
            it, on the{" "}
            <Link
              href="/philosophy"
              className="text-paper underline underline-offset-4 transition-colors hover:text-accent"
            >
              Philosophy page
            </Link>
            .
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
