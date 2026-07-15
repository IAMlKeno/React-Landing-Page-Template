import { CaseStudiesHero } from "./CaseStudiesHero";
import { CaseStudiesListClient } from "./CaseStudiesListClient";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { ScrollToSelectedStudy } from "./ScrollToSelectedStudy";
import { getAllCaseStudies, getCaseStudyBySlug } from "../../lib/case-studies";

interface Props {
  slug?: string;
}

export const CaseStudiesView = ({ slug }: Props) => {
  const studies = getAllCaseStudies();
  const selected = slug ? getCaseStudyBySlug(slug) ?? null : null;

  return (
    <main id="main">
      <ScrollToSelectedStudy slug={slug} />
      <CaseStudiesHero selected={selected} />
      <CaseStudiesListClient studies={studies} selectedSlug={selected?.slug} />
      <CaseStudyDetail study={selected} />
    </main>
  );
};
