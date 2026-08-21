import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (process.env.COMING_SOON_MODE === "true") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
