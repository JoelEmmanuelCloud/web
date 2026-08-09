import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent-loader";
import { siteUrl, socialLinks } from "@/lib/site-config";
import { getCartCount } from "@/lib/cart";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const title = "Paul Wayne Gregory Chocolates";
const description =
  "Multi-award winning chocolatier Paul Wayne Gregory. Indulgence is everything.";
const shareImage = "/images/shopify-cdn/pwgartrangeone121.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
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
  sameAs: [socialLinks.instagram, socialLinks.x],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cartCount = await getCartCount();

  return (
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader cartCount={cartCount} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
