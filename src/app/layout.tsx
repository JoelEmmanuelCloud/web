import type { Metadata, Viewport } from "next";
import { Raleway, Fraunces } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent-loader";
import { siteUrl } from "@/lib/site-config";
import { getCartCount } from "@/lib/cart";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal"],
  axes: ["SOFT", "opsz"],
});

const title = "Paul Wayne Gregory Chocolates";
const description =
  "Multi-award winning chocolatier Paul Wayne Gregory. Indulgence is everything.";
const shareImage = "/images/shopify-cdn/pwgartrangeone121.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: [{ url: shareImage }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0b09",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: title,
  url: siteUrl,
  logo: `${siteUrl}/images/brand/pwg-logo-GRY.png`,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headersList = await headers();
  const isGated = headersList.get("x-pwg-gate") === "coming-soon";
  const cartCount = isGated ? 0 : await getCartCount();

  return (
    <html
      lang="en"
      className={`${raleway.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {!isGated && <SiteHeader cartCount={cartCount} />}
        <main className="flex-1">{children}</main>
        {!isGated && <SiteFooter />}
        {!isGated && <CookieConsent />}
      </body>
    </html>
  );
}
