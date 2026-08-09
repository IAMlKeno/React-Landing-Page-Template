import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCaseStudies, getCaseStudyBySlug, getCaseStudyDescription } from "@/lib/case-studies";
import { CaseStudiesView } from "@/components/caseStudies/CaseStudiesView";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  const description = getCaseStudyDescription(study);
  const url = `https://www.squatwithconfidence.ca/case-studies/${study.slug}`;

  return {
    title: `${study.title} | Squat with Confidence`,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: study.title, description, url },
    twitter: { card: "summary_large_image", title: study.title, description },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();
  return <CaseStudiesView slug={slug} />;
}
