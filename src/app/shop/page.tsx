import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { products, formatPrice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop | Paul Wayne Gregory Chocolates",
  description:
    "Hand-crafted chocolates and truffles from Paul Wayne Gregory — the Chocolate Art Collection and the Truffles Collection.",
};

export default function ShopPage() {
  const artCollection = products.filter((p) => p.collection === "chocolate-art");
  const truffles = products.filter((p) => p.collection === "truffles");

  return (
    <>
      <PageHero
        eyebrow="Choose Your Indulgence"
        heading="The Collection"
        subheading="Hand-crafted chocolates and truffles, built around one philosophy: indulgence is everything."
        image="/images/shopify-cdn/pwgartrangeone121_large.jpg"
        video={{ src: "/video/flavour-reveal.mp4" }}
      />

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
  products: typeof import("@/lib/products").products;
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
