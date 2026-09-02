"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/lib/cart";

export function AddToCartButton({ variantId }: { variantId: string }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  function handleClick() {
    setError(false);
    startTransition(async () => {
      const result = await addToCart(variantId, 1);
      if (result.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      } else {
        setError(true);
      }
    });
  }

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="tracked-label flex h-[46px] w-full items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60"
      >
        {isPending ? "Adding…" : added ? "Added To Cart" : "Add To Cart"}
      </button>
      {error && (
        <p className="text-xs text-accent">
          Something went wrong adding this to your cart — please try again.
        </p>
      )}
    </div>
  );
}
