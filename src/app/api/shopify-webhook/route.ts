import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

function isValidSignature(body: string, signature: string | null) {
  const secret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(body, "utf8").digest();
  const received = Buffer.from(signature, "base64");
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  if (!isValidSignature(body, request.headers.get("x-shopify-hmac-sha256"))) {
    return new Response(null, { status: 401 });
  }
  revalidateTag("shopify-products", { expire: 0 });
  return new Response(null, { status: 200 });
}
