import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

const BASE_URL = "https://www.avantiinsieme.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudies().map((study) => ({
    url: `${BASE_URL}/case-studies/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/case-studies`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...caseStudyEntries,
  ];
}
