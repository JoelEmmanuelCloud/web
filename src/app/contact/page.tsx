import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { siteEmails } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact | Paul Wayne Gregory Chocolates",
  description:
    "Get in touch with Paul Wayne Gregory Chocolates — general enquiries, orders, and press.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        heading="Contact"
        subheading="Every piece is hand finished — if you have a question about an order, a flavour, or anything else, reach us directly."
        image="/images/shopify-cdn/pwg_paul_piping_01.jpg"
        video={{ src: "/video/our-craft.mp4" }}
      />

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-3 border-t border-line pt-8">
              <p className="tracked-label text-xs text-paper-dim">
                General Enquiries
              </p>
              <Link
                href={`mailto:${siteEmails.general}`}
                className="text-lg text-paper transition-colors hover:text-accent"
              >
                {siteEmails.general}
              </Link>
              <p className="text-sm text-paper-dim">
                Questions about our chocolates, the Bespoke Box, press, or
                anything else.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-3 border-t border-line pt-8">
              <p className="tracked-label text-xs text-paper-dim">
                Orders &amp; Sales
              </p>
              <Link
                href={`mailto:${siteEmails.webSales}`}
                className="text-lg text-paper transition-colors hover:text-accent"
              >
                {siteEmails.webSales}
              </Link>
              <p className="text-sm text-paper-dim">
                For order tracking, delivery questions, or help with an
                existing order.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
