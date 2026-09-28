import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Bespoke Box | Paul Wayne Gregory Chocolates",
  description:
    "Design your own luxury truffle box — your style, your flavours, your name on the lid.",
  alternates: { canonical: "/bespoke-box" },
};

export default function BespokeBoxPage() {
  return (
    <>
      <PageHero
        eyebrow="Commission A Box"
        heading="A Personal Creation"
        subheading="Whatever you imagine, your box becomes. Every detail invites personalisation."
        image="/images/bespoke/bespoke-hero-crest-box.webp"
        framed={{
          width: 1014,
          height: 1080,
          alt: "A black bespoke chocolate box printed with a white heraldic crest, set on a candlelit dinner table beside a matching place card",
        }}
      />

      <section className="bg-blush px-6 py-20 text-center sm:px-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <p className="tracked-display text-lg text-blush-ink sm:text-xl">
            Configure Yours
          </p>
          <p className="text-base leading-8 text-blush-ink/70">
            Choose your box, mix your flavours, and add your name or logo to
            the lid — a step-by-step build with a live preview and price the
            whole way through.
          </p>
          <p className="tracked-label flex h-[52px] items-center justify-center rounded-full bg-accent px-10 text-sm text-accent-ink shadow-lg shadow-accent/30">
            Coming Soon
          </p>
        </div>
      </section>
    </>
  );
}
