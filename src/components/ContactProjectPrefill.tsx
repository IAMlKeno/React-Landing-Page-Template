"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getCaseStudyBySlug } from "../lib/case-studies";
import type { CaseStudy } from "../types";

interface Props {
  onPrefill: (study: CaseStudy) => void;
}

// Isolated so only this (invisible) node depends on useSearchParams — Next
// requires that hook to sit under a Suspense boundary during static export,
// and keeping the boundary this narrow means the surrounding form/footer
// still render eagerly instead of dropping out of the static HTML.
export const ContactProjectPrefill = ({ onPrefill }: Props) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const slug = searchParams.get("project");
    if (!slug) return;
    const study = getCaseStudyBySlug(slug);
    if (study) onPrefill(study);
  }, [searchParams, onPrefill]);

  return null;
};
