"use client";

import { useTransition } from "react";
import { updateCartLineQuantity, removeCartLine } from "@/lib/cart";

export function CartLineControls({
  lineId,
  quantity,
}: {
  lineId: string;
  quantity: number;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(() => updateCartLineQuantity(lineId, quantity - 1))
          }
          className="h-8 w-8 border border-line text-paper-dim transition-colors hover:border-paper-dim disabled:opacity-30"
        >
          &minus;
        </button>
        <span className="w-6 text-center text-sm text-paper">{quantity}</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(() => updateCartLineQuantity(lineId, quantity + 1))
          }
          className="h-8 w-8 border border-line text-paper-dim transition-colors hover:border-paper-dim disabled:opacity-30"
        >
          +
        </button>
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => removeCartLine(lineId))}
        className="tracked-label text-[10px] text-paper-dim underline transition-colors hover:text-paper disabled:opacity-30"
      >
        Remove
      </button>
    </div>
  );
}
