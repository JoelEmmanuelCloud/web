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
  { src: "/images/gallery/gallery-01.webp", width: 960, height: 1117 },
  { src: "/images/gallery/gallery-02.webp", width: 1949, height: 2000 },
  { src: "/images/gallery/gallery-03.webp", width: 1264, height: 842 },
  { src: "/images/gallery/gallery-04.webp", width: 912, height: 1182 },
  { src: "/images/gallery/gallery-05.webp", width: 880, height: 1198 },
  { src: "/images/gallery/gallery-06.webp", width: 1264, height: 842 },
  { src: "/images/gallery/gallery-07.webp", width: 1022, height: 1538 },
  { src: "/images/gallery/gallery-08.webp", width: 1577, height: 2000 },
  { src: "/images/gallery/gallery-09.webp", width: 1366, height: 768 },
  { src: "/images/gallery/gallery-10.webp", width: 736, height: 1449 },
  { src: "/images/gallery/gallery-11.webp", width: 1333, height: 2000 },
  { src: "/images/gallery/gallery-12.webp", width: 1264, height: 842 },
  { src: "/images/gallery/gallery-13.webp", width: 832, height: 1254 },
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
