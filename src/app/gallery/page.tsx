import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GalleryGrid } from "@/components/gallery-grid";
import { socialLinks } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gallery | Paul Wayne Gregory Chocolates",
  description:
    "Showpieces, competition work, and the craft behind Paul Wayne Gregory Chocolates.",
  alternates: { canonical: "/gallery" },
};

const galleryImages = Array.from(
  { length: 11 },
  (_, i) => `/images/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
).concat("/images/gallery/gallery-12.jpeg");

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Showpieces &amp; Commissioned Work"
        heading="Gallery"
        subheading="Multi-award winning work, from commissioned art pieces to centre showpieces."
        image="/images/shopify-cdn/pwg-test-images03.jpg"
        video={{ src: "/video/gallery-reveal.mp4" }}
      />

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid images={galleryImages} />
          <div className="mt-16 flex justify-center">
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="tracked-label text-xs text-paper-dim transition-colors hover:text-paper"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
