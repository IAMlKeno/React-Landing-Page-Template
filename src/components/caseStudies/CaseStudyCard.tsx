import Markdown from "react-markdown";
import type { CaseStudy } from "../../types";

interface Props {
  study: CaseStudy;
  isActive: boolean;
  onSelect: () => void;
}

export const CaseStudyCard = ({ study, isActive, onSelect }: Props) => (
  <button
    type="button"
    className={`ai-cs-card${isActive ? " is-active" : ""}`}
    onClick={onSelect}
  >
    <span className="ai-cs-card-tag">{study.tag}</span>
    <h3 className="ai-cs-card-title">{study.title}</h3>
    <p className="ai-cs-card-preview ai-clamp"><Markdown>{ Array.isArray(study.body) ? study.body.join("\n\n") : study.body }</Markdown></p>
    <span className="ai-cs-card-cta">
      Read case study <i className="fa-solid fa-arrow-right" aria-hidden="true" />
    </span>
  </button>
);
