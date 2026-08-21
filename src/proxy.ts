import { NextResponse, type NextRequest } from "next/server";

const BYPASS_COOKIE = "pwg_preview";
const BYPASS_PARAM = "preview";

export function proxy(request: NextRequest) {
  const comingSoonEnabled = process.env.COMING_SOON_MODE === "true";
  if (!comingSoonEnabled) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/coming-soon" || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const bypassSecret = process.env.PREVIEW_BYPASS_SECRET;
  const suppliedSecret = searchParams.get(BYPASS_PARAM);
  if (bypassSecret && suppliedSecret === bypassSecret) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete(BYPASS_PARAM);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(BYPASS_COOKIE, bypassSecret, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    });
    return response;
  }

  const hasBypassCookie =
    bypassSecret && request.cookies.get(BYPASS_COOKIE)?.value === bypassSecret;
  if (hasBypassCookie) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|images/|video/|fonts/).*)",
  ],
};
