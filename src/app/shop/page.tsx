import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getProducts, formatPrice, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop | Paul Wayne Gregory Chocolates",
  description:
    "Hand-crafted chocolates and truffles from Paul Wayne Gregory — the Chocolate Art Collection and the Truffles Collection.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getProducts();
  const artCollection = products.filter((p) => p.collection === "chocolate-art");
  const truffles = products.filter((p) => p.collection === "truffles");

  return (
    <>
      <PageHero
        eyebrow="Choose Your Indulgence"
        heading="The Collection"
        subheading="Hand-crafted chocolates and truffles, created from one philosophy: indulgence is everything."
        image="/images/shopify-cdn/pwgartrangeone121_large.jpg"
        video={{ src: "/video/flavour-reveal.mp4" }}
      />

      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="tracked-label text-xs text-paper-dim">
              Two Styles, One Standard
            </p>
            <h2 className="tracked-display mt-3 text-xl text-accent sm:text-2xl">
              Behind Each Style
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <video
                  className="h-full w-full object-cover"
                  src="/video/shop-bonbons-creation.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                />
              </div>
              <div className="mt-5 border-l border-line pl-5">
                <h3 className="tracked-label text-xs text-paper">
                  Chocolate Bonbons
                </h3>
              </div>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <video
                  className="h-full w-full object-cover"
                  src="/video/shop-truffles-creation.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                />
              </div>
              <div className="mt-5 border-l border-line pl-5">
                <h3 className="tracked-label text-xs text-paper">
                  Truffles
                </h3>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProductSection title="Chocolate Art Collection" products={artCollection} />
      <ProductSection title="Truffles Collection" products={truffles} tone="raised" />
    </>
  );
}

function ProductSection({
  title,
  products,
  tone = "base",
}: {
  title: string;
  products: Product[];
  tone?: "base" | "raised";
}) {
  return (
    <section
      className={`px-6 py-24 sm:px-10 ${tone === "raised" ? "bg-ink-raised" : "bg-ink"}`}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="tracked-display mb-14 text-center text-xl text-paper sm:text-2xl">
          {title}
        </h2>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Reveal key={product.slug}>
              <Link href={`/shop/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-paper/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="tracked-label text-xs text-paper">
                    {product.name}
                  </h3>
                  <span className="whitespace-nowrap text-sm text-paper-dim">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-paper-dim">{product.hook}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
