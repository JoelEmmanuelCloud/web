"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/lib/cart";

export function AddToCartButton({ variantId }: { variantId: string }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  function handleClick() {
    startTransition(async () => {
      await addToCart(variantId, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="tracked-label flex h-[46px] w-full max-w-xs items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60"
    >
      {isPending ? "Adding…" : added ? "Added To Cart" : "Add To Cart"}
    </button>
  );
}
