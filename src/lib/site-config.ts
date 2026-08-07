export type NavItem = {
  label: string;
  href: string;
};

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
