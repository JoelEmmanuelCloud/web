import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { MYINLINE_ADMIN_API_SCOPES } from "@/lib/shopify-admin";

export const runtime = "nodejs";

const STATE_COOKIE = "shopify_oauth_state";

export async function GET(request: Request) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
  if (!domain || !clientId) {
    return NextResponse.json(
      { error: "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_CLIENT_ID" },
      { status: 500 },
    );
  }

  const state = randomBytes(16).toString("hex");
  const redirectUri = new URL("/api/shopify/callback", request.url).toString();

  const authorizeUrl = new URL(`https://${domain}/admin/oauth/authorize`);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("scope", MYINLINE_ADMIN_API_SCOPES.join(","));
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);

  const cookieStore = await cookies();
  cookieStore.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  return NextResponse.redirect(authorizeUrl.toString());
}
