"use client";

import { useState } from "react";
import type { CaseStudy } from "../../types";
import { CardGrid } from "../common/CardGrid";
import { CaseStudyCard } from "./CaseStudyCard";

const PER_PAGE = 6;

interface Props {
  studies: CaseStudy[];
  selectedSlug?: string;
}

export const CaseStudiesListClient = ({ studies, selectedSlug }: Props) => {
  const [page, setPage] = useState(0);

  const totalCount = studies.length;
  const pageCount = Math.max(1, Math.ceil(totalCount / PER_PAGE));
  const currentPage = Math.min(page, pageCount - 1);
  const start = currentPage * PER_PAGE;
  const pageItems = studies.slice(start, start + PER_PAGE);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pageCount - 1;
  const rangeLabel = `${start + 1}–${Math.min(start + PER_PAGE, totalCount)}`;

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    document.getElementById("cs-list-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="cs-list-section" className="ai-cs-list" aria-labelledby="cs-list-h">
      <div className="ai-cs-list-content">
        <div className="ai-cs-list-header">
          <h2 id="cs-list-h">All Case Studies</h2>
          <span className="ai-cs-range-label">
            Showing {rangeLabel} of {totalCount}
          </span>
        </div>

        <CardGrid minCardWidth="280px" gap="24px" className="ai-cs-card-grid">
          {pageItems.map((study) => (
            <CaseStudyCard key={study.id} study={study} isActive={study.slug === selectedSlug} />
          ))}
        </CardGrid>

        {pageCount > 1 && (
          <div className="ai-cs-pagination">
            <button
              type="button"
              className="ai-cs-page-btn"
              aria-label="Previous page"
              disabled={isFirstPage}
              onClick={() => changePage(currentPage - 1)}
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`ai-cs-page-btn${i === currentPage ? " is-active" : ""}`}
                aria-label={`Page ${i + 1}`}
                aria-current={i === currentPage ? "page" : undefined}
                onClick={() => changePage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              className="ai-cs-page-btn"
              aria-label="Next page"
              disabled={isLastPage}
              onClick={() => changePage(currentPage + 1)}
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
