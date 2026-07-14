import Markdown from "react-markdown";
import type { CaseStudy } from "../../types";

interface Props {
  study: CaseStudy | null;
}

export const CaseStudyDetail = ({ study }: Props) => {
  if (!study) return null;

  const paragraphs = Array.isArray(study.body) ? study.body.join("\n\n") : study.body.split(/\n\n+/);

  console.debug(paragraphs);
  return (
    <section id="cs-detail-section" className="ai-cs-detail" aria-labelledby="cs-detail-h">
      <div className="ai-cs-detail-content">
        <span className="ai-cs-card-tag">{study.tag}</span>
        <h2 id="cs-detail-h">{study.title}</h2>
        <p className="ai-cs-detail-client">{study.client}</p>
        <div className="ai-cs-detail-body">
          {typeof paragraphs == "string"
            ? <Markdown>{paragraphs}</Markdown>
            : paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              )
          )}
        </div>
        <div className="ai-cs-results">
          {study.results.map((r, i) => (
            <div key={i} className="ai-cs-result">
              <div className="ai-cs-result-stat">{r.stat}</div>
              <div className="ai-cs-result-label">{r.label}</div>
            </div>
          ))}
        </div>
        <a href={`/?project=${study.slug}#contact`} className="ai-cs-detail-cta">
          Start a project like this <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
