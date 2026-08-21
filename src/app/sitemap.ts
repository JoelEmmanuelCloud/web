import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { siteUrl } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.COMING_SOON_MODE === "true") return [];

  const now = new Date();
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/philosophy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/bespoke-box`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/policies/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/policies/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/policies/shipping-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/policies/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
