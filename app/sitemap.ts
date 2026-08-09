import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyUrls: MetadataRoute.Sitemap = getAllCaseStudies().map((study) => ({
    url: `https://www.squatwithconfidence.ca/case-studies/${study.slug}`,
    lastModified: "2026-07-16",
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.squatwithconfidence.ca/",
      lastModified: "2026-07-16",
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://www.squatwithconfidence.ca/case-studies",
      lastModified: "2026-07-16",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudyUrls,
  ];
}
