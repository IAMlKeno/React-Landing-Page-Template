import JsonData from "@/data/data.json";
import type { CaseStudy, LandingPageData } from "@/types";

const data = JsonData as LandingPageData;

export const getAllCaseStudies = (): CaseStudy[] => data.CaseStudies;

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  data.CaseStudies.find((study) => study.slug === slug);

export const getCaseStudyDescription = (study: CaseStudy, maxLength = 160): string => {
  const raw = Array.isArray(study.body) ? study.body.join(" ") : study.body;
  const plain = raw.replace(/[#*_`>-]/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > maxLength ? `${plain.slice(0, maxLength - 1).trimEnd()}…` : plain;
};
