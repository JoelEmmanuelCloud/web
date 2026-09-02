export type NavItem = {
  label: string;
  href: string;
};

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return "https://www.paulwaynegregory.com";
}

export const siteUrl = resolveSiteUrl();

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Windrush", href: "/windrush" },
  { label: "Contact", href: "/contact" },
  { label: "Bespoke Box", href: "/bespoke-box" },
];

export const socialLinks = {
  facebook: "https://www.facebook.com",
};

export const footerInfoLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Refund Policy", href: "/policies/refund-policy" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
  { label: "Terms of Service", href: "/policies/terms-of-service" },
];

export const siteEmails = {
  general: "info@paulwaynegregory.com",
  webSales: "websales@paulwaynegregory.com",
};
