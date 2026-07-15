import type { Metadata } from "next";
import { CaseStudiesView } from "@/components/caseStudies/CaseStudiesView";

export const metadata: Metadata = {
  title: "Case Studies | Avanti Insieme Consulting",
  description:
    "Real projects, real outcomes — a look at how Avanti Insieme Consulting has helped businesses bridge digital, hardware, and human expertise.",
  alternates: {
    canonical: "https://www.avantiinsieme.ca/case-studies",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesView />;
}
