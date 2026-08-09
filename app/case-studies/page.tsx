import type { Metadata } from "next";
import { CaseStudiesView } from "@/components/caseStudies/CaseStudiesView";

export const metadata: Metadata = {
  title: "Case Studies | Squat with Confidence",
  description:
    "Real client success stories from Squat with Confidence coaching programs in Prince Edward Island.",
  alternates: { canonical: "https://www.squatwithconfidence.ca/case-studies" },
};

export default function CaseStudiesPage() {
  return <CaseStudiesView />;
}
