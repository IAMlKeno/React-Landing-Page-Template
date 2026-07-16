import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.squatwithconfidence.ca/",
      lastModified: "2026-07-16",
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
