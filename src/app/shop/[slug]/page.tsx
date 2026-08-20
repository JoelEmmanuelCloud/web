import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getProductBySlug, formatPrice, getProducts } from "@/lib/products";
import { siteEmails, siteUrl } from "@/lib/site-config";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} | Paul Wayne Gregory Chocolates`;
  return {
    title,
    description: product.hook,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title,
      description: product.hook,
      url: `${siteUrl}/shop/${product.slug}`,
      siteName: "Paul Wayne Gregory Chocolates",
      images: [{ url: product.image }],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.hook,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const enquireHref = `mailto:${siteEmails.webSales}?subject=${encodeURIComponent(
    `Enquiry: ${product.name}`,
  )}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.hook,
    image: `${siteUrl}${product.image}`,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/shop/${product.slug}`,
      priceCurrency: "GBP",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="px-6 pt-32 pb-24 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Link
          href="/shop"
          className="tracked-label mb-10 inline-block text-xs text-paper-dim transition-colors hover:text-paper"
        >
          &larr; Back To Shop
        </Link>

        <div className="grid gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-paper/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {product.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-2xl bg-paper/5"
                  >
                    <Image
                      src={src}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 33vw, 16vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h1 className="tracked-display text-xl text-paper sm:text-2xl">
                {product.name}
              </h1>
              <p className="tracked-label mt-3 text-xs text-accent">
                {product.hook}
              </p>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="text-lg text-paper">
                  {formatPrice(product.price)}
                </span>
                {product.serving && (
                  <span className="text-sm text-paper-dim">
                    Serving {product.serving}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {product.variantId ? (
                <AddToCartButton variantId={product.variantId} />
              ) : (
                <Link
                  href={enquireHref}
                  className="tracked-label flex h-[46px] w-full max-w-xs items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  Enquire To Order
                </Link>
              )}
              {product.variantId && (
                <Link
                  href={enquireHref}
                  className="tracked-label text-xs text-paper-dim transition-colors hover:text-paper"
                >
                  Or enquire about this product
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-line pt-8">
              {product.description.map((paragraph, i) => (
                <p key={i} className="text-base leading-8 text-paper-dim">
                  {paragraph}
                </p>
              ))}
            </div>

            {product.flavours && (
              <div className="flex flex-col gap-5 border-t border-line pt-8">
                <p className="tracked-label text-xs text-paper-dim">
                  Flavours In This Box
                </p>
                {product.flavours.map((flavour) => (
                  <Reveal key={flavour.name}>
                    <div>
                      <p className="text-sm text-paper">{flavour.name}</p>
                      <p className="mt-1 text-sm text-paper-dim">
                        {flavour.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-line pt-8">
              <p className="tracked-label text-xs text-paper-dim">
                Ingredients &amp; Allergens
              </p>
              <p className="text-sm leading-7 text-paper-dim">
                {product.ingredients}
              </p>
              <p className="text-sm leading-7 text-paper-dim">
                {product.allergens}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="tracked-label rounded-full border border-line px-4 py-2 text-[10px] text-paper-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
