import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "../nav/navigation";
import { Footer } from "../footer";
import { CaseStudiesHero } from "./CaseStudiesHero";
import { CaseStudiesList } from "./CaseStudiesList";
import { CaseStudyDetail } from "./CaseStudyDetail";
import JsonData from "../../data/data.json";
import type { CaseStudy, LandingPageData } from "../../types";

const data = JsonData as LandingPageData;
const CASE_STUDIES: CaseStudy[] = data.CaseStudies;

const scrollToId = (id: string) => {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
};

export const CaseStudiesPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const selected = slug ? CASE_STUDIES.find((s) => s.slug === slug) ?? null : null;

  useEffect(() => {
    if (selected) scrollToId("cs-detail-section");
  }, [selected]);

  const handleSelect = (study: CaseStudy) => navigate(`/case-studies/${study.slug}`);
  const handleBack = () => navigate("/case-studies");
  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    scrollToId("cs-list-section");
  };

  return (
    <div>
      <Navigation />
      <main id="main">
        <CaseStudiesHero selected={selected} onBack={handleBack} />
        <CaseStudiesList
          studies={CASE_STUDIES}
          page={page}
          onPageChange={handlePageChange}
          selectedId={selected?.id ?? null}
          onSelect={handleSelect}
        />
        <CaseStudyDetail study={selected} />
      </main>
      <Footer data={data.Contact?.social} />
    </div>
  );
};
