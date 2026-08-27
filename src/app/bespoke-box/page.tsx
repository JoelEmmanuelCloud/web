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
        image="/images/shopify-cdn/12chocos_B.jpg"
        video={{ src: "/video/bespoke-ribbon.mp4" }}
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
          <p className="tracked-label flex h-[46px] items-center justify-center rounded-full border border-blush-ink px-8 text-xs text-blush-ink">
            Coming Soon
          </p>
        </div>
      </section>
    </>
  );
}
