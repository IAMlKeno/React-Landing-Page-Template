import Link from "next/link";
import type { CaseStudy } from "@/types";

interface Props {
  selected: CaseStudy | null;
}

export const CaseStudiesHero = ({ selected }: Props) => (
  <div className="ai-cs-hero">
    <div className="ai-cs-hero-content">
      {selected ? (
        <>
          <Link href="/case-studies" className="ai-cs-back-btn">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to All Case Studies
          </Link>
          <span className="ai-section-label">{selected.tag}</span>
          <h1>{selected.title}</h1>
          <p>{selected.client}</p>
        </>
      ) : (
        <>
          <span className="ai-section-label">Case Studies</span>
          <h1>Client Success Stories</h1>
          <p>
            Real programs, real coaching and the results clients walked away with — browse a full
            case study to see exactly how a program comes together week to week.
          </p>
        </>
      )}
    </div>
  </div>
);
