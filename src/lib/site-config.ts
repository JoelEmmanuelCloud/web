export type NavItem = {
  label: string;
  href: string;
};

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://paulwaynegregory.com";
}

export const siteUrl = resolveSiteUrl();

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "Bespoke Box", href: "/bespoke-box" },
];

export const footerInfoLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Refund Policy", href: "/policies/refund-policy" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
  { label: "Terms of Service", href: "/policies/terms-of-service" },
];

export const socialLinks = {
  instagram: "https://www.instagram.com/pwg_chocolates",
  x: "https://twitter.com/pwg_chocolate",
};

export const siteEmails = {
  general: "info@paulwaynegregory.com",
  webSales: "websales@paulwaynegregory.com",
};
