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

const galleryImages = [
  "/images/gallery/gallery-01.webp",
  "/images/gallery/gallery-02.webp",
  "/images/gallery/gallery-03.webp",
  "/images/gallery/gallery-04.webp",
  "/images/gallery/gallery-05.webp",
  "/images/gallery/gallery-06.webp",
  "/images/gallery/gallery-07.webp",
  "/images/gallery/gallery-08.webp",
  "/images/gallery/gallery-09.webp",
  "/images/gallery/gallery-10.webp",
  "/images/gallery/gallery-11.webp",
  "/images/gallery/gallery-12.webp",
  "/images/gallery/gallery-13.webp",
];

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
          <div className="mt-16 flex justify-center gap-8">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="tracked-label text-xs text-paper-dim transition-colors hover:text-paper"
            >
              Instagram
            </a>
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
