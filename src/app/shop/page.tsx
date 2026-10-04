import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getShopProducts, formatPrice, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop | Paul Wayne Gregory Chocolates",
  description:
    "Hand-crafted chocolates and truffles from Paul Wayne Gregory — the Chocolate Art Collection and the Truffles Collection.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getShopProducts();
  const artCollection = products.filter((p) => p.collection === "chocolate-art");
  const truffles = products.filter((p) => p.collection === "truffles");

  return (
    <>
      <PageHero
        eyebrow="Choose Your Indulgence"
        heading="The Collection"
        subheading="Hand-crafted chocolates and truffles, created from one philosophy: indulgence&nbsp;is&nbsp;everything."
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
  products: Product[];
  tone?: "base" | "raised";
}) {
  return (
    <section
      className={`px-6 py-24 sm:px-10 ${tone === "raised" ? "bg-ink-raised" : "bg-ink"}`}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="tracked-display mb-14 text-center text-xl text-accent sm:text-2xl">
          {title}
        </h2>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Reveal key={product.slug}>
              {product.status === "coming-soon" ? (
                <div>
                  <ProductCardBody product={product} />
                </div>
              ) : (
                <Link href={`/shop/${product.slug}`} className="group block">
                  <ProductCardBody product={product} />
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCardBody({ product }: { product: Product }) {
  return (
    <>
      {product.cardImage ? (
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-studio">
          <div
            className={`absolute transition-transform duration-700 group-hover:scale-105 ${
              product.cardImageFull ? "inset-0" : "inset-6 sm:inset-8"
            }`}
          >
            <Image
              src={product.cardImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={
                product.cardImageFull
                  ? "object-contain"
                  : "object-contain [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent),linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
              }
            />
          </div>
        </div>
      ) : (
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-paper/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="tracked-label text-xs text-paper">
          {product.name}
        </h3>
        {product.status !== "coming-soon" && (
          <span className="whitespace-nowrap text-sm text-paper-dim">
            {product.availableForSale
              ? formatPrice(product.price)
              : "Sold Out"}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-paper-dim">
        {product.status === "coming-soon" ? "Coming Soon" : product.hook}
      </p>
    </>
  );
}
