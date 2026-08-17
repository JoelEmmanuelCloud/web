import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STATE_COOKIE = "shopify_oauth_state";

function verifyHmac(searchParams: URLSearchParams, secret: string): boolean {
  const hmac = searchParams.get("hmac");
  if (!hmac) return false;

  const message = Array.from(searchParams.entries())
    .filter(([key]) => key !== "hmac" && key !== "signature")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const digest = createHmac("sha256", secret).update(message).digest("hex");

  const digestBuffer = Buffer.from(digest, "utf8");
  const hmacBuffer = Buffer.from(hmac, "utf8");
  if (digestBuffer.length !== hmacBuffer.length) return false;

  return timingSafeEqual(digestBuffer, hmacBuffer);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;

  if (!domain || !clientId || !clientSecret) {
    return NextResponse.json(
      {
        error:
          "Missing SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_CLIENT_ID, or SHOPIFY_ADMIN_CLIENT_SECRET",
      },
      { status: 500 },
    );
  }

  const shop = url.searchParams.get("shop");
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (shop !== domain) {
    return NextResponse.json({ error: "Shop mismatch" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(STATE_COOKIE)?.value;
  cookieStore.delete(STATE_COOKIE);

  if (!state || !expectedState || state !== expectedState) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
  }

  if (!verifyHmac(url.searchParams, clientSecret)) {
    return NextResponse.json({ error: "Invalid HMAC signature" }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const tokenRes = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: `Token exchange failed: ${tokenRes.status}` },
      { status: 502 },
    );
  }

  const tokenJson = (await tokenRes.json()) as {
    access_token: string;
    scope: string;
  };

  return new NextResponse(
    `<!doctype html>
<html>
  <body style="font-family: monospace; padding: 2rem; max-width: 640px; margin: 0 auto;">
    <h1>MyInline app installed</h1>
    <p>Copy this access token into <code>SHOPIFY_ADMIN_API_ACCESS_TOKEN</code> in your environment variables, then remove this page's output from your terminal history.</p>
    <pre style="background: #eee; padding: 1rem; white-space: pre-wrap; word-break: break-all;">${tokenJson.access_token}</pre>
    <p>Granted scopes:</p>
    <pre style="background: #eee; padding: 1rem; white-space: pre-wrap;">${tokenJson.scope}</pre>
  </body>
</html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
