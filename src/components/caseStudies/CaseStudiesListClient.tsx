"use client";

import { useState } from "react";
import { CardGrid } from "@/components/common/CardGrid";
import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudy } from "@/types";

interface Props {
  studies: CaseStudy[];
  selectedSlug?: string;
}

const PAGE_SIZE = 6;

export const CaseStudiesListClient = ({ studies, selectedSlug }: Props) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(studies.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, studies.length);
  const pageStudies = studies.slice(start, end);

  const goToPage = (next: number) => {
    setPage(next);
    document.getElementById("cs-list-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="cs-list-section" className="ai-cs-list">
      <div className="ai-cs-list-content">
        <div className="ai-cs-list-header">
          <h2>All Case Studies</h2>
          {studies.length > 0 && (
            <span className="ai-cs-range-label">
              Showing {start + 1}–{end} of {studies.length}
            </span>
          )}
        </div>

        <CardGrid minCardWidth="300px" gap="26px">
          {pageStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} isActive={study.slug === selectedSlug} />
          ))}
        </CardGrid>

        {totalPages > 1 && (
          <nav className="ai-cs-pagination" aria-label="Case studies pages">
            <button
              type="button"
              className="ai-cs-page-btn"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                className={`ai-cs-page-btn${num === page ? " is-active" : ""}`}
                aria-current={num === page ? "page" : undefined}
                onClick={() => goToPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              className="ai-cs-page-btn"
              aria-label="Next page"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};
