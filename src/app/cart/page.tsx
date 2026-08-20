import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { CartLineControls } from "@/components/cart-line-controls";

export const metadata: Metadata = {
  title: "Your Cart | Paul Wayne Gregory Chocolates",
  robots: { index: false, follow: true },
};

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="px-6 pt-32 pb-24 text-center sm:px-10">
        <h1 className="tracked-display text-xl text-paper sm:text-2xl">
          Your Cart
        </h1>
        <p className="mt-4 text-sm text-paper-dim">Your cart is empty.</p>
        <Link
          href="/shop"
          className="tracked-label mt-10 inline-flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-24 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="tracked-display text-xl text-paper sm:text-2xl">
          Your Cart
        </h1>

        <div className="mt-10 flex flex-col gap-6">
          {cart.lines.map((line) => (
            <div
              key={line.id}
              className="flex gap-6 border-b border-line pb-6"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-paper/5">
                {line.image && (
                  <Image
                    src={line.image}
                    alt={line.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/shop/${line.productHandle}`}
                      className="text-sm text-paper transition-colors hover:text-accent"
                    >
                      {line.title}
                    </Link>
                    {line.attributes.length > 0 && (
                      <div className="mt-1 flex flex-col gap-0.5">
                        {line.attributes.map((attr) => (
                          <p
                            key={attr.key}
                            className="text-xs text-paper-dim"
                          >
                            {attr.key}: {attr.value}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="whitespace-nowrap text-sm text-paper">
                    {formatPrice(line.linePrice)}
                  </span>
                </div>
                <CartLineControls lineId={line.id} quantity={line.quantity} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <span className="tracked-label text-xs text-paper-dim">
            Subtotal
          </span>
          <span className="text-lg text-paper">
            {formatPrice(cart.subtotal)}
          </span>
        </div>

        <a
          href={cart.checkoutUrl}
          className="tracked-label mt-8 flex h-[46px] w-full items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
