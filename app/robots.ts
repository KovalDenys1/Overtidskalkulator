import type { MetadataRoute } from "next";

const siteUrl = "https://overtidskalkulator.no";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/print",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
