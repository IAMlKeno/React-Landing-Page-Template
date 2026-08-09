import Link from "next/link";
import type { CaseStudy } from "@/types";

interface Props {
  study: CaseStudy;
  isActive: boolean;
}

export const CaseStudyCard = ({ study, isActive }: Props) => {
  const preview = Array.isArray(study.body) ? study.body.join(" ") : study.body;

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`ai-cs-card${isActive ? " is-active" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="ai-cs-card-tag">{study.tag}</span>
      <h3 className="ai-cs-card-title">{study.title}</h3>
      <div className="ai-cs-card-preview ai-clamp">{preview}</div>
      <span className="ai-cs-card-cta">
        Read case study <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </span>
    </Link>
  );
};
