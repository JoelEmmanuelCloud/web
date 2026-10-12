import { getCartCount } from "@/lib/cart";

export async function CartBadge() {
  const count = await getCartCount();
  if (count === 0) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] text-accent-ink">
      {count}
    </span>
  );
}
