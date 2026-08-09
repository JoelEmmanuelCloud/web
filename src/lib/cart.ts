"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  shopifyCartCreate,
  shopifyCartLinesAdd,
  shopifyCartLinesUpdate,
  shopifyCartLinesRemove,
  shopifyFetchCart,
  fetchProductVariantsByHandle,
  type Cart,
} from "@/lib/shopify";

const CART_COOKIE = "cart_id";

async function getCartId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

async function setCartId(id: string) {
  const store = await cookies();
  store.set(CART_COOKIE, id, {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    path: "/",
  });
}

export async function getCart(): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) return null;
  return shopifyFetchCart(cartId);
}

export async function getCartCount(): Promise<number> {
  const cart = await getCart();
  return cart?.totalQuantity ?? 0;
}

export async function addToCart(
  variantId: string,
  quantity: number = 1,
  attributes?: { key: string; value: string }[],
) {
  const cartId = await getCartId();
  const line = { merchandiseId: variantId, quantity, attributes };

  if (!cartId) {
    const cart = await shopifyCartCreate([line]);
    if (cart) await setCartId(cart.id);
  } else {
    const cart = await shopifyCartLinesAdd(cartId, [line]);
    if (!cart) {
      const newCart = await shopifyCartCreate([line]);
      if (newCart) await setCartId(newCart.id);
    }
  }

  revalidatePath("/", "layout");
}

export async function updateCartLineQuantity(lineId: string, quantity: number) {
  const cartId = await getCartId();
  if (!cartId) return;

  if (quantity <= 0) {
    await shopifyCartLinesRemove(cartId, [lineId]);
  } else {
    await shopifyCartLinesUpdate(cartId, [{ id: lineId, quantity }]);
  }

  revalidatePath("/", "layout");
}

export async function removeCartLine(lineId: string) {
  const cartId = await getCartId();
  if (!cartId) return;
  await shopifyCartLinesRemove(cartId, [lineId]);
  revalidatePath("/", "layout");
}

export async function addBespokeBoxToCart(input: {
  size: number;
  personalised: boolean;
  attributes: { key: string; value: string }[];
}): Promise<{ ok: boolean }> {
  const variants = await fetchProductVariantsByHandle("bespoke-chocolate-box");
  const match = variants.find(
    (v) =>
      v.options["Size"] === `${input.size} pieces` &&
      v.options["Personalisation"] ===
        (input.personalised ? "Personalised" : "None"),
  );

  if (!match) {
    console.error("No matching Bespoke Chocolate Box variant found", input);
    return { ok: false };
  }

  await addToCart(match.id, 1, input.attributes);
  return { ok: true };
}
